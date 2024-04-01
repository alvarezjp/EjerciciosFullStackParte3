const express = require(`express`);
const morgan = require(`morgan`);
const cors = require(`cors`);
const app = express();

app.use(cors());
app.use((request, response, next) => {
  request.timestamp = new Date().toLocaleString();
  next();
});
app.use(express.json());

morgan.token('bodyPost', (req) => {
  if (req.method === 'POST') {
      return JSON.stringify(req.body); // Recupera los datos de la solicitud POST como JSON
  } else {
      return 'vacio'; // Devuelve una cadena vacía si no es una solicitud POST
  }
});

app.use(morgan(`:method :url :status :res[content-length] - :response-time ms :bodyPost`));

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.post(`/api/persons`, (request, response) => {
  const { name, number } = request.body;
  const namesPersons = persons.some((info) => info.name === name);

  if (!name || !number) {
    console.log("falta informacion");
    return response.status(400).json({ error: "content missing" });
  }

  if (namesPersons) {
    return response.status(400).json({ error: "name must be unique" });
  } else {
    const id = Math.floor(Math.random() * 1000);
    const newData = {
      id,
      name,
      number,
    };
    persons = persons.concat(newData);
    console.log(newData);
    response.json(newData);
  }
});

app.delete(`/api/persons/:id`, (request, response) => {
  const id = parseInt(request.params.id);
  persons = persons.filter((info) => info.id !== id);
  response.status(204).end();
  console.log(persons);
});

app.get(`/api/persons/:id`, (request, response) => {
  const id = parseInt(request.params.id);
  const data = persons.find((info) => info.id === id);
  if (data) {
    response.json(data);
  } else {
    response.statusMessage = "The id was not found";
    response.status(404).end();
  }
});

app.get(`/api/persons`, (request, response) => {
  response.json(persons);
});

app.get(`/info`, (request, response) => {
  const numero = persons.length;
  response.send(
    `<h1>Esta agenda tiene ${numero} contactos...  La hora ${request.timestamp}</h1>`
  );
});

app.get(`/`, (request, response) => {
  response.send(`<h1>Servidor en funcionamiento</h1>`);
  console.log("Alguna cosa funciona");
});

const unknownEndPoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndPoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
