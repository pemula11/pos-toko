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
