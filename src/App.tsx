function HouseMark() {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className="h-10 w-10 text-white"
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

function App() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-neutral-950 px-6 text-center text-white">
      <HouseMark />
      <p className="mt-5 mb-4 text-xs font-semibold tracking-[0.3em] text-neutral-500 uppercase">
        Huis van Cees
      </p>
      <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
        Coming soon
      </h1>
      <p className="mt-6 max-w-md text-neutral-400">
        Agency voor sport influencers.
        <br />
        We bouwen aan iets moois — binnenkort meer.
      </p>
      <button
        type="button"
        className="mt-8 rounded-full bg-white px-6 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-neutral-200"
      >
        Interesse om in ons portfolio te komen? Meld je aan
      </button>
    </div>
  )
}

export default App
