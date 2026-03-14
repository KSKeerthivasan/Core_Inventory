const API = "http://127.0.0.1:8000"

document.getElementById("adjustForm").addEventListener("submit", async function(e){

    e.preventDefault()

    const data = {
        product_id: document.getElementById("product_id").value,
        new_quantity: parseInt(document.getElementById("quantity").value)
    }

    const res = await fetch(API + "/adjustments/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })

    const result = await res.json()
    console.log(result)

    alert("Stock adjusted successfully")
    document.getElementById("adjustForm").reset()
})

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