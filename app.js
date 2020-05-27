const express = require('express');
const app = express();

const { projects } = require('./data.json');

app.use('/static', express.static('public'));

app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/:id', (req, res) => {
    res.render('project');
});

app.listen(3000, () => {
    console.log('the application is running on localhost:3000')
});