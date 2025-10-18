document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    const initialVisible = 8;

    faqItems.forEach(item => {
        const summary = item.querySelector('.faq-btn');
        const panel = item.querySelector('.faq-panel');

        summary.addEventListener('click', function(e) {
            e.preventDefault();

            const isOpen = item.hasAttribute('open');

            if (!isOpen) {
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.hasAttribute('open')) {
                        const otherPanel = otherItem.querySelector('.faq-panel');
                        otherPanel.style.maxHeight = otherPanel.scrollHeight + 'px';
                        setTimeout(() => {
                            otherPanel.style.maxHeight = '0';
                        }, 10);
                        setTimeout(() => {
                            otherItem.removeAttribute('open');
                        }, 400);
                    }
                });

                item.setAttribute('open', '');
                panel.style.maxHeight = '0';
                setTimeout(() => {
                    panel.style.maxHeight = panel.scrollHeight + 'px';
                }, 10);
            } else {
                panel.style.maxHeight = panel.scrollHeight + 'px';
                setTimeout(() => {
                    panel.style.maxHeight = '0';
                }, 10);
                setTimeout(() => {
                    item.removeAttribute('open');
                }, 400);
            }
        });
    });

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

                const faqSection = document.getElementById('faq');
                if (faqSection) {
                    faqSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
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
        const firstPanel = faqItems[0].querySelector('.faq-panel');
        if (firstPanel) {
            firstPanel.style.maxHeight = firstPanel.scrollHeight + 'px';
        }
    }
});
