var request = require("request");
var cheerio = require("cheerio");
var db = require("../models");

module.exports = function (app) {
    app.get("/scrape", function (req, res) {
        // First, we grab the body of the html with request
        request("https://www.nytimes.com/", function (error, response, html) {

            // Then, we load that into cheerio and save it to $ for a shorthand selector
            var $ = cheerio.load(html);

            // An empty array to save the data that we'll scrape
            var results = [];
            // With cheerio, find each p-tag with the "title" class
            // (i: iterator. element: the current element)
            $('article.story').each(function (i, element) {

                // Save the parts we want from each element
                var title = $(element).find('.story-heading').text();
                var summary = $(element).find('.summary').text();
                var link = $(element).find('.story-heading').find('a').attr('href');
                // Save these results in an object that we'll push into the results array we defined earlier
                results.push({
                    title: title,
                    summary: summary,
                    link: link
                });
            });

            // create an article in our database for each article obj pushed into the results array with predefined keys that correspond to the keys of the database collection
            results.forEach(data => {
                db.Headline
                    .create(data)
                    .then(dbHeadline => {

                    }).catch(err => {
                        // If an error occurred, log it, with the catch statement, the program won't crash when it runs into a duplicate key error
                        console.log(err.errmsg);
                    })
            })
            res.send(results);
        });
    });
}