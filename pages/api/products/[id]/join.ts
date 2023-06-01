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

  const { productId } = req.body;
  const userId = (session as UserSession).id;

  if (isNaN(productId) || !userId) {
    res.status(400).json({ message: "Invalid product id or user id." });
    return;
  }
  try {
    const newMember = await client.member.create({
      data: {
        product: {
          connect: {
            id: Number(productId),
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    res.status(200).json({ message: "success", newMember });
  } catch (error) {
    return res.status(500).json({ message: "Failed to create member." });
  }
}
