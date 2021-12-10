/*-------------------|Variables|-------------------*/
let scrollElements


/*-------------------|Handle scroll|-------------------*/
function elementInView(el, offset = 0) {
    let elementTop = el.getBoundingClientRect().top

    return (elementTop <= $(window).innerHeight() - offset)
}

function elementOutOfView(el, offset) {
    let elementTop = el.getBoundingClientRect().top

    return (elementTop > $(window).innerHeight() - offset)
}

function displayScrollElement(el) {
    $(el).addClass("scrolled")
}

function hideScrollElement(el) {
    $(el).removeClass("scrolled")
}

function handleScrollAnimation() {
    scrollElements.forEach(element => {
        if (elementInView(element, 50)) {
            displayScrollElement(element)
        } else if (elementOutOfView(element, 10)) { //Fade out animation
            hideScrollElement(element)
        }
    })
}


/*-------------------|Events|-------------------*/
$(document).ready(function () {
    scrollElements = $(".js-scroll").toArray()

    $(window).on("scroll", function () {
        handleScrollAnimation()
    })
})