// Theme Management
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

// Set initial theme
const savedTheme = localStorage.getItem('theme') || 'dark';
htmlElement.setAttribute('data-theme', savedTheme);

themeToggle.onclick = () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
};

// Navigation Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Project Data Store with Multiple Task Support
const projectData = {
    'python': {
        title: 'Python for Econ-Research',
        desc: 'Automating data collection and advanced econometric modeling.',
        projects: [
            { name: 'Data Scraper Demo', link: 'assets/docs/tasks/python/scraper.pdf' },
            { name: 'Impact Analysis Script', link: 'assets/docs/tasks/python/analysis.py' }
        ]
    },
    'sql': {
        title: 'Database Management & SQL',
        desc: 'Structuring and querying large datasets for fiscal governance.',
        projects: [
            { name: 'Query Optimization Task', link: 'assets/docs/tasks/sql/queries.pdf' }
        ]
    },
    'r': {
        title: 'Data Science with R',
        desc: 'Statistical modeling and policy impact evaluation.',
        projects: [
            { name: 'R-Markdown Report', link: 'assets/docs/tasks/r/report.pdf' }
        ]
    },
    'stata': {
        title: 'Stata Econometric Modeling',
        desc: 'Advanced analysis for macroeconomic research.',
        projects: [
            { name: 'Time Series Task', link: 'assets/docs/tasks/stata/model.do' }
        ]
    },
    'powerbi': {
        title: 'PowerBI Dashboards',
        desc: 'Interactive visualizations for economic indicators.',
        projects: [
            { name: 'Fiscal Dashboard', link: 'assets/docs/tasks/powerbi/dashboard.pdf' }
        ]
    },
    'latex': {
        title: 'Typesetting with Latex',
        desc: 'Professional research papers and policy briefs.',
        projects: [
            { name: 'Research Paper Template', link: 'assets/docs/tasks/latex/paper.pdf' }
        ]
    },
    'excel': {
        title: 'Excel Data Analysis',
        desc: 'Templates and automated reports for policy data.',
        projects: [
            { name: 'Data Analysis Sheet', link: 'assets/docs/tasks/excel/analysis.xlsx' }
        ]
    },
    // Milestones Categories
    'trainings': {
        title: 'Professional Trainings',
        desc: 'Capacity building and specialized workshops.',
        projects: [] // Add links here: { name: 'Certificate Name', link: 'assets/docs/milestones/trainings/name.pdf' }
    },
    'awards': {
        title: 'Awards & Honors',
        desc: 'Recognitions for academic and professional excellence.',
        projects: []
    },
    'certifications': {
        title: 'Professional Certifications',
        desc: 'Industry-standard certifications and badges.',
        projects: []
    }
};

// Overlay Management
const overlay = document.getElementById('projectOverlay');
const overlayTitle = document.getElementById('overlayTitle');
const overlayDesc = document.getElementById('overlayDesc');
const overlayGraphic = document.getElementById('overlayGraphic');
const closeBtn = document.getElementById('closeOverlay');

window.showProjects = function (type) {
    const data = projectData[type] || {
        title: 'Project Details',
        desc: 'Detail work will be displayed here.',
        projects: []
    };

    overlayTitle.innerText = data.title;

    // Generate description and list of project links
    let contentHtml = `<p class="overlay-summary">${data.desc}</p>`;

    if (data.projects && data.projects.length > 0) {
        contentHtml += `<div class="project-links-list">`;
        data.projects.forEach(proj => {
            contentHtml += `
                <a href="${proj.link}" class="project-link-item" download target="_blank">
                    <i data-lucide="file-text"></i>
                    <span>${proj.name}</span>
                    <i data-lucide="download" class="dl-icon"></i>
                </a>`;
        });
        contentHtml += `</div>`;
    } else {
        contentHtml += `<p class="no-docs">No documents uploaded yet for this category.</p>`;
    }

    overlayDesc.innerHTML = contentHtml;
    overlayGraphic.innerHTML = `<h3><i data-lucide="folder-open"></i> CATEGORY PREVIEW</h3>`;

    // Re-initialize icons for the dynamic content
    lucide.createIcons();

    overlay.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

closeBtn.onclick = () => {
    overlay.style.display = 'none';
    document.body.style.overflow = 'auto';
};

// Close on background click
overlay.onclick = (e) => {
    if (e.target === overlay) {
        overlay.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
};

// Mobile Toggle (Simple)
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle) {
    navToggle.onclick = () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    };
}

// Fade in elements on scroll
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        }
    });
}, observerOptions);

