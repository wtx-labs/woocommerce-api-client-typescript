import { OrderTaxLine } from './OrderTaxLine';
import { MetaData } from './MetaData';

export interface OrderLineItem {
  id?: number;
  name?: string;
  parent_name?: string;
  product_id?: string;
  variation_id?: number;
  quantity?: number;
  tax_class?: string;
  subtotal?: string;
  subtotal_tax?: string;
  total?: string;
  total_tax?: string;
  taxes?: OrderTaxLine[];
  meta_data?: MetaData[];
  sku?: string;
  price?: number;
} 