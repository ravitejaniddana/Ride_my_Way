const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

// Middleware (if you're using body-parser)
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));
app.use(express.static(path.join(__dirname, 'public')));


// Define Routes (we'll expand on this)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/create_ride', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'create_ride.html'));
});

// Start the Server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
