# Laravel/Svelte/Vite/TypeScript API Boilerplate

[日本語](https://github.com/masapochi/laravel-svelte-vite-typescript-api-boilerplate/blob/main/README_JP.md)

## Description

This is the boilerplate for creating a page using Laravel, Svelte(+Axios).

In order to be able to run the front-end and the back-end on different domains, I divided the roles between the `front` and `back` directories.

## How to start

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

## Settings

### Access-Control-Allow-Origin（Laravel）

As a CORS countermeasure, the middleware (`/back/app/Http/Middleware/Cors.php`) is configured to accept requests from the specified host.

Change the `API_ALLOWED_ORIGINS` in `/back/.env` as needed.
you can specify more than one with `,`.

### API endpoint（Vite）

It uses the `import.meta.env` environment variable object provided by Vite.<br>
Only variables that start with `VITE_` will be read by Vite.

Change the value of `VITE_API_ENDPOINT` in `/front/.env` as needed.

If you do not use Vite's environment variable object, specify the endpoint directly in `baseURL` of `/front/src/http.ts`.

```javascript
const http = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT, // ← Hard coding is also fine.(http://127.0.0.1:8000/api/ etc.)
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});
```

## Frameworks and libraries

#### Backend

- Laravel

#### Frontend

- Svelte
- Axios

#### Build Tools

- Vite
- TypeScript

## Remarks

I think you can change the front-end and back-end frameworks.<br>
however, the backend needs CORS configuration...

Example:

- Laravel → Django、Ruby on Rails
- Svelte → React、Vue
