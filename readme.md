# POS Toko

POS Toko adalah aplikasi Point of Sale (POS) untuk mengelola penjualan dan inventaris toko.

## Instalasi

1. Clone repositori ini:
    ```sh
    git clone https://github.com/pemula11/pos-toko.git
    cd pos-toko
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Buat file [.env](http://_vscodecontentref_/0) dan tambahkan konfigurasi berikut:
    ```env
    
    JWT_SECRET=your_jwt_secret
    JWT_SECRET_REFRESH_TOKEN=your_refresh_token_secret
    JWT_ACCESS_TOKEN_EXPIRED=1h
    ```
4. Ubah konfigurasi database pada [config/config.json]

## Migrasi

1. Jalankan migrasi database:
    ```sh
    npx sequelize-cli db:migrate
    ```

## Seed

1. Jalankan seed untuk mengisi database dengan data awal:
    ```sh
    npx sequelize-cli db:seed:all
    ```

## Testing

1. Jalankan tes unit menggunakan Mocha:
    ```sh
    npx mocha 
    ```

## api documentation

### Authentication

#### Register
- **URL**: `/register`
- **Method**: `POST`
- **Body Parameters**:
  - `name`: Nama pengguna (required)
  - `email`: Email pengguna (required)
  - `password`: Kata sandi pengguna (required)
- **Success Response**:
  - **Code**: 201
  - **Content**:
    ```json
    {
        "status": "success",
        "data": {
            "id": 1,
            "name": "User Name",
            "email": "user@example.com"
        }
    }
    ```
- **Error Response**:
  - **Code**: 400
  - **Content**:
    ```json
    {
        "status": "error",
        "message": "Validation error"
    }
    ```

#### Login
- **URL**: `/login`
- **Method**: `POST`
- **Body Parameters**:
  - `email`: Email pengguna (required)
  - `password`: Kata sandi pengguna (required)
- **Success Response**:
  - **Code**: 200
  - **Content**:
    ```json
    {
        "status": "success",
        "data": {
            "token": "jwt_token"
        }
    }
    ```
- **Error Response**:
  - **Code**: 401
  - **Content**:
    ```json
    {
        "status": "error",
        "message": "Invalid email or password"
    }
    ```

### Products

#### Get All Products
- **URL**: `/products`
- **Method**: `GET`
- **Query Parameters**:
  - `page` (optional): Nomor halaman (default: 1)
  - `limit` (optional): Jumlah item per halaman (default: 10)
- **Success Response**:
  - **Code**: 200
  - **Content**:
    ```json
    {
        "status": "success",
        "data": {
            "data": [
                {
                    "id": 1,
                    "name": "Product 1",
                    "price": 100,
                    "stock": 10,
                    "description": "Description of Product 1",
                    "category": "Category 1"
                },
                ...
            ],
            "page": 1,
            "limit": 10,
            "total": 100,
            "pages": 10
        }
    }
    ```

#### Get Product by ID
- **URL**: `/products/:id`
- **Method**: `GET`
- **URL Parameters**:
  - `id`: ID produk
- **Success Response**:
  - **Code**: 200
  - **Content**:
    ```json
    {
        "status": "success",
        "data": {
            "id": 1,
            "name": "Product 1",
            "price": 100,
            "stock": 10,
            "description": "Description of Product 1",
            "category": "Category 1"
        }
    }
    ```
- **Error Response**:
  - **Code**: 404
  - **Content**:
    ```json
    {
        "status": "error",
        "message": "Product not found"
    }
    ```

#### Create Product
- **URL**: `/products`
- **Method**: `POST`
- **Body Parameters**:
  - `name`: Nama produk (required)
  - `price`: Harga produk (required)
  - `stock`: Stok produk (optional, default: 0)
  - `description`: Deskripsi produk (optional, default: "No description")
  - `category`: Kategori produk (optional, default: "Uncategorized")
- **Success Response**:
  - **Code**: 201
  - **Content**:
    ```json
    {
        "status": "success",
        "data": {
            "id": 1,
            "name": "Product 1",
            "price": 100,
            "stock": 10,
            "description": "Description of Product 1",
            "category": "Category 1"
        }
    }
    ```

#### Update Product
- **URL**: `/products/:id`
- **Method**: `PUT`
- **URL Parameters**:
  - `id`: ID produk
- **Body Parameters**:
  - `name`: Nama produk (optional)
  - `price`: Harga produk (optional)
  - `stock`: Stok produk (optional)
  - `description`: Deskripsi produk (optional)
  - `category`: Kategori produk (optional)
- **Success Response**:
  - **Code**: 200
  - **Content**:
    ```json
    {
        "status": "success",
        "data": {
            "id": 1,
            "name": "Updated Product",
            "price": 150,
            "stock": 20,
            "description": "Updated description",
            "category": "Updated category"
        }
    }
    ```
- **Error Response**:
  - **Code**: 404
  - **Content**:
    ```json
    {
        "status": "error",
        "message": "Product not found"
    }
    ```

#### Delete Product
- **URL**: `/products/:id`
- **Method**: `DELETE`
- **URL Parameters**:
  - `id`: ID produk
- **Success Response**:
  - **Code**: 200
  - **Content**:
    ```json
    {
        "status": "success",
        "message": "Product deleted successfully"
    }
    ```
- **Error Response**:
  - **Code**: 404
  - **Content**:
    ```json
    {
        "status": "error",
        "message": "Product not found"
    }
    ```

### Transactions

#### Get All Transactions
- **URL**: `/transactions`
- **Method**: `GET`
- **Query Parameters**:
  - [page](http://_vscodecontentref_/7) (optional): Nomor halaman (default: 1)
  - [limit](http://_vscodecontentref_/8) (optional): Jumlah item per halaman (default: 10)
- **Success Response**:
  - **Code**: 200
  - **Content**:
    ```json
    {
        "status": "success",
        "data": [
            {
                "id": 1,
                "details": [
                    {
                        "productId": 1,
                        "quantity": 2,
                        "price": 100
                    }
                ],
                "total": 200,
                "createdAt": "2023-01-01T00:00:00.000Z"
            },
            ...
        ],
        "page": 1,
        "limit": 10,
        "total": 100,
        "pages": 10
    }
    ```

#### Get Transaction by ID
- **URL**: `/transactions/:id`
- **Method**: `GET`
- **URL Parameters**:
  - [id](http://_vscodecontentref_/9): ID transaksi
- **Success Response**:
  - **Code**: 200
  - **Content**:
    ```json
    {
        "status": "success",
        "data": {
            "id": 1,
            "details": [
                {
                    "productId": 1,
                    "quantity": 2,
                    "price": 100
                }
            ],
            "total": 200,
            "createdAt": "2023-01-01T00:00:00.000Z"
        }
    }
    ```
- **Error Response**:
  - **Code**: 404
  - **Content**:
    ```json
    {
        "status": "error",
        "message": "Transaction not found"
    }
    ```

#### Create Transaction
- **URL**: `/transactions`
- **Method**: `POST`
- **Body Parameters**:
  - [details](http://_vscodecontentref_/10): Array of transaction details (required)
    - `productId`: ID produk (required)
    - `quantity`: Jumlah produk (required)
    - `price`: Harga produk (required)
- **Success Response**:
  - **Code**: 201
  - **Content**:
    ```json
    {
        "status": "success",
        "data": {
            "id": 1,
            "details": [
                {
                    "productId": 1,
                    "quantity": 2,
                    "price": 100
                }
            ],
            "total": 200,
            "createdAt": "2023-01-01T00:00:00.000Z"
        }
    }
    ```


