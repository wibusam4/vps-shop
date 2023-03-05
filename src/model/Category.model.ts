import { Product } from "./Product.model";

export interface Category {
  id: string;
  name: string;
  slug: string;
  status: string;
  products: Product[];
  createdAt: Date;
  updatedAt: Date;
}

export interface FormCategory {
  id?: string;
  name: string;
  status: string;
}
