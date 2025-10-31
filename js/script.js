let exchangeRates = { PLN: 1, EUR: 0.23, USD: 0.25 };
let ratesLoaded = false;

async function fetchExchangeRates() {
    try {
        const response = await fetch('https://api.frankfurter.dev/v1/latest?base=EUR&symbols=PLN,USD');
        const data = await response.json();

        const eurToPln = data.rates.PLN;
        const eurToUsd = data.rates.USD;

        exchangeRates = {
            PLN: 1,
            EUR: 1 / eurToPln,
            USD: eurToUsd / eurToPln
        };
        ratesLoaded = true;
        updateRateDisplay();
    } catch (error) {
        console.error('Failed to fetch exchange rates:', error);
        exchangeRates = { PLN: 1, EUR: 0.23, USD: 0.25 };
    }
}

function updateRateDisplay() {
    const cur = document.getElementById('currency')?.value || 'PLN';
    const rateInfo = document.getElementById('exchangeRateInfo');
    if (rateInfo && cur !== 'PLN') {
        const rate = exchangeRates[cur];
        rateInfo.textContent = `1 PLN = ${rate.toFixed(4)} ${cur}`;
        rateInfo.style.display = 'block';
    } else if (rateInfo) {
        rateInfo.style.display = 'none';
    }
}

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

function convertToPLN(amount, fromCurrency) {
    if (fromCurrency === 'PLN') return amount;
    const rate = exchangeRates[fromCurrency];
    return amount / rate;
}

function convertFromPLN(amount, toCurrency) {
    if (toCurrency === 'PLN') return amount;
    const rate = exchangeRates[toCurrency];
    return amount * rate;
}

let lastCurrency = 'PLN';

function recalc() {
    const cur = document.getElementById('currency').value;
    const inputAmount = Number(document.getElementById('amount').value || 0);
    const withVAT = document.getElementById('withVAT').checked;
    const transferIP = document.getElementById('transferIP').checked;
    const pitRate = transferIP ? 0.06 : 0.096;

    const amountInPLN = convertToPLN(inputAmount, cur);
    const feeInPLN = planCost();

    const vatAmtPLN = withVAT ? amountInPLN * 0.23 : 0;
    const pitAmtPLN = amountInPLN * pitRate;
    const netPLN = Math.max(0, amountInPLN - pitAmtPLN - feeInPLN);
    const clientTotalPLN = withVAT ? amountInPLN + vatAmtPLN : amountInPLN;

    document.getElementById('gross').innerText = fmt(inputAmount, cur);
    document.getElementById('pitRate').innerText = (pitRate*100).toFixed(1).replace('.0','') + '%';
    document.getElementById('pitAmt').innerText = fmt(convertFromPLN(pitAmtPLN, cur), cur);
    document.getElementById('fee').innerText = fmt(convertFromPLN(feeInPLN, cur), cur);
    document.getElementById('vatAmt').innerText = withVAT ? fmt(convertFromPLN(vatAmtPLN, cur), cur) : '—';
    document.getElementById('net').innerText = fmt(convertFromPLN(netPLN, cur), cur);
    document.getElementById('clientTotal').innerText = fmt(convertFromPLN(clientTotalPLN, cur), cur);

    const jdgRate = Number(document.getElementById('jdgRate').value || 0) / 100;
    const jdgZUS = Number(document.getElementById('jdgZUS').value || 0);
    const jdgPitPLN = amountInPLN * jdgRate;
    const jdgNetPLN = Math.max(0, amountInPLN - jdgPitPLN - jdgZUS);
    document.getElementById('jdgNet').innerText = fmt(convertFromPLN(jdgNetPLN, cur), cur);

    updateRateDisplay();
}

function handleCurrencyChange() {
    const cur = document.getElementById('currency').value;
    const currentAmount = Number(document.getElementById('amount').value || 0);

    if (currentAmount > 0 && lastCurrency !== cur) {
        const amountInPLN = convertToPLN(currentAmount, lastCurrency);
        const newAmount = convertFromPLN(amountInPLN, cur);
        document.getElementById('amount').value = Math.round(newAmount);
    }

    lastCurrency = cur;
    recalc();
}

fetchExchangeRates().then(() => {
    if (document.readyState !== 'loading') {
        jdgApplyPreset();
        recalc();
    }
});

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

