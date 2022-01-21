var energy = 0
var energypersecond = 0
var clickValue = 1
var saveCount = 60
var curSaveCount = 0
var energysound
var buysound = "sounds/Buy.mp3"
var opensound = "sounds/Open.mp3"
var items = []
var opened = []
opened["shop"] = false
opened["upgrade"] = false
var d = new Date()
d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000))
var expires = "expires=" + d
var BGMusicB = false
var sounds = true
var soundToAdd

function gameManager() {
    energy += energypersecond / 10
    if (saveCount <= curSaveCount) {
        save();
        curSaveCount = 0
    } else {
        curSaveCount += 3
    }
    $("#energyScore").text("Energy: " + beautify(energy))
    $("#energyPerSecond").text("EPS: " + beautify(energypersecond))
    $("#energyPerClick").text("EPC: " + beautify(clickValue))
    setTimeout(gameManager, 100)
}

function BG_music() {
    if (BGMusicB == true) {
        $("#BGMSound").prop("muted", false)
        $("#BGMSound").prop("autoplay", true)
    } else {
        $("#BGMSound").prop("muted", true)
    }
    document.getElementById("BGMSound").play()
    $("#BGMSound").prop("volume", $("#BGMSlider").val()/1000)
    setTimeout(BG_music, 100)
}

function tabTitle() {
    $("#tabTitle").innerHTML = beautify(energy) + " - Solar Clicker"
    setTimeout(tabTitle, 3000)
}

function addCookiesPerSecond(add) {
    energypersecond += add
    $("#energyPerSecond").innerHTML = "EPS: " + beautify(energypersecond)
}

function addCookies(add) {
    energy += add;
    $("#energyScore").innerHTML = "Energy: " + beautify(energy)
}

function sound(src, volume) {
    if (sounds == true) {
        soundToAdd = document.createElement("audio")
        soundToAdd.src = src
        soundToAdd.setAttribute("reload", "auto")
        soundToAdd.setAttribute("contorls", "none")
        soundToAdd.style.display = "none"
        soundToAdd.volume = volume
        soundToAdd.play()
    }
}

//Open, close
function open_close(value) {
    if (opened[value] == false) {
        $("#" + value).css("visibility", "visible")
        opened[value] = true
    } else {
        $("#" + value).css("visibility", "hidden")
        opened[value] = false
    }

    sound(opensound, 0.5)
}

function shop(name, price) {
    items[name + "Price"] = parseFloat(price)
    items[name + "Owned"] = parseFloat($("#productOwned" + name).text())
    let cur_price = items[name + "Price"] * Math.pow(1.2, items[name + "Owned"])
    if (energy >= cur_price) {
        energy -= cur_price
        addCookiesPerSecond(price / 35)
        items[name + "Owned"] += 1
        $("#productOwned" + name).text(items[name + "Owned"])
        cur_price *= 1.2
        $("#productPrice" + name).text(beautify(cur_price))
        document.cookie = name.toLowerCase() + "=" + items[name + "Owned"] + ";" + expires + ";path=/"

        sound(buysound, 0.2)
        save();
    }
}

function upgrade(name, price) {
    items[name + "Price"] = parseInt(price);
    items[name + "Owned"] = parseInt($("#upgradeOwned" + name).text())
    let cur_price = items[name + "Price"] * Math.pow(3.5, items[name + "Owned"])
    if (energy >= cur_price) {
        energy -= cur_price
        clickValue *= 3
        items[name + "Owned"] += 1
        $("#upgradeOwned" + name).text(items[name + "Owned"])
        cur_price *= 3.5
        $("#upgradePrice" + name).text(beautify(cur_price))
        document.cookie = name.toLowerCase() + "=" + items[name + "Owned"] + ";" + expires + ";path=/"

        sound(buysound, 0.2)
        save();
    }
}

function save() {
    document.cookie = "energy=" + energy + ";" + expires + ";path=/"
    document.cookie = "energypersecond=" + energypersecond + ";" + expires + ";path=/"
}

