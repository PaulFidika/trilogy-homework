const express = require("express");
var path = require('path');
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);

app.listen(PORT, () => {
    console.log(`App is running and listening on http://localhost:${PORT}`);
})