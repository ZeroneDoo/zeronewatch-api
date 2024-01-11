const cheerio = require("cheerio")

const scrapePopular = async (req, res) => {
    const $ = cheerio.load(res.data)
    const datas = []

    $("div.mainholder > div#content > div.wrapper > div.hotslid > div.bixbox.hothome.full > div.listupd > div.bs")
    .each((i, e) => {
        const dataObject = {}

        const title = $(e).find("div.bsx > a").attr("title")
        const thumbnail = $(e).find("div.bsx > a > div.limit > img").attr("src")
        const newestChapter = $(e).find("div.bsx > a > div.bigor > div.adds > div.epxs").text()
        const rating = $(e).find("div.bsx > a > div.bigor > div.adds > div.rt > div.rating > div.numscore").text()
        const linkEndpoint = $(e).find("div.bsx > a").attr("href")
        const endpoint = linkEndpoint.substring(linkEndpoint.indexOf("/manga/") + 7, linkEndpoint.length)

        dataObject.title = title
        dataObject.thumbnail = thumbnail
        dataObject.newest_chapter = newestChapter
        dataObject.rating = rating
        dataObject.endpoint = endpoint
        dataObject.type = $(e).find(".limit span").first().attr("class").replace("type ", '')

        datas.push(dataObject)
    })

    return datas
}

const scrapeUpdated = async (req, res) => {
    const $ = cheerio.load(res.data)
    const datas = []
    
    $("div.mainholder > div#content > div.wrapper > div.postbody > div.bixbox > div.listupd > div.utao.styletwo")
    .each((i, e) => {
        const dataUpdated = {}
        const chapters = []

        const title = $(e).find("div.uta > div.imgu > a").attr("title")
        const thumbnail = $(e).find("div.uta > div.imgu > a > img").attr("src")
        const type = $(e).find("div.uta > div.luf > ul").attr("class")
        const linkEndpoint = $(e).find("div.uta > div.imgu > a").attr("href")
        const endpoint = linkEndpoint.substring(linkEndpoint.indexOf("/manga/") + 7, linkEndpoint.length)

        dataUpdated.title = title
        dataUpdated.thumbnail = thumbnail
        dataUpdated.type = type
        dataUpdated.endpoint = endpoint
        dataUpdated.type = $(e).find("a span").last().attr("class").replace("type ", "")
        
        // get chapters updated
        $(e)
        .find("div.uta > div.luf > ul > li")
        .each((i2, e2) => {
            const linkEndpoint = $(e2).find("a").attr('href')

            chapters.push({
                title: $(e2).find("a").text(),
                updated_at: $(e2).find("span").text(),
                endpoint: linkEndpoint.substring(linkEndpoint.indexOf(`${process.env.KOMIKU_URL}`) + process.env.KOMIKU_URL.length+1, linkEndpoint.length)
            })

            dataUpdated.chapters = chapters
        })

        datas.push(dataUpdated)
    })

    return datas
}

const scrapeManhwa = async (req, res) => {
    const $ = cheerio.load(res.data)
    const datas = []
    const largestInt = []

    $("div.mainholder > div#content > div.wrapper > div.postbody > div.bixbox > div.page > div.listupd.cp > div.bs")
    .each((i, e) => {
        const dataObject = {}

        const title = $(e).find("div.bsx > a").attr("title")
        const thumbnail = $(e).find("div.bsx > a > div.limit > img").attr("src") 
        const newestChapter = $(e).find("div.bsx > a > div.bigor > div.adds > div.epxs").text()
        const rating = $(e).find("div.bsx > a > div.bigor > div.adds > div.rt > div.rating > div.numscore").text()
        const linkEndpoint = $(e).find("div.bsx > a").attr("href")
        const endpoint = linkEndpoint.substring(linkEndpoint.indexOf("/manga/") + 7, linkEndpoint.length)

        dataObject.title = title
        dataObject.thumbnail = thumbnail
        dataObject.newest_chapter = newestChapter
        dataObject.rating = rating
        dataObject.endpoint = endpoint
        dataObject.type = $(e).find(".limit span").first().attr("class").replace("type ", '')

        datas.push(dataObject)
    })

    // pagination
    $(".pagination > span, .pagination > a")
    .each((i, e) => {
        const text = $(e).text()
        const int = parseInt(text, 10)

        if(!isNaN(int)) {
            largestInt.push(int)
        }
    })

    const pagination = Math.max(...largestInt)

    return {
        pagination: pagination,
        datas
    }
}

