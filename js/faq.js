document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    const initialVisible = 8;

    faqItems.forEach(item => {
        item.removeAttribute('open');
    });

    faqItems.forEach(item => {
        const panel = item.querySelector('.faq-panel');
        const content = panel.querySelector('div');

        item.addEventListener('click', function(e) {
            if (e.target.closest('.faq-btn')) {
                e.preventDefault();

                const isOpen = this.hasAttribute('open');

                if (!isOpen) {
                    faqItems.forEach(otherItem => {
                        if (otherItem !== item && otherItem.hasAttribute('open')) {
                            const otherPanel = otherItem.querySelector('.faq-panel');
                            otherPanel.style.height = otherPanel.scrollHeight + 'px';
                            requestAnimationFrame(() => {
                                otherPanel.style.height = '0px';
                            });
                            setTimeout(() => {
                                otherItem.removeAttribute('open');
                            }, 300);
                        }
                    });

                    this.setAttribute('open', '');
                    panel.style.height = '0px';
                    requestAnimationFrame(() => {
                        panel.style.height = content.scrollHeight + 'px';
                    });
                } else {
                    panel.style.height = panel.scrollHeight + 'px';
                    requestAnimationFrame(() => {
                        panel.style.height = '0px';
                    });
                    setTimeout(() => {
                        this.removeAttribute('open');
                    }, 300);
                }
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
    }
});
