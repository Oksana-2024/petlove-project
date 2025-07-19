export interface IWorkDays {
  _id: string;
  isOpen: string;
  from: string;
  to: string;
}

export interface IFriends {
  _id: string;
  title: string;
  url: string;
  addressUrl: string;
  imageUrl: string;
  address: string;
  workDays: IWorkDays[];
  phone: string;
  email: string;
}
