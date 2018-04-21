const headersConfig = require('./headersConfig');

const headerStyle = [
    headersConfig.baseStyle,
    'border-bottom: 1px dotted gray;',
].join(' ');

const header = Function('pageNum', 'numPages', `
if (pageNum === 1) {
     return '';
}
return [
    "<div style='${headerStyle}'>",
    "Header",
    "<span style='float:right'>",
    pageNum,
    "/",
    numPages,
    "</span>",
    "</div>",
].join('');
`);

module.exports = header;