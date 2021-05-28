import React, { Component } from 'react'

import {storeProducts,detailProduct}  from './Data' 
const ProductContext =React.createContext();


class Context extends Component {
    state={
        products: [],//storeProducts,
        detailProduct:detailProduct,
        cart:[], 
        modalOpen: false,
        modalProduct:detailProduct,
        cartSubtotal:0,
        cartTax:0,
        cartTotal:0,
    };
    componentDidMount(){
        this.setProducts();
    }
    setProducts=()=>{
        let tProducts=[];
        storeProducts.forEach(item=>{
            const singleItem = {...item};
            tProducts=[...tProducts,singleItem];
        })
        this.setState(()=>{
            return {products:tProducts};
        })
    }
    getItem=(id)=>{
        const product=this.state.products.find(item=>item.id===id);
        return product; 
    }
    handleDetail =(id)=>{
        const product=this.getItem(id);
        this.setState(()=>{
            return {detailProduct:product};
        });
        // console.log("hello from detail";);

    }
    addToCart =(id)=>{
        let tempProduct=[...this.state.products];
        const index=tempProduct.indexOf(this.getItem(id));
        const product=tempProduct[index];
        product.inCart=true;
        product.count=1;
        const price=product.price;
        product.total=price;
        this.setState(
            ()=>{

       return {products:tempProduct,cart:[...this.state.cart,product]} ;
        },()=>{ 
          this.addTotals()}
         
        );
    }

       openModal = id =>{
                const product=this.getItem(id);
                this.setState(()=>{
                    return{
                        modalProduct:product,modalOpen:true
                    };
                })

            }
            closeModal=()=>{
                this.setState(()=>{
                    return{modalOpen:false}
                })
            }
       increment=(id)=>{
           let tempCart=[...this.state.cart];
           const selectedProduct=tempCart.find(item=>item.id===id)
           const index =tempCart.indexOf(selectedProduct);
           const product=tempCart[index];
           product.count=product.count+1;
           product.total=product.count* product.price;
           this.setState(()=>{
               return{cart:[...tempCart]}

           },()=>{
               this.addTotals()

           })
        //    console.log("icrement")

       }
              
       decrement=(id)=>{
            let tempCart=[...this.state.cart];
           const selectedProduct=tempCart.find(item=>item.id===id)
           const index =tempCart.indexOf(selectedProduct);
           const product=tempCart[index];

           product.count=product.count-1;
           if(product.count ===  0){
               this.removeItem(id)

           }
           else{
               product.total=product.count * product.price;
               this.setState(()=>{
               return{cart:[...tempCart]};

           },()=>{
               this.addTotals()

           })
           }
        //    console.log("decrement")
           
       }
       removeItem=(id)=>{
           let tempProducts=[...this.state.products];
           let tempCart=[...this.state.cart]
           tempCart=tempCart.filter(item=>item.id!==id);
           const index=tempProducts.indexOf(this.getItem(id));
           let removedProduct=tempProducts[index];
           removedProduct.inCart=false;
           removedProduct.count=0
           removedProduct.total=0;
           this.setState(()=>{
               return{
                   cart:[...tempCart],
                   products:[...tempProducts]
               }
           },
           ()=>{
               this.addTotals()
           })


        //    console.log('remove item')
       }

        clearCart=()=>{
           this.setState(()=>{
               return{cart:[]};}

           ,()=>{
               this.setProducts();
               this.addToCart();
           }) 
       }
       addTotals=()=>{
           let subTotal=0;
           this.state.cart.map(item=>(subTotal+=item.total))
           const tempTax=subTotal * 0.1;
           const tax=parseFloat(tempTax.toFixed(2));
           const total=subTotal+tax
           this.setState(()=>{
               return{
                   cartSubtotal:subTotal,
                   cartTax:tax,
                   cartTotal:total
               }
            }
           )


       }

        // console.log(`hello from cart.id  ${id}`);
        
    

    // tester=()=>{
    //     console.log('State products',this.state.products[0].inCart);
    //     console.log('Date products',storeProducts[0].inCart);
    //     const tempProducts=[...this.state.products];
    //     tempProducts[0].inCart=true
    //         this.setState(()=>{return {products:tempProducts};},
    //     ()=>{
    //           console.log('state products',this.state.products[0].inCart);
    //         console.log('state products',storeProducts[0].inCart);

    //     }
    //         );
    //     };
   
    render() {
        return (
            <ProductContext.Provider 
            value={{
                ...this.state,
                handleDetail:this.handleDetail,
                addToCart:this.addToCart,
                openModal:this.openModal,
                closeModal:this.closeModal,
                increment:this.increment,
                decrement:this.decrement,
                clearCart:this.clearCart,
                removeItem:this.removeItem,

            }}>
                {/* <button onClick={this.tester}> test me</button> */}
                {this.props.children}
            </ProductContext.Provider>
        );
    }
}


const ProductConsumer=ProductContext.Consumer;
export{Context,ProductConsumer}