const express = require('express');
const app = express();

const { projects } = require('./data.json');

app.use('/static', express.static('public'));

app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('index', { projects });
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/:id', (req, res) => {
    // const { id } = req.params;
    const projectId = req.params.id;
    const project = projects.find( ({ id }) => id === +projectId );

    if (project) {
        res.render('project', {
            title: projects[projectId].project_name,
            description: projects[projectId].description,
            technologies: projects[projectId].technologies,
            liveLink: projects[projectId].live_link,
            gitLink: projects[projectId].github_link,
            images: projects[projectId].image_urls
        });
    } else {
        res.sendStatus(404);
    }
});


// app.use(function(req, res, next) {
//     const err = res.status(404);
//     next(err);
//   });

// app.use((err, req, res, next) => {
//     res.locals.message = err.message;
//     res.locals.error = err;
//     res.status(err.status || 500);
//     res.render('error', err);
// });

app.listen(3000, () => {
    console.log('the application is running on localhost:3000')
});