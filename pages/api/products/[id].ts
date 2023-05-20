import { NextApiRequest, NextApiResponse } from "next";
import client from "@/libs/server/client";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/pages/api/auth/[...nextauth]";

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
        joinProducts: {
          include: {
            user: true
          }
        }
      },
    });
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
    res.status(200).json({ message: "success", product, relatedProducts });
  } catch (error) {
    return res.status(500).json({ message: "Failed to create product." });
  }
}