document.addEventListener('DOMContentLoaded', () => {
    const progressBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const targetWidth = bar.getAttribute('data-width');
                
                bar.style.width = targetWidth;
                
                observer.unobserve(bar);
            }
        });
    }, { 
        threshold: 0.5 
    });

    progressBars.forEach(bar => {
        observer.observe(bar);
    });
});