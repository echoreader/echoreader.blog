module.exports = function(eleventyConfig) {
  // 🔧 Absolute URL filter (no external dependency)
  const isProd = process.env.ELEVENTY_ENV === 'production';
  const baseUrl = isProd ? 'https://echoreader.blog' : 'http://localhost:8080';

  eleventyConfig.addFilter('toAbsoluteUrl', function(url) {
    try {
      //return new URL(url, baseUrl).href; 
      return new URL(url, 'https://echoreader.blog').href;
    } catch (err) {
      console.error("toAbsoluteUrl error:", err);
      return url;
    }
  });

  eleventyConfig.addFilter('myText', function() {
    return "🔥 Echo Reader is live and modular!";
  });

  // 🔧 Passthrough
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy({ "src/sitemaps": "/" });
  eleventyConfig.addPassthroughCopy("src/robots.txt");

  // 🔧 Collections
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/posts/*.md");
  });

  eleventyConfig.addCollection("post", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/posts/*.md");
  });

  // 🔧 Filters
  eleventyConfig.addFilter("date", function(value) {
    const date = new Date(value);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  });

  const { DateTime } = require("luxon");
  eleventyConfig.addFilter("readableDate", (dateObj, formatStr = "dd MMMM yyyy") => {
    return DateTime.fromJSDate(dateObj).toFormat(formatStr);
  });

  eleventyConfig.addFilter("contains", (str, substr) => {
    return str && str.includes(substr);
  });

  // 🔧 Config
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "../_includes",
      data: "../_data"
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk"
  };
};
