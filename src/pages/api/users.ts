import { prisma } from "../../server/db";
import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions);
  try {
    if (!session || session.user.role != "ADMIN")
      return res.status(405).end(`You Not Allowed`);
  } catch (error) {
    return res.status(405).end(`You Not Allowed`);
  }
  switch (req.method) {
    case "GET":
      const allUsers = await prisma.user.findMany({});
      res.status(200).json({ success: "true", message: allUsers });
      break;
    case "PUT":
      const userUpdate = await prisma.user.update({
        where: { id: req.body.id },
        data: { role: req.body.role, status: req.body.status },
      });
    res.status(201).json(userUpdate);
      break;
    case "DELETE":
      const userDelete = await prisma.user.delete({
        where: { id: req.body.id },
      });
      res.status(201).json(userDelete);
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
