module.exports = function(eleventyConfig) {
  const site = require("./src/_data/site.js");

  eleventyConfig.addFilter("toAbsoluteUrl", function(url) {
    const safeUrl = url.startsWith("/") ? url : "/" + url;
    return "https://echoreader.blog" + safeUrl;
  });

  // Filter untuk ekstrak FAQ dari konten HTML
  eleventyConfig.addFilter("extractFAQSchema", function(content) {
    if (!content) return '';
    
    const questions = [];
    
    // Regex untuk menangkap <details> blocks
    const detailsRegex = /<details>\s*<summary>(.*?)<\/summary>\s*(.*?)<\/details>/gs;
    let match;
    
    while ((match = detailsRegex.exec(content)) !== null) {
      const question = match[1]
        .replace(/<[^>]+>/g, '') // hapus HTML tags
        .replace(/&quot;/g, '"')  // decode HTML entities
        .replace(/&amp;/g, '&')
        .replace(/&#39;/g, "'")
        .replace(/\*\*/g, '')     // hapus markdown bold
        .trim();
      
      const answer = match[2]
        .replace(/<[^>]+>/g, '')  // hapus HTML tags
        .replace(/&quot;/g, '"')
        .replace(/&amp;/g, '&')
        .replace(/&#39;/g, "'")
        .replace(/\*\*/g, '')
        .trim();
      
      if (question && answer) {
        questions.push({ question, answer });
      }
    }
    
    if (questions.length === 0) return '';
    
    // Generate JSON-LD
    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": questions.map(item => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer
        }
      }))
    };
    
    return `<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>`;
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