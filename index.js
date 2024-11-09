const express = require('express');
const app = express();
const port = 3000;

const { scrapeAmazonProducts } = require('./src/scraping')

app.get('/', async (req, res) => {
  try {

    await scrapeAmazonProducts()
      .then((rs) => {res.send('funciono');})
  } catch (error) {
    console.log(error);
    
    res.send('no funciono');
  }
  
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});