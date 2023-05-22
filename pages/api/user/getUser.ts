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
  const userId = (session as UserSession).id;

  try {
    const user = await client.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        products: true,
        member: true
      },
    });
    res.status(200).json({ message: "success", user });
  } catch (error) {
    return res.status(500).json({ message: "Failed to get user info." });
  }
}
