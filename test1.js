function myfunc() {
    const element1 = document.querySelector('.outer')
    const element2 = document.querySelector('.inner')
    const h1 = $(element1).outerHeight()
    const h2 = $(element2).outerHeight()
    console.log(h1, h2)
    console.log(element2)
    console.log(`translateY(-${(h2 - h1) / 2}px)`)


    // element2.style.tranform = `translateY(-${(h2 - h1) / 2}px)`
    // $(element2).css('transform', `translateY(${(h2 - h1) / 2}px)`)
}
