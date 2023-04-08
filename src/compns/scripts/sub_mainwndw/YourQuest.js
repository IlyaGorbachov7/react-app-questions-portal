export function rangeViewHtml(limit, totalCountRecord, curNPage, totalPage) {
    return [((curNPage) * limit + 1), (curNPage !== (totalPage - 1)) ? (limit * curNPage + limit) : (totalCountRecord)]
}
