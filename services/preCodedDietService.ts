import { UserProfile, HealthMetrics, DietPlan, FoodItem, FoodCategory, DietPreference } from "../types";

// Multiple Bangladesh diet plans - 5 different options
const BANGLADESH_DIET_PLANS: Record<string, DietPlan> = {
  "Budget": {
    breakfast: [
      {
        id: "bd-bud-bf-1",
        name: "Puffed Rice (Muri)",
        serving: "1 bowl",
        calories: 120,
        protein: 3,
        carbs: 24,
        fats: 1,
        category: "carb",
        regions: ["Bangladesh"]
      },
      {
        id: "bd-bud-bf-2",
        name: "Boiled Egg (Siddho Dim)",
        serving: "2 eggs",
        calories: 140,
        protein: 12,
        carbs: 1,
        fats: 10,
        category: "protein",
        regions: ["Bangladesh"]
      },
      {
        id: "bd-bud-bf-3",
        name: "Guava (Peyara)",
        serving: "1 medium",
        calories: 45,
        protein: 1,
        carbs: 11,
        fats: 0,
        category: "fruit",
        regions: ["Bangladesh"]
      }
    ],
    lunch: [
      {
        id: "bd-bud-l-1",
        name: "Red Lentil Dal (Masoor Dal)",
        serving: "1 bowl",
        calories: 160,
        protein: 12,
        carbs: 28,
        fats: 2,
        category: "protein",
        regions: ["Bangladesh"]
      },
      {
        id: "bd-bud-l-2",
        name: "Steamed Rice (Bhat)",
        serving: "1 bowl",
        calories: 206,
        protein: 4,
        carbs: 45,
        fats: 0,
        category: "carb",
        regions: ["Bangladesh"]
      },
      {
        id: "bd-bud-l-3",
        name: "Stir-fried Okra (Dherosh Bhaji)",
        serving: "1 bowl",
        calories: 80,
        protein: 3,
        carbs: 14,
        fats: 3,
        category: "veg",
        regions: ["Bangladesh"]
      }
    ],
    snacks: [
      {
        id: "bd-bud-s-1",
        name: "Roasted Chickpeas (Chana)",
        serving: "1 cup",
        calories: 200,
        protein: 10,
        carbs: 34,
        fats: 3,
        category: "protein",
        regions: ["Bangladesh"]
      },
      {
        id: "bd-bud-s-2",
        name: "Lemon Sherbet (Lebur Shorbot)",
        serving: "1 glass",
        calories: 40,
        protein: 0,
        carbs: 10,
        fats: 0,
        category: "dairy",
        regions: ["Bangladesh"]
      }
    ],
    dinner: [
      {
        id: "bd-bud-d-1",
        name: "Small Fish Curry (Kachki Macher Tarkari)",
        serving: "1 bowl",
        calories: 200,
        protein: 18,
        carbs: 8,
        fats: 10,
        category: "protein",
        regions: ["Bangladesh"]
      },
      {
        id: "bd-bud-d-2",
        name: "Steamed Rice",
        serving: "1 bowl",
        calories: 206,
        protein: 4,
        carbs: 45,
        fats: 0,
        category: "carb",
        regions: ["Bangladesh"]
      },
      {
        id: "bd-bud-d-3",
        name: "Pumpkin Curry (Kumro Bhaji)",
        serving: "1 bowl",
        calories: 70,
        protein: 2,
        carbs: 14,
        fats: 2,
        category: "veg",
        regions: ["Bangladesh"]
      }
    ]
  },
  "Standard": {
    breakfast: [
      {
        id: "bd-std-bf-1",
        name: "Rice Flour Roti (Chaler Ruti)",
        serving: "2 medium",
        calories: 180,
        protein: 4,
        carbs: 35,
        fats: 3,
        category: "carb",
        regions: ["Bangladesh"]
      },
      {
        id: "bd-std-bf-2",
        name: "Egg Curry (Dim Bhuna)",
        serving: "2 eggs",
        calories: 200,
        protein: 14,
        carbs: 5,
        fats: 14,
        category: "protein",
        regions: ["Bangladesh"]
      },
      {
        id: "bd-std-bf-3",
        name: "Papaya (Pepe)",
        serving: "1 cup",
        calories: 60,
        protein: 1,
        carbs: 15,
        fats: 0,
        category: "fruit",
        regions: ["Bangladesh"]
      },
      {
        id: "bd-std-bf-4",
        name: "Local Yogurt (Doi)",
        serving: "1 bowl",
        calories: 100,
        protein: 8,
        carbs: 12,
        fats: 3,
        category: "dairy",
        regions: ["Bangladesh"]
      }
    ],
    lunch: [
      {
        id: "bd-std-l-1",
        name: "Local Chicken Curry (Deshi Murgir Mangsho)",
        serving: "1 bowl",
        calories: 280,
        protein: 25,
        carbs: 12,
        fats: 16,
        category: "protein",
        regions: ["Bangladesh"]
      },
      {
        id: "bd-std-l-2",
        name: "Steamed Rice",
        serving: "1.5 bowls",
        calories: 309,
        protein: 6,
        carbs: 68,
        fats: 0,
        category: "carb",
        regions: ["Bangladesh"]
      },
      {
        id: "bd-std-l-3",
        name: "Potato Curry (Alu Dum)",
        serving: "1 bowl",
        calories: 150,
        protein: 3,
        carbs: 25,
        fats: 6,
        category: "veg",
        regions: ["Bangladesh"]
      },
      {
        id: "bd-std-l-4",
        name: "Mixed Vegetables (Sobji)",
        serving: "1 bowl",
        calories: 90,
        protein: 4,
        carbs: 16,
        fats: 3,
        category: "veg",
        regions: ["Bangladesh"]
      }
    ],
    snacks: [
      {
        id: "bd-std-s-1",
        name: "Spicy Puffed Rice (Jhalmuri)",
        serving: "1 bowl",
        calories: 120,
        protein: 3,
        carbs: 22,
        fats: 3,
        category: "carb",
        regions: ["Bangladesh"]
      },
      {
        id: "bd-std-s-2",
        name: "Local Yogurt (Doi)",
        serving: "1 bowl",
        calories: 100,
        protein: 8,
        carbs: 12,
        fats: 3,
        category: "dairy",
        regions: ["Bangladesh"]
      },
      {
        id: "bd-std-s-3",
        name: "Banana (Kola)",
        serving: "1 medium",
        calories: 105,
        protein: 1,
        carbs: 27,
        fats: 0,
        category: "fruit",
        regions: ["Bangladesh"]
      }
    ],
    dinner: [
      {
        id: "bd-std-d-1",
        name: "Small Fish Curry (Choto Macher Tarkari)",
        serving: "1 bowl",
        calories: 220,
        protein: 20,
        carbs: 8,
        fats: 12,
        category: "protein",
        regions: ["Bangladesh"]
      },
      {
        id: "bd-std-d-2",
        name: "Steamed Rice",
        serving: "1 bowl",
        calories: 206,
        protein: 4,
        carbs: 45,
        fats: 0,
        category: "carb",
        regions: ["Bangladesh"]
      },
      {
        id: "bd-std-d-3",
        name: "Bottle Gourd Curry (Lau Tarkari)",
        serving: "1 bowl",
        calories: 60,
        protein: 2,
        carbs: 12,
        fats: 2,
        category: "veg",
        regions: ["Bangladesh"]
      },
      {
        id: "bd-std-d-4",
        name: "Green Salad (Salad)",
        serving: "1 bowl",
        calories: 30,
        protein: 2,
        carbs: 6,
        fats: 0,
        category: "veg",
        regions: ["Bangladesh"]
      }
    ]
  },
  "Premium": {
    breakfast: [
      {
        id: "bd-pre-bf-1",
        name: "Whole Wheat Roti (Lal Attar Ruti)",
        serving: "2 pieces",
        calories: 160,
        protein: 6,
        carbs: 38,
        fats: 2,
        category: "carb",
        regions: ["Bangladesh"]
      },
      {
        id: "bd-pre-bf-2",
        name: "Chicken Korma (Murgir Korma)",
        serving: "1 bowl",
        calories: 300,
        protein: 25,
        carbs: 15,
        fats: 18,
        category: "protein",
        regions: ["Bangladesh"]
      },
      {
        id: "bd-pre-bf-3",
        name: "Lassi (Lassi)",
        serving: "1 glass",
        calories: 120,
        protein: 4,
        carbs: 20,
        fats: 3,
        category: "dairy",
        regions: ["Bangladesh"]
      },
      {
        id: "bd-pre-bf-4",
        name: "Seasonal Fruits (Moushumi Fol)",
        serving: "1 bowl",
        calories: 80,
        protein: 1,
        carbs: 20,
        fats: 0,
        category: "fruit",
        regions: ["Bangladesh"]
      }
    ],
    lunch: [
      {
        id: "bd-pre-l-1",
        name: "Beef Bhuna (Gorur Mangsho Bhuna)",
        serving: "1 bowl",
        calories: 350,
        protein: 30,
        carbs: 10,
        fats: 22,
        category: "protein",
        regions: ["Bangladesh"]
      },
      {
        id: "bd-pre-l-2",
        name: "Basmati Rice (Basmati Chaal)",
        serving: "1.5 bowls",
        calories: 309,
        protein: 6,
        carbs: 68,
        fats: 0,
        category: "carb",
        regions: ["Bangladesh"]
      },
      {
        id: "bd-pre-l-3",
        name: "Mixed Vegetable Curry (Sobji Tarkari)",
        serving: "1 bowl",
        calories: 150,
        protein: 6,
        carbs: 20,
        fats: 6,
        category: "veg",
        regions: ["Bangladesh"]
      },
      {
        id: "bd-pre-l-4",
        name: "Raita (Raita)",
        serving: "1 bowl",
        calories: 80,
        protein: 4,
        carbs: 10,
        fats: 3,
        category: "dairy",
        regions: ["Bangladesh"]
      },
      {
        id: "bd-pre-l-5",
        name: "Green Salad",
        serving: "1 bowl",
        calories: 30,
        protein: 2,
        carbs: 6,
        fats: 0,
        category: "veg",
        regions: ["Bangladesh"]
      }
    ],
    snacks: [
      {
        id: "bd-pre-s-1",
        name: "Chicken Sandwich (Brown Bread)",
        serving: "1 sandwich",
        calories: 250,
        protein: 15,
        carbs: 25,
        fats: 8,
        category: "protein",
        regions: ["Bangladesh"]
      },
      {
        id: "bd-pre-s-2",
        name: "Milk Tea (Dudh Cha)",
        serving: "1 cup",
        calories: 60,
        protein: 2,
        carbs: 10,
        fats: 2,
        category: "dairy",
        regions: ["Bangladesh"]
      },
      {
        id: "bd-pre-s-3",
        name: "Dry Fruits Mix (Kishmish Badam)",
        serving: "30g",
        calories: 120,
        protein: 3,
        carbs: 15,
        fats: 6,
        category: "fat",
        regions: ["Bangladesh"]
      }
    ],
    dinner: [
      {
        id: "bd-pre-d-1",
        name: "Hilsa Fish Curry (Ilish Macher Tarkari)",
        serving: "1 bowl",
        calories: 320,
        protein: 28,
        carbs: 8,
        fats: 20,
        category: "protein",
        regions: ["Bangladesh"]
      },
      {
        id: "bd-pre-d-2",
        name: "Polao Rice (Polao)",
        serving: "1 bowl",
        calories: 240,
        protein: 5,
        carbs: 50,
        fats: 4,
        category: "carb",
        regions: ["Bangladesh"]
      },
      {
        id: "bd-pre-d-3",
        name: "Mutton Rezala (Khashir Rezala)",
        serving: "1 bowl",
        calories: 380,
        protein: 32,
        carbs: 15,
        fats: 24,
        category: "protein",
        regions: ["Bangladesh"]
      },
      {
        id: "bd-pre-d-4",
        name: "Cucumber Salad (Shosha Salad)",
        serving: "1 bowl",
        calories: 25,
        protein: 1,
        carbs: 5,
        fats: 0,
        category: "veg",
        regions: ["Bangladesh"]
      }
    ]
  },
  "Vegetarian": {
    breakfast: [
      {
        id: "bd-veg-bf-1",
        name: "Fermented Rice (Panta Bhat)",
        serving: "1 bowl",
        calories: 180,
        protein: 4,
        carbs: 40,
        fats: 1,
        category: "carb",
        regions: ["Bangladesh"]
      },
      {
        id: "bd-veg-bf-2",
        name: "Mixed Dal (Panchmishali Dal)",
        serving: "1 bowl",
        calories: 180,
        protein: 14,
        carbs: 30,
        fats: 3,
        category: "protein",
        regions: ["Bangladesh"]
      },
      {
        id: "bd-veg-bf-3",
        name: "Green Mango Chutney (Kacha Amer Chatni)",
        serving: "2 tbsp",
        calories: 60,
        protein: 0.5,
        carbs: 15,
        fats: 0.5,
        category: "fruit",
        regions: ["Bangladesh"]
      }
    ],
    lunch: [
      {
        id: "bd-veg-l-1",
        name: "Moong Dal with Vegetables (Sobji Diye Mug Dal)",
        serving: "1 bowl",
        calories: 200,
        protein: 12,
        carbs: 32,
        fats: 4,
        category: "protein",
        regions: ["Bangladesh"]
      },
      {
        id: "bd-veg-l-2",
        name: "Steamed Rice",
        serving: "2 bowls",
        calories: 412,
        protein: 8,
        carbs: 90,
        fats: 0,
        category: "carb",
        regions: ["Bangladesh"]
      },
      {
        id: "bd-veg-l-3",
        name: "Potato Stir Fry (Alu Bhaji)",
        serving: "1 bowl",
        calories: 140,
        protein: 3,
        carbs: 25,
        fats: 5,
        category: "veg",
        regions: ["Bangladesh"]
      },
      {
        id: "bd-veg-l-4",
        name: "Bottle Gourd Dish (Lau Ghonto)",
        serving: "1 bowl",
        calories: 80,
        protein: 3,
        carbs: 15,
        fats: 2,
        category: "veg",
        regions: ["Bangladesh"]
      },
      {
        id: "bd-veg-l-5",
        name: "Malabar Spinach (Pui Shak)",
        serving: "1 bowl",
        calories: 70,
        protein: 3,
        carbs: 12,
        fats: 2,
        category: "veg",
        regions: ["Bangladesh"]
      }
    ],
    snacks: [
      {
        id: "bd-veg-s-1",
        name: "Puffed Rice with Mustard Oil (Muri Makha)",
        serving: "1 bowl",
        calories: 140,
        protein: 3,
        carbs: 28,
        fats: 3,
        category: "carb",
        regions: ["Bangladesh"]
      },
      {
        id: "bd-veg-s-2",
        name: "Roasted Peanuts (Badam)",
        serving: "30g",
        calories: 170,
        protein: 7,
        carbs: 5,
        fats: 14,
        category: "fat",
        regions: ["Bangladesh"]
      },
      {
        id: "bd-veg-s-3",
        name: "Seasonal Fruits",
        serving: "1 bowl",
        calories: 80,
        protein: 1,
        carbs: 20,
        fats: 0,
        category: "fruit",
        regions: ["Bangladesh"]
      }
    ],
    dinner: [
      {
        id: "bd-veg-d-1",
        name: "Bengal Gram Lentils (Chana Dal)",
        serving: "1 bowl",
        calories: 220,
        protein: 16,
        carbs: 35,
        fats: 4,
        category: "protein",
        regions: ["Bangladesh"]
      },
      {
        id: "bd-veg-d-2",
        name: "Steamed Rice",
        serving: "1.5 bowls",
        calories: 309,
        protein: 6,
        carbs: 68,
        fats: 0,
        category: "carb",
        regions: ["Bangladesh"]
      },
      {
        id: "bd-veg-d-3",
        name: "Pumpkin Stir Fry (Kumro Bhaji)",
        serving: "1 bowl",
        calories: 90,
        protein: 2,
        carbs: 18,
        fats: 3,
        category: "veg",
        regions: ["Bangladesh"]
      },
      {
        id: "bd-veg-d-4",
        name: "Tomato Chutney (Tomator Chatni)",
        serving: "2 tbsp",
        calories: 50,
        protein: 1,
        carbs: 12,
        fats: 0,
        category: "fruit",
        regions: ["Bangladesh"]
      }
    ]
  },
  "Regional": {
    breakfast: [
      {
        id: "bd-reg-bf-1",
        name: "Flattened Rice with Milk (Dudh Chira)",
        serving: "1 bowl",
        calories: 160,
        protein: 5,
        carbs: 32,
        fats: 2,
        category: "carb",
        regions: ["Bangladesh"]
      },
      {
        id: "bd-reg-bf-2",
        name: "Fish Eggs (Macher Dim)",
        serving: "50g",
        calories: 120,
        protein: 18,
        carbs: 2,
        fats: 4,
        category: "protein",
        regions: ["Bangladesh"]
      },
      {
        id: "bd-reg-bf-3",
        name: "Black Plum (Kalo Jam)",
        serving: "3 pieces",
        calories: 45,
        protein: 0.5,
        carbs: 11,
        fats: 0.2,
        category: "fruit",
        regions: ["Bangladesh"]
      }
    ],
    lunch: [
      {
        id: "bd-reg-l-1",
        name: "Dry Fish Paste (Shutki Bhorta)",
        serving: "1 bowl",
        calories: 160,
        protein: 22,
        carbs: 8,
        fats: 5,
        category: "protein",
        regions: ["Bangladesh"]
      },
      {
        id: "bd-reg-l-2",
        name: "Aromatic Rice (Miniket Chaal)",
        serving: "1 bowl",
        calories: 216,
        protein: 4,
        carbs: 45,
        fats: 0,
        category: "carb",
        regions: ["Bangladesh"]
      },
      {
        id: "bd-reg-l-3",
        name: "Taro Stem Curry (Kochur Loti)",
        serving: "1 bowl",
        calories: 85,
        protein: 3,
        carbs: 15,
        fats: 3,
        category: "veg",
        regions: ["Bangladesh"]
      },
      {
        id: "bd-reg-l-4",
        name: "Green Guava (Kacha Peyara)",
        serving: "1 medium",
        calories: 45,
        protein: 1,
        carbs: 10,
        fats: 0,
        category: "fruit",
        regions: ["Bangladesh"]
      }
    ],
    snacks: [
      {
        id: "bd-reg-s-1",
        name: "Olive Pickle (Jolpai Achar)",
        serving: "1 tbsp",
        calories: 45,
        protein: 0,
        carbs: 4,
        fats: 3,
        category: "veg",
        regions: ["Bangladesh"]
      },
      {
        id: "bd-reg-s-2",
        name: "Coconut Water (Daaber Pani)",
        serving: "1 glass",
        calories: 45,
        protein: 1,
        carbs: 10,
        fats: 0,
        category: "dairy",
        regions: ["Bangladesh"]
      },
      {
        id: "bd-reg-s-3",
        name: "Puffed Rice with Jaggery (Gur Muri)",
        serving: "1 bowl",
        calories: 120,
        protein: 2,
        carbs: 25,
        fats: 1,
        category: "carb",
        regions: ["Bangladesh"]
      }
    ],
    dinner: [
      {
        id: "bd-reg-d-1",
        name: "Steamed Hilsa in Mustard Sauce (Shorshe Ilish)",
        serving: "1 piece",
        calories: 280,
        protein: 25,
        carbs: 6,
        fats: 18,
        category: "protein",
        regions: ["Bangladesh"]
      },
      {
        id: "bd-reg-d-2",
        name: "Steamed Rice",
        serving: "1 bowl",
        calories: 206,
        protein: 4,
        carbs: 45,
        fats: 0,
        category: "carb",
        regions: ["Bangladesh"]
      },
      {
        id: "bd-reg-d-3",
        name: "Drumstick Stems (Sojne Data)",
        serving: "1 bowl",
        calories: 75,
        protein: 4,
        carbs: 12,
        fats: 2,
        category: "veg",
        regions: ["Bangladesh"]
      },
      {
        id: "bd-reg-d-4",
        name: "Wood Apple (Bel)",
        serving: "1/2 fruit",
        calories: 60,
        protein: 1,
        carbs: 14,
        fats: 0.5,
        category: "fruit",
        regions: ["Bangladesh"]
      }
    ]
  }
};

