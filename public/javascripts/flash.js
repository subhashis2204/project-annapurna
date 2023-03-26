const crossBtn = document.querySelector('.cross')
const partial = document.querySelector('.partial')
crossBtn.addEventListener('click', function () {
    window.location.reload();
    partial.parentNode.removeChild(partial)
})
