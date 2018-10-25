var path = require("path");
var recursive = require("recursive-readdir");
var rimraf = require("rimraf");
var mkdirp = require('mkdirp');
var crypto = require('crypto');

var rootDir = path.join("E:", "photo", "for_site");
var galleryDir = path.join(__dirname, "static", "images");

rimraf.sync(galleryDir);
mkdirp.sync(galleryDir);

var ORIGINAL = "original";
var PREVIEW = "preview";

function prepareFileInfo(originalPath, index) {
    var dir = originalPath.replace(rootDir, "").split(path.sep);

    dir.shift();

    var fileName = dir.pop();

    return {
        id: index,
        originalPath: originalPath,
        // dirHash: crypto.createHash('md5').update(dir.join("-")).digest("hex"),
        dir: dir,
        fileName: fileName
    };
}



recursive(rootDir, function (err, files) {

    var filesInfo = files.map(prepareFileInfo);

    var dirNames = filesInfo.reduce((dirs, fileInfo) => {

        fileInfo.dir.forEach((dirName, index) => {
            var c = crypto.createHash('md5').update(fileInfo.dir.slice(index).join("-")).digest("hex")
            var checkName = c + "-" + dirName;
            var level = dirs.indexOf(dirName);

            if (level < 0) {
                console.log(checkName);
                dirs.push(dirName);
            }
        })

        return dirs;
    }, [])

    dirNames.forEach((dirName) => {
        mkdirp.sync(path.join(galleryDir, ORIGINAL, dirName))
        mkdirp.sync(path.join(galleryDir, PREVIEW, dirName))
    })

    // console.log(filesInfo);
    // `files` is an array of file paths
    console.log(dirNames);

});


