import { Fragment, useEffect, useState } from "react"
import { useMonitorStore } from "../store/monitor.store.js"
import { PieChart } from "@mui/x-charts/PieChart"
import { useDrawingArea } from "@mui/x-charts/hooks"
import { styled } from "@mui/material/styles"

const StyledText = styled("text")(() => ({
  fill: "#fff",
  textAnchor: "middle",
  dominantBaseline: "central",
  fontSize: 20,
}))

function PieCenterLabel({ children }) {
  const { width, height, left, top } = useDrawingArea()

  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  )
}

const arcLabel = (params, total) => {
  const percent = params.value
  return `${(percent * 100).toFixed(0)} MB`
}

export default function Monitor() {
  const { lists, systems, getPM2, getSystems } = useMonitorStore((state) => state)

  const [data, setData] = useState([{ id: 0, value: 100, label: "UNKNOWN" }])
  const [openRow, setOpenRow] = useState(null)

  useEffect(() => {
    getSystems()
    getPM2()
  }, [])

  useEffect(() => {
    const arr = lists.map((list) => ({ id: list.id, value: list.memory, label: list.name }))

    setData(arr)
  }, [lists])

  return (
    <>
      <div className="mt-3 flex flex-col sm:flex-row">
        <div>
          <div className="mb-5 text-center">
            <p className="text-2xl uppercase font-bold">{systems.platform}</p>
            <p className="text-sm">{systems.hostname}</p>
          </div>

          <PieChart
            series={[{ data, arcLabel, innerRadius: 80 }]}
            width={380}
            height={280}
            slotProps={{
              legend: {
                direction: "row",
                position: {
                  vertical: "bottom",
                  horizontal: "middle",
                },
                sx: {
                  color: "white",
                },
              },
            }}
          >
            <PieCenterLabel>
              <tspan x="50%" dy="-1.2em">
                {systems?.cpu?.cores} CORES
              </tspan>
              <tspan x="50%" dy="1.2em">
                {systems?.cpu?.usage}%
              </tspan>
              <tspan x="50%" dy="2em" className="text-sm">
                {systems?.memory?.used} / {systems?.memory?.total} MB
              </tspan>
            </PieCenterLabel>
          </PieChart>
        </div>

        <div className="text-center px-4 mt-6 sm:mt-6 flex-2">
          <div class="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
            <table class="w-full text-sm text-left rtl:text-right text-body">
              <thead class="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default">
                <tr>
                  <th scope="col" class="px-4 py-3 font-medium">
                    ID
                  </th>
                  <th scope="col" class="px-4 py-3 font-medium">
                    NAME
                  </th>
                  <th scope="col" class="px-4 py-3 font-medium">
                    STATUS
                  </th>
                  <th scope="col" class="px-4 py-3 font-medium">
                    RESTART
                  </th>
                  <th scope="col" class="px-4 py-3 font-medium">
                    CPU
                  </th>
                </tr>
              </thead>
              <tbody>
                {lists.map((list) => {
                  return (
                    <Fragment key={list.id}>
                      <tr class="bg-neutral-primary border-b border-default" onClick={() => setOpenRow(openRow === list.id ? null : list.id)}>
                        <td class="px-4 py-4 font-medium text-heading whitespace-nowrap">{list.id}</td>
                        <td class="px-4 py-4">{list.name}</td>
                        <td class={`px-4 py-4 ${list.status === "online" ? "text-green-500" : list.status === "offline" ? "text-red-400" : ""} font-bold`}>{list.status}</td>
                        <td class="px-4 py-4">{list.restart}</td>
                        <td class="px-4 py-4">{list.cpu}%</td>
                      </tr>
                      {list.id === openRow && (
                        <tr className="w-100">
                          <td colSpan="5" className="p-2 py-2">
                            <div href="#" class="w-full bg-neutral-primary-soft block p-6 border border-default rounded-base shadow-xs hover:bg-neutral-secondary-medium">
                              <h5 class="mb-3 text-2xl font-semibold tracking-tight text-heading leading-8">Noteworthy technology acquisitions 2021</h5>
                              <p class="text-body">Here are the biggest technology acquisitions of 2025 so far, in reverse chronological order.</p>
                            </div>
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}
