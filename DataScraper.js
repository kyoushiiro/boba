const axios = require('axios');

const API_KEY = process.env.YELP_API_KEY;
console.log(API_KEY);

let url = 'https://api.yelp.com/v3/businesses/search'

axios.get(url, {
    params: {
        term: 'boba',
        location: '32650 Lake Mead Drive, Fremont, CA',
        limit: 50
    },
    headers: {
        Authorization: `Bearer ${API_KEY}`
    }
}).then(function(response) {
    console.log(response.data);
}).catch(function(error) {
    console.log(error);
});
