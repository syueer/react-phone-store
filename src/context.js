import React, { useState, useEffect } from 'react'
import { storeProducts, detailProduct } from './data'


export const ProductContext = React.createContext();
//provider

//consumer

export const ProductProvider = ({ children }) => {

    const [products, setProducts] = useState([]);
    const [detailproduct, setDetailproduct] = useState(detailProduct);
    const [cart, setCart] = useState([]);
    const [modalopen, setModalOpen] = useState(false);
    const [modalproduct, setModalproduct] = useState(detailProduct);
    const [cartSubtotal, setCartSubtotal] = useState(0);
    const [cartTax, setCartTax] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);
    const [count, setCount] = useState(0);

    useEffect(() => {
        const temProducts = storeProducts.map(p => Object.assign({}, p));
        setProducts(temProducts);
    }, [])

    const getItem = (id) => {
        return products.find(item => item.id === id);
    }

    const handleDetail = (id) => {
        const product = getItem(id);
        setDetailproduct(product);
    }

    const addToCart = (id) => {
        let temProducts = products;
        const index = temProducts.indexOf(products.find(item => item.id === id));
        const product = temProducts[index];
        product.inCart = true;
        product.count = 1;
        product.total = product.price;
        setCart([...cart, product])
    }

    const openModal = (id) => {
        const product = getItem(id);
        setModalproduct(product);
        setModalOpen(true);
    }

    const closeModal = () => {
        setModalOpen(false);
    }

    const increment = (id) => {
        let tempCart = [...cart]
        const selectedProduct = tempCart.find(item => item.id === id)
        const index = tempCart.indexOf(selectedProduct)
        const product = tempCart[index];
        product.count = product.count + 1;
        product.total = product.count * product.price;
        setCart([...tempCart]);
        setCount(prevCount => prevCount + 1);
    }

    const decrement = (id) => {
        let tempCart = [...cart]
        const selectedProduct = tempCart.find(item => item.id === id)
        const index = tempCart.indexOf(selectedProduct)
        const product = tempCart[index];
        product.count = product.count - 1;
        if (product.count === 0) {
            removeItem(id);
        } else {
            product.total = product.count * product.price;
            setCart([...tempCart]);
            setCount(prevCount => prevCount - 1);
        }
    }

    const removeItem = (id) => {
        let tempCart = [...cart]
        let tempProducts = [...products];
        tempCart = tempCart.filter(item => item.id !== id);
        const index = tempProducts.indexOf(products.find(p => p.id === id))
        let removedProduct = tempProducts[index];
        removedProduct.inCart = false;
        removedProduct.count = 0;
        removedProduct.total = 0;
        setCart(tempCart);
        setProducts(tempProducts);
    }

    const clearCart = () => {
        setCart([]);
        setProducts(storeProducts);
    }

    useEffect(() => {
        let subTotal = 0;
        cart.map(item => subTotal += item.total)
        const tempTax = subTotal * 0.1;
        const tax = parseFloat(tempTax.toFixed(2));
        const total = subTotal + tax;
        setCartSubtotal(subTotal);
        setCartTax(tax);
        setCartTotal(total);
    }, [cart, count])

    return (
        <ProductContext.Provider value={{
            products, detailproduct, modalopen, cart, modalproduct, cartSubtotal, cartTax, cartTotal, handleDetail: handleDetail, addToCart: addToCart,
            openModal: openModal, closeModal: closeModal, increment: increment, decrement: decrement, removeItem: removeItem,
            clearCart: clearCart
        }}>
            {children}
        </ProductContext.Provider>
    )
}


