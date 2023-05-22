import { NextApiRequest, NextApiResponse } from "next";
import client from "@/libs/server/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  const { isFull } = req.body;
  try {
    const updatedProduct = await client.product.update({
      where: { id: Number(id) },
      data: { isFull },
    });

    res.status(200).json({ message: "success", updatedProduct });
  } catch (error) {
    return res.status(500).json({ message: "Failed to update product." });
  }
}