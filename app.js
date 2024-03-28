const express = require('express');
const { ProductManager } = require("./productManager")

const productManager = new ProductManager('./products.json');


const app = express()

app.get('/products', async (req, res) => {
    const products = await productManager.getProducts();
    res.send(products);
});

 app.get('/products/:pid', async (req, res) => {
     const { pid } = req.params;
     const productos = await productManager.getProducts();
     const product =  productos.find(p => p.id === parseInt(pid))
     res.send(product);
 });

app.listen(8080, err => {
    if (err) console.log(err)
    console.log(`escuchando en 8080`);
});