// Alternative diet plans for other countries
const ALTERNATIVE_DIET_PLANS: Record<string, DietPlan> = {
  "India_Affordable": {
    breakfast: [
      {
        id: "in-alt-bf-1",
        name: "Poha (Flattened Rice)",
        serving: "1 bowl",
        calories: 180,
        protein: 4,
        carbs: 36,
        fats: 3,
        category: "carb",
        regions: ["India"]
      },
      {
        id: "in-alt-bf-2",
        name: "Sprouts Moong Dal",
        serving: "1 bowl",
        calories: 150,
        protein: 8,
        carbs: 25,
        fats: 2,
        category: "protein",
        regions: ["India"]
      },
      {
        id: "in-alt-bf-3",
        name: "Banana",
        serving: "1 medium",
        calories: 105,
        protein: 1,
        carbs: 27,
        fats: 0,
        category: "fruit",
        regions: ["India"]
      }
    ],
    lunch: [
      {
        id: "in-alt-l-1",
        name: "Chana Masala (Chickpea Curry)",
        serving: "1 bowl",
        calories: 200,
        protein: 10,
        carbs: 32,
        fats: 4,
        category: "protein",
        regions: ["India"]
      },
      {
        id: "in-alt-l-2",
        name: "Millet Roti (Bajra Roti)",
        serving: "2 rotis",
        calories: 160,
        protein: 5,
        carbs: 32,
        fats: 3,
        category: "carb",
        regions: ["India"]
      },
      {
        id: "in-alt-l-3",
        name: "Cabbage Sabzi",
        serving: "1 bowl",
        calories: 80,
        protein: 3,
        carbs: 16,
        fats: 2,
        category: "veg",
        regions: ["India"]
      }
    ],
    snacks: [
      {
        id: "in-alt-s-1",
        name: "Roasted Makhana",
        serving: "1 cup",
        calories: 120,
        protein: 3,
        carbs: 18,
        fats: 5,
        category: "carb",
        regions: ["India"]
      },
      {
        id: "in-alt-s-2",
        name: "Jaggery with Water",
        serving: "1 piece + glass",
        calories: 80,
        protein: 0,
        carbs: 20,
        fats: 0,
        category: "dairy",
        regions: ["India"]
      }
    ],
    dinner: [
      {
        id: "in-alt-d-1",
        name: "Soya Chunks Curry",
        serving: "1 bowl",
        calories: 220,
        protein: 16,
        carbs: 18,
        fats: 8,
        category: "protein",
        regions: ["India"]
      },
      {
        id: "in-alt-d-2",
        name: "Jowar Roti (Sorghum)",
        serving: "2 rotis",
        calories: 140,
        protein: 4,
        carbs: 28,
        fats: 2,
        category: "carb",
        regions: ["India"]
      },
      {
        id: "in-alt-d-3",
        name: "Drumstick Curry",
        serving: "1 bowl",
        calories: 100,
        protein: 4,
        carbs: 16,
        fats: 3,
        category: "veg",
        regions: ["India"]
      }
    ]
  }
};

