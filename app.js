const link = document.querySelector('#link')
const generateBtn = document.querySelector('#generateLink')
const copyBtn = document.querySelector('#copyLink')

addEventListeners();

function addEventListeners() {
    generateBtn.addEventListener('click', () => {
        if(copyBtn.style.display && copyBtn.style.display !== "none") {
            copyBtn.style.display = "none"
            generateBtn.innerHTML = "Generate Link"
            link.value = null
            return 
        }
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 1) {
                link.disabled = true
                link.value = "Shortning... Please wait!"
            }
            if (this.readyState == 4 && this.status == 201) {
                const result = JSON.parse(this.response)
                showShortLink(result.result.full_short_link2)
                link.disabled = false
            }
        };
        xhttp.open("GET", "https://api.shrtco.de/v2/shorten?url=" + link.value, true);
        xhttp.send();
    })
    copyBtn.addEventListener('click', () => {
        link.select();
        document.execCommand('copy')
    })
}

function showShortLink(shortLink) {
    link.value = shortLink
    copyBtn.style.display = "block"
    generateBtn.innerHTML = "Generate More"
}