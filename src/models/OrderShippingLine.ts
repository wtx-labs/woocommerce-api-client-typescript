import { OrderTaxLine } from './OrderTaxLine';
import { MetaData } from './MetaData';

export interface OrderShippingLine {
  id?: number;
  method_title?: string;
  method_id?: string;
  instance_id?: string;
  total?: string;
  total_tax?: string;
  taxes?: OrderTaxLine[];
  meta_data?: MetaData[];
} 