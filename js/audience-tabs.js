document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.audience-tab');
    const contents = document.querySelectorAll('.audience-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');

            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));

            this.classList.add('active');
            document.querySelector(`[data-content="${targetTab}"]`).classList.add('active');
        });
    });
});
