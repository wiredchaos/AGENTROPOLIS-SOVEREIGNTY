const redact = (v) => typeof v === 'string' ? v.replace(/Bearer\s+[A-Za-z0-9._-]+/g, 'Bearer [REDACTED]') : v;
export class AuditLog { constructor(){ this.events=[]; } record(type, detail={}){ const safe=Object.fromEntries(Object.entries(detail).map(([k,v])=>[/token|authorization/i.test(k)?[k,'[REDACTED]']:[k,redact(v)]])); this.events.push({type, detail:safe, at:new Date().toISOString()}); } }
