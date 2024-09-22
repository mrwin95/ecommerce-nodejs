interface AppConfig {
  port: number | string;
}

interface DBConfig {
  host: string;
  port: number | string;
  name: string;
}

interface EnvConfig {
  app: AppConfig;
  db: DBConfig;
}

// Development env configuration
const dev: EnvConfig = {
  app: {
    port: process.env.DEV_APP_PORT || 3055,
  },
  db: {
    host: process.env.DEV_DB_HOST || "localhost",
    port: process.env.DEV_DB_PORT || 27021,
    name: process.env.DEV_DB_NAME || "shopDev",
  },
};

// Production env configuration
const prod: EnvConfig = {
  app: {
    port: process.env.PRO_APP_PORT || 3055,
  },
  db: {
    host: process.env.PRO_DB_HOST || "localhost",
    port: process.env.PRO_DB_PORT || 27017,
    name: process.env.PRO_DB_NAME || "prod",
  },
};

const config: Record<string, EnvConfig> = { dev, prod };

enum EnvType {
  Development = "dev",
  Production = "prod",
}
const env: EnvType = (process.env.NODE_ENV as EnvType) || EnvType.Development;

export default config[env];
