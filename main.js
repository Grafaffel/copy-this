const copy = (text) => {
    navigator.clipboard.writeText(text)

    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
};

const codeblock = document.querySelector('code');
const toast = document.querySelector('.toast');

const urlParams = new URLSearchParams(window.location.search);
const URLtoText = urlParams.get('url');

if (URLtoText) {
    const url = fetch(URLtoText, {
        method: 'GET',
        headers: {
            'Referer': 'https://www.google.com/',
            'Content-Type': 'text/plain',
            'Access-Control-Allow-Origin': '*',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
        },

    }).then(res => res.text());
}

let text = urlParams.get('text') || url;

text = text.replace("%20", ' ');
text = text.replace("%2", '/');
text = text.replace("\n", `
`);

let lang = urlParams.get('lang');
if (lang) {
    codeblock.innerHTML = hljs.highlight(
        text,
        { language: lang }
    ).value
} else {
    codeblock.innerText = text || 'Add ?text=your-text to copy some text!';
}

copy(text);
codeblock.addEventListener('click', () => copy(text));