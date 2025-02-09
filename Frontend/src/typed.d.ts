export interface User {
  username: string;
  _id: string;
  displayName: string;
  phoneNumber: string;
  token: string;
}

export interface RegisterMutation {
  username: string;
  password: string;
  displayName: string;
  phoneNumber: string;
}

export interface RegisterResponse {
  user: User;
  message: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface GlobalError {
  error: string;
}

export interface Category {
  title: string;
  _id: string;
}

export interface Item {
  _id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  category: string;
  seller: string;
}

export interface ItemById {
  _id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  category: {
    title: string;
  };
  seller: {
    _id: string;
    displayName: string;
    phoneNumber: string;
  };
}

export interface ItemMutation {
  title: string;
  description: string;
  image: File | null;
  price: string;
  category: string;
}
