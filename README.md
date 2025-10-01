# Payment Processing Node App

```bash
# Clone git repo
git clone https://github.com/yourusername/my-node-app.git

# Install dependencies inside folder
npm install

# Start the Application
npm start
```

## Models

Database models for Product and Payment are in the model folder.
See populate-database for resetting database after deleting database.sqlite, also for request examples

## Example requests

- List of Products
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/product/get/all" -Method GET -ContentType "application/json"
```
- List of all Payments
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/payment/get/all" -Method GET -ContentType "application/json"
```
- Payments filtered by status
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/payment/get/status/initialised" -Method GET -ContentType "application/json"
```
- Total of completed payments
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/payment/get/totalCompleted" -Method GET -ContentType "application/json"
```
- Create Payment and process
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/payment/initialise" -Method POST -ContentType "application/json" -Body '{
    "payment_id": 4,
    "product_id": 2,
    "quantity": 2,
    "status": "initialise",
    "user_id": 1
}'

Invoke-RestMethod -Uri "http://localhost:3000/payment/setUser" -Method PUT -ContentType "application/json" -Body '{
    "payment_id": 4,
    "user_id": 1
}'

Invoke-RestMethod -Uri "http://localhost:3000/payment/processPayment" -Method PUT -ContentType "application/json" -Body '{
    "payment_id": 4,
    "payment_method": "CREDIT CARD"
}'
```