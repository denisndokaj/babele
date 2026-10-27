interface PlaceholderPageProps {
  title: string
  description: string
  phase: string
}

export function PlaceholderPage({ title, description, phase }: PlaceholderPageProps) {
  return (
    <section>
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="mt-2 max-w-prose text-slate-600 dark:text-slate-300">{description}</p>
      <p className="mt-4 inline-block rounded bg-slate-200 px-3 py-1 text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-300">
        In arrivo nella {phase}
      </p>
    </section>
  )
}
