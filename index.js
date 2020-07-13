const express = require('express');

const database = require('./database')

const server = express();

server.use(express.json());


server.get('/', (req,res) =>{
    return res.json({
        result: 'DESAFIO API RAVEL (Desculpa o atraso)'
    });
})

server.post('/users', async (req,res)=>{
    let inserido;
    const {id, name, age, email, phone} = req.body
    await database.query(`INSERT INTO users VALUES(${id}, '${name}', '${age}', '${email}', '${phone}');`,
    {type:database.QueryTypes.INSERT})
    .then(result =>{
        inserido = result;
    }).catch(error => {
        return res.json(error);
    });

    if(inserido[1]) {
        return res.json({
            result: 'Usuário cadastrado com sucesso'
        });
    }else {
        return res.json({
            result:'Erro ao cadastrar usuário'
        })
    }
})

server.get('/users', async (req,res) =>{
    let userList;
    await database.query(`SELECT * FROM users`, {type: database.QueryTypes.SELECT})
    .then(users =>{
        userList = users;
    })
    .catch(error =>{
        return res.json(error)
    })

    return res.json({userList});
})

server.get('/users/:id', async (req,res) =>{
    const {id} = req.params;
    let user;
    await database.query(`SELECT * FROM users WHERE id = ${id}`,
   {type: database.QueryTypes.SELECT})
}).then(userId =>{
    user = userId;
}).catch(error =>{
    return res.json(error);
})

server.delete('/users:id', async (req,res) => {
    const {id} = req.params;

    await database.query(`DELETE FROM teste WHERE id = ${id};`, 
    {type: database.QueryTypes.DELETE})
    .catch(error =>{
        return res.json(error);
    });

    return res.json({result:'Usuário deletado com sucesso'});
})

server.update('/users:id', async (req,res) =>{
    let atualizado;
    const {id} = req.params;
    const { name, age, email, phone} = req.body
    await database.query(`UPDATE users SET name = '${name}', age = ${age}, email = '${email}', phone = '${phone}' WHERE id = ${id};`,
    {type: database.QueryTypes.UPDATE})     
    .then(result =>{
        atualizado = result;
    }).catch(error => {
        return res.json(error);
    });    
    if(atualizado[1]){
        return res.json({
            result:'Dados atualizados com sucesso'
        });
    } else {
        return res.json({
            result:'Os dados não foram atualizados'
        })
    }  
})





server.listen(process.env.PORT);
