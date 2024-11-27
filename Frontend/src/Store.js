import { createContext } from "react";

export const Store =createContext();

export function StoreProvider(props){
    const [state,dispatch] = useReducer(reducer,initialState)
}