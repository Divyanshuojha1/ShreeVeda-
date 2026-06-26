import { Product, Category, Recipe, Blog, Coupon } from "./types";

export const CATEGORIES: Category[] = [
  {
    id: "ground-spices",
    name: "Ground Spices",
    slug: "ground-spices",
    description: "Freshly milled single-origin powders bursting with flavor and essential oils.",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=600",
    icon: "Wheat"
  },
  {
    id: "whole-spices",
    name: "Whole Spices",
    slug: "whole-spices",
    description: "Carefully selected raw spices from the finest organic farms in India.",
    image: "https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&q=80&w=600",
    icon: "Sparkles"
  },
  {
    id: "blend-masalas",
    name: "Blend Masalas",
    slug: "blend-masalas",
    description: "Traditional secret family formulations roasted and balanced perfectly.",
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=600",
    icon: "Flame"
  },
  {
    id: "gift-boxes",
    name: "Premium Gift Boxes",
    slug: "gift-boxes",
    description: "Handcrafted luxury packaging containing curated selections of our finest spices.",
    image: "https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&q=80&w=600",
    icon: "Gift"
  }
];

export const PRODUCTS: Product[] = [
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
    stock: 140,
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

export const RECIPES: Recipe[] = [
  {
    id: "royal-shahi-paneer",
    title: "Royal Shahi Paneer with Coorg Cardamom",
    description: "A rich, velvety paneer curry simmered in a cashew-tomato gravy, infused with Coorg cardamom and finished with Kashmiri Mongra Saffron threads.",
    prepTime: "15 mins",
    cookTime: "25 mins",
    servings: 4,
    difficulty: "Medium",
    ingredients: [
      "300g Fresh Paneer, cubed",
      "2 large Tomatoes, pureed",
      "1 large Onion, finely sliced",
      "10-12 Cashew nuts, soaked in warm water",
      "1 tsp Shree Veda Kashmiri Chili Powder",
      "1/2 tsp Shree Veda Royal Garam Masala",
      "1/4 tsp Shree Veda Sangli Turmeric Powder",
      "3-4 Coorg Green Cardamom pods, crushed",
      "10-12 strands pure Kashmiri Saffron",
      "2 tbsp Butter or Ghee",
      "3 tbsp Fresh Cream",
      "Salt to taste"
    ],
    instructions: [
      "Blend the soaked cashews with a little water into a super smooth paste. Set aside.",
      "Heat ghee/butter in a heavy pan. Add crushed cardamom pods, and saute onions until golden brown.",
      "Add tomato puree, turmeric, and Kashmiri chili powder. Cook until the oil begins to separate from the sides.",
      "Stir in the cashew paste and cook on low heat for 2-3 minutes.",
      "Add 1 cup of warm water, saffron strands (dissolved in 1 tbsp warm milk), and salt. Bring to a gentle simmer.",
      "Add paneer cubes, cover and simmer on low for 5 minutes.",
      "Sprinkle the Shree Veda Royal Garam Masala, stir in fresh cream, and serve hot with butter naan or saffron basmati rice."
    ],
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80&w=600",
    spiceTags: ["Kashmiri Chili Powder", "Royal Garam Masala", "Saffron", "Turmeric Powder"]
  },
  {
    id: "aromatic-jeera-rice",
    title: "Signature Jeera Rice (Cumin Infused)",
    description: "Fragrant basmati rice gently toasted in pure cow ghee and tempered with Gujarat bold cumin seeds and cloves.",
    prepTime: "10 mins",
    cookTime: "15 mins",
    servings: 3,
    difficulty: "Easy",
    ingredients: [
      "1 cup Premium Basmati Rice",
      "1.5 tbsp Organic Ghee",
      "1.5 tsp Shree Veda Cumin Seeds (Jeera)",
      "2-3 cloves (Laung)",
      "1 Bay leaf (Tejpatta)",
      "2 cups Water",
      "Salt to taste",
      "Fresh coriander for garnish"
    ],
    instructions: [
      "Wash basmati rice 3-4 times until the water runs clear. Soak in fresh water for 25 minutes, then drain.",
      "Heat ghee in a deep saucepot. Add cumin seeds. Once they sputter and release aroma, add cloves and bay leaf.",
      "Add the drained basmati rice and gently sauté in ghee for 2 minutes, ensuring not to break the long grains.",
      "Pour in water and add salt. Bring to a rolling boil.",
      "Reduce heat to the lowest setting, cover tightly with a lid, and cook for 11 minutes.",
      "Turn off the heat. Let it rest covered for 5 minutes. Fluff with a fork, garnish with chopped coriander, and enjoy."
    ],
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&q=80&w=600",
    spiceTags: ["Cumin Seeds", "Malabar Black Pepper"]
  }
];

export const BLOGS: Blog[] = [
  {
    id: "the-curcumin-difference",
    title: "The Curcumin Factor: Why Commercial Turmeric Fails the Health Test",
    excerpt: "Most store-bought turmeric has its precious essential oils and curcumin extracted for the pharma industry. Discover what pure, untouched Sangli Turmeric means for your body.",
    content: "Turmeric has been India's superfood for over 5000 years. However, the commercial turmeric powders we buy today are often depleted, lifeless, and stripped of their active compounds. To maximize profits, big companies extract curcumin (the active healing compound) to sell as pharmaceutical extracts, leaving behind a chalky powder with less than 1.5% curcumin. Our Sangli Turmeric has its essential oil fraction intact with a guaranteed 4.5%+ curcumin concentration. Learn how to tell the difference through smell, color dispersion tests, and overall warmth.",
    author: "Dr. Ananya Mishra, Ayurvedic Practitioner",
    date: "2026-06-12",
    image: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?auto=format&fit=crop&q=80&w=600",
    tags: ["Health", "Turmeric", "Organic Living"]
  },
  {
    id: "art-of-spice-roasting",
    title: "The Alchemist's Kitchen: Understanding the Art of Spice Roasting",
    excerpt: "Why does sputtering cumin in hot oil make it taste totally different from raw cumin? Dive into the science of tempering and roasting spices.",
    content: "Spice blending is not just about measurements; it is an organic chemistry dance. Spices contain volatile organic compounds (essential oils) trapped in their microscopic cells. Heat acts as a solvent and catalyst, breaking these cell walls and vaporizing the oils. Dry roasting induces a Maillard reaction, turning bitter compounds sweet and nutty. Sputtering in oil (tadka) infuses fat-soluble flavors directly into the medium, ensuring every bite of your food carries the active fragrance. In this article, we map out the smoke points of ghee, coconut oil, and mustard oil alongside roasting times of 15 whole spices.",
    author: "Chef Ranveer Brar (Heritage Culinary Expert)",
    date: "2026-06-22",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=600",
    tags: ["Culinary Science", "Techniques", "Blend Masalas"]
  }
];

export const COUPONS: Coupon[] = [
  {
    code: "VEDA10",
    discountType: "percentage",
    value: 10,
    minOrder: 499,
    active: true
  },
  {
    code: "FREESHIP",
    discountType: "fixed",
    value: 50,
    minOrder: 300,
    active: true
  },
  {
    code: "FESTIVE200",
    discountType: "fixed",
    value: 200,
    minOrder: 1499,
    active: true
  }
];
