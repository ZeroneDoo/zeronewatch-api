const cheerio = require("cheerio")

const scrapePopular = async (req, res) => {
    const $ = cheerio.load(res.data)
    const datas = []

    $(".listupd a")
    .each((i, e) => {
        const dataObject = {}

        const title = $(e).find(".tt .ntitle").text()
        const thumbnail = $(e).find("div.limit > img").attr("data-lazy-src")
        const rating = $(e).find(".tt > .rt .numscore").text()
        const linkEndpoint = $(e).attr("href")
        const endpoint = linkEndpoint.substring(linkEndpoint.indexOf(`${process.env.WIBUDESU_URL}/`) + process.env.WIBUDESU_URL.length + 1, linkEndpoint.length)

        dataObject.title = title
        dataObject.thumbnail = thumbnail
        dataObject.rating = rating
        dataObject.endpoint = endpoint

        datas.push(dataObject)
    })

    
    // pagination
    const largestInt = []
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

const scrapeLatest = async (req, res) => {
    const $ = cheerio.load(res.data)
    const datas = []

    $(".listupd a")
    .each((i, e) => {
        const dataObject = {}

        const title = $(e).find(".tt .ntitle").text()
        const thumbnail = $(e).find("div.limit > img").attr("data-lazy-src")
        const rating = $(e).find(".tt > .rt .numscore").text()
        const linkEndpoint = $(e).attr("href")
        const endpoint = linkEndpoint.substring(linkEndpoint.indexOf(`${process.env.WIBUDESU_URL}/`) + process.env.WIBUDESU_URL.length + 1, linkEndpoint.length)

        dataObject.title = title
        dataObject.thumbnail = thumbnail
        dataObject.rating = rating
        dataObject.endpoint = endpoint

        datas.push(dataObject)
    })

    
    // pagination
    const largestInt = []
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

const scrapeSearch = async (req, res) => {
    const $ = cheerio.load(res.data)
    const datas = []

    $(".listupd a")
    .each((i, e) => {
        const dataObject = {}

        const title = $(e).find(".tt .ntitle").text()
        const thumbnail = $(e).find("div.limit > img").attr("data-lazy-src")
        const rating = $(e).find(".tt > .rt .numscore").text()
        const linkEndpoint = $(e).attr("href")
        const endpoint = linkEndpoint.substring(linkEndpoint.indexOf(`${process.env.WIBUDESU_URL}/`) + process.env.WIBUDESU_URL.length + 1, linkEndpoint.length)

        dataObject.title = title
        dataObject.thumbnail = thumbnail
        dataObject.rating = rating
        dataObject.endpoint = endpoint

        datas.push(dataObject)
    })

    
    // pagination
    const largestInt = []
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

    $(".soralist .blix")
    .each((i, e) => {
        $(e).find("ul a")
        .each((i2, e2) => {
            datas.push({
                title: $(e2).text(),
                endpoint: $(e2).attr("href").split("/tag/")[1]
            })
        })
    })

    return datas
}

const scrapeGenreDetail = async (req, res) => {
    const $ = cheerio.load(res.data)
    const datas = []

    $(".listupd a")
    .each((i, e) => {
        const dataObject = {}

        const title = $(e).find(".tt .ntitle").text()
        const thumbnail = $(e).find("div.limit > img").attr("data-lazy-src")
        const rating = $(e).find(".tt > .rt .numscore").text()
        const linkEndpoint = $(e).attr("href")
        const endpoint = linkEndpoint.substring(linkEndpoint.indexOf(`${process.env.WIBUDESU_URL}/`) + process.env.WIBUDESU_URL.length + 1, linkEndpoint.length)

        dataObject.title = title
        dataObject.thumbnail = thumbnail
        dataObject.rating = rating
        dataObject.endpoint = endpoint

        datas.push(dataObject)
    })

    
    // pagination
    const largestInt = []
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

const scrapeDetail = async (req, res) => {
    const { endpoint } = req
    const $ = cheerio.load(res.data)
    const data = {}
    const genres = []
    const episodeList = []

    if(!$(".info-content").html()){
        throw new Error("404, Not Found")
    }

    const title = $(".animefull .thumb > img").attr("title")
    const titleAlt = $(".alter").text()
    const description = $(".mindesc").text().trim()
    const thumbnail = $(".animefull .thumb > img").attr("data-lazy-src")
    const rating = $("meta[itemprop=\"ratingValue\"]").attr("content")
    const status = $(".info-content span b:contains('Status:')").parent().text().split(":")[1].trim()
    const type = $(".info-content span b:contains('Type:')").parent().text().split(":")[1].trim()
    const released = $(".info-content span b:contains('Released:')").parent().text().split(":")[1].trim()
    const updated_at = $(".info-content span b:contains('Latest Update:')").parent().text().split(":")[1].trim()

    data.title = title
    data.title_alt = titleAlt
    data.rating = rating
    data.endpoint = endpoint
    data.description = description
    data.thumbnail = thumbnail
    data.status = status
    data.type = type
    data.released = released
    data.updated_at = updated_at
    
    $(".genxed a")
    .each((i, e) => {
        genres.push({
            title: $(e).text(),
            endpoint: $(e).attr("href").split("/tag/")[1]
        })

        data.genres = genres
    })

    $(".soraddl")
    .each((i, e) => {
        const batch = {}
        const resolutions = []
        batch.title = $(e).find(".sorattl h3").text()

        $(e).find(".content > .soraurl")
        .each((i2, e2) => {
            const dataObject = {}
            const sources = []
            dataObject.title = $(e2).find(".res").text()

            $(e2).find(".slink a")
            .each((i3, e3) => {
                sources.push({
                    title: $(e3).text(),
                    link: $(e3).attr("href")
                })
            })

            dataObject.sources = sources
            resolutions.push(dataObject)
        })

        batch.resolutions = resolutions
        episodeList.push(batch)
    })

    data.episodes = episodeList

    return data
}

const scrapeGhibliStudio = async (req, res) => {
    const $ = cheerio.load(res.data)
    const datas = []

    $(".listupd a")
    .each((i, e) => {
        const dataObject = {}

        const title = $(e).find(".tt .ntitle").text()
        const thumbnail = $(e).find("div.limit > img").attr("data-lazy-src")
        const rating = $(e).find(".tt > .rt .numscore").text()
        const linkEndpoint = $(e).attr("href")
        const endpoint = linkEndpoint.substring(linkEndpoint.indexOf(`${process.env.WIBUDESU_URL}/`) + process.env.WIBUDESU_URL.length + 1, linkEndpoint.length)

        dataObject.title = title
        dataObject.thumbnail = thumbnail
        dataObject.rating = rating
        dataObject.endpoint = endpoint

        datas.push(dataObject)
    })

    
    // pagination
    const largestInt = []
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
    scrapeLatest,
    scrapeSearch,
    scrapeGenres,
    scrapeGenreDetail,
    scrapeDetail,
    scrapeGhibliStudio
}