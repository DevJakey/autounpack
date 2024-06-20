const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');
const { exec } = require('child_process');

const mediaDir = '/media/ssd/torrent/files/movies';
const watchDir = '/media/ssd/torrent/files';

const watcher = chokidar.watch(watchDir, {
    ignored: /(^|[\/\\])\../,
    persistent: true
});

const isFileFullyWritten = (filePath, callback) => {
    let lastSize = 0;
    let interval = setInterval(() => {
        fs.stat(filePath, (err, stats) => {
            if (err) {
                clearInterval(interval);
                return callback(err);
            }
            if (stats.size === lastSize) {
                clearInterval(interval);
                return callback(null, true);
            }
            lastSize = stats.size;
        });
    }, 1000);
};

const moveFile = (filePath, callback) => {
    const newPath = path.join(mediaDir, path.basename(filePath));
    fs.rename(filePath, newPath, (err) => {
        if (err) {
            return callback(err);
        }
        console.log('File moved successfully to', newPath);
        callback(null, newPath);
    });
};

const checkAndDeleteDir = (dirPath) => {
    fs.readdir(dirPath, (err, files) => {
        if (err) {
            return console.log('Error reading directory', err);
        }
        if (files.length === 0) {
            exec(`rm -rf ${dirPath}`, (err) => {
                if (err) {
                    return console.log('Error deleting directory', err);
                }
                console.log('Directory deleted successfully', dirPath);
            });
        }
    });
};

watcher.on('add', (filePath) => {
    console.log('File', filePath, 'has been added');
    const ext = path.extname(filePath).toLowerCase();
    if (ext === '.mp4' || ext === '.mkv' || ext === '.avi') {
        isFileFullyWritten(filePath, (err) => {
            if (err) {
                return console.log('Error checking file', err);
            }
            moveFile(filePath, (err, newPath) => {
                if (err) {
                    return console.log('Error moving file', err);
                }
                const dirPath = path.dirname(filePath);
                checkAndDeleteDir(dirPath);
            });
        });
    }
});

watcher.on('addDir', (dirPath) => {
    console.log('Directory', dirPath, 'has been added');
});

watcher.on('change', (filePath) => {
    console.log('File', filePath, 'has been changed');
});

watcher.on('unlink', (filePath) => {
    console.log('File', filePath, 'has been removed');
    const dirPath = path.dirname(filePath);
    checkAndDeleteDir(dirPath);
});

watcher.on('unlinkDir', (dirPath) => {
    console.log('Directory', dirPath, 'has been removed');
    checkAndDeleteDir(dirPath);
});

watcher.on('error', (error) => {
    console.log('Error happened', error);
});

watcher.on('ready', () => {
    console.log('Initial scan complete. Ready for changes');
});
