document.addEventListener('contextmenu', event => event.preventDefault());

document.onkeydown = function(e) {

    if (e.keyCode == 123) {
        window.location.href = "https://www.google.com";
        return false;
    }

    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
        window.location.href = "https://www.google.com";
        return false;
    }

    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
        window.location.href = "https://www.google.com";
        return false;
    }

    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
        window.location.href = "https://www.google.com";
        return false;
    }
};

setInterval(function() {
    const startTime = performance.now();
    debugger;
    const endTime = performance.now();

    if (endTime - startTime > 100) {
        window.location.href = "https://www.google.com";
    }
}, 1000);

