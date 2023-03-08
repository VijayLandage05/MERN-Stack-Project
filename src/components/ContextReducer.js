import React, { createContext, useContext, useReducer } from 'react'

//we can change state from anywhere
const CartSateContext = createContext();

const CartDispatchContext = createContext();

const reducer = (state, action) => {
    switch (action.type) {

        //in order to add items to my cart
        case "ADD":
            return [...state, {id:action.id, name:action.name, qty:action.qty, size:action.size, price:action.price, img:action.img}]

        //in order to remove items from my cart
        case "REMOVE":
            let newArr = [...state]
            newArr.splice(action.index, 1)
            return newArr;
        case "UPDATE":
            let arr = [...state]
            arr.find((food, index) => {
                if(food.id === action.id){
                    console.log(food.qty, parseInt(action.qty), action.price + food.price)
                    arr[index] = { ...food, qty: parseInt(action.qty) + food.qty, price:action.price + food.price}
                }
                return arr;
            })
            return arr;
        case "DROP":
            let empArray = []
            return empArray;
        default:
            console.log("Error in reducer")
    }
}

export const CartProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, [])
    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartSateContext.Provider value={state}>
                {children}
            </CartSateContext.Provider>
        </CartDispatchContext.Provider>
    )
}

export const useCart = () => useContext(CartSateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
