export function rangeViewHtml(limit, totalCountRecord, curNPage, totalPage) {
    return [((curNPage - 1) * limit + 1), (curNPage !== totalPage) ? (limit * curNPage) : (totalCountRecord)]
}
