import { createContext, useReducer } from 'react';
export const Store = createContext();

const initialStateObject = {
    cart: {
        cartItems: [],
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
            return { ...state, cart: { ...state.cart, cartItems } };
        default:
            return state;
    }
}
export function StoreProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialStateObject);
    const value = { state, dispatch };
    return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
