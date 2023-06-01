import { NextApiRequest, NextApiResponse } from "next";
import client from "@/libs/server/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const products = await client.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        _count: {
          select: {
            members: true,
          },
        },
      },
    });
    const productsWithJoinMember = products.map((product: any) => {
      const joinMember = 1 + product._count.members;
      const isFull = product.people <= joinMember
      return {
        ...product,
        joinMember,
        isFull
      };
    });
    res.status(200).json({ message: "success", products: productsWithJoinMember });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch products." });
  }
}