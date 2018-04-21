const { expect } = require('chai');
const { pageWrap, renderToHtml } = require('../content');

describe('content', () => {
    it('should wrap content', () => {
        const content = 'some content';
        expect(pageWrap(content)).to.equal(`<div class='page-break'>${content}</div>`);
    });

    it('should handle data as string', () => {
        const content = 'some content';
        expect(renderToHtml(content)).to.equal('<p>some content</p>\n');
    });

    it('should handle data as array', () => {
        const content = [
            'some content #1',
            'some content #2',
        ];
        expect(renderToHtml(content))
            .to.equal('<div class=\'page-break\'><p>some content #1</p>\n</div><p>some content #2</p>\n');
    });
});