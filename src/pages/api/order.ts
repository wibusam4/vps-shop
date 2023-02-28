import { prisma } from "../../server/db";
import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import { strict } from "assert";

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
    case "POST":
      addOrder(req, res, session.user.id);
      break;
    case "PUT":
      //editProduct(req, res);
      break;
    case "DELETE":
      //deleteProduct(req, res);
      break;
    default:
      res.setHeader("Allow", ["POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

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
    console.log(productId);

    if (!user || !product)
      return res.status(201).json({ success: false, message: "Lỗi" });
    if (user?.money < product?.price)
      return res
        .status(201)
        .json({
          succes: false,
          message: "Không đủ tiền",
          price: product,
          money: user.money,
        });
    let order;
    await Promise.all([
      prisma.user.update({
        where: { id: userId },
        data: { money: user.money - product.price },
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

const editProduct = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
  } catch (error) {
    return res.status(503).json(error);
  }
};

const deleteProduct = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
  } catch (error) {
    res.status(503).json(error);
  }
};
