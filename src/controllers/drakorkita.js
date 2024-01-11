const axios = require("axios")
const {
    scrapeSeries,
    scrapeSeriesUpdated,
    scrapeMovie,
    scrapeNewMovie,
    scrapeOngoingSeries,
    scrapeCompletedSeries,
    scrapeGenres,
    scrapeDetailGenres,
    scrapeSearch,
    scrapeDetailAllType,
} = require('../scrapers/drakorkita')

const headers = {
    "User-Agent" : "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36"
}

const seriesAll = async (req, res) => {
    try {
        const { page = 1 } = req.query
        const axiosRequest = await axios.get(`${process.env.DRAKORKITA_URL}/all?media_type=tv&page=${page}`, { headers })

        const datas = await scrapeSeries(req, axiosRequest)

        res.status(200).json({
            message:"success",
            page: parseInt(page),
            ...datas
        })
    } catch (e) {
        console.log(e)

        res.json({
            message:`${e}`
        })
    }
}

const seriesUpdated = async (req, res) => {
    try {
        const axiosRequest = await axios.get(`${process.env.DRAKORKITA_URL}`, { headers })

        const datas = await scrapeSeriesUpdated(req, axiosRequest)

        res.status(200).json({
            message:"success",
            datas
        })
    } catch (e) {
        console.log(e)

        res.json({
            message:`${e}`
        })
    }
}

const movieAll = async (req, res) => {
    try {
        const { page = 1 } = req.query
        const axiosRequest = await axios.get(`${process.env.DRAKORKITA_URL}/all?media_type=movie&page=${page}`, { headers })

        const datas = await scrapeMovie(req, axiosRequest)

        res.status(200).json({
            message:"success",
            page: parseInt(page),
            ...datas
        })
    } catch (e) {
        console.log(e)

        res.json({
            message:`${e}`
        })
    }
}

const newMovie = async (req, res) => {
    try {
        const axiosRequest = await axios.get(`${process.env.DRAKORKITA_URL}`, { headers })

        const datas = await scrapeNewMovie(req, axiosRequest)

        res.status(200).json({
            message:"success",
            datas
        })
    } catch (e) {
        console.log(e)

        res.json({
            message:`${e}`
        })
    }
}

const ongoingSeries = async (req, res) => {
    try {
        const { page = 1 } = req.query
        const axiosRequest = await axios.get(`${process.env.DRAKORKITA_URL}/all?status=returning&page=${page}`, { headers })

        const datas = await scrapeOngoingSeries(req, axiosRequest)

        res.status(200).json({
            message:"success",
            page: parseInt(page),
            ...datas
        })
    } catch (e) {
        console.log(e)

        res.json({
            message:`${e}`
        })
    }
}

const completedSeries = async (req, res) => {
    try {
        const { page = 1 } = req.query
        const axiosRequest = await axios.get(`${process.env.DRAKORKITA_URL}/all?status=ended&page=${page}`, { headers })

        const datas = await scrapeCompletedSeries(req, axiosRequest)

        res.status(200).json({
            message:"success",
            page: parseInt(page),
            ...datas
        })
    } catch (e) {
        console.log(e)

        res.json({
            message:`${e}`
        })
    }
}

const genres = async (req, res) => {
    try {
        const axiosRequest = await axios.get(`${process.env.DRAKORKITA_URL}`, { headers })

        const datas = await scrapeGenres(req, axiosRequest)

        res.status(200).json({
            message:"success",
            datas
        })
    } catch (e) {
        console.log(e)

        res.json({
            message:`${e}`
        })
    }
}

const detailGenres = async (req, res) => {
    try {
        const { page = 1 } = req.query
        const { endpoint } = req.params
        const axiosRequest = await axios.get(`${process.env.DRAKORKITA_URL}/all?genre=${endpoint}&page=${page}`, { headers })

        const datas = await scrapeDetailGenres({ page, endpoint }, axiosRequest)

        res.status(200).json({
            message:"success",
            page: parseInt(page),
            ...datas
        })
    } catch (e) {
        console.log(e)

        res.json({
            message:`${e}`
        })
    }
}

const searchAll = async (req, res) => {
    try {
        const { s ,page = 1 } = req.query
        const axiosRequest = await axios.get(`${process.env.DRAKORKITA_URL}/all?q=${s}&page=${page}`, { headers })

        const datas = await scrapeSearch(req, axiosRequest)

        res.status(200).json({
            message:"success",
            page: parseInt(page),
            keyword: s,
            ...datas
        })
    } catch (e) {
        console.log(e)

        res.json({
            message:`${e}`
        })
    }
}

const detailAllType = async (req, res) => {
    try {
        const { endpoint } = req.params

        const axiosRequest = await axios.get(`${process.env.DRAKORKITA_URL}/detail/${endpoint}`, { headers })

        const data = await scrapeDetailAllType({ endpoint }, axiosRequest)

        res.status(200).json({
            message: "success",
            data
        })

    } catch (e) {
        console.log(e)

        res.json({
            message:`${e}`
        })
    }
}

module.exports = {
    seriesAll,
    seriesUpdated,
    movieAll,
    newMovie,
    ongoingSeries,
    completedSeries,
    genres,
    detailGenres,
    searchAll,
    detailAllType,
}