
import { useEffect ,useState} from "react"


export function Cart()
{

    const token=localStorage.getItem("token")

    const [cart,setCart]=useState([])


    useEffect(()=>{
        console.log("inside second useEffect")
        fetch("http://localhost:5000/api/inventory/shop")
        .then((res)=>{
            return res.json()
        })
        .then((data)=>{
            console.log("inventory response is printed below")
            console.log(data)
            console.log(data.data)
        })
        .catch((error)=>{
            console.log("their is some error")
        })
    },[])


    useEffect(()=>{
        fetch("http://localhost:5000/api/cart/",{
            headers:{
                "authorization":`Bearer ${token}`
            }
        })
        .then((res)=>{
            console.log("got the response from the backend")
            console.log(res)
            return res.json()
        })
        .then((data)=>{
            console.log("json reeponse is converted into js object")
            console.log(data)
            setCart(data.data.items)
        })
        .catch((error)=>{
            console.log("their is some error")
        })
    },[])


    return (
        <>
        <h1>This is cart page</h1>
      
                
        </>
    )
}