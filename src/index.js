require("./database/database");
const User = require("./database/models/User");

User.create({ name: "Felipe Aguiar" }).then((res) => console.log(res));
