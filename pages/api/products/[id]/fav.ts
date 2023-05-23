import { NextApiRequest, NextApiResponse } from "next";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
import client from "@/libs/server/client";

interface UserSession extends Session {
  id: string;
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

  if (!session) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const alreadyExists = await client.fav.findFirst({
    where: {
      productId: Number(id),
      userId: userId,
    },
  });
  if (alreadyExists) {
    // delete
    await client.fav.delete({
      where: {
        id: alreadyExists.id,
      },
    });
  } else {
    // create
    await client.fav.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
        product: {
          connect: {
            id: Number(id),
          },
        },
      },
    });
  }
  res.status(200).json({ ok: "true" });
}
