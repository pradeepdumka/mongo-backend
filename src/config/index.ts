import dotenv from "dotenv";
dotenv.config();

if (
  process.env.NODE_ENV !== "dev" &&
  process.env.NODE_ENV !== "prod" &&
  process.env.NODE_ENV !== "test" &&
  process.env.NODE_ENV !== "uat"
) {
  const configFile = `../../.env.${process.env.NODE_ENV}`;
  dotenv.config({ path: configFile });
} else {
  
  dotenv.config();
}

export default {
  HOST: process.env.HOST || "",
  TIMEOUT: process.env.RETRY_TIMEOUT,
  SERVER_PORT: process.env.SERVER_PORT || 3000,
  BASE_CONTEXT_URL: process.env.BASE_CONTEXT_URL || "/",
  BASE_APP_URL: process.env.BASE_APP_URL || "/",
};