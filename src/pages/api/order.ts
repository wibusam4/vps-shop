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
    if (!session) return res.status(405).end(`Requied Auth`);
  } catch (error) {
    return res.status(405).end(`Requied Auth`);
  }

  switch (req.method) {
    case "GET":
      countOrder(req, res);
      break;
    case "POST":
      addOrder(req, res, session.user.id);
      break;
    case "PUT":
      editOrder(req, res, session.user.id);
      break;
    case "DELETE":
      deleteOrder(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

const countOrder = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const count = await prisma.order.count({
      where: {
        status: 1,
      },
    });
    return res.status(200).json({ success: true, message: count });
  } catch (error) {
    return res.status(503).json(error);
  }
};

const addOrder = async (
  req: NextApiRequest,
  res: NextApiResponse,
  userId: string
) => {
  try {
    const productId = req.body.id;
    let product;
    let user;
    await Promise.all([
      (product = await prisma.product.findUnique({
        where: { id: productId },
      })),
      (user = await prisma.user.findUnique({
        where: { id: userId },
      })),
    ]);
    if (!user || !product)
      return res.status(201).json({ success: false, message: "Lỗi" });
    if (user?.money < product?.price)
      return res.status(201).json({
        succes: false,
        message: "Không đủ tiền",
        price: product,
        money: user.money,
      });
    let order;
    const oldMoney = user.money;
    const newMoney = user.money - product.price;
    await Promise.all([
      prisma.user.update({
        where: { id: userId },
        data: { money: user.money - product.price },
      }),
      prisma.transUser.create({
        data: {
          userId: user.id,
          oldMoney,
          money: -product.price,
          newMoney,
          description: `Mua vps ${product.name}`,
        },
      }),
      (order = prisma.order.create({
        data: {
          userId,
          productId,
        },
      })),
    ]);
    res.status(201).json(order);
  } catch (error) {
    res.status(503).json(error);
  }
};

const editOrder = async (
  req: NextApiRequest,
  res: NextApiResponse,
  sellerId: any
) => {
  try {
    const { action, id } = req.body;
    if (action === "receive") {
      const order = await prisma.order.update({
        where: {
          id: id,
        },
        data: {
          sellerId,
          status: 2,
        },
      });
      return res.status(200).json({ success: true, message: order });
    }
  } catch (error) {
    return res.status(503).json({ success: true, message: error });
  }
};

const deleteOrder = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const id = req.body.id;
    const order = await prisma.order.delete({ where: { id } });
    return res.status(200).json({ success: true, message: order });
  } catch (error) {
    res.status(503).json(error);
  }
};
