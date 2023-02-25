export interface Transaction {
  id: string;
  userId: string;
  oldMoney: number;
  money: number;
  newMoney: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  user: User;
}

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  money: number;
  role: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

