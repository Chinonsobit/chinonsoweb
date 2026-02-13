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

/**
 * --- CMS Integration & Dynamic Rendering ---
 */

// Global Project Data State (Internal state for modals)
let projectData = {};

/**
 * Initialize Portfolio with CMS Data
 */
async function initCMSPortfolio() {
    console.log('Fetching CMS content...');

    if (!window.CMS) {
        console.error('CMS Configuration (sanityClient.js) failed to load.');
        document.querySelectorAll('.loading').forEach(el => {
            el.innerHTML = '<p class="error">Configuration error. Please check if sanityClient.js is missing.</p>';
        });
        return;
    }

    try {
        const data = await window.CMS.fetchData();
        console.log('CMS Data Received:', data);

        if (!data) {
            console.error('Failed to load CMS data. Data is null or undefined.');
            document.querySelectorAll('.loading').forEach(el => {
                el.innerHTML = '<p class="error">Failed to load content. Please try refreshing.</p>';
            });
            return;
        }

        // 1. Render Profile Info (Hero & Global)
        renderProfile(data.profile);

        // 2. Render About Section
        renderAbout(data.about);

        // 3. Render Experience
        renderExperience(data.experiences);

        // 4. Render Publications
        renderPublications(data.publications);

        // 5. Render Skills & Update projectData for modals
        renderSkills(data.skills);

        // 6. Render Awards & Certifications
        renderAwards(data.awards);

        // Final Sync: Ensure all new content is revealed as the user scrolls
        refreshAnimations();
    } catch (error) {
        console.error('Fatal error during CMS initialization:', error);
        document.querySelectorAll('.loading').forEach(el => {
            el.innerHTML = '<p class="error">An unexpected error occurred. Please refresh the page.</p>';
        });
    }
}

/**
 * Re-scan the page for icons and animations after dynamic content injection
 */
function refreshAnimations() {
    if (window.lucide) {
        window.lucide.createIcons();
    }

    if (window.sr) {
        // We sync the container to detect new elements, 
        // then explicitly reveal the main dynamic categories
        sr.sync();
        sr.reveal('.exp-card', { interval: 150 });
        sr.reveal('.pub-item', { interval: 150 });
        sr.reveal('.skill-group', { interval: 150 });
        sr.reveal('.event-card', { interval: 150 });
        sr.reveal('.glass', { interval: 100 });
    }
}

function renderProfile(profile) {
    if (!profile) return;

    if (document.getElementById('cms-full-name')) {
        document.getElementById('cms-full-name').innerText = profile.fullName;
    }
    if (document.getElementById('cms-hero-title')) {
        document.getElementById('cms-hero-title').innerText = profile.title;
    }
    if (document.getElementById('cms-tagline')) {
        document.getElementById('cms-tagline').innerText = profile.tagline;
    }

    // Update profile images if provided
    const profileImg = document.querySelector('.profile-img');
    if (profileImg && profile.profileImage) {
        profileImg.src = window.CMS.urlFor(profile.profileImage);
    }

    // Update Services List
    const servicesList = document.getElementById('cms-services-list');
    if (servicesList && profile.additionalServices) {
        servicesList.innerHTML = profile.additionalServices
            .map(service => `<li>${service}</li>`)
            .join('');
    }
}

function renderAbout(about) {
    const container = document.getElementById('cms-about-content');
    if (!container) return;

    if (!about || !about.paragraphs || about.paragraphs.length === 0) {
        container.innerHTML = '<p>Content coming soon. I am currently updating my profile.</p>';
        return;
    }

    container.innerHTML = about.paragraphs
        .sort((a, b) => a.order - b.order)
        .map(p => `<p>${p.text}</p>`)
        .join('');
}

function renderExperience(experiences) {
    const container = document.getElementById('cms-experience-grid');
    if (!container) return;

    if (!experiences || experiences.length === 0) {
        container.innerHTML = '<p class="no-data">Professional experience details coming soon.</p>';
        return;
    }

    container.innerHTML = experiences.map(exp => `
        <div class="exp-card glass fade-up">
            <div class="exp-header">
                <span class="exp-comp">${exp.company}</span>
                <span class="exp-role">${exp.role}</span>
            </div>
            <p>${exp.description}</p>
        </div>
    `).join('');
}

function renderPublications(publications) {
    const container = document.getElementById('cms-publications-list');
    if (!container) return;

    if (!publications || publications.length === 0) {
        container.innerHTML = '<p class="no-data">Publications and research works are currently being indexed.</p>';
        return;
    }

    container.innerHTML = publications.map(pub => `
        <div class="pub-item glass fade-up">
            <div class="pub-icon"><i data-lucide="${pub.icon || 'file-text'}"></i></div>
            <div class="pub-info">
                <h3>${pub.title}</h3>
                <p>${pub.description}</p>
                <a href="${pub.link || '#'}" class="pub-link" ${pub.link ? 'target="_blank"' : ''}>
                    Read More <i data-lucide="arrow-right"></i>
                </a>
            </div>
        </div>
    `).join('');
}

