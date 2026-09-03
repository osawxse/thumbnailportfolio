import { getClients,getFAQs,getSettings,getTestimonials,getWork } from '@/lib/cms'
import { Hero } from '@/components/Hero'
import { ClientStrip } from '@/components/ClientStrip'
import { WorkGrid } from '@/components/WorkGrid'
import { ProcessSection } from '@/components/ProcessSection'
import { TestimonialPreview } from '@/components/TestimonialPreview'
import { FAQSection } from '@/components/FAQSection'
import { ApplicationForm } from '@/components/ApplicationForm'

export const revalidate=60

export async function generateMetadata(){
  const s=await getSettings()
  return{
    title:s.siteName,
    description:s.heroDescription,
    openGraph:{
      title:s.siteName,
      description:s.heroDescription,
      type:'website'
    }
  }
}

export default async function Home(){
  const [s,work,clients,testimonials,faqs]=await Promise.all([
    getSettings(),
    getWork({featured:true,limit:9}),
    getClients(),
    getTestimonials({limit:5}),
    getFAQs()
  ])

  return <>
    <Hero settings={s} work={work.docs}/>

    <ClientStrip clients={clients}/>

    <WorkGrid work={work.docs} featured/>

    <ProcessSection/>

    <TestimonialPreview testimonials={testimonials}/>

    <FAQSection faqs={faqs}/>

    <section id="apply" className="section">
      <div className="container">
        <div className="rule pt-8">
          <p className="mono mb-6">Start a project</p>
          <h2 className="display text-5xl md:text-7xl max-w-4xl">
            Have a video worth packaging properly?
          </h2>
          <p className="mt-6 max-w-xl text-lg text-[var(--muted)]">
            Tell me what you are building, where the bottleneck is, and what you want the packaging to do.
          </p>
          <div className="mt-12">
            <ApplicationForm/>
          </div>
        </div>
      </div>
    </section>
  </>
}