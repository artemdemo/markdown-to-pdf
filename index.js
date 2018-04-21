const debug = require('debug')('index');
const fs = require('fs');
const bluebird = require('bluebird');
const printPdf = require('./source/printPdf');

const readFile = bluebird.promisify(fs.readFile);

bluebird
    .props({
        mdDemo: readFile('./md/md-demo.md', 'utf8'),
        mdFrontPage: readFile('./md/md-front-page.md', 'utf8'),
        cssString: readFile('./source/baseStyles.css', 'utf8'),
    })
    .then((result) => {
        const options = {
            basePath: `${process.cwd()}/md`,
        };
        return printPdf(
            [
                result.mdFrontPage,
                result.mdDemo,
            ],
            'test.pdf',
            result.cssString,
            options,
        )
    })
    .then(() => debug('printPdf: SUCCESS'))
    .catch(err => debug(err));

