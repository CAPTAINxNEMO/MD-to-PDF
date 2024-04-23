import React, { useEffect, useRef, useState } from "react";
import "./markdown.css";
import "highlight.js/styles/github-dark.css";
import hljs from "highlight.js";
import { marked } from "marked";

const renderer = new marked.Renderer();
const MathJax = window.MathJax;

renderer.code = function (code, language) {
    const highlighted = hljs.highlightAuto(code).value;
    return `<pre><code class="hljs ${language} ">${highlighted}</code></pre>`;
};

marked.setOptions({ renderer });
const Markdown = () => {
    const [text, setText] = useState("");
    const [markdown, setMarkdown] = useState("");
    const htmlPreviewRef = useRef(null);

    const handleChange = (event) => {
    setText(event.target.value);
    setMarkdown(marked(event.target.value));
    };

    useEffect(() => {
        if (htmlPreviewRef.current) {
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = markdown;
            MathJax.typesetPromise([tempDiv]).then(() => {
                htmlPreviewRef.current.innerHTML = tempDiv.innerHTML;
            }).catch((err) => {
                console.error(err.message);
            });
        }
    }, [markdown]);

    const handleKeyDown = (event) => {
        if (event.key === "Tab") {
            event.preventDefault();
            const start = event.target.selectionStart;
            const end = event.target.selectionEnd;
            const value = event.target.value;
            setText(value.substring(0, start) + " ".repeat(4) + value.substring(end));
            event.target.selectionStart = event.target.selectionEnd = start + 4;
        }
    };

    const convertToPdf = async () => {
        try {
            const response = await fetch('http://localhost:3001/convert-to-pdf', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ markdownContent: markdown }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'document.pdf');
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className = "flex flex-col justify-center items-center h-screen">
            <div className = "edit-assignment-container rounded-md text-white bg-secondary">
                <textarea className = "markdown-editor bg-secondary p-3" placeholder = "Edit" autoFocus value = {text} onChange = {handleChange} onKeyDown = {handleKeyDown}></textarea>
                <div ref = {htmlPreviewRef} className = "html-preview bg-white text-black" dangerouslySetInnerHTML = {{ __html: markdown }}></div>
            </div>
            <div className = "button-container md-4">
                <button onClick = {convertToPdf} className = "bg-secondary text-white hover:text-primary px-10 py-4 rounded-md transform translate-y-[-30px]">Convert to PDF</button>
            </div>
        </div>
    )
}

export default Markdown
