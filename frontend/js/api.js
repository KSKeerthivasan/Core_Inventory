const API = "http://127.0.0.1:8000"


async function createProduct(data){

    const res = await fetch(API + "/products/",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(data)
    })

    return await res.json()
}


async function getProducts(){

    const res = await fetch(API + "/products/")

    return await res.json()
}



async function createReceipt(data){

    const res = await fetch(API + "/receipts/",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(data)
    })

    return await res.json()
}


async function validateReceipt(id){

    const res = await fetch(API + "/receipts/validate/" + id,{
        method:"POST"
    })

    return await res.json()
}


async function createDelivery(data){

    const res = await fetch(API + "/deliveries/",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(data)
    })

    return await res.json()
}


async function validateDelivery(id){

    const res = await fetch(API + "/deliveries/validate/" + id,{
        method:"POST"
    })

    return await res.json()
}


async function createTransfer(data){

    const res = await fetch(API + "/transfers/",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(data)
    })

    return await res.json()
}


async function validateTransfer(id){

    const res = await fetch(API + "/transfers/validate/" + id,{
        method:"POST"
    })

    return await res.json()
    
}

async function adjustStock(data){

    const res = await fetch(API + "/adjustments/",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(data)
    })

    return await res.json()
}

async function getDashboard(){

    const res = await fetch(API + "/dashboard/")

    return await res.json()
}