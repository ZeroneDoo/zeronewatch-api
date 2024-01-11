const cheerio = require("cheerio")
const axios = require("axios")

const scrapeOngoingPopular = async (req, res) => {
    const $ = cheerio.load(res.data)

    const elements = $("div#animeList > div > a").get()

    const promises = elements.map(async (el) => {
        const $$ = cheerio.load(el)
        const dataObject = {}
        const linkDetail = $$("a").attr("href").split("/episode")[0]
        const detail = linkDetail.substring(linkDetail.indexOf("/anime/") + 7, linkDetail.length).split("/")[1]
        
        const { data } = await axios.get(`https://aniyoi-api.vercel.app/kuramanime/anime/${detail}`)

        const title = $$("div > h5").text()
        const episode = $$("div.ep").text().replace(/^\n+|\n+$/g, '')
        const thumbnail = data.cover
        const endpoint = data.slug

        dataObject.title = title
        dataObject.thumbnail = thumbnail
        dataObject.episode = episode
        dataObject.endpoint = endpoint
        
        return dataObject
    })

    const datas = await Promise.all(promises)

    // pagination
    const largestInt = []
    $("#animeList > nav > div a, #animeList > nav > div span[aria-current='page']")
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
const scrapeCompletedPopular = async (req, res) => {
    const $ = cheerio.load(res.data)

    const elements = $("div#animeList > div > a").get()

    const promises = elements.map(async (el) => {
        const $$ = cheerio.load(el)
        const dataObject = {}
        const linkDetail = $$("a").attr("href").split("/episode")[0]
        const detail = linkDetail.substring(linkDetail.indexOf("/anime/") + 7, linkDetail.length).split("/")[1]

        const { data } = await axios.get(`https://aniyoi-api.vercel.app/kuramanime/anime/${detail}`)

        const title = $$("div > h5").text()
        const rating = $$("div.ep").text().replace(/^\n+|\n+$/g, '')
        const thumbnail = data.cover
        const endpoint = data.slug

        dataObject.title = title
        dataObject.thumbnail = thumbnail
        dataObject.rating = rating
        dataObject.endpoint = endpoint
        
        return dataObject
    })

    const datas = await Promise.all(promises)

    // pagination
    const largestInt = []
    $("#animeList > nav > div a, #animeList > nav > div span[aria-current='page']")
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

    const { data:{ cover } } = await axios.get(`https://aniyoi-api.vercel.app/kuramanime/anime/${endpoint}`)

    const title = $("div.anime__details__title > h3").text()
    const thumbnail = cover
    const titleAlt = $("div.anime__details__title > span").text()
    const synopsis = $("p#synopsisField").text()

    // genres
    $(".anime__details__widget ul")
    .find('span:contains("Genre:"),span:contains("Tema:")')
    .parent()
    .find("a")
    .each((i, e) => {
        genres.push({
            title: $(e).text().replace(",", "").trim(),
            endpoint: $(e).attr("href").split("/genre/")[1]
        })
    })
    
    // episode lists
    const $$ = cheerio.load($("a#episodeLists").attr("data-content"))

    let firstEps = {}
    let latestEps = {}

    if ($$("span > b:contains('Pilihan Cepat')").parent().html()){
        firstEps.title = $$("a").first().text().trim()
        firstEps.endpoint = parseInt($$("a").first().attr("href").split("/episode/")[1])
        
        latestEps.title = $$("a").first().next().text().trim()
        latestEps.endpoint = parseInt($$("a").first().next().attr("href").split("/episode/")[1])
    }else{
        firstEps.title = $$("a").first().text().trim()
        firstEps.endpoint = parseInt($$("a").first().attr("href").split("/episode/")[1])

        latestEps.title = $$("a").last().text().trim()
        latestEps.endpoint = parseInt($$("a").last().attr("href").split("/episode/")[1])
    }

    data.title = title
    data.title_alt = titleAlt
    data.thumbnail = thumbnail
    data.synopsis = synopsis
    data.first_eps = firstEps
    data.latest_eps = latestEps
    data.genres = genres

    return data
}
const scrapeEpisode = async (req, res) => {
    const $ = cheerio.load(res.data)
    const datas = []

    $("#animeVideoPlayer video")
    .find("source")
    .each((i, e) => {
        const resolution = $(e).attr("size") + "p"
        const src = $(e).attr("src")

        datas.push({
            resolution: resolution,
            src: src
        })
    })

    return res.data
}
const scrapeSearchAnime = async (req, res) => {
    const $ = cheerio.load(res.data)

    const elements = $("div#animeList > div > a").get()

    const promises = elements.map(async (el) => {
        const $$ = cheerio.load(el)
        const dataObject = {}
        const linkDetail = $$("a").attr("href").split("/episode")[0]
        const detail = linkDetail.substring(linkDetail.indexOf("/anime/") + 7, linkDetail.length).split("/")[1]
        
        const { data } = await axios.get(`https://aniyoi-api.vercel.app/kuramanime/anime/${detail}`)

        const title = $$("div > h5").text()
        const rating = $$("div.ep").text().replace(/^\n+|\n+$/g, '')
        const thumbnail = data.cover
        const endpoint = data.slug

        dataObject.title = title
        dataObject.thumbnail = thumbnail
        dataObject.rating = rating
        dataObject.endpoint = endpoint
        
        return dataObject
    })

    const datas = await Promise.all(promises)

    // pagination
    const largestInt = []
    $("#animeList > nav > div a, #animeList > nav > div span[aria-current='page']")
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
const scrapeGenreList = async (req, res) => {
    const $ = cheerio.load(res.data)
    const datas = []

    $("div#animeList").find("a")
    .each((i, e) => {
        const linkEndpoint = $(e).attr('href').split("/genre/")[1]
        const endpoint = linkEndpoint.substring(0, linkEndpoint.indexOf("?"))

        if(endpoint != "hentai" || endpoint != "ecchi"){
            datas.push({
                title: $(e).text().trim(),
                endpoint: endpoint
            })
        }
    })

    return datas
}
const scrapeGenre = async (req, res) => {
    const $ = cheerio.load(res.data)

    const elements = $("div#animeList > div > a").get()

    const promises = elements.map(async (el) => {
        const $$ = cheerio.load(el)
        const dataObject = {}
        const linkDetail = $$("a").attr("href").split("/episode")[0]
        const detail = linkDetail.substring(linkDetail.indexOf("/anime/") + 7, linkDetail.length).split("/")[1]
        
        const { data } = await axios.get(`https://aniyoi-api.vercel.app/kuramanime/anime/${detail}`)

        const title = $$("div > h5").text()
        const rating = $$("div.ep").text().replace(/^\n+|\n+$/g, '')
        const thumbnail = data.cover
        const endpoint = data.slug

        dataObject.title = title
        dataObject.thumbnail = thumbnail
        dataObject.rating = rating
        dataObject.endpoint = endpoint
        
        return dataObject
    })

    const datas = await Promise.all(promises)

    const pagination = $("#animeList > nav > div").last().find("a").last().prev().text().replace(/^\n+|\n+$/g, '')


    return {
        pagination: parseInt(pagination),
        datas
    }
}

module.exports = {
    scrapeOngoingPopular,
    scrapeCompletedPopular,
    scrapeDetail,
    scrapeEpisode,
    scrapeSearchAnime,
    scrapeGenreList,
    scrapeGenre
}