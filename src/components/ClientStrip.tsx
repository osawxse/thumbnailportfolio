import Image from 'next/image'
import type { Client } from '@/lib/cms'

export function ClientStrip({ clients }: { clients: Client[] }) {
  const visibleClients = clients.slice(0, 10)

  // Duplicate the clients so the marquee can loop continuously.
  const marqueeClients = [...visibleClients, ...visibleClients]

  return (
    <section className="pb-16">
      <div className="container">

        {/* Section heading */}
        <div className="rule pt-6 flex justify-between gap-6">
          <span className="mono">
            Trusted by creators & brands
          </span>

          <span className="text-sm text-[var(--muted)]">
            {clients.length ? 'Selected collaborators' : 'Add clients in Admin'}
          </span>
        </div>

        {/* Scrolling clients */}
        {visibleClients.length > 0 && (
          <div className="client-marquee mt-8">
            <div className="client-marquee-track">

              {marqueeClients.map((client, index) => {
                const logo =
                  client.logo?.sizes?.thumbnail?.url ||
                  client.logo?.url ||
                  ''

                return (
                  <div
                    key={`${client.id}-${index}`}
                    className="client-marquee-item"
                  >
                    {/* Channel icon */}
                    <div className="w-10 h-10 shrink-0 rounded-full overflow-hidden bg-black/10 border border-black/5">
                      {logo ? (
                        <Image
                          src={logo}
                          alt=""
                          width={40}
                          height={40}
                          className="w-full h-full object-cover"
                        />
                      ) : null}
                    </div>

                    {/* Channel information */}
                    <div className="min-w-0">
                      <p className="font-semibold whitespace-nowrap">
                        {client.name}
                      </p>

                      {client.metric && (
                        <p className="mono text-xs text-[var(--muted)] whitespace-nowrap mt-0.5">
                          {client.metric}
                        </p>
                      )}
                    </div>
                  </div>
                )
              })}

            </div>
          </div>
        )}

      </div>
    </section>
  )
}