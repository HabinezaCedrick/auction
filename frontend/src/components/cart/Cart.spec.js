import Cart from './Cart';
import '@testing-library/jest-dom/extend-expect';
import {render, fireEvent, screen} from '@testing-library/react'
import {cartReducer} from '../../reducers/cartReducers';
import {configureStore} from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

import axios from 'axios'


const mockItem = {
    _id: 'abc123',
    product: 'abc123',
    name: 'Mock Item',
    price: '20.00',
    images: ['https://i.picsum.photos/id/1080/200/300.jpg'],
    stock: 1000,
  quantity: 1
}

const initialState = (content) => ({
  cart: {
    cartItems: content ? [
      content
    ] : []
  }
})

describe('Cart component', function () {
  describe('on initial creation with empty cart state', function () {
    it("displays that the cart is empty", () => {
      render(
        <Provider store={configureStore({reducer: cartReducer, preloadedState: initialState()})}  >
          <Cart/>
        </Provider>
      );

      const cartEmpty = screen.getByText('Your Cart is Empty');
      expect(cartEmpty).toBeInTheDocument()
    })
  });
  describe('on initial creation with one item in cart', function () {
    it("displays that the cart is empty", () => {
      render(
        <Router>
          <Provider store={configureStore({reducer: cartReducer, preloadedState: initialState(mockItem)})}  >
            <Cart/>
          </Provider>
        </Router>
      );

      const cartHeader = screen.getByText('Your Cart:');
      expect(cartHeader.textContent).toContain('1 items') // should probably be "1 item"
    })
  });
  describe('when clicking the + button', function () {
    it("increases the quantity by 1", () => {
      render(
        <Router>
          <Provider store={configureStore({reducer: cartReducer, preloadedState: initialState(mockItem)})}  >
            <Cart/>
          </Provider>
        </Router>
      );

      expect(screen.getByTestId('quantity-abc123').value).toEqual("1")
      fireEvent.click(screen.getByText('+'));
      expect(screen.getByTestId('quantity-abc123').value).toEqual("2")
    })
  });
});
