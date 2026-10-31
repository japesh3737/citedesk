import type {CSSProperties,ReactNode} from 'react';
type State={dodges:number;gave:boolean;caught:boolean;fleeing:boolean};
export type DodgeFieldProps={children?:ReactNode|((state:State)=>ReactNode);taunts?:string[];notice?:string;inkColor?:string;contrastColor?:string;fieldHeight?:number;reach?:number;radius?:number;falloff?:number;fleeDuration?:number;returnDuration?:number;returnBounce?:number;axis?:'both'|'x'|'y';wall?:'clamp'|'bounce';patience?:number;disabled?:boolean;onDodge?:(count:number)=>void;onRelent?:()=>void;onCatch?:()=>void;className?:string;style?:CSSProperties};
export default function DodgeField(props:DodgeFieldProps):ReactNode;
