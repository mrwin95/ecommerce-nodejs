import { pool } from "mssql";

const mssql_dev = {
  app: {
    port: process.env.DEV_APP_PORT,
  },
  db: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_PRIMARY_SERVER,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT) || 1433,
    options: {
      encrypt: true,
      trustServerCertificate: true,
      enableArithAbort: true,
      multiSubnetFailover: true,
    },
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000,
    },

    replicas: [
      {
        server: process.env.DB_REPLICAS1_SERVER,
        port: process.env.DB_REPLICAS1_PORT || 1433,
        readOnlyIntent: true,
      },
      {
        server: process.env.DB_REPLICAS2_SERVER,
        port: process.env.DB_REPLICAS2_PORT || 1433,
        readOnlyIntent: true,
      },
    ],
  },
};
