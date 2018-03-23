var request = require("request");
var cheerio = require("cheerio");

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
            $('h2.story-heading').each(function (i, element) {
                
                // Save the text of the element in a "title" variable
                var title = $(element).text();
                // In the currently selected element, look at its child elements (i.e., its a-tags),
                // then save the values for any "href" attributes that the child elements may have
                var link = $(element).children().attr('href');
                // Save these results in an object that we'll push into the results array we defined earlier
                results.push({
                    title: title,
                    link: link
                });
            });
            // Log the results once you've looped through each of the elements found with cheerio
            console.log(results);
            res.send("Scrape Complete");
        });
    });
}