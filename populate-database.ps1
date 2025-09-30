# Adding 4 products
Invoke-RestMethod -Uri "http://localhost:3000/product/create" -Method POST -ContentType "application/json" -Body '{
    "name": "Hat",
    "description": "A nice hat for your head.",
    "price": 1500,
    "currency": "GBP",
    "stock_level": 56
}'
Invoke-RestMethod -Uri "http://localhost:3000/product/create" -Method POST -ContentType "application/json" -Body '{
    "name": "T-Shirt",
    "description": "Egyptian cotton T-Shirt, lovely.",
    "price": 6000,
    "currency": "GBP",
    "stock_level": 200
}'
Invoke-RestMethod -Uri "http://localhost:3000/product/create" -Method POST -ContentType "application/json" -Body '{
    "name": "Left Foot Loafer",
    "description": "The left foot of a pair of loafers.",
    "price": 2000,
    "currency": "GBP",
    "stock_level": 17
}'
Invoke-RestMethod -Uri "http://localhost:3000/product/create" -Method POST -ContentType "application/json" -Body '{
    "name": "Right Foot Loafer",
    "description": "The right foot of a pair of loafers.",
    "currency": "GBP",
    "stock_level": 17
}'

# Get all products
Invoke-RestMethod -Uri "http://localhost:3000/product/get/all" -Method GET -ContentType "application/json"

# Initialising 3 payments
Invoke-RestMethod -Uri "http://localhost:3000/payment/initialise" -Method POST -ContentType "application/json" -Body '{
    "payment_id": 43,
    "product_id": 2,
    "quantity": 2,
    "status": "initialise",
    "user_id": 17
}'
Invoke-RestMethod -Uri "http://localhost:3000/payment/initialise" -Method POST -ContentType "application/json" -Body '{
    "product_id": 1,
    "quantity": 1,
    "status": "initialise"
}'
Invoke-RestMethod -Uri "http://localhost:3000/payment/initialise" -Method POST -ContentType "application/json" -Body '{
    "product_id": 3,
    "quantity": 1,
    "user_id": 14
}'

# Process some payments
Invoke-RestMethod -Uri "http://localhost:3000/payment/setUser" -Method PUT -ContentType "application/json" -Body '{
    "payment_id": 1,
    "user_id": 15
}'
Invoke-RestMethod -Uri "http://localhost:3000/payment/setUser" -Method PUT -ContentType "application/json" -Body '{
    "payment_id": 2,
    "user_id": 1
}'
Invoke-RestMethod -Uri "http://localhost:3000/payment/processPayment" -Method PUT -ContentType "application/json" -Body '{
    "payment_id": 1,
    "payment_method": "CREDIT CARD"
}'

# Get all payments
Invoke-RestMethod -Uri "http://localhost:3000/payment/get/all" -Method GET -ContentType "application/json"

# Get all payments but status (initialised)
Invoke-RestMethod -Uri "http://localhost:3000/payment/get/status/initialised" -Method GET -ContentType "application/json"