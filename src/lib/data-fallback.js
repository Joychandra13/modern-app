// Fallback data operations for production environments where file system is read-only
import fs from 'fs/promises';
import path from 'path';

// Default items data
const defaultItems = [
  {
    id: 1,
    name: "Algebra Fundamentals",
    description: "Master the basics of algebra including linear equations, polynomials, and factoring. Perfect for students beginning their algebra journey.",
    detailedSolution: "Algebra is the branch of mathematics that uses letters and symbols to represent numbers and quantities in formulas and equations. In this comprehensive course, you'll learn:\n\n**Linear Equations**: Solve equations like 2x + 5 = 13\nStep 1: Subtract 5 from both sides: 2x = 8\nStep 2: Divide by 2: x = 4\n\n**Polynomial Operations**: Learn to add, subtract, multiply polynomials\nExample: (x + 3)(x - 2) = x² - 2x + 3x - 6 = x² + x - 6\n\n**Factoring**: Break down expressions into simpler components\nExample: x² + 5x + 6 = (x + 2)(x + 3)\n\n**Quadratic Formula**: For equations ax² + bx + c = 0\nx = (-b ± √(b² - 4ac)) / 2a",
    category: "Algebra",
    difficulty: "Beginner",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop",
    createdAt: "2024-01-01T00:00:00.000Z"
  },
  {
    id: 2,
    name: "Calculus Mastery",
    description: "Comprehensive calculus course covering derivatives, integrals, and applications. Includes both differential and integral calculus concepts.",
    detailedSolution: "Calculus is the mathematical study of continuous change. This advanced course covers:\n\n**Derivatives**: Rate of change and slopes of curves\nPower Rule: d/dx(xⁿ) = nxⁿ⁻¹\nExample: d/dx(x³) = 3x²\n\n**Chain Rule**: For composite functions\nd/dx[f(g(x))] = f'(g(x)) × g'(x)\nExample: d/dx(sin(x²)) = cos(x²) × 2x\n\n**Integration**: Finding areas under curves\n∫xⁿ dx = xⁿ⁺¹/(n+1) + C\nExample: ∫x² dx = x³/3 + C\n\n**Fundamental Theorem**: Links derivatives and integrals\n∫ₐᵇ f'(x) dx = f(b) - f(a)",
    category: "Calculus",
    difficulty: "Advanced",
    image: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=400&h=300&fit=crop",
    createdAt: "2024-01-02T00:00:00.000Z"
  },
  {
    id: 3,
    name: "Geometry Essentials",
    description: "Explore shapes, angles, and spatial relationships. Learn about triangles, circles, and geometric proofs with interactive examples.",
    detailedSolution: "Geometry studies shapes, sizes, and properties of space. Key concepts include:\n\n**Pythagorean Theorem**: For right triangles\na² + b² = c²\nExample: If a = 3 and b = 4, then c = √(9 + 16) = √25 = 5\n\n**Circle Properties**:\nArea = πr²\nCircumference = 2πr\nExample: Circle with radius 5 has area = π(5)² = 25π\n\n**Triangle Area Formulas**:\nArea = ½ × base × height\nHeron's Formula: A = √[s(s-a)(s-b)(s-c)] where s = (a+b+c)/2\n\n**Angle Relationships**:\nVertical angles are equal\nComplementary angles sum to 90°\nSupplementary angles sum to 180°",
    category: "Geometry",
    difficulty: "Intermediate",
    image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&h=300&fit=crop",
    createdAt: "2024-01-03T00:00:00.000Z"
  },
  {
    id: 4,
    name: "Statistics & Probability",
    description: "Learn data analysis, probability distributions, and statistical inference. Essential for data science and research applications.",
    detailedSolution: "Statistics and probability help us understand and analyze data:\n\n**Measures of Central Tendency**:\nMean = (sum of all values) / (number of values)\nMedian = middle value when data is ordered\nMode = most frequently occurring value\n\n**Probability Rules**:\nP(A or B) = P(A) + P(B) - P(A and B)\nP(A and B) = P(A) × P(B|A)\nExample: Coin flip probability = 1/2 = 0.5\n\n**Normal Distribution**:\n68% of data within 1 standard deviation\n95% of data within 2 standard deviations\nZ-score = (x - μ) / σ\n\n**Hypothesis Testing**:\nNull hypothesis (H₀) vs Alternative hypothesis (H₁)\np-value < α → reject H₀",
    category: "Statistics",
    difficulty: "Intermediate",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
    createdAt: "2024-01-04T00:00:00.000Z"
  },
  {
    id: 5,
    name: "Linear Algebra",
    description: "Vector spaces, matrices, and linear transformations. Foundation for machine learning and computer graphics applications.",
    detailedSolution: "Linear algebra deals with vectors, matrices, and linear transformations:\n\n**Matrix Operations**:\nMatrix Addition: [a b] + [e f] = [a+e b+f]\n                [c d]   [g h]   [c+g d+h]\n\nMatrix Multiplication: (AB)ᵢⱼ = Σₖ AᵢₖBₖⱼ\n\n**Determinant** (2×2 matrix):\ndet([a b]) = ad - bc\n   ([c d])\n\n**Eigenvalues and Eigenvectors**:\nAv = λv (where λ is eigenvalue, v is eigenvector)\nCharacteristic equation: det(A - λI) = 0\n\n**Vector Operations**:\nDot product: a·b = |a||b|cos(θ)\nCross product: a×b = |a||b|sin(θ)n̂",
    category: "Algebra",
    difficulty: "Advanced",
    image: "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?w=400&h=300&fit=crop",
    createdAt: "2024-01-05T00:00:00.000Z"
  },
  {
    id: 6,
    name: "Trigonometry Basics",
    description: "Sine, cosine, tangent and their applications. Learn about periodic functions and solving triangles in real-world contexts.",
    detailedSolution: "Trigonometry studies relationships between angles and sides in triangles:\n\n**Basic Trigonometric Ratios**:\nsin(θ) = opposite / hypotenuse\ncos(θ) = adjacent / hypotenuse\ntan(θ) = opposite / adjacent\n\n**Pythagorean Identity**:\nsin²(θ) + cos²(θ) = 1\n\n**Unit Circle Values**:\nsin(30°) = 1/2, cos(30°) = √3/2\nsin(45°) = √2/2, cos(45°) = √2/2\nsin(60°) = √3/2, cos(60°) = 1/2\n\n**Law of Sines**: a/sin(A) = b/sin(B) = c/sin(C)\n**Law of Cosines**: c² = a² + b² - 2ab·cos(C)\n\n**Periodic Properties**:\nsin(x + 2π) = sin(x)\ncos(x + 2π) = cos(x)",
    category: "Trigonometry",
    difficulty: "Intermediate",
    image: "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?w=400&h=300&fit=crop",
    createdAt: "2024-01-06T00:00:00.000Z"
  },
  {
    id: 7,
    name: "Number Theory",
    description: "Prime numbers, divisibility, and modular arithmetic. Explore the fascinating properties of integers and their relationships.",
    detailedSolution: "Number theory explores properties and relationships of integers:\n\n**Prime Numbers**:\nA prime number has exactly two factors: 1 and itself\nExamples: 2, 3, 5, 7, 11, 13, 17, 19, 23...\nFundamental Theorem: Every integer > 1 has unique prime factorization\n\n**Greatest Common Divisor (GCD)**:\nEuclidean Algorithm: gcd(a,b) = gcd(b, a mod b)\nExample: gcd(48, 18) = gcd(18, 12) = gcd(12, 6) = gcd(6, 0) = 6\n\n**Modular Arithmetic**:\na ≡ b (mod n) means n divides (a - b)\nExample: 17 ≡ 2 (mod 5) because 17 - 2 = 15 = 3 × 5\n\n**Fermat's Little Theorem**:\nIf p is prime and gcd(a,p) = 1, then aᵖ⁻¹ ≡ 1 (mod p)",
    category: "Number Theory",
    difficulty: "Advanced",
    image: "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?w=400&h=300&fit=crop",
    createdAt: "2024-01-07T00:00:00.000Z"
  },
  {
    id: 8,
    name: "Mathematical Logic",
    description: "Propositional logic, predicate logic, and proof techniques. Build strong reasoning skills for advanced mathematics.",
    detailedSolution: "Mathematical logic provides the foundation for rigorous mathematical reasoning:\n\n**Propositional Logic**:\nConjunction (AND): P ∧ Q\nDisjunction (OR): P ∨ Q\nNegation (NOT): ¬P\nImplication: P → Q (if P then Q)\nBiconditional: P ↔ Q (P if and only if Q)\n\n**Truth Tables**:\nP | Q | P∧Q | P∨Q | P→Q\nT | T |  T  |  T  |  T\nT | F |  F  |  T  |  F\nF | T |  F  |  T  |  T\nF | F |  F  |  F  |  T\n\n**Proof Techniques**:\nDirect Proof: Assume P, show Q\nProof by Contradiction: Assume ¬Q, derive contradiction\nProof by Induction: Base case + inductive step\n\n**Quantifiers**:\n∀x P(x): \"for all x, P(x) is true\"\n∃x P(x): \"there exists x such that P(x) is true\"",
    category: "Logic",
    difficulty: "Advanced",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop",
    createdAt: "2024-01-08T00:00:00.000Z"
  }
];

