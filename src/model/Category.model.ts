interface Product {
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
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  status: string;
  product: Product[];
  createdAt: Date;
  updatedAt: Date;
}

export interface FormCategory {
  id?: string;
  name: string;
  status: string;
}
