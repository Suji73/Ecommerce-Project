# Ecommerce Backend & Frontend

A full-stack ecommerce application with user authentication, product management, and order processing.

## Features

- **User Authentication**: Register, login, JWT-based auth
- **Product Management**: Add, edit, delete products (admin)
- **Shopping Cart**: Add to cart, manage quantities
- **Order Processing**: Place orders, order history
- **Admin Dashboard**: Manage products and orders
- **Image Upload**: Product image management
- **Responsive Design**: Mobile-friendly UI

## Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose
- **JWT** for authentication
- **Multer** for file uploads
- **bcryptjs** for password hashing

### Frontend
- **React** with Vite
- **React Router** for navigation
- **Axios** for API calls
- **CSS** for styling

## Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/ecommerce-backend.git
cd ecommerce-backend
```

2. **Backend Setup**
```bash
cd Backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev
```

3. **Frontend Setup**
```bash
cd frontend
npm install
npm run dev
```

### Environment Variables

Create a `.env` file in the `Backend` directory:

```env
PORT=5000
MONGO_URL=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_super_secret_jwt_key_here
FRONTEND_URL=http://localhost:3000
```

## API Endpoints

### Authentication
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login
- `POST /api/users/refresh` - Refresh JWT token

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Add product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get specific order

## Project Structure

```
ecommerce-backend/
├── Backend/
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API routes
│   ├── middleware/      # Auth middleware
│   ├── uploads/         # Product images
│   └── index.js         # Server entry point
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── Pages/       # Page components
│   │   ├── context/     # React context
│   │   ├── utils/       # Utility functions
│   │   └── apis/        # API calls
│   └── public/          # Static assets
├── Dockerfile
├── docker-compose.yml
└── README.md
```

## Deployment

### Docker (Recommended)
```bash
docker-compose up -d
```

### Manual Deployment
1. Build frontend: `cd frontend && npm run build`
2. Install backend deps: `cd ../Backend && npm install --only=production`
3. Set production environment variables
4. Start server: `npm start`

## Default Admin

Create an admin account by registering with `isAdmin: true` in the request body, or update an existing user in the database.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the ISC License.

## Support

For issues and questions, please open an issue on GitHub.
