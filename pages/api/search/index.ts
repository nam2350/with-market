import { NextApiRequest, NextApiResponse } from "next";
import client from "@/libs/server/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { keyword } = req.query;
  try {
    const products = await client.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        name: {
          contains: keyword,
        },
      },
    });
    res.status(200).json({ message: "success", products });
  } catch (error) {
    return res.status(500).json({ message: "Failed to search." });
  }
}
