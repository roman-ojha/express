/*
    -> when the user search url(path) which doesn't exit then 
    -> we have to show 404 error
*/

const path = require("path");
const express = require("express");
const hbs = require("hbs");
const app = express();
const port = 8080;

// give the path for the css file
const staticPath = path.join(__dirname, "../../public/Class_10");
const partialsPath = path.join(__dirname, "../../views/partials");

app.use(express.static(staticPath));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../../views"));

// here we are registering partials
hbs.registerPartials(partialsPath);

app.get("", (req, res) => {
  res.render("Class_10_index", {
    channelName: "Roman",
  });
});

app.get("/about", (req, res) => {
  res.render("Class_08_about");
});
app.get("/contact", (req, res) => {
  res.render("Class_08_contact");
});

// Router Parameter by placing a colon ':' in front of the parameter name in the route's path
app.get("/users/:userId", (req, res) => {
  const userId = req.params.userId;
  res.send(`User ID: ${userId}`);
});

// you can make parameter optional by adding a ? after it
app.get("/products/:productId?", (req, res) => {
  const productId = req.params.productId || "No product specified";
  res.send(`Product ID: ${productId}`);
});

// Regular Expression:
// You can use regular expression to define more complex route patterns
app.get(/\/users\/(\d+)/, (req, res) => {
  const userId = req.params[0] || "No user specified";
  res.send(`User ID: ${userId}`);
});
// when all of those upper wirten root or path which doesn't match for the user who search it then automatically now serch result will go to '*' path

// Wildcard Routes:
// You can use a wildcard '*' to match multiple route segments

app.get("/about/*", (req, res) => {
  // now here if user go inside the about page and after that go to the page which doesn't exit then this will impleiment
  res.render("Class_09_404_error", {
    errorcomment: "Opps about us page couldn't be found",
  });
});

// when all of those upper wirten root or path which doesn't match for the user who search it then automatically now serch result will go to '*' path
app.get("*", (req, res) => {
  // we have to pass as an object
  res.render("Class_09_404_error", {
    errorcomment: "Opps page couldn't be found",
  });
});

app.listen(port, () => {});
