export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  money?: number;
  status: string;
}

export interface FormUser {
  id: string;
  role: string;
  status: string;
}

export interface FormAuth {
  name?: string;
  email: string;
  password: string;
  passWordConfirm?: string;
}

export interface FormControl {
  id: string;
  money: number;
  description: string;
}
