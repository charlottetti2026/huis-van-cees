import { useEffect, useRef, useState } from 'react'

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      } ${className}`}
    >
      {children}
    </div>
  )
}

function VideoPlaceholder() {
  return (
    <div className="relative mt-14 aspect-video w-full max-w-3xl overflow-hidden rounded-2xl bg-black/20">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90">
          <div className="ml-1 h-0 w-0 border-y-[10px] border-l-[16px] border-y-transparent border-l-neutral-900" />
        </div>
      </div>
      <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs font-semibold tracking-[0.2em] text-white/70 uppercase">
        Video komt hier
      </p>
    </div>
  )
}

function PhotoMasthead() {
  return (
    <div className="relative flex h-[80vh] min-h-[520px] w-full flex-col justify-end overflow-hidden bg-neutral-800 px-6 pb-16 sm:px-12">
      <div className="absolute inset-0 flex items-center justify-center text-white/20">
        <span className="text-sm font-semibold tracking-[0.3em] uppercase">
          Foto komt hier
        </span>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="relative text-left">
        <h1 className="font-display text-6xl leading-[0.85] tracking-tighter text-white uppercase sm:text-8xl">
          Huis
          <br />
          van Cees
        </h1>
        <p className="mt-3 text-sm font-semibold tracking-[0.2em] text-yellow-300 uppercase sm:text-base">
          Sport influencer agency
        </p>
      </div>
    </div>
  )
}

const founders = [
  { photo: '/founders/founder-1.png', name: 'Charlotte' },
  { photo: '/founders/founder-2.png', name: 'Emma' },
  { photo: '/founders/founder-3.png', name: 'Emma' },
  { photo: '/founders/founder-4.png', name: 'Sophie' },
]

const reasons = [
  {
    title: 'Online presence vergroten',
    description: 'Wij helpen mee nadenken over jouw identiteit en branding.',
  },
  {
    title: 'Betere deals',
  },
  {
    title: 'Administratie uit handen',
    description: 'Zodat jij je alleen focust op het creatieve proces.',
  },
]

function App() {
  return (
    <div style={{ backgroundColor: '#154734' }} className="text-white">
      <PhotoMasthead />

      <section className="flex flex-col items-center px-6 pt-24 pb-24 text-center">
        <Reveal className="flex flex-col items-center">
          <h2 className="font-display max-w-4xl text-6xl leading-[0.82] tracking-tighter uppercase sm:text-8xl">
            Niets groots <span className="text-[#8B3DFF]">ontstaat</span>{' '}
            alleen
          </h2>
          <p className="mt-6 text-lg font-medium text-white/60 sm:text-xl">
            Agency voor sport influencers
          </p>
        </Reveal>

        <Reveal className="flex flex-col items-center">
          <p className="font-display mt-10 text-2xl tracking-tight uppercase sm:text-3xl">
            Coming soon
          </p>
          <p className="mt-6 max-w-md text-white/60">
            We bouwen aan iets moois — binnenkort meer.
          </p>
          <button
            type="button"
            className="mt-8 rounded-full bg-white px-6 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-white/90"
          >
            Interesse om in ons portfolio te komen? Meld je aan
          </button>
        </Reveal>

        <Reveal className="flex w-full flex-col items-center">
          <VideoPlaceholder />
        </Reveal>
      </section>

      <section className="border-t border-white/10 px-6 py-24">
        <Reveal>
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-5xl leading-[0.85] tracking-tighter uppercase sm:text-7xl">
              Who we are
            </h2>
            <p className="mt-8 max-w-xl text-lg text-white/60">
              Wij zijn zelf sportmensen — dus snappen we sportmensen.
              <br />
              <br />
              Daarom bouwen we Huis van Cees: een agency die sport influencers
              begrijpt, niet alleen managet. Sport matcht met sport, en dat
              voel je in alles wat we doen.
            </p>
          </div>
        </Reveal>

        <Reveal className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-8 sm:grid-cols-4">
          {founders.map((founder) => (
            <div key={founder.photo} className="flex flex-col items-center">
              <img
                src={founder.photo}
                alt={founder.name}
                className="aspect-square w-full rounded-2xl object-cover"
              />
              <p className="mt-3 text-sm font-medium text-white/80">
                {founder.name}
              </p>
            </div>
          ))}
        </Reveal>
      </section>

      <section className="border-t border-white/10 px-6 py-24">
        <Reveal>
          <h2 className="font-display mx-auto max-w-3xl text-5xl leading-[0.85] tracking-tighter uppercase sm:text-7xl">
            Why join us?
          </h2>
        </Reveal>

        <Reveal className="mx-auto mt-12 max-w-3xl">
          {reasons.map((reason, i) => (
            <div key={reason.title} className="group border-t border-white/10 py-6">
              <div className="flex items-baseline gap-4">
                <span className="text-sm text-white/40">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-display text-2xl uppercase transition-colors duration-300 group-hover:text-[#8B3DFF]">
                  {reason.title}
                </span>
              </div>
              {reason.description && (
                <p className="max-h-0 overflow-hidden pl-9 text-white/60 opacity-0 transition-all duration-300 group-hover:mt-3 group-hover:max-h-20 group-hover:opacity-100">
                  {reason.description}
                </p>
              )}
            </div>
          ))}
        </Reveal>
      </section>

      <section className="border-t border-white/10 px-6 py-24">
        <Reveal>
          <h2 className="text-center text-sm font-semibold tracking-[0.3em] text-white/40 uppercase">
            Already in our portfolio
          </h2>
          <div className="mx-auto mt-10 flex max-w-4xl items-center justify-center">
            <span className="font-display text-2xl tracking-tight text-white/30 uppercase sm:text-3xl">
              The Running Sisters
            </span>
          </div>
        </Reveal>
      </section>
    </div>
  )
}

export default App
