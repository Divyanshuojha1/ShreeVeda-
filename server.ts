import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { fileURLToPath } from "url";

// Get __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize mock DB stores
interface DBStore {
  users: any[];
  products: any[];
  orders: any[];
  coupons: any[];
  recipes: any[];
  blogs: any[];
  reviews: any[];
}

const DB_FILE = path.join(process.cwd(), "db_store.json");

// Import the initial static data to pre-populate
// To avoid dynamic import race issues, we can embed the initial data right in the server
const INITIAL_PRODUCTS = [
  {
    id: "turmeric-powder",
    name: "Sangli Turmeric Powder",
    description: "Cultivated with care in the fertile black soils of Sangli, Maharashtra. Our turmeric is rich in natural curcumin (minimum 4.5% guaranteed) giving it an intense golden-yellow hue, deep earthy aroma, and immense therapeutic properties.",
    category: "ground-spices",
    price: 180,
    oldPrice: 220,
    rating: 4.9,
    reviewsCount: 148,
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?auto=format&fit=crop&q=80&w=600"
    ],
    isBestSeller: true,
    isNew: false,
    stock: 120,
    tags: ["Organic", "High Curcumin", "Immunity Booster"],
    ingredients: "100% Pure Organic Turmeric Root (Curcuma longa)",
    origin: "Sangli, Maharashtra, India",
    weight: "250g",
    benefits: [
      "Rich in Curcumin (4.5%+), a powerful anti-inflammatory compound.",
      "Boosts immunity and supports overall joint health.",
      "Adds deep, authentic golden-yellow color and rich earthy flavor to dishes."
    ],
    reviews: [
      {
        id: "r1",
        userName: "Aarav Mehta",
        rating: 5,
        comment: "This turmeric is incredibly vibrant! You can smell the difference as soon as you open the jar. Worth every penny.",
        date: "2026-06-15",
        approved: true
      },
      {
        id: "r2",
        userName: "Meera Patel",
        rating: 5,
        comment: "I use this in my daily golden milk. Superb quality and extremely pure. Highly recommended!",
        date: "2026-06-10",
        approved: true
      }
    ]
  },
  {
    id: "kashmiri-chili-powder",
    name: "Kashmiri Red Chili Powder",
    description: "Sourced from the sun-drenched valleys of Kashmir. This premium mild chili powder is famous for its vibrant crimson color and subtle smokiness without overwhelming heat. Perfect for curries, tandooris, and marinades.",
    category: "ground-spices",
    price: 240,
    oldPrice: 280,
    rating: 4.8,
    reviewsCount: 205,
    image: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1590515152843-dfbe2c4482b6?auto=format&fit=crop&q=80&w=600"
    ],
    isBestSeller: true,
    isNew: false,
    stock: 95,
    tags: ["Mild Heat", "Rich Color", "Handpicked"],
    ingredients: "100% Pure Sun-Dried Kashmiri Red Chilies",
    origin: "Anantnag, Kashmir, India",
    weight: "250g",
    benefits: [
      "Provides rich, natural red coloration to curries without spicy heat.",
      "High in Vitamin C and antioxidants.",
      "Slow-ground at cool temperatures to preserve delicate essential oils."
    ],
    reviews: [
      {
        id: "r3",
        userName: "Rohan Sharma",
        rating: 5,
        comment: "Outstanding color! Gives that signature restaurant red curry look and is mild enough for my kids to enjoy.",
        date: "2026-06-20",
        approved: true
      }
    ]
  },
  {
    id: "malabar-black-pepper",
    name: "Tellicherry Bold Black Pepper",
    description: "Often called 'Black Gold', our Malabar black pepper is sourced from the ancient rainforests of Kerala. Handpicked when fully mature, these extra-large Tellicherry berries deliver an intense, citrusy heat and highly pungent crack.",
    category: "whole-spices",
    price: 210,
    oldPrice: 250,
    rating: 4.9,
    reviewsCount: 94,
    image: "https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&q=80&w=600"
    ],
    isBestSeller: false,
    isNew: true,
    stock: 14, // Low stock on purpose to trigger alerts in admin dashboard
    tags: ["Grade A+", "Tellicherry Bold", "High Piperine"],
    ingredients: "100% Whole Organic Malabar Black Peppercorns",
    origin: "Wayanad, Kerala, India",
    weight: "150g",
    benefits: [
      "High piperine content promotes nutrient absorption.",
      "Improves digestion and provides warming heat.",
      "Perfect for pepper mills to release fresh, woody, citrusy notes."
    ],
    reviews: []
  },
  {
    id: "royal-garam-masala",
    name: "Shree Veda Royal Garam Masala",
    description: "An exquisite blend of 14 roasted and hand-milled spices, including green and black cardamom, Ceylon cinnamon, star anise, nutmeg, and stone flower. Formulated from an ancient royal kitchen recipe to bring unparalleled depth to any meal.",
    category: "blend-masalas",
    price: 290,
    oldPrice: 340,
    rating: 5.0,
    reviewsCount: 312,
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=600"
    ],
    isBestSeller: true,
    isNew: false,
    stock: 80,
    tags: ["Signature Blend", "Roast & Ground", "Extremely Aromatic"],
    ingredients: "Cardamom, Cinnamon, Cloves, Star Anise, Nutmeg, Mace, Black Pepper, Coriander, Cumin, Bay Leaves, Fennel, Stone Flower (Kalpasi)",
    origin: "Coorg & Rajasthan sourcing, blended in-house",
    weight: "150g",
    benefits: [
      "Hand-roasted in small batches to preserve volatile flavor compounds.",
      "Adds complex sweet, pungent, and savory warming aromatics to curries.",
      "Salt-free and sugar-free with zero artificial color or flavor enhancers."
    ],
    reviews: [
      {
        id: "r4",
        userName: "Kiran Rao",
        rating: 5,
        comment: "This garam masala has revolutionized my cooking! Just half a teaspoon at the end transforms my standard dal into a masterpiece.",
        date: "2026-06-18",
        approved: true
      }
    ]
  },
  {
    id: "pure-mongra-saffron",
    name: "Pure Kashmiri Mongra Saffron",
    description: "The crown jewel of Indian agriculture. Our Grade A+ Mongra saffron is harvested meticulously by hand in Pamprore, Kashmir. Only the thickest red stigmas (Mongra grade) are chosen, guaranteeing unmatched saffron aroma, color, and medicinal strength.",
    category: "whole-spices",
    price: 490,
    oldPrice: 590,
    rating: 4.9,
    reviewsCount: 68,
    image: "https://images.unsplash.com/photo-1610970881699-44a5587caaec?auto=format&fit=crop&q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1610970881699-44a5587caaec?auto=format&fit=crop&q=80&w=600"
    ],
    isBestSeller: true,
    isNew: false,
    stock: 45,
    tags: ["Grade A+", "Mongra Saffron", "Luxury"],
    ingredients: "100% Pure Kashmiri Saffron Threads",
    origin: "Pampore, Kashmir, India",
    weight: "1g",
    benefits: [
      "Richest source of safranal, crocin, and picrocrocin.",
      "Improves mood, energy, and radiant skin complexion.",
      "Just 3-4 strands impart a gorgeous gold color and royal aroma."
    ],
    reviews: [
      {
        id: "r5",
        userName: "Devi Shastry",
        rating: 5,
        comment: "Excellent saffron. Deep crimson strands, completely real. I did the warm water test and it released a slow golden glow. Wonderful!",
        date: "2026-06-22",
        approved: true
      }
    ]
  },
  {
    id: "cumin-seeds-bold",
    name: "Gujarat Bold Cumin Seeds (Jeera)",
    description: "Sourced from dry, sunny farms of Gujarat. These whole cumin seeds are extra-bold and rich in thymol oil, giving them a distinct rustic flavor and strong warm aroma when sputtered in hot oil (tadka).",
    category: "whole-spices",
    price: 160,
    oldPrice: 190,
    rating: 4.7,
    reviewsCount: 77,
    image: "https://images.unsplash.com/photo-1589405858862-2ac9cbb41321?auto=format&fit=crop&q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1589405858862-2ac9cbb41321?auto=format&fit=crop&q=80&w=600"
    ],
    isBestSeller: false,
    isNew: false,
    stock: 150,
    tags: ["High Thymol", "Bold Seeds", "Digestive Aid"],
    ingredients: "100% Whole Cumin Seeds (Cuminum cyminum)",
    origin: "Unjha, Gujarat, India",
    weight: "200g",
    benefits: [
      "Sourced from Unjha, the cumin capital of India.",
      "Improves metabolic health and stimulates digestive enzymes.",
      "Provides crisp, savory base and deep warm notes to roasted foods."
    ],
    reviews: []
  },
  {
    id: "royal-wooden-box",
    name: "The Royal Spice Heritage Wooden Box",
    description: "An elegant, handcrafted solid rosewood box with brass fittings. Inside lies a curated selection of six premium organic spices (Saffron 1g, Cardamom 50g, Kashmiri Chili 100g, Garam Masala 100g, Turmeric 100g, and Tellicherry Pepper 100g) in individual glass canisters. The ultimate culinary gift.",
    category: "gift-boxes",
    price: 1850,
    oldPrice: 2200,
    rating: 5.0,
    reviewsCount: 39,
    image: "https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&q=80&w=600"
    ],
    isBestSeller: true,
    isNew: true,
    stock: 30,
    tags: ["Luxury Gift", "Handcrafted", "Heritage Box"],
    ingredients: "Sangli Turmeric, Kashmiri Red Chili, Tellicherry Pepper, Royal Garam Masala, Coorg Green Cardamom, Pamprore Mongra Saffron",
    origin: "Artisans of Saharanpur (Box) & Multi-Region Spices",
    weight: "1 Box",
    benefits: [
      "Collectible handmade wooden case that naturally preserves spice freshness.",
      "Perfect high-end corporate gift, wedding gift, or gourmet starter set.",
      "Sustainably sourced premium spices packed in zero-plastic containers."
    ],
    reviews: [
      {
        id: "r6",
        userName: "Vikram Malhotra",
        rating: 5,
        comment: "This is a magnificent gift. Bought it for my mom's birthday and she cried. The woodwork is spectacular, and the spices inside are pure luxury.",
        date: "2026-06-24",
        approved: true
      }
    ]
  }
];

