import dotenv from "dotenv";
dotenv.config();

export const ENV: Record<string, string> = {
  DB_HOST: process.env.DB_HOST ?? "",
  DB_PORT: process.env.DB_PORT ?? "",
  DB_USER: process.env.DB_USER ?? "",
  DB_PASSWORD: process.env.DB_PASSWORD ?? "",
  DB_NAME: process.env.DB_NAME ?? "",
  FRONTEND_HOST: process.env.FRONTEND_HOST ?? "",
  API_HOST: process.env.API_HOST ?? "",
  GRAPHQL_HOST: process.env.GRAPHQL_HOST ?? "",
};
