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
        content: bluebird.all([
            readFile('./md-demo/md-front-page.md', 'utf8'),
            readFile('./md-demo/md-demo.md', 'utf8'),
        ]),
        cssString: readFile('./source/baseStyles.css', 'utf8'),
        deletedFiles: del([`${targetDir}/*.pdf`]),
    })
    .then((result) => {
        debug('All content files loaded');
        debug('Deleted files:');
        debug(result.deletedFiles);
        const options = {
            css: result.cssString,
            basePath: `${process.cwd()}/md-demo`,
            targetDir,
        };
        return printPdf(
            result.content,
            resultPdfFileName,
            options,
        )
    })
    .then(() => debug('pdf created'))
    .catch(err => debug(err));

