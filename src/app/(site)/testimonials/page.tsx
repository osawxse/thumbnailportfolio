import { getTestimonials } from '@/lib/cms'
import { TestimonialCard } from '@/components/TestimonialCard'
export const revalidate=60
export const metadata={title:'Testimonials — Thumbnail Designer',description:'Client feedback and project experiences.'}
export default async function Testimonials(){const items=await getTestimonials();return <section className="section pt-24"><div className="container"><p className="mono mb-5">Client notes</p><h1 className="display text-6xl md:text-8xl max-w-5xl">What collaborators say.</h1><p className="text-lg text-[var(--muted)] max-w-2xl mt-7">Some reviews from clients I have been given the oppurtunity to work with. </p><div className="grid md:grid-cols-2 gap-5 mt-20">{items.map(x=><TestimonialCard key={x.id} item={x}/>)}</div></div></section>}
