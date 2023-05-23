import { NextApiRequest, NextApiResponse } from "next";
import client from "@/libs/server/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Session } from "next-auth/src/core/types";

interface UserSession extends Session {
  id?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  const userId = (session as UserSession).id

  if (!session) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  try {
    const likes = await client.fav.findMany({
      where: {
        userId: userId
      },
      include: {
        product: {
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
        },
      },
    });
    const likesWithJoinMember = likes.map((like: any) => {
        const joinMember = 1 + like.product._count.members;
        const isFull = like.product.people <= joinMember;
        like.product.joinMember = joinMember;
        like.product.isFull = isFull;
        return like;
      });
    res.status(200).json({ message: "success", likes: likesWithJoinMember });
  } catch (error) {
    return res.status(500).json({ message: "Failed to get Favs." });
  }
}
