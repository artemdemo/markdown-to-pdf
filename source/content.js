const mdRender = require('./md');
const localImages = require('./localImages');

/**
 *
 * @param content {String}
 * @return {String}
 */
const pageWrap = content => `<div class='page-break'>${content}</div>`;

/**
 *
 * @param mdData {String|Array}
 * @param options {Object}
 * @param options.basePath {String}
 * @return {String}
 */
const renderToHtml = (mdData, options = {}) => {
    const render = mdString => localImages(mdRender(mdString), {
        basePath: options.basePath,
    });

    if (Array.isArray(mdData)) {
        return mdData.map((mdString, index) => {
            if (index < mdData.length - 1) {
                return pageWrap(render(mdString));
            }
            return render(mdString);
        }).join('');
    }
    return render(mdData);
};

module.exports = {
    pageWrap,
    renderToHtml,
};