const scrapeManhua = async (req, res) => {
    const $ = cheerio.load(res.data)
    const datas = []
    const largestInt = []

    $("div.mainholder > div#content > div.wrapper > div.postbody > div.bixbox > div.page > div.listupd.cp > div.bs")
    .each((i, e) => {
        const dataObject = {}

        const title = $(e).find("div.bsx > a").attr("title")
        const thumbnail = $(e).find("div.bsx > a > div.limit > img").attr("src") 
        const newestChapter = $(e).find("div.bsx > a > div.bigor > div.adds > div.epxs").text()
        const rating = $(e).find("div.bsx > a > div.bigor > div.adds > div.rt > div.rating > div.numscore").text()
        const linkEndpoint = $(e).find("div.bsx > a").attr("href")
        const endpoint = linkEndpoint.substring(linkEndpoint.indexOf("/manga/") + 7, linkEndpoint.length)

        dataObject.title = title
        dataObject.thumbnail = thumbnail
        dataObject.newest_chapter = newestChapter
        dataObject.rating = rating
        dataObject.endpoint = endpoint
        dataObject.type = $(e).find(".limit span").first().attr("class").replace("type ", '')

        datas.push(dataObject)
    })

    // pagination
    $(".pagination > span, .pagination > a")
    .each((i, e) => {
        const text = $(e).text()
        const int = parseInt(text, 10)

        if(!isNaN(int)) {
            largestInt.push(int)
        }
    })

    const pagination = Math.max(...largestInt)

    return {
        pagination: pagination,
        datas
    }
}

const scrapeManga = async (req, res) => {
    const $ = cheerio.load(res.data)
    const datas = []
    const largestInt = []

    $("div.mainholder > div#content > div.wrapper > div.postbody > div.bixbox.seriesearch > div.mrgn > div.listupd > div.bs")
    .each((i, e) => {
        const dataObject = {}

        const title = $(e).find("div.bsx > a").attr("title")
        const thumbnail = $(e).find("div.bsx > a > div.limit > img").attr("src") 
        const newestChapter = $(e).find("div.bsx > a > div.bigor > div.adds > div.epxs").text()
        const rating = $(e).find("div.bsx > a > div.bigor > div.adds > div.rt > div.rating > div.numscore").text()
        const linkEndpoint = $(e).find("div.bsx > a").attr("href")
        const endpoint = linkEndpoint.substring(linkEndpoint.indexOf("/manga/") + 7, linkEndpoint.length)

        dataObject.title = title
        dataObject.thumbnail = thumbnail
        dataObject.newest_chapter = newestChapter
        dataObject.rating = rating
        dataObject.endpoint = endpoint
        dataObject.type = $(e).find(".limit span").first().attr("class").replace("type ", '')

        datas.push(dataObject)
    })

    // pagination
    $(".pagination > span, .pagination > a")
    .each((i, e) => {
        const text = $(e).text()
        const int = parseInt(text, 10)

        if(!isNaN(int)) {
            largestInt.push(int)
        }
    })

    const pagination = Math.max(...largestInt)

    return {
        pagination: pagination,
        datas
    }
}

const detailComic = async (req, res) => {
    const { endpoint } = req
    const $ = cheerio.load(res.data)
    const data = {}
    const genres = []
    const chapterList = []

    const parent = $("div.mainholder > div#content > div.wrapper > div.postbody > article")

    const left = $(parent).find("div.seriestucon > div.seriestucont > div.seriestucontl")
    const right = $(parent).find("div.seriestucon > div.seriestucont > div.seriestucontr")
    const table = $(right).find("table > tbody")
    
    const title = $(parent).find("div.seriestucon > div.seriestuhead > h1").text()
    // const titleAlt = $($(table).find("tr")[0]).find("td").last().text()
    let titleAlt = null
    $(table).find("tr").each((i, e) => {
        const td = $(e).find("td")
        if(td.first().text() === "Alternative") titleAlt =  td.last().text()
    })
    const description = $(parent).find("div.seriestucon > div.seriestuhead > div.entry-content.entry-content-single > p").text()
    const thumbnail = $(left).find("div.thumb > img").attr("src")
    const rating = $(left).find("div.rating > div.rating-prc > div.num").text()
    let status = null
    $(table).find("tr").each((i, e) => {
        const td = $(e).find("td")
        if(td.first().text() === "Status") status = td.last().text()
    })
    let type = null
    $(table).find("tr").each((i, e) => {
        const td = $(e).find("td")
        if(td.first().text() === "Type") type = td.last().text()
    })
    let released = null
    $(table).find("tr").each((i, e) => {
        const td = $(e).find("td")
        if(td.first().text() === "Posted On") released = td.last().text() 
    })
    const updated_at = $(table.find("tr")[table.find("tr").length - 1]).find("td").last().find("time").text()

    data.title = title
    data.rating = rating
    data.endpoint = endpoint
    data.title_alt = titleAlt
    data.description = description
    data.thumbnail = thumbnail
    data.status = status
    data.type = type
    data.released = released
    data.updated_at = updated_at
    
    $(right)
    .find("div.seriestugenre > a")
    .each((i, e2) => {
        const linkEndpoint = $(e2).attr("href")

        genres.push({
            title: $(e2).text(),
            endpoint: linkEndpoint.substring(linkEndpoint.indexOf("/genres/") + 8, linkEndpoint.length)
        })

        data.genres = genres
    })

    $(parent)
    .find("div.bixbox.bxcl.epcheck > div#chapterlist > ul > li")
    .each((i, e3) => {
        const linkEndpoint = $(e3).find("div.chbox > div.eph-num > a").attr("href")

        chapterList.push({
            title: $(e3).find("div.chbox > div.eph-num > a > span").first().text(),
            updated_at: $(e3).find("div.chbox > div.eph-num > a > span").last().text(),
            endpoint: linkEndpoint.substring(linkEndpoint.indexOf(`${process.env.KOMIKU_URL}`) + process.env.KOMIKU_URL.length + 1, linkEndpoint.length)
        })

        data.chapterList = chapterList
    })

    return data
}

