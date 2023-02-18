import mongoose from "mongoose";
import config from "config";
import logger from "./logger";

async function connect() {
  const dbUri = <string>process.env.MONGO_URI;

  try {
    await mongoose.connect(dbUri);
    logger.info("DB connected!");
  } catch (error) {
    logger.error("Could not connect to DB!");
    process.exit(1);
  }
}

export default connect;
