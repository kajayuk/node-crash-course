const { render } = require('ejs');
const express = require('express');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

//Express app
const app = express();

// Connect to mongodb
const dbURI = 'mongodb+srv://Ukeni:Mike49859@nodecourse.mkgjb.mongodb.net/node-tuts?retryWrites=true&w=majority';
// mongoose.connect(dbURI, { useNewUrlParses: true, useUnifiedTopology: true });
mongoose.connect(dbURI)
.then((result) => app.listen(3000))
.catch((err) => console.log(err));

//Register view engine
app.set('view engine', 'ejs');

// Middleware and static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About'});
});

// Blog routes
app.use('/blogs', blogRoutes);

//404 page 
app.use((req, res) => {
    res.status(404).render('404', { title: '404'});
}); 