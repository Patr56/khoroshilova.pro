var express = require('express');
var proxy = require('express-http-proxy');
var randomWords = require('random-words');

var app = express();

function generatePhotos(index, max) {
    var res = [];
    for (var i = 0; i < max; i++) {
        var idImage = getRandomInt(0, 9);
        res.push({
            id: index.toString() + "-" + i.toString(),
            name: randomWords({exactly: getRandomInt(1, 5), join: ' '}),
            isCover: false,
            url: {
                original: "/images/original/" +  idImage + ".jpg",
                preview: "/images/preview/" +  idImage + ".jpg"
            }
        })
    }
    return res;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateAlbum(startId, count, min, max) {

    var res = [];
    for (var i = startId + 1; i < (startId + count + 1); i++) {
        res.push({
            id: i.toString(),
            name: randomWords({exactly: getRandomInt(1, 5), join: ' '}),
            photos: generatePhotos(i, getRandomInt(min, max))
        })
    }
    return res;
}

function generateRandomArticle(id) {
    return {
        id: id,
        datetime: Date.now(),
        title: randomWords({exactly: getRandomInt(1, 5), join: ' '}),
        text: randomWords({exactly: getRandomInt(100, 1000), join: ' '}),
    }
}

function generateRandomArticles(startId) {

    var res = [];
    for (var i = startId + 1; i < (startId + count + 1); i++) {
        res.push(generateRandomArticle(i))
    }
    return res;
}

function result(data) {
    return {
        success: true,
        body: data
    }
}

app.get('/rest/album/last', function (req, res) {
    res.send(result({
        id: "last",
        name: randomWords({exactly: getRandomInt(1, 5), join: ' '}),
        albums: generateAlbum(0, 4, 2, 10)
    }));
});


app.get('/rest/album/:type(simple|poster|location)', function (req, res) {
    res.send(result({
        id: req.params.type,
        name: randomWords({exactly: getRandomInt(1, 5), join: ' '}),
        photos: generatePhotos(req.params.type, getRandomInt(3, 4))
    }));
});

app.get('/rest/album/:id', function (req, res) {
    res.send(result({
        id: req.params.id,
        name: randomWords({exactly: getRandomInt(1, 5), join: ' '}),
        albums: generateAlbum(req.params.id * 1, getRandomInt(3, 20), 1, 50),
        photos: generatePhotos(req.params.id, getRandomInt(1, 50))
    }));
});

app.get('/rest/blog/:id', function (req, res) {
    res.send(result(generateRandomArticle(req.params.id * 1)));
});

app.get('/rest/blog/', function (req, res) {
    res.send(result(generateRandomArticles(0)));
});

// app.get('/rest/album/', function (req, res) {
//     var id = "root";
//     res.send(result({
//         id: id,
//         name: randomWords({exactly: getRandomInt(1, 5), join: ' '}),
//         albums: generateAlbum(0, getRandomInt(3, 20), 1, 50),
//         photos: generatePhotos(id, getRandomInt(1, 50))
//     }));
// });

app.use(express.static('./static/'));

app.use('/', proxy('http://localhost:9000'));

app.listen(9001, function () {
    console.log('Dev server on http://localhost:9001 !');
});
