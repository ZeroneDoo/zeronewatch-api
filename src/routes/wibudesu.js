const { Router } = require("express")

const router = Router()

const {
    popular,
    latest,
    search,
    genres,
    genreDetail,
    detail,
    ghibliStudio
} = require("../controllers/wibudesu")

router.get("/popular", popular)
router.get("/latest", latest)
router.get("/genres", genres)
router.get("/genres/:endpoint", genreDetail)
router.get("/detail/:endpoint", detail)
router.get("/search", search)
router.get("/ghibli", ghibliStudio)

module.exports = router