const scrapeChapter = async (req, res) => {
    const $ = cheerio.load(res.data)
    const data = {}

    const titleCh = $(".headpost h1").text()
    const titleComic = $(".headpost a").text()

    data.title = titleCh
    data.title_comic = titleComic

    $(".wrapper > script").each((i, e) => {
        if($(e).html().includes("ts_reader.run")){
            const replace = $(e).text().replace("ts_reader.run(", '').replace(");", '')
            const { images } = JSON.parse(replace).sources[0]

            data.chapters = images
        }
    })

    return data
}

const scrapeSearch = async (req, res) => {
    const $ = cheerio.load(res.data)
    const datas = []
    const largestInt = []

    $("div.listupd > .bs")
    .each((i, e) => {
        const dataObject = {}

        const title = $(e).find("div.bsx > a").attr("title")
        const thumbnail = $(e).find("div.bsx > a > div.limit > img").attr("src")
        const newestChapter = $(e).find("div.bsx > a > div.bigor > div.adds > div.epxs").text()
        const rating = $(e).find("div.bsx > a > div.bigor > div.adds > div.rt > div.rating > div.numscore").text()
        const linkEndpoint = $(e).find("div.bsx > a").attr("href")
        const endpoint = linkEndpoint.substring(linkEndpoint.indexOf("/manga/") + 7, linkEndpoint.length)

        dataObject.title = title
        dataObject.thumbnail = thumbnail
        dataObject.newest_chapter = newestChapter
        dataObject.rating = rating
        dataObject.endpoint = endpoint
        dataObject.type = $(e).find(".limit span").first().attr("class").replace("type ", '')

        datas.push(dataObject)
    })

    // pagination
    $(".pagination > span, .pagination > a")
    .each((i, e) => {
        const text = $(e).text()
        const int = parseInt(text, 10)

        if(!isNaN(int)) {
            largestInt.push(int)
        }
    })

    const pagination = Math.max(...largestInt)

    return {
        pagination: pagination,
        datas
    }
}

const scrapeGenres = async (req, res) => {
    const $ = cheerio.load(res.data)
    const datas = []

    $(".genre > li")
    .each((i, e) => {
        const endpoint = $(e).find("a").attr("href").split("/genres/")[1]
        datas.push({
            title: $(e).find("a").text(),
            endpoint
        }) 
    })

    return datas
}

const scrapeDetailGenre = async (req, res) => {
    const $ = cheerio.load(res.data)
    const datas = []
    const largestInt = []

    $("div.listupd > .bs")
    .each((i, e) => {
        const dataObject = {}

        const title = $(e).find("div.bsx > a").attr("title")
        const thumbnail = $(e).find("div.bsx > a > div.limit > img").attr("src")
        const newestChapter = $(e).find("div.bsx > a > div.bigor > div.adds > div.epxs").text()
        const rating = $(e).find("div.bsx > a > div.bigor > div.adds > div.rt > div.rating > div.numscore").text()
        const linkEndpoint = $(e).find("div.bsx > a").attr("href")
        const endpoint = linkEndpoint.substring(linkEndpoint.indexOf("/manga/") + 7, linkEndpoint.length)

        dataObject.title = title
        dataObject.thumbnail = thumbnail
        dataObject.newest_chapter = newestChapter
        dataObject.rating = rating
        dataObject.endpoint = endpoint
        dataObject.type = $(e).find(".limit span").first().attr("class").replace("type ", '')

        datas.push(dataObject)
    })

    // pagination
    $(".pagination > span, .pagination > a")
    .each((i, e) => {
        const text = $(e).text()
        const int = parseInt(text, 10)

        if(!isNaN(int)) {
            largestInt.push(int)
        }
    })

    const pagination = Math.max(...largestInt)

    return {
        pagination: pagination,
        datas
    }
}

module.exports = {
    scrapePopular,
    scrapeUpdated,
    scrapeManhwa,
    scrapeManhua,
    scrapeManga,
    detailComic,
    scrapeChapter,
    scrapeSearch,
    scrapeGenres,
    scrapeDetailGenre
}