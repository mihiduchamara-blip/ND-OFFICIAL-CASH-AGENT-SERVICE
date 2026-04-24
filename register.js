document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registration-form');
    if (!form) return;

    const email = document.getElementById('email');
    const mobileNumber = document.getElementById('mobileNumber');
    const whatsappNumber = document.getElementById('whatsappNumber');
    const recaptchaVerify = document.getElementById('recaptchaVerify');
    const successOverlay = document.getElementById('success-overlay');

    // Advanced Feature: Auto-generate unique Customer ID
    const generateCustomerId = () => {
        const randomNum = Math.floor(1000 + Math.random() * 9000);
        return `ND-${randomNum}`;
    };

    const customerIdInput = document.getElementById('customer-id');
    const customerId = generateCustomerId();
    if (customerIdInput) customerIdInput.value = customerId;

    // Sri Lankan Mobile Number Validation Pattern
    // Allows 07X XXX XXXX or +947X XXX XXXX with optional spaces
    const slPhoneRegex = /^(?:0|(?:\+94))[7][0-9](?:\s?[0-9]{3}){2}$/;

    const validateInput = (input, regex) => {
        const value = input.value.replace(/\s+/g, '');
        if (value === "") return true; // Handled by 'required' attribute if needed
        return regex.test(value);
    };

    const setError = (element, isError) => {
        const group = element.closest('.form-group') || element.closest('.recaptcha-container');
        if (isError) {
            group.classList.add('has-error');
        } else {
            group.classList.remove('has-error');
        }
    };

    // Live validation for Phone Fields
    mobileNumber.addEventListener('input', () => {
        if(mobileNumber.value) setError(mobileNumber, !validateInput(mobileNumber, slPhoneRegex));
    });

    whatsappNumber.addEventListener('input', () => {
        if(whatsappNumber.value) setError(whatsappNumber, !validateInput(whatsappNumber, slPhoneRegex));
        else setError(whatsappNumber, false); // optional
    });

    // Form Submission Event
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;

        // Reset errors
        document.querySelectorAll('.has-error').forEach(el => el.classList.remove('has-error'));

        // Check required constraints natively
        const requiredElements = form.querySelectorAll('[required]');
        requiredElements.forEach(el => {
            if (!el.value || (el.type === 'checkbox' && !el.checked)) {
                setError(el, true);
                isValid = false;
            }
        });

        // Custom validation check
        if (!validateInput(mobileNumber, slPhoneRegex)) {
            setError(mobileNumber, true);
            isValid = false;
        }

        if (whatsappNumber.value && !validateInput(whatsappNumber, slPhoneRegex)) {
            setError(whatsappNumber, true);
            isValid = false;
        }

        if (!isValid) {
            // Scroll to the first error smoothly
            const firstError = document.querySelector('.has-error');
            if(firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }

        // --- Simulate Submission Process --- //
        const submitBtn = document.getElementById('btn-submit-registration');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing...';
        submitBtn.disabled = true;

        // Here is where it would push to Gravity Forms Webhook or EmailJS
        // e.g. fetch('https://your-wp-site.com/wp-json/gf/v2/forms/1/submissions', {...})
        
        setTimeout(() => {
            // Display success redirect/modal
            document.getElementById('display-custom-id').textContent = customerId;
            successOverlay.style.display = 'flex';
            successOverlay.style.opacity = '0';
            
            // Trigger animation
            requestAnimationFrame(() => {
                successOverlay.style.transition = 'opacity 0.4s ease';
                successOverlay.style.opacity = '1';
            });
            
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
});
