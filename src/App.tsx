import { useEffect, useRef, useState } from 'react'

const OFF_WHITE = '#F5F1E8'
const ORANGE = '#FF5A1F'
const GREEN = '#154734'
const PURPLE = '#8B3DFF'

const FROM_CLASSES = {
  top: '-translate-y-10',
  bottom: 'translate-y-10',
  left: '-translate-x-10',
  right: 'translate-x-10',
}

function Reveal({
  children,
  className = '',
  style,
  duration = 700,
  from = 'bottom',
}: {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  duration?: number
  from?: 'top' | 'bottom' | 'left' | 'right'
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
        visible ? 'translate-x-0 translate-y-0 opacity-100' : `${FROM_CLASSES[from]} opacity-0`
      } ${className}`}
    >
      {children}
    </div>
  )
}

function useTypewriter(text: string, speed = 90) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (count >= text.length) return
    const t = setTimeout(() => setCount((c) => c + 1), speed)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count])

  return { typed: text.slice(0, count), done: count >= text.length }
}

const NAV_LINKS = [
  { label: 'Who we are', href: '#who-we-are' },
  { label: 'Why join us', href: '#why-join-us' },
  { label: 'Portfolio', href: '#portfolio' },
]

function Logo({ className = '' }: { className?: string }) {
  return (
    <p className={`font-display text-sm leading-[1.15] uppercase ${className}`}>
      <span className="border-b-2 pb-0.5" style={{ borderColor: PURPLE }}>
        huis van
      </span>
      <br />
      <span className="border-b-2 pb-0.5" style={{ borderColor: PURPLE }}>
        Cees
      </span>
    </p>
  )
}

function Nav() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 sm:px-12">
      <nav className="hidden gap-6 text-sm font-medium sm:flex">
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="transition-colors duration-200 hover:text-[#8B3DFF]"
          >
            {link.label}
          </a>
        ))}
      </nav>
      <Logo />
      <a
        href="#why-join-us"
        className="font-display rounded-full px-4 py-2 text-xs normal-case text-white transition hover:brightness-110"
        style={{ backgroundColor: ORANGE }}
      >
        Meld je aan
      </a>
    </header>
  )
}

function Hero() {
  const { typed, done } = useTypewriter('Coming soon...')

  return (
    <section
      className="lg:grid lg:min-h-[calc(100vh-64px)] lg:grid-cols-2"
      style={{ backgroundColor: GREEN, color: OFF_WHITE }}
    >
      <div className="flex flex-col items-center px-6 pt-4 pb-16 text-center lg:items-start lg:justify-center lg:px-12 lg:py-16 lg:text-left">
        <h1 className="font-display mt-1 max-w-3xl text-4xl leading-[0.95] tracking-tight uppercase sm:text-6xl">
          Your next
          <br />
          <span style={{ color: PURPLE }}>Sport creator</span>
          <br />
          Agency
        </h1>
        <p
          className="font-display mt-16 text-sm tracking-tight uppercase italic sm:text-base"
          style={{ color: PURPLE }}
        >
          {typed}
          <span className={`inline-block w-[0.06em] ${done ? 'opacity-0' : 'animate-pulse'}`}>
            |
          </span>
        </p>
        <button
          type="button"
          className="font-display mt-5 rounded-full px-6 py-3 text-sm normal-case text-white transition hover:brightness-110"
          style={{ backgroundColor: ORANGE }}
        >
          Interesse om in ons portfolio te komen? Meld je aan
        </button>
      </div>

      <CameraRoll />
    </section>
  )
}

const ROLL_PHOTOS = [
  '/portfolio/rs-1.jpg',
  '/portfolio/on-1.jpg',
  '/portfolio/rs-2.jpg',
  '/portfolio/on-2.jpg',
  '/portfolio/rs-3.jpg',
  '/portfolio/on-3.jpg',
  '/portfolio/on-4.jpg',
  '/portfolio/on-1.jpg',
  '/portfolio/rs-2.jpg',
]

function CameraRoll() {
  const directions: Array<'top' | 'bottom' | 'left' | 'right'> = [
    'left',
    'top',
    'right',
    'bottom',
    'left',
    'right',
    'top',
    'bottom',
    'left',
  ]

  return (
    <div className="grid grid-cols-3 gap-2 px-6 pb-16 sm:px-12 lg:h-full lg:gap-2 lg:p-2 lg:pb-2">
      {ROLL_PHOTOS.map((src, i) => (
        <Reveal
          key={`${src}-${i}`}
          className="aspect-square lg:aspect-auto lg:h-full"
          style={{ transitionDelay: `${i * 80}ms` }}
          duration={500}
          from={directions[i]}
        >
          <img
            src={src}
            alt="Huis van Cees"
            style={{ filter: 'brightness(1.25) saturate(1.05)' }}
            className="h-full w-full rounded-xl object-cover lg:rounded-none"
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

const values = [
  {
    title: 'We trainen zelf',
    description:
      'Iedereen bij ons sport structureel. We weten wat werkt, omdat we het zelf testen.',
  },
  {
    title: 'We managen, geen contentbureau',
    description: 'Deals, contracten, planning — wij regelen het, jij sport en post.',
  },
  {
    title: 'Kleine club, korte lijnen',
    description: 'Je belt met de founders, niet met een account manager.',
  },
]

function WhatWeStandFor() {
  return (
    <section className="relative overflow-hidden px-6 py-24 sm:px-12">
      <img
        src="/portfolio/on-3.jpg"
        alt=""
        style={{ objectPosition: '85% center' }}
        className="absolute inset-0 hidden h-full w-full object-cover opacity-70 sm:block"
      />
      <div
        className="absolute inset-0"
        style={{ background: `linear-gradient(to right, ${GREEN} 45%, transparent 100%)` }}
      />

      <div className="relative">
        <Reveal>
          <h2 className="font-display max-w-3xl text-5xl leading-[0.85] tracking-tighter uppercase sm:text-7xl">
            What we
            <br />
            stand for
          </h2>
        </Reveal>

        <div className="mt-12 max-w-3xl">
          {values.map((value, i) => (
            <Reveal
              key={value.title}
              className="border-t py-6"
              style={{ borderColor: `${OFF_WHITE}1A`, transitionDelay: `${i * 120}ms` }}
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-6">
                <span className="font-display shrink-0 text-sm opacity-40">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-display text-2xl uppercase sm:w-72 sm:shrink-0">
                  {value.title}
                </span>
                <p className="text-base leading-relaxed opacity-60">
                  {value.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function App() {
  return (
    <div style={{ backgroundColor: GREEN, color: OFF_WHITE }}>
      <Nav />
      <Hero />

      <section
        id="who-we-are"
        className="border-t px-6 py-24 sm:px-12"
        style={{ borderColor: `${OFF_WHITE}1A` }}
      >
        <Reveal>
          <div className="max-w-3xl">
            <h2 className="font-display text-5xl leading-[0.85] tracking-tighter uppercase sm:text-7xl">
              Who we are
            </h2>
            <p className="mt-8 max-w-xl text-lg leading-relaxed opacity-60">
              Wij zijn zelf sportmensen — dus snappen we sportmensen.
              <br />
              <br />
              Daarom bouwen we Huis van Cees: een agency die sport influencers
              begrijpt, niet alleen managet. Sport matcht met sport, en dat
              voel je in alles wat we doen.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid max-w-4xl grid-cols-2 gap-8 sm:grid-cols-4">
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

      <WhatWeStandFor />

      <section
        id="why-join-us"
        className="border-t px-6 py-24 sm:px-12"
        style={{ borderColor: `${OFF_WHITE}1A` }}
      >
        <Reveal>
          <h2 className="font-display max-w-3xl text-5xl leading-[0.85] tracking-tighter uppercase sm:text-7xl">
            Why join us?
          </h2>
        </Reveal>

        <Reveal className="mt-12 max-w-3xl">
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

      <section
        id="portfolio"
        className="border-t px-6 py-24 sm:px-12"
        style={{ borderColor: `${OFF_WHITE}1A` }}
      >
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
