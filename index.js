const express = require('express');

const app = express();
app.use(express.json());
const port = 3000;
const sql = require('./db.js')

app.get('/test-conn', (req, res) => {
    sql.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
    if (err) throw err;
      res.status(200).send({ solution: rows[0].solution });
  })
})

app.get('/cows', (req, res) => {
  sql.query('SELECT * FROM Cows', (err, rows, fields) => {
    if (err) throw err;
    res.status(200).send(rows);
  })
})

app.get('/cow/:id', (req, res) => {
  sql.query(
    'SELECT * FROM Cow WHERE id = ?',
    req.params.id,
   (err, rows, fields) => {
  if (err) throw err;
    res.status(200).send(rows);
  })
})

app.get('/', (req, res) => {
  res.send('Hello World, from express');
});
   
  app.post('/cow', (req, res) => {
    sql.query(
      'INSERT INTO Cow (name, weight, total_milk, last_milking_time) VALUES (?, ?, ?, ?)',
      [
        req.body.name,
        req.body.weight,
        req.body.total_milk,
        req.body.last_milking_time,
      ],   
      //'INSERT INTO Cow VALUES ?',
      //req.body,
      // TODO ::   
      (err, rows, field) => {
        if (err) throw err;
        console.log("created: ", { id: rows.insertId, ...req.body, });
        res.status(201).send({ id: rows.insertId, ...req.body });
    });
  });
   
  app.put('/cows/id', (req, res) => {
    sql.query(
      "UPDATE cow SET name = ?, weight = ?, total_milk = ?, last_milking_time = ?, WHERE id = ?",
      [
        req.body.name,
        req.body.weight,
        req.body.total_milk,
        req.body.last_milking_time,
        req.params.id,
      ],   
    (err, rows, field) => {
      if (err) throw err;
      console.log("updated: ", { rows });
      res.status(204).send();
    }
  )
  });
   
  app.delete('/cow/:id', (id, res) => {
    console.log(req.params.id);
    sql.query("DELETE FROM Cow WHERE id=?",
      req.params.id,
      (err, rows, field) => {
        if (err) throw err;
        console.log("deleted: ", rows);
        res.status(204).send();
      }
    );
    return res.send('Received a DELETE HTTP method');
  });

  app.listen(port, () =>
    console.log(`Hello world app listening on port ${port}!`));