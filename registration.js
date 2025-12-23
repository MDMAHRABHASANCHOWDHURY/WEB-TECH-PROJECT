document.addEventListener("DOMContentLoaded", () =>
{

    const form = document.getElementById("registrationForm");
    const nameInput = document.getElementById("full-name");
    const phoneInput = document.getElementById("phone");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirm-password");
    const termsCheckbox = document.getElementById("terms");

    const nameRegex = /^[A-Za-z\s]+$/;
    const phoneRegex = /^\+8801[3-9]\d{8}$/;
    const passwordRegex = /^(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    function showMessage(input, message, color = "red") 
    {
        let msg = input.parentElement.querySelector(".inline-msg");
        if (!msg) 
        {
            msg = document.createElement("small");
            msg.className = "inline-msg";
            input.parentElement.appendChild(msg);
        }
        msg.textContent = message;
        msg.style.color = color;
    }

    function clearMessage(input) 
    {
        const msg = input.parentElement.querySelector(".inline-msg");
        if (msg) msg.textContent = "";
    }

    phoneInput.addEventListener("input", () => 
        {
        let value = phoneInput.value.replace(/\D/g, "");

        if (!value.startsWith("880")) 
        {
            value = "880" + value.replace(/^0+/, "");
        }

        value = value.slice(0, 13);
        phoneInput.value = "+" + value;

        if (!phoneRegex.test(phoneInput.value)) 
        {
            showMessage(phoneInput, "Enter a valid Bangladeshi number");
        } 
        else 
        {
            clearMessage(phoneInput);
        }
    });

    passwordInput.addEventListener("input", () => 
    {
        if (!passwordRegex.test(passwordInput.value))
            {
            showMessage
            (
                passwordInput,
                "Min 8 chars, 1 number & 1 special character"
            );
        } 
        else 
        {
            showMessage(passwordInput, "Strong password", "green");
        }
    });

    confirmPasswordInput.addEventListener("input", () => 
    {
        if (confirmPasswordInput.value !== passwordInput.value) 
        {
            showMessage(confirmPasswordInput, "Passwords do not match");
        } 
        else 
        {
            showMessage(confirmPasswordInput, "Passwords match", "green");
        }
    });

    document.querySelectorAll(".toggle-password").forEach(icon => 
    {
        icon.addEventListener("click", () => 
        {
            const input = document.getElementById(icon.dataset.target);
            input.type = input.type === "password" ? "text" : "password";
        });
    });

    form.addEventListener("submit", function (e) 
    {
        e.preventDefault();

        const role = document.querySelector('input[name="role"]:checked');

        if (!nameRegex.test(nameInput.value.trim())) 
        {
            alert("Name can contain only letters and spaces.");
            return;
        }

        if (!phoneRegex.test(phoneInput.value)) 
        {
            alert("Enter a valid phone number starting with +880.");
            return;
        }

        if (!passwordRegex.test(passwordInput.value)) 
        {
            alert("Password does not meet security requirements.");
            return;
        }

        if (passwordInput.value !== confirmPasswordInput.value) 
        {
            alert("Passwords do not match.");
            return;
        }

        if (!role) 
        {
            alert("Please select a role.");
            return;
        }

        if (!termsCheckbox.checked) 
        {
            alert("You must accept the Terms & Conditions.");
            return;
        }

        const popupWidth = 450;
        const popupHeight = 300;
        const left = (screen.width - popupWidth) / 2;
        const top = (screen.height - popupHeight) / 2;

        const popup = window.open
        (
            `registration-popup.html?role=${role.value}`,
            "Registration Confirmation",
            `width=${popupWidth},height=${popupHeight},top=${top},left=${left}`
        );

        if (popup) 
        {
            window.close();
        }
    });

});
