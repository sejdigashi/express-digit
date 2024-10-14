import express from 'express';
import 'dotenv/config';

const app = express();

const port = process.env.PORT || 3000;
const name = "sejdi";
app.use(express.json());

let teas = [];
let nextId = 1;

// create a tea
app.post("/teas", (req, res) => {
  const { name, price } = req.body;
  const newTea = { id: nextId++, name, price };
  teas.push(newTea);
  res.status(201).send(newTea);
});

// get all teas
app.get("/teas", (req, res) => {
  res.status(201).send(teas);
});

// get a tea by id
app.get("/teas/:id", (req, res) => {
  const tea = teas.find(t => t.id === parseInt(req.params.id));
  if (!tea) {
    return res.status(404).send("no result found!");
  }
  res.status(200).send(tea);

});

// update a tea
app.put("/teas/:id", (req, res) => {
  const tea = teas.find(t => t.id === parseInt(req.params.id));
  if (!tea) {
    return res.status(404).send("no result found!");
  }
  const { name, price } = req.body;
  tea.name = name;
  tea.price = price;
  res.status(200).send(tea);
});

// delete a tea
app.delete("/teas/:id", (req, res) => {
  console.log("delete");
  const index = teas.findIndex(t => t.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).send("no result found!");
  }
  teas.splice(index, 1);
  res.status(204).send("Deleted");
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});