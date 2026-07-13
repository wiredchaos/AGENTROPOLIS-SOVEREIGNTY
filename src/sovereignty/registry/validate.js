import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');
export const loadRegistry = (name) => JSON.parse(readFileSync(resolve(root, `registry/sovereignty/${name}.json`), 'utf8'));
const today = () => new Date().toISOString().slice(0,10);
function assert(c,m){ if(!c) throw new Error(m); }
function ids(rows, name){ const s=new Set(); for(const r of rows){ assert(r.id && /^[a-z0-9][a-z0-9-]*$/.test(r.id), `${name}: invalid id`); assert(!s.has(r.id), `${name}: duplicate id ${r.id}`); s.add(r.id);} return s; }
function exact(o, keys, name){ for(const k of keys) assert(k in o, `${name}: missing ${k}`); for(const k of Object.keys(o)) assert(keys.includes(k), `${name}: unknown field ${k}`); }
const isUri = (v) => { try { new URL(v); return true; } catch { return false; } };
const isDate = (v) => /^\d{4}-\d{2}-\d{2}$/.test(v) && !Number.isNaN(Date.parse(`${v}T00:00:00Z`));
export function validateRegistry(reg={hardware:loadRegistry('hardware'),jurisdictions:loadRegistry('jurisdictions'),rights:loadRegistry('rights'),providers:loadRegistry('providers'),models:loadRegistry('models')}){
 for (const h of reg.hardware){ exact(h,['id','name','location','networkBoundary'],'hardware'); assert(['local','private','public-cloud'].includes(h.networkBoundary), 'hardware: invalid networkBoundary'); }
 for (const j of reg.jurisdictions){ exact(j,['id','name','status'],'jurisdiction'); assert(['approved','prohibited','review'].includes(j.status), 'jurisdiction: invalid status'); }
 for (const r of reg.rights){ exact(r,['id','license','allowedUse','reviewBy','sourceUri'],'rights'); assert(Array.isArray(r.allowedUse)&&r.allowedUse.length, 'rights: allowedUse required'); assert(r.allowedUse.every(x=>['research','production','restricted-data','evaluation','stress-test'].includes(x)), 'rights: malformed allowedUse'); assert(new Set(r.allowedUse).size===r.allowedUse.length, 'rights: duplicate allowedUse'); assert(isDate(r.reviewBy), 'rights: malformed reviewBy'); assert(r.reviewBy >= today(), `rights: expired review ${r.id}`); assert(isUri(r.sourceUri), 'rights: malformed sourceUri'); }
 const hardwareIds=ids(reg.hardware,'hardware'), jurisdictionIds=ids(reg.jurisdictions,'jurisdictions'), rightsIds=ids(reg.rights,'rights');
 for (const p of reg.providers){ exact(p,['id','name','type','jurisdictionId','hardwareId','endpoint','approvedForRestrictedData'],'provider'); assert(['local','private','cloud'].includes(p.type), 'provider: invalid type'); assert(jurisdictionIds.has(p.jurisdictionId), `provider: missing jurisdiction ${p.jurisdictionId}`); assert(hardwareIds.has(p.hardwareId), `provider: missing hardware ${p.hardwareId}`); assert(isUri(p.endpoint), 'provider: malformed endpoint'); assert(typeof p.approvedForRestrictedData==='boolean', 'provider: approvedForRestrictedData boolean required'); }
 const providerIds=ids(reg.providers,'providers');
 for (const m of reg.models){ exact(m,['id','providerId','rightsId','classificationFloor','capabilities'],'model'); assert(providerIds.has(m.providerId), `model: missing provider ${m.providerId}`); assert(rightsIds.has(m.rightsId), `model: missing rights ${m.rightsId}`); assert(['public','internal','restricted'].includes(m.classificationFloor), 'model: invalid classificationFloor'); assert(Array.isArray(m.capabilities)&&m.capabilities.length, 'model: capabilities required'); assert(m.capabilities.every(x=>['chat','tool-use','evaluation','stress-test'].includes(x)), 'model: invalid capability'); }
 ids(reg.models,'models'); return true;
}
if (import.meta.url === `file://${process.argv[1]}`) { validateRegistry(); console.log('Sovereignty registry validation passed.'); }
