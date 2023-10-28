require('dotenv').config();

export const DB_CONFIG = {
    dbConnectionString: process.env.MONGO_URI as string,
}