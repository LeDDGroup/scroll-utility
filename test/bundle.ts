const Bundler = require('parcel-bundler');
const Path = require('path');

export {
    build,
}


const file = Path.join(__dirname, './index.html');

async function build() {
    return new Promise((success, reject) => {
        const options = {
            outDir: file, // The out directory to put the build files in, defaults to dist
            watch: false, // whether to watch the files and rebuild them on change, defaults to process.env.NODE_ENV !== 'production'
        };

        const bundler = new Bundler("index.html", options);
        bundler.on('bundled', (bundle) => {
            success();
        });
        bundler.bundle();
    });
}
