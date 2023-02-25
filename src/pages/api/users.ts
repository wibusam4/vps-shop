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
      getAllUsers(req, res);
      break;
    case "POST":
      editMoneyUser(req, res);
      break;
    case "PUT":
      editUserInfor(req, res);
      break;
    case "DELETE":
      deleteUser(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE", "POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

const editMoneyUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await prisma.user.findFirst({ where: { id: req.body.id } });
  if (!user) throw new Error("User Not Valid");
  const { money, description } = req.body;
  const oldMoney = user.money;
  const newMoney = user.money + money;
  await Promise.all([
    prisma.user.update({ where: { id: user.id }, data: { money: newMoney } }),
    prisma.transUser.create({
      data: {
        userId: user.id,
        oldMoney,
        money,
        newMoney,
        description,
      },
    }),
  ]);

  const updatedUser = await prisma.user.findUnique({ where: { id: user.id } });
  res.status(201).json({ success: true, message: updatedUser });
};

const getAllUsers = async (req: NextApiRequest, res: NextApiResponse) => {
  const allUsers = await prisma.user.findMany({});
  res.status(200).json({ success: true, message: allUsers });
};

const editUserInfor = async (req: NextApiRequest, res: NextApiResponse) => {
  const userUpdate = await prisma.user.update({
    where: { id: req.body.id },
    data: { role: req.body.role, status: req.body.status },
  });
  res.status(201).json({ success: true, message: userUpdate });
};

const deleteUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const userDelete = await prisma.user.delete({
    where: { id: req.body.id },
  });
  res.status(201).json({ success: true, message: userDelete });
};
