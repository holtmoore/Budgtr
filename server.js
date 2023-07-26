const express = require('express')
const app = express()
const PORT = 3000;
const budget = require('./models/budget'); 
var bodyParser = require('body-parser');

let bankAccount = 0;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.get('/budgets', (req, res) => {
    res.render('index', { budget: budget, bankAccount: bankAccount });
});

app.get('/budgets/new', (req, res) => {
    res.render('new');
});

app.get('/budgets/:id', (req, res) => {
    const id = req.params.id;
    res.render('show', { budgetItem: budget[id] });
});

app.post('/budgets', (req, res) => {
    console.log(req.body);
    req.body.tags = req.body.tags.split(',').map(tag => tag.trim());
    budget.push(req.body);
    bankAccount += Number(req.body.amount);
    res.redirect('/budgets');
});

app.listen(PORT, () => {
    console.log(`PORT: ${PORT}, Budgtr running`);
});
