import * as core from '@actions/core';
import * as fs from 'fs';

/**
 * Action goes here
 */
class Action {

    constructor() { }

    public async Run() {
        // Inputs
        const path = core.getInput('path');
        const version = core.getInput('version');

        if (!fs.existsSync(path)) {
            console.log('Path does not point to valid file: ' + path);
            core.setFailed('Path does not point to valid file: ' + path);
            return;
        }

        let raw_data = fs.readFileSync(path, { encoding: 'utf-8' });
        if (!raw_data) {
            console.log('No data found in file: ' + path);
            core.setFailed('Path does not point to valid file: ' + path);
            return;
        }

        let package_content = JSON.parse(raw_data);
        if (!package_content) {
            console.log('Unable to parse file to JSON: ' + path);
            core.setFailed('Unable to parse file to JSON: ' + path);
            return;
        }

        console.log('Setting new version');
        package_content.version = version;

        console.log('Writing file');
        fs.writeFileSync(path, JSON.stringify(package_content, null, 2));

        console.log('Complete!');
    }
}

try {
    new Action().Run();
} catch (error: any) {
    core.setFailed(error.message as string);
}