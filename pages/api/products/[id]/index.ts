import { NextApiRequest, NextApiResponse } from "next";
import client from "@/libs/server/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id },
  } = req;

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
        _count:{
          select:{
            members: true,
          }
        }
      },
    });
    const joinMember = product._count ? 1 + product._count.members : 1;
    const isFull = product.people <= joinMember;
    console.log(product.people, joinMember, isFull )

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
    res
      .status(200)
      .json({ message: "success", product, isFull, joinMember, relatedProducts });
  } catch (error) {
    return res.status(500).json({ message: "Failed to get product." });
  }

}
