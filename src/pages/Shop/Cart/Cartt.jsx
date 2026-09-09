
import { useEffect ,useState} from "react"


export function Cartt()
{

    const [cartList,setcartList]=useState([])
    const [inventoryList,setinventoryList]=useState([])

    const token=localStorage.getItem("token")

    


    useEffect(()=>{
        getInventory()
        getAdminAccessInventory()
        console.log("inside useEffect")
         fetch("http://localhost:5000/api/cart/",{
             headers: {
            "Authorization": `Bearer ${token}`
         }
            
        })
        .then((res)=>{
            console.log("got the resposne")
            return res.json()
        })
        .then((data)=>{
            console.log("json repsons printed below")
            console.log(data)
            console.log(data.data.items)
            const items=data.data.items
            setcartList(items)
        })
        .catch((error)=>{
            console.log(error)
        })
        



    },[])


    const getInventory=()=>{
         fetch("http://localhost:5000/api/inventory/shop")
        .then((res)=>{
            console.log(res)
            return res.json()
        })
        .then((data)=>{
            console.log("response received from the getShopInventory method printed below ")
            console.log(data.data[22].status)
            console.log(data)
            setinventoryList(data.data)

        })
        .catch((error)=>{
            console.log(error)
        })
    }

    const getAdminAccessInventory=()=>{
        console.log("inside getAdminAccessInventory")
        fetch("http://localhost:5000/api/inventory/",{
            method:"GET",
            headers:{
                "authorization":`Bearer ${token}`


            }
        })
        .then((res)=>{
            return res.json()
        })
        .then((data)=>{
            console.log("response of getAllInventory is printed below")
            console.log(data)
        })
    }

    const handlerfunction=()=>{
        const arr1=[];
         let obj;
         let newarr=[];
        for(let i=0;i<cartList.length;i++)
        {
            obj= inventoryList.find((inventory)=>{
            return inventory.product?._id===cartList[i].product?.id
           
        })
         newarr= [...newarr,obj];
       

        }
         console.log(newarr)
       
    }


    return <>
    <button onClick={()=>{
        handlerfunction()
    }}>click me</button>
     <button onClick={()=>{
        handlerfunction()
    }}>click me</button>
     <button onClick={()=>{
        handlerfunction()
    }}>click me</button>
    <h1>my name is Prem Jagtap</h1>
     <button onClick={()=>{
        handlerfunction()
    }}>click me</button>
     <button onClick={()=>{
        handlerfunction()
    }}>click me</button>
    <h1>My name is Prem Jagtap</h1>
    
       
       
    </>

}