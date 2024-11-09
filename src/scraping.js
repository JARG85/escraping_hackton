const puppeteer = require('puppeteer');

async function scrapeAmazonProducts() {

  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.goto('https://www.amazon.com/s?k=smartphones'); // Reemplaza con la URL de búsqueda deseada

  // Esperar a que los productos se carguen (ajusta el selector según la estructura de Amazon)
  await page.waitForSelector('.s-result-item');

  // Obtener los productos
  const products = await page.$$eval('.s-result-item', products => {
    return products.map(product => {
      const title = product.querySelector('.a-link-normal')?.textContent || "";
      const price = product.querySelector('.a-offscreen')?.textContent || "";
      const link = product.querySelector('.a-link-normal')?.href || "";
      return { title, price, link };
    });
  });

  console.log(JSON.stringify(products, null, 2));

  await browser.close();
}

module.exports = { scrapeAmazonProducts }