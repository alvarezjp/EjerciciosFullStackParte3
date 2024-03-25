const express = require(`express`);
const app = express();

app.use((request,response,next)=>{
  request.timestamp = new Date().toLocaleString();
  next();
});

const persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
];



app.get(`/api/persons/:id`,(request,response)=>{
  const id = parseInt(request.params.id);
  const data = persons.find(info => info.id === id);
  if (data){
    response.json(data);
  }
  else{
    response.statusMessage="The id was not found"
    response.status(404).end();
    
  }

})

app.get(`/api/persons`,(request,response)=>{
  response.json(persons);
})

app.get(`/info`,(request,response)=>{
  const numero = persons.length;
  response.send(`<h1>Esta agenda tiene ${numero} contactos...  La hora ${request.timestamp}</h1>`);
})

app.get(`/`,(request,response)=>{
    response.send(`<h1>Servidor en funcionamiento</h1>`);
    console.log("Alguna cosa funciona");
})

const PORT = 3001;
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});