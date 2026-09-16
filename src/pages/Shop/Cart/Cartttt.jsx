

import { useEffect } from "react"
import { useState } from "react"

export function Cartttt()
{

    const token=localStorage.getItem("token")
    const [cart,setcart]=useState([])
    const [inventory,setinventory]=useState([])



    useEffect(()=>{
        console.log("control is inside the first useEffect")
       
        fetch("http://localhost:5000/api/cart",{
            headers:{
                "authorization":`Bearer ${token}`
            }
        })
        .then((res)=>{
            console.log("got the response from the backend")
            return res.json()
        })
        .then((data)=>{
            console.log("res is converted into the json response")
            console.log("cart items is printed below")
            console.log(data)
            console.log("array is printed below")
            console.log(data.data.items)
        })
        .catch((error)=>{
            console.log("their is some error")
        })
        

    },[])



    useEffect(()=>{
        console.log("control is inside the second useEffect")
        fetch("http://localhost:5000/api/inventory/shop")
        .then((res)=>{
            console.log("got the inventory response from the backend")
            return res.json()
        })
        .then((data)=>{
            console.log("inventory data is printed below")
            console.log(data)
            console.log("inventory array is printed below")
            console.log(data.data)
        })
        .catch((error)=>{
            console.log(error)
            console.log("their is some error")
            console.log(error)
        })
        

    },[])





    return(
        <>
            <h1>Surprise Surprise Prem Jagtap is back</h1>
        </>
    )
}