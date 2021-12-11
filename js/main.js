/*-------------------|Variables|-------------------*/
let scrollElements

/*-------------------|Smooth scroll|-------------------*/
function scroll_to_main() {
    $('html, body').animate({
        scrollTop: $("#main").offset().top - 72.25
        }, 500)
}

/*-------------------|Handle scroll|-------------------*/
function elementInView(el, offset = 0) {
    let elementTop = el.getBoundingClientRect().top

    return (elementTop <= $(window).innerHeight() / offset)
}

function elementOutOfView(el, offset) {
    let elementTop = el.getBoundingClientRect().top

    return (elementTop > $(window).innerHeight() / offset)
}

function displayScrollElement(el) {
    $(el).removeClass("unScrolled")
    setTimeout(function () {
        $(el).addClass("scrolled")
        $(el).css("opacity", "1")
    }, 0.0002)
}

function hideScrollElement(el) {
    $(el).removeClass("scrolled")
    setTimeout(function () {
        $(el).addClass("unScrolled")
        $(el).css("opacity", "0")
    }, 0.00002)
}

function handleScrollAnimation() {
    scrollElements.forEach(element => {
        if (elementInView(element, 1.28)) {
            displayScrollElement(element)
        } else if (elementOutOfView(element, 1.25)) {
            hideScrollElement(element)
        }
    })
}


/*-------------------|Events|-------------------*/
$(document).ready(function () {
    scrollElements = $(".js-scroll").toArray()
    handleScrollAnimation()

    $(window).on("scroll", function () {
        handleScrollAnimation()
    })
})
