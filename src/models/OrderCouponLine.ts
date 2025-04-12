import { MetaData } from './MetaData';

export interface OrderCouponLine {
  id?: number;
  code?: string;
  discount?: string;
  discount_tax?: string;
  meta_data?: MetaData[];
} 