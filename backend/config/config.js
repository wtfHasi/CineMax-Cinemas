import dotenv from 'dotenv';
dotenv.config();

export default {
  development: {
    url: process.env.PG_URI,
    dialect: "postgres"
  },
  test: {
    url: process.env.PG_URI,
    dialect: "postgres"
  },
  production: {
    url: process.env.PG_URI,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
};
