const script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
script.type = 'text/javascript';
script.onload = function () {
    $(document).ready(function () {
        const token = localStorage.getItem('jwtToken');

        if (token) {
            const bearerToken = 'Bearer ' + token;
            const authorizeInput = document.querySelector('input[type="text"][placeholder="Bearer <token>"]');
            if (authorizeInput) {
                authorizeInput.value = bearerToken;
                authorizeInput.parentElement.querySelector('button').click();
            }
        }

        $(document).ajaxComplete(function (event, xhr, settings) {
            if (settings.url.includes("login")) {
                try {
                    const response = JSON.parse(xhr.responseText);
                    if (response.token) {
                        localStorage.setItem('jwtToken', response.token);
                        const bearerToken = 'Bearer ' + response.token;

                        const authorizeInput = document.querySelector('input[type="text"][placeholder="Bearer <token>"]');
                        if (authorizeInput) {
                            authorizeInput.value = bearerToken;
                            authorizeInput.parentElement.querySelector('button').click();
                        }
                    }
                } catch (e) {
                    console.error("Token kaydedilemedi. Yanıt düzgün mü?", e);
                }
            }
        });
    });
};
document.head.appendChild(script);
