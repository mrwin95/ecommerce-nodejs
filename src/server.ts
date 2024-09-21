import app from "./app";

const PORT: number = Number(process.env.PORT) | 3055;

const server = app.listen(PORT, () => {
  console.log(`WSV eCommerce start at: ${PORT}`);
});

process.on("SIGINT", () => {
  server.close(() => console.log("Exit Express Server"));
});
