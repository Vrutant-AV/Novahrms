// types/User.ts
export interface User {
    id: string;
    name: string;
    email: string;
    role: "admin" | "hr" | "employee";
    token?: string;
  }
  