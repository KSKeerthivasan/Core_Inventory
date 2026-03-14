const API = "http://127.0.0.1:8000"

document.getElementById("transferForm").addEventListener("submit", async function(e){

    e.preventDefault()

    const data = {
        product_id: document.getElementById("product_id").value,
        from_location: document.getElementById("from_location").value,
        to_location: document.getElementById("to_location").value,
        quantity: parseInt(document.getElementById("quantity").value)
    }

    const res = await fetch(API + "/transfers/", {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(data)
    })

    const result = await res.json()

    console.log(result)

    alert("Transfer created")
})


document.getElementById("validateBtn").addEventListener("click", async function(){

    const transferId = prompt("Enter Transfer ID")

    if(!transferId) return

    const res = await fetch(API + "/transfers/" + transferId + "/validate", {
        method: "POST"
    })

    const result = await res.json()

    console.log(result)

    alert("Transfer validated")
})