import express  from 'express';
import routes   from './routes';
import cors     from 'cors';

// declara o app utilizando a função 'express'
const app = express();

// configura o express para utilizar json
app.use(cors());
app.use(express.json());
app.use(routes);

// corpo (body):    request.body    dados para criação ou atualização do registro
// route params:    request.params  identificar qual recurso quer atualizar o deletar '/users/:id'
// query params:    request.query   paginação, filtros, ordenação

// faz o servidor ouvir uma porta
// localhost:3333 
app.listen(3333);

console.log('servidor em execução!!!');


/*

teste


//código a ser executado na rota 'users'
app.post('/users', (request, response) => 
{

    console.log("acessou a rota");
    console.log(request.body);
    console.log(request.query);

    const users = [

        { name: 'anderson', age: 41},
        { name: 'hiriane' , age: 31},
        { name: 'philipe' , age: 17},
    ];

    return response.json(users);    

});

*/