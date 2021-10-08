const express = require('express');

const app = express();
const port = 3000;
const sql = require('./db.js')

app.get('/test-conn', (req, res) => {
    sql.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
    if (err) throw err;
      res.status(200).send({ solution: rows[0].solution });
  })
})

app.get('/', (req, res) => {
  res.send('Hello World, from express');
});

app.get('/cow', (req, res) => {
  sql.query('SELECT * FROM Cow', (err, rows, fields) => {
  if (err) throw err;
    res.status(200).send(rows);
  })
})
   
  // app.post('/cow', (req, res) => {
  //   sql.query('INSERT INTO Cow SET ?', req, (err, rows) {
  //     if (err) throw err;

  //   return res.send('Received a POST HTTP method');
  // });
   
  // app.put('/', (req, res) => {
  //   return res.send('Received a PUT HTTP method');
  // });
   
  // app.delete('/', (req, res) => {
  //   return res.send('Received a DELETE HTTP method');
  // });

  app.listen(port, () =>
    console.log(`Hello world app listening on port ${port}!`));