// Food swap options for each category
const FOOD_SWAPS: Record<string, FoodItem[]> = {
  "protein": [
    {
      id: "swap-egg",
      name: "Eggs",
      serving: "2 eggs",
      calories: 140,
      protein: 12,
      carbs: 1,
      fats: 10,
      category: "protein",
      regions: ["All"]
    },
    {
      id: "swap-tofu",
      name: "Tofu",
      serving: "150g",
      calories: 120,
      protein: 15,
      carbs: 6,
      fats: 8,
      category: "protein",
      regions: ["All"]
    },
    {
      id: "swap-lentils",
      name: "Lentils",
      serving: "1 cup cooked",
      calories: 230,
      protein: 18,
      carbs: 40,
      fats: 1,
      category: "protein",
      regions: ["All"]
    },
    {
      id: "swap-yogurt",
      name: "Greek Yogurt",
      serving: "200g",
      calories: 150,
      protein: 20,
      carbs: 12,
      fats: 4,
      category: "protein",
      regions: ["All"]
    },
    {
      id: "swap-bd-dal",
      name: "Moong Dal (Mug Dal)",
      serving: "1 bowl",
      calories: 150,
      protein: 10,
      carbs: 25,
      fats: 3,
      category: "protein",
      regions: ["Bangladesh"]
    },
    {
      id: "swap-bd-shutki",
      name: "Dry Fish (Shutki)",
      serving: "50g",
      calories: 140,
      protein: 22,
      carbs: 0,
      fats: 5,
      category: "protein",
      regions: ["Bangladesh"]
    },
    {
      id: "swap-bd-mach",
      name: "Hilsa Fish (Ilish Mach)",
      serving: "100g",
      calories: 180,
      protein: 20,
      carbs: 0,
      fats: 10,
      category: "protein",
      regions: ["Bangladesh"]
    }
  ],
  "carb": [
    {
      id: "swap-rice",
      name: "White Rice",
      serving: "1 cup cooked",
      calories: 206,
      protein: 4,
      carbs: 45,
      fats: 0,
      category: "carb",
      regions: ["All"]
    },
    {
      id: "swap-bread",
      name: "Whole Wheat Bread",
      serving: "2 slices",
      calories: 140,
      protein: 6,
      carbs: 24,
      fats: 4,
      category: "carb",
      regions: ["All"]
    },
    {
      id: "swap-potato",
      name: "Potatoes",
      serving: "2 medium",
      calories: 160,
      protein: 4,
      carbs: 35,
      fats: 0,
      category: "carb",
      regions: ["All"]
    },
    {
      id: "swap-pasta",
      name: "Pasta",
      serving: "1 cup cooked",
      calories: 220,
      protein: 8,
      carbs: 42,
      fats: 2,
      category: "carb",
      regions: ["All"]
    },
    {
      id: "swap-bd-panta",
      name: "Fermented Rice (Panta Bhat)",
      serving: "1 bowl",
      calories: 180,
      protein: 4,
      carbs: 40,
      fats: 1,
      category: "carb",
      regions: ["Bangladesh"]
    },
    {
      id: "swap-bd-roti",
      name: "Wheat Roti (Attar Ruti)",
      serving: "2 pieces",
      calories: 160,
      protein: 5,
      carbs: 32,
      fats: 2,
      category: "carb",
      regions: ["Bangladesh"]
    },
    {
      id: "swap-bd-chira",
      name: "Flattened Rice (Chira)",
      serving: "1 bowl",
      calories: 140,
      protein: 3,
      carbs: 28,
      fats: 1,
      category: "carb",
      regions: ["Bangladesh"]
    }
  ],
  "veg": [
    {
      id: "swap-mixed",
      name: "Mixed Vegetables",
      serving: "1 cup",
      calories: 50,
      protein: 2,
      carbs: 10,
      fats: 0,
      category: "veg",
      regions: ["All"]
    },
    {
      id: "swap-broccoli",
      name: "Broccoli",
      serving: "1 cup",
      calories: 55,
      protein: 4,
      carbs: 11,
      fats: 1,
      category: "veg",
      regions: ["All"]
    },
    {
      id: "swap-spinach",
      name: "Spinach",
      serving: "2 cups",
      calories: 14,
      protein: 2,
      carbs: 2,
      fats: 0,
      category: "veg",
      regions: ["All"]
    },
    {
      id: "swap-carrots",
      name: "Carrots",
      serving: "1 cup",
      calories: 50,
      protein: 1,
      carbs: 12,
      fats: 0,
      category: "veg",
      regions: ["All"]
    },
    {
      id: "swap-bd-lau",
      name: "Bottle Gourd (Lau)",
      serving: "1 bowl",
      calories: 60,
      protein: 2,
      carbs: 12,
      fats: 2,
      category: "veg",
      regions: ["Bangladesh"]
    },
    {
      id: "swap-bd-alu",
      name: "Potato Curry (Alu Bhaji)",
      serving: "1 bowl",
      calories: 140,
      protein: 3,
      carbs: 25,
      fats: 5,
      category: "veg",
      regions: ["Bangladesh"]
    },
    {
      id: "swap-bd-pui",
      name: "Malabar Spinach (Pui Shak)",
      serving: "1 bowl",
      calories: 70,
      protein: 3,
      carbs: 12,
      fats: 2,
      category: "veg",
      regions: ["Bangladesh"]
    }
  ],
  "fruit": [
    {
      id: "swap-apple",
      name: "Apple",
      serving: "1 medium",
      calories: 95,
      protein: 0,
      carbs: 25,
      fats: 0,
      category: "fruit",
      regions: ["All"]
    },
    {
      id: "swap-banana",
      name: "Banana",
      serving: "1 medium",
      calories: 105,
      protein: 1,
      carbs: 27,
      fats: 0,
      category: "fruit",
      regions: ["All"]
    },
    {
      id: "swap-orange",
      name: "Orange",
      serving: "1 medium",
      calories: 62,
      protein: 1,
      carbs: 15,
      fats: 0,
      category: "fruit",
      regions: ["All"]
    },
    {
      id: "swap-berries",
      name: "Mixed Berries",
      serving: "1 cup",
      calories: 80,
      protein: 1,
      carbs: 20,
      fats: 0,
      category: "fruit",
      regions: ["All"]
    },
    {
      id: "swap-bd-amra",
      name: "Hog Plum (Amra)",
      serving: "3 pieces",
      calories: 40,
      protein: 1,
      carbs: 10,
      fats: 0,
      category: "fruit",
      regions: ["Bangladesh"]
    },
    {
      id: "swap-bd-kathal",
      name: "Jackfruit (Kathal)",
      serving: "1 cup",
      calories: 150,
      protein: 2,
      carbs: 38,
      fats: 1,
      category: "fruit",
      regions: ["Bangladesh"]
    },
    {
      id: "swap-bd-lebu",
      name: "Lemon (Lebu)",
      serving: "1 medium",
      calories: 15,
      protein: 0,
      carbs: 5,
      fats: 0,
      category: "fruit",
      regions: ["Bangladesh"]
    }
  ],
  "dairy": [
    {
      id: "swap-milk",
      name: "Milk",
      serving: "1 glass",
      calories: 120,
      protein: 8,
      carbs: 12,
      fats: 5,
      category: "dairy",
      regions: ["All"]
    },
    {
      id: "swap-cheese",
      name: "Cheese",
      serving: "30g",
      calories: 100,
      protein: 6,
      carbs: 1,
      fats: 8,
      category: "dairy",
      regions: ["All"]
    },
    {
      id: "swap-cottage",
      name: "Cottage Cheese",
      serving: "100g",
      calories: 98,
      protein: 11,
      carbs: 6,
      fats: 4,
      category: "dairy",
      regions: ["All"]
    },
    {
      id: "swap-bd-doi",
      name: "Local Yogurt (Doi)",
      serving: "1 bowl",
      calories: 110,
      protein: 8,
      carbs: 14,
      fats: 3,
      category: "dairy",
      regions: ["Bangladesh"]
    },
    {
      id: "swap-bd-lassi",
      name: "Lassi (Lassi)",
      serving: "1 glass",
      calories: 90,
      protein: 3,
      carbs: 15,
      fats: 2,
      category: "dairy",
      regions: ["Bangladesh"]
    }
  ],
  "fat": [
    {
      id: "swap-olive",
      name: "Olive Oil",
      serving: "1 tbsp",
      calories: 120,
      protein: 0,
      carbs: 0,
      fats: 14,
      category: "fat",
      regions: ["All"]
    },
    {
      id: "swap-almonds",
      name: "Almonds",
      serving: "20 almonds",
      calories: 140,
      protein: 6,
      carbs: 6,
      fats: 12,
      category: "fat",
      regions: ["All"]
    },
    {
      id: "swap-avocado",
      name: "Avocado",
      serving: "1/2 avocado",
      calories: 120,
      protein: 2,
      carbs: 6,
      fats: 11,
      category: "fat",
      regions: ["All"]
    },
    {
      id: "swap-peanut",
      name: "Peanut Butter",
      serving: "1 tbsp",
      calories: 95,
      protein: 4,
      carbs: 3,
      fats: 8,
      category: "fat",
      regions: ["All"]
    }
  ]
};

