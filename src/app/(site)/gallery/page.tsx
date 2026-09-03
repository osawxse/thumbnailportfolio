import Link from 'next/link'
import { getWork } from '@/lib/cms'
import { WorkGrid } from '@/components/WorkGrid'
export const revalidate=60
export const metadata={title:'Gallery — Thumbnail Designer',description:'Selected YouTube thumbnail work.'}
export default async function Gallery({searchParams}:{searchParams:Promise<{page?:string;category?:string}>}){
 const params=await searchParams
 const page=Math.max(1,Number(params.page)||1)
 const category=params.category||''
 const result=await getWork({limit:12,page,category})
 const categoryResult=category?await getWork({limit:100}):result
 const categories=[...new Set(categoryResult.docs.map(x=>x.category).filter(Boolean))] as string[]
 const query=(next:number)=>{const q=new URLSearchParams();if(category)q.set('category',category);q.set('page',String(next));return `/gallery?${q.toString()}`}
 return <section className="section pt-24"><div className="container"><p className="mono mb-5">Selected work</p><h1 className="display text-6xl md:text-8xl max-w-5xl">The work speaks for itself.</h1><p className="text-lg text-[var(--muted)] max-w-2xl mt-7">A growing archive of my thumbnails and packaging projects. Every item below was designed by me.</p><div className="flex flex-wrap gap-2 mt-12"><Link href="/gallery" className={`rounded-full border px-4 py-2 text-sm ${!category?'bg-black !text-white':''}`}>All</Link>{categories.map(c=><Link key={c} href={`/gallery?category=${encodeURIComponent(c)}`} className={`rounded-full border px-4 py-2 text-sm ${category===c?'bg-black text-white':''}`}>{c}</Link>)}</div><div className="mt-12"><WorkGrid work={result.docs}/></div>{result.totalPages>1&&<div className="mt-14 flex items-center justify-center gap-3">{page>1&&<Link href={query(page-1)} className="rounded-full border px-5 py-3 text-sm">← Previous</Link>}<span className="mono">Page {page} / {result.totalPages}</span>{page<result.totalPages&&<Link href={query(page+1)} className="rounded-full border px-5 py-3 text-sm">Next →</Link>}</div>}</div></section>
}
