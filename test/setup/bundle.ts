const Bundler = require('parcel-bundler');
import * as Path from "path";

export {
    build,
}

const file = Path.join(__dirname, '../../../test/index.html');

async function build() {
    return new Promise((success, reject) => {
        const options = {
            publicUrl: './',
            watch: false, // whether to watch the files and rebuild them on change, defaults to process.env.NODE_ENV !== 'production'
        };

        const bundler = new Bundler(file, options);
        bundler.on('bundled', (bundle) => {
            success();
        });
        bundler.bundle();
    });
}
