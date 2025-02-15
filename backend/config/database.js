import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize(process.env.PG_URI, {
  dialect: 'postgres',
});
sequelize.authenticate()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch((err) => console.log("PostgreSQL Error:", err));

export default sequelize;
