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

    // couldn't get the update to work on the database
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
                
                
                {
                    this.state.productId ?
                    (
                        <div className='formContainer'>
                        <img className='formImg'src={`${this.state.img}`} alt='' />
                        <div className='inputs'>
                            <div>Image URL:<br/><input value={img} onChange={(e) => this.handleChange(e.target.value, 'img')}/></div><br />
                            <div>Product Name:<br/><input value={name} onChange={(e) => this.handleChange(e.target.value, 'name')}/></div><br />
                            <div>Price:<br/><input value={price} onChange={(e) => this.handleChange(e.target.value, 'price')}/></div><br />
                        </div>
                        <div className='buttons'>
                            <button onClick={this.clearState}>Cancel</button>
                            <button onClick={this.updateProduct}>Save Changes</button>
                        </div>
                        </div>
                    ) :
                    (
                        
                        <div className='formContainer'>
                        <img className='formImg'src='data:image/png;base64,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' alt='' />
                        <div className='inputs'>
                            <div>Image URL:<br/><input value={img} onChange={(e) => this.handleChange(e.target.value, 'img')}/></div><br />
                            <div>Product Name:<br/><input value={name} onChange={(e) => this.handleChange(e.target.value, 'name')}/></div><br />
                            <div>Price:<br/><input value={price} onChange={(e) => this.handleChange(e.target.value, 'price')}/></div><br />
                        </div>
                        <div className='buttons'>
                            <button onClick={this.clearState}>Cancel</button>
                            <button onClick={this.addProduct}>Add To Inventory</button>
                        </div>
                        </div>
                    )
                }
            </div>
        )
    }
}

export default Form