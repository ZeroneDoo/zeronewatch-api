const cheerio = require("cheerio")
const axios = require("axios")

const scrapeSeries = async (req, res) => {
    const $ = cheerio.load(res.data)
    const datas = []
    const largestInt = []

    const parent = $("main > div.container > div.row > div.col-lg-8 > div.row")
    
    $(parent).find("div > div.card")
    .each((i, e) => {
        const dataObject = {} 

        const title = $(e).find("a > div.bungkus > span.titit").html().split("<br>")[0]
        const time = $(e).find("a > div.bungkus > span").first().text()
        const eps = $(e).find("a > div.bungkus > span.tagw > span").text().trim()
        const updatedAt = $(e).find("a > div.bungkus > span.titit > span").last().text()
        const thumbnail = $(e).find("a > div.bungkus > img").attr("src")
        const LinkEndpoint = $(e).find('a').attr("href")
        const endpoint = LinkEndpoint.substring(LinkEndpoint.indexOf("/detail/") + 8, LinkEndpoint.length)

        dataObject.title = title
        dataObject.eps = eps
        dataObject.time = time
        dataObject.thumbnail = thumbnail
        dataObject.updated_at = updatedAt
        dataObject.endpoint = endpoint

        datas.push(dataObject)
    })

    $(".wp-pagenavi > span, .wp-pagenavi > a")
    .each((i,e) => {
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

const scrapeSeriesUpdated = async (req, res) => {
    const $ = cheerio.load(res.data)
    const datas = []

    const parent = $("main > div.container > div.row > div.col-lg-8 > div.row")
    
    $(parent.first()).find("div > div.card")
    .each((i, e) => {
        const dataObject = {} 

        const title = $(e).find("a > div.bungkus > span.titit").html().split("<br>")[0]
        const time = $(e).find("a > div.bungkus > span").first().text()
        const eps = $(e).find("a > div.bungkus > span.rate").text().trim()
        const thumbnail = $(e).find("a > div.bungkus > img").attr("src")
        const LinkEndpoint = $(e).find('a').attr("href")
        const endpoint = LinkEndpoint.substring(LinkEndpoint.indexOf("/detail/") + 8, LinkEndpoint.length)

        dataObject.title = title
        dataObject.eps = eps
        dataObject.time = time
        dataObject.thumbnail = thumbnail
        dataObject.endpoint = endpoint

        datas.push(dataObject)
    })

    return datas
}

const scrapeMovie = async (req, res) => {
    const $ = cheerio.load(res.data)
    const datas = []
    const largestInt = []

    const parent = $("main > div.container > div.row > div.col-lg-8 > div.row")
    
    $(parent).find("div > div.card")
    .each((i, e) => {
        const dataObject = {} 

        const title = $(e).find("a > div.bungkus > span.titit").html().split("<br>")[0]
        const time = $(e).find("a > div.bungkus > span").first().text()
        const updatedAt = $(e).find("a > div.bungkus > span.titit > span").last().text()
        const thumbnail = $(e).find("a > div.bungkus > img").attr("src")
        const LinkEndpoint = $(e).find('a').attr("href")
        const endpoint = LinkEndpoint.substring(LinkEndpoint.indexOf("/detail/") + 8, LinkEndpoint.length)

        dataObject.title = title
        dataObject.time = time
        dataObject.thumbnail = thumbnail
        dataObject.updated_at = updatedAt
        dataObject.endpoint = endpoint

        datas.push(dataObject)
    })

    $(".wp-pagenavi > span, .wp-pagenavi > a")
    .each((i,e) => {
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

const scrapeNewMovie = async (req, res) => {
    const $ = cheerio.load(res.data)
    const datas = []

    const parent = $("main > div.container > div.row > div.col-lg-8 > div.row")

    $(parent[1])
    .find("div > div.card")
    .each((i, e) => {
        const dataObject = {} 

        const title = $(e).find("a > div.bungkus > span.titit").html().split("<br>")[0]
        const time = $(e).find("a > div.bungkus > span").first().text()
        const thumbnail = $(e).find("a > div.bungkus > img").attr("src")
        const LinkEndpoint = $(e).find('a').attr("href")
        const endpoint = LinkEndpoint.substring(LinkEndpoint.indexOf("/detail/") + 8, LinkEndpoint.length)

        dataObject.title = title
        dataObject.time = time
        dataObject.thumbnail = thumbnail
        dataObject.endpoint = endpoint

        datas.push(dataObject)
    })

    return datas
}

const scrapeOngoingSeries = async (req, res) => {
    const $ = cheerio.load(res.data)
    const datas = []
    const largestInt = []

    const parent = $("main > div.container > div.row > div.col-lg-8 > div.row")
    
    $(parent).find("div > div.card")
    .each((i, e) => {
        const dataObject = {} 

        const title = $(e).find("a > div.bungkus > span.titit").html().split("<br>")[0]
        const time = $(e).find("a > div.bungkus > span").first().text()
        const eps = $(e).find("a > div.bungkus > span.tagw > span").text().trim()
        const updatedAt = $(e).find("a > div.bungkus > span.titit > span").last().text()
        const thumbnail = $(e).find("a > div.bungkus > img").attr("src")
        const LinkEndpoint = $(e).find('a').attr("href")
        const endpoint = LinkEndpoint.substring(LinkEndpoint.indexOf("/detail/") + 8, LinkEndpoint.length)

        dataObject.title = title
        dataObject.eps = eps
        dataObject.time = time
        dataObject.thumbnail = thumbnail
        dataObject.updated_at = updatedAt
        dataObject.endpoint = endpoint

        datas.push(dataObject)
    })

    $(".wp-pagenavi > span, .wp-pagenavi > a")
    .each((i,e) => {
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

const scrapeCompletedSeries = async (req, res) => {
    const $ = cheerio.load(res.data)
    const datas = []
    const largestInt = []

    const parent = $("main > div.container > div.row > div.col-lg-8 > div.row")
    
    $(parent).find("div > div.card")
    .each((i, e) => {
        const dataObject = {} 

        const title = $(e).find("a > div.bungkus > span.titit").html().split("<br>")[0]
        const time = $(e).find("a > div.bungkus > span").first().text()
        const eps = $(e).find("a > div.bungkus > span.tagw > span").text().trim()
        const updatedAt = $(e).find("a > div.bungkus > span.titit > span").last().text()
        const thumbnail = $(e).find("a > div.bungkus > img").attr("src")
        const LinkEndpoint = $(e).find('a').attr("href")
        const endpoint = LinkEndpoint.substring(LinkEndpoint.indexOf("/detail/") + 8, LinkEndpoint.length)

        dataObject.title = title
        dataObject.eps = eps
        dataObject.time = time
        dataObject.thumbnail = thumbnail
        dataObject.updated_at = updatedAt
        dataObject.endpoint = endpoint

        datas.push(dataObject)
    })

    $(".wp-pagenavi > span, .wp-pagenavi > a")
    .each((i,e) => {
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

    $(".genrez").first()
    .find(".cat-item a")
    .each((i, e) => {
        datas.push({
            title: $(e).text().trim()
        })
    })

    return datas
}

const scrapeDetailGenres = async (req, res) => {
    const $ = cheerio.load(res.data)
    const datas = []

    $(".item-list a")
    .each((i, e) => {
        const dataObject = {} 

        const title = $(e).find("div.bungkus > span.titit").html().split("<br>")[0]
        const time = $(e).find("div.bungkus > span").first().text()
        const quality = $(e).find("div.bungkus > span.titit > span").first().text()
        const eps = $(e).find("div.bungkus > span.tagw > span").text().trim()
        const updatedAt = $(e).find("div.bungkus > span.titit > span").last().text()
        const thumbnail = $(e).find("div.bungkus > img").attr("src")
        const LinkEndpoint = $(e).attr("href")
        const endpoint = LinkEndpoint.substring(LinkEndpoint.indexOf("/detail/") + 8, LinkEndpoint.length)

        dataObject.title = title
        dataObject.eps = eps
        dataObject.time = time
        dataObject.quality = quality
        dataObject.thumbnail = thumbnail
        dataObject.updated_at = updatedAt
        dataObject.endpoint = endpoint

        datas.push(dataObject)
    })

    const largestInt = []
    $(".wp-pagenavi > span, .wp-pagenavi > a")
    .each((i,e) => {
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
    const largestInt = []

    const parent = $("main > div.container > div.row > div.col-lg-8 > div.row")
    
    $(parent).find("div > div.card")
    .each((i, e) => {
        const dataObject = {} 

        const title = $(e).find("a > div.bungkus > span.titit").html().split("<br>")[0]
        const time = $(e).find("a > div.bungkus > span").first().text()
        const quality = $(e).find("a > div.bungkus > span.titit > span").first().text()
        const eps = $(e).find("a > div.bungkus > span.tagw > span").text().trim()
        const updatedAt = $(e).find("a > div.bungkus > span.titit > span").last().text()
        const thumbnail = $(e).find("a > div.bungkus > img").attr("src")
        const LinkEndpoint = $(e).find('a').attr("href")
        const endpoint = LinkEndpoint.substring(LinkEndpoint.indexOf("/detail/") + 8, LinkEndpoint.length)

        dataObject.title = title
        dataObject.eps = eps
        dataObject.time = time
        dataObject.quality = quality
        dataObject.thumbnail = thumbnail
        dataObject.updated_at = updatedAt
        dataObject.endpoint = endpoint

        datas.push(dataObject)
    })

    $(".wp-pagenavi > span, .wp-pagenavi > a")
    .each((i,e) => {
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

const scrapeDetailAllType = async (req, res) => {
    const { endpoint } = req
    const $ = cheerio.load(res.data)
    const data = {}
    const genres = []
    // return {
    //     data: $.html()
    // }
    const headers = {
        "Referer" : `${process.env.DRAKORKITA_URL}/detail/${endpoint}/`,
        "User-Agent" : "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
        "Cookie" : "vi_0ELVmU7D=64ec09a4ae6db; HstCfa4524841=1693190569537; HstCmu4524841=1693190569537; dlOKBYl4gcFxs8tDGXO9aEvn1m=64ec09c2790c8; vi_04aLkwOpeK=64f09d5904bb1; _gid=GA1.2.65617723.1693649276; vi_hYIdDMKh=64f3d0778b6ac; vi_W25AFbzv1P=64f3d2e07c423; HstCla4524841=1693710948928; HstPn4524841=1; HstPt4524841=26; HstCnv4524841=6; HstCns4524841=10; _ga_DZPG0EZGWW=GS1.1.1693710949.8.0.1693710949.0.0.0; _ga=GA1.2.1604386064.1693190570"
    }

    const parent  = $("div#sidebar_left")

    const title = $(parent).find("div.animefull > div.bigcontent > div.infox > h1").text()
    const titleAlt = $(parent).find("div.animefull > div.bigcontent > div.infox > span.alter").text()
    const synopsis = $(parent).find("div.sinopsis > p").text()
    const thumbnail = $(parent).find("div.animefull > div.bigcover > div.ime > img").attr("src")

    data.title = title
    data.title_alt = titleAlt
    data.synopsis = synopsis
    data.thumbnail = thumbnail
    
    // genres
    $(parent).find("div.animefull > div.bigcontent > div.infox > div.gnr > p > a")
    .each((i, e) => {
        genres.push({
            title: $(e).text(),
        })
        
        data.genres = genres
    })

    // get movie id
    const onclick = $(parent).find("div.pagination > a").last().attr("onclick")

    const movieIdAndTag = onclick.substring(onclick.indexOf("(") + 1, onclick.indexOf(")"))
    const movieId =  movieIdAndTag.split(",")[0].replace(/^'|'$/g, '')
    const tag = movieIdAndTag.split(",")[1].replace(/^'|'$/g, '')

    // get episode list
    const { data: { episode_lists } } = await axios.get(`${process.env.DRAKORKITA_URL}/api/episode.php?movie_id=${movieId}&tag=${tag}`, {
        headers: headers
    })

    const $eps = cheerio.load(episode_lists)
    const episodes = $eps("p > a").get()

    // loop episodes
    const episodesPromise = episodes.map(async (eps, i) => {
        const dataEps = {}
        const resolutions = []

        const wrap = $(eps).attr('onclick') 

        const EpsIdAndTag = wrap.substring(wrap.indexOf("(") + 1, wrap.indexOf(")"))
        const epsId =  EpsIdAndTag.split(",")[0].replace(/^'|'$/g, '')
        const tag = EpsIdAndTag.split(",")[1].replace(/^'|'$/g, '')

        dataEps.title = `Episode ${++i}`

        const { data: {data: { qua, server_id }} } = await axios.get(`${process.env.DRAKORKITA_URL}/api/server.php?episode_id=${epsId}&tag=${tag}`, {
            headers: headers
        }) 

        const { data:{ file } } = await axios.get(`${process.env.DRAKORKITA_URL}/api/video.php?id=${epsId}&qua=${qua}&server_id=${server_id}&tag=${tag}`,{
            headers: headers
        })
        
        const splitFile = file.split(",")

        splitFile.map(link => {
            resolutions.push({
                resolution: link.substring(1, 5),
                src: link.substring(link.indexOf("https"), link.length)
            })

        })

        dataEps.resolutions = resolutions

        return dataEps
    }) 

    const resultEpisodes = await Promise.all(episodesPromise)

    data.episodes = resultEpisodes

    return data
}

module.exports = {
    scrapeSeries,
    scrapeSeriesUpdated,
    scrapeMovie,
    scrapeNewMovie,
    scrapeOngoingSeries,
    scrapeCompletedSeries,
    scrapeGenres,
    scrapeDetailGenres,
    scrapeSearch,
    scrapeDetailAllType
}