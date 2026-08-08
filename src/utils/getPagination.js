export default function getPagination(currentPage, totalPages) {
  const maxVisible = totalPages <= 3 ? 3 : 5

  if (totalPages <= maxVisible) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  let start = currentPage - Math.floor(maxVisible / 2)
  let end = currentPage + Math.floor(maxVisible / 2)

  if (start < 1) {
    start = 1
    end = maxVisible
  }

  if (end > totalPages) {
    end = totalPages
    start = totalPages - maxVisible + 1
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
}
