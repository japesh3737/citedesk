import {query} from './db.js';
import {slugify} from './utils.js';
export const redact=(s:string)=>s.replace(/[\w.+-]+@[\w.-]+\.[a-z]+/gi,'[email]').replace(/\b(?:\d[ -]?){7,}\b/g,'[number]').replace(/\b(?:sk-|api[_-]?key[=: ]+|password[=: ]+)\S+/gi,'[secret]').slice(0,300);
export function sections(body:string){return body.split(/^## /m).filter(Boolean).map(s=>{const [heading,...rest]=s.split('\n'); return {heading,anchor:slugify(heading),excerpt:rest.join('\n').trim()};});}
const stop=new Set('how can i my a an the do does is are to of for what where in on me you your orbit workspace please it with from find stopped getting not delivering why receiving missing'.split(' '));
function terms(s:string){return [...new Set(s.toLowerCase().replace(/turn on/g,'enable').replace(/colleague|teammates?/g,'member invite').replace(/invoices/g,'invoice').replace(/members/g,'member').replace(/roles/g,'role').replace(/emails/g,'email').replace(/two.step/g,'two step').split(/[^a-z0-9]+/).filter(t=>t.length>2&&!stop.has(t)).map(t=>t.replace(/(?:ing|s)$/,'')))];}
export async function retrieve(question:string,context?:string|null){if(/ignore|reveal|system prompt|admin password|credentials|real subscription|flight|reimburse|price|undocumented/i.test(question)) return [];
const words=terms(question); if(!words.length)return [];
const rows=await query("SELECT * FROM articles WHERE status='PUBLISHED' AND ($1='' OR id=$1)",[context||'']);
const scored=rows.map(a=>{const title=terms(a.title+' '+a.tags);const hits=words.filter(t=>title.includes(t));return {a,score:hits.length/words.length,hits:hits.length};}).sort((a,b)=>b.score-a.score||b.hits-a.hits);
const top=scored[0]; if(!top||top.score<0.55||top.hits<1|| (scored[1]?.score===top.score&&scored[1]?.hits===top.hits))return [];
const part=sections(top.a.body)[0];if(!part?.excerpt||/ignore|reveal|system prompt|<script/i.test(top.a.body))return [];
return [{articleId:top.a.id,title:top.a.title,slug:top.a.slug,version:top.a.version,section:part.heading,anchor:part.anchor,excerpt:part.excerpt}];}



