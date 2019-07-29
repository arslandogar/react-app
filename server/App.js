const express = require("express");
const config = require("config");
const User = require("./models/User");
const db = require("./config/database");

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined");
  process.exit(1);
}
//Test db
db.authenticate()
  .then(() => console.log("Database connected..."))
  .catch(err => console.log(err));

const app = express();

app.use(express.json());
app.use("/api/users", require("./routes/users"));
app.use("/api/logins", require("./routes/logins"));

app.get("/", async (req, res) => {
  const users = await User.findAll();
  res.send(users);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
