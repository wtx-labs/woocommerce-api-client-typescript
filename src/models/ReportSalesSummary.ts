import { ReportSalesSummaryItem } from './ReportSalesSummaryItem';

export interface ReportSalesSummary {
  total_sales?: string;
  net_sales?: string;
  average_sales?: string;
  total_orders?: number;
  total_items?: number;
  total_tax?: string;
  total_shipping?: string;
  total_refunds?: number;
  total_discount?: string;
  totals_grouped_by?: string;
  total_customers?: number;
  totals?: Record<string, ReportSalesSummaryItem>;
} 