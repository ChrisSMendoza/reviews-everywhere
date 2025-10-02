# Reviews Everywhere

A Firefox extension to leave reviews on any website.

## Development

```sh
npm install
```

```sh
npm run dev
```

# Extension
## Caveats
With Manifest V3, our content script can no longer make a request to our API. Instead, we now make the request from a background script, `extension-background.js`, and send the response data back in a `Message` (must be serializable). Unfortunately, the background script isn't built with Vite / Rollup since it's not an `input`, so we can't use imports. This is preventing us from importing the `BASE_URL` from `api-client.js`, which means it's hard-coded to the current ngrok URL and will need to be changed during development.
