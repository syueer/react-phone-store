import React, { useContext } from 'react'
import Product from './Product'
import Title from './Title'
import { ProductContext } from '../context'


const ProductList = () => {

    const cart = useContext(ProductContext)

    return (
        <React.Fragment>

            <div className="py-5">
                <div className="container">
                    <Title name="our" title="products" />
                    <div className="row">
                        {cart.products && cart.products.map(product => {
                            return <Product key={product.id} product={product} />
                        })
                        }
                    </div>
                </div>
            </div>
        </React.Fragment>

    )
}
export default ProductList
