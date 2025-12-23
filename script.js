// Search Overlay Toggle
function toggleSearch() {
  const searchOverlay = document.getElementById('searchOverlay');
  const searchInput = document.getElementById('searchInput');
  
  searchOverlay.classList.toggle('active');
  
  if (searchOverlay.classList.contains('active')) {
    setTimeout(() => searchInput.focus(), 300);
  }
}

// Side Menu Toggle
function toggleSideMenu() {
  const sideMenu = document.getElementById('sideMenu');
  const sideMenuOverlay = document.getElementById('sideMenuOverlay');
  
  sideMenu.classList.toggle('active');
  sideMenuOverlay.classList.toggle('active');
  
  // Prevent body scroll when menu is open
  if (sideMenu.classList.contains('active')) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
}

// Close search on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const searchOverlay = document.getElementById('searchOverlay');
    const sideMenu = document.getElementById('sideMenu');
    
    if (searchOverlay.classList.contains('active')) {
      toggleSearch();
    }
    if (sideMenu.classList.contains('active')) {
      toggleSideMenu();
    }
  }
});

// Smooth Scroll Function
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    const headerHeight = document.querySelector('.header').offsetHeight;
    const sectionPosition = section.offsetTop - headerHeight;
    window.scrollTo({
      top: sectionPosition,
      behavior: 'smooth'
    });
  }
}

// Download Brochure Function
function downloadBrochure() {
  alert('Brochure download will start shortly. Thank you for your interest in JP Infra!');
}

// EMI Calculator
const loanAmountSlider = document.getElementById('loanAmount');
const interestRateSlider = document.getElementById('interestRate');
const tenureSlider = document.getElementById('tenure');

const loanAmountValue = document.getElementById('loanAmountValue');
const interestRateValue = document.getElementById('interestRateValue');
const tenureValue = document.getElementById('tenureValue');
const emiValue = document.getElementById('emiValue');

function formatCurrency(amount) {
  return '₹' + amount.toLocaleString('en-IN');
}

function calculateEMI() {
  const principal = parseFloat(loanAmountSlider.value);
  const rate = parseFloat(interestRateSlider.value) / 12 / 100;
  const time = parseFloat(tenureSlider.value) * 12;

  const emi = (principal * rate * Math.pow(1 + rate, time)) / (Math.pow(1 + rate, time) - 1);
  
  return Math.round(emi);
}

function updateEMI() {
  const loanAmount = parseFloat(loanAmountSlider.value);
  const interestRate = parseFloat(interestRateSlider.value);
  const tenure = parseFloat(tenureSlider.value);

  loanAmountValue.textContent = formatCurrency(loanAmount);
  interestRateValue.textContent = interestRate + '%';
  tenureValue.textContent = tenure + ' Years';

  const emi = calculateEMI();
  emiValue.textContent = formatCurrency(emi);

  updateSliderFill(loanAmountSlider);
  updateSliderFill(interestRateSlider);
  updateSliderFill(tenureSlider);
}

function updateSliderFill(slider) {
  const min = slider.min || 0;
  const max = slider.max || 100;
  const value = slider.value;
  const percentage = ((value - min) / (max - min)) * 100;
  
  slider.style.background = `linear-gradient(to right, #01447c 0%, #01447c ${percentage}%, rgba(0, 95, 134, 0.2) ${percentage}%, rgba(0, 95, 134, 0.2) 100%)`;
}

if (loanAmountSlider && interestRateSlider && tenureSlider) {
  loanAmountSlider.addEventListener('input', updateEMI);
  interestRateSlider.addEventListener('input', updateEMI);
  tenureSlider.addEventListener('input', updateEMI);

  updateEMI();
}

// FAQ Toggle - Fixed Version
function toggleFAQ(element) {
  const isActive = element.classList.contains('active');
  
  // Close all other FAQ items
  document.querySelectorAll('.faq-item').forEach(item => {
    if (item !== element) {
      item.classList.remove('active');
    }
  });
  
  // Toggle current item
  element.classList.toggle('active');
  
  // Update icon text
  const icon = element.querySelector('.faq-icon');
  if (icon) {
    icon.textContent = element.classList.contains('active') ? '−' : '+';
  }
}

// Optional: Initially close all FAQs
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.faq-item').forEach(item => {
    item.classList.remove('active');
  });
});

// Scroll Animation
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll(
    '.project-card, .feature-item-vertical, .testimonial-card, .faq-item, .about-content, .about-image'
  );
  
  animatedElements.forEach(el => {
    observer.observe(el);
  });
});

// Active Navigation Link on Scroll
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]');
  const scrollPosition = window.scrollY + 150;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });

  // Add scrolled class to header
  const header = document.querySelector('.header');
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const heroContent = document.querySelector('.hero-content');
  const heroBg = document.querySelector('.hero-bg');
  
  if (heroContent && scrolled < window.innerHeight) {
    heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
    heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
  }
  
  if (heroBg && scrolled < window.innerHeight) {
    heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
  }
});

// Project Card Hover Effect
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-10px) scale(1.02)';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
  });
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  console.log('JP Infra Website Loaded Successfully');
  
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease-in';
    document.body.style.opacity = '1';
  }, 100);
});

// Handle window resize
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    if (window.innerWidth > 768) {
      const sideMenu = document.getElementById('sideMenu');
      const sideMenuOverlay = document.getElementById('sideMenuOverlay');
      sideMenu.classList.remove('active');
      sideMenuOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }, 250);
});
