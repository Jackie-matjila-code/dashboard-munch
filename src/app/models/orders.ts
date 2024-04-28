export interface Orders {
  id: number;
  unique_code: string;
  ordered_date: Date;
  product_ordered: string;
  person_name: string;
  day_ordered: Date;
  delivery_date: Date;
  product_category: string;
  stock_count: number;
  size: string;
  product_image: string;
}
