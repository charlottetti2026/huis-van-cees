function HouseMark() {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className="h-7 w-7 text-neutral-950"
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

const founders = [
  { photo: '/founders/founder-1.png', name: 'Naam founder 1' },
  { photo: '/founders/founder-2.png', name: 'Naam founder 2' },
  { photo: '/founders/founder-3.png', name: 'Naam founder 3' },
  { photo: '/founders/founder-4.png', name: 'Naam founder 4' },
]

function App() {
  return (
    <div className="bg-white text-neutral-950">
      <section className="flex flex-col items-center px-6 pt-16 pb-24 text-center">
        <div className="mb-10 flex items-center gap-2">
          <HouseMark />
          <span className="text-sm font-bold tracking-[0.3em] uppercase">
            Huis van Cees
          </span>
        </div>

        <h1 className="max-w-4xl text-5xl leading-[1.05] font-black tracking-tight uppercase sm:text-7xl">
          Sport matcht met <span className="text-orange-600">sport</span>
        </h1>
        <p className="mt-6 text-lg font-medium text-neutral-500 sm:text-xl">
          Agency voor sport influencers
        </p>

        <p className="mt-10 text-2xl font-black tracking-tight uppercase sm:text-3xl">
          Coming soon
        </p>
        <p className="mt-6 max-w-md text-neutral-500">
          We bouwen aan iets moois — binnenkort meer.
        </p>
        <button
          type="button"
          className="mt-8 rounded-full bg-neutral-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
        >
          Interesse om in ons portfolio te komen? Meld je aan
        </button>
      </section>

      <section className="border-t border-neutral-100 px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-4xl font-black tracking-tight uppercase sm:text-6xl">
            Who we are
          </h2>
          <p className="mt-8 max-w-xl text-lg text-neutral-500">
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
              <p className="mt-3 text-sm font-medium text-neutral-700">
                {founder.name}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-neutral-100 px-6 py-24">
        <h2 className="text-center text-sm font-semibold tracking-[0.3em] text-neutral-400 uppercase">
          Already in our portfolio
        </h2>
        <div className="mx-auto mt-10 flex max-w-4xl items-center justify-center">
          <span className="text-2xl font-black tracking-tight text-neutral-300 uppercase sm:text-3xl">
            The Running Sisters
          </span>
        </div>
      </section>
    </div>
  )
}

export default App
