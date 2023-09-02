const { Router } = require("express")

const router = Router()

const { 
    popularOngoingAnime,
    popularCompletedAnime,
    detailAnime,
    detailEpisode,
    searchAnime,
    genreList,
    genre
} = require("../controllers/kuramanime")

// kuramanime
router.get("/ongoing/popular", popularOngoingAnime)
router.get("/completed/popular", popularCompletedAnime)
router.get("/anime/:endpoint", detailAnime)
router.get("/anime/:anime/:eps", detailEpisode)
router.get("/search", searchAnime)
router.get("/genres", genreList)
router.get("/genres/:endpoint", genre)

module.exports = router