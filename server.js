const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const SalesManager = require('./models/salesManager'); // Assuming you have a SalesManager model defined
const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/salesManagersDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Get all sales managers
app.get('/', async (req, res) => {
    try {
        const salesManagers = await SalesManager.find();
        res.render('index', { salesManagers });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

// Add sales manager form
app.get('/add-sales-manager', (req, res) => {
    res.render('form'); // Assuming you have a form.ejs file for adding sales managers
});

// Add a new sales manager
app.post('/add-sales-manager', async (req, res) => {
    const { name, age, department, email, phoneNumber, hireDate, performanceRating, address } = req.body;
    const salesManager = new SalesManager({ name, age, department, email, phoneNumber, hireDate, performanceRating, address });
    try {
        await salesManager.save();
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
