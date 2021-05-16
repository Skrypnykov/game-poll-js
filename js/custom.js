function GetIntRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function onClickSpin() {
    document.getElementById('buttons-animate').classList.toggle('animated');
    setTimeout(function () {
        handler()
    }, 1000);
}

function handler() {
    location.href = "pages/" + "page" + GetIntRandom(1, 16) + ".html";
}