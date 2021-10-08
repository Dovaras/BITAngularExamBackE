const express = require('express');
const app = express();
const port = 3000;

var mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'cow_farm'
})

connection.connect()
let solution = 0;
connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
    if (err) throw err
    console.log('The solution is: ', rows[0].solution)
  })
  connection.end()

app.get('/test-conn', (req, res) => {})

app.get('/', (req, res) => {
    res.send('Hello World, from express');
});


app.get('/', (req, res) => {
    return res.send('Received a GET HTTP method');
  });
   
  app.post('/', (req, res) => {
    return res.send('Received a POST HTTP method');
  });
   
  app.put('/', (req, res) => {
    return res.send('Received a PUT HTTP method');
  });
   
  app.delete('/', (req, res) => {
    return res.send('Received a DELETE HTTP method');
  });

  app.listen(port, () =>
    console.log(`Hello world app listening on port ${port}!`));