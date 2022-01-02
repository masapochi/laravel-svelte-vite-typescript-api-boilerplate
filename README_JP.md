# Laravel / Svelte / Vite / TypeScript API Boilerplate

## 説明

Svelte(+Axios)と Laravel を使ってページを作る際のボイラープレートです。

フロントエンドとバックエンドを異なるドメインで運用できるよう<br>
`front`と`back`のディレクトリで役割分担をさせています。

## 始め方

```bash
// Backend
cd back
composer install
php artisan serve

// Frontend
cd front
npm install
npm run dev
```

## 設定

### Access-Control-Allow-Origin（Laravel）

CORS 対策として、ミドルウェア（`/back/app/Http/Middleware/Cors.php`）で指定ホストからのリクエストを受け付けるように設定しています。

`/back/.env`の`API_ALLOWED_ORIGINS`を必要に応じて変更してください。<br>
`,`で複数指定可能です。

### API エンドポイント（Vite）

Vite の提供の`import.meta.env`環境変数オブジェクトを利用しています。<br>
`VITE_`から始まる変数のみ Vite によって読み込まれます。

`/front/.env`の`VITE_API_ENDPOINT`の値を必要に応じて変更してください。

Vite の環境変数オブジェクトを利用しない際は、`/front/src/http.ts`の`baseURL`にエンドポイントを直接指定してください。

```javascript
const http = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT, // ← 直接指定も可（http://127.0.0.1:8000/api/など）
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});
```

## フレームワーク・ライブラリ

#### Backend

- Laravel

#### Frontend

- Svelte
- Axios

#### Build Tools

- Vite
- TypeScript

## 備考

フロントエンド、バックエンドのフレームワークは変更できると思います。<br>
バックエンドは CORS 設定が必要ですが…

例:

- Laravel → Django、Ruby on Rails
- Svelte → React、Vue
