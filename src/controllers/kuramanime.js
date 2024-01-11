const axios = require("axios")

const {
    scrapeOngoingPopular,
    scrapeCompletedPopular,
    scrapeDetail,
    scrapeEpisode,
    scrapeSearchAnime,
    scrapeGenreList,
    scrapeGenre
} = require("../scrapers/kuramanime")


const popularOngoingAnime = async (req, res) =>  {
    try {
        const { page = 1 } = req.query

        const axiosRequest = await axios.get(`${process.env.KURAMANIME_URL}/anime/ongoing?order_by=popular&page=${page}`)

        const datas = await scrapeOngoingPopular({ page }, axiosRequest)

        res.status(200).json({
            message: "success",
            page: parseInt(page),
            ...datas
        })
    } catch (e) {
        console.log(e)
        
        res.json({
            message: e.message
        })
    }
}

const popularCompletedAnime = async (req, res) =>  {
    try {
        const { page = 1 } = req.query

        const axiosRequest = await axios.get(`${process.env.KURAMANIME_URL}/anime/finished?order_by=popular&page=${page}`)

        const datas = await scrapeCompletedPopular({ page }, axiosRequest)

        res.status(200).json({
            message: "success",
            page: parseInt(page),
            ...datas
        })
    } catch (e) {
        console.log(e)
        
        res.json({
            message: e.message
        })
    }
}

const detailAnime = async (req, res) => {
    try {
        const { endpoint } = req.params

        const axiosRequest = await axios.get(`${process.env.KURAMANIME_URL}/anime/${endpoint}`)

        const data = await scrapeDetail({ endpoint }, axiosRequest)

        res.status(200).json({
            message: "success",
            endpoint,
            data
        })
        
    } catch (e) {
        console.log(e)

        res.json({
            message: e.message
        })
    }
}

const detailEpisode = async (req, res) => {
    try {
        const { anime, eps } = req.params
        
        const url = await axios.head(`${process.env.KURAMANIME_URL}/anime/${anime}`)
        
        const actualUrl = await url.request.res.responseUrl

        const axiosRequest = await axios.get(`${actualUrl}/episode/${eps}?activate_stream=`)
        
        const datas = await scrapeEpisode({ anime, eps }, axiosRequest)

        res.status(200).json({
            message: "success",
            episode: parseInt(eps),
            datas
        })
    } catch (e) {
        console.log(e)

        res.json({
            message: e.message
        })
    }
}

const searchAnime = async (req, res) => {
    try {
        const { page = 1, query } = req.query

        const axiosRequest = await axios.get(`${process.env.KURAMANIME_URL}/anime?order_by=popular&search=${query}&page=${page}`)

        const datas = await scrapeSearchAnime({ page, query }, axiosRequest)

        res.status(200).json({
            message: "success",
            ...datas
        })
        
    } catch (e) {
        console.log(e)

        res.json({
            message: e.message
        })
    }
}

const genreList = async (req, res) => {
    try {
        const axiosRequest = await axios.get(`${process.env.KURAMANIME_URL}/properties/genre?genre_type=all`)
        
        const datas = await scrapeGenreList(req, axiosRequest)

        res.status(200).json({
            message: "success",

            datas
        })
    } catch (e) {
        console.log(e)

        res.json({
            message: e.message
        })
    }
}
const genre = async(req, res) => {
    try {
        const { endpoint } = req.params
        const { page = 1 } = req.query
        
        const axiosRequest = await axios.get(`${process.env.KURAMANIME_URL}/properties/genre/${endpoint}?order_by=popular&page=${page}`)

        const datas = await scrapeGenre({ endpoint, page }, axiosRequest)
        
        res.status(200).json({
            message:"success",
            endpoint: endpoint,
            page:parseInt(page),
            ...datas
        })
    } catch (e) {
        console.log(e)

        res.json({
            message: e.message
        })
    }
}

module.exports = {
    popularOngoingAnime,
    popularCompletedAnime,
    detailAnime,
    detailEpisode,
    searchAnime,
    genreList,
    genre
}