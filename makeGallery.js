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
const rootDir = path.join("E:", "photo", "for_site");
// For Mac
// const rootDir = path.join("/", "Users", "pavel", "for_site");
const staticDir = path.join(__dirname, "static");
const imagesDir = path.join(staticDir, "images");
const mockDir = path.join(staticDir, "mock");
const mockRestDir = path.join(staticDir, "mock", "rest");
const mockRestAlbumDir = path.join(mockRestDir, "album");

rimraf.sync(imagesDir);
rimraf.sync(mockRestAlbumDir);
mkdirp.sync(imagesDir);
mkdirp.sync(mockDir);
mkdirp.sync(mockRestDir);
mkdirp.sync(mockRestAlbumDir);

const ORIGINAL = "original";
const PREVIEW = "preview";

function prepareFileInfo(originalPath, index) {
    const stats = fs.statSync(originalPath);

    const dir = originalPath.replace(rootDir, "").split(path.sep);

    dir.shift();

    const originalFileName = dir.pop().split(".");
    const fileName = `${slugify(originalFileName[0])}.${originalFileName[1]}`;
    const parentDirs = dir.slice(0, -1);

    const pathForHash = parentDirs.join("-");
    const hashDir = crypto.createHash('md5').update(pathForHash).digest("hex").substring(0, 5);

    const directoryName = `${hashDir}-${slugify(dir[dir.length - 1])}`;

    const isCover = fileName.startsWith('oblozhka');

    return {
        id: index,
        originalPath: originalPath,
        hashDir,
        directoryName,
        dir: dir,
        originalFileName,
        fileName,
        isCover,
        date: stats.mtime,
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

    // console.log(dirNames);
}

function copyImages(filesInfo) {

    let promiseArray = [];

    filesInfo.forEach((fileInfo) => {

        const pre = new Promise((resolve) => {
            sharp(fileInfo.originalPath)
                .resize({
                    width: 200,
                    height: 168,
                    fit: sharp.fit.cover,
                    position: sharp.position.top
                })
                .toFile(path.join(staticDir, fileInfo.path.preview))
                .then(() => resolve());
        });


        const ori = new Promise((resolve) => {
            sharp(fileInfo.originalPath)
                .withMetadata()
                .resize(960)
                .overlayWith(new Buffer(watermarkLogo), {gravity: sharp.gravity.southeast})
                .toFile(path.join(staticDir, fileInfo.path.original))
                .then(() => resolve());
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
    const albums = filesInfo.reduce((alb, fileInfo, index) => {

        fileInfo.dir.forEach((name, level) => {

            const id = getDirId(fileInfo.dir, level + 1);
            const idPrev = getDirId(fileInfo.dir, level);
            const findDirIndex = lodash.findIndex(alb, (albumItem) => albumItem.id === id);

            const parentDirs = fileInfo.dir.slice(0, level + 1);

            if (findDirIndex < 0) {
                alb.push({
                    id,
                    level,
                    name,
                    date: fileInfo.date,
                    breadcrumbs: parentDirs.map((dirName, index) => {
                        return {
                            id: getDirId(parentDirs, index + 1),
                            name: dirName,
                        };
                    }),
                    albums: [],
                    photos: [],
                })
            } else {
                const findDirPrevIndex = lodash.findIndex(alb, (albumItem) => albumItem.id === idPrev);
                if (findDirPrevIndex >= 0) {
                    const findDirInIndex = lodash.findIndex(alb[findDirPrevIndex].albums, (albumItem) => albumItem.id === id);
                    if (findDirInIndex < 0) {
                        alb[findDirPrevIndex].albums.push({
                            id: getDirId(fileInfo.dir, level + 1),
                            name: alb[findDirIndex].name,
                            level: alb[findDirIndex].level,
                            photos: [{
                                id: index,
                                url: {
                                    original: fileInfo.path.original,
                                    preview: fileInfo.path.preview,
                                },
                                name: alb[findDirIndex].name,
                                isCover: fileInfo.isCover
                            }],
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
                isCover: fileInfo.isCover
            })
        }

        return alb;
    }, []);

    return albums.map((album) => {

        if (album.albums.length > 0) {
            album.albums = album.albums.map((innerAlbum) => {

                // Рекурсивно ищем обложку для альбома.
                function findCoverPhotoForAlbum (innerAlb) {
                    const albumIndex = lodash.findIndex(albums, (albumItem) => albumItem.id === innerAlb.id);
                    const coverPhoto = albums[albumIndex].photos.filter((photo) => photo.isCover === true);
                    if (coverPhoto.length > 0) {
                        return {
                            count: albums[albumIndex].photos.length,
                            coverPhoto: {...coverPhoto[0]}
                        };
                    } else {
                        return findCoverPhotoForAlbum(albums[albumIndex].albums[0]);
                    }
                }

                const infoAboutCover = findCoverPhotoForAlbum(innerAlbum);

                innerAlbum.count = infoAboutCover.count;

                innerAlbum.photos = [{
                    ...infoAboutCover.coverPhoto,
                    name: innerAlbum.name,
                }];

                return innerAlbum;
            })
        }

        return album;
    });
}

function getResponse(body) {
    return JSON.stringify({
        success: true,
        body,
    }, null, 2)
}

const lastAlbums = {
    id: "last",
    level: 0,
    name: "last",
    albums: [],
    photos: []
};

function createMockAlbumFile(albums) {
    albums.forEach((album) => {

        fs.writeFile(path.join(mockRestAlbumDir, album.id + ".json"), getResponse(album), (err) => {
            if (err) throw err;
        });

    });

    const last = albums.filter((a) => a.photos.length > 0 && a.level > 0)
        .sort((a1, a2) => new Date(a2.date).getTime() - new Date(a1.date).getTime()).slice(0, 4)
        .reduce((all, alb) => {
            delete alb.breadcrumbs;
            alb.count = alb.photos.length;
            alb.photos = alb.photos.filter((a) => a.isCover);
            alb.photos[0].name = alb.name;
            all.albums = all.albums.concat(alb);
            return all;
        }, lastAlbums);

    fs.writeFile(path.join(mockRestAlbumDir, "last.json"), getResponse(last), (err) => {
        if (err) throw err;
        // console.log('The file has been saved!');
    });

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



