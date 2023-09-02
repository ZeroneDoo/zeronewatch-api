const { Router } = require("express")

const router = Router()

const {
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
} = require("../controllers/komiku")

// komiku
router.get("/popular", popularComic)
router.get("/updated", updatedComic)
router.get("/manhwa", manhwaType)
router.get("/manhua", manhuaType)
router.get("/manga", mangaType)
router.get("/comic/:endpoint", detail)
router.get("/genres", genres)
router.get("/genres/:endpoint", detailGenre)
router.get("/chapter/:endpoint", chapter)
router.get("/search", search)

module.exports = router