const fs = require("fs");
const { minify_sync } = require("terser");

(async () => {
  const code = fs.readFileSync("bookmarklet.js", "utf8");
  const { code: minified } = minify_sync(code, {
    compress: {
      passes: 2,
    },
    format: {
      ascii_only: true,
      quote_style: 1,
    },
  });

  let html = fs.readFileSync("docs/index.html", "utf8");
  html = html.replace(
    /role="button" href="javascript:(?:[^"]+)"/,
    `role="button" href="javascript:${encodeURI(minified)}"`.replaceAll("$", "$$$$")
  );
  fs.writeFileSync("docs/index.html", html, "utf8");
})();
