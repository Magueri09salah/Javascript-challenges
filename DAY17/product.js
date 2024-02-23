// Create an Express.js application with the following routes:
const express = require('express');

const app = express();

let products = [
    { id: 1, name: 'iPhone12Pro', price: 1099.99 },
    { id: 2, name: 'Samsung Galaxy S21', price: 999.99 },
    { id: 3, name: 'Sony PlayStation 5', price: 499.99 },
    { id: 4, name: 'MacBook Pro 16', price: 2399.99 },
    { id: 5, name: 'DJI Mavic air 2', price: 799.99 },
    { id: 6, name: 'Dqdffd', price: 799.99 },
  ];

  app.use(express.json());

// GET /products: This route should return a list of all products.
app.get('/products', (req,res) => {
    res.json(products);
});



// GET /products/search: This route should allow users to search for products based on query parameters: q, minPrice, maxPrice.

app.get('/products/search' , (req,res)=>{
    const {q,min,max} = req.query;
    if(q){
        selectedProduct = products.filter(product => product.name.includes(q))
        // console.log('1');
        res.json(selectedProduct);
    }
    else if(min){
        selectedProduct = products.filter(product =>  product.price >= parseFloat(min))
        // console.log('2');

        res.json(selectedProduct);
    }
    else if(max){
        selectedProduct = products.filter(product =>  product.price <= parseFloat(max))
        // console.log('3');

        res.json(selectedProduct);
    }
    else{
        res.status(404).json({ error: 'Product not found' });
    }
})



// GET /products/:id: This route should return the details of a specific product identified by its ID.
app.get('/products/:id', (req,res) => {
    const id = parseInt(req.params.id);
    filteredProduct = products.find(product => product.id === id);
    if(filteredProduct){
        res.json(filteredProduct);
    }
    else{
        res.status(404).json({ error: 'Product not found' });
    }
})


// POST /products: This route should allow users to create a new product.
app.post('/products', (req,res)=>{
    const {name,price} = req.body;

    if(!name || !price){
        res.status(404).json({error : 'Product not added'});
    }
    else{
        const id = products.length + 1;
        const newProduct = {id, name, price : parseFloat(price)};
        products.push(newProduct);
        res.status(201).json(newProduct);
    }
})


// PUT /products/:id: This route should allow users to update the details of a specific product.
app.put('/products/:id', (req,res)=>{
    const id = parseInt(req.params.id);
    const {name , price} = req.body;
    const index = products.findIndex(product => product.id === id);
    if(index !== -1){
        if (name) {
            products[index].name = name;
        }
        else if(price){
            products[index].price = parseFloat(price);
        }
        res.json(products[index]);
    }
    else{
        res.status(404).json({error : 'Product not updated'});
    }

})

// DELETE /products/:id: This route should allow users to delete a specific product.
app.delete('/products/:id' , (req,res)=>{
    const id = parseInt(req.params.id);
    const productIndex = products.findIndex(product => product.id === id);
    console.log(productIndex);
    if (productIndex !== -1) {
        products.splice(productIndex, 1);
        res.sendStatus(204);
    } else {
        res.status(404).json({ error: 'Product not found' });
      }
})


app.listen(3000, ()=>{
    console.log(`server is running`);
})
