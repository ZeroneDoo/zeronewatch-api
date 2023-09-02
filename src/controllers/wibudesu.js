const axios = require("axios")

const {
    scrapePopular,
    scrapeLatest,
    scrapeSearch,
    scrapeGenres,
    scrapeGenreDetail,
    scrapeDetail,
    scrapeGhibliStudio,
} = require("../scrapers/wibudesu")

const popular = async (req, res) => {
    try {
        const { page = 1 } = req.query

        const axiosRequest = await axios.get(`${process.env.WIBUDESU_URL}/advanced-search/page/${page}/?status=&order=popular`)

        const datas = await scrapePopular({ page }, axiosRequest)

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

const latest = async (req, res) => {
    try {
        const { page = 1 } = req.query

        const axiosRequest = await axios.get(`${process.env.WIBUDESU_URL}/advanced-search/page/${page}/?status=&order=update`)

        const datas = await scrapeLatest({ page }, axiosRequest)

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

const search = async (req, res) => {
    try {
        const { page = 1, query } = req.query

        const axiosRequest = await axios.get(`${process.env.WIBUDESU_URL}/page/${page}/?s=${query}`)

        const datas = await scrapeSearch({ page }, axiosRequest)

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

const genres = async (req, res) => {
    try {

        const axiosRequest = await axios.get(`${process.env.WIBUDESU_URL}/genres-list`)

        const datas = await scrapeGenres(req, axiosRequest)

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

const genreDetail = async (req, res) => {
    try {
        const { page = 1 } = req.query
        const { endpoint } = req.params

        const axiosRequest = await axios.get(`${process.env.WIBUDESU_URL}/tag/${endpoint}/page/3`)

        const datas = await scrapeGenreDetail(req, axiosRequest)

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

const detail = async (req, res) => {
    try {
        const { endpoint } = req.params 
        const axiosRequest = await axios.get(`${process.env.WIBUDESU_URL}/${endpoint}`)

        const data = await scrapeDetail({ endpoint }, axiosRequest)

        res.status(200).json({
            message: "success",
            data
        })
        
    } catch (e) {
        console.log(e)

        res.json({
            message: e.message
        })
    }
}

const ghibliStudio = async (req, res) => {
    try {
        const { page = 1 } = req.query

        const axiosRequest = await axios.get(`${process.env.WIBUDESU_URL}/studio/studio-ghibli/page/${page}`)

        const datas = await scrapeGhibliStudio({ page }, axiosRequest)

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

module.exports = {
    popular,
    latest,
    search,
    genres,
    genreDetail,
    detail,
    ghibliStudio
}