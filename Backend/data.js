import bcrypt from 'bcryptjs';  // Assuming you are using bcryptjs for hashing passwords

const data = {
  users: [
    {
      name: "Bana",
      email: "admin@example.com",  // Changed email to ensure uniqueness
      password: bcrypt.hashSync("123456"),
      isAdmin: true,
    },
    {
      name: "Jhon",
      email: "user@example.com",  // Changed email to ensure uniqueness
      password: bcrypt.hashSync("123456"),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: "Nike Slim Shirt",
      slug: "nike-slim-shirt",
      category: "Shirts",
      image: "/images/p1.jpg", // 679px × 829px
      price: 120,
      countInStock: 0,
      brand: "Nike",
      rating: 4.5,
      numReviews: 10,
      description: "High quality shirt",
    },
    {
      name: "Adidas Fit Shirt",
      slug: "adidas-fit-shirt",
      category: "Shirts",
      image: "/images/p2.jpg",
      price: 250,
      countInStock: 20,
      brand: "Adidas",
      rating: 4.0,
      numReviews: 10,
      description: "High quality product",
    },
    {
      name: "Nike Slim Pant",
      slug: "nike-slim-pant",
      category: "Pants",
      image: "/images/p3.jpg",
      price: 25,
      countInStock: 15,
      brand: "Nike",
      rating: 4.5,
      numReviews: 14,
      description: "High quality product",
    },
    {
      name: "Adidas Fit Pant",
      slug: "adidas-fit-pant",
      category: "Pants",
      image: "/images/p4.jpg",
      price: 65,
      countInStock: 5,
      brand: "Adidas",  // Corrected brand to Adidas
      rating: 4.5,
      numReviews: 10,
      description: "High quality product",
    },
  ],
};

export default data;
