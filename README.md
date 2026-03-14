# CoreInventory 📦

CoreInventory is a **full-stack inventory management system** built using **FastAPI, HTML, JavaScript, and Supabase**.
It helps organizations manage products, stock movement, and warehouse operations with **role-based access control**.

---

# 🚀 Features

### Authentication

* User Signup
* User Login
* Role selection during signup
* Session-based access

### Role Based Access

Two user roles are supported:

#### Inventory Manager

* Create and manage products
* Manage receipts
* Manage deliveries
* Manage transfers
* Perform stock adjustments
* View all system data

#### Warehouse Staff

* Create receipts
* Create deliveries
* Create transfers
* View limited system data
* Cannot manage products or adjustments

---

# 📊 Modules

### Products

Create and manage product inventory.

Fields:

* Product Name
* SKU
* Category
* Unit
* Stock
* Location

---

### Receipts

Records **incoming stock** from suppliers.

Workflow:

1. Create receipt
2. Status = `draft`
3. Validate receipt
4. Status = `done`
5. Stock increases

---

### Deliveries

Records **outgoing stock** to customers.

Workflow:

1. Create delivery
2. Status = `draft`
3. Validate delivery
4. Status = `done`
5. Stock decreases

---

### Transfers

Move stock between warehouse locations.

Workflow:

1. Create transfer
2. Status = `draft`
3. Validate transfer
4. Status = `done`

---

### Adjustments

Used by managers to **correct stock discrepancies**.

Example:

```
Product ID: 1
New Quantity: 50
```

---

# 📈 Dashboard

The dashboard provides quick insights:

* Total Products
* Low Stock Items
* Pending Receipts
* Pending Deliveries
* Pending Transfers

These statistics are calculated dynamically from the database.

---

# 📋 Data Page

The **Data page** displays system tables.

### Manager View

Shows:

* Products
* Receipts
* Deliveries
* Transfers
* Adjustments

### Staff View

Shows:

* Receipts
* Deliveries
* Transfers

---

# 🏗️ Tech Stack

Frontend

* HTML
* CSS
* JavaScript

Backend

* FastAPI

Database

* Supabase (PostgreSQL)

---

# 📁 Project Structure

```
core_inventory/
│
├── backend/
│   ├── main.py
│   ├── database.py
│   ├── models.py
│   ├── schemas.py
│   ├── crud.py
│   ├── auth.py
│   │
│   └── routers/
│        ├── products.py
│        ├── receipts.py
│        ├── deliveries.py
│        ├── transfers.py
│        ├── adjustments.py
│
├── frontend/
│   ├── dashboard.html
│   ├── products.html
│   ├── receipts.html
│   ├── deliveries.html
│   ├── transfers.html
│   ├── adjustments.html
│   ├── data.html
│   │
│   └── js/
│        ├── api.js
│        ├── dashboard.js
│        ├── data.js
│        ├── products.js
│        ├── receipts.js
│        ├── deliveries.js
│        ├── transfers.js
│        ├── adjustments.js
│        └── roleControl.js
```

---

# ⚙️ Setup Instructions

### 1 Install dependencies

```
pip install fastapi uvicorn python-dotenv supabase
```

---

### 2 Configure Supabase

Create a `.env` file:

```
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
```

---

### 3 Run Backend

```
uvicorn main:app --reload
```

Server will start at:

```
http://127.0.0.1:8000
```

---

### 4 Open Frontend

Open:

```
frontend/dashboard.html
```

in your browser.

---

# 🔗 API Endpoints

| Endpoint     | Method | Description      |
| ------------ | ------ | ---------------- |
| /products    | GET    | Get all products |
| /products    | POST   | Create product   |
| /receipts    | GET    | Get receipts     |
| /receipts    | POST   | Create receipt   |
| /deliveries  | GET    | Get deliveries   |
| /deliveries  | POST   | Create delivery  |
| /transfers   | GET    | Get transfers    |
| /transfers   | POST   | Create transfer  |
| /adjustments | GET    | Get adjustments  |
| /adjustments | POST   | Adjust stock     |

---

# 🎥 Demo Workflow

1. User signs up with role.
2. User logs in.
3. Manager creates products.
4. Staff records receipts and deliveries.
5. Transfers move stock between locations.
6. Dashboard shows live statistics.

---

# 📌 Future Improvements

* Barcode product scanning
* Notification system
* Advanced analytics dashboard
* Warehouse mapping
* Mobile app integration

---

# 👨‍💻 Author

Developed as a **Full Stack Inventory Management Project** using FastAPI and Supabase.

---

# ⭐ License

This project is open source and available for educational use.
