import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"
import { clearCart, removeFromCart, incrementQty,
    decrementQty } from "../../redux/slice/cartSlice";
import { getImgUrl } from "../../utils/imgUrl";
import { useState } from "react";

const Cart = () => {

    const cartItems = useSelector(state => state.cart.cartItems);
    const dispatch =  useDispatch()

    //TOTAL PRICE CALCULATION
    // const totalPrice =  cartItems.reduce((acc, item) => acc + item.newPrice, 0).toFixed(2);

    //updated code to calculate total price based on quantity
    // const totalPrice = cartItems.reduce((acc, item) => acc + item.newPrice * item.quantity, 0)
    //         .toFixed(2);

    // Updated code new code Calculate the total price based on quantity
    const totalPrice = cartItems
  .reduce((acc, item) => acc + (parseFloat(item.newPrice || 0) * (item.quantity || 1)), 0)
  .toFixed(2);

  console.log("Total Price::::", totalPrice.quantity);

           

    const handleRemoveFromCart = (product) => {
        dispatch(removeFromCart(product))
        // console.log("Product have been removed",product);
    }
    

    const handleClearCart  = () => {
        dispatch(clearCart())
    }
  return (
    <>
      <div className="flex mt-12 h-full flex-col overflow-hidden bg-white shadow-xl">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                    <div className="flex items-start justify-between">
                        <div className="text-lg font-medium text-gray-900">Shopping cart</div>
                        <div className="ml-3 flex h-7 items-center ">
                            <button
                                type="button"
                                onClick={handleClearCart }
                                className="relative -m-2 py-1 px-2 bg-red-500 text-white rounded-md transition-all duration-200  "
                            >
                                <span className="">Clear Cart</span>
                            </button>
                        </div>
                    </div>

                    <div className="mt-8">
                        <div className="flow-root">

                            {
                                cartItems.length > 0 ? (
                                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                                        {
                                            cartItems.map((product) => (
                                                <li key={product?._id} className="flex py-6">
                                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                        <img
                                                            alt=""
                                                            src={`${getImgUrl(product?.coverImage)}`}
                                                            className="h-full w-full object-cover object-center"
                                                        />
                                                    </div>

                                                    <div className="ml-4 flex flex-1 flex-col">
                                                        <div>
                                                            <div className="flex flex-wrap justify-between text-base font-medium text-gray-900">
                                                                <h3>
                                                                    <Link to='/books/:id'>{product?.title}</Link>
                                                                </h3>
                                                                <p className="sm:ml-4">${product?.newPrice}</p>
                                                            </div>
                                                            <p className="mt-1 text-sm text-gray-500 capitalize"><strong>Category: </strong>{product?.category}</p>
                                                        </div>
                                                        <div className=" flex flex-1 flex-wrap items-end justify-between space-y-2 text-sm">
                                                 <div className="flex gap-2">
                            
                            {/* ADD INCREMENT AND DECREMENT BUTTON TO CART */}
                                                        <button
                                                        // onClick={decrement}
                                                        onClick={() => dispatch(decrementQty(product))}
                                                            className="px-2 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
                                                            -
                                                        </button>

                                                        
                                                        {/* <div className="px-3 text-gray-500 flex flex-col"><strong>Qty:</strong> 1  </div> */}
                                                        <div className="px-3 text-gray-500 flex flex-col"><strong>Qty:</strong> {product?.quantity} </div>
                                                        
                                                        <button
                                                        // onClick={increment}
                                                        onClick={() => dispatch(incrementQty(product))}
                                                            className="px-2 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
                                                           +
                                                        </button>

                                                 </div>
        
                                                            <div className="flex">
                                                                <button
                                                                onClick={() => handleRemoveFromCart(product)}
                                                                // onClick={handleRemoveFromCart} 
                                                                type="button" className="font-medium text-red-600 hover:text-red-500">
                                                                    Remove
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))
                                        }



                                    </ul>
                                ) : (<p>No product found!</p>)
                            }
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>${totalPrice ? totalPrice : 0}</p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                    <div className="mt-6">
                        <Link
                            to="/checkout"
                            className="flex items-center justify-center rounded-md border border-transparent bg-primary px-6 py-3 text-base font-medium text-white shadow-sm"
                        >
                            Checkout
                        </Link>
                    </div>
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <Link to="/">
                            or
                            <button
                                type="button"
                                className="font-medium text-primary ml-1"
                            >
                                Continue Shopping
                                <span aria-hidden="true"> &rarr;</span>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
    </>
  )
}

export default Cart
