/*-------------------|Variables|-------------------*/
let scrollElements

/*-------------------|Smooth scroll|-------------------*/
function scroll_to_main() {
    $('html, body').animate({
        scrollTop: $("#main").offset().top - 96 + 1.87 + 0.69 //Coded by RoRo187
    }, 500)
}

/*-------------------|Handle scroll|-------------------*/
function elementInView(el, offset = 0) {
    let elementTop = el.getBoundingClientRect().top

    return (elementTop <= $(window).innerHeight() * offset)
}

function elementOutOfView(el, offset) {
    let elementTop = el.getBoundingClientRect().top

    return (elementTop > $(window).innerHeight() * offset)
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
        if (elementInView(element, 0.90)) {
            displayScrollElement(element)
        } else if (elementOutOfView(element, 0.90)) {
            hideScrollElement(element)
        }
    })
}

/*-------------------| Fold section|-------------------*/
function Fold(container, img) {
    if ($(container).height()) {
        $(container).css('max-height', 0)
        img.src = "images/expand.svg"
    } else {
        $(container).css('max-height', container.scrollHeight)
        img.src = "images/collapse.svg"
    }
}

/*-------------------|Events|-------------------*/
$(document).ready(function () {
    scrollElements = $(".js-scroll").toArray()
    handleScrollAnimation()

    $(window).on("scroll", function () {
        handleScrollAnimation()
    })

    //Coded by COckyChris (aMaZioNg) PS: Please GivE thIS proJecT a Staar ╰(*°▽°*)╯
    sHushi()
    function sHushi() {
        setTimeout(function () {
            handleScrollAnimation()
            sHushi()
        }, 0.2)
    }
})
