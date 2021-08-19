const { request, response } = require('express');
const app = require('express')();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

let clientes = [
    {id: 1, nome: 'Cíndia Moraes da Silva', telefone: '998887766'},
    {id: 2, nome: 'Rodrigo Maciel da Silva', telefone: '999321654'},
    {id: 3, nome: 'Rodrigo Moraes da Silva', telefone: '999765432'},
    {id: 4, nome: 'Lucas Moraes da Silva', telefone: '998887733'},  
]

app.get('/clientes', (request, response) => response.json(clientes))

app.get('/clientes/:nome', (request, response)=> {
    const cliente = clientes.filter(value=> value.nome == request.params.nome);
    response.json(cliente);
})

app.post('/clientes', (request, response)=>{
    const cliente = request.body;
   clientes.push(cliente);
   response.json(cliente);
})

app.put('/clientes/:id', (request, response) =>{
    const id = request.params.id;
    const nome = request.body.nome;

    let cliente = clientes.filter(value => value.id == id);

    cliente[0].nome = nome;

    response.json(cliente[0]);
})

app.delete('/clientes/:id', (request, response)=>{
    const id = request.params.id;
    clientes = clientes.filter(value => value.id != id);
    response.json(clientes)
})

app.listen(3000);