function load() {
    var upgradesName = ["DoubleClick"]
    var upgradesPrice = []
    for (i = 0; i < upgradesName.length; i++) {
        upgradesPrice[i] = $("#upgradePrice" + upgradesName[i]).text()
    }
    var shopsName = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"]
    var shopsPrice = []
    for (i = 0; i < shopsName.length; i++) {
        shopsPrice[i] = $("#productPrice" + shopsName[i]).text()
    }

    var savedUpgrades = []
    for (i = 0; i < upgradesName.length; i++) {
        savedUpgrades[i] = 0
    }
    var savedShops = []
    for (i = 0; i < shopsName.length; i++) {
        savedShops[i] = 0
    }
    var savedCookies = [0, 0]
    var saved = [savedUpgrades,
        savedShops,
        savedCookies]

    var upgradeList = []
    for (i = 0; i < upgradesName.length; i++) {
        upgradeList[i] = upgradesName[i].toLowerCase() + "="
    }
    var shopList = [];
    for (i = 0; i < shopsName.length; i++) {
        shopList[i] = shopsName[i] + "="
    }
    var cookieList = ["energy=", "energypersecond="]
    var list = [upgradeList,
        shopList,
        cookieList]

    for (var y = 0; y < 3; y++) {
        for (var j = 0; j <= list[y].length; j++) {
            var name = list[y][j];
            var decodedCookie = decodeURIComponent(document.cookie)
            var ca = decodedCookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i]
                while (c.charAt(0) == ' ') {
                    c = c.substring(1)
                }
                if (c.indexOf(name) == 0) {
                    var ch = c.substring(name.length, c.length)
                    saved[y][j] = ch
                }
            }
        }
    }

    energy = parseFloat(saved[2][0])
    energypersecond = parseFloat(saved[2][1])

    for (z = 0; z < upgradesName.length; z++) {
        overwrite("upgradeOwned" + upgradesName[z], (parseFloat(saved[0][z])))
        overwrite("upgradePrice" + upgradesName[z], beautify(upgradesPrice[z] * Math.pow(3.5, parseFloat(saved[0][z]))))
        if (parseFloat(saved[0][z]) != 0) {
            clickValue = Math.pow(3, parseFloat(saved[0][z]))
        } else {
            clickValue = 1
        }
    }

    for (z = 0; z < shopsName.length; z++) {
        overwrite("productOwned" + shopsName[z], (parseFloat(saved[1][z])))
        overwrite("productPrice" + shopsName[z], beautify(shopsPrice[z] * Math.pow(1.2, parseFloat(saved[1][z]))))
    }
}

function overwrite(id, value) {
    $("#" + id).text(value)
}

function beautify(number) {
    if (number < Math.pow(10, 3)) {
        return Math.round(number)
    } else if (number < Math.pow(10, 6)) {
        number /= Math.pow(10, 3)
        return Math.round(number * 100) / 100 + " Tsd"
    } else if (number < Math.pow(10, 9)) {
        number /= Math.pow(10, 6)
        return Math.round(number * 100) / 100 + " Mio"
    } else if (number < Math.pow(10, 12)) {
        number /= Math.pow(10, 9)
        return Math.round(number * 100) / 100 + " Mrd"
    } else if (number < Math.pow(10, 15)) {
        number /= Math.pow(10, 12)
        return Math.round(number * 100) / 100 + " Bio"
    } else if (number < Math.pow(10, 18)) {
        number /= Math.pow(10, 15)
        return Math.round(number * 100) / 100 + " Brd"
    } else if (number < Math.pow(10, 21)) {
        number /= Math.pow(10, 18)
        return Math.round(number * 100) / 100 + " Trl"
    } else if (number < Math.pow(10, 24)) {
        number /= Math.pow(10, 21)
        return Math.round(number * 100) / 100 + " Trd"
    } else if (number < Math.pow(10, 27)) {
        number /= Math.pow(10, 24)
        return Math.round(number * 100) / 100 + " Quadrillion"
    } else if (number < Math.pow(10, 30)) {
        number /= Math.pow(10, 27)
        return Math.round(number * 100) / 100 + " Quadrilliarde"
    } else if (number < Math.pow(10, 33)) {
        number /= Math.pow(10, 30)
        return Math.round(number * 100) / 100 + " Quintillion"
    } else if (number < Math.pow(10, 36)) {
        number /= Math.pow(10, 33)
        return Math.round(number * 100) / 100 + " Quintilliarde"
    } else if (number < Math.pow(10, 39)) {
        number /= Math.pow(10, 36)
        return Math.round(number * 100) / 100 + " Sextillion"
    } else if (number < Math.pow(10, 42)) {
        number /= Math.pow(10, 39)
        return Math.round(number * 100) / 100 + " Sextilliarde"
    } else if (number < Math.pow(10, 45)) {
        number /= Math.pow(10, 42)
        return Math.round(number * 100) / 100 + " Septillion"
    } else if (number < Math.pow(10, 48)) {
        number /= Math.pow(10, 45)
        return Math.round(number * 100) / 100 + " Septiliiarde"
    } else {
        return Math.round(number).toString().replace("e", " Shush")
    }
}

load()
tabTitle()
gameManager()

//Secret
$("#secret").on("click", function () {
    energy += Math.pow(10, 5)
});

//Cookie
$("#solarcell").on("click", function () {
    addCookies(clickValue);
    ran = Math.floor(Math.random() * 3);
    switch (ran) {
        case 0:
            energysound = "sounds/Solarcell1.mp3"
            break
        case 1:
            energysound = "sounds/Solarcell2.mp3"
            break
        case 2:
            energysound = "sounds/Solarcell3.mp3"
            break
        default:
            break
    }

    sound(energysound, 0.6)
});

$("#BGMusicB").on("click", function () {
    if (BGMusicB == false) {
        $("#BGMusicB").css("color", "white")
        BGMusicB = true
        BG_music()
    } else {
        $("#BGMusicB").css("color", "#545454")
        BGMusicB = false
        BG_music()
    }
});

$("#soundB").on("click", function () {
    if (sounds == false) {
        $("#soundB").css("color", "white")
        sounds = true
    } else {
        $("#soundB").css("color", "#545454")
        sounds = false
    }
});
