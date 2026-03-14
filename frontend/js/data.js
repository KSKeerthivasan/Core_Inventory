
async function fetchData(endpoint){
    try{
        const res = await fetch(API + endpoint)

        if(!res.ok){
            console.error("API error:", endpoint, res.status)
            return []
        }

        return await res.json()
    }
    catch(err){
        console.error("Fetch failed:", endpoint, err)
        return []
    }
}



async function loadProducts(){

    const data = await fetchData("/products/")
    const table = document.getElementById("productsTable")

    if(!table) return

    table.innerHTML=""

    data.forEach(p=>{
        table.innerHTML += `
        <tr>
        <td>${p.id}</td>
        <td>${p.name}</td>
        <td>${p.sku}</td>
        <td>${p.category}</td>
        <td>${p.unit}</td>
        <td>${p.stock}</td>
        <td>${p.location}</td>
        </tr>`
    })
}



async function loadReceipts(){

    const data = await fetchData("/receipts/")
    const table = document.getElementById("receiptsTable")

    if(!table) return

    table.innerHTML=""

    data.forEach(r=>{
        table.innerHTML += `
        <tr>
        <td>${r.id}</td>
        <td>${r.product_id}</td>
        <td>${r.supplier}</td>
        <td>${r.quantity}</td>
        <td>${r.status}</td>
        </tr>`
    })
}



async function loadDeliveries(){

    const data = await fetchData("/deliveries/")
    const table = document.getElementById("deliveriesTable")

    if(!table) return

    table.innerHTML=""

    data.forEach(d=>{
        table.innerHTML += `
        <tr>
        <td>${d.id}</td>
        <td>${d.product_id}</td>
        <td>${d.customer}</td>
        <td>${d.quantity}</td>
        <td>${d.status}</td>
        </tr>`
    })
}



async function loadTransfers(){

    const data = await fetchData("/transfers/")
    const table = document.getElementById("transfersTable")

    if(!table) return

    table.innerHTML=""

    data.forEach(t=>{
        table.innerHTML += `
        <tr>
        <td>${t.id}</td>
        <td>${t.product_id}</td>
        <td>${t.from_location}</td>
        <td>${t.to_location}</td>
        <td>${t.quantity}</td>
        <td>${t.status}</td>
        </tr>`
    })
}



async function loadAdjustments(){

    const data = await fetchData("/adjustments/")
    const table = document.getElementById("adjustmentsTable")

    if(!table) return

    table.innerHTML=""

    data.forEach(a=>{
        table.innerHTML += `
        <tr>
        <td>${a.id}</td>
        <td>${a.product_id}</td>
        <td>${a.quantity}</td>
        </tr>`
    })
}



function loadAllData(){
    loadProducts()
    loadReceipts()
    loadDeliveries()
    loadTransfers()
    loadAdjustments()
}



document.addEventListener("DOMContentLoaded", loadAllData)