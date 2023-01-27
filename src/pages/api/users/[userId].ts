import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { exclude } from "../../../until/excludeKey";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions);
  const id = req.query.userId;

  /* Check session */
  if (!session) {
    return res.status(200).json({ success: "true", message: "Require Auth" });
  }

  /* Check valid ID */
  if (session.user.id != id && session.user.role != "ADMIN") {
    return res.status(200).json({ success: "true", message: "Not valid id" });
  }

  /* GET METHOD */
  if (req.method === "GET") {
    const email = session.user.email ?? "default";
    const user = await prisma.user.findFirst({ where: { email: email } });
    return res
      .status(200)
      .json({ success: "true", message: exclude(user, ["password"]) });
  }

  /* DELETE METHOD */
  if (req.method === "DELETE") {
    await prisma.user.delete({ where: { id: Number(id) } });
    res
      .status(200)
      .json({ success: "true", message: `Delete ${id} successfully` });
  }

  res.status(200).json({ name: "John Doe" });
}
