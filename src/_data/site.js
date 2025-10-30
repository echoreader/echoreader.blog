const url =
  process.env.ELEVENTY_ENV === "production"
    ? "https://echoreader.blog"
    : "http://localhost:8080";

console.log("site.url:", process.env.ELEVENTY_ENV, "→", url);

module.exports = {
  url
};
