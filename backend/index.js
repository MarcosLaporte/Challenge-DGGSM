const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Bienvenido a la API de empleados");
});

app.listen(PORT, () => {
  console.log(`Server ejecutando en http://localhost:${PORT}`);
});

app.use("/employees", require("./routes"));
