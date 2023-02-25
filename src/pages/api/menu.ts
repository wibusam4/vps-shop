import { prisma } from "../../server/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const menuVps = await prisma.category.findMany({
    select: {
      name: true,
      slug: true,
    },
  });
  const Menu = [
    { name: "Trang Chủ", slug: "/", submenu: [] },
    {
      name: "Thuê VPS",
      slug: "/",
      submenu: menuVps,
    },
    {
      name: "Nạp Tiền",
      slug: "/",
      submenu: [
        { name: "Thẻ Cào", slug: "r/card" },
        { name: "Ví Momo", slug: "r/momo" },
        { name: "Thẻ Siêu Rẻ", slug: "r/tsr" },
      ],
    },
  ];
  return res.status(200).json(Menu);
}