// Pre-coded diet plans for different countries - using locally available foods
const preCodedDietPlans: Record<string, Record<string, DietPlan>> = {
  "USA": {
    [DietPreference.STANDARD]: {
      breakfast: [
        {
          id: "us-bf-1",
          name: "Oatmeal",
          serving: "1 cup cooked",
          calories: 150,
          protein: 5,
          carbs: 27,
          fats: 3,
          category: "carb",
          regions: ["USA"]
        },
        {
          id: "us-bf-2",
          name: "Eggs",
          serving: "2 scrambled",
          calories: 180,
          protein: 12,
          carbs: 2,
          fats: 14,
          category: "protein",
          regions: ["USA"]
        },
        {
          id: "us-bf-3",
          name: "Banana",
          serving: "1 medium",
          calories: 105,
          protein: 1,
          carbs: 27,
          fats: 0,
          category: "fruit",
          regions: ["USA"]
        }
      ],
      lunch: [
        {
          id: "us-l-1",
          name: "Chicken Breast",
          serving: "150g grilled",
          calories: 240,
          protein: 35,
          carbs: 0,
          fats: 10,
          category: "protein",
          regions: ["USA"]
        },
        {
          id: "us-l-2",
          name: "Brown Rice",
          serving: "1 cup cooked",
          calories: 216,
          protein: 5,
          carbs: 45,
          fats: 2,
          category: "carb",
          regions: ["USA"]
        },
        {
          id: "us-l-3",
          name: "Broccoli",
          serving: "1 cup steamed",
          calories: 55,
          protein: 4,
          carbs: 11,
          fats: 1,
          category: "veg",
          regions: ["USA"]
        }
      ],
      snacks: [
        {
          id: "us-s-1",
          name: "Apple",
          serving: "1 medium",
          calories: 95,
          protein: 0,
          carbs: 25,
          fats: 0,
          category: "fruit",
          regions: ["USA"]
        },
        {
          id: "us-s-2",
          name: "Almonds",
          serving: "20 almonds",
          calories: 140,
          protein: 6,
          carbs: 6,
          fats: 12,
          category: "fat",
          regions: ["USA"]
        }
      ],
      dinner: [
        {
          id: "us-d-1",
          name: "Salmon",
          serving: "150g baked",
          calories: 280,
          protein: 35,
          carbs: 0,
          fats: 15,
          category: "protein",
          regions: ["USA"]
        },
        {
          id: "us-d-2",
          name: "Sweet Potato",
          serving: "1 medium baked",
          calories: 103,
          protein: 2,
          carbs: 24,
          fats: 0,
          category: "carb",
          regions: ["USA"]
        },
        {
          id: "us-d-3",
          name: "Mixed Green Salad",
          serving: "2 cups",
          calories: 30,
          protein: 2,
          carbs: 6,
          fats: 0,
          category: "veg",
          regions: ["USA"]
        }
      ]
    }
  },
  "Bangladesh": {
    [DietPreference.STANDARD]: {
      breakfast: [
        {
          id: "bd-bf-1",
          name: "Rice Flour Roti",
          serving: "2 medium",
          calories: 180,
          protein: 4,
          carbs: 35,
          fats: 3,
          category: "carb",
          regions: ["Bangladesh"]
        },
        {
          id: "bd-bf-2",
          name: "Egg Curry",
          serving: "2 eggs",
          calories: 200,
          protein: 14,
          carbs: 5,
          fats: 14,
          category: "protein",
          regions: ["Bangladesh"]
        },
        {
          id: "bd-bf-3",
          name: "Papaya",
          serving: "1 cup",
          calories: 60,
          protein: 1,
          carbs: 15,
          fats: 0,
          category: "fruit",
          regions: ["Bangladesh"]
        }
      ],
      lunch: [
        {
          id: "bd-l-1",
          name: "Local Chicken Curry",
          serving: "1 bowl",
          calories: 280,
          protein: 25,
          carbs: 12,
          fats: 16,
          category: "protein",
          regions: ["Bangladesh"]
        },
        {
          id: "bd-l-2",
          name: "Steamed Rice",
          serving: "1.5 bowls",
          calories: 309,
          protein: 6,
          carbs: 68,
          fats: 0,
          category: "carb",
          regions: ["Bangladesh"]
        },
        {
          id: "bd-l-3",
          name: "Potato Curry",
          serving: "1 bowl",
          calories: 150,
          protein: 3,
          carbs: 25,
          fats: 6,
          category: "veg",
          regions: ["Bangladesh"]
        }
      ],
      snacks: [
        {
          id: "bd-s-1",
          name: "Jhalmuri",
          serving: "1 bowl",
          calories: 120,
          protein: 3,
          carbs: 22,
          fats: 3,
          category: "carb",
          regions: ["Bangladesh"]
        },
        {
          id: "bd-s-2",
          name: "Local Yogurt",
          serving: "1 bowl",
          calories: 100,
          protein: 8,
          carbs: 12,
          fats: 3,
          category: "dairy",
          regions: ["Bangladesh"]
        }
      ],
      dinner: [
        {
          id: "bd-d-1",
          name: "Small Fish Curry",
          serving: "1 bowl",
          calories: 220,
          protein: 20,
          carbs: 8,
          fats: 12,
          category: "protein",
          regions: ["Bangladesh"]
        },
        {
          id: "bd-d-2",
          name: "Steamed Rice",
          serving: "1 bowl",
          calories: 206,
          protein: 4,
          carbs: 45,
          fats: 0,
          category: "carb",
          regions: ["Bangladesh"]
        },
        {
          id: "bd-d-3",
          name: "Bottle Gourd Curry",
          serving: "1 bowl",
          calories: 60,
          protein: 2,
          carbs: 12,
          fats: 2,
          category: "veg",
          regions: ["Bangladesh"]
        }
      ]
    }
  },
  "India": {
    [DietPreference.STANDARD]: {
      breakfast: [
        {
          id: "in-bf-1",
          name: "Besan Chilla",
          serving: "2 pieces",
          calories: 200,
          protein: 10,
          carbs: 25,
          fats: 8,
          category: "protein",
          regions: ["India"]
        },
        {
          id: "in-bf-2",
          name: "Curd",
          serving: "1 bowl",
          calories: 100,
          protein: 8,
          carbs: 6,
          fats: 5,
          category: "dairy",
          regions: ["India"]
        },
        {
          id: "in-bf-3",
          name: "Banana",
          serving: "1 medium",
          calories: 105,
          protein: 1,
          carbs: 27,
          fats: 0,
          category: "fruit",
          regions: ["India"]
        }
      ],
      lunch: [
        {
          id: "in-l-1",
          name: "Dal",
          serving: "1 bowl",
          calories: 180,
          protein: 10,
          carbs: 25,
          fats: 6,
          category: "protein",
          regions: ["India"]
        },
        {
          id: "in-l-2",
          name: "Chapati",
          serving: "3 rotis",
          calories: 240,
          protein: 6,
          carbs: 48,
          fats: 6,
          category: "carb",
          regions: ["India"]
        },
        {
          id: "in-l-3",
          name: "Mixed Vegetables",
          serving: "1 bowl",
          calories: 120,
          protein: 4,
          carbs: 20,
          fats: 4,
          category: "veg",
          regions: ["India"]
        }
      ],
      snacks: [
        {
          id: "in-s-1",
          name: "Sprouts",
          serving: "1 bowl",
          calories: 100,
          protein: 6,
          carbs: 15,
          fats: 2,
          category: "protein",
          regions: ["India"]
        },
        {
          id: "in-s-2",
          name: "Buttermilk",
          serving: "1 glass",
          calories: 40,
          protein: 2,
          carbs: 6,
          fats: 1,
          category: "dairy",
          regions: ["India"]
        }
      ],
      dinner: [
        {
          id: "in-d-1",
          name: "Chicken Curry",
          serving: "1 bowl",
          calories: 280,
          protein: 25,
          carbs: 10,
          fats: 18,
          category: "protein",
          regions: ["India"]
        },
        {
          id: "in-d-2",
          name: "Rice",
          serving: "1 bowl",
          calories: 216,
          protein: 5,
          carbs: 45,
          fats: 2,
          category: "carb",
          regions: ["India"]
        },
        {
          id: "in-d-3",
          name: "Spinach Curry",
          serving: "1 bowl",
          calories: 80,
          protein: 4,
          carbs: 12,
          fats: 2,
          category: "veg",
          regions: ["India"]
        }
      ]
    }
  },
  "Pakistan": {
    [DietPreference.STANDARD]: {
      breakfast: [
        {
          id: "pk-bf-1",
          name: "Aloo Paratha",
          serving: "1 medium",
          calories: 280,
          protein: 6,
          carbs: 38,
          fats: 12,
          category: "carb",
          regions: ["Pakistan"]
        },
        {
          id: "pk-bf-2",
          name: "Egg Bhurji",
          serving: "2 eggs",
          calories: 180,
          protein: 14,
          carbs: 3,
          fats: 13,
          category: "protein",
          regions: ["Pakistan"]
        },
        {
          id: "pk-bf-3",
          name: "Lassi (Lassi)",
          serving: "1 glass",
          calories: 100,
          protein: 4,
          carbs: 16,
          fats: 3,
          category: "dairy",
          regions: ["Pakistan"]
        }
      ],
      lunch: [
        {
          id: "pk-l-1",
          name: "Chicken Karahi",
          serving: "1 bowl",
          calories: 320,
          protein: 28,
          carbs: 10,
          fats: 20,
          category: "protein",
          regions: ["Pakistan"]
        },
        {
          id: "pk-l-2",
          name: "Chapati",
          serving: "3 rotis",
          calories: 240,
          protein: 6,
          carbs: 48,
          fats: 6,
          category: "carb",
          regions: ["Pakistan"]
        },
        {
          id: "pk-l-3",
          name: "Mixed Sabzi",
          serving: "1 bowl",
          calories: 100,
          protein: 3,
          carbs: 18,
          fats: 3,
          category: "veg",
          regions: ["Pakistan"]
        }
      ],
      snacks: [
        {
          id: "pk-s-1",
          name: "Fruit Chaat",
          serving: "1 bowl",
          calories: 120,
          protein: 1,
          carbs: 28,
          fats: 1,
          category: "fruit",
          regions: ["Pakistan"]
        },
        {
          id: "pk-s-2",
          name: "Tea",
          serving: "1 cup",
          calories: 30,
          protein: 1,
          carbs: 3,
          fats: 2,
          category: "dairy",
          regions: ["Pakistan"]
        }
      ],
      dinner: [
        {
          id: "pk-d-1",
          name: "Mutton Pulao",
          serving: "1 plate",
          calories: 450,
          protein: 25,
          carbs: 45,
          fats: 18,
          category: "protein",
          regions: ["Pakistan"]
        },
        {
          id: "pk-d-2",
          name: "Raita",
          serving: "1 bowl",
          calories: 60,
          protein: 4,
          carbs: 8,
          fats: 2,
          category: "dairy",
          regions: ["Pakistan"]
        },
        {
          id: "pk-d-3",
          name: "Kachumber Salad",
          serving: "1 bowl",
          calories: 40,
          protein: 1,
          carbs: 8,
          fats: 2,
          category: "veg",
          regions: ["Pakistan"]
        }
      ]
    }
  },
  "China": {
    [DietPreference.STANDARD]: {
      breakfast: [
        {
          id: "cn-bf-1",
          name: "Rice Congee",
          serving: "1 bowl",
          calories: 150,
          protein: 6,
          carbs: 28,
          fats: 3,
          category: "carb",
          regions: ["China"]
        },
        {
          id: "cn-bf-2",
          name: "Steamed Buns",
          serving: "2 pieces",
          calories: 200,
          protein: 8,
          carbs: 35,
          fats: 6,
          category: "carb",
          regions: ["China"]
        },
        {
          id: "cn-bf-3",
          name: "Green Tea",
          serving: "1 cup",
          calories: 2,
          protein: 0,
          carbs: 0,
          fats: 0,
          category: "dairy",
          regions: ["China"]
        }
      ],
      lunch: [
        {
          id: "cn-l-1",
          name: "Chicken Stir Fry",
          serving: "1 bowl",
          calories: 350,
          protein: 30,
          carbs: 25,
          fats: 18,
          category: "protein",
          regions: ["China"]
        },
        {
          id: "cn-l-2",
          name: "Steamed Rice",
          serving: "1 bowl",
          calories: 206,
          protein: 4,
          carbs: 45,
          fats: 0,
          category: "carb",
          regions: ["China"]
        },
        {
          id: "cn-l-3",
          name: "Bok Choy",
          serving: "1 cup",
          calories: 50,
          protein: 3,
          carbs: 8,
          fats: 2,
          category: "veg",
          regions: ["China"]
        }
      ],
      snacks: [
        {
          id: "cn-s-1",
          name: "Dumplings",
          serving: "4 pieces",
          calories: 200,
          protein: 8,
          carbs: 30,
          fats: 6,
          category: "protein",
          regions: ["China"]
        },
        {
          id: "cn-s-2",
          name: "Apple",
          serving: "1 medium",
          calories: 95,
          protein: 0,
          carbs: 25,
          fats: 0,
          category: "fruit",
          regions: ["China"]
        }
      ],
      dinner: [
        {
          id: "cn-d-1",
          name: "Fish with Ginger",
          serving: "150g",
          calories: 280,
          protein: 25,
          carbs: 20,
          fats: 12,
          category: "protein",
          regions: ["China"]
        },
        {
          id: "cn-d-2",
          name: "Noodles",
          serving: "1 bowl",
          calories: 220,
          protein: 6,
          carbs: 40,
          fats: 4,
          category: "carb",
          regions: ["China"]
        },
        {
          id: "cn-d-3",
          name: "Mixed Vegetables",
          serving: "1 cup",
          calories: 80,
          protein: 4,
          carbs: 12,
          fats: 4,
          category: "veg",
          regions: ["China"]
        }
      ]
    }
  },
  "Sri Lanka": {
    [DietPreference.STANDARD]: {
      breakfast: [
        {
          id: "lk-bf-1",
          name: "String Hoppers",
          serving: "3 pieces",
          calories: 180,
          protein: 3,
          carbs: 35,
          fats: 4,
          category: "carb",
          regions: ["Sri Lanka"]
        },
        {
          id: "lk-bf-2",
          name: "Coconut Sambol",
          serving: "2 tbsp",
          calories: 80,
          protein: 2,
          carbs: 4,
          fats: 7,
          category: "fat",
          regions: ["Sri Lanka"]
        },
        {
          id: "lk-bf-3",
          name: "Plain Tea",
          serving: "1 cup",
          calories: 2,
          protein: 0,
          carbs: 0,
          fats: 0,
          category: "dairy",
          regions: ["Sri Lanka"]
        }
      ],
      lunch: [
        {
          id: "lk-l-1",
          name: "Rice and Curry",
          serving: "1 plate",
          calories: 450,
          protein: 20,
          carbs: 60,
          fats: 15,
          category: "carb",
          regions: ["Sri Lanka"]
        },
        {
          id: "lk-l-2",
          name: "Chicken Curry",
          serving: "1 bowl",
          calories: 280,
          protein: 25,
          carbs: 12,
          fats: 16,
          category: "protein",
          regions: ["Sri Lanka"]
        },
        {
          id: "lk-l-3",
          name: "Green Leaves Sambol",
          serving: "1 bowl",
          calories: 60,
          protein: 3,
          carbs: 8,
          fats: 3,
          category: "veg",
          regions: ["Sri Lanka"]
        }
      ],
      snacks: [
        {
          id: "lk-s-1",
          name: "Plantain Chips",
          serving: "30g",
          calories: 160,
          protein: 1,
          carbs: 18,
          fats: 10,
          category: "carb",
          regions: ["Sri Lanka"]
        },
        {
          id: "lk-s-2",
          name: "King Coconut Water",
          serving: "1 coconut",
          calories: 40,
          protein: 1,
          carbs: 9,
          fats: 0,
          category: "fruit",
          regions: ["Sri Lanka"]
        }
      ],
      dinner: [
        {
          id: "lk-d-1",
          name: "Fish Curry",
          serving: "150g",
          calories: 260,
          protein: 22,
          carbs: 8,
          fats: 16,
          category: "protein",
          regions: ["Sri Lanka"]
        },
        {
          id: "lk-d-2",
          name: "Red Rice",
          serving: "1 bowl",
          calories: 216,
          protein: 5,
          carbs: 45,
          fats: 1,
          category: "carb",
          regions: ["Sri Lanka"]
        },
        {
          id: "lk-d-3",
          name: "Mallung",
          serving: "1 bowl",
          calories: 70,
          protein: 3,
          carbs: 10,
          fats: 3,
          category: "veg",
          regions: ["Sri Lanka"]
        }
      ]
    }
  },
  "Germany": {
    [DietPreference.STANDARD]: {
      breakfast: [
        {
          id: "de-bf-1",
          name: "Bread Rolls",
          serving: "2 pieces",
          calories: 220,
          protein: 8,
          carbs: 40,
          fats: 4,
          category: "carb",
          regions: ["Germany"]
        },
        {
          id: "de-bf-2",
          name: "Cheese",
          serving: "50g",
          calories: 160,
          protein: 10,
          carbs: 1,
          fats: 13,
          category: "dairy",
          regions: ["Germany"]
        },
        {
          id: "de-bf-3",
          name: "Coffee",
          serving: "1 cup",
          calories: 5,
          protein: 0,
          carbs: 1,
          fats: 0,
          category: "dairy",
          regions: ["Germany"]
        }
      ],
      lunch: [
        {
          id: "de-l-1",
          name: "Pork Cutlet",
          serving: "1 piece",
          calories: 350,
          protein: 28,
          carbs: 20,
          fats: 18,
          category: "protein",
          regions: ["Germany"]
        },
        {
          id: "de-l-2",
          name: "Potatoes",
          serving: "2 medium boiled",
          calories: 160,
          protein: 4,
          carbs: 35,
          fats: 0,
          category: "carb",
          regions: ["Germany"]
        },
        {
          id: "de-l-3",
          name: "Mixed Salad",
          serving: "1 bowl",
          calories: 40,
          protein: 2,
          carbs: 6,
          fats: 2,
          category: "veg",
          regions: ["Germany"]
        }
      ],
      snacks: [
        {
          id: "de-s-1",
          name: "Pretzel",
          serving: "1 medium",
          calories: 250,
          protein: 7,
          carbs: 50,
          fats: 3,
          category: "carb",
          regions: ["Germany"]
        },
        {
          id: "de-s-2",
          name: "Apple",
          serving: "1 medium",
          calories: 95,
          protein: 0,
          carbs: 25,
          fats: 0,
          category: "fruit",
          regions: ["Germany"]
        }
      ],
      dinner: [
        {
          id: "de-d-1",
          name: "Sausages",
          serving: "2 sausages",
          calories: 320,
          protein: 18,
          carbs: 2,
          fats: 26,
          category: "protein",
          regions: ["Germany"]
        },
        {
          id: "de-d-2",
          name: "Sauerkraut",
          serving: "1 bowl",
          calories: 80,
          protein: 3,
          carbs: 15,
          fats: 2,
          category: "veg",
          regions: ["Germany"]
        },
        {
          id: "de-d-3",
          name: "Bread",
          serving: "2 slices",
          calories: 140,
          protein: 6,
          carbs: 24,
          fats: 4,
          category: "carb",
          regions: ["Germany"]
        }
      ]
    }
  }
};

