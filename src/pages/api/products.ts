import { prisma } from "../../server/db";
import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  var slugify = require("slugify");
  switch (req.method) {
    case "POST":
      try {
        const { name, categoryId, price, ram, cpu, os, bandwidth, status } =
          req.body;
        const category = await prisma.category.findFirst({
          where: { id: categoryId },
        });
        const product = await prisma.product.create({
          data: {
            name,
            categoryId,
            price,
            ram,
            cpu,
            os,
            bandwidth,
            status,
            slug: `/p/${slugify(
              name.toLowerCase() + ` ${category?.name.toLowerCase()}`
            )}`,
          },
        });
        res.status(201).json(product);
      } catch (error) {
        res.status(503).json(error);
      }
      break;
    case "PUT":
      const categoryUpdate = await prisma.category.findFirst({
        where: { id: req.body.categoryId },
      });
      const productUpdate = await prisma.product.update({
        where: {
          id: req.body.id,
        },
        data: {
          name: req.body.name,
          price: req.body.price,
          ram: req.body.ram,
          cpu: req.body.cpu,
          os: req.body.os,
          bandwidth: req.body.bandwidth,
          status: req.body.status,
          slug: `/p/${slugify(
            req.body.name.toLowerCase() +
              ` ${categoryUpdate?.name.toLowerCase()}`
          )}`,
        },
      });
      res.status(201).json(productUpdate);
      break;
    case "DELETE":
      const productDelete = await prisma.product.delete({
        where: {
          id: req.body.id,
        },
      });
      res.status(201).json(productDelete);
      break;
    default:
      res.setHeader("Allow", ["POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
