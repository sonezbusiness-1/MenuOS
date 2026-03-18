# 🍽️ Restaurant QR Ordering System — Standalone Demo

A fully static, client-side restaurant ordering system. No backend required.

## 📁 File Structure

```
/
├── index.html          ← Landing page (enter table number)
├── menu.html           ← Menu browsing + search
├── cart.html           ← Cart management
├── checkout.html       ← Order review + payment
├── success.html        ← Order confirmation
├── css/
│   └── style.css       ← All styles
├── js/
│   ├── menu.js         ← Menu logic + mock data
│   ├── cart.js         ← Cart management
│   └── checkout.js     ← Checkout + mock payment
└── public/
    └── images/
        └── food_category/
            ├── breakfast/  ← eggs_benedict.jpg, pancakes.jpg, etc.
            ├── lunch/      ← caesar_salad.jpg, club_sandwich.jpg, etc.
            ├── dinner/     ← grilled_salmon.jpg, chicken_parm.jpg, etc.
            ├── treats/     ← nachos.jpg, chicken_wings.jpg, etc.
            ├── dessert/    ← lava_cake.jpg, creme_brulee.jpg, etc.
            └── drinks/     ← fresh_juice.jpg, iced_coffee.jpg, etc.
```

## 🖼️ Adding Food Images

Place images in `public/images/food_category/{category}/{filename}.jpg`.

Expected filenames per category:

### Breakfast
- eggs_benedict.jpg, pancakes.jpg, full_english.jpg, avocado_toast.jpg

### Lunch
- caesar_salad.jpg, club_sandwich.jpg, pasta_primavera.jpg, beef_burger.jpg

### Dinner
- grilled_salmon.jpg, chicken_parm.jpg, lamb_chops.jpg, prawn_stir_fry.jpg

### Treats
- nachos.jpg, chicken_wings.jpg, garlic_bread.jpg

### Dessert
- lava_cake.jpg, creme_brulee.jpg, tiramisu.jpg, ice_cream_sundae.jpg

### Drinks
- fresh_juice.jpg, iced_coffee.jpg, soft_drink.jpg

> **Note:** Images are optional. If an image file is missing, a category emoji will be shown instead.

## 🚀 How to Run

### Locally
Open `index.html` in any browser. Or use a local server:
```bash
npx serve .
# or
python -m http.server 8000
```

### GitHub Pages
1. Push all files to a GitHub repo
2. Go to Settings → Pages → Deploy from branch → main
3. Visit `https://yourusername.github.io/your-repo/`

### QR Code Integration
To simulate QR codes per table, link to:
```
https://your-site.com/menu.html?table=5
```

## 🛒 Features

- **22 menu items** across 6 categories (Breakfast, Lunch, Dinner, Treats, Dessert, Drinks)
- **Items with sizes** (Beef Burger, Wings, Sundae, Drinks)
- **Search** across name and description
- **Cart persistence** via localStorage (survives page refresh)
- **Quantity controls** (increase, decrease, remove)
- **10% tax** calculation
- **Payment selection**: Pay Now (card gateway) or Pay After (cash)
- **8 payment methods**: Card, Binance, Amex, Apple Pay, QR, Bybit, Stripe, Google Pay
- **Mock order submission** with 2-second processing simulation
- **Printable receipt** on success page
- **Confetti + sound** on successful order

## 📦 localStorage Keys

| Key | Description |
|-----|-------------|
| `cart` | Current cart items array |
| `paymentMethod` | Last selected payment method |
| `orderHistory` | Array of all submitted orders |