// Default plan for countries not in our database
const defaultDietPlan: DietPlan = {
  breakfast: [
    {
      id: "default-bf-1",
      name: "Oatmeal",
      serving: "1 cup cooked",
      calories: 150,
      protein: 5,
      carbs: 27,
      fats: 3,
      category: "carb",
      regions: ["Default"]
    },
    {
      id: "default-bf-2",
      name: "Eggs",
      serving: "2 scrambled",
      calories: 180,
      protein: 12,
      carbs: 2,
      fats: 14,
      category: "protein",
      regions: ["Default"]
    },
    {
      id: "default-bf-3",
      name: "Banana",
      serving: "1 medium",
      calories: 105,
      protein: 1,
      carbs: 27,
      fats: 0,
      category: "fruit",
      regions: ["Default"]
    }
  ],
  lunch: [
    {
      id: "default-l-1",
      name: "Chicken Breast",
      serving: "150g grilled",
      calories: 240,
      protein: 35,
      carbs: 0,
      fats: 10,
      category: "protein",
      regions: ["Default"]
    },
    {
      id: "default-l-2",
      name: "Rice",
      serving: "1 cup cooked",
      calories: 206,
      protein: 4,
      carbs: 45,
      fats: 0,
      category: "carb",
      regions: ["Default"]
    },
    {
      id: "default-l-3",
      name: "Mixed Vegetables",
      serving: "1 cup",
      calories: 50,
      protein: 2,
      carbs: 10,
      fats: 0,
      category: "veg",
      regions: ["Default"]
    }
  ],
  snacks: [
    {
      id: "default-s-1",
      name: "Apple",
      serving: "1 medium",
      calories: 95,
      protein: 0,
      carbs: 25,
      fats: 0,
      category: "fruit",
      regions: ["Default"]
    },
    {
      id: "default-s-2",
      name: "Nuts",
      serving: "30g mixed",
      calories: 170,
      protein: 6,
      carbs: 6,
      fats: 15,
      category: "fat",
      regions: ["Default"]
    }
  ],
  dinner: [
    {
      id: "default-d-1",
      name: "Fish",
      serving: "150g baked",
      calories: 200,
      protein: 30,
      carbs: 0,
      fats: 8,
      category: "protein",
      regions: ["Default"]
    },
    {
      id: "default-d-2",
      name: "Sweet Potato",
      serving: "1 medium baked",
      calories: 103,
      protein: 2,
      carbs: 24,
      fats: 0,
      category: "carb",
      regions: ["Default"]
    },
    {
      id: "default-d-3",
      name: "Green Salad",
      serving: "2 cups",
      calories: 30,
      protein: 2,
      carbs: 6,
      fats: 0,
      category: "veg",
      regions: ["Default"]
    }
  ]
};

