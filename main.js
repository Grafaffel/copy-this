const copy = (text) => {
    navigator.clipboard.writeText(text)

    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
};

const codeblock = document.getElementById('code-preview');
const toast = document.querySelector('.toast');
const createModal = document.getElementById('create-dialog');
const create = document.getElementById('save');
const codeInput = document.getElementById('code-input');

const urlParams = new URLSearchParams(window.location.search);

let text = urlParams.get('text')
let url

text = text.replace("%20", ' ');
text = text.replace("%2", '/');
text = text.replace("\\n", `
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
codeblock.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    createModal.showModal()
    codeInput.value = text;
    codeInput.focus();
});

createModal.addEventListener('close', () => {
    text = url;
    lang = urlParams.get('lang');
    if (lang) {
        codeblock.innerHTML = hljs.highlight(
            text,
            { language: lang }
        ).value

        location.href = location.href.split('?')[0] + `?text=${url}&lang=${lang}`;
    } else {
        codeblock.innerText = text || 'Add ?text=your-text to copy some text!';
    }
});

codeInput.addEventListener('input', (e) => {
    url = e.target.value;
    url = url.replace(' ', '%20');
    url = url.replace('+', '%2B');
    url = url.replace('/', '%2F');
    url = url.replace('\\n', '%0A');
    url = url.replace('\n', '%0A');
    url = url.replace('\r', '%0D');
    url = url.replace('\t', '%09');
    url = url.replace('#', '%23');
    url = url.replace('&', '%26');
    url = url.replace('=', '%3D');
    url = url.replace('?', '%3F');
    url = url.replace('@', '%40');
});