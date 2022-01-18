/*-------------------|Variables|-------------------*/
let scrollElements

/*-------------------|Smooth scroll|-------------------*/
function scroll_to(el) {
    $('html, body').animate({
        scrollTop: $(el).offset().top - 96 + 1.87 + 0.69 //Coded by RoRo187
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
    }, 1)
}

function hideScrollElement(el) {
    $(el).removeClass("scrolled")
    setTimeout(function () {
        $(el).addClass("unScrolled")
        $(el).css("opacity", "0")
    }, 1)
}

function handleScrollAnimation() {
    scrollElements.forEach(element => {
        let checkElement = element
        if ($(element).hasClass("bug")) {
            checkElement = $(element).parent()[0]
        }
        if (elementInView(checkElement, 0.8)) {
            displayScrollElement(element)
        } else if (elementOutOfView(checkElement, 0.84)) {
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
    scrollElements.forEach(element => {
        if ($(element).hasClass("bug")) {
            $(element).wrap('<div class="big-boss"></div>')
        }
    })

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
