import React ,{useContext}from "react";
import { counterContext } from "../Context/Context";
 
export default function Count() {
  const value = useContext(counterContext)

    return (
        <>
            <h1> {value.count } </h1>
        </>
    )
}