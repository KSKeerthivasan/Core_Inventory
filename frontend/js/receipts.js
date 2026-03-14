const API = "http://127.0.0.1:8000"


document.getElementById("receiptForm").addEventListener("submit", async function(e){

    e.preventDefault()

    const data = {
        product_id: document.getElementById("product_id").value,
        supplier: document.getElementById("supplier").value,
        quantity: parseInt(document.getElementById("quantity").value)
    }

    const res = await fetch(API + "/receipts/", {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(data)
    })

    const result = await res.json()

    console.log(result)

    alert("Receipt created. ID: " + result.receipt_id)

})


document.getElementById("validateBtn").addEventListener("click", async function(){

    const receiptId = prompt("Enter receipt ID to validate")

    if(!receiptId) return

    const res = await fetch(API + "/receipts/validate/" + receiptId, {
        method:"POST"
    })

    const result = await res.json()

    console.log(result)

    alert("Receipt validated")

})