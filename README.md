# Revenue Ledger — Revenue Aggregator MVP

A React application that aggregates sales data from three branch locations, merges duplicate products, calculates total revenue, and presents the data in a clean, searchable ledger-style interface.

## 🚀 Live Demo

**Vercel Deployment:**  
https://revenue-ledger-nine.vercel.app/

---

## 📌 Features

- Fetches sales data from three branch JSON files in parallel
- Aggregates duplicate products across all branches
- Automatically calculates total revenue per product
- Search products with case-insensitive filtering
- Live revenue total updates based on filtered results
- Products sorted alphabetically
- Responsive ledger-inspired UI
- Loading, empty-state, and error handling
- Comprehensive unit and integration tests

---

## 🛠️ Tech Stack

- React.js
- JavaScript (ES6+)
- CSS3
- Jest
- React Testing Library
- Vercel (Deployment)
- Git & GitHub

---

## 📂 Project Structure

```text
public/
  api/
    branch1.json
    branch2.json
    branch3.json

src/
  utils/
    aggregateProducts.js
    aggregateProducts.test.js
    formatNumber.js
    formatNumber.test.js

  App.js
  App.test.js
  App.css
  index.js
```

---

## ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/shiftgear1027-source/Revenue-Ledger.git
```

Navigate into the project:

```bash
cd Revenue-Ledger
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm start
```

Application runs at:

```
http://localhost:3000
```

---

## 🧪 Running Tests

Run all tests:

```bash
npm test
```

The project includes **19 tests across 3 test suites**, covering:

- Currency formatting
- Product aggregation logic
- Revenue calculation
- Product sorting
- Search functionality
- Loading state
- Error handling
- Empty state
- Integration testing

---

## ⚡ How It Works

On application startup:

- Fetches data from:
  - `public/api/branch1.json`
  - `public/api/branch2.json`
  - `public/api/branch3.json`
- Combines products with the same name
- Sums their revenue across all branches
- Sorts products alphabetically
- Displays the aggregated revenue table
- Updates totals dynamically while searching

---

## 🎨 Design

The application uses a **Ledger-inspired UI** featuring:

- Deep ink-green header
- Warm paper background
- Gold accents
- Monospace revenue values
- Receipt-style dashed separator
- Responsive layout for desktop and mobile

---

## 🚀 Deployment

This project is deployed on **Vercel**.

Live Application:

https://revenue-ledger-nine.vercel.app/

Every push to the **main** branch automatically triggers a new deployment via GitHub integration.

---

## 👨‍💻 Author

**Avinasha M**

GitHub:
https://github.com/shiftgear1027-source
