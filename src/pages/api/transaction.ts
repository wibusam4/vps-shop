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
    case "PUT":
      editTransaction(req, res);
      break;
    case "DELETE":
      deleteTransaction(req, res);
      break;
    default:
      res.setHeader("Allow", ["PUT", "DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

const editTransaction = async (req: NextApiRequest, res: NextApiResponse) => {};

const deleteTransaction = async (req: NextApiRequest, res: NextApiResponse) => {
  const tranDelete = await prisma.transUser.delete({
    where: { id: req.body.id },
  });
  res.status(201).json({ success: true, message: tranDelete });
};
