export default function getDateRange(date) {
  const d = date instanceof Date ? new Date(date) : new Date(`${date}T00:00:00`)

  if (Number.isNaN(d.getTime())) {
    throw new Error("Invalid date")
  }

  const year = d.getFullYear()
  const month = d.getMonth()

  const today = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`

  const start = `${year}-${String(month + 1).padStart(2, "0")}-01`
  const end = `${year}-${String(month + 1).padStart(2, "0")}-${String(new Date(year, month + 1, 0).getDate()).padStart(2, "0")}`

  return { start, end, today }
}
