import React from 'react';
import formatCurrency from './../util';

export default function Cart(props) {

    const [showCheckout, setShowcheckout] = React.useState(false);
    const [emailState, setEmail] = React.useState('');
    const [nameState, setName] = React.useState('');
    const [addressState, setAddress] = React.useState('');


    const { cartItems, removeFromCart, createOrder } = props;

    const handleInput = e => {
        return (
            e.target.name === 'email' ? setEmail(e.target.value) :
                e.target.name === 'name' ? setName(e.target.value) :
                    e.target.name === 'address' ? setAddress(e.target.value) : ''
        )
        // this.setState({[e.target.name]: e.target.value})
    }

    const submitOrder = e => {
        console.log('Order:', e)

        e.preventDefault(); // bcoz not gonna refresh the page
        const order = {
            name: nameState,
            email: emailState,
            address: addressState,
            cartItems: cartItems,
        }
        createOrder(order); // saving in parent component
    }

    return (
        <div>
            <div>
                {cartItems.length === 0 ? <div className="cart cart-header">Cart is empty</div>
                    : <div className="cart cart-header">{cartItems.length} items in the cart</div>}

            </div>
            <div className="cart">
                <ul className="cart-items">
                    {cartItems.map(item => (
                        <li key={item._id}>
                            <div>
                                <img src={item.images} alt={item.title}></img>
                            </div>
                            <div>
                                <div>{item.title}</div>
                                <div className="right">
                                    {formatCurrency(item.price) + 'x' + item.count}
                                    <button
                                        className="button"
                                        onClick={() => removeFromCart(item)}>
                                        Remove
                                    </button>
                                </div>
                            </div>

                        </li>
                    ))}
                </ul>
            </div>
            {cartItems.length !== 0 && (
                <div>
                    <div className="cart">
                        <div className="total">
                            <div> Total: {' '}
                                {formatCurrency(
                                    cartItems.reduce((total, currentItem) => total + (currentItem.price * currentItem.count), 0)
                                )}
                            </div>
                            <button
                                className="button primary"
                                onClick={() => setShowcheckout(true)}
                            >Proceed</button>
                        </div>
                    </div>

                    {showCheckout && (
                        <div className="cart">
                            <form onSubmit={submitOrder}>
                                <ul className="form-container">
                                    <li>
                                        <label>Email</label>
                                        <input
                                            name="email"
                                            type="email"
                                            required
                                            onChange={handleInput}
                                        ></input>
                                    </li>
                                    <li>
                                        <label>Name</label>
                                        <input
                                            name="name"
                                            type="text"
                                            required
                                            onChange={handleInput}
                                        ></input>
                                    </li>
                                    <li>
                                        <label>Address</label>
                                        <input
                                            name="address"
                                            type="address"
                                            required
                                            onChange={handleInput}
                                        ></input>
                                    </li>
                                    <li>
                                        <button
                                            type="submit"
                                            className="button primary"
                                        >
                                            Checkout
                                        </button>
                                    </li>
                                </ul>
                            </form>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
} 
