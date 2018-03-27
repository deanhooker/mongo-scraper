var db = require("../models");
var ObjectId = require('mongodb').ObjectId;

function fetch(req, res) {

    db.Article.find({})
        .populate("notes")
        .exec(function (err, articles) {
            if (err) { console.log(err); }
            db.Article
                // .count()
                .exec(function (err) {
                    if (err) { console.log(err) }
                    res.render("home", {
                        articles
                    });
                });
        });
}

function singleArticle(req, res) {

    var articleID = req.params.id;
    var searchID = new ObjectId(articleID)
    db.Article.find({
        "_id": searchID
    })
        .populate("notes")
        .exec(function (err, articles) {
            if (err) { console.log(err); }
            console.log(articles);
            db.Article
                .exec(function (err) {
                    if (err) console.log(err);
                    res.render("selectedarticle", { articles });
                })
        })
}

module.exports = {
    fetch, singleArticle
};