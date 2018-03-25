var db = require("../models");

function fetch(req, res) {

    db.Article.find({})
        .populate("notes")
        .exec(function(err, articles) {
            if (err) {console.log(err);}
            db.Article
                .count()
                .exec(function(err, count) {
                    if (err) {console.log(err)}
                    res.render("home", {
                        articles
                    });
                });
        });
}

module.exports = {fetch};