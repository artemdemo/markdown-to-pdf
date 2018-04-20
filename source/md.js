const MarkdownIt = require('markdown-it');
const md = new MarkdownIt();

/**
 *
 * @param mdString {String}
 * @return {String}
 */
const render = (mdString) => {
    return md.render(mdString);
};

module.exports = render;