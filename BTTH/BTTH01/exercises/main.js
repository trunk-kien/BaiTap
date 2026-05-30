document.addEventListener("DOMContentLoaded", function() {
    const skillBars = document.querySelectorAll('.skill-progress');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const widthTarget = progressBar.getAttribute('data-width');
                progressBar.style.width = widthTarget;
                
                observer.unobserve(progressBar);
            }
        });
    }, {
        threshold: 0.5 
    });

    skillBars.forEach(bar => {
        observer.observe(bar);
    });
});