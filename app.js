const express = require('express');
const { ProductManager } = require("./productManager")

const productManager = new ProductManager('./products.json');


const app = express()

app.get('/products', async (req, res) => {
    try {
        const limit = req.query.limit;
        const products = await productManager.getProducts();
        if (limit) {
            const limitedProducts = products.slice(0, parseInt(limit));
            return res.send(limitedProducts);
        }
        res.send(products);
    } catch (error) {
        console.log(error)
    }
});

app.get('/products/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        const productos = await productManager.getProducts();
        const product = productos.find(p => p.id === parseInt(pid))
        res.send(product);
    } catch (error) {
        console.log(error)
    }
});

app.listen(8080, err => {
    if (err) console.log(err)
    console.log(`escuchando en 8080`);
});