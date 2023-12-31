require("dotenv/config");
module.exports = {
  host: "localhost",
  port: process.env.PORT,
  password: process.env.PASSWORD,
  username: process.env.USER_NAME,
  database: "NodeSequelize",
  dialect: "postgres",
  define: {
    timestamps: true,
    underscored: true,
  },
};
