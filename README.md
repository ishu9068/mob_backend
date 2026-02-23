# mob_backend


API Testing Guide (Mobile E-Commerce Backend)
Base URL
http://localhost:5000
________________________________________
A) Signup Customer
Method: POST
URL: https://mob-backend.vercel.app/api/auth/signup
Body (JSON):
{
  "name": "Ishu Customer",
  "email": "customer@gmail.com",
  "password": "123456",
  "role": "customer"
}
________________________________________
B) Signup Seller
Method: POST
URL: https://mob-backend.vercel.app/api/auth/signup
Body (JSON):
{
  "name": "Rahul Seller",
  "email": "seller@gmail.com",
  "password": "123456",
  "role": "seller",
  "organization": "Rahul Mobiles",
  "address": "Delhi",
  "categories": ["mobiles", "accessories"]
}
________________________________________
C) Signup Admin
Method: POST
URL: https://mob-backend.vercel.app/api/auth/signup
Body (JSON):
{
  "name": "Admin User",
  "email": "admin@gmail.com",
  "password": "123456",
  "role": "admin"
}
________________________________________
D) Login (Admin)
Method: POST
URL: https://mob-backend.vercel.app/api/auth/login
Body (JSON):
{
  "email": "admin@gmail.com",
  "password": "123456"
}
Note: Response se ADMIN_TOKEN copy karo.
________________________________________
E) Admin Get Sellers
Method: GET
URL: https://mob-backend.vercel.app/api/admin/sellers
Headers:
Authorization: Bearer ADMIN_TOKEN
________________________________________
F) Admin Approve Seller
Method: PUT
URL: https://mob-backend.vercel.app/api/admin/approve/SELLER_ID
Headers:
Authorization: Bearer ADMIN_TOKEN
________________________________________
G) Seller Login (After Approval)
Method: POST
URL: https://mob-backend.vercel.app/api/auth/login
Body (JSON):
{
  "email": "seller@gmail.com",
  "password": "123456"
}
Note: Response se SELLER_TOKEN copy karo.
________________________________________
H) Seller Create Product
Method: POST
URL: https://mob-backend.vercel.app/api/product
Headers:
Authorization: Bearer SELLER_TOKEN
Body (JSON):
{
  "title": "iPhone 15",
  "brand": "Apple",
  "price": 70000,
  "stock": 10,
  "category": "mobiles",
  "description": "New iPhone 15"
}
________________________________________
I) Public Get Products
Method: GET
URL: https://mob-backend.vercel.app/api/product
________________________________________
J) Customer Login
Method: POST
URL: https://mob-backend.vercel.app/api/auth/login
Body (JSON):
{
  "email": "customer@gmail.com",
  "password": "123456"
}
Note: Response se CUSTOMER_TOKEN copy karo.
________________________________________
K) Customer Add to Cart
Method: POST
URL: https://mob-backend.vercel.app/api/cart/add
Headers:
Authorization: Bearer CUSTOMER_TOKEN
Body (JSON):
{
  "productId": "PRODUCT_ID",
  "qty": 2
}
________________________________________
L) Customer View Cart
Method: GET
URL: https://mob-backend.vercel.app/api/cart
Headers:
Authorization: Bearer CUSTOMER_TOKEN
________________________________________
M) Customer Place Order
Method: POST
URL: https://mob-backend.vercel.app/api/order/place
Headers:
Authorization: Bearer CUSTOMER_TOKEN
________________________________________
N) Customer Order History
Method: GET
URL: https://mob-backend.vercel.app/api/order/my
Headers:
Authorization: Bearer CUSTOMER_TOKEN
________________________________________
Token Summary
Admin Token: ADMIN_TOKEN
Seller Token: SELLER_TOKEN
Customer Token: CUSTOMER_TOKEN