export const getHealthSummary = async (profile: UserProfile, metrics: HealthMetrics) => {
  const bmiStatus = metrics.bmi < 18.5 ? "underweight" : metrics.bmi < 25 ? "healthy weight" : metrics.bmi < 30 ? "overweight" : "obese";

  return `1. ${profile.name}, your BMI indicates ${bmiStatus}. Focus on consistent daily calories of ${metrics.dailyCalories}.\n2. Prioritize ${metrics.macros.protein}g of protein daily to support your ${profile.goal} goal.\n3. Stay hydrated with at least 3 liters of water daily and maintain regular meal timing.`;
};

export const generateDietPlan = async (profile: UserProfile, metrics: HealthMetrics): Promise<DietPlan | null> => {
  try {
    // Get country-specific plan, fallback to default
    const countryPlans = preCodedDietPlans[profile.country];
    if (!countryPlans) {
      console.log(`Country ${profile.country} not found, using default plan`);
      return defaultDietPlan;
    }

    // Get preference-specific plan, fallback to standard
    const preferencePlan = countryPlans[profile.dietPreference] || countryPlans[DietPreference.STANDARD];

    if (!preferencePlan) {
      console.log(`Preference ${profile.dietPreference} not found for ${profile.country}, using default plan`);
      return defaultDietPlan;
    }

    // Adjust portions to match target calories
    const targetCalories = metrics.dailyCalories;
    const currentCalories = calculatePlanCalories(preferencePlan);
    const adjustmentFactor = targetCalories / currentCalories;

    if (adjustmentFactor < 0.8 || adjustmentFactor > 1.3) {
      // If adjustment is too extreme, return scaled version
      return scaleDietPlan(preferencePlan, adjustmentFactor);
    }

    return preferencePlan;
  } catch (error) {
    console.error("Error generating diet plan:", error);
    return defaultDietPlan;
  }
};

