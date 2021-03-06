export interface BillWithUsers {
  id: number;
  description: string;
  date: string;
  dateCreated: string;
  members: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    amount: number;
  }[];
}

export interface GroupWithUsers {
  id: number;
  description: string;
  date: string;
  dateCreated: string;
  members: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  }[];
}
