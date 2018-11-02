import React, { Component } from 'react';
import Product from '../Product/Product'
import axios from 'axios';

class Dashboard extends Component {
    constructor(){
        super()

        this.deleteProduct = this.deleteProduct.bind(this)
    }

    deleteProduct(id){
        axios.delete(`/api/inventory/${id}`).then(res => {
            console.log(res)
        })
        this.props.getProducts()
    }

    render(){
        return(
            this.props.inventory.map((product, i) => {
                return (
                    <div key={i}>
                        <Product 
                        name={product.name}
                        price={product.price}
                        img={product.img}
                        id={product.id}
                        deleteProduct={this.deleteProduct}
                        selectId={this.props.selectId}/>
                    </div>
                )
            })
            
        )
    }
}

export default Dashboard