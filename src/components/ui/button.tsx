import { cn } from '@/lib/utils'
import type { ButtonHTMLAttributes } from 'react'
export function Button({className,...props}:ButtonHTMLAttributes<HTMLButtonElement>){return <button className={cn('inline-flex items-center justify-center rounded-full border border-black bg-[var(--ink)] px-5 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 disabled:opacity-50',className)} {...props}/>} 
