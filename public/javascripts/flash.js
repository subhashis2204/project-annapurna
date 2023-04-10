const crossBtn = document.querySelector('.cross')
const partial = document.querySelector('.partial')
crossBtn.addEventListener('click', function () {
    partial.parentNode.removeChild(partial)
})
