const codes = document.querySelectorAll('.code')

window.addEventListener("load", function () {
    window.scrollTo(0, 0)
});

codes.forEach((code, idx) => {
    code.addEventListener('keydown', (e) => {
        if (e.key >= 0 && e.key <= 9) {
            codes[idx].value = ''
            setTimeout(() => codes[idx + 1].focus(), 10)
        } else if (e.key === 'Backspace') {
            setTimeout(() => codes[idx - 1].focus(), 10)
        }
    })
})

// const form = document.getElementById('otp-form');
// form.addEventListener('submit', (event) => {
//     event.preventDefault(); // Prevent the default form submission behavior
//     let otpValues = '';
//     for (let i = 0; i < form.elements.length; i++) {
//         const otpInput = form.elements[i];
//         if (otpInput.type === 'number') {
//             otpValues += otpInput.value;
//         }
//     }
//     console.log(otpValues);
// });
