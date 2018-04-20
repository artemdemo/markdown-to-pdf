const phantom = require('phantom');
const debug = require('debug')('printPdf');
const inlineImages = require('./localImages');
const mdRender = require('./md');

const printPdf = async function(mdString, cssString = '', options = {}) {
    const instance = await phantom.create();
    const page = await instance.createPage();

    const content = inlineImages(mdRender(mdString), options);

    //console.log(content);

    await page.property('viewportSize', { width: 800, height: 600 });
    await page.property(
        'content',
        `<html>
            <head>
                <style>${cssString}</style>
            </head>
            <body>${content}</body>
         </html>`,
    );
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
                return [
                    "<div style='font-family: Arial, Tahoma, sans-serif; font-size: 10px; border-bottom: 1px dotted gray;'>",
                    "Header <span style='float:right'>",
                    pageNum,
                    "/",
                    numPages,
                    "</span>",
                    "</div>",
                ].join('');
            })
        },
        footer: {
            height: '1cm',
            contents: instance.callback(function(pageNum, numPages) {
                // if (pageNum === numPages) {
                //     return '';
                // }
                return [
                    "<div style='font-family: Arial, Tahoma, sans-serif; font-size: 10px; border-top: 1px dotted gray;'>",
                    "Footer <span style='float:right'>",
                    pageNum,
                    "/",
                    numPages,
                    "</span>",
                    "</div>",
                ].join('');
            })
        }
    });

    await page.render('test.pdf');
    debug(`File created at [./test.pdf]`);

    await instance.exit();
};

module.exports = printPdf;
