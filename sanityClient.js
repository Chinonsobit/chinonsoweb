/**
 * Sanity Client Configuration (Native Fetch Version)
 * This file handles fetching data from the Sanity.io CMS using native fetch.
 */

const CMS_CONFIG = {
    projectId: 'ss11hqc9',
    dataset: 'production',
    useCdn: true,
    apiVersion: '2023-05-03',
};

/**
 * Helper to get image URLs from Sanity
 */
function urlFor(source) {
    if (!source) return '';
    const project = CMS_CONFIG.projectId;
    const dataset = CMS_CONFIG.dataset;

    if (source.asset && source.asset._ref) {
        const ref = source.asset._ref;
        const parts = ref.split('-');
        if (parts.length >= 4) {
            const id = parts[1];
            const size = parts[2];
            const ext = parts[3];
            return `https://cdn.sanity.io/images/${project}/${dataset}/${id}-${size}.${ext}`;
        }
    }
    return '';
}

/**
 * Fetch data using native fetch API
 */
async function fetchPortfolioData() {
    const query = encodeURIComponent(`{
        "profile": *[_type == "profile"][0],
        "about": *[_type == "about"][0],
        "experiences": *[_type == "experience"] | order(order asc),
        "publications": *[_type == "publication"] | order(order asc),
        "skills": *[_type == "skill"] | order(order asc),
        "awards": *[_type == "award"] | order(order asc)
    }`);

    const url = `https://${CMS_CONFIG.projectId}.api.sanity.io/v${CMS_CONFIG.apiVersion}/data/query/${CMS_CONFIG.dataset}?query=${query}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`HTTP error! status: ${response.status}, body: ${errorBody}`);
        }
        const data = await response.json();
        return data.result;
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
