
import { useEffect ,useState} from "react"


export function Cart()
{

    const token=localStorage.getItem("token")

    const [cart,setCart]=useState([])
    const [inventory,setInventory]=useState([])


    const clickHandler=(e)=>{
        const arr=[]
        e.preventDefault()
        console.log("inside click handler")
        for(let i=0;i<cart.length;i++)
        {
            for(let j=0;j<inventory.length;j++)
            {
                if(cart[i].product._id===inventory[j].product._id)
                {
                    arr=[...arr,cart[i]]
                }
            }
        }

        console.log(arr)
       
    }


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
            setInventory(data)
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
       <button onClick={clickHandler}>click me</button>
                
        </>
    )
}