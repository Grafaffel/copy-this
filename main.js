const copy = (text) => {
    navigator.clipboard.writeText(text)

    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
};

const codeblock = document.querySelector('code');
const toast = document.querySelector('.toast');

const urlParams = new URLSearchParams(window.location.search);
let text = urlParams.get('text');

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