document.getElementById('amount')?.addEventListener('input', recalc);
document.getElementById('currency')?.addEventListener('change', handleCurrencyChange);
document.getElementById('plan')?.addEventListener('change', recalc);
document.getElementById('withVAT')?.addEventListener('change', recalc);
document.getElementById('transferIP')?.addEventListener('change', recalc);
document.getElementById('jdgPreset')?.addEventListener('change', function() {
    jdgApplyPreset();
    recalc();
});
document.getElementById('jdgRate')?.addEventListener('input', recalc);
document.getElementById('jdgZUS')?.addEventListener('input', recalc);

document.querySelectorAll('.calc-quick-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const amount = this.dataset.amount;
        if (amount) {
            setAmount(Number(amount));
        }
    });
});

document.getElementById('calcConsultBtn')?.addEventListener('click', function() {
    document.getElementById('signup')?.scrollIntoView({behavior: 'smooth'});
});

// Custom dropdown functionality
function initCustomDropdowns() {
    document.querySelectorAll('.calculator .form-group select, .calc-jdg-comparison .form-group select').forEach(select => {
        if (select.dataset.customized) return;
        select.dataset.customized = 'true';

        const wrapper = document.createElement('div');
        wrapper.className = 'custom-select-wrapper';

        const customSelect = document.createElement('div');
        customSelect.className = 'custom-select';

        const selected = document.createElement('div');
        selected.className = 'custom-select-trigger';
        selected.innerHTML = `
            <span>${select.options[select.selectedIndex].text}</span>
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                <path d="M1 1L6 6L11 1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        `;

        const optionsContainer = document.createElement('div');
        optionsContainer.className = 'custom-select-options';

        Array.from(select.options).forEach((option, index) => {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'custom-select-option';
            if (index === select.selectedIndex) {
                optionDiv.classList.add('selected');
            }
            optionDiv.textContent = option.text;
            optionDiv.dataset.value = option.value;
            optionDiv.dataset.index = index;

            optionDiv.addEventListener('click', () => {
                select.selectedIndex = index;
                select.dispatchEvent(new Event('change'));

                selected.querySelector('span').textContent = option.text;

                optionsContainer.querySelectorAll('.custom-select-option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                optionDiv.classList.add('selected');

                customSelect.classList.remove('open');
            });

            optionsContainer.appendChild(optionDiv);
        });

        customSelect.appendChild(selected);
        customSelect.appendChild(optionsContainer);
        wrapper.appendChild(customSelect);

        select.style.display = 'none';
        select.parentNode.insertBefore(wrapper, select);

        selected.addEventListener('click', (e) => {
            e.stopPropagation();

            document.querySelectorAll('.custom-select.open').forEach(s => {
                if (s !== customSelect) s.classList.remove('open');
            });

            customSelect.classList.toggle('open');
        });
    });

    const closeAllDropdowns = () => {
        document.querySelectorAll('.custom-select.open').forEach(s => {
            s.classList.remove('open');
        });
    };

    document.removeEventListener('click', closeAllDropdowns);
    document.addEventListener('click', closeAllDropdowns);
}

document.addEventListener('DOMContentLoaded', initCustomDropdowns);

document.querySelectorAll('.comparison-tab').forEach(tab => {
    tab.addEventListener('click', function() {
        const competitor = this.dataset.competitor;

        document.querySelectorAll('.comparison-tab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');

        document.querySelectorAll('.competitor-col').forEach(col => col.classList.remove('active'));
        document.querySelectorAll('.competitor-' + competitor).forEach(col => col.classList.add('active'));
    });
});

if (window.innerWidth <= 768) {
    document.querySelectorAll('.competitor-weexpert').forEach(col => col.classList.add('active'));
}

document.getElementById('pricingToggle')?.addEventListener('change', function() {
    const isYearly = this.checked;

    document.querySelectorAll('.pricing-card').forEach(card => {
        const monthlyPrice = parseFloat(card.dataset.monthly);
        const yearlyPrice = parseFloat(card.dataset.yearly);

        if (!monthlyPrice || !yearlyPrice) return;

        const priceElement = card.querySelector('.pricing-price');

        if (isYearly) {
            const monthlyEquivalent = Math.round(yearlyPrice / 12);
            priceElement.innerHTML = `${monthlyEquivalent} zł<span class="pricing-price-period">/mo</span>`;
        } else {
            priceElement.innerHTML = `${monthlyPrice} zł<span class="pricing-price-period">/mo</span>`;
        }
    });
});
