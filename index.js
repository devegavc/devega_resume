const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('show-menu');
});
showMenu('nav-toggle','nav-menu')

/*===== ACTIVE AND REMOVE MENU =====*/
const navLinks = document.querySelectorAll('.nav__link');

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    // Remove 'active' class from all links
    navLinks.forEach(nav => nav.classList.remove('active'));

    // Add 'active' class to the clicked link
    link.classList.add('active');
  });
});

// Ensure active link stays blue on page load
document.addEventListener('DOMContentLoaded', () => {
  const activeLink = document.querySelector('.nav__link.active');
  if (activeLink) {
    activeLink.style.color = '#4070f4';
  }
});

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 2000,
    reset: true
});

/*SCROLL HOME*/
sr.reveal('.home__title',{}); 
sr.reveal('.button',{delay: 200}); 
sr.reveal('.home__img',{delay: 400}); 
sr.reveal('.home__social-icon',{ interval: 200}); 

/*SCROLL ABOUT*/
sr.reveal('.about__img',{}); 
sr.reveal('.about__subtitle',{delay: 400}); 
sr.reveal('.about__text',{delay: 400}); 

sr.reveal('.skills__subtitle', {})
sr.reveal('.skills__name', {distance: '20px', delay: 50, interval: 100})
sr.reveal('.skills__img', {delay: 400})

/*SCROLL WORK*/
sr.reveal('.portfolio__img', {interval: 200})


/*SCROLL CONTACT*/
sr.reveal('.contact__input',{interval: 200});

/*===== PARTICLE BACKGROUND ANIMATION WITH METEORS AND SPACESHIP =====*/
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('backgroundCanvas');
    const ctx = canvas.getContext('2d');

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particlesArray = [];
    const meteorsArray = [];
    const numberOfParticles = 100;
    const numberOfMeteors = 5;

    // Create particle class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1; // Particle size
            this.speedX = Math.random() * 1 - 0.5; // Horizontal speed
            this.speedY = Math.random() * 1 - 0.5; // Vertical speed
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Bounce particles off edges
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }
        draw() {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        }
    }

    // Create meteor class
    class Meteor {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height * 0.5; // Start from the top half
            this.size = Math.random() * 5 + 2; // Meteor size
            this.speedX = Math.random() * 3 + 1; // Horizontal speed
            this.speedY = Math.random() * 3 + 1; // Vertical speed
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Reset meteor position when it goes off-screen
            if (this.x > canvas.width || this.y > canvas.height) {
                this.x = Math.random() * canvas.width;
                this.y = 0;
            }
        }
        draw() {
            ctx.fillStyle = 'rgba(255, 165, 0, 0.8)'; // Orange color for meteors
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        }
    }

    // Create spaceship class
    class Spaceship {
        constructor() {
            this.x = canvas.width / 2;
            this.y = canvas.height - 100; // Start near the bottom
            this.width = 50;
            this.height = 30;
            this.speedX = 2; // Horizontal speed
        }
        update() {
            this.x += this.speedX;

            // Bounce spaceship off edges
            if (this.x < 0 || this.x + this.width > canvas.width) this.speedX *= -1;
        }
        draw() {
            ctx.fillStyle = 'rgba(0, 191, 255, 0.9)'; // Blue color for spaceship
            ctx.beginPath();
            ctx.moveTo(this.x, this.y); // Nose of the spaceship
            ctx.lineTo(this.x - this.width / 2, this.y + this.height); // Left wing
            ctx.lineTo(this.x + this.width / 2, this.y + this.height); // Right wing
            ctx.closePath();
            ctx.fill();
        }
    }

    // Initialize particles, meteors, and spaceship
    function init() {
        particlesArray.length = 0;
        meteorsArray.length = 0;

        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
        for (let i = 0; i < numberOfMeteors; i++) {
            meteorsArray.push(new Meteor());
        }

        spaceship = new Spaceship();
    }

    // Animate everything
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

        // Update and draw particles
        particlesArray.forEach(particle => {
            particle.update();
            particle.draw();
        });

        // Update and draw meteors
        meteorsArray.forEach(meteor => {
            meteor.update();
            meteor.draw();
        });

        // Update and draw spaceship
        spaceship.update();
        spaceship.draw();

        requestAnimationFrame(animate); // Loop animation
    }

    // Resize canvas on window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init(); // Reinitialize everything on resize
    });

    // Initialize and start animation
    let spaceship;
    init();
    animate();
});