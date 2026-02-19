export type User = {
  email: string;
  password: string;
};

export type AuthContextType = {
  currentUser: User | null;
  logout: () => void;
  login: (user: User) => void;
  getUserByToken: () => void;
};
