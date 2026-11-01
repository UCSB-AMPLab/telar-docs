// Local integration harness. Copies code, never credentials or Worker state.
import { cpSync,existsSync,mkdtempSync,readFileSync,writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname,resolve,join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync,spawn } from 'node:child_process';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const i=process.argv.indexOf('--worker');
if(i<0||!process.argv[i+1]){console.error('Usage: node scripts/preview-api.mjs --worker /path/to/telar-showcase');process.exit(1)}
const source=resolve(process.argv[i+1]);const wrangler=join(source,'node_modules','.bin','wrangler');
if(!existsSync(wrangler)||!existsSync(join(source,'src','index.ts'))){console.error('The Worker checkout and its installed Wrangler dependency are required.');process.exit(1)}
const work=mkdtempSync(join(tmpdir(),'telar-docs-preview-'));
for(const name of ['src','migrations'])cpSync(join(source,name),join(work,name),{recursive:true});
const config={name:'telar-docs-local-api',main:'src/index.ts',compatibility_date:'2025-03-14',d1_databases:[{binding:'DB',database_name:'telar-docs-local',database_id:'00000000-0000-0000-0000-000000000000',migrations_dir:'migrations'}],vars:{ALLOWED_ORIGIN:'http://127.0.0.1:4004',TURNSTILE_SECRET:'1x0000000000000000000000000000000AA',SLACK_WEBHOOK_URL:''}};
writeFileSync(join(work,'wrangler.json'),JSON.stringify(config,null,2));
writeFileSync(join(work,'.dev.vars'),'SLACK_WEBHOOK_URL=""\n');
const run=args=>{const result=spawnSync(wrangler,args,{cwd:work,stdio:'inherit'});if(result.status!==0)process.exit(result.status||1)};
run(['d1','migrations','apply','telar-docs-local','--local','--config','wrangler.json','--persist-to','.wrangler/state']);
const projects=JSON.parse(readFileSync(join(root,'migration','fixtures','showcase.json'),'utf8')).projects;
const q=value=>value==null?'NULL':"'"+String(value).replaceAll("'","''")+"'";
const sql=projects.map(p=>{
 const row={id:'fixture-'+p.id,created_at:p.approved_at,name:p.author||'Public showcase fixture',email:'fixture@example.invalid',title:p.title,url:p.url,description:p.description,language:p.language,context:p.context,authorship:p.authorship,consent:p.author?'named':'anonymous',status:'approved',reviewed_at:p.approved_at,image_url:p.image};
 return `INSERT OR REPLACE INTO submissions (${Object.keys(row).join(',')}) VALUES (${Object.values(row).map(q).join(',')});`;
}).join('\n');
writeFileSync(join(work,'fixtures.sql'),sql);
if(sql)run(['d1','execute','telar-docs-local','--local','--config','wrangler.json','--persist-to','.wrangler/state','--file','fixtures.sql']);
console.log('Local preview API: http://127.0.0.1:8790 — notification delivery disabled.');
console.log('Temporary local data:',work);
const server=spawn(wrangler,['dev','--local','--ip','127.0.0.1','--port','8790','--config','wrangler.json','--persist-to','.wrangler/state'],{cwd:work,stdio:'inherit'});
for(const signal of ['SIGINT','SIGTERM'])process.on(signal,()=>server.kill(signal));
server.on('exit',code=>process.exit(code??0));
