const phantom = require('phantom');
const debug = require('debug')('index');

(async function() {
    const instance = await phantom.create();
    const page = await instance.createPage();

    await page.property('viewportSize', { width: 800, height: 600 });
    await page.property('content', '<html><body><p>Hello world</p></body></html>');
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
})();