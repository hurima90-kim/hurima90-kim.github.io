import { useEffect, useMemo, useState } from 'react'

type TocEntry = {
  url: string
  title: string
  items?: TocEntry[]
}

type TocItem = {
  url: string
  title: string
  depth: number
}

function flatten(items: TocEntry[], depth = 0): TocItem[] {
  return items.flatMap(item => [
    { url: item.url, title: item.title, depth },
    ...(item.items ? flatten(item.items, depth + 1) : []),
  ])
}

export default function useTableOfContents(tableOfContents: unknown) {
  const [activeId, setActiveId] = useState<string | null>(null)

  const toc = useMemo(() => {
    const items =
      (tableOfContents as { items?: TocEntry[] } | null)?.items ?? []
    return flatten(items)
  }, [tableOfContents])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries =>
        setActiveId(prevId => {
          if (entries[0].boundingClientRect.top < 0) return entries[0].target.id
          else {
            const index = toc.findIndex(({ url }) => url === `#${prevId}`)
            return index > 0 ? toc[index - 1].url.slice(1) : null
          }
        }),
      { rootMargin: '0% 0px -100% 0px' },
    )

    document
      .querySelectorAll('#content h1, #content h2, #content h3')
      .forEach(element => observer.observe(element))

    return () => observer.disconnect()
  }, [toc])

  return { toc, activeId }
}
