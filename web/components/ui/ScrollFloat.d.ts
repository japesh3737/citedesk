import type {ReactNode,RefObject} from 'react';
export type ScrollFloatProps={children:ReactNode;disabled?:boolean;scrollContainerRef?:RefObject<HTMLElement|null>;containerClassName?:string;textClassName?:string;effect?:'float'|'flip'|'scatter'|'blur'|'wave';splitBy?:'chars'|'words';direction?:'up'|'down';order?:'start'|'end'|'center'|'edges'|'random';fromColor?:string;animationDuration?:number;ease?:string;scrollStart?:string;scrollEnd?:string;stagger?:number;distance?:number;stretch?:number;smoothing?:number};
export default function ScrollFloat(props:ScrollFloatProps):ReactNode;
