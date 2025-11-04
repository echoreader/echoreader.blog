module.exports = function(eleventyConfig) {
  // 🔧 Absolute URL filter (no external dependency)
  //const isProd = process.env.ELEVENTY_ENV === 'production';
  //const baseUrl = isProd ? 'https://echoreader.blog' : 'http://localhost:8080';

  const site = require("./src/_data/site.js");

  eleventyConfig.addFilter('toAbsoluteUrl', function(url) {
    try {
      //return new URL(url, site.url).href; 
      //return new URL(url, baseUrl).href; 
      return new URL(url, 'https://echoreader.blog').href;
    } catch (err) {
      console.error("toAbsoluteUrl error:", err);
      return url;
    }
  });

  eleventyConfig.addShortcode("link", function (path, text, target = "_self", rel = "") {
  try {
    const href = new URL(path, site.url).href;
    let attrs = [`href="${href}"`, `target="${target}"`];
    if (rel) attrs.push(`rel="${rel}"`);
    return `<a ${attrs.join(" ")}>${text}</a>`;
  } catch (err) {
    console.error("link shortcode error:", err);
    return text;
  }
});

  // 🔧 Passthrough
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy({ "src/sitemaps": "/" });
  eleventyConfig.addPassthroughCopy("src/robots.txt");
  eleventyConfig.addPassthroughCopy("src/ads.txt");
  eleventyConfig.addPassthroughCopy({"src/favicon.ico": "favicon.ico" });

  // 🔧 Collections
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/posts/*.md")
    .filter(post => post.date) // pastikan ada date
    .sort((a, b) => b.date - a.date); // descending
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

  eleventyConfig.addFilter("rfc3339", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toISO();
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
    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk"
  };
};
