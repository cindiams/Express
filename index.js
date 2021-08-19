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

function log(request, response, next){
    const{url, method} = request;
    console.log(`${method} = ${url} at ${new Date()}`)
    return next();
}
app.use(log)

app.get('/clientes', (request, response) => response.status(200).json(clientes))

app.get('/clientes/:nome', (request, response)=> {
    const {nome} = request.params;
    const cliente = clientes.find(value=> value.nome == nome);
    if (cliente == undefined){
        response.status(400).json({error: "Requisição Inválida!"});
    }else{
        response.status(200).json(cliente);
    }
    
})

app.post('/clientes', (request, response)=>{
    const cliente = request.body;
   clientes.push(cliente);
   response.status(201).json(cliente);
})

app.put('/clientes/:id', (request, response) =>{
    const id = request.params.id;
    const nome = request.body.nome;

    let cliente = clientes.find(value => value.id == id);
    if (cliente == undefined){
        response.status(400).send();
    }else{
        cliente.nome = nome;
        response.status(200).json(cliente);
    }
   
})

app.delete('/clientes/:id', (request, response)=>{
    const id = request.params.id;
    const  index = clientes.findIndex(value => value.id == id);
    if(index == -1){
        response.status(400).send();
    }else{
        clientes.splice(index, 1);
        response.status(204).send();
    }
})

app.listen(3000);