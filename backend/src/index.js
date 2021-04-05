const express = require('express');


require('dotenv').config();

const app = express();

app.get('/', (req,  res) => {
    res.json(404, {
      status: 200,
      result: 'Hola Mundo'  
    });
});

app.listen(3000, () => {  
  console.log('Server running on port 3000...')
});