import express, { json } from "express";
import { launch } from "puppeteer";
import cors from "cors";
import { marked } from "marked";
import hljs from "highlight.js";

const app = express();
const port = 3001;

// Enable CORS to allow requests from your React app
app.use(cors());

// Middleware to parse JSON bodies
app.use(json());

const renderer = new marked.Renderer();

// Customize the marked renderer to use highlight.js for syntax highlighting
renderer.code = function (code, language) {
	const highlighted = hljs.highlightAuto(code).value;
	return `<pre><code class="hljs ${language} ">${highlighted}</code></pre>`;
};

marked.setOptions({ renderer });

// Endpoint to convert Markdown to PDF
app.post("/convert-to-pdf", async (req, res) => {
try {
	const { markdownContent } = req.body;
	if (!markdownContent) {
		return res.status(400).send("Markdown content is required");
	}

	const htmlContent = marked(markdownContent);

	const browser = await launch({ args: ["--no-sandbox"] });
	const page = await browser.newPage();

	// Inject the CSS into the page

	await page.setContent(
		`<html><head></head><body>${htmlContent}</body></html>`,
		{ waitUntil: "load" }
	);
	await page.addStyleTag({ path: "server/github-dark.css" });
	await page.addScriptTag({ url: 'https://polyfill.io/v3/polyfill.min.js?features=es6' });
	await page.addScriptTag({
		url: 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js',
		id: 'MathJax-script',
		async: true
	});

	const pdf = await page.pdf({
		format: "A4",
		printBackground: true,
		preferCSSPageSize: true,
		margin: {
			top: `1in`,
			right: `1in`,
			bottom: `1in`,
			left: `1in`
		}
	});

	await browser.close();

	res.setHeader("Content-Type", "application/pdf");
	res.send(pdf);
} catch (err) {
	console.error(err);
	res.status(500).send("Error converting Markdown to PDF");
}
});

// Start the server
app.listen(port, () => {
console.log(`Server running on port ${port}`);
});
