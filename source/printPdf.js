const phantom = require('phantom');
const path = require('path');
const debug = require('debug')('printPdf');
const headersConfig = require('./headers/headersConfig');
const header = require('./headers/header');
const footer = require('./headers/footer');
const content = require('./content');

/**
 *
 * @param mdData {String|Array}
 * @param pdfFileName {String}
 * @param options {Object}
 * @param options.basePath {String}
 * @param options.targetDir {String}
 * @param options.css {String}
 * @return {Promise<void>}
 */
const printPdf = async function(mdData, pdfFileName, options = {}) {
    const instance = await phantom.create();
    const page = await instance.createPage();

    const defaultOptions = {
        css: '',
        targetDir: './',
        basePath: './',
    };

    const _options = Object.assign(defaultOptions, options);

    const resultHtml = content.renderToHtml(mdData, {
        basePath: _options.basePath,
    });

    await page.property('viewportSize', { width: 800, height: 600 });
    await page.property(
        'content',
        `<html>
            <head>
                <style>${_options.css}</style>
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

    await page.render(path.join(_options.targetDir, pdfFileName));
    debug(`${pdfFileName} created`);

    await instance.exit();
};

module.exports = printPdf;
