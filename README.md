# BIZ UP

Landing page for BIZ UP business incubator service in Poland. Helps freelancers and IT specialists work legally without registering JDG (sole proprietorship) or paying ZUS (Polish social security).

## Features

- Responsive navigation with social links and contact info
- Multi-language support (UA, EN, PL, RU)
- Hero section with call-to-action buttons
- Interactive feature cards slider (Swiper)
- Partners/payment systems carousel
- Fee calculator with different pricing plans
- Tax calculations (PIT) with/without VAT support
- Multiple currency support
- Comparison between BIZ UP, JDG, and B2B models
- Smooth scroll animations

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- Swiper.js 11 (carousel/slider library)

## Project Structure

```
biz-up/
├── index.html           # Main landing page
├── css/
│   └── style.css        # Styling and responsive design
├── js/
│   ├── script.js        # Calculator logic and interactions
│   └── swiper-init.js   # Swiper carousel configurations
└── img/                 # Image assets folder
    └── .gitignore       # Git ignore for images
```

## Usage

Open `index.html` in a web browser. No build process or dependencies required.

## Calculator Logic

The calculator supports:
- Three pricing plans: Basic (289 PLN), Standard (489 PLN), Pro (769 PLN)
- PIT tax rates: 9.6% (default) or 6% (with IP transfer)
- VAT calculations (23%)
- Multiple currencies via `Intl.NumberFormat`

## Contact

- Phone: +48 718 808 505
- WhatsApp: +48 718 808 505
