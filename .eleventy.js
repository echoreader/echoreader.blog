module.exports = function(eleventyConfig) {
  const site = require("./src/_data/site.js");

  eleventyConfig.addFilter('toAbsoluteUrl', function(url) {
    try {
      return new URL(url, "https://echoreader.blog").href;
      //return new URL(url, site.url).href;
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
  // Ambil semua posts, filter yang punya date, lalu urutkan descending
  const posts = collectionApi.getFilteredByGlob("src/posts/*.md")
    .filter(post => post.date)
    .sort((a, b) => b.date - a.date);

  // Tambahkan prev/next ke setiap post
    return posts.map((post, index) => {
      post.data.prev = index < posts.length - 1 ? posts[index + 1] : null; // karena descending, prev = lebih baru
      post.data.next = index > 0 ? posts[index - 1] : null; // next = lebih lama
      return post;
    });
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