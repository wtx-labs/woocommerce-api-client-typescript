import { MetaData } from './MetaData';

export interface OrderTaxLine {
  id?: number;
  rate_code?: string;
  rate_id?: string;
  label?: string;
  compound?: boolean;
  tax_total?: string;
  shipping_tax_total?: string;
  meta_data?: MetaData[];
} 