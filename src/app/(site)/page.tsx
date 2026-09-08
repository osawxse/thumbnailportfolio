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
    <Hero settings={s} />
    <ClientStrip clients={clients} />

    <section className="section">
    <div className="container">
        <WorkGrid work={work.docs} featured />
    </div>
    </section>

    <ProcessSection />



    <FAQSection faqs={faqs}/>

    <section id="apply" className="section">
      <div className="container">
        <div className="rule pt-8">
          <h2 className="display text-5xl md:text-7xl max-w-4xl">
            Working with me is easy!
          </h2>
          <p className="mt-6 max-w-xl text-lg text-[var(--muted)]">
            Reach out by filling out the form below. A bunch of sections are optional and do not need to be filled. Be as descriptive as possible.
          </p>
          <div className="mt-12">
            <ApplicationForm/>
          </div>
        </div>
      </div>
    </section>
  </>
}