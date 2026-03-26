const https = require('https');

const projectId = 'ss11hqc9';
const dataset = 'production';
const apiVersion = '2023-05-03';
const query = encodeURIComponent(`*[_type == "profile"][0]`);

const url = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=${query}`;

https.get(url, (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
        try {
            const parsed = JSON.parse(data);
            console.log('--- PROFILE DATA ---');
            console.log(JSON.stringify(parsed.result, null, 2));
        } catch (e) {
            console.log('Error parsing JSON');
        }
    });
});
