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
