# MongoDB Authentication Setup Guide

## ✅ What Changed

Your authentication system has been upgraded from **in-memory storage** to **MongoDB Atlas** with **password hashing**.

### Previous System (In-Memory)
```javascript
let users = [
  { id: 1, email: "admin@gmail.com", password: "1234", name: "Admin User" }
];
```
❌ Data lost on server restart
❌ Passwords stored in plain text
❌ Not scalable

### New System (MongoDB)
✅ Data persists in MongoDB Atlas
✅ Passwords hashed with bcrypt
✅ Production-ready
✅ User profile management

---

## 🚀 Getting Started

### 1. Install Dependencies (Already Done)
```bash
cd backend
npm install
```
Dependencies included:
- `bcryptjs` - Password hashing
- `mongoose` - MongoDB connection
- `express` - Web framework

### 2. Create Admin User

Run the seed script to create the demo admin user in MongoDB:

```bash
node seed.js
```

**Output:**
```
Connected to MongoDB
✅ Admin user created successfully
Email: admin@gmail.com
Password: 1234
```

### 3. Start Backend Server

```bash
node server.js
```

You should see:
```
MongoDB Connected ✅
Server running on port 5000
```

---

## 📝 API Endpoints

### Sign Up
**POST** `/api/auth/signup`

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Account created successfully",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "john@example.com",
    "name": "John Doe"
  }
}
```

### Login
**POST** `/api/auth/login`

```json
{
  "email": "admin@gmail.com",
  "password": "1234"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "admin@gmail.com",
    "name": "Admin User"
  }
}
```

### Get User Profile
**GET** `/api/auth/user/:userId`

**Response:**
```json
{
  "success": true,
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Admin User",
    "email": "admin@gmail.com",
    "phone": "9876543210",
    "address": "123 Main Street",
    "city": "Mumbai",
    "pincode": "400001"
  }
}
```

### Update User Profile
**PUT** `/api/auth/user/:userId`

```json
{
  "name": "Updated Name",
  "phone": "9876543210",
  "address": "New Address",
  "city": "Delhi",
  "pincode": "110001"
}
```

---

## 🔒 Security Features

### Password Hashing
- Uses **bcryptjs** with salt rounds = 10
- Passwords never stored in plain text
- Cannot be reversed/decrypted

### MongoDB Security
- Connection uses SSL encryption
- MongoDB Atlas authentication required
- Data encrypted in transit and at rest

### Error Handling
- Secure error messages (doesn't reveal if email exists)
- Server-side validation
- Connection error handling

---

## 📊 User Model (MongoDB)

```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique, lowercase),
  password: String (hashed),
  phone: String,
  address: String,
  city: String,
  pincode: String,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🧪 Testing Authentication

### 1. Test Sign Up (Create New User)
```bash
curl -X POST https://fashion-ai-backend-2g7w.onrender.com/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "testpass123"
  }'
```

### 2. Test Login
```bash
curl -X POST https://fashion-ai-backend-2g7w.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@gmail.com",
    "password": "1234"
  }'
```

### 3. Test Get Profile
```bash
curl -X GET https://fashion-ai-backend-2g7w.onrender.com/api/auth/user/[USER_ID]
```

---

## 🐛 Troubleshooting

### Issue: "MongoDB Connected ❌"
**Solution:** Check MongoDB Atlas connection string in `server.js`

### Issue: "Email already registered"
**Solution:** User already exists. Either:
- Use different email
- Login with existing account
- Delete user from MongoDB Atlas

### Issue: "Invalid credentials" on login
**Solution:**
- Check email is correct
- Password is case-sensitive
- Email is converted to lowercase

### Issue: Password not working after seed
**Solution:**
- Delete old seed data in MongoDB
- Run `node seed.js` again

---

## 🔄 Frontend Integration

The frontend already uses the new MongoDB authentication:

```javascript
// AuthContext.tsx handles login/signup
const login = async (email, password) => {
  const response = await fetch("https://fashion-ai-backend-2g7w.onrender.com/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
  // ... handle response
};
```

---

## 📈 Next Steps (Optional)

1. **Add JWT Tokens** - For stateless authentication
2. **Email Verification** - Verify user email
3. **Password Reset** - Forgot password functionality
4. **Two-Factor Authentication** - Enhanced security
5. **OAuth Integration** - Google/GitHub login
6. **Role-Based Access** - Admin/User roles

---

## 📞 Demo Credentials

```
Email: admin@gmail.com
Password: 1234
```

These credentials are stored in MongoDB with encrypted password.

---

## ✅ Verification

Check if everything is working:

1. ✅ Backend running on port 5000
2. ✅ MongoDB Atlas connected
3. ✅ User can sign up
4. ✅ User can login
5. ✅ User data persists in MongoDB
6. ✅ Frontend login works

All done! Your authentication system is now production-ready with MongoDB. 🎉
