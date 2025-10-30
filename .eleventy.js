const site = require('./src/_data/site.js');

module.exports = function(eleventyConfig) {

eleventyConfig.addFilter('toAbsoluteUrl', function (url) {
    try {
      return new URL(url, site.baseUrl).href;
    } catch (err) {
      console.error(err);
      return url;
    }
  });

  eleventyConfig.addPassthroughCopy("src/assets");

  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/posts/*.md");
  });

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

eleventyConfig.addPassthroughCopy({ "src/sitemaps": "/" });

eleventyConfig.addCollection("post", function (collectionApi) {
  return collectionApi.getFilteredByGlob("src/posts/*.md");
});


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
