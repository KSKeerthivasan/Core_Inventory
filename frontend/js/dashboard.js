const session = localStorage.getItem("session")

if(!session){
    window.location.href = "login.html"
}

async function loadDashboard(){

    const data = await getDashboard()

    document.getElementById("products").innerText = data.total_products
    document.getElementById("lowstock").innerText = data.low_stock_items
    document.getElementById("receipts").innerText = data.pending_receipts
    document.getElementById("deliveries").innerText = data.pending_deliveries
    document.getElementById("transfers").innerText = data.pending_transfers
}

loadDashboard()