/* JavaScript Helper to inject body.in-iframe class when loaded within an iframe */

(function() {
    function checkIframe() {
        if (window.self !== window.top) {
            document.body.classList.add('in-iframe');
        }
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', checkIframe);
    } else {
        checkIframe();
    }
})();
