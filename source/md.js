const MarkdownIt = require('markdown-it');

const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
});

/**
 *
 * @param mdString {String}
 * @return {String}
 */
const render = (mdString) => {
    return md.render(mdString);
};

module.exports = render;