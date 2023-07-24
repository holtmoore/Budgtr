const express = require('express')
const app = express()
const PORT = 3000;
const budget = require('./models/budget'); 

app.set('view engine', 'ejs');

app.use(express.static('public'));

// body-parser middleware
app.use(express.urlencoded({ extended: false }));

app.get('/budgets', (req, res) => {
    res.render('index', { budget: budget }); // uses the "index" view
});

app.listen(PORT, () => {
    console.log(`PORT: ${PORT}, Budgtr running`);
});
