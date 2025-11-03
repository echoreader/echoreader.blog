module.exports = {
  url: process.env.ELEVENTY_ENV === "production"
    ? "https://echoreader.blog"
    : "http://localhost:8080"
};
