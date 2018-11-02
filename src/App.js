import React, { Component } from 'react';
import './App.css';
import Dashboard from './components/Dashboard/Dashboard'
import Form from './components/Form/Form'
import Header from './components/Header/Header'
import axios from 'axios';


class App extends Component {
  constructor() {
    super()

    this.state = {
      inventory: [],
      productId: 0
    }

    this.getProducts = this.getProducts.bind(this)
    this.selectId = this.selectId.bind(this)
  }

  selectId(id){
    this.setState({
      productId: id
    })
  }

  getProducts(){
    axios.get('/api/inventory').then(res => {
      console.log(res.data)
      this.setState({
        inventory: res.data
      })
    })
  }

  componentDidMount(){
    this.getProducts()
  }

  render() {
    return (
      <div className="App">
      <Header />
      <div className='container'>
        <div classname='productContainer'>
        <Dashboard 
        inventory={this.state.inventory}
        getProducts={this.getProducts}
        selectId={this.selectId}/>
        </div>
        <Form 
        getProducts={this.getProducts}
        productId={this.state.productId}/>
      </div>
      </div>
    );
  }
}

export default App;
