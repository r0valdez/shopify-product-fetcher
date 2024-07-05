# Shopify Product Fetcher

This script fetches products from a Shopify store using Shopify's GraphQL API. It takes an input product name and fetches the appropriate products that match the name, listing down the variants sorted by price.

## Prerequisites

- Node.js and npm should be installed on your system.
- A Shopify Admin API Access Token.

## Installation

1. **Clone the repository or download the script:**
    ```bash
    git clone https://github.com/r0valdez/shopify-product-fetcher.git
    cd shopify-product-fetcher
    ```

2. **Install required packages:**

    ```bash
    npm install
    ```

## Usage

**Run the script with the desired product name**
  ```bash
  node app.js --name shirt
  ```

**Example Output**
  ```bash
  A shirt - 3 / black - price $15
  A shirt - 3 / white - price $15
  A shirt - 3 / red - price $15
  A shirt - 3 / blue - price $15
  A shirt - 2 / black - price $25
  A shirt - 2 / white - price $25
  A shirt - 2 / red - price $25
  A shirt - 2 / blue - price $25
  A shirt - 5 / black - price $30
  A shirt - 5 / white - price $30
  A shirt - 5 / red - price $30
  A shirt - 5 / blue - price $30
  A shirt - 4 / black - price $35
  A shirt - 4 / white - price $35
  A shirt - 4 / red - price $35
  A shirt - 4 / blue - price $35
  ```