const axios = require("axios")
const puppeteer = require("puppeteer")
const { 
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
} = require("../scrapers/komiku")

const popularComic = async (req, res) => {
    try {
        const axiosRequest = await axios.get(`${process.env.KOMIKU_URL}`)

        const datas = await scrapePopular(req, axiosRequest)
        
        res.status(200).json({
            message: "success",
            datas
        })
    } catch (e) {
        console.log(e)

        res.json({
            message: `Error: ${e}` 
        })
    }
}

const updatedComic = async (req, res) => {
    try {
        const { page = 1 } = req.query

        const axiosRequest = await axios.get(`${process.env.KOMIKU_URL}/page/${page}`)

        const datas = await scrapeUpdated({ page }, axiosRequest)
        
        res.status(200).json({
            message:"success",
            page: parseInt(page),
            datas
        })
    } catch (e) {
        console.log(e)

        res.json({
            message: `Error: ${e}` 
        })
    }
}

const manhwaType = async (req, res) => {
    try {
        const { page = 1 } = req.query
        const axiosRequest = await axios.get(`${process.env.KOMIKU_URL}/manhwa-id/page/${page}`)

        const datas = await scrapeManhwa({ page }, axiosRequest)

        res.status(200).json({
            message:'success',
            page:parseInt(page),
            ...datas
        })
    } catch (e) {
        console.log(e)

        res.json({
            message: `Error: ${e}` 
        })
    }
}

const manhuaType = async (req, res) => {
    try {
        const { page = 1 } = req.query
        const axiosRequest = await axios.get(`${process.env.KOMIKU_URL}/manhua/page/${page}`)

        const datas = await scrapeManhua({ page }, axiosRequest)

        res.status(200).json({
            message:'success',
            page:parseInt(page),
            ...datas
        })
    } catch (e) {
        console.log(e)

        res.json({
            message: `Error: ${e}` 
        })
    }
}

const mangaType = async (req, res) => {
    try {
        const { page = 1 } = req.query
        const axiosRequest = await axios.get(`${process.env.KOMIKU_URL}/manga/?type=manga&page=${page}`)

        const datas = await scrapeManga({ page }, axiosRequest)

        res.status(200).json({
            message:'success',
            page:parseInt(page),
            ...datas
        })
    } catch (e) {
        console.log(e)

        res.json({
            message: `Error: ${e}` 
        })
    }
}

const detail = async (req, res) => {
    try {
        const { endpoint } = req.params
        
        const axiosRequest = await axios.get(`${process.env.KOMIKU_URL}/manga/${endpoint}`)

        const data = await detailComic({ endpoint }, axiosRequest)

        res.status(200).json({
            message:'success',
            data
        })
    } catch (e) {
        console.log(e)

        res.json({
            message: `Error: ${e}` 
        })
    }
}

const chapter = async (req, res) => {
    try {
        const { endpoint } = req.params

        const axiosRequest = await axios.get(`${process.env.KOMIKU_URL}/${endpoint}`)

        const data = await scrapeChapter({ endpoint }, axiosRequest)

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

const search = async (req, res) => {
    try {
        const { page = 1, query } = req.query
        
        const axiosRequest = await axios.get(`${process.env.KOMIKU_URL}/page/${page}/?s=${query}`)

        const datas = await scrapeSearch({ page, query }, axiosRequest)

        res.status(200).json({
            message:"success",
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
        const axiosRequest = await axios.get(`${process.env.KOMIKU_URL}`)

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

const detailGenre = async (req, res) => {
    try {
        const { page = 1 } = req.query
        const { endpoint } = req.params

        const axiosRequest = await axios.get(`${process.env.KOMIKU_URL}/genres/${endpoint}/page/${page}`)

        const datas = await scrapeDetailGenre({ page, endpoint }, axiosRequest)

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
    popularComic,
    updatedComic,
    manhwaType,
    manhuaType,
    mangaType,
    detail,
    chapter,
    search,
    genres,
    detailGenre
}