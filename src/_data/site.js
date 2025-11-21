module.exports = {
  url: process.env.URL 
    || process.env.SITE_URL 
    || process.env.CF_PAGES_URL 
    || "http://localhost:8080"
};