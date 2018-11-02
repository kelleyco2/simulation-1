import React from 'react'

export default function Product(props) {
    // let { name, price, img, } = props
    return(
        <div>
            Name: {props.name}
            Price: {props.price}
            Img: {props.img}
            <button onClick={e => props.deleteProduct(props.id)}>Delete</button> 
            <button onClick={e => props.selectId(props.id)}>Edit</button>
        </div>
    )
}