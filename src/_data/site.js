module.exports = {
  url: process.env.SITE_URL 
    || process.env.URL 
    || process.env.CF_PAGES_URL 
    || "http://localhost:8080"
};