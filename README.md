Live Demo Link : [https://hcl-hack.vercel.app](https://pizza-maniac.vercel.app/)

# 🍕 Retail Food Ordering Portal — MVP

A full-stack web application that allows users to browse food items, add them to a cart, and place orders, while admins manage products and track order status.
---

## 📌 MVP Flow

### User Flow
```
User → Menu → Cart → Place Order → Delivered
```

### Order Status Flow
```
NEW → PROCESSING → DELIVERED
```

---

## 🧑‍🤝‍🧑 Roles

### 👤 User
- Register & Login
- Browse products
- Add / remove items from cart
- Place orders
- View own orders

### 🛠 Admin
- Add / update products
- Manage inventory
- View all orders
- Update order status

---

## 🗄️ Database Design (MongoDB)

### User
```
name
email
password
address
role
```

### Product
```
type
name
price
stock
isAvailable
```

### Cart
```
products[]
totalAmount
userId
```

### Order
```
userId
products[]
totalAmount
status
createdAt
```

---

## 🔌 REST API Endpoints

### Authentication
```
POST /auth/register
POST /auth/login
POST /auth/logout
```

### Products
```
GET  /products
POST /products         (admin)
PUT  /products/:id     (admin)
```

### Cart
```
GET  /cart
POST /cart/add
POST /cart/remove
```

### Orders
```
POST /orders
GET  /orders
PUT  /orders/:id       (admin)
```

---

## 🔐 Security

- JWT-based authentication
- Role-based access control (User / Admin)
- Protected routes for cart, orders, and admin actions

---

## 🧱 Tech Stack

### Frontend
- React.js
- Tailwind CSS

### Backend
- Node.js
- Express.js

### Database
- MongoDB

### Security
- JSON Web Tokens (JWT)

---

## 🚀 Architecture

```
Frontend (React)
↓
REST API (Express)
↓
MongoDB Database
```

- Clean separation of frontend and backend
- RESTful API architecture
- Stateless authentication using JWT   

---

## 🎯 Project Goal

Build a clean, scalable, and explainable MVP that demonstrates:
- Real-world business workflow
- Enterprise-style architecture
- Secure and maintainable APIs
- Hackathon-ready implementation
