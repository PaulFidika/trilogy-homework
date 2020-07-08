const path = require("path");
const fs = require("fs");

module.exports = (app) => {
    app.get("/api/notes", (req, res) => {
        fs.readFile(path.join(__dirname, "../db/db.json"), (err, file) => {
            if (err) throw err;

            let data = JSON.parse(file);
            res.send(data);
        })
    });

    app.post("/api/notes", (req, res) => {
        const filePath = path.join(__dirname, "../db/db.json");

        fs.readFile(filePath, 'utf8', (err, file) => {
            if (err) throw err;

            let data = JSON.parse(file);
            let { title, text } = req.body;
            data.push({ title, text });

            fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8', (err) => {
                res.status(200)
                    .send('Done');
            });
        });
    });

    app.delete("/api/notes/:id", (req, res) => {
        console.log('delete this ' + req.params.id);
        const filePath = path.join(__dirname, "../db/db.json");

        fs.readFile(filePath, 'utf8', (err, file) => {
            if (err) throw err;

            let data = JSON.parse(file);
            data.splice(req.params.id, 1); // remove the specified index

            fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8', (err) => {
                res.status(200)
                    .send('Done');
            });
        });
    });
};