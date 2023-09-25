import * as mongoose from "mongoose";

console.log("Initializing mongoose...");
mongoose.set("debug", true);

const db = {
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
}

if (!db.host || !db.username || !db.password) {
  console.log("CRITICAL: .env missing DB_HOST, DB_USERNAME, or DB_PASSWORD!");
  process.exit(1);
} else {
  console.log("Found database correctly.");
}

const URI = `mongodb+srv://${db.username}:${db.password}@${db.host}`;

console.log("Trying to connect to MongoDB...");

mongoose
  .connect(URI)
  .then(() => {
    console.log("MongoDB connected successfully!");
    console.log("Database:", mongoose.connection.name);
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  });
