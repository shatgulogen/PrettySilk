import { createContext, useReducer } from 'react';
export const Store = createContext();

const initialStateObject = {
    //use local storage to save the items in the cart, when refresh the page, the items will still be there in the cart.
    userInfo: localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo'))
        : null,

    cart: {
        cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [],
    },
};

function reducer(state, action) {
    switch (action.type) {
        case 'CART_ADD_ITEM':
            const newItem = action.payload;
            const itemAlreadyExist = state.cart.cartItems.find(
                (item) => item._id === newItem._id
            );
            const cartItems = itemAlreadyExist
                ? state.cart.cartItems.map((item) =>
                      item._id === itemAlreadyExist._id ? newItem : item
                  )
                : [...state.cart.cartItems, newItem];
            //use local storage to save the items in the cart, when refresh the page, the items will still be there in the cart.
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            return { ...state, cart: { ...state.cart, cartItems } };
        case 'CART_REMOVE_ITEM': {
            const cartItems = state.cart.cartItems.filter(
                (item) => item._id !== action.payload._id
            );
            //use local storage to save the items in the cart, when refresh the page, the items will still be there in the cart.
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            return { ...state, cart: { ...state.cart, cartItems } };
        }
        case 'USER_SIGNIN':
            return { ...state, userInfo: action.payload };
        case 'USER_SIGNOUT':
            return {
                ...state,
                userInfo: null,
            };
        default:
            return state;
    }
}
export function StoreProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialStateObject);
    const value = { state, dispatch };
    return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
