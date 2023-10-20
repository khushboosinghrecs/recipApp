const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const { searchRecipes, getRecipeDetails } = require('./api')

const db = mysql.createPool(
    {
        host: 'localhost',
        user: 'root',
        password: '1234',
        database: 'recipe_app',
    }
)
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/get', (req, res) => {
    const apiGet = "select * from users";
    db.query(apiGet, (err, result) => {
        console.log(err);
        console.log(result);
        res.send(result);
    });
    
})

app.get('/', (req, res) => {
    const sqlInsert = "insert into users (username, email, password) values ('john', 'john@gmail.com','john1234') ";
    db.query(sqlInsert, (err, result) => {
        console.log(err);
        console.log(result);
        res.send('hello world');
    });
    
})

app.get('/search/recipes', async (req, res) => {
    try {
       const query = req.params.query;
       const results = await searchRecipes(query);
       res.json(results);
    } catch (error) {
       res.status(500).json({ error: 'Internal Server Error' });
    }
   });
   app.get('/details/:id', async (req, res) => {
    try {
       const id = req.params.id;
       const details = await getRecipeDetails(id);
       res.send(details);
    } catch (error) {
       res.status(500).json({ error: 'Internal Server Error' });
    }
   });
  
app.post('/api/post', (req, res) => {
    const {username, email, password} = req.body;
    const sqlInsert = "insert into users (username, email, password) values (?, ?, ?) ";
    db.query(sqlInsert, [username, email, password], (err, result) => {
       if(err){
        console.log(err);
       }
    });
})
app.listen(8081, () => {
    console.log('listening')
})
