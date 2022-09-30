export interface SrcsetItemSize {
    mediaQuery: string | undefined,
    size: number
}

export interface SrcsetItem extends SrcsetItemSize {
    url: string
}


const reSrcSetSize = /^(?:\((?<mediaQuery>.*)\) )?(?<size>\d+)px$/
export function parseSrcsetSizesString(sizesStr: string) {
    return sizesStr.split(', ').map(s => {
        const match = s.trim().match(reSrcSetSize)
        if (match == null) {
            throw new Error('srcset sizes must be like "(max-width: 400px) 400px, (max-width: 704px) 704px, 1080px"')
        }
        const { mediaQuery, size } = match.groups as Record<string, string>
        return { mediaQuery, size: parseInt(size) } as SrcsetItemSize
    })
}
