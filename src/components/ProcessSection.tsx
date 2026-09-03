import { MotionReveal } from './MotionReveal'

const steps = [
  [
    '01',
    'Consulting',
    'Start with the problem: video ideas, audience, packaging strategy and the problems keeping good content from getting clicked.',
  ],
  [
    '02',
    'Ideation',
    'Turn the brief into structured concepts, sketches and visual references before committing to a direction.',
  ],
  [
    '03',
    'Graphic Design',
    'Refine the selected concept into a clear, effective thumbnail with professional composition.',
  ],
]

export function ProcessSection() {
  return (
    <section className="section bg-[var(--ink)] text-white">
      <div className="container">

        <h2 className="display text-5xl md:text-7xl max-w-3xl">
          What I Offer.
        </h2>

        <div className="grid md:grid-cols-3 gap-5 mt-16">
          {steps.map(([n, t, d]) => (
            <MotionReveal key={n}>
              <div className="rounded-[20px] border border-white/15 p-7 min-h-[300px] flex flex-col justify-between">
                <div>
                  <span className="mono text-white/50">{n}</span>
                  <h3 className="display text-3xl mt-8">{t}</h3>
                </div>

                <p className="text-white/65 leading-6">
                  {d}
                </p>
              </div>
            </MotionReveal>
          ))}
        </div>

      </div>
    </section>
  )
}