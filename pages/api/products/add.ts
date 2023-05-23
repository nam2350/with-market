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
  try {
    const { name, place, price, people, description } = req.body;

    const newProduct = await client.product.create({
      data: {
        image: "",
        name,
        price: Number(price),
        place,
        people: Number(people),
        description,
        user: {
          connect: {
            id: (session as UserSession).id,
          },
        },
      },
    })
    res.status(200).json({ message: "success", newProduct });
  } catch (error) {
    return res.status(500).json({ message: "Failed to create product." });
  }
}
