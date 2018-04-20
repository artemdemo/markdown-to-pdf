const path = require('path');
const debug = require('debug')('local-images');

const defaultOptions = {
    basePath: process.cwd(),
};

/**
 *
 * @param htmlData {String}
 * @param options {Object}
 * @param options.basePath {String}
 * @return {string}
 */
const localImages = (htmlData, options = {}) => {
    const imageRegex = /<img[^<]+>/g;
    const srcRegex = /src="([^"]+)"/;

    const urlRegex = /^htt(?:p|ps):\/\/\S*/;

    const _options = Object.assign(defaultOptions, options);

    let resultHtml = '';

    let imageMatch;
    let prevIndex = 0;

    while ((imageMatch = imageRegex.exec(htmlData)) !== null) {
        const imgTag = imageMatch[0];
        const imgStrIndex = imageMatch.index;
        debug('Image found at index', imgStrIndex);

        resultHtml += htmlData.substring(prevIndex, imgStrIndex);
        const srcMatch = srcRegex.exec(imgTag);
        if (srcMatch) {
            const imgPath = srcMatch[1];

            if (!urlRegex.test(imgPath)) {
                const imgPathNorm = path.join(_options.basePath, imgPath);
                debug('Path to image', imgPath);
                debug('Normalized path', imgPathNorm);
                resultHtml += `<img src="file://${imgPathNorm}" />`;
            } else {
                debug('‼️  Attention:');
                debug('There is HTTP link in image. Probably there will be a problem with pdf creation');
                debug(imgPath);
                resultHtml += imgTag;
            }
        }
        prevIndex = imgStrIndex + imgTag.length;
    }
    resultHtml += htmlData.substring(prevIndex, htmlData.length - 1);
    return resultHtml;
};

module.exports = localImages;