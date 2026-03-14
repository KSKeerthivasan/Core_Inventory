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