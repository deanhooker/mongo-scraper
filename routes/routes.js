var express = require('express');
var router = express.Router();
var scrape = require('../controllers/scrape.js');
var note = require('../controllers/note.js');
var fetch = require('../controllers/fetch.js');
var db = require("../models");

router.get("/", fetch.fetch);
router.get("/articles/:id", fetch.singleArticle);
router.get('/scrape', scrape.scrape);
router.post("/articles/:id/notes", note.addNote);
router.delete("/articles/:id/notes/:noteID", note.deleteNote);

module.exports = router;