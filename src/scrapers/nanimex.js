const cheerio = require("cheerio")

const scrapeLatest = async (req, res) => {
    const $ = cheerio.load(res.data)
    const datas = []

    $("div.wrapper > div.content-wrapper > div.container > section.content > div.col-md-7 > div.box > div.box-body > div.col-sm-3.content-item")
    .each((i, e) => {
        const dataObject = {}

        const title = $(e).find("h3").attr("title")
        const thumbnail = $(e).find("a > div.poster > img").attr("data-lazy-src")
        const episode = $(e).find("div.episode > div.label.btn-danger").text()
        const htmlRating = $(e).find("div.episode > div.label.btn-warning").html()
        const rating = htmlRating.split("</span>")[1].trim()
        const wrapStatus = $(e).find("div.status > a")
        const year = $(wrapStatus[0]).text()
        const status = $(wrapStatus[1]).text()
        const linkEndpoint = $(e).find("a").attr("href")
        const endpoint = linkEndpoint.substring(linkEndpoint.indexOf("/anime/") + 7, linkEndpoint.length)

        dataObject.title = title
        dataObject.status = status
        dataObject.year = year
        dataObject.thumbnail = thumbnail
        dataObject.rating = rating
        dataObject.latest_episode = episode
        dataObject.endpoint = endpoint

        datas.push(dataObject)
    })

    return datas
}

const scrapeMovie = async (req, res) => {
    const $ = cheerio.load(res.data)
    const datas = []

    $("div.wrapper > div.content-wrapper > div.container > section.content > div.col-md-7 > div.box > div.box-body > div.col-sm-3.content-item")
    .each((i, e) => {
        const dataObject = {}

        const title = $(e).find("h3").attr("title")
        const thumbnail = $(e).find("a > div.poster > img").attr("data-lazy-src")
        const htmlRating = $(e).find("div.episode > div.label.btn-warning").html()
        const rating = htmlRating.split("</span>")[1].trim()
        const wrapStatus = $(e).find("div.status > a")
        const year = $(wrapStatus[0]).text()
        const status = $(wrapStatus[1]).text()
        const linkEndpoint = $(e).find("a").attr("href")
        const endpoint = linkEndpoint.substring(linkEndpoint.indexOf("/movie/") + 7, linkEndpoint.length)

        dataObject.title = title
        dataObject.status = status
        dataObject.year = year
        dataObject.thumbnail = thumbnail
        dataObject.rating = rating
        dataObject.endpoint = endpoint

        datas.push(dataObject)
    })

    return datas
}

const scrapeOngoing = async (req, res) => {
    const $ = cheerio.load(res.data)
    const datas = []

    $("div.wrapper > div.content-wrapper > div.container > section.content > div.col-md-7 > div.box > div.box-body > div.col-sm-3.content-item")
    .each((i, e) => {
        const dataObject = {}

        const title = $(e).find("h3").attr("title")
        const thumbnail = $(e).find("a > div.poster > img").attr("data-lazy-src")
        const episode = $(e).find("div.episode > div.label.btn-danger").text()
        const htmlRating = $(e).find("div.episode > div.label.btn-warning").html()
        const rating = htmlRating.split("</span>")[1].trim()
        const wrapStatus = $(e).find("div.status > a")
        const year = $(wrapStatus[0]).text()
        const status = $(wrapStatus[1]).text()
        const linkEndpoint = $(e).find("a").attr("href")
        const endpoint = linkEndpoint.substring(linkEndpoint.indexOf("/anime/") + 7, linkEndpoint.length)

        dataObject.title = title
        dataObject.status = status
        dataObject.year = year
        dataObject.thumbnail = thumbnail
        dataObject.rating = rating
        dataObject.latest_episode = episode
        dataObject.endpoint = endpoint

        datas.push(dataObject)
    })

    return datas
}

const scrapeGenre = async (req, res) => {
    const $ = cheerio.load(res.data)
    const datas = []

    const parent = $("div.wrapper > div.content-wrapper > div.container > section.content > div.col-md-3 > div > div.box")
    
    $(parent[1])
    .find("div.box-body > a")
    .each((i, e) => {
        const linkEndpoint = $(e).attr("href")
        const endpoint = linkEndpoint.substring(linkEndpoint.indexOf("/genre/") + 7, linkEndpoint.length)

        datas.push({
            title: $(e).text(),
            endpoint: endpoint
        })
    })

    return datas
}

const scrapeDetailAnime = async (req, res) => {
    const $ = cheerio.load(res.data)
    const data = {}
    const genres = []
    const episodes = []

    const parent = $("div.wrapper > div.content-wrapper > div.container > section.content > div.col-md-7 > div.box")
    const wrapBody = $(parent).find("div.box-body")
    const table = $(wrapBody[1]).find("div.box-body > table > tbody > tr")

    const title = $(parent).find("div.box-header > h3").text()
    // const title = $(table[0]).find("td").last().find("a").first().text()
    const titleAlt = $(table[1]).find("td").last().text()
    const thumbnail = $(wrapBody[0]).find("a > img").attr("data-lazy-src")
    const synopsis = $(wrapBody[0]).find("div.attachment-pushed  > div.attachment-text").text()
    const rating = $(table[2]).find("td").last().text()
    const status = $(table[4]).find("td").last().find("a").text()
    const countEpisode = $(table[5]).find("td").last().text()
    const dayUpload = $(table[7]).find("td").last().text()

    data.title = title
    data.title_alt = titleAlt
    data.thumbnail = thumbnail
    data.synopsis = synopsis
    data.rating = rating
    data.status = status
    data.count_eps = countEpisode
    data.day_upld = dayUpload
    
    // genres
    $(table[table.length - 1]).find("td").last().find("a")
    .each((i, e) => {
        const linkEndpoint = $(e).attr("href")
        const endpoint = linkEndpoint.substring(linkEndpoint.indexOf("/genre/") + 7, linkEndpoint.length)

        genres.push({
            title: $(e).text(),
            endpoint: endpoint
        })
    })

    data.genres = genres

    $(wrapBody[2]).find("div.box-body > table > tbody > tr")
    .each((i, e) => {
        const linkEndpoint = $(e).find("td > a").attr("href")
        const endpoint = linkEndpoint.substring(linkEndpoint.indexOf("/episode/") + 9, linkEndpoint.length)

        episodes.push({
            title: $(e).find("td > a").text(),
            endpoint: endpoint
        })
    })

    data.episode_list = episodes

    return data
}

const scrapeDetailEpisode = async (req, res) => {
    const $ = cheerio.load(res.data)
    const datas = [] 

    $("select#change-server > option")
    .each((i, e) => {
        datas.push({
            title: $(e).text(),
            src: $(e).attr("value"),
        })
    })

    return datas
}

module.exports = {
    scrapeLatest,
    scrapeMovie,
    scrapeOngoing,
    scrapeGenre,
    scrapeDetailAnime,
    // scrapeDetailMovie
    scrapeDetailEpisode
}