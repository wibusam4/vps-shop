import { Product } from "./Product.model";

interface User {
  id: string;
  name: string;
  email: string;
}
interface Account {
  ip: string;
  user: string;
  password: string;
}

export interface Order {
  id: string;
  userId: string;
  sellerId?: string;
  productId: string;
  note?: any;
  infor?: any;
  status: number;
  createdAt: Date;
  updatedAt: Date;
  user: User;
  seller?: User;
  account?: Account;
  product: Product;
}
