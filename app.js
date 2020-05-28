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
    const { id } = req.params;
    res.render('project', {
        title: projects[id].project_name,
        description: projects[id].description,
        technologies: projects[id].technologies,
        liveLink: projects[id].live_link,
        gitLink: projects[id].github_link,
        images: projects[id].image_urls
    });
});

app.listen(3000, () => {
    console.log('the application is running on localhost:3000')
});