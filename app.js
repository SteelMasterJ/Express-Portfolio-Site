//express set up
const express = require('express');
const app = express();

//requiring data
const { projects } = require('./data.json');
//setting up static files
app.use('/static', express.static('public'));
//set up pug
app.set('view engine', 'pug');
//home page
app.get('/', (req, res) => {
    res.render('index', { projects });
});
//about page
app.get('/about', (req, res) => {
    res.render('about');
});

//custom routes to project pages
app.get('/:id', (req, res) => {
    const projectId = req.params.id;

    res.render('project', {
        title: projects[projectId].project_name,
        description: projects[projectId].description,
        technologies: projects[projectId].technologies,
        liveLink: projects[projectId].live_link,
        gitLink: projects[projectId].github_link,
        images: projects[projectId].image_urls
    });
});

//custom error handlers
app.use(function(req, res, next) {
    const err = new Error('Looks like this page doesn\'t exist...    yet');
    err.status = 404;
    next(err);
  });

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = err;
    res.status(err.status || 500);
    res.render('error', err);
});

//setting up server to be on port 3000
app.listen(3000, () => {
    console.log('the application is running on localhost:3000')
});