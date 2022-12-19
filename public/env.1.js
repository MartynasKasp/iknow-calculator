/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
if (typeof window.process === 'undefined' || !window.process) {
    window.process = {};
}

if (!window.process.env) {
    window.process.env = {};
}
var envs = JSON.parse('{}');

for (const name in envs) {
    window.process.env[name] = envs[name];
}
