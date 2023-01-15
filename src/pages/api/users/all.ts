import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions);
  try {
    if (session && session.user.role == "ADMIN") {
      const allUsers = await prisma.user.findMany({});
      return res.status(200).json({ success: "true", message: allUsers });
    }
    return res.status(200).json({ success: "true", message: "you not allow" });
  } catch (error) {
    return res.status(503).json({ success: "false", error: error });
  }
}
