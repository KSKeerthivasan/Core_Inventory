async function loadDashboard(){
    try {
        const [productsRes, receiptsRes, deliveriesRes, transfersRes] = await Promise.all([
            fetch(API + "/products/"),
            fetch(API + "/receipts/"),
            fetch(API + "/deliveries/"),
            fetch(API + "/transfers/")
        ]);

        const products = await productsRes.json();
        const receipts = await receiptsRes.json();
        const deliveries = await deliveriesRes.json();
        const transfers = await transfersRes.json();

        const totalProducts = products.length;
        const lowStockItems = products.filter(p => p.stock < 10).length;
        const pendingReceipts = receipts.filter(r => r.status === "draft").length;
        const pendingDeliveries = deliveries.filter(d => d.status === "draft").length;
        const pendingTransfers = transfers.filter(t => t.status === "draft").length;

        document.getElementById("products").innerText = totalProducts;
        document.getElementById("lowstock").innerText = lowStockItems;
        document.getElementById("receipts").innerText = pendingReceipts;
        document.getElementById("deliveries").innerText = pendingDeliveries;
        document.getElementById("transfers").innerText = pendingTransfers;
    } catch (e) {
        console.error("Error loading dashboard data", e);
    }
}

loadDashboard()