import { readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
const roots = ['src', 'tests', 'scripts'];
const files = [];
function walk(dir){ for (const name of readdirSync(dir)){ const p=join(dir,name); const s=statSync(p); if(s.isDirectory()) walk(p); else if(/\.m?js$/.test(name)) files.push(p); }}
roots.forEach(walk);
for (const file of files){ const r=spawnSync(process.execPath, ['--check', file], {stdio:'inherit'}); if(r.status) process.exit(r.status); }
console.log(`Checked ${files.length} JavaScript files.`);
