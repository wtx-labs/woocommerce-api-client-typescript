import { OrderTaxLine } from './OrderTaxLine';
import { MetaData } from './MetaData';

export interface OrderFeeLine {
  id?: number;
  name?: string;
  tax_class?: string;
  tax_status?: 'taxable' | 'none';
  total?: string;
  total_tax?: string;
  taxes?: OrderTaxLine[];
  meta_data?: MetaData[];
} 