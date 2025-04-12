import { Customer } from './models/Customer';
import { Product } from './models/Product';
import { ProductVariation } from './models/ProductVariation';
import { Order } from './models/Order';
import { ReportOrderTotalSummary } from './models/ReportOrderTotalSummary';
import { ReportSalesSummary } from './models/ReportSalesSummary';

/**
 * A TypeScript client for interacting with the WooCommerce REST API.
 * This client provides methods to manage customers, products, orders, and reports.
 */
export class WooCommerceClient {
  private baseUrl: string;
  private consumerKey: string;
  private consumerSecret: string;

  /**
   * Creates a new instance of the WooCommerceClient.
   * @param baseUrl - The base URL of your WooCommerce store (e.g., 'https://your-store.com/wp-json/wc/v3')
   * @param consumerKey - Your WooCommerce API consumer key
   * @param consumerSecret - Your WooCommerce API consumer secret
   */
  constructor(baseUrl: string, consumerKey: string, consumerSecret: string) {
    this.baseUrl = baseUrl;
    this.consumerKey = consumerKey;
    this.consumerSecret = consumerSecret;
  }

  /**
   * Makes an authenticated request to the WooCommerce REST API.
   * @param endpoint - The API endpoint to call
   * @param method - The HTTP method to use (GET, POST, PUT, DELETE)
   * @param body - Optional request body for POST/PUT requests
   * @returns A promise that resolves to the API response
   * @throws Error if the API request fails
   */
  private async request<T>(endpoint: string, method: string = 'GET', body?: any): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = new Headers({
      'Authorization': `Basic ${btoa(`${this.consumerKey}:${this.consumerSecret}`)}`,
      'Content-Type': 'application/json'
    });

    const response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  /**
   * Creates a new customer in WooCommerce.
   * @param customerData - The customer data to create
   * @returns A promise that resolves to the created customer
   */
  async createCustomer(customerData: Customer): Promise<Customer> {
    return this.request<Customer>('/customers', 'POST', customerData);
  }

