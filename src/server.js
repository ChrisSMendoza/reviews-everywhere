import ViteExpress from "vite-express";

import api from "./api.js";

const PORT = 3000;

ViteExpress.listen(api, PORT, () =>
  console.log(`Server is listening on ${PORT}`),
);
