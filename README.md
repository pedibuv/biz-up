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
- Floating social media sidebar (Telegram, WhatsApp, Viber)
- Mobile-responsive bottom social bar
- Smooth scroll animations

## Tech Stack

- HTML5 (zero inline styles - full separation of concerns)
- CSS3 with modular architecture (15 separate files)
- Semantic CSS variables for all colors, gradients, shadows, and spacing
- Font Awesome 6 Free (70+ icons)
- Vanilla JavaScript
- Swiper.js 11 (carousel/slider library)

## Project Structure

```
biz-up/
├── index.html              # Main landing page (zero inline styles)
├── css/
│   ├── style.css           # Main CSS import file
│   ├── base.css            # Variables, reset, typography, utilities
│   ├── components.css      # Buttons, cards, badges, forms, floating social
│   ├── fontawesome-custom.css  # Font Awesome icon customizations
│   ├── navigation.css      # Navigation styles
│   ├── hero.css            # Hero section
│   ├── features.css        # Features section
│   ├── partners.css        # Partners section
│   ├── calculator.css      # Calculator and JDG comparison
│   ├── pricing.css         # Pricing section
│   ├── comparison.css      # Comparison tables
│   ├── blog.css            # Blog section
│   ├── testimonials.css    # Testimonials section
│   ├── faq.css             # FAQ section
│   ├── contact.css         # Contact form section
│   ├── footer.css          # Footer section
│   └── responsive.css      # Media queries
├── js/
│   ├── script.js           # Calculator logic and interactions
│   └── swiper-init.js      # Swiper carousel configurations
└── img/                    # Image assets folder
    ├── telegram.svg        # Custom white Telegram icon
    └── .gitignore          # Git ignore for images
```

## CSS Architecture

### Modular Structure
The CSS is split into 16 separate files for maintainability:
- **base.css**: 56 semantic CSS variables (colors, gradients, shadows, borders, overlays)
- **components.css**: Reusable components (buttons, cards, forms, floating social sidebar)
- **fontawesome-custom.css**: Font Awesome icon customizations
- **Section files**: Each page section has its own CSS file
- **responsive.css**: All media queries centralized

### Design System
- **Zero inline styles** - complete separation of concerns
- **Semantic CSS variables** for all design tokens:
  - Colors: `--color-blue-500`, `--color-telegram`, etc.
  - Gradients: `--gradient-primary`, `--gradient-telegram`, etc.
  - Shadows: `--shadow-primary`, `--shadow-medium`, etc.
  - Overlays: `--overlay-white-*`, `--overlay-black-*`
  - Borders: `--border-white-*`, `--border-input-*`
- **BEM methodology** for class naming
- **Mobile-first responsive design**

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
- Telegram: @we_expert_bot
- WhatsApp: +48 718 808 505
- Viber: +48 718 808 505