  /**
   * Retrieves a list of customers with optional filtering.
   * @param params - Optional filtering parameters
   * @param params.context - Scope under which the request is made (view or edit)
   * @param params.page - Current page of the collection (default: 1)
   * @param params.per_page - Maximum number of items to return (default: 10)
   * @param params.search - Limit results to those matching a string
   * @param params.exclude - Ensure result set excludes specific IDs
   * @param params.include - Limit result set to specific IDs
   * @param params.offset - Offset the result set by a specific number of items
   * @param params.order - Order sort attribute (asc or desc)
   * @param params.orderby - Sort collection by object attribute
   * @param params.email - Limit result set to resources with a specific email
   * @param params.role - Limit result set to resources with a specific role
   * @returns A promise that resolves to an array of customers
   */
  async listCustomers(params: {
    context?: 'view' | 'edit';
    page?: number;
    per_page?: number;
    search?: string;
    exclude?: number[];
    include?: number[];
    offset?: number;
    order?: 'asc' | 'desc';
    orderby?: 'id' | 'include' | 'name' | 'registered_date' | 'email';
    email?: string;
    role?: 'all' | 'administrator' | 'editor' | 'author' | 'contributor' | 'subscriber' | 'customer' | 'shop_manager';
  } = {}): Promise<Customer[]> {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        queryParams.append(key, Array.isArray(value) ? value.join(',') : value.toString());
      }
    });
    return this.request<Customer[]>(`/customers?${queryParams.toString()}`);
  }

  /**
   * Retrieves a specific customer by ID.
   * @param customerId - The ID of the customer to retrieve
   * @returns A promise that resolves to the customer
   */
  async getCustomer(customerId: number): Promise<Customer> {
    return this.request<Customer>(`/customers/${customerId}`);
  }

  /**
   * Updates an existing customer.
   * @param customerId - The ID of the customer to update
   * @param customerData - The updated customer data
   * @returns A promise that resolves to the updated customer
   */
  async updateCustomer(customerId: number, customerData: Customer): Promise<Customer> {
    return this.request<Customer>(`/customers/${customerId}`, 'PUT', customerData);
  }

  /**
   * Deletes a customer.
   * @param customerId - The ID of the customer to delete
   * @param force - Whether to permanently delete the customer (default: true)
   * @param reassign - User ID to reassign posts to
   * @returns A promise that resolves to the deleted customer
   */
  async deleteCustomer(customerId: number, force: boolean = true, reassign?: number): Promise<Customer> {
    const queryParams = new URLSearchParams();
    queryParams.append('force', force.toString());
    if (reassign) {
      queryParams.append('reassign', reassign.toString());
    }
    return this.request<Customer>(`/customers/${customerId}?${queryParams.toString()}`, 'DELETE');
  }

  /**
   * Creates a new product in WooCommerce.
   * @param productData - The product data to create
   * @returns A promise that resolves to the created product
   */
  async createProduct(productData: Product): Promise<Product> {
    return this.request<Product>('/products', 'POST', productData);
  }

  /**
   * Retrieves a list of products with optional filtering.
   * @param params - Optional filtering parameters
   * @param params.sku - Limit result set to products with a specific SKU
   * @param params.attribute - Limit result set to products with a specific attribute
   * @param params.per_page - Maximum number of items to return (default: 10)
   * @param params.page - Current page of the collection (default: 1)
   * @param params.after - Limit response to resources published after a given date
   * @param params.before - Limit response to resources published before a given date
   * @param params.modified_after - Limit response to resources modified after a given date
   * @param params.status - Limit result set to products with specific status
   * @param params.stock_status - Limit result set to products with specific stock status
   * @param params.order - Order sort attribute (asc or desc)
   * @returns A promise that resolves to an array of products
   */
  async listProducts(params: {
    sku?: string;
    attribute?: string;
    per_page?: number;
    page?: number;
    after?: string;
    before?: string;
    modified_after?: string;
    status?: ('any' | 'draft' | 'pending' | 'private' | 'publish')[];
    stock_status?: 'instock' | 'outofstock' | 'onbackorder';
    order?: 'asc' | 'desc';
  } = {}): Promise<Product[]> {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        queryParams.append(key, Array.isArray(value) ? value.join(',') : value.toString());
      }
    });
    return this.request<Product[]>(`/products?${queryParams.toString()}`);
  }

  /**
   * Retrieves a specific product by ID.
   * @param productId - The ID of the product to retrieve
   * @returns A promise that resolves to the product
   */
  async getProduct(productId: number): Promise<Product> {
    return this.request<Product>(`/products/${productId}`);
  }

  /**
   * Updates an existing product.
   * @param productId - The ID of the product to update
   * @param productData - The updated product data
   * @returns A promise that resolves to the updated product
   */
  async updateProduct(productId: number, productData: Product): Promise<Product> {
    return this.request<Product>(`/products/${productId}`, 'PUT', productData);
  }

  /**
   * Deletes a product.
   * @param productId - The ID of the product to delete
   * @param force - Whether to permanently delete the product (default: true)
   * @returns A promise that resolves to the deleted product
   */
  async deleteProduct(productId: number, force: boolean = true): Promise<Product> {
    return this.request<Product>(`/products/${productId}?force=${force}`, 'DELETE');
  }

  /**
   * Creates a new product variation.
   * @param productId - The ID of the parent product
   * @param variationData - The variation data to create
   * @returns A promise that resolves to the created variation
   */
  async createProductVariation(productId: number, variationData: ProductVariation): Promise<ProductVariation> {
    return this.request<ProductVariation>(`/products/${productId}/variations`, 'POST', variationData);
  }

  /**
   * Retrieves all variations for a specific product.
   * @param productId - The ID of the parent product
   * @returns A promise that resolves to an array of variations
   */
  async listProductVariations(productId: number): Promise<ProductVariation[]> {
    return this.request<ProductVariation[]>(`/products/${productId}/variations`);
  }

  /**
   * Retrieves a specific product variation.
   * @param productId - The ID of the parent product
   * @param variationId - The ID of the variation to retrieve
   * @returns A promise that resolves to the variation
   */
  async getProductVariation(productId: number, variationId: number): Promise<ProductVariation> {
    return this.request<ProductVariation>(`/products/${productId}/variations/${variationId}`);
  }

  /**
   * Creates a new order.
   * @param orderData - The order data to create
   * @returns A promise that resolves to the created order
   */
  async createOrder(orderData: Order): Promise<Order> {
    return this.request<Order>('/orders', 'POST', orderData);
  }

  /**
   * Retrieves a list of orders with optional filtering.
   * @param params - Optional filtering parameters
   * @param params.page - Current page of the collection (default: 1)
   * @param params.per_page - Maximum number of items to return (default: 10)
   * @param params.after - Limit response to resources published after a given date
   * @param params.before - Limit response to resources published before a given date
   * @param params.modified_after - Limit response to resources modified after a given date
   * @param params.status - Limit result set to orders with specific status
   * @param params.order - Order sort attribute (asc or desc)
   * @returns A promise that resolves to an array of orders
   */
  async listOrders(params: {
    page?: number;
    per_page?: number;
    after?: string;
    before?: string;
    modified_after?: string;
    status?: ('any' | 'pending' | 'processing' | 'on-hold' | 'completed' | 'cancelled' | 'refunded' | 'failed' | 'trash')[];
    order?: 'asc' | 'desc';
  } = {}): Promise<Order[]> {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        queryParams.append(key, Array.isArray(value) ? value.join(',') : value.toString());
      }
    });
    return this.request<Order[]>(`/orders?${queryParams.toString()}`);
  }

  /**
   * Retrieves a specific order by ID.
   * @param orderId - The ID of the order to retrieve
   * @returns A promise that resolves to the order
   */
  async getOrder(orderId: number): Promise<Order> {
    return this.request<Order>(`/orders/${orderId}`);
  }

  /**
   * Deletes an order.
   * @param orderId - The ID of the order to delete
   * @param force - Whether to permanently delete the order (default: true)
   * @returns A promise that resolves to the deleted order
   */
  async deleteOrder(orderId: number, force: boolean = true): Promise<Order> {
    return this.request<Order>(`/orders/${orderId}?force=${force}`, 'DELETE');
  }

  /**
   * Retrieves the orders totals report.
   * @returns A promise that resolves to an array of order total summaries
   */
  async getOrderTotalsReport(): Promise<ReportOrderTotalSummary[]> {
    return this.request<ReportOrderTotalSummary[]>('/reports/orders/totals');
  }

  /**
   * Retrieves a sales report with optional filtering.
   * @param params - Optional filtering parameters
   * @param params.period - Report period (week, month, last_month, year)
   * @param params.date_min - Return sales for a specific start date (YYYY-MM-DD)
   * @param params.date_max - Return sales for a specific end date (YYYY-MM-DD)
   * @returns A promise that resolves to an array of sales summaries
   */
  async getSalesReport(params: {
    period?: 'week' | 'month' | 'last_month' | 'year';
    date_min?: string;
    date_max?: string;
  } = {}): Promise<ReportSalesSummary[]> {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        queryParams.append(key, value.toString());
      }
    });
    return this.request<ReportSalesSummary[]>(`/reports/sales?${queryParams.toString()}`);
  }
} 