document.querySelectorAll('.glass, .spec-item, .pub-item').forEach(el => {
    el.classList.add('fade-up');
    observer.observe(el);
});

// Scroll to Top Logic
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.onclick = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

// Access Request Modal Logic
const accessModal = document.getElementById('accessModal');
const accessForm = document.getElementById('accessForm');
const closeAccessModal = document.getElementById('closeModal');
const heroViewCvBtn = document.getElementById('heroViewCvBtn');
const footerViewCvBtn = document.getElementById('footerViewCvBtn');
const formStatus = document.getElementById('formStatus');

// Open Modal
function openAccessModal() {
    accessModal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

if (heroViewCvBtn) heroViewCvBtn.onclick = openAccessModal;
if (footerViewCvBtn) footerViewCvBtn.onclick = openAccessModal;

// Close Modal
function closeAccessModalFunc() {
    accessModal.classList.remove('show');
    document.body.style.overflow = 'auto';
    formStatus.innerText = '';
    formStatus.className = 'form-status';
}

if (closeAccessModal) closeAccessModal.onclick = closeAccessModalFunc;

window.addEventListener('click', (e) => {
    if (e.target === accessModal) {
        closeAccessModalFunc();
    }
});

// Handle Form Submit
if (accessForm) {
    accessForm.onsubmit = async (e) => {
        e.preventDefault();

        const email = document.getElementById('requesterEmail').value;
        const reason = document.getElementById('requestReason').value;
        const submitBtn = accessForm.querySelector('button[type="submit"]');

        // Basic Validation
        if (!email || !reason) {
            formStatus.innerText = 'Please fill in all fields.';
            formStatus.className = 'form-status error';
            return;
        }

        // Loading State
        submitBtn.disabled = true;
        submitBtn.innerText = 'Sending...';
        formStatus.innerText = '';

        try {
            const response = await fetch('/api/request-cv', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, reason })
            });

            const data = await response.json();

            if (response.ok) {
                formStatus.innerText = 'Request sent successfully! Check your email for confirmation.';
                formStatus.className = 'form-status success';
                accessForm.reset();
                setTimeout(() => {
                    closeAccessModalFunc();
                    submitBtn.disabled = false;
                    submitBtn.innerText = 'Send Request';
                }, 3000);
            } else {
                throw new Error(data.message || 'Failed to send request.');
            }
        } catch (error) {
            console.error('Error:', error);
            formStatus.innerText = 'Error: ' + error.message;
            formStatus.className = 'form-status error';
            submitBtn.disabled = false;
            submitBtn.innerText = 'Send Request';
        }
    };
}

/* --- Visual Enhancements Initialization --- */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Typed.js Initialization
    if (document.querySelector('.typed-text')) {
        const typed = new Typed('.typed-text', {
            strings: ['Economist', 'Policy Researcher', 'Data Analyst', 'M&E Specialist'],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            loop: true,
            cursorChar: '|'
        });
    }

    // 2. ScrollReveal Initialization
    const sr = ScrollReveal({
        origin: 'bottom',
        distance: '60px',
        duration: 2500,
        delay: 400,
        // reset: true // Animations repeat on scroll up
    });

    sr.reveal('.hero-title, .hero-tagline, .hero-btns', { interval: 200 });
    sr.reveal('.about-text-card', { origin: 'left' });
    sr.reveal('.exp-card', { interval: 200 });
    sr.reveal('.skill-group', { interval: 200 });
    sr.reveal('.pub-item', { interval: 200 });
    sr.reveal('.section-header', { origin: 'top' });

    // 3. Custom Cursor Logic
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursor-follower');
    // Select all interactive elements
    const links = document.querySelectorAll('a, button, .skill-mini-card, .pub-item, .exp-card, .tool-icon-box');

    if (cursor && follower) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
            follower.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        });

        links.forEach(link => {
            link.addEventListener('mouseenter', () => {
                document.body.classList.add('hovering');
            });
            link.addEventListener('mouseleave', () => {
                document.body.classList.remove('hovering');
            });
        });
    }

    // 4. Particles.js Initialization
    if (document.getElementById('particles-js')) {
        particlesJS("particles-js", {
            "particles": {
                "number": { "value": 60, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#ffffff" },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.1, "random": false },
                "size": { "value": 3, "random": true },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#ffffff",
                    "opacity": 0.1,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 1.5,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": { "enable": true, "mode": "grab" },
                    "onclick": { "enable": true, "mode": "push" },
                    "resize": true
                },
                "modes": {
                    "grab": { "distance": 140, "line_linked": { "opacity": 1 } },
                    "push": { "particles_nb": 4 }
                }
            },
            "retina_detect": true
        });
    }
});
