module.exports = function(data) {
  const posts = (data.collections?.posts || []);
  console.log("Blog schema posts count:", posts.length);

  const blogPosts = posts.map(post => {
    const date = new Date(post.date);
    return {
      "@type": "BlogPosting",
      headline: post.data.title,
      url: "https://echoreader.blog" + post.url,
      datePublished: date.toISOString().split("T")[0]
    };
  });

  const schema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "EchoReader",
    url: "https://echoreader.blog/blog/",
    description: "Modular blog about scalable SEO strategies and technical audits.",
    blogPost: blogPosts
  };

  return {
    schema: JSON.stringify(schema, null, 2)
  };
};
