const URLS = "http://localhost:5173,http://localhost:5174";

export const CLIENT_URL = process.env.CLIENT_URL || URLS;

/* export const CLIENT_URL = process.env.CLIENT_URL || [
  "http://localhost:5173",
  "http://localhost:5174",
]; */

/* export const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173"; */

export const PORT = process.env.PORT || 3000;
