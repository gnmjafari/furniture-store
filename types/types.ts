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
  general: comparisonGeneral;
  product: comparisonProduct;
  dimensions: comparisonDimensions;
  warranty: comparisonWarranty;
};

export type ShoppingCart = {
  productId: number;
  quantity: number;
};

export type comparisonGeneral = {
  sales_package: string;
  model_number: string;
  secondary_material: string;
  configuration: string;
  upholstery_material: string;
  upholstery_color: string;
};

export type comparisonProduct = {
  filling_material: string;
  finish_type: string;
  adjustable_headrest: string;
  maximum_load_capacity: string;
  origin_of_manufacture: string;
};

export type comparisonDimensions = {
  width: string;
  height: string;
  depth: string;
  weight: string;
  seat_height: string;
  leg_height: string;
};

export type comparisonWarranty = {
  warranty_summary: string;
  warranty_service_type: string;
  covered_in_warranty: string;
  not_covered_in_warranty: string;
  domestic_warranty: string;
};

export type comparison = {
  general: comparisonGeneral;
  product: comparisonProduct;
  dimensions: comparisonDimensions;
  warranty: comparisonWarranty;
};
