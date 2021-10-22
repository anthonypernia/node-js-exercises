const { Router } = require('express');
const router = Router();
const  path  = require('path');

let productos = [
    {
        id: 1,
        title: "Producto 1",
        price: 100,
        thumbnail: ""
    },
    {
        id: 2,
        title: "Producto 2",
        price: 200,
        thumbnail: ""
    },
    {
        id: 3,
        title: "Producto 3",
        price: 300,
        thumbnail: ""
    }
];

function serverRouter(app){
    app.use('/api', router);
    app.use('/api', router);

    router.get('/', (req, res) => {
        console.log("main");
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });

    router.get('/productos', (req, res) => {
        res.send(productos);
    });
    router.get('/productos/:id', (req, res) => {
        console.log("Ruta productos ---> Get (ID)");
        let id = req.params.id;
        let producto = productos.find(producto => producto.id == id);
        if (producto) {
            res.send(producto);
        }else{
            res.send({
                error: "Producto no encontrado"
            })
        }
    });


    router.post('/productos', (req, res) => {
        console.log("Ruta productos ---> Post");
        let producto = req.body;
        let incrementarId = productos.length + 1;
        producto.id = incrementarId;
        productos.push(producto);
        res.send(producto);
    });

    router.put('/productos/:id', (req, res) => {
        console.log("Ruta productos ---> Update");
        console.log(productos);
        let id = req.params.id;
        let productoEntrada = req.body;
        let productoActualizado = productos.find(producto => producto.id == id);
        productoActualizado.title = productoEntrada.title;
        productoActualizado.price = productoEntrada.price;
        productoActualizado.thumbnail = productoEntrada.thumbnail;
        res.send(productoActualizado);
    })

    router.delete('/productos/:id', (req, res) => {
        console.log("Ruta productos ----> Delete");
        let id = req.params.id;
        let productoEliminado = productos.find(producto => producto.id == id);
        let index = productos.indexOf(productoEliminado);
        productos.splice(index, 1);
        res.send(productoEliminado);
    });

    router.post('/form', (req, res) => {
        console.log("Ruta form ---> Post");
        let producto = req.body;
        if (producto.title && producto.price && producto.thumbnail) {
            console.log("Todo OK");
            let incrementarId = productos.length + 1;
            producto.id = incrementarId;
            productos.push(producto);
            res.send(producto);
    }
    });

}

module.exports = serverRouter;