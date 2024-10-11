import mssql from "mssql";

const connectStr = "";
export class DatabasePool {
  static instance: DatabasePool;

  pool: any;
  constructor() {
    console.log("start mssql");

    if (DatabasePool.instance) {
      throw new Error("You can only create one instance of DatabasePool!");
    }
    // Step 3: MSSQL database configuration
    this.connectionPool();
  }

  static getInstance() {
    if (!DatabasePool.instance) {
      DatabasePool.instance = new DatabasePool();
    }

    return DatabasePool.instance;
  }

  async connectionPool() {
    const config: mssql.config | string = {
      user: process.env.MSSQL_DB_USER, // e.g., 'sa'
      password: process.env.MSSQL_DB_PASS, // e.g., 'your_password'
      server: process.env.MSSQL_DB_HOST || "localhost", // e.g., 'localhost'
      database: process.env.MSSQL_DB_NAME, // e.g., 'my_database'
      options: {
        encrypt: true, // Use encryption for Azure
        trustServerCertificate: true, // Enable for self-signed certificates
      },
      pool: {
        max: 10, // Maximum number of connections in the pool
        min: 0, // Minimum number of connections in the pool
        idleTimeoutMillis: 30000, // Close idle connections after 30 seconds
      },
    };
    if (!this.pool) {
      try {
        this.pool = await mssql.connect(config);
        console.log("Connection Pool Create Successfully");
      } catch (error) {
        console.error("Error Creating connection pool", error);
        throw error;
      }
    }

    return this.pool;
  }

  async closeConnectionPool() {
    if (this.pool) {
      try {
        await this.pool.close();
        console.log("Connection Pool Closed Successfully");
      } catch (error) {
        console.error("Error Closing connection pool", error);
        throw error;
      }
    }

    return this.pool;
  }

  static initialize(): void {
    this.getInstance();
  }
}
