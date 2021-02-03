import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import ProductCardInCheckout from '../components/cards/ProductCardInCheckout';
import {userCart} from '../functions/user';

const Cart = ({history}) => {
    const {user, cart} = useSelector((state) => ({...state}));
    const dispatch = useDispatch()
    const getTotal = () => {
        return cart.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price
        }, 0)

    };
    const saveOrderToDb = () => {
        dispatch({
            type: "COD",
            payload: false,
        })
        userCart(cart, user.token)
        .then((res) => {
            if(res.data.ok) history.push('/checkout');
        }).catch((err) => console.log("cart save err: ", err));
    };
    const saveCashOrderToDb = () => {
        dispatch({
            type: "COD",
            payload: true,
        })
        userCart(cart, user.token)
        .then((res) => {
            if(res.data.ok) history.push('/checkout');
        }).catch((err) => console.log("cart save err: ", err));
    };

    const showCartItems = () => (
        <table className="table table-bordered">
            <thead className="thead-light">
                <tr>
                    <th scope="col">Image</th>
                    <th scope="col">Title</th>
                    <th scope="col">Price</th>
                    <th scope="col">Brand</th>
                    <th scope="col">Color</th>
                    <th scope="col">Count</th>
                    <th scope="col">Shipping</th>
                    <th scope="col">Remove</th>
                </tr>
            </thead>
            {cart.map((p) => (<ProductCardInCheckout key={p._id} p={p} />))}
        </table>
    )

    return(
        <div className="container-fluid">
            <div className="row">
                <h4>Cart / {cart.length}</h4>
            </div>
            <div className="row">
                <div className="col-md-8">
                    {!cart.length ? (
                        <p>No Products in cart. <Link to="/shop">Continue Shopping</Link></p>
                    ) : (
                        showCartItems()
                    )}
                </div>
                <div className="col-md-4">
                    <h4>Order Summary</h4>
                    <hr/>
                    <p>Products</p>
                    {cart.map((c,i) => (
                        <div key={i}>
                            <p>{c.title} x {c.count} = EUR {c.price * c.count}</p>
                        </div>
                    ))}
                    <hr/>
                        Total: <b>EUR {getTotal()}</b>
                    <hr/>
                    {
                        user ? (
                            <>
                                <button onClick={saveOrderToDb} 
                                    className="btn btn-sm btn-primary mt-2"
                                    disabled={!cart.length}>
                                        Proceed to checkout
                                </button>
                                <br />
                                <button onClick={saveCashOrderToDb} 
                                    className="btn btn-sm btn-warning mt-2"
                                    disabled={!cart.length}>
                                        Pay Cash on delivery
                                </button>
                            </>
                        ) : (
                            <button className="btn btn-sm btn-primary mt-2">
                                <Link to={{
                                    pathname: "/login",
                                    state: {from: "cart"}
                                }}>
                                    Login to checkout
                                </Link>
                            </button>                            
                        )
                    }
                </div>
            </div>
        </div>
    )
};

export default Cart;