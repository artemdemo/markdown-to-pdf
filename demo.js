const debug = require('debug')('demo');
const fs = require('fs');
const bluebird = require('bluebird');
const del = bluebird.promisify(require('delete'));
const printPdf = require('./index');

const readFile = bluebird.promisify(fs.readFile);

const targetDir = `${process.cwd()}/result`;
const resultPdfFileName = 'printed-md.pdf';

bluebird
    .props({
        pages: bluebird.all([
            readFile('./md-demo/md-front-page.md', 'utf8'),
            readFile('./md-demo/md-demo.md', 'utf8'),
        ]),
        cssString: readFile('./source/baseStyles.css', 'utf8'),
        deletedFiles: del([`${targetDir}/*.pdf`]),
    })
    .then((result) => {
        const options = {
            css: result.cssString,
            basePath: `${process.cwd()}/md-demo`,
            targetDir,
        };
        debug('Deleted files:');
        debug(result.deletedFiles);
        return printPdf(
            result.pages,
            resultPdfFileName,
            options,
        )
    })
    .then(() => debug('printPdf: SUCCESS'))
    .catch(err => debug(err));

