var request = require("request");
var cheerio = require("cheerio");
var db = require("../models");

function scrape(req, res) {
    var url = "https://www.nytimes.com/";
    request(url, function (error, response, body) {
        if (error) {
            res.send(500, {error});

        } else {
            var $ = cheerio.load(body);
            var results = [];

            $('article.story').each(function (i, element) {
                var result = {};

                result.title = $(this)
                    .find('.story-heading')
                    .text();
                result.link = url + $(this)
                    .find('.story-heading')
                    .children('a')
                    .attr("href");
                result.description = $(this)
                    .find(".summary")
                    .text();

                results.push(result);
                return i < 19;
            });

            db.Article.create(
                results
            )
            .then(function (dbArticle) {
                console.log(dbArticle);
            })
            .catch(function (err) {
                console.log(err);
            });
        }

        res.redirect("/");
    });
}

module.exports = {scrape};