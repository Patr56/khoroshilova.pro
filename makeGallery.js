const path = require("path");
const recursive = require("recursive-readdir");
const rimraf = require("rimraf");
const mkdirp = require('mkdirp');
const crypto = require('crypto');
const transliteration = require('transliteration');
const slugify = transliteration.slugify;
const sharp = require('sharp');
const TextToSVG = require('text-to-svg');
const textToSVG = TextToSVG.loadSync();


const attributes = {
    fill: 'white',
    'fill-opacity': ".3",
};
const options = {x: 0, y: 0, fontSize: 72, anchor: 'top', attributes: attributes};

const watermarkLogo = textToSVG.getSVG('khoroshilova.pro', options);

// For Win
// const rootDir = path.join("E:", "photo", "for_site");
// For Mac
const rootDir = path.join("/", "Users", "pavel", "for_site");
const staticDir = path.join(__dirname, "static");
const imagesDir = path.join(staticDir, "images");

// rimraf.sync(imagesDir);
// mkdirp.sync(imagesDir);

const ORIGINAL = "original";
const PREVIEW = "preview";

function prepareFileInfo(originalPath, index) {
    const dir = originalPath.replace(rootDir, "").split(path.sep);

    dir.shift();

    const originalFileName = dir.pop().split(".");
    const fileName = `${slugify(originalFileName[0])}.${originalFileName[1]}`;
    const parentDirs = dir.slice(0, -1);

    const pathForHash = parentDirs.join("-");
    const hashDir = crypto.createHash('md5').update(pathForHash).digest("hex").substring(0, 5);

    const directoryName = `${hashDir}-${slugify(dir[dir.length - 1])}`;

    return {
        id: index,
        originalPath: originalPath,
        hashDir,
        directoryName,
        dir: dir,
        originalFileName,
        fileName,
        path: {
            preview: path.join("images", PREVIEW, directoryName, fileName),
            original: path.join("images", ORIGINAL, directoryName, fileName),
        }
    };
}

const IGNORE_FILES = [".DS_Store"];

function createDirectories(filesInfo) {
    const dirNames = filesInfo.reduce((dirs, fileInfo) => {
        if (dirs.indexOf(fileInfo.directoryName) < 0) {
            dirs.push(fileInfo.directoryName);
        }

        return dirs;
    }, []);

    dirNames.forEach((dirName) => {
        mkdirp.sync(path.join(imagesDir, ORIGINAL, dirName));
        mkdirp.sync(path.join(imagesDir, PREVIEW, dirName));
    });

    console.log(dirNames);
}

function copyImages(filesInfo) {

    let promiseArray = [];

    filesInfo.forEach((fileInfo) => {

        const pre = new Promise((resolve) => {
            sharp(fileInfo.originalPath)
                .resize(200)
                .toFile(path.join(staticDir, fileInfo.path.preview))
                .then(() => {
                    console.log('done pre', fileInfo.path.preview);
                    resolve()
                });
        });


        const ori = new Promise((resolve) => {
            sharp(fileInfo.originalPath)
                .withMetadata()
                .resize(960)
                .overlayWith(new Buffer(watermarkLogo), {gravity: sharp.gravity.southeast})
                .toFile(path.join(staticDir, fileInfo.path.original))
                .then(() => {
                    console.log('done ori', fileInfo.path.original);
                    resolve()
                });
        });

        promiseArray.push(pre, ori)

    });

    Promise.all(promiseArray).then(() => {
        console.log('done all')
    })

}

recursive(rootDir, IGNORE_FILES, function (err, files) {

    if (err) {
        console.error('err', err);
        return;
    }

    const filesInfo = files.map(prepareFileInfo);


    // createDirectories(filesInfo);
    // copyImages(filesInfo);
});



