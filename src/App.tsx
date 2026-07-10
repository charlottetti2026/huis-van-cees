import { useEffect, useRef, useState } from 'react'

const OFF_WHITE = '#F5F1E8'
const ORANGE = '#FF5A1F'
const GREEN = '#154734'
const PURPLE = '#8B3DFF'

function Reveal({
  children,
  className = '',
  style,
  duration = 700,
}: {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  duration?: number
}) {
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
      style={{ ...style, transitionDuration: `${duration}ms` }}
      className={`transition-all ease-out ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      } ${className}`}
    >
      {children}
    </div>
  )
}

function Hero() {
  return (
    <section
      className="flex flex-col items-center px-6 pt-12 pb-16 text-center"
      style={{ backgroundColor: GREEN, color: OFF_WHITE }}
    >
      <p className="text-sm leading-tight font-bold lowercase">
        huis
        <br />
        van cees
      </p>
      <h1 className="font-display mt-4 max-w-3xl text-4xl leading-[1.05] tracking-tight uppercase sm:text-6xl">
        Your next <span style={{ color: PURPLE }}>sport influencer</span>{' '}
        agency
      </h1>
      <p className="font-display mt-2 text-3xl tracking-tight uppercase opacity-30 sm:text-4xl">
        Coming soon
      </p>
      <button
        type="button"
        className="mt-6 rounded-full px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110"
        style={{ backgroundColor: ORANGE }}
      >
        Interesse om in ons portfolio te komen? Meld je aan
      </button>

      <Reveal className="flex w-full flex-col items-center">
        <FlyInPhotos />
      </Reveal>
    </section>
  )
}

const FLY_IN_PHOTOS = [
  '/portfolio/on-1.jpg',
  '/portfolio/on-2.jpg',
  '/portfolio/on-3.jpg',
  '/portfolio/on-4.jpg',
  '/portfolio/on-5.jpg',
]

function FlyInPhotos() {
  const layout = [
    'col-span-2 row-span-2',
    'col-span-1 row-span-1',
    'col-span-1 row-span-1',
    'col-span-1 row-span-1',
    'col-span-1 row-span-1',
  ]

  return (
    <div className="mt-14 grid w-full max-w-4xl auto-rows-[110px] grid-cols-4 gap-3 sm:auto-rows-[140px] sm:gap-4">
      {FLY_IN_PHOTOS.map((src, i) => (
        <Reveal
          key={src}
          className={layout[i]}
          style={{ transitionDelay: `${i * 90}ms` }}
          duration={400}
        >
          <img
            src={src}
            alt="Huis van Cees"
            style={{ filter: 'brightness(1.25) saturate(1.05)' }}
            className="h-full w-full rounded-xl object-cover"
          />
        </Reveal>
      ))}
    </div>
  )
}

function PortfolioMosaic() {
  const photos = [
    { src: '/portfolio/rs-2.jpg', className: 'col-span-2 row-span-2' },
    { src: '/portfolio/rs-3.jpg', className: 'col-span-1 row-span-2' },
    { src: '/portfolio/rs-1.jpg', className: 'col-span-1 row-span-1' },
  ]

  return (
    <div className="grid grid-cols-3 grid-rows-2 gap-3 sm:gap-4">
      {photos.map((photo, i) => (
        <Reveal
          key={photo.src}
          className={photo.className}
          style={{ transitionDelay: `${i * 120}ms` }}
        >
          <img
            src={photo.src}
            alt="The Running Sisters"
            style={{ filter: 'brightness(1.25) saturate(1.05)' }}
            className="h-full w-full rounded-xl object-cover"
          />
        </Reveal>
      ))}
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
    <div style={{ backgroundColor: GREEN, color: OFF_WHITE }}>
      <Hero />

      <section className="border-t px-6 py-24" style={{ borderColor: `${OFF_WHITE}1A` }}>
        <Reveal>
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-5xl leading-[0.85] tracking-tighter uppercase sm:text-7xl">
              Who we are
            </h2>
            <p className="mt-8 max-w-xl text-lg opacity-60">
              Wij zijn zelf sportmensen — dus snappen we sportmensen.
              <br />
              <br />
              Daarom bouwen we Huis van Cees: een agency die sport influencers
              begrijpt, niet alleen managet. Sport matcht met sport, en dat
              voel je in alles wat we doen.
            </p>
          </div>
        </Reveal>

        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-8 sm:grid-cols-4">
          {founders.map((founder, i) => (
            <Reveal
              key={founder.photo}
              className="flex flex-col items-center"
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <img
                src={founder.photo}
                alt={founder.name}
                className="aspect-square w-full rounded-2xl object-cover"
              />
              <p className="mt-3 text-sm font-medium opacity-80">
                {founder.name}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t px-6 py-24" style={{ borderColor: `${OFF_WHITE}1A` }}>
        <Reveal>
          <h2 className="font-display mx-auto max-w-3xl text-5xl leading-[0.85] tracking-tighter uppercase sm:text-7xl">
            Why join us?
          </h2>
        </Reveal>

        <Reveal className="mx-auto mt-12 max-w-3xl">
          {reasons.map((reason, i) => (
            <div
              key={reason.title}
              className="group border-t py-6"
              style={{ borderColor: `${OFF_WHITE}1A` }}
            >
              <div className="flex items-baseline gap-4">
                <span className="text-sm opacity-40">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-display text-2xl uppercase transition-colors duration-300 group-hover:text-[#8B3DFF]">
                  {reason.title}
                </span>
              </div>
              {reason.description && (
                <p className="max-h-0 overflow-hidden pl-9 opacity-0 transition-all duration-300 group-hover:mt-3 group-hover:max-h-20 group-hover:opacity-60">
                  {reason.description}
                </p>
              )}
            </div>
          ))}
        </Reveal>
      </section>

      <section className="border-t px-6 py-24" style={{ borderColor: `${OFF_WHITE}1A` }}>
        <Reveal>
          <h2 className="text-center text-sm font-semibold tracking-[0.3em] uppercase opacity-40">
            Already in our portfolio
          </h2>
          <div className="mx-auto mt-6 flex max-w-4xl items-center justify-center">
            <span className="font-display text-2xl tracking-tight uppercase opacity-30 sm:text-3xl">
              The Running Sisters
            </span>
          </div>
        </Reveal>

        <div className="mx-auto mt-12 max-w-3xl">
          <PortfolioMosaic />
        </div>
      </section>
    </div>
  )
}

export default App
