export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  status?: boolean;
  created_at?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthContextType {
  currentUser: User | null;
  login: (data: LoginPayload) => Promise<void>;
  logout: () => Promise<void>;
  getUserByToken: () => Promise<void>;
}

export interface PaginationList {
  page: number;
  totalPages: number;
  limit: number;
  total: number;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface EditUserProps {
  user: User;
  onClose: () => void;
  onUpdated: () => void;
}
