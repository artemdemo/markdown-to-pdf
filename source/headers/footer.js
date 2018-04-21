const headersConfig = require('./headersConfig');

const headerStyle = [
    headersConfig.baseStyle,
    'border-top: 1px dotted gray;',
].join(' ');

const header = Function('pageNum', 'numPages', `
if (pageNum === 1) {
     return '';
}
return [
    "<div style='${headerStyle}'>",
    "Footer",
    "<span style='float:right'>",
    pageNum,
    "/",
    numPages,
    "</span>",
    "</div>",
].join('');
`);

module.exports = header;