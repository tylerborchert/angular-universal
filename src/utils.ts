import * as fs from 'fs';

export const readFile = path => new Promise((res, rej) => fs.readFile(path, 'utf8', (err, data) => !err ? res(data) : rej(err)));
