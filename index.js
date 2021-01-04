
const express = require('express');
const formidable = require('formidable');
const app = express();

const PORT = process.env.PORT || 5558;
const path = require('path');
let uploadInformations = []

app.use(express.static('public'))
app.use(express.static('uploads'))

app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.render('index', { title: "My Super EJS Homepage" })
})

app.post('/add', (req, res, next) => {
    const form = formidable({
        multiples: true,
        uploadDir: './uploads',
        keepExtensions: true
    });
    form.parse(req, (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }
        
        console.log(path.basename(files.myFile.path))
        uploadInformations.push({
            filename: path.basename(files.myFile.path),
            originalName: files.myFile.name,
            input: fields.myText
        })
        res.redirect('/uploaded')
    });
})
app.get('/uploaded', (req, res) => {
    res.render('uploaded', { title: "My Super EJS Homepage", uploadInformations: uploadInformations })
})

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
