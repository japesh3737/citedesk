import {init,query,close} from './db.js';
await init();const rows=await query("UPDATE articles SET status='ARCHIVED' WHERE slug LIKE 'browser-guide-%' AND title='Browser test guide' RETURNING id");console.log('Archived leftover browser fixtures:',rows.length);await close();
