const phantom = require('phantom');
const debug = require('debug')('printPdf');
const inlineImages = require('./localImages');
const mdRender = require('./md');
const headersConfig = require('./headers/headersConfig');
const header = require('./headers/header');
const footer = require('./headers/footer');
const content = require('./content');

/**
 *
 * @param mdData {String|Array}
 * @param pdfFileName {String}
 * @param cssString {String}
 * @param options {Object}
 * @return {Promise<void>}
 */
const printPdf = async function(mdData, pdfFileName, cssString = '', options = {}) {
    const instance = await phantom.create();
    const page = await instance.createPage();

    const renderToHtml = mdString => inlineImages(mdRender(mdString), options);

    const resultHtml = (() => {
        if (Array.isArray(mdData)) {
            return mdData.map(mdString => content.pageWrap(renderToHtml(mdString))).join('');
        }
        return renderToHtml(mdData);
    })();

    await page.property('viewportSize', { width: 800, height: 600 });
    await page.property(
        'content',
        `<html>
            <head>
                <style>${cssString}</style>
            </head>
            <body>${resultHtml}</body>
         </html>`,
    );
    await page.property('paperSize', {
        format: 'A4',
        margin: '1cm',
        header: {
            height: headersConfig.headerHeight,
            contents: instance.callback(header)
        },
        footer: {
            height: headersConfig.footerHeight,
            contents: instance.callback(footer)
        }
    });

    await page.render(pdfFileName);
    debug(`${pdfFileName} created`);

    await instance.exit();
};

module.exports = printPdf;
