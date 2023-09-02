const { Router } = require("express")

const router = Router()

const {
    latestUpdate,
    movieAnime,
    ongoingAnime,
    genreAnime,
    detailAnime,
    detailMovie,
    detailEpisode,
} = require("../controllers/nanimex")

// nanimex
router.get("/latest", latestUpdate)
router.get("/movie", movieAnime)
router.get("/ongoing", ongoingAnime)
router.get("/genres", genreAnime)
router.get("/anime/:endpoint", detailAnime)
router.get("/movie/:endpoint", detailMovie)
router.get("/episode/:endpoint", detailEpisode)


module.exports = router