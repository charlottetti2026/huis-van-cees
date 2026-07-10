function HouseMark() {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className="h-7 w-7 text-white"
      aria-hidden="true"
    >
      <path
        d="M8 22 24 8l16 14M13 22v18h22V22"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 40v-11h6v11"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
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

const founders = [
  { photo: '/founders/founder-1.png', name: 'Charlotte' },
  { photo: '/founders/founder-2.png', name: 'Emma' },
  { photo: '/founders/founder-3.png', name: 'Emma' },
  { photo: '/founders/founder-4.png', name: 'Sophie' },
]

function App() {
  return (
    <div style={{ backgroundColor: '#154734' }} className="text-white">
      <section className="flex flex-col items-center px-6 pt-16 pb-24 text-center">
        <div className="mb-10 flex items-center gap-2">
          <HouseMark />
          <span className="text-sm font-bold tracking-[0.3em] uppercase">
            Huis van Cees
          </span>
        </div>

        <h1 className="font-display max-w-4xl text-6xl leading-[0.82] tracking-tighter uppercase sm:text-8xl">
          Niets groots <span className="text-[#8B3DFF]">ontstaat</span> alleen
        </h1>
        <p className="mt-6 text-lg font-medium text-white/60 sm:text-xl">
          Agency voor sport influencers
        </p>

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

        <VideoPlaceholder />
      </section>

      <section className="border-t border-white/10 px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-5xl leading-[0.85] tracking-tighter uppercase sm:text-7xl">
            Who we are
          </h2>
          <p className="mt-8 max-w-xl text-lg text-white/60">
            Wij zijn zelf sportmensen — dus snappen we sportmensen.
            <br />
            <br />
            Daarom bouwen we Huis van Cees: een agency die sport influencers
            begrijpt, niet alleen managet. Sport matcht met sport, en dat voel
            je in alles wat we doen.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-8 sm:grid-cols-4">
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
        </div>
      </section>

      <section className="border-t border-white/10 px-6 py-24">
        <h2 className="text-center text-sm font-semibold tracking-[0.3em] text-white/40 uppercase">
          Already in our portfolio
        </h2>
        <div className="mx-auto mt-10 flex max-w-4xl items-center justify-center">
          <span className="font-display text-2xl tracking-tight text-white/30 uppercase sm:text-3xl">
            The Running Sisters
          </span>
        </div>
      </section>
    </div>
  )
}

export default App
