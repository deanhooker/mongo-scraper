var db = require("../models");

function addNote(req, res) {
    db.Note.create(req.body)
        .then(function (dbNote) {
            return db.Article.findOneAndUpdate({ _id: req.params.id }, { $push: { notes: dbNote._id } }, { new: true });
        })
        .then(function (dbArticle) {

            // If the User was updated successfully, send it back to the client
            res.redirect("/#" + req.params.id);
        })
        .catch(function (err) {

            // If an error occurs, send it back to the client
            console.log(err);
        });
}

function deleteNote(req, res) {
    db.Note.remove({
        _id: req.params.noteID
    })
        .then(function (deleted) {
            console.log("Note deleted");
            res.redirect("/#" + req.params.id);
        })
        .catch(function (err) {
            console.log(error);
        });
}

module.exports = {
    addNote, deleteNote
};