var express = require('express');
var proxy = require('express-http-proxy');
var randomWords = require('random-words');

var app = express();



function generatePhotos(index, max) {
    var res = [];
    for (var i = 0; i < max; i++) {
        var idImage = getRandomInt(0, 9);
        res.push({
            id: i.toString()+"-"+index.toString(),
            name: randomWords({exactly: getRandomInt(1, 5), join: ' '}),
            isCover: false,
            url: {
                original: "/album/" +  idImage + ".jpg",
                preview: "/album/" +  idImage + ".jpg"
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

app.get('/rest/albums/last', function (req, res) {
    res.send(result({albums: generateAlbum(4, 2, 10)}));
});

app.get('/rest/albums/:id', function (req, res) {
    res.send(result({albums: generateAlbum(getRandomInt(3, 20), 1, 50)}));
});

app.use(express.static('../template/images'));

app.use('/', proxy('http://localhost:9000'));

app.listen(9001, function () {
    console.log('Dev server on http://localhost:9001 !');
});
