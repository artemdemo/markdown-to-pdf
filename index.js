const phantom = require('phantom');
const MarkdownIt = require('markdown-it');
const debug = require('debug')('index');
const fs = require('fs');
const inlineImages = require('./local-images');

const md = new MarkdownIt();

const printPdf = async function(markDown, options = null) {
    const instance = await phantom.create();
    const page = await instance.createPage();

    const content = inlineImages(md.render(markDown), options);

    //console.log(content);

    await page.property('viewportSize', { width: 800, height: 600 });
    await page.property('content', `<html><body>${content}</body></html>`);
    await page.property('paperSize', {
        format: 'A4',
        margin: '1cm',
        /* default header/footer for pages that don't have custom overwrites (see below) */
        header: {
            height: '1cm',
            contents: instance.callback(function(pageNum, numPages) {
                // if (pageNum === 1) {
                //     return '';
                // }
                return "<div>Header <span style='float:right'>" + pageNum + " / " + numPages + "</span></div>";
            })
        },
        footer: {
            height: '1cm',
            contents: instance.callback(function(pageNum, numPages) {
                // if (pageNum === numPages) {
                //     return '';
                // }
                return "<div>Footer <span style='float:right'>" + pageNum + " / " + numPages + "</span></div>";
            })
        }
    });

    await page.render('test.pdf');
    debug(`File created at [./test.pdf]`);

    await instance.exit();
};

fs.readFile('./md/md-simple.md', 'utf8', (err, data) => {
    if (err) {
        debug(err);
    } else {
        printPdf(data, { basePath: `${process.cwd()}/md` })
            .then(() => {
                debug('printPdf: SUCCESS');
            })
            .catch((err) => {
                debug('printPdf: ERROR');
                debug(err);
            });
    }
});
