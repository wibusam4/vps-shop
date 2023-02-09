import { Category } from "./Category.model";

export interface Product {
  id: string;
  categoryId: string;
  name: string;
  price: number;
  cpu: number;
  ram: number;
  os: string;
  bandwidth: string;
  status: string;
  slug: string;
  category?:Category
  createdAt: Date;
  updatedAt: Date;
}

export interface FormProduct {
  id?: string,
  name: string;
  categoryId: string;
  price: number;
  cpu: number;
  ram: number;
  os: string;
  bandwidth: string;
  status: string;
}
