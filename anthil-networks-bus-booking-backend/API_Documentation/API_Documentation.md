
# 🚌 Bus Booking System API Documentation

This document provides full details of all API endpoints, including request/response samples and error cases.

---

## 🔐 1. Register User/Admin

- **URL**: `/api/auth/register`
- **Method**: POST
- **Auth Required**: ❌

### ✅ Request JSON:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "admin"
}
```

### ✅ Success Response:
- **Code**: 201
```json
{ "message": "User registered" }
```

### ❌ Error Response:
- **Code**: 400
```json
{ "message": "User already exists" }
```

---

## 🔐 2. Login

- **URL**: `/api/auth/login`
- **Method**: POST
- **Auth Required**: ❌

### ✅ Request JSON:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### ✅ Success Response:
- **Code**: 200
```json
{
  "accessToken": "xxx",
  "refreshToken": "yyy"
}
```

### ❌ Error Response:
- **Code**: 404 / 401
```json
{ "message": "User not found" }
```
or
```json
{ "message": "Invalid credentials" }
```

---

## 👮 3. Add Bus

- **URL**: `/api/admin/bus`
- **Method**: POST
- **Auth Required**: ✅ (Admin)

### ✅ Request JSON:
```json
{
  "number": "KA1234",
  "capacity": 40,
  "type": "AC",
  "amenities": "WiFi, Charging"
}
```

### ✅ Success Response:
- **Code**: 201
```json
{
  "message": "Bus added successfully",
  "bus": { "id": 1, ... }
}
```

### ❌ Error Response:
- **Code**: 400
```json
{ "message": "Failed to add bus" }
```

---

## 👮 4. Get All Buses (Admin)

- **URL**: `/api/admin/buses`
- **Method**: GET
- **Auth Required**: ✅ (Admin)

### ✅ Success Response:
- **Code**: 200
```json
{
  "buses": [
    {
      "id": 1,
      "number": "KA1234",
      "capacity": 40
    }
  ]
}
```

---

## 👮 5. Update Bus

- **URL**: `/api/admin/bus/:id`
- **Method**: PUT
- **Auth Required**: ✅ (Admin)

### ✅ Request JSON:
```json
{
  "number": "KA4321",
  "capacity": 50,
  "type": "Sleeper",
  "amenities": "Water Bottle"
}
```

### ✅ Success Response:
- **Code**: 200
```json
{
  "message": "Bus updated",
  "bus": { "id": 1, ... }
}
```

### ❌ Error Response:
- **Code**: 404
```json
{ "message": "Bus with ID 1 not found" }
```

---

## 👮 6. Delete Bus

- **URL**: `/api/admin/bus/:id`
- **Method**: DELETE
- **Auth Required**: ✅ (Admin)

### ✅ Success Response:
- **Code**: 200
```json
{ "message": "Bus deleted" }
```

### ❌ Error Response:
- **Code**: 404
```json
{ "message": "Bus with ID 1 not found" }
```

---

## 👮 7. Add Route

- **URL**: `/api/admin/route`
- **Method**: POST
- **Auth Required**: ✅ (Admin)

### ✅ Request JSON:
```json
{
  "origin": "Bangalore",
  "destination": "Mysore",
  "travel_time": "3h",
  "stops": "Ramnagara, Mandya",
  "bus_id": 1
}
```

### ✅ Success Response:
- **Code**: 201
```json
{ "message": "Route added", "route": { "id": 1, ... } }
```

### ❌ Error Response:
- **Code**: 400
```json
{ "message": "Failed to add route" }
```

---

## 👮 8. Update Route

- **URL**: `/api/admin/route/:id`
- **Method**: PUT
- **Auth Required**: ✅ (Admin)

### ✅ Request JSON:
```json
{
  "origin": "Bangalore",
  "destination": "Coorg",
  "travel_time": "5h",
  "stops": "Kushalnagar"
}
```

### ✅ Success Response:
- **Code**: 200
```json
{ "message": "Route updated", "route": { "id": 1, ... } }
```

### ❌ Error Response:
- **Code**: 404
```json
{ "message": "Route with ID 1 not found" }
```

---

## 👮 9. Delete Route

- **URL**: `/api/admin/route/:id`
- **Method**: DELETE
- **Auth Required**: ✅ (Admin)

### ✅ Success Response:
```json
{ "message": "Route deleted" }
```

### ❌ Error Response:
```json
{ "message": "Route with ID 1 not found" }
```

---

## 👤 10. Get All Buses (User)

- **URL**: `/api/user/buses`
- **Method**: GET
- **Auth Required**: ✅ (User)

### ✅ Success Response:
```json
{ "buses": [...] }
```

---

## 👤 11. Search Buses

- **URL**: `/api/user/search?origin=X&destination=Y`
- **Method**: GET
- **Auth Required**: ✅ (User)

### ✅ Success Response:
```json
[
  {
    "number": "KA1234",
    "origin": "Bangalore",
    "destination": "Mysore"
  }
]
```

### ❌ Error Response:
```json
{ "message": "Search failed" }
```

---

## 👤 12. Book Bus

- **URL**: `/api/user/book`
- **Method**: POST
- **Auth Required**: ✅ (User)

### ✅ Request JSON:
```json
{
  "bus_id": 1,
  "route_id": 1,
  "seats_booked": 2
}
```

### ✅ Success Response:
```json
{ "message": "Bus booked" }
```

### ❌ Error Response:
```json
{ "message": "Booking failed" }
```

---

## 👤 13. Cancel Booking

- **URL**: `/api/user/cancel/:id`
- **Method**: DELETE
- **Auth Required**: ✅ (User)

### ✅ Success Response:
```json
{ "message": "Booking cancelled" }
```

### ❌ Error Response:
```json
{ "message": "Cancel failed" }
```

---

🛡️ All routes (except auth) require `Authorization: Bearer <token>` header.

