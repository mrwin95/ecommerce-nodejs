import mssql from "mssql";

const connectStr = "";
class MssqlDatabase {
  constructor() {
    this.connect();
  }

  connect() {
    const conn = mssql
      .connect(connectStr)
      .then(() => console.log("Connected to mssql database"))
      .catch((err) => console.log("Error connect db"));
  }
}