function renderSkills(skills) {
    const container = document.getElementById('cms-skills-container');
    if (!container) return;

    if (!skills || skills.length === 0) {
        container.innerHTML = '<p class="no-data">Skills and technical expertise coming soon.</p>';
        return;
    }

    // Build internal projectData for the showProjects() function
    projectData = {};

    // Group skills by category
    const categories = {
        'economic': { title: 'Economic & Policy Analysis', id: 'cat-econ', skills: [] },
        'quantitative': { title: 'Quantitative & Research', id: 'cat-quant', skills: [] },
        'tools': { title: 'Tools & Technologies', id: 'cat-tools', skills: [] }
    };

    skills.forEach(skill => {
        if (categories[skill.category]) {
            categories[skill.category].skills.push(skill);
        }

        // Save to projectData for the modal system
        const slug = skill.slug?.current || skill.name.toLowerCase().replace(/\s+/g, '-');
        projectData[slug] = {
            title: skill.name,
            desc: skill.description || 'Project details and analysis files.',
            projects: (skill.projects || []).map(p => ({
                name: p.name,
                // We'd need to handle Sanity file URLs here
                link: '#'
            }))
        };
    });

    // Render grouped skills
    let html = '';

    // Econ & Quant use mini-cards
    ['economic', 'quantitative'].forEach(catId => {
        const cat = categories[catId];
        html += `
            <div class="skill-group fade-up">
                <h3>${cat.title}</h3>
                <div class="skill-cards">
                    ${cat.skills.map(skill => `
                        <div class="skill-mini-card" onclick="showProjects('${skill.slug?.current}')">
                            <i data-lucide="${skill.icon}"></i>
                            <span>${skill.name}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    });

    // Tools use the grid of icons
    const tools = categories['tools'];
    html += `
        <div class="skill-group fade-up">
            <h3>${tools.title}</h3>
            <div class="tools-grid-icons">
                ${tools.skills.map(skill => `
                    <div class="tool-icon-box" onclick="showProjects('${skill.slug?.current}')" title="${skill.name}">
                        <span>${skill.name}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    container.innerHTML = html;
}

function renderAwards(awards) {
    const container = document.getElementById('cms-awards-grid');
    if (!container || !awards) return;

    // Group for modal lookup
    const types = ['trainings', 'awards', 'certifications'];
    types.forEach(type => {
        const matching = awards.filter(a => a.type === (type.endsWith('s') ? type.slice(0, -1) : type));
        projectData[type] = {
            title: type.charAt(0).toUpperCase() + type.slice(1),
            desc: `Documenting selected ${type}.`,
            projects: matching.map(a => ({ name: a.title, link: '#' }))
        };
    });

    container.innerHTML = awards.map(award => `
        <div class="event-card glass fade-up" onclick="showProjects('${award.type}s')">
            <i data-lucide="${award.type === 'award' ? 'medal' : (award.type === 'training' ? 'award' : 'badge-check')}"></i>
            <h3>${award.title}</h3>
            <p>${award.description}</p>
        </div>
    `).join('');

    // Important: Refresh icons and Reveal animations for the new items
    if (window.lucide) window.lucide.createIcons();
    if (window.sr) {
        window.sr.reveal('.event-card', { interval: 150 });
    }
}

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
    if (window.lucide) window.lucide.createIcons();

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

function setupObservers() {
    document.querySelectorAll('.glass, .spec-item, .pub-item').forEach(el => {
        el.classList.add('fade-up');
        observer.observe(el);
    });
}

// Scroll to Top Logic
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300 && scrollTopBtn) {
        scrollTopBtn.classList.add('visible');
    } else if (scrollTopBtn) {
        scrollTopBtn.classList.remove('visible');
    }
});

if (scrollTopBtn) {
    scrollTopBtn.onclick = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
}

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

    // Initialize CMS Data fetching and rendering
    initCMSPortfolio();

    // Setup scroll observers for animations
    setupObservers();

    // 2. ScrollReveal Initialization
    window.sr = ScrollReveal({
        origin: 'bottom',
        distance: '60px',
        duration: 2500,
        delay: 400,
    });

    window.sr.reveal('.hero-title, .hero-tagline, .hero-btns', { interval: 200 });
    window.sr.reveal('.about-text-card', { origin: 'left' });
    window.sr.reveal('.exp-card', { interval: 200 });
    window.sr.reveal('.skill-group', { interval: 200 });
    window.sr.reveal('.pub-item', { interval: 200 });
    window.sr.reveal('.section-header', { origin: 'top' });

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