const INITIAL_COUPONS = [
  { code: "VEDA10", discountType: "percentage", value: 10, minOrder: 499, active: true },
  { code: "FREESHIP", discountType: "fixed", value: 50, minOrder: 300, active: true },
  { code: "FESTIVE200", discountType: "fixed", value: 200, minOrder: 1499, active: true }
];

let db: DBStore = {
  users: [
    {
      id: "u1",
      name: "Devvrat Shastri",
      email: "user@shreeveda.com",
      password: "user123", // Simple plain-text for ease of testing
      role: "user",
      addresses: [
        {
          id: "a1",
          name: "Devvrat Shastri",
          phone: "+91 98765 43210",
          street: "108, Veda Nilayam, MG Road",
          city: "Mysuru",
          state: "Karnataka",
          zipCode: "570001",
          isDefault: true
        }
      ],
      wishlist: ["turmeric-powder", "pure-mongra-saffron"]
    },
    {
      id: "u2",
      name: "Acharya Veda",
      email: "admin@shreeveda.com",
      password: "admin123",
      role: "admin",
      addresses: [],
      wishlist: []
    }
  ],
  products: INITIAL_PRODUCTS,
  orders: [
    {
      id: "SV-10024",
      items: [
        {
          productId: "turmeric-powder",
          name: "Sangli Turmeric Powder",
          price: 180,
          quantity: 2,
          weight: "250g",
          image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=600"
        },
        {
          productId: "pure-mongra-saffron",
          name: "Pure Kashmiri Mongra Saffron",
          price: 490,
          quantity: 1,
          weight: "1g",
          image: "https://images.unsplash.com/photo-1610970881699-44a5587caaec?auto=format&fit=crop&q=80&w=600"
        }
      ],
      totalAmount: 850,
      discountAmount: 50,
      gstAmount: 42.5,
      shippingAmount: 50,
      status: "Delivered",
      paymentMethod: "Razorpay",
      paymentStatus: "Paid",
      address: {
        id: "a1",
        name: "Devvrat Shastri",
        phone: "+91 98765 43210",
        street: "108, Veda Nilayam, MG Road",
        city: "Mysuru",
        state: "Karnataka",
        zipCode: "570001",
        isDefault: true
      },
      date: "2026-06-20T11:42:00Z",
      trackingCode: "TRK-SV884725"
    },
    {
      id: "SV-10025",
      items: [
        {
          productId: "kashmiri-chili-powder",
          name: "Kashmiri Red Chili Powder",
          price: 240,
          quantity: 1,
          weight: "250g",
          image: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&q=80&w=600"
        }
      ],
      totalAmount: 240,
      discountAmount: 0,
      gstAmount: 12,
      shippingAmount: 50,
      status: "Processing",
      paymentMethod: "COD",
      paymentStatus: "Pending",
      address: {
        id: "a1",
        name: "Devvrat Shastri",
        phone: "+91 98765 43210",
        street: "108, Veda Nilayam, MG Road",
        city: "Mysuru",
        state: "Karnataka",
        zipCode: "570001",
        isDefault: true
      },
      date: "2026-06-25T14:10:00Z"
    }
  ],
  coupons: INITIAL_COUPONS,
  recipes: [],
  blogs: [],
  reviews: []
};

