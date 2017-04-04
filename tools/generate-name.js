import path from 'path';

export default function generateName(name = '', debug = true) {
    if (debug) {
        return name;
    }

    const extname = path.extname(name);
    return `${path.basename(name, extname)}${(new Date()).getTime().toString()}${extname}`;
}
