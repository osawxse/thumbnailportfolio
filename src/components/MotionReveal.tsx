'use client'
import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'
export function MotionReveal({children,className}:{children:ReactNode;className?:string}){const reduce=useReducedMotion();return <motion.div initial={reduce?false:{opacity:0,y:18}} whileInView={reduce?undefined:{opacity:1,y:0}} viewport={{once:true,amount:.15}} transition={{duration:.5,ease:'easeOut'}} className={className}>{children}</motion.div>}
