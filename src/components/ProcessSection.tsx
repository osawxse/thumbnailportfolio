import Image from 'next/image'
import { MotionReveal } from './MotionReveal'

const steps = [
  {
    number: '01',
    title: 'Consulting',
    description:
      'We discuss the video idea and the target audience. As much information as possible to create a brief that summarizes the video well.',
    image: '/process/consulting.jpg',
    alt: 'Consulting and thumbnail strategy',
  },
  {
    number: '02',
    title: 'Ideation',
    description:
      'Turn the brief into structured concepts, sketches and visual references before committing to a direction.',
    image: '/process/ideation.jpg',
    alt: 'Thumbnail ideation and concept development',
  },
  {
    number: '03',
    title: 'Graphic Design',
    description:
      'Refine the selected concept into a clear, effective thumbnail with professional composition.',
    image: '/process/graphic-design.jpg',
    alt: 'Professional YouTube thumbnail graphic design',
  },
]

export function ProcessSection() {
  return (
    <section className="section bg-[var(--ink)] text-white">
      <div className="container">
        <h2 className="display text-5xl md:text-7xl max-w-3xl">
          What I Offer.
        </h2>

        <div className="grid md:grid-cols-3 gap-5 mt-16">
          {steps.map((step) => (
            <MotionReveal key={step.number}>
              <article className="group relative aspect-video overflow-hidden rounded-[20px] border border-white/15">
                
                {/* Background image */}
                <Image
                  src={step.image}
                  alt={step.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/55" />

                {/* Additional gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/45 to-black/75" />

                {/* Text layer */}
                <div className="relative z-10 h-full p-7 flex flex-col">
                  <span className="mono text-white/55">
                    {step.number}
                  </span>

                  <h3 className="display text-3xl mt-8">
                    {step.title}
                  </h3>

                  <p className="text-white/70 leading-6 mt-auto max-w-[340px]">
                    {step.description}
                  </p>
                </div>
              </article>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}