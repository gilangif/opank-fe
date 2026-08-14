export default function formatDate(date = new Date()) {
  const d = new Date(date)

  const day = String(d.getDate()).padStart(2, "0")
  const month = String(d.getMonth() + 1).padStart(2, "0")
  const year = d.getFullYear()

  let hours = d.getHours()

  const minutes = String(d.getMinutes()).padStart(2, "0")
  const seconds = String(d.getSeconds()).padStart(2, "0")

  const ampm = hours >= 12 ? "PM" : "AM"
  hours = hours % 12 || 12

  return `${day}/${month}/${year} ${String(hours).padStart(2, "0")}:${minutes}:${seconds} ${ampm}`
}
