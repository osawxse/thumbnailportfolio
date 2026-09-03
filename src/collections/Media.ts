import type { CollectionConfig } from 'payload'
export const Media: CollectionConfig = { slug:'media', access:{read:()=>true}, upload:{staticDir:'public/media',mimeTypes:['image/jpeg','image/png','image/webp'],imageSizes:[{name:'thumbnail',width:640,height:360,fit:'inside'},{name:'card',width:1280,height:720,fit:'inside'}]}, fields:[{name:'alt',type:'text'}] }
