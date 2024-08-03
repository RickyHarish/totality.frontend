import { call, put, takeEvery, select} from 'redux-saga/effects';
import axios from 'axios';
import {
    CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING_ADDRESS, CART_SAVE_PAYMENT_METHOD
} from '../constants/cartConstants';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

// Cart API call functions
function* addToCartSaga(action) {
    try {
        const { id, qty } = action.payload;
        const { data } = yield call(axios.get, `${BACKEND_URL}/api/products/${id}`);
        console.log(data)
        yield put({
            type: CART_ADD_ITEM,
            payload: {
                product: data._id,
                name: data.name,
                image: data.image,
                price: data.price,
                countInStock: data.countInStock,
                qty,
            },
        });
        localStorage.setItem('cartItems', JSON.stringify(yield select(state => state.cart.cartItems)));
    } catch (error) {
        console.log({"Adding Cart Error": error})
    }
}

// Cart API call functions

function* removeFromCartSaga(action) {
  try {
      yield put({ type: CART_REMOVE_ITEM, payload: action.payload });
      localStorage.setItem('cartItems', JSON.stringify(yield select(state => state.cart.cartItems)));
  } catch (error) {
      
    console.log({"Removing Cart Error": error})
  }
}

function* saveShippingAddressSaga(action) {
  try {
      yield put({ type: CART_SAVE_SHIPPING_ADDRESS, payload: action.payload });
      localStorage.setItem('shippingAddress', JSON.stringify(action.payload));
  } catch (error) {
    console.log({"Shipping address Error": error})
  }
}

function* savePaymentMethodSaga(action) {
  try {
      yield put({ type: CART_SAVE_PAYMENT_METHOD, payload: action.payload });
      localStorage.setItem('paymentMethod', JSON.stringify(action.payload));
  } catch (error) {
    console.log({"Payment Method Error": error})
  }
}

// Watchers
export function* watchCartActions() {
  yield takeEvery('CART_ADD_ITEM', addToCartSaga);
  yield takeEvery('CART_REMOVE_ITEM', removeFromCartSaga);
  yield takeEvery('CART_SAVE_SHIPPING_ADDRESS', saveShippingAddressSaga);
  yield takeEvery('CART_SAVE_PAYMENT_METHOD', savePaymentMethodSaga);
}
