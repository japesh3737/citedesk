import 'dotenv/config';
import bcrypt from 'bcryptjs';
import {randomBytes,randomUUID} from 'node:crypto';
import {z} from 'zod';
import {init,query,close} from './db.js';
const emails=(process.env.GOOGLE_ADMIN_EMAILS||'').split(',').map(s=>s.trim().toLowerCase()).filter(Boolean);if(!emails.length)throw Error('Set GOOGLE_ADMIN_EMAILS in your private .env first');for(const email of emails)z.email().parse(email);await init();for(const email of emails)await query("INSERT INTO users(id,email,password,role) VALUES($1,$2,$3,'ADMIN') ON CONFLICT(email) DO NOTHING",[randomUUID(),email,await bcrypt.hash(randomBytes(32).toString('hex'),12)]);await close();console.log('Approved Google administrators provisioned. Existing account roles were preserved.');
