import React, { Component } from 'react'
import Product from './Product';
import Title from'./Title';
// import {storeProducts} from "../Data"
import {ProductConsumer} from '../Context';

export default class Productlist extends Component {
    // state={
    //     products:storeProducts
    // }
    render() {
       
        return (
            <React.Fragment>
                <div className="py-5">
                    <div className="container">
                        <Title name="our  " title=" our products"/>
                        <div className="row">
                            <ProductConsumer>
                                {value=>{
                                   return value.products.map(product=>{
                                       return <Product key ={product.id}product={product}></Product>

                                   })

                                }}

                            </ProductConsumer>


                        </div>

                    </div>

                </div>
            </React.Fragment>
        );
    }
}
