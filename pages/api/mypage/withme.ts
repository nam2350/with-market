import { NextApiRequest, NextApiResponse } from "next";
import client from "@/libs/server/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Session } from "next-auth";

interface UserSession extends Session {
  id?: string;
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  const userId = (session as UserSession).id;

  try {
    const products = await client.product.findMany({
      where: {
        userId: userId,
      },
      include: {
        favs: {
          select: {
            userId: true,
          },
        },
        _count: {
          select: {
            favs: true,
            members: true
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    const productsWithJoinMember = products.map((product: any) => {
      const joinMember = 1 + product._count.members;
      const isFull = product.people <= joinMember;
      return {
        ...product,
        joinMember,
        isFull,
      };
    });
    res
      .status(200)
      .json({ message: "success", products: productsWithJoinMember });
  } catch (error) {
    return res.status(500).json({ message: "Failed to get WITH ME info." });
  }
}
