import {init,query,close} from './db.js';
import {seedData} from './data.js';
import bcrypt from 'bcryptjs';
import {randomUUID} from 'node:crypto';
import {slugify} from './utils.js';
export async function seed(){await init(); for(const [i,[title,category,product,steps,notes]] of seedData.entries()) await query(`INSERT INTO articles(id,slug,title,summary,body,category,product,status,reviewed_at,tags) VALUES($1,$2,$3,$4,$5,$6,$7,'PUBLISHED',$8,$9) ON CONFLICT DO NOTHING`,[`KB-${String(i+1).padStart(3,'0')}`,slugify(title),title,`Fictional Orbit Workspace guidance: ${title.toLowerCase()}.`,`## Steps\n${steps}\n\n## Important notes\n${notes}`,category,product,'2026-10-31',title]);
if(process.env.DEMO_ADMIN_EMAIL && process.env.DEMO_ADMIN_PASSWORD && process.env.NODE_ENV!=='production') {if(process.env.DEMO_ADMIN_PASSWORD.length<12) throw Error('Admin password must be at least 12 characters'); await query('INSERT INTO users(id,email,password) VALUES($1,$2,$3) ON CONFLICT(email) DO NOTHING',[randomUUID(),process.env.DEMO_ADMIN_EMAIL.toLowerCase(),await bcrypt.hash(process.env.DEMO_ADMIN_PASSWORD,12)]);}
if(process.env.NODE_ENV==='production' && process.env.ADMIN_BOOTSTRAP_EMAIL && process.env.ADMIN_BOOTSTRAP_PASSWORD){
  if(process.env.ADMIN_BOOTSTRAP_PASSWORD.length<16)throw Error('Production admin password must be at least 16 characters');
  const email=process.env.ADMIN_BOOTSTRAP_EMAIL.trim().toLowerCase();
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))throw Error('Production admin email is invalid');
  const [count]=await query('SELECT count(*)::int AS total FROM users');
  if(count.total===0)await query("INSERT INTO users(id,email,password,role) VALUES($1,$2,$3,'ADMIN')",[randomUUID(),email,await bcrypt.hash(process.env.ADMIN_BOOTSTRAP_PASSWORD,12)]);
}
}
if(process.argv[1]?.endsWith('seed.ts')){await seed();await close();console.log('Seed complete');}

