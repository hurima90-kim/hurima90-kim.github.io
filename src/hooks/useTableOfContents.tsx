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
    const headings = Array.from(
      document.querySelectorAll<HTMLElement>(
        '#content h1, #content h2, #content h3, #content h4, #content h5, #content h6',
      ),
    )

    const updateActiveId = () => {
      let currentId: string | null = null
      for (const heading of headings) {
        if (heading.getBoundingClientRect().top < 0) currentId = heading.id
        else break
      }
      setActiveId(currentId)
    }

    const observer = new IntersectionObserver(updateActiveId, {
      rootMargin: '0% 0px -100% 0px',
    })

    headings.forEach(element => observer.observe(element))
    updateActiveId()

    return () => observer.disconnect()
  }, [toc])

  return { toc, activeId }
}
