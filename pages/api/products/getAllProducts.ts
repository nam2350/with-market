import { NextApiRequest, NextApiResponse } from "next";
import client from "@/libs/server/client";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/pages/api/auth/[...nextauth]";

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
            joinProducts: true,
          },
        },
      },
    });
    res.status(200).json({ message: "success", products });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch products." });
  }
}
