const fmt = (n, cur='PLN') => {
    if (isNaN(n)) return '—';
    try {
        return new Intl.NumberFormat('uk-UA', {style:'currency', currency: cur}).format(n);
    } catch(e) {
        return (Math.round(n*100)/100).toFixed(2) + ' ' + cur;
    }
};

function setAmount(v) {
    document.getElementById('amount').value = v;
    recalc();
}

function planCost() {
    const plan = document.getElementById('plan').value;
    let fee = 0;
    if(plan==='basic') { fee = 289; }
    if(plan==='standard') { fee = 489; }
    if(plan==='pro') { fee = 769; }
    return fee;
}

function jdgApplyPreset() {
    const p = document.getElementById('jdgPreset').value;
    const rate = document.getElementById('jdgRate');
    if(p==='scale') { rate.value = 12; }
    if(p==='linear') { rate.value = 19; }
    if(p==='ryczalt85') { rate.value = 8.5; }
    if(p==='ryczalt12') { rate.value = 12; }
    if(p==='ryczalt15') { rate.value = 15; }
}

function recalc() {
    const cur = document.getElementById('currency').value;
    const amount = Number(document.getElementById('amount').value || 0);
    const withVAT = document.getElementById('withVAT').checked;
    const transferIP = document.getElementById('transferIP').checked;
    const pitRate = transferIP ? 0.06 : 0.096;
    const fee = planCost();

    const vatAmt = withVAT ? amount * 0.23 : 0;
    const pitAmt = amount * pitRate;
    const net = Math.max(0, amount - pitAmt - fee);
    const clientTotal = withVAT ? amount + vatAmt : amount;

    document.getElementById('gross').innerText = fmt(amount, cur);
    document.getElementById('pitRate').innerText = (pitRate*100).toFixed(1).replace('.0','') + '%';
    document.getElementById('pitAmt').innerText = fmt(pitAmt, cur);
    document.getElementById('fee').innerText = fmt(fee, cur);
    document.getElementById('vatAmt').innerText = withVAT ? fmt(vatAmt, cur) : '—';
    document.getElementById('net').innerText = fmt(net, cur);
    document.getElementById('clientTotal').innerText = fmt(clientTotal, cur);

    // JDG calc
    const jdgRate = Number(document.getElementById('jdgRate').value || 0) / 100;
    const jdgZUS = Number(document.getElementById('jdgZUS').value || 0);
    const jdgPit = amount * jdgRate;
    const jdgNet = Math.max(0, amount - jdgPit - jdgZUS);
    document.getElementById('jdgNet').innerText = fmt(jdgNet, cur);
}

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        jdgApplyPreset();
        recalc();
    });
} else {
    jdgApplyPreset();
    recalc();
}

// Language switcher
let currentLang = 'ua';

document.querySelectorAll('.lang-option').forEach(option => {
    option.addEventListener('click', function() {
        document.querySelectorAll('.lang-option').forEach(opt => opt.classList.remove('active'));
        this.classList.add('active');
        currentLang = this.dataset.lang;
        document.getElementById('currentLang').textContent = this.dataset.lang.toUpperCase();
    });
});

// Final contact form
document.getElementById('finalContactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Дякуємо за заявку! Ми зв\'яжемось з вами найближчим часом для безкоштовної консультації.');
    this.reset();
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Compact navigation on scroll - STEPPED APPEARANCE WITH DELAY
let lastScroll = 0;
let mainNavAppearedAt = null;

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    const navTop = document.querySelector('.nav-top');
    const nav = document.querySelector('nav');
    const isMainNavVisible = !nav.classList.contains('nav-hidden');
    
    // Scrolling down
    if (currentScroll > lastScroll) {
        mainNavAppearedAt = null; // Reset when scrolling down
        
        if (currentScroll > 10) {
            navTop.classList.add('hidden');
        }
        if (currentScroll > 500) {
            nav.classList.add('nav-hidden');
        }
    } 
    // Scrolling up
    else if (currentScroll < lastScroll) {
        // Show main nav when scrolling up from >500
        if (currentScroll >= 500 && !isMainNavVisible) {
            nav.classList.remove('nav-hidden');
            mainNavAppearedAt = currentScroll; // Remember when main nav appeared
        }
        
        // If main nav just appeared, check if we scrolled 500px up from that point
        if (mainNavAppearedAt !== null && (mainNavAppearedAt - currentScroll >= 500)) {
            navTop.classList.remove('hidden');
        }
        
        // Below 500 - always show main nav
        if (currentScroll < 500) {
            nav.classList.remove('nav-hidden');
            
            // If we're very close to top, show top bar too
            if (currentScroll < 10) {
                navTop.classList.remove('hidden');
                mainNavAppearedAt = null;
            }
        }
    }
    
    lastScroll = currentScroll;
});

// Animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease both';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card, .card, .pricing-card, .blog-card').forEach(el => {
    observer.observe(el);
});
