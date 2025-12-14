const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/submit', async (req, res) => {
  try {
    const response = await axios.post(
      'http://backend:5000/process',
      req.body,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    res.send(response.data);
  } catch (error) {
    console.error("Backend error:", error.response?.data || error.message);
    res.status(500).send("Backend error");
  }
});

app.listen(3000, () => {
  console.log('Frontend running on port 3000');
});
