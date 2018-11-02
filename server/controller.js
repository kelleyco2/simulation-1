module.exports = {
    getProducts: (req, res) => {
        let db = req.app.get('db')
        db.get_inventory().then(response => {
            res.status(200).send(response)
        })
    },

    createProduct: (req, res) => {
        let db= req.app.get('db')
        let { name, price, img } = req.body
        db.create_product({name, price, img}).then(response => {
            res.status(200).send(response)
        })
    },

    deleteProduct: (req, res) => {
        let db = req.app.get('db')
        let {id} = req.params
        db.delete_product(id).then(response => {
            res.status(200).send(response)
        })
    },

    // could'nt get this to work 
    updateProduct: (req, res) => {
        let db = req.app.get('db')
        let {id} = req.params
        let { name , price, img } = req.body
        db.update_product(id, [name, price, img]).then(response => {
            res.status(200).send(response)
        })
        
    }
}