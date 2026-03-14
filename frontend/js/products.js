async function addProduct(e){

    e.preventDefault()

    const data = {
        name: document.getElementById("name").value,
        sku: document.getElementById("sku").value,
        category: document.getElementById("category").value,
        unit: document.getElementById("unit").value,
        stock: parseInt(document.getElementById("stock").value),
        location: document.getElementById("location").value
    }

    const res = await createProduct(data)

    console.log(res)

    alert("Product added")

    document.getElementById("productForm").reset()
}

document.getElementById("productForm").addEventListener("submit", addProduct)