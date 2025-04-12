# The WooCommerce REST API Client for TypeScript

Effortlessly integrate your TypeScript applications with WooCommerce using our REST API client! 🚀

This library provides an intuitive and developer-friendly way to interact with the latest **WooCommerce REST API (v3)**, allowing seamless access to store data and operations.

## 🚨 Project Status

> ⚠️ **Note: This is an early development version!**
> 
> We are actively expanding the API coverage to support more WooCommerce features.
> Contributions and feedback are welcome!

## 📦 Version Information

- **Current Version**: `0.1.5-alpha-20250412`
- **Supported WooCommerce API Version**: `v3`
- **TypeScript Compatibility**: TypeScript 4.0+

## 🔓 License

**MIT License**

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files, to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the software.

The only requirement is to preserve the original author attribution in the source code and documentation.

## 🚀 Quick Start

### 1️⃣ Installation

Install the package using npm:

```bash
npm install @wtx-labs/woocommerce-api-client
```

### 2️⃣ Usage Example

Easily fetch WooCommerce customer data:

```typescript
import { WooCommerceClient } from '@wtx-labs/woocommerce-api-client';

// Initialize the client
const client = new WooCommerceClient({
  url: 'https://your-store.com',
  consumerKey: 'ck_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  consumerSecret: 'cs_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  version: 'wc/v3'
});

// List all customers
const customers = await client.listCustomers();

// Get a single customer
const customer = await client.getCustomer(123);

// Create a new customer
const newCustomer = await client.createCustomer({
  email: 'customer@example.com',
  first_name: 'John',
  last_name: 'Doe'
});

// Update a customer
const updatedCustomer = await client.updateCustomer(123, {
  first_name: 'Jane'
});

// Delete a customer
await client.deleteCustomer(123);
```

## 📚 Features

- Full support for WooCommerce REST API
- Static typing for all endpoints
- OAuth 1.0a authentication support
- Error handling and data validation
- Comprehensive JSDoc documentation for all methods
- TypeScript type definitions for all API responses

## 🔗 Stay Connected

- ✨ We're constantly improving this client with new features!
- 💡 Have suggestions or need help? Open an issue or contribute!

🚀 Happy coding! 😊

**Your WTX Labs Team** 🚀 