// In-memory storage for the session (will reset on each deployment)
let memoryStore = [...defaultItems];

const DATA_FILE = path.join(process.cwd(), 'data', 'items.json');

// Try to read from file system, fallback to memory
const readItems = async () => {
  try {
    // Try to read from file system first (works in development)
    const data = await fs.readFile(DATA_FILE, 'utf8');
    const items = JSON.parse(data);
    memoryStore = items; // Sync memory store
    console.log('Read from file system:', items.length, 'items'); // Debug log
    return items;
  } catch (error) {
    // Fallback to memory store (production)
    console.log('File system read failed, using memory store with', memoryStore.length, 'items'); // Debug log
    return memoryStore;
  }
};

// Try to write to file system, fallback to memory only
const writeItems = async (items) => {
  // Always update memory store
  memoryStore = items;
  console.log('Updated memory store with', items.length, 'items'); // Debug log
  
  try {
    // Try to write to file system (works in development)
    const dataDir = path.join(process.cwd(), 'data');
    await fs.mkdir(dataDir, { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify(items, null, 2));
    console.log('Successfully wrote to file system'); // Debug log
  } catch (error) {
    // In production, we can't write to file system, so just use memory
    console.log('File system write failed, using memory store only');
  }
};

const getNextId = (items) => {
  return items.length > 0 ? Math.max(...items.map(item => item.id)) + 1 : 1;
};

export const fallbackOperations = {
  // Get all items
  async getItems() {
    return await readItems();
  },

  // Get single item by ID
  async getItem(id) {
    const items = await readItems();
    return items.find(item => item.id === parseInt(id));
  },

  // Create new item
  async createItem(itemData) {
    const items = await readItems();
    const newId = getNextId(items);
    
    const newItem = {
      id: newId,
      ...itemData,
      createdAt: new Date().toISOString()
    };
    
    items.push(newItem);
    await writeItems(items);
    return newItem;
  },

  // Update item
  async updateItem(id, itemData) {
    const items = await readItems();
    const index = items.findIndex(item => item.id === parseInt(id));
    
    if (index === -1) {
      return null;
    }
    
    items[index] = {
      ...items[index],
      ...itemData,
      updatedAt: new Date().toISOString()
    };
    
    await writeItems(items);
    return items[index];
  },

  // Delete item
  async deleteItem(id) {
    const items = await readItems();
    const index = items.findIndex(item => item.id === parseInt(id));
    
    if (index === -1) {
      return false;
    }
    
    items.splice(index, 1);
    await writeItems(items);
    return true;
  }
};