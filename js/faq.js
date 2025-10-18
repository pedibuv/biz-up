document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    const initialVisible = 8;

    if (faqItems.length > initialVisible) {
        for (let i = initialVisible; i < faqItems.length; i++) {
            faqItems[i].classList.add('faq-item--hidden');
        }

        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'faq-toggle-btn';
        toggleBtn.innerHTML = '<img src="img/more-faq.svg" alt="" width="32" height="32">';
        toggleBtn.setAttribute('aria-label', 'Показати більше запитань');

        const faqContainer = document.querySelector('.faq');
        faqContainer.appendChild(toggleBtn);

        toggleBtn.addEventListener('click', function() {
            const isExpanded = this.classList.contains('expanded');

            if (isExpanded) {
                for (let i = initialVisible; i < faqItems.length; i++) {
                    faqItems[i].classList.add('faq-item--hidden');
                }
                this.classList.remove('expanded');
                this.setAttribute('aria-label', 'Показати більше запитань');
            } else {
                for (let i = initialVisible; i < faqItems.length; i++) {
                    faqItems[i].classList.remove('faq-item--hidden');
                }
                this.classList.add('expanded');
                this.setAttribute('aria-label', 'Показати менше запитань');
            }
        });
    }

    if (faqItems.length > 0) {
        faqItems[0].setAttribute('open', '');
    }
});
