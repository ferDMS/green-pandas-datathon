const express = require('express');
const csv = require('csv-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors());

app.get('/get_data', (req, res) => {
    const routeId = req.query.route_id;
    const results = [];

    fs.createReadStream('./predictions/predictions_1.csv')
        .pipe(csv())
        .on('data', (data) => {
            if (data.Route_ID === routeId) {
                results.push(data);
            }
        })
        .on('end', () => {
            res.json(results);
        })
        .on('error', (error) => {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while reading the CSV file' });
        });
});

app.get('/count_routes', (req, res) => {
    let routeIds = new Set(); // Un Set almacena valores únicos
  
    fs.createReadStream('./predictions/predictions_1.csv')
      .pipe(csv())
      .on('data', (row) => {
        routeIds.add(row.route_id); // Añade el route id al Set
      })
      .on('end', () => {
        res.json({ count: routeIds.size }); // Devuelve el tamaño del Set, que es el número de route id únicos
      });
  });

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});