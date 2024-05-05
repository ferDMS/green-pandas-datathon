const express = require('express');
const csv = require('csv-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors());

app.get('/get_data', (req, res) => {
    const routeId = req.query.route_id;
    const results = [];

    fs.createReadStream('merged_data_with_predictions.csv')
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

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});