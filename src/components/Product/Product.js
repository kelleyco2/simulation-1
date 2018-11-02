import React from 'react'


export default function Product(props) {
    // let { name, price, img, } = props
    return(
        <div className='product'>
            <img className='img' src={`${props.img}`} alt=''></img>
            <div className='relative'>
            <div className='nameAndPrice'>
                {props.name}<br />
                ${props.price}
            </div>
            {/* Img: {props.img} */}
            <button className='delete' onClick={e => props.deleteProduct(props.id)}>Delete</button> 
            <button className='edit' onClick={e => props.selectId(props.id)}>Edit</button>
            </div>
        </div>
    )
}