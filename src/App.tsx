import { useEffect, useRef, useState } from 'react'

const OFF_WHITE = '#F5F1E8'
const ORANGE = '#FF5A1F'
const GREEN = '#154734'

function Reveal({
  children,
  className = '',
  style,
}: {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
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
      style={style}
      className={`transition-all duration-700 ease-out ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      } ${className}`}
    >
      {children}
    </div>
  )
}

function HouseFlourish({ show }: { show: boolean }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className={`h-10 w-10 transition-all duration-500 ease-out ${
        show ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-3 scale-50 opacity-0'
      }`}
      style={{ color: ORANGE }}
      aria-hidden="true"
    >
      <path
        d="M8 22 24 8l16 14M13 22v18h22V22"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 40v-11h6v11"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Typewriter({ text, onDone }: { text: string; onDone?: () => void }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (count >= text.length) {
      onDone?.()
      return
    }
    const t = setTimeout(() => setCount((c) => c + 1), 90)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count])

  return (
    <>
      {text.slice(0, count)}
      <span
        className={`inline-block w-[0.06em] ${count < text.length ? 'animate-pulse' : 'opacity-0'}`}
      >
        |
      </span>
    </>
  )
}

const HEADER_PHOTOS = [
  '/header-1.jpg',
  '/header-2.jpg',
  '/header-3.jpg',
  '/header-4.jpg',
]

function PhotoMasthead() {
  const [index, setIndex] = useState(0)
  const [typingDone, setTypingDone] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % HEADER_PHOTOS.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative flex h-[80vh] min-h-[520px] w-full flex-col items-start justify-center overflow-hidden bg-neutral-800 px-6 sm:px-12">
      {HEADER_PHOTOS.map((src, i) => (
        <img
          key={src}
          src={src}
          alt="Huis van Cees"
          style={{ filter: 'brightness(1.25) saturate(1.05)' }}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            i === index ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-black/30" />
      <div
        className="absolute inset-x-0 bottom-0 h-32"
        style={{ background: `linear-gradient(to top, ${GREEN}, transparent)` }}
      />
      <div className="relative flex flex-col items-start text-left">
        <HouseFlourish show={typingDone} />
        <h1 className="font-display mt-3 text-6xl leading-[0.85] tracking-tighter text-white uppercase sm:text-8xl">
          <Typewriter text="Huis van Cees" onDone={() => setTypingDone(true)} />
        </h1>
        <p
          className="mt-3 text-sm font-semibold tracking-[0.2em] uppercase sm:text-base"
          style={{ color: ORANGE }}
        >
          Sport influencer agency
        </p>
      </div>
    </div>
  )
}

const FLY_IN_PHOTOS = [
  '/portfolio/vw-1.jpg',
  '/portfolio/vw-2.jpg',
  '/portfolio/vw-3.jpg',
  '/portfolio/vw-4.jpg',
  '/portfolio/vw-5.jpg',
]

function FlyInPhotos() {
  return (
    <div className="mt-14 grid w-full max-w-4xl grid-cols-2 gap-3 sm:grid-cols-5 sm:gap-4">
      {FLY_IN_PHOTOS.map((src, i) => (
        <Reveal
          key={src}
          className={i === 0 ? 'col-span-2 sm:col-span-1' : ''}
          style={{ transitionDelay: `${i * 150}ms` }}
        >
          <img
            src={src}
            alt="Huis van Cees"
            style={{ filter: 'brightness(1.25) saturate(1.05)' }}
            className="aspect-[3/4] w-full rounded-xl object-cover"
          />
        </Reveal>
      ))}
    </div>
  )
}

function PortfolioMosaic() {
  const photos = [
    { src: '/portfolio/2055.jpg', className: 'col-span-2 row-span-2' },
    { src: '/portfolio/2131.jpg', className: 'col-span-1 row-span-2' },
    { src: '/portfolio/2163.jpg', className: 'col-span-1 row-span-1' },
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
      <PhotoMasthead />

      <section className="flex flex-col items-center px-6 pt-24 pb-24 text-center">
        <Reveal className="flex flex-col items-center">
          <p className="font-display text-2xl tracking-tight uppercase sm:text-3xl">
            Coming soon
          </p>
          <p className="mt-6 max-w-md opacity-60">
            We bouwen aan iets moois — binnenkort meer.
          </p>
          <button
            type="button"
            className="mt-8 rounded-full px-6 py-3 text-sm font-semibold transition hover:brightness-110"
            style={{ backgroundColor: ORANGE, color: OFF_WHITE }}
          >
            Interesse om in ons portfolio te komen? Meld je aan
          </button>
        </Reveal>

        <Reveal className="flex w-full flex-col items-center">
          <FlyInPhotos />
        </Reveal>
      </section>

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

        <Reveal className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-8 sm:grid-cols-4">
          {founders.map((founder) => (
            <div key={founder.photo} className="flex flex-col items-center">
              <img
                src={founder.photo}
                alt={founder.name}
                className="aspect-square w-full rounded-2xl object-cover"
              />
              <p className="mt-3 text-sm font-medium opacity-80">
                {founder.name}
              </p>
            </div>
          ))}
        </Reveal>
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
