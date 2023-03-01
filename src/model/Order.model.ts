interface User {
  name: string;
}

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
  category: Category;
  createdAt: Date;
  updatedAt: Date;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Order {
  id: string;
  userId: string;
  productId: string;
  seller?: any;
  note?: any;
  infor?: any;
  status: number;
  createdAt: Date;
  updatedAt: Date;
  user: User;
  product: Product;
}