export const getFoodSwaps = (category: FoodCategory): FoodItem[] => {
  return FOOD_SWAPS[category] || [];
};

export const getAlternativePlan = (country: string): DietPlan | null => {
  const alternativeKey = `${country}_Affordable`;
  return ALTERNATIVE_DIET_PLANS[alternativeKey] || null;
};

export const getBangladeshDietPlan = (planType: string): DietPlan | null => {
  return BANGLADESH_DIET_PLANS[planType] || null;
};

export const getAvailableBangladeshPlans = (): string[] => {
  return Object.keys(BANGLADESH_DIET_PLANS);
};

export const swapFoodItem = (currentItem: FoodItem, swapCategory: FoodCategory): FoodItem => {
  const swapOptions = getFoodSwaps(swapCategory);
  if (swapOptions.length === 0) return currentItem;

  // Find swap with similar calories (within +/- 50)
  const similarCalorieSwap = swapOptions.find(swap =>
    Math.abs(swap.calories - currentItem.calories) <= 50
  );

  return similarCalorieSwap || swapOptions[0];
};

// Enhanced calorie matching for swaps
export const findBestSwap = (currentItem: FoodItem, targetDailyCalories: number, swapCategory: FoodCategory): FoodItem => {
  const swapOptions = getFoodSwaps(swapCategory);
  if (swapOptions.length === 0) return currentItem;

  // Calculate what percentage of daily target this item represents
  const itemCaloriePercentage = (currentItem.calories / targetDailyCalories) * 100;

  // Find swap that matches the calorie percentage closely
  const targetCaloriesForSwap = Math.round(targetDailyCalories * (itemCaloriePercentage / 100));

  const bestMatch = swapOptions.reduce((best, swap) => {
    const currentDiff = Math.abs(swap.calories - targetCaloriesForSwap);
    const bestDiff = Math.abs(best.calories - targetCaloriesForSwap);
    return currentDiff < bestDiff ? swap : best;
  });

  return bestMatch || swapOptions[0];
};

function calculatePlanCalories(plan: DietPlan): number {
  const allMeals = [...plan.breakfast, ...plan.lunch, ...plan.snacks, ...plan.dinner];
  return allMeals.reduce((total, item) => total + item.calories, 0);
}

function scaleDietPlan(plan: DietPlan, factor: number): DietPlan {
  const scaleFoodItems = (items: FoodItem[]): FoodItem[] => {
    return items.map(item => ({
      ...item,
      calories: Math.round(item.calories * factor),
      protein: Math.round(item.protein * factor * 10) / 10,
      carbs: Math.round(item.carbs * factor * 10) / 10,
      fats: Math.round(item.fats * factor * 10) / 10,
      serving: `${Math.round(parseFloat(item.serving.split(' ')[0]) * factor)} ${item.serving.split(' ').slice(1).join(' ')}`
    }));
  };

  return {
    breakfast: scaleFoodItems(plan.breakfast),
    lunch: scaleFoodItems(plan.lunch),
    snacks: scaleFoodItems(plan.snacks),
    dinner: scaleFoodItems(plan.dinner)
  };
}