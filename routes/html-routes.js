// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Routes

module.exports = function(app) {

  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

//   app.get("/cms", function(req, res) {
//     res.sendFile(path.join(__dirname, "../public/cms.html"));
//   });

//   app.get("/blog", function(req, res) {
//     res.sendFile(path.join(__dirname, "../public/blog.html"));
//   });


//   app.get("/authors", function(req, res) {
//     res.sendFile(path.join(__dirname, "../public/author-manager.html"));
//   });

};