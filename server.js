const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 5555;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));
app.use("/css", express.static(__dirname+"public/css"))
app.use("/js", express.static(__dirname+"public/js"))
app.use("/img", express.static(__dirname+"public/img"))

//set views
app.set('views', './views')
app.set("view engine", "ejs");

app.listen(port, () => {
  console.log(`server running in ${port}`);
});

const userData = {
  username: "tian",
  password: "12345",
  email: "abc@gmail.com",
  alamat : "pamulang"
};

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/game", (req, res) => {
  res.render("game");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", (req, res) => {
  const loginReq = req.body;
  if (loginReq.username !== userData.username) {
    res.status(400).send({
      message: "Username is not registered",});
  } else if (loginReq.password !== userData.password) {
    res.status(400).send({ message: "Password is incorrect" });
  } else if (loginReq.email !== userData.email) {
    res.status(400).send({ message: "Email is incorrect" });
  }
  res.status(200).send({
    message: "Login Successful",
    data: userData,
  });
});
