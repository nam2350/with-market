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
  const userId = (session as UserSession).id;
  if (!session) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  try {
    const members = await client.member.findMany({
      where: {
        userId: userId,
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
                members: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    const membersWithJoinMember = members.map((member: any) => {
      const joinMember = 1 + member.product._count.members;
      const isFull = member.product.people <= joinMember;
      member.product.joinMember = joinMember;
      member.product.isFull = isFull;
      return member.product;
    });
    res
      .status(200)
      .json({ message: "success", members: membersWithJoinMember});
  } catch (error) {
    return res.status(500).json({ message: "Failed to get WITH YOU info." });
  }
}
