document.addEventListener("DOMContentLoaded", () =>
{
    const form = document.getElementById("resetForm");
    const input = document.getElementById("email-phone");
    const message = document.getElementById("message");
    const goLogin = document.getElementById("goLogin");

    if (!form || !input || !message || !goLogin) return;

    input.addEventListener("input", () =>
    {
        let value = input.value;

        if (/^\d+$/.test(value))
        {
            if (!value.startsWith("+880"))
            {
                input.value = "+880" + value;
            }

            input.value = input.value.replace(/^\+880\+880/, "+880");
        }

        if (value.endsWith("@"))
        {
            const domain = "gmail.com";
            input.value = value + domain;
            input.setSelectionRange(value.length, value.length);
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phonePattern = /^(\+880|0)?1[3-9][0-9]{8}$/;

        if (emailPattern.test(input.value) || phonePattern.test(input.value))
        {
            input.style.borderColor = "green";
        }
        else
        {
            input.style.borderColor = "red";
        }
    });

    form.addEventListener("submit", (e) =>
    {
        e.preventDefault();

        const value = input.value.trim();

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phonePattern = /^(\+880|0)?1[3-9][0-9]{8}$/;

        message.style.display = "block";

        if (emailPattern.test(value))
        {
            message.textContent = "A reset link has been sent to your email address.";
            message.style.color = "green";
            goLogin.style.display = "block";
        }
        else if (phonePattern.test(value))
        {
            message.textContent = "A reset link has been sent to your mobile number.";
            goLogin.style.display = "block";
        }
        else
        {
           message.textContent = "Please enter a valid email address or mobile number.";
            message.style.color = "red";
            goLogin.style.display = "none";
        }

        input.value = "";
        input.style.borderColor = "#ccc";
    });
});
