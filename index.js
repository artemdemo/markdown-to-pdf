const debug = require('debug')('index');
const fs = require('fs');
const printPdf = require('./source/printPdf');

fs.readFile('./md/md-demo.md', 'utf8', (err, mdString) => {
    if (err) {
        debug(err);
    } else {
        fs.readFile('./source/baseStyles.css', 'utf8', (err, cssString) => {
            if (err) {
                debug(err);
            } else {
                const options = {
                    basePath: `${process.cwd()}/md`,
                };
                printPdf(mdString, cssString, options)
                    .then(() => {
                        debug('printPdf: SUCCESS');
                    })
                    .catch((err) => {
                        debug('printPdf: ERROR');
                        debug(err);
                    });
            }
        });
    }
});
