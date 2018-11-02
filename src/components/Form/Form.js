import React, { Component } from 'react';
import axios from 'axios';

class Form extends Component {
    constructor() {
        super()

        this.state = {
            name: '',
            price: 0,
            img: '',
            productId: null
        }
        this.handleChange = this.handleChange.bind(this)
        this.clearState = this.clearState.bind(this)
        this.addProduct = this.addProduct.bind(this)
        this.updateProduct = this.updateProduct.bind(this)
    }

    componentDidUpdate(prevProps){
        if(prevProps.productId !== this.props.productId){
            this.setState({
                productId: this.props.productId
            })
        }
    }

    handleChange(val, key){
        let obj = {}
        obj[key] = val
        this.setState(obj)
    }

    clearState(){
        this.setState({
            name: '',
            price: 0,
            img: ''
        })
    }

    addProduct(){
        let { name, price, img} = this.state
        axios.post('/api/inventory', {name, price, img}).then(res => {
            this.setState({
                name,
                price,
                img
            })
            this.props.getProducts()
            this.clearState()
        })
    }

    updateProduct(){
        let { nameInput, priceInput, imgInput } = this.state
        let { id } = this.state.productId
        let newProduct = {
            name: nameInput,
            price: priceInput,
            img: imgInput
        }
        axios.put(`/api/inventory/${id}`, newProduct).then(res => {
            let product = res.data[0]
            this.setState({
                product,
                productId: null
            })
        })
    }


    render(){
        let { name, price, img } = this.state
        return(
            <div>
                Form
                <input value={name} onChange={(e) => this.handleChange(e.target.value, 'name')}/>
                <input value={price} onChange={(e) => this.handleChange(e.target.value, 'price')}/>
                <input value={img} onChange={(e) => this.handleChange(e.target.value, 'img')}/>
                <button onClick={this.clearState}>Cancel</button>
                {
                    this.state.productId ?
                    (
                        <button onClick={this.updateProduct}>Save Changes</button>
                    ) :
                    (
                        <button onClick={this.addProduct}>Add</button>
                    )
                }
            </div>
        )
    }
}

export default Form