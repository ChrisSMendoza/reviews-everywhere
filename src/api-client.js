
/**
 * 
 * @returns {string} The base URL of the API
 * 
 * We use `import.meta.env.VITE_OUR_BASE_URL` to get the URL from `.env`, and make it explicitly public.
 * 
 * Note, `import.meta.env.BASE_URL` is set to "/", and can be set in Vite config.
 * 
 */

export function getBaseUrl() {
    // Use base URL from `.env` that's vite-based
    if(import.meta.env.VITE_OUR_BASE_URL) {
        console.log("Vite based project, use client side env variable (it's public)");

        return import.meta.env.VITE_OUR_BASE_URL;
    }

    const DEV_BASE_URL = "http://localhost:3000";

    console.log("Base URL, VITE_OUR_BASE_URL, was not found in `.env`, using localhost", DEV_BASE_URL);

    return DEV_BASE_URL;
}



const DEV_BASE_URL_DEFAULT = "http://localhost:3000";

export const BASE_URL = import.meta.env.VITE_OUR_BASE_URL ?? DEV_BASE_URL_DEFAULT;

console.log("Resolved Base URL", BASE_URL);
