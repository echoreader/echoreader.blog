const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '_site');

fs.rm(dir, { recursive: true, force: true }, (err) => {
  if (err) {
    console.error("Failed to delete _site:", err);
  } else {
    console.log("_site folder deleted.");
  }
});
