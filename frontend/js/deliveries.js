const API = "http://127.0.0.1:8000"


document.getElementById("deliveryForm").addEventListener("submit", async function(e){

    e.preventDefault()

    const data = {
        product_id: document.getElementById("product_id").value,
        customer: document.getElementById("customer").value,
        quantity: parseInt(document.getElementById("quantity").value)
    }

    const res = await fetch(API + "/deliveries/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })

    const result = await res.json()

    console.log(result)

    alert("Delivery created")

})



document.getElementById("validateBtn").addEventListener("click", async function(){

    const deliveryId = prompt("Enter Delivery ID")

    if(!deliveryId) return

    const res = await fetch(API + "/deliveries/" + deliveryId + "/validate", {
        method: "POST"
    })

    const result = await res.json()

    console.log(result)

    alert("Delivery validated")

})