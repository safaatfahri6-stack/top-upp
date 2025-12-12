export type User = {
  name: string;
  email: string;
  picture: string;
};

export type Transaction = {
  id: string;
  date: Date;
  amount: number;
  status: 'Success' | 'Pending' | 'Failed';
};
