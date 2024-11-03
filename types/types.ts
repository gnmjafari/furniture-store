export type Product = {
  id: number;
  image: string;
  name: string;
  description: string;
  price: number;
  favorite: boolean;
  discount: boolean;
  discountPercentage: number;
  new: boolean;
  category: string;
  moreDetails: string;
};

export type ShoppingCart = {
  productId: number;
  quantity: number;
};
