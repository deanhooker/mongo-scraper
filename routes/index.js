module.exports = function (app) {
    require("./view-routes")(app);
    require("./api-routes")(app);
}