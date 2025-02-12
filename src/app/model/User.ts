type User = {
  id: number;
  username?: string;
  password?: string;
};

export type DisplayUser = Omit<User, 'password'>;
export default User;
