export const BACKEND_URL =
  process.env.NODE_ENV !== "production"
    ? "http://safe-dynamic-api-local.com:8080"
    : "https://safe-dynamic-api-demo.dreamhosters.com";

export const FRONTEND_URL =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3000"
    : "https://safe-dynamic-api-demo-frontend.vercel.app/";
