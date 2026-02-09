/**
 * Sanity Client Configuration
 * This file handles fetching data from the Sanity.io CMS.
 */

// Since we're using a simple script tag setup in index.html, 
// we'll assume the Sanity client library is loaded via CDN or bundle.
// If you're using a build tool, you'd import {createClient} from '@sanity/client'

const CMS_CONFIG = {
    projectId: 'ss11hqc9', // Replace with your Sanity project ID
    dataset: 'production',
    useCdn: true, // `false` if you want to ensure fresh data on every load
    apiVersion: '2023-05-03', // Use current date for latest API version
};

// Placeholder for client - will be initialized in script.js or here
let client = null;

/**
 * Initialize Sanity Client
 * Requires @sanity/client to be available globally or imported
 */
function initSanityClient() {
    if (typeof SanityClient !== 'undefined') {
        client = new SanityClient(CMS_CONFIG);
    } else if (window.sanityClient) {
        // Some CDN versions expose it this way
        client = window.sanityClient(CMS_CONFIG);
    } else {
        console.warn('Sanity client library not found. Please ensure CDN script is loaded.');
    }
}

/**
 * Helper to get image URLs from Sanity
 */
function urlFor(source) {
    if (!source) return '';
    // This usually requires @sanity/image-url, but for a simple setup 
    // we can construct a basic URL or use a simplified helper
    const project = CMS_CONFIG.projectId;
    const dataset = CMS_CONFIG.dataset;

    if (source.asset && source.asset._ref) {
        const ref = source.asset._ref;
        const [_file, id, size, ext] = ref.split('-');
        return `https://cdn.sanity.io/images/${project}/${dataset}/${id}-${size}.${ext}`;
    }
    return '';
}

/**
 * Fetch all content for the portfolio
 */
async function fetchPortfolioData() {
    if (!client) initSanityClient();
    if (!client) return null;

    const query = `{
        "profile": *[_type == "profile"][0],
        "about": *[_type == "about"][0],
        "experiences": *[_type == "experience"] | order(order asc),
        "publications": *[_type == "publication"] | order(order asc),
        "skills": *[_type == "skill"] | order(order asc),
        "awards": *[_type == "award"] | order(order asc)
    }`;

    try {
        return await client.fetch(query);
    } catch (error) {
        console.error('Error fetching from Sanity:', error);
        return null;
    }
}

window.CMS = {
    fetchData: fetchPortfolioData,
    urlFor: urlFor,
    config: CMS_CONFIG
};
