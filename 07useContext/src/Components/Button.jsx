import React ,{useContext}from "react";
import Count from "./Count.JSX";
import { counterContext } from "../Context/Context";

export default function Button( ) {
    const value = useContext(counterContext)
    return (
        <>
            <button 
            onClick={() => value.setCount((count) => count - 1)}
            className="
        bg-blue-400 w-20 rounded-2xl">
                <span>
                    <Count  />
                   
                </span>
                Button
            </button>
        </>
    )
}