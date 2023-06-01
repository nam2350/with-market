import { NextApiRequest, NextApiResponse } from "next";
import client from "@/libs/server/client";
import { Session } from "next-auth";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
interface UserSession extends Session {
  id?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id },
  } = req;

  const session = await getServerSession(req, res, authOptions);
  const userId = (session as UserSession).id;

  
  try {
    const product = await client.product.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        members: {
          include: {
            user: true,
          },
        },
        _count: {
          select: {
            members: true,
          },
        },
      },
    });
    const joinMember = product._count ? 1 + product._count.members : 1;
    const isFull = product.people <= joinMember;

    const terms = product?.name
      .split(" ")
      .map((word: any) => ({ name: { contains: word } }));
    const relatedProducts = await client.product.findMany({
      where: {
        OR: terms,
        AND: {
          id: {
            not: product?.id,
          },
        },
      },
    });
    const isLiked = Boolean(
      await client.fav.findFirst({
        where: {
          productId: product?.id,
          userId: userId,
        },
        select: {
          id: true,
        },
      })
    );
    res.status(200).json({
      message: "success",
      product,
      isFull,
      isLiked,
      joinMember,
      relatedProducts,
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to get product detail." });
  }
}
