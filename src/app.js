import express from 'express'
import ProductManager from "./components/ProductManager.js"

const PORT = 8080
const app = express()

const productos = new ProductManager()

app.get('/', (req, res) => {
    res.send(`Product Manager`)
})

app.get('/products', async (req, res) => {
    const limit = Number(req.query.limit)
    const readProduct = await productos.getProductsFromFile()
    const productLimit = readProduct.slice(0, limit)

    if (!limit) {
        return res.json(readProduct)
    }

    res.json(await productLimit)
})

app.get('/products/:pid', async (req, res) => {
    let pid = Number(req.params.pid)
    if(isNaN(pid)) return res.send(`El id no es un número`)
    res.json(await productos.getProductById(pid))
})


app.listen(PORT, () => console.log(`http://localhost:${PORT}`))

