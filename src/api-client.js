
const DEV_BASE_URL_DEFAULT = "http://localhost:3000";

// Use base URL from `.env` via Vite's public env variables. Use default if not found.
export const BASE_URL = import.meta.env.VITE_OUR_BASE_URL ?? DEV_BASE_URL_DEFAULT;

console.log("Resolved Base URL", BASE_URL);
