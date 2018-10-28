const path = require("path");
const recursive = require("recursive-readdir");
const rimraf = require("rimraf");
const mkdirp = require('mkdirp');
const crypto = require('crypto');
const transliteration = require('transliteration');
const slugify = transliteration.slugify;
const sharp = require('sharp');
const lodash = require('lodash');
const TextToSVG = require('text-to-svg');
const textToSVG = TextToSVG.loadSync();
const fs = require("fs");


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
const mockRestDir = path.join(staticDir, "mock", "rest");
const mockRestAlbumDir = path.join(mockRestDir, "album");

rimraf.sync(imagesDir);
rimraf.sync(mockRestAlbumDir);
mkdirp.sync(imagesDir);
mkdirp.sync(mockRestAlbumDir);

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

function getDirId(dirs, level) {
    return dirs.map(slugify).slice(0, level).join('-');
}

function prepareAlbums(filesInfo) {
    const albums = filesInfo.reduce((alb, fileInfo) => {

        fileInfo.dir.forEach((name, level) => {

            const id = getDirId(fileInfo.dir, level + 1);
            const idPrev = getDirId(fileInfo.dir, level);
            const findDirIndex = lodash.findIndex(alb, (albumItem) => albumItem.id === id);

            if (findDirIndex < 0) {
                alb.push({
                    // id,
                    level,
                    name,
                    id,
                    albums: [],
                    photos: [],
                })
            } else {
                const findDirPrevIndex = lodash.findIndex(alb, (albumItem) => albumItem.id === idPrev);
                if (findDirPrevIndex >= 0) {
                    const findDirInIndex = lodash.findIndex(alb[findDirPrevIndex].albums, (albumItem) => albumItem.id === id);
                    if (findDirInIndex < 0) {
                        alb[findDirPrevIndex].albums.push({
                            // id: alb[findDirIndex].id,
                            id: getDirId(fileInfo.dir, level + 1),
                            name: alb[findDirIndex].name,
                            level: alb[findDirIndex].level,
                            photos: [],
                            url: {
                                original: '',
                                preview: ''
                            },
                            count: 0
                        })
                    }
                }
            }
        });

        const id = getDirId(fileInfo.dir, fileInfo.dir.length);
        const findDirIndex = lodash.findIndex(alb, (albumItem) => albumItem.id === id);

        if (findDirIndex >= 0) {
            alb[findDirIndex].photos.push({
                id: fileInfo.id,
                url: {
                    original: fileInfo.path.original,
                    preview: fileInfo.path.preview,
                },
                name: fileInfo.fileName,
                isCover: false
            })
        }

        return alb;
    }, []);

    const albumsAddAlbumInfo = albums.map((album) => {

        if (album.albums.length > 0) {
            album.albums = album.albums.map((innerAlbum) => {
                const findAlbumIndex = lodash.findIndex(albums, (albumItem) => albumItem.id === innerAlbum.id);
                const coverPhoto = albums[findAlbumIndex].photos.filter((photo) => photo.isCover === true);

                if (coverPhoto.length > 0) {
                    innerAlbum.photos.push( {...coverPhoto[0]});
                    innerAlbum.url = {
                        original: coverPhoto[0].url.original,
                        preview: coverPhoto[0].url.preview,
                    }
                } else {
                    if (albums[findAlbumIndex].photos.length > 0) {
                        innerAlbum.photos.push({...albums[findAlbumIndex].photos[0]});
                        innerAlbum.url = {
                            original: albums[findAlbumIndex].photos[0].url.original,
                            preview: albums[findAlbumIndex].photos[0].url.preview,
                        }
                    }

                }

                innerAlbum.count = albums[findAlbumIndex].photos.length;

                return innerAlbum;
            })
        }

        return album;
    });

    return albumsAddAlbumInfo;
}

function getResponse(body) {
    return JSON.stringify({
        success: true,
        body,
    }, null, 2)
}

function createMockAlbumFile(albums) {
    albums.forEach((album) => {

        fs.writeFile(path.join(mockRestAlbumDir, album.id + ".json"), getResponse(album), (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        });

    })
}

recursive(rootDir, IGNORE_FILES, function (err, files) {

    if (err) {
        console.error('err', err);
        return;
    }

    const filesInfo = files.map(prepareFileInfo);

    const albums = prepareAlbums(filesInfo);

    createMockAlbumFile(albums);

     createDirectories(filesInfo);
     copyImages(filesInfo);
});