// Attempt to load from file
try {
  if (fs.existsSync(DB_FILE)) {
    const fileData = fs.readFileSync(DB_FILE, "utf-8");
    db = JSON.parse(fileData);
    console.log("Database successfully loaded from storage file.");
  } else {
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), "utf-8");
    console.log("Database file initialized.");
  }
} catch (e) {
  console.log("Could not load/write database file, using in-memory mode.", e);
}

// Function to save db changes
function saveDB() {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), "utf-8");
  } catch (e) {
    console.log("Error saving DB to file", e);
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Helper middleware for auth tokens
  const authMiddleware = (req: any, res: any, next: any) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }
    const token = authHeader.split(" ")[1];
    // Simple custom token logic e.g., token = "u1"
    const user = db.users.find((u) => u.id === token);
    if (!user) {
      return res.status(401).json({ message: "Invalid token" });
    }
    req.user = user;
    next();
  };

  const adminMiddleware = (req: any, res: any, next: any) => {
    authMiddleware(req, res, () => {
      if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Forbidden - Admins only" });
      }
      next();
    });
  };

  // --- API ENDPOINTS ---

  // User Auth Endpoints
  app.post("/api/auth/login", (req, res) => {
    const { email, password } = req.body;
    const user = db.users.find((u) => u.email === email && u.password === password);
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    // Return token as user ID for simplicity & extreme reliability
    res.json({
      token: user.id,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        addresses: user.addresses,
        wishlist: user.wishlist
      }
    });
  });

  app.post("/api/auth/register", (req, res) => {
    const { name, email, password } = req.body;
    if (db.users.find((u) => u.email === email)) {
      return res.status(400).json({ message: "Email already registered" });
    }
    const newUser = {
      id: "u_" + Math.random().toString(36).substr(2, 9),
      name,
      email,
      password,
      role: "user",
      addresses: [],
      wishlist: []
    };
    db.users.push(newUser);
    saveDB();
    res.status(201).json({
      token: newUser.id,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        addresses: [],
        wishlist: []
      }
    });
  });

  app.get("/api/auth/me", authMiddleware, (req: any, res) => {
    res.json({ user: req.user });
  });

  // User Address Endpoints
  app.post("/api/auth/addresses", authMiddleware, (req: any, res) => {
    const { name, phone, street, city, state, zipCode, isDefault } = req.body;
    const user = db.users.find((u) => u.id === req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (isDefault) {
      user.addresses.forEach((a: any) => (a.isDefault = false));
    }

    const newAddress = {
      id: "a_" + Math.random().toString(36).substr(2, 9),
      name,
      phone,
      street,
      city,
      state,
      zipCode,
      isDefault: user.addresses.length === 0 ? true : isDefault
    };

    user.addresses.push(newAddress);
    saveDB();
    res.status(201).json({ addresses: user.addresses, message: "Address added successfully" });
  });

  app.delete("/api/auth/addresses/:id", authMiddleware, (req: any, res) => {
    const { id } = req.params;
    const user = db.users.find((u) => u.id === req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.addresses = user.addresses.filter((a: any) => a.id !== id);
    if (user.addresses.length > 0 && !user.addresses.some((a: any) => a.isDefault)) {
      user.addresses[0].isDefault = true;
    }
    saveDB();
    res.json({ addresses: user.addresses, message: "Address removed successfully" });
  });

  // Wishlist Endpoints
  app.post("/api/auth/wishlist", authMiddleware, (req: any, res) => {
    const { productId } = req.body;
    const user = db.users.find((u) => u.id === req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.wishlist.includes(productId)) {
      user.wishlist.push(productId);
    } else {
      user.wishlist = user.wishlist.filter((id: string) => id !== productId);
    }
    saveDB();
    res.json({ wishlist: user.wishlist });
  });

  // Products Endpoints
  app.get("/api/products", (req, res) => {
    res.json(db.products);
  });

  app.get("/api/products/:id", (req, res) => {
    const product = db.products.find((p) => p.id === req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  });

  // Add Product Review
  app.post("/api/products/:id/reviews", (req, res) => {
    const { userName, rating, comment } = req.body;
    const product = db.products.find((p) => p.id === req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const newReview = {
      id: "rev_" + Math.random().toString(36).substr(2, 9),
      userName: userName || "Anoymous Guest",
      rating: Number(rating) || 5,
      comment: comment || "",
      date: new Date().toISOString().split("T")[0],
      approved: true
    };

    product.reviews = product.reviews || [];
    product.reviews.unshift(newReview);
    product.reviewsCount = product.reviews.length;
    // Recalculate average rating
    const totalRating = product.reviews.reduce((sum: number, r: any) => sum + r.rating, 0);
    product.rating = Number((totalRating / product.reviews.length).toFixed(1));

    saveDB();
    res.status(201).json({ product, message: "Review posted successfully" });
  });

  // Admin Product CRUD
  app.post("/api/products", adminMiddleware, (req, res) => {
    const { name, description, category, price, oldPrice, stock, tags, ingredients, origin, weight, benefits, image, images } = req.body;
    
    const id = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    if (db.products.find((p) => p.id === id)) {
      return res.status(400).json({ message: "Product with similar name already exists" });
    }

    const newProduct = {
      id,
      name,
      description,
      category,
      price: Number(price),
      oldPrice: oldPrice ? Number(oldPrice) : undefined,
      rating: 5.0,
      reviewsCount: 0,
      image: image || "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=600",
      images: images && images.length > 0 ? images : [image || "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=600"],
      isBestSeller: req.body.isBestSeller || false,
      isNew: true,
      stock: Number(stock) || 100,
      tags: tags || [],
      ingredients,
      origin,
      weight: weight || "100g",
      benefits: benefits || [],
      reviews: []
    };

    db.products.push(newProduct);
    saveDB();
    res.status(201).json({ product: newProduct, message: "Product created successfully" });
  });

  app.put("/api/products/:id", adminMiddleware, (req, res) => {
    const { id } = req.params;
    const index = db.products.findIndex((p) => p.id === id);
    if (index === -1) return res.status(404).json({ message: "Product not found" });

    const current = db.products[index];
    db.products[index] = {
      ...current,
      ...req.body,
      price: req.body.price !== undefined ? Number(req.body.price) : current.price,
      oldPrice: req.body.oldPrice !== undefined ? (req.body.oldPrice ? Number(req.body.oldPrice) : undefined) : current.oldPrice,
      stock: req.body.stock !== undefined ? Number(req.body.stock) : current.stock
    };

    saveDB();
    res.json({ product: db.products[index], message: "Product updated successfully" });
  });

  app.delete("/api/products/:id", adminMiddleware, (req, res) => {
    const { id } = req.params;
    const index = db.products.findIndex((p) => p.id === id);
    if (index === -1) return res.status(404).json({ message: "Product not found" });

    db.products.splice(index, 1);
    saveDB();
    res.json({ message: "Product deleted successfully" });
  });

  // Order Endpoints
  app.get("/api/orders", authMiddleware, (req: any, res) => {
    if (req.user.role === "admin") {
      res.json(db.orders);
    } else {
      const userOrders = db.orders.filter((o) => o.address.phone === req.user.addresses[0]?.phone || o.address.name === req.user.name);
      res.json(userOrders);
    }
  });

  app.post("/api/orders", authMiddleware, (req: any, res) => {
    const { items, totalAmount, discountAmount, gstAmount, shippingAmount, paymentMethod, address } = req.body;
    
    // Create new order
    const orderId = "SV-" + Math.floor(10000 + Math.random() * 90000);
    const newOrder = {
      id: orderId,
      items,
      totalAmount,
      discountAmount,
      gstAmount,
      shippingAmount,
      status: "Pending",
      paymentMethod,
      paymentStatus: paymentMethod === "COD" ? "Pending" : "Paid",
      address,
      date: new Date().toISOString(),
      trackingCode: paymentMethod !== "COD" ? "TRK-SV" + Math.floor(100000 + Math.random() * 900000) : undefined
    };

    // Deduct stocks
    items.forEach((item: any) => {
      const prod = db.products.find((p) => p.id === item.productId);
      if (prod) {
        prod.stock = Math.max(0, prod.stock - item.quantity);
      }
    });

    db.orders.unshift(newOrder);
    saveDB();
    res.status(201).json({ order: newOrder, message: "Order placed successfully!" });
  });

  // Admin Order Status Update
  app.put("/api/orders/:id", adminMiddleware, (req, res) => {
    const { id } = req.params;
    const { status, paymentStatus } = req.body;
    const order = db.orders.find((o) => o.id === id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (status) order.status = status;
    if (paymentStatus) order.paymentStatus = paymentStatus;

    if (status === "Shipped" && !order.trackingCode) {
      order.trackingCode = "TRK-SV" + Math.floor(100000 + Math.random() * 900000);
    }

    saveDB();
    res.json({ order, message: "Order updated successfully" });
  });

  // Admin Analytics
  app.get("/api/analytics", adminMiddleware, (req, res) => {
    // Sales computation
    const totalSales = db.orders
      .filter((o) => o.paymentStatus === "Paid" || o.status === "Delivered")
      .reduce((sum, o) => sum + o.totalAmount, 0);

    const pendingOrdersCount = db.orders.filter((o) => o.status === "Pending").length;
    const processingOrdersCount = db.orders.filter((o) => o.status === "Processing").length;
    const shippedOrdersCount = db.orders.filter((o) => o.status === "Shipped").length;
    const deliveredOrdersCount = db.orders.filter((o) => o.status === "Delivered").length;
    const cancelledOrdersCount = db.orders.filter((o) => o.status === "Cancelled").length;

    // Sells per product helper
    const productSales: Record<string, number> = {};
    db.orders.forEach((order) => {
      order.items.forEach((item: any) => {
        productSales[item.name] = (productSales[item.name] || 0) + item.quantity;
      });
    });

    const lowStockProducts = db.products.filter((p) => p.stock <= 15).map((p) => ({
      id: p.id,
      name: p.name,
      stock: p.stock,
      image: p.image
    }));

    const customersCount = db.users.filter((u) => u.role === "user").length;

    res.json({
      summary: {
        totalSales,
        totalOrders: db.orders.length,
        totalCustomers: customersCount,
        lowStockAlerts: lowStockProducts.length
      },
      orderStats: {
        Pending: pendingOrdersCount,
        Processing: processingOrdersCount,
        Shipped: shippedOrdersCount,
        Delivered: deliveredOrdersCount,
        Cancelled: cancelledOrdersCount
      },
      productSales,
      lowStockProducts
    });
  });

  // Coupons API
  app.get("/api/coupons", (req, res) => {
    res.json(db.coupons);
  });

  app.post("/api/coupons", adminMiddleware, (req, res) => {
    const { code, discountType, value, minOrder, active } = req.body;
    if (db.coupons.some((c) => c.code === code)) {
      return res.status(400).json({ message: "Coupon code already exists" });
    }
    const newCoupon = {
      code: code.toUpperCase(),
      discountType,
      value: Number(value),
      minOrder: Number(minOrder) || 0,
      active: active !== undefined ? active : true
    };
    db.coupons.push(newCoupon);
    saveDB();
    res.status(201).json({ coupon: newCoupon, message: "Coupon created successfully" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Shree Veda server running on port ${PORT}`);
  });
}

startServer();
