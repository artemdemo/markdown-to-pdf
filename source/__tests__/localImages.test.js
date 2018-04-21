const { expect } = require('chai');
const localImages = require('../localImages');

describe('localImages', () => {
    it('should replace image path', () => {
        const options = {
            basePath: '',
        };
        const content = '<div><img src="./test/image.png" /></div>';
        expect(localImages(content, options))
            .to.equal('<div><img src="file://test/image.png" /></div>');
    });

    it('should replace image path with different basePath', () => {
        const options = {
            basePath: '/some-path',
        };
        const content = '<div><img src="./test/image.png" /></div>';
        expect(localImages(content, options))
            .to.equal('<div><img src="file:///some-path/test/image.png" /></div>');
    });

    it('should handle multiple images', () => {
        const options = {
            basePath: '',
        };
        const content = '<div><img src="./test/image1.png" /></div><div><img src="./test/image2.png" /></div>';
        expect(localImages(content, options))
            .to.equal('<div><img src="file://test/image1.png" /></div><div><img src="file://test/image2.png" /></div>');
    });

    it('should not replace http://', () => {
        const options = {
            basePath: '',
        };
        const content = '<div><img src="http://example.com/image.png" /></div>';
        expect(localImages(content, options))
            .to.equal('<div><img src="http://example.com/image.png" /></div>');
    });

    it('should not replace https://', () => {
        const options = {
            basePath: '',
        };
        const content = '<div><img src="https://example.com/image.png" /></div>';
        expect(localImages(content, options))
            .to.equal('<div><img src="https://example.com/image.png" /></div>');
    });
});