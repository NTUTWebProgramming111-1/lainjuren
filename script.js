var allData = []
var currentChap = 0;

$(document).ready(function () {
    d3.text("data.csv", function (data) {
        var parsedCSV = d3.csv.parseRows(data)

        for (var i = 0; i < parsedCSV.length; i++) {

            var data = {
                chapter: parsedCSV[i][0],
                page: parsedCSV[i][1],
            }

            allData.push(data)
        }

        let local = localStorage.getItem("c")
        showComic(local ? local : null);
    })


    $("#chapter").change(function () {
        var v = this.value
        l = allData.length + 1
        if (v >= 1 && v <= l)
            showComic(v)
    });

    $("#previous").click(function () {
        showComic(null, "previous")
    });

    $("#next").click(function () {
        showComic(null, "next")
    });

    const isMobile = navigator.userAgentData.mobile; //resolves true/false
    if (isMobile) {
        $("#nav ").css('height', '3%');
        $(".containeer ").css('margin', '0px');
        $(".containeer ").css('padding-top', '90px');
    }
})


function showComic(chap, move) {
    if (move == null) {
        chap = (chap == null) ? allData[allData.length - 1] : allData[chap - 1]
    }
    else {
        if (move == "previous") {
            chap = allData[Number(currentChap.chapter) - 2]
        }
        else if (move == "next") {
            chap = allData[Number(currentChap.chapter)]
        }
    }
    currentChap = chap;
    $(".containeer").empty()
    for (var i = 1; i <= chap.page; i++) {
        var page = i
        if (i < 10) page = "000" + i;
        else if (i < 100) page = "00" + i;
        var imgHtml = `<div class="row"><div class=""></div><img src="./image/` + chap.chapter + `/` + page + `.jpg" alt="" class=""></div>`;
        $(".containeer").append(imgHtml)
    }
    $("#chapter").attr("placeholder", chap.chapter);
    $("#chapter").attr("value", chap.chapter);
    setButtonState()
    localStorage.setItem("c", currentChap.chapter);
}

function setButtonState() {
    let chap = Number(currentChap.chapter)
    $("#next").removeClass('disabled')
    $("#previous").removeClass('disabled')
    if (chap == allData.length) {
        $("#next").addClass('disabled')
    }
    if (chap == 1) {
        $("#previous").addClass('disabled')
    }
}