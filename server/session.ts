import {createHash,randomBytes} from 'node:crypto';
import type {Request,Response} from 'express';
import {query} from './db.js';
export const tokenHash=(value:string)=>createHash('sha256').update(value).digest('hex');
export async function issueSession(req:Request,res:Response,userId:string){if(req.cookies.session)await query('DELETE FROM sessions WHERE id=$1',[tokenHash(req.cookies.session)]);const token=randomBytes(32).toString('hex');await query("INSERT INTO sessions VALUES($1,$2,now()+interval '8 hours')",[tokenHash(token),userId]);res.cookie('session',token,{httpOnly:true,sameSite:'strict',secure:process.env.NODE_ENV==='production',maxAge:28800000,path:'/'});}
