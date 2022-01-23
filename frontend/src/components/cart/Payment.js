import React, { Fragment, useEffect } from 'react'
import MetaData from '../layout/MetaData'
import CheckoutSteps from './CheckoutSteps'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { createOrder, clearErrors } from '../../actions/orderActions'
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js'
import axios from 'axios'

const options = {
    style: {
        base: {
            fontSize: '16px'
        },
        invalid: {
            color: '#9e2146'
        }
    },
};

const Payment = ({ history }) => {

    const alert = useAlert();
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();

    const { user } = useSelector(state => state.auth)
    const { cartItems, shippingInfo } = useSelector(state => state.cart);
    const { error } = useSelector(state => state.newOrder)

    useEffect(() => {

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

    }, [dispatch, alert, error])

    const order = {
        orderItems: cartItems,
        shippingInfo
    }

    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));
    if (orderInfo) {
        order.itemsPrice = orderInfo.itemsPrice
        order.shippingPrice = orderInfo.shippingPrice
        order.taxPrice = orderInfo.taxPrice
        order.totalPrice = orderInfo.totalPrice
        order.totalPrices = orderInfo.totalPrices
    }

    const paymentData = {
        amount: Math.round(orderInfo.totalPrices * 100),
        
    }
    const payWithCard = async (e) => {
        e.preventDefault();

        document.querySelector('#pay_btn').disabled = true;

        let res;
        try {

            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            res = await axios.post('/api/v1/payment/process', paymentData, config)

            const clientSecret = res.data.client_secret;

            console.log(clientSecret);

            if (!stripe || !elements) {
                return;
            }

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email
                    }
                }
            });

            if (result.error) {
                alert.error(result.error.message);
                document.querySelector('#pay_btn').disabled = false;
            } else {

                // The payment is processed or not
                if (result.paymentIntent.status === 'succeeded') {

                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status
                    }

                    dispatch(createOrder(order))

                    history.push('/success')
                } else {
                    alert.error('There is some issue while payment processing')
                }
            }


        } catch (error) {
            document.querySelector('#pay_btn').disabled = false;
            alert.error(error.response.data.message)
        }  
    }
    const afripayform = async (e) => {
        if(afripayform == true) {
        dispatch(createOrder(order))
        history.push('/success')
        }
        else{
            //alert.error('There is some issue while payment processing');
            document.querySelector('#afripayform').disabled = false;
        }
}

const payNow = async() => {
    dispatch(createOrder(order))
    history.push('/success')
}

    

    return (
        <Fragment>
            <MetaData title={'Payment'} />

            <CheckoutSteps shipping confirmOrder payment />

            ACCEPT PAYMENTS METHODS: <img src="/images/card2.jpg" />

            <div className="row wrapper col-21 col-lg-18 mt-3">
            <div className="row d-flex justify-content-between">
            <form action="https://afripay.africa/checkout/index.php" method="post" id="afripayform"className="shadow-lg">
    <h1 className="mb-4">Click Here:</h1>
<button className="btn btn-block py-3" onClick={payNow}>Pay Now {` - ${(orderInfo && orderInfo.totalPrice)}`} RWF
<input type="hidden" name="amount" value={orderInfo.totalPrice}></input>
<input type="hidden" name="currency" value="RWF" ></input>
<input type="hidden" name="comment" value="Order 122"></input>
<input type="hidden" name="client_token" value=""></input>
<input type="hidden" name="return_url" value="/success"></input>
<input type="hidden" name="app_id" value="10c91e7ce9366b9641a7b999bf76ccb9"></input>
<input type="hidden" name="app_secret" value="JDJ5JDEwJC4yaUpy"></input>
<input type="image" src="images/paynw.png" alt="" onclick="document.afripayform.submit();"></input>
 </button>
 </form>
            <div className="col-25 col-lg-13 mt-9 order-confirm">
                    <form className="shadow-lg">
        
                        <h1 className="mb-4">Card Info</h1>
                        <div className="form-group">
                            <label htmlFor="card_num_field">Card Number</label>
                            <CardNumberElement
                                type="text"
                                id="card_num_field"
                                className="form-control"
                                options={options}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="card_exp_field">Card Expiry</label>
                            <CardExpiryElement
                                type="text"
                                id="card_exp_field"
                                className="form-control"
                                options={options}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="card_cvc_field">Card CVC</label>
                            <CardCvcElement
                                type="text"
                                id="card_cvc_field"
                                className="form-control"
                                options={options}
                            />
                        </div>


                        <button
                            id="pay_btn"
                            onClick={payWithCard}
                            type="submit"
                            className="btn btn-block py-3"
                        >
                            Pay $  {` - ${(orderInfo && orderInfo.totalPrices)}`}
                        </button>
                        
                    </form>
                </div>

                </div>
            



        

            </div>       
</Fragment>
    )
}
export default Payment
