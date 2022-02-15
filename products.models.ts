export interface IProduct {
  _id: string;
  name: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  countInStock: any;
  rating: number;
  numReviews: number;
}

export interface IError {
  message: string;
}

export type Product = IProduct | undefined | IError;
export type Products = IProduct[] | undefined | IError;