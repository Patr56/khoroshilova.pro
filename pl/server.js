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
                original: "/original/" +  idImage + ".jpg",
                preview: "/preview/" +  idImage + ".jpg"
            }
        })
    }
    return res;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateAlbum(count, min, max) {

    var res = [];
    for (var i = 0; i < count; i++) {
        res.push({
            id: i.toString(),
            name: randomWords({exactly: getRandomInt(1, 5), join: ' '}),
            photos: generatePhotos(i, getRandomInt(min, max))
        })
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
    res.send(result({albums: generateAlbum(4, 2, 10)}));
});

app.get('/rest/album/:id', function (req, res) {
    res.send(result({
        id: req.params.id,
        albums: generateAlbum(getRandomInt(3, 20), 1, 50),
        photos: generatePhotos(req.params.id, getRandomInt(1, 50))
    }));
});

app.get('/rest/album/', function (req, res) {
    var id = "root";
    res.send(result({
        id: id,
        albums: generateAlbum(getRandomInt(3, 20), 1, 50),
        photos: generatePhotos(id, getRandomInt(1, 50))
    }));
});

app.use(express.static('../template/images'));

app.use('/', proxy('http://localhost:9000'));

app.listen(9001, function () {
    console.log('Dev server on http://localhost:9001 !');
});
