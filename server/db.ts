import 'dotenv/config';
import {PGlite} from '@electric-sql/pglite';
import pg from 'pg';
const engine=process.env.DATABASE_URL ? new pg.Pool({connectionString:process.env.DATABASE_URL}) : new PGlite(process.env.DATA_DIR || './data');
export async function query(sql:string,params:unknown[]=[]):Promise<any[]> {return (await ('end' in engine ? engine.query(sql,params) : engine.query(sql,params))).rows;}
export async function init(){await query(`CREATE TABLE IF NOT EXISTS users(id text PRIMARY KEY,email text UNIQUE NOT NULL,password text NOT NULL,role text NOT NULL DEFAULT 'ADMIN');`); for(const sql of [
`CREATE TABLE IF NOT EXISTS oauth_attempts(state text PRIMARY KEY,binding text NOT NULL,nonce text NOT NULL,verifier text NOT NULL,expires timestamptz NOT NULL)`,
`CREATE TABLE IF NOT EXISTS google_identities(user_id text UNIQUE REFERENCES users(id) ON DELETE CASCADE,subject text PRIMARY KEY)`,
`CREATE TABLE IF NOT EXISTS sessions(id text PRIMARY KEY,user_id text REFERENCES users(id),expires timestamptz NOT NULL)`,
`CREATE TABLE IF NOT EXISTS articles(id text PRIMARY KEY,slug text UNIQUE NOT NULL,title text NOT NULL,summary text NOT NULL,body text NOT NULL,category text NOT NULL,product text NOT NULL,tags text NOT NULL DEFAULT '',status text NOT NULL CHECK(status IN ('DRAFT','PUBLISHED','ARCHIVED')),version int NOT NULL DEFAULT 1,reviewed_at text NOT NULL,updated_at timestamptz DEFAULT now())`,
`CREATE INDEX IF NOT EXISTS article_search ON articles USING gin(to_tsvector('english',title || ' ' || summary || ' ' || body || ' ' || tags))`,
`CREATE TABLE IF NOT EXISTS questions(id text PRIMARY KEY,excerpt text NOT NULL,state text NOT NULL,created_at timestamptz DEFAULT now())`,
`CREATE TABLE IF NOT EXISTS answers(id text PRIMARY KEY,question_id text REFERENCES questions(id) ON DELETE CASCADE,body text NOT NULL)`,
`CREATE TABLE IF NOT EXISTS answer_sources(answer_id text REFERENCES answers(id) ON DELETE CASCADE,article_id text REFERENCES articles(id),version int NOT NULL,anchor text NOT NULL)`,
`CREATE TABLE IF NOT EXISTS feedback(id text PRIMARY KEY,answer_id text REFERENCES answers(id) ON DELETE CASCADE,visitor text NOT NULL,helpful boolean NOT NULL,comment text NOT NULL,created_at timestamptz DEFAULT now(),UNIQUE(answer_id,visitor))`,
`CREATE TABLE IF NOT EXISTS audit(id text PRIMARY KEY,user_id text,action text,object_id text,created_at timestamptz DEFAULT now())`
]) await query(sql);}
export async function close(){if('end' in engine) await engine.end(); else await engine.close();}


