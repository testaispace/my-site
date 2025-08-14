// Simple JavaScript for Hello from Cloudflare Pages site

// DOM ready function
document.addEventListener('DOMContentLoaded', function() {
    console.log('Hello from Cloudflare Pages - Site loaded!');
    
    // Add a simple animation to the container
    const container = document.querySelector('.container');
    if (container) {
        container.style.opacity = '0';
        container.style.transform = 'translateY(20px)';
        
        // Fade in animation
        setTimeout(() => {
            container.style.transition = 'all 0.8s ease-out';
            container.style.opacity = '1';
            container.style.transform = 'translateY(0)';
        }, 100);
    }
    
    // Add click interaction to the heading
    const heading = document.querySelector('h1');
    if (heading) {
        heading.addEventListener('click', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.2s ease';
            
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    }
});
