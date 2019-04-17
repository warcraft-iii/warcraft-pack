/**
 * @File   : index.ts
 * @Author : Dencer (tdaddon@163.com)
 * @Link   : https://dengsir.github.io
 * @Date   : 4/17/2019, 9:34:55 AM
 */

import program from 'commander';
import stormlib from 'stormlib';
import fs from 'mz/fs';
import path from 'path';

async function getAllFiles(p: string, r: string[] = []) {
    for (let file of await fs.readdir(p)) {
        const name = path.basename(file);
        if (name.startsWith('.') || name.startsWith('@')) {
            continue;
        }

        file = path.join(p, file);
        const stats = await fs.stat(file);
        if (stats.isDirectory()) {
            await getAllFiles(file, r);
        } else if (stats.isFile()) {
            r.push(file);
        }
    }
    return r;
}

async function run(input: string, output: string) {
    if (await fs.exists(output)) {
        await fs.unlink(output);
    }

    const files = await getAllFiles(input);
    const archive = await stormlib.create(output, 0, files.length);

    await Promise.all(
        files.map(
            async file =>
                await archive.writeFile(await fs.readFile(file), path.relative(input, file), 0, 0x200, 0x2 | 0x8)
        )
    );
}

async function main() {
    program
        .version('0.0.1')
        .description('Welcome!')
        .arguments('<input>')
        .option('-o, --output <output>', 'Output file')
        .parse(process.argv);

    if (!program.output || program.args.length < 1) {
        program.outputHelp();
        return;
    }

    if (!(await fs.exists(program.output))) {
        program.outputHelp();
        return;
    }

    run(program.args[0], program.output);
}

main();
