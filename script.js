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
