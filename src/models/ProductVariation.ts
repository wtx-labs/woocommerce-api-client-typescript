export interface ProductVariation {
  id?: number;
  date_created?: string;
  date_created_gmt?: string;
  date_modified?: string;
  date_modified_gmt?: string;
  description?: string;
  permalink?: string;
  sku?: string;
  price?: string;
  regular_price?: string;
  sale_price?: string;
  date_on_sale_from?: string;
  date_on_sale_from_gmt?: string;
  date_on_sale_to?: string;
  date_on_sale_to_gmt?: string;
  on_sale?: boolean;
  status?: 'publish' | 'private' | 'draft';
  purchasable?: boolean;
  virtual?: boolean;
  downloadable?: boolean;
  downloads?: {
    id: string;
    name: string;
    file: string;
  }[];
  download_limit?: number;
  download_expiry?: number;
  tax_status?: 'taxable' | 'shipping' | 'none';
  tax_class?: string;
  manage_stock?: boolean;
  stock_quantity?: number;
  stock_status?: 'instock' | 'outofstock' | 'onbackorder';
  backorders?: 'no' | 'notify' | 'yes';
  backorders_allowed?: boolean;
  backordered?: boolean;
  weight?: string;
  dimensions?: {
    length: string;
    width: string;
    height: string;
  };
  shipping_class?: string;
  shipping_class_id?: number;
  image?: {
    id: number;
    date_created: string;
    date_created_gmt: string;
    date_modified: string;
    date_modified_gmt: string;
    src: string;
    name: string;
    alt: string;
  };
  attributes?: {
    id: number;
    name: string;
    option: string;
  }[];
  menu_order?: number;
  meta_data?: {
    id: number;
    key: string;
    value: string;
  }[];
} 