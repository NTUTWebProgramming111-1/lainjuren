var allData = []

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

        showComic();
    })


    $("#chapter").change(function () {
        var v = this.value
        l = allData.length + 1
        console.log(allData.length)
        if (v >= 1 && v <= l)
            showComic(v)
    });
})


function showComic(chap) {
    chap = (chap == null) ? allData[allData.length - 1] : allData[chap - 1]
    console.log(chap)
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
}
