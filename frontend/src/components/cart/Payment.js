import React, { Fragment, useEffect } from "react";
import MetaData from "../layout/MetaData";
import CheckoutSteps from "./CheckoutSteps";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { createOrder, clearErrors } from "../../actions/orderActions";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import axios from "axios";

const options = {
  style: {
    base: {
      fontSize: "16px",
    },
    invalid: {
      color: "#9e2146",
    },
  },
};

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

const Payment = ({ history }) => {
  const alert = useAlert();
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { error } = useSelector((state) => state.newOrder);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error]);

  const order = {
    orderItems: cartItems,
    shippingInfo,
  };

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  if (orderInfo) {
    order.itemsPrice = orderInfo.itemsPrice;
    order.shippingPrice = orderInfo.shippingPrice;
    order.taxPrice = orderInfo.taxPrice;
    order.totalPrice = orderInfo.totalPrice;
    order.totalPrices = orderInfo.totalPrices;
  }

  const paymentData = {
    amount: Math.round(orderInfo.totalPrices * 100),
  };
  const payWithCard = async (e) => {
    e.preventDefault();

    document.querySelector("#pay_btn").disabled = true;

    let res;
    try {
      res = await axios.post("/api/v1/payment/process", paymentData, config);

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
            email: user.email,
          },
        },
      });

      if (result.error) {
        alert.error(result.error.message);
        document.querySelector("#pay_btn").disabled = false;
      } else {
        // The payment is processed or not
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          dispatch(createOrder(order));

          history.push("/success");
        } else {
          alert.error("There is some issue while payment processing");
        }
      }
    } catch (error) {
      document.querySelector("#pay_btn").disabled = false;
      alert.error(error.response.data.message);
    }
  };
  
  const sendToAfriPay = async () => {
    const orderDetails = {
      amount: orderInfo.totalPrice, //WILDLY INSECURE. This is exactly what I hacked in front of you - no backend validation.
      currency: "RWF",
      comment: "Order 122", // DEFINITELY WRONG
      client_token: "", // ALSO PROBABLY WRONG,
      return_url: "http://localhost:3000/payment", // Also wrong for a hosted site. Should be external URL. Works fine on local, but not in the real world
      app_id: "10c91e7ce9366b9641a7b999bf76ccb9",
      app_secret: "JDJ5JDEwJC4yaUpy", // not very secret.....
    };

    return axios.post(
      "https://afripay.africa/checkout/index.php",
      orderDetails,
      config
    );
  };

  const payWithAfripay = async (event) => {
    event.preventDefault();
    try {
      await sendToAfriPay();
      dispatch(createOrder(order));
      history.push("/success");
    } catch (e) {
      alert.error("There is some issue while payment processing:", e);
      document.querySelector("#afripayform").disabled = true;
    }
  };

  return (
    <Fragment>
      <MetaData title={"Payment"} />
      <CheckoutSteps shipping confirmOrder payment />
      ACCEPT PAYMENTS METHODS:{" "}
      <img
        src="/images/card2.jpg"
        alt="Payment available via Visa and Mastercard, as well as MTN and Airtel mobile money"
      />
      <div className="row wrapper col-21 col-lg-18 mt-3">
        <div className="row d-flex justify-content-between">
          <form
            id="afripayform"
            className="shadow-lg"
            onSubmit={payWithAfripay}
          >
            <h1 className="mb-4">Click Here:</h1>
            <button className="btn btn-block py-3" type="submit">
              Pay Now {` - ${orderInfo && orderInfo.totalPrice}`} RWF
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
                Pay $ {` - ${orderInfo && orderInfo.totalPrices}`}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default Payment;
