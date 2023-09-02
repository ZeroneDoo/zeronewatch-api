const { Router } = require("express")

const router = Router()

const {
    seriesAll,
    seriesUpdated,
    movieAll,
    newMovie,
    ongoingSeries,
    completedSeries,
    genres,
    detailGenres,
    searchAll,
    detailAllType
} = require("../controllers/drakorkita")

// drakorkita
router.get("/series", seriesAll)
router.get("/movie", movieAll)
router.get("/series/updated", seriesUpdated)
router.get("/series/ongoing", ongoingSeries)
router.get("/series/completed", completedSeries)
router.get("/movie/newest", newMovie)
router.get("/genres", genres)
router.get("/genres/:endpoint", detailGenres)
router.get("/search", searchAll)
router.get("/detail/:endpoint", detailAllType)

module.exports = router