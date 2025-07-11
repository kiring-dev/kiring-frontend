'use client'
import React, { useEffect, useState } from 'react'
import { SubwayArrivalType } from '@/app/(full-layout)/transit/types/subwayType'
import IcoSubwayExpress from '@/assets/ico-subway-express.svg'

type SubwayGroup = Record<string, SubwayArrivalType[]>

function isExpress(btrainSttus?: string) {
  return btrainSttus?.includes('급행')
}

function formatTimeFull(sec: number) {
  if (sec < 60) return '곧 도착'
  const min = Math.floor(sec / 60)
  const remainSec = sec % 60
  if (remainSec === 0) return `${min}분`
  return `${min}분 ${remainSec}초`
}

function formatTimeMin(sec: number) {
  if (sec < 60) return '곧 도착'
  return `${Math.floor(sec / 60)}분`
}

export default function DirectionGridClient({ grouped }: { grouped: SubwayGroup }) {
  // barvlDt를 number로 변환해서 상태로 관리
  const [timeMap, setTimeMap] = useState(() =>
    Object.fromEntries(
      Object.entries(grouped).map(([dir, trains]) => [dir, trains.map((t) => Number(t.barvlDt))]),
    ),
  )

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeMap((prev) =>
        Object.fromEntries(
          Object.entries(prev).map(([dir, arr]) => [
            dir,
            arr.map((sec) => (sec > 0 ? sec - 1 : 0)),
          ]),
        ),
      )
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const entries = Object.entries(grouped)
  const rows = []
  for (let i = 0; i < entries.length; i += 2) {
    rows.push(entries.slice(i, i + 2))
  }

  return (
    <>
      {rows.map((row, rowIdx) => (
        <div key={rowIdx} className="mb-4 flex gap-3">
          {row.map(([korDirection, trains]) => (
            <div
              key={korDirection}
              className="flex-1 rounded-xl border border-gray-200 bg-white p-3"
            >
              <div className="body2-sb mb-2.5 text-gray-900">{korDirection}</div>
              {trains.map((train, idx) => (
                <div key={idx} className="mb-1 flex items-center justify-between">
                  <div className="flex items-center gap-0.5 text-gray-600">
                    <span className="body3">{train.destination.replace('행', '')}</span>
                    {isExpress(train.btrainSttus) && <IcoSubwayExpress />}
                  </div>
                  <span className="body3 min-w-[48px] text-right text-purple-500">
                    {idx === 0
                      ? formatTimeFull(timeMap[korDirection]?.[idx] ?? Number(train.barvlDt))
                      : formatTimeMin(timeMap[korDirection]?.[idx] ?? Number(train.barvlDt))}
                  </span>
                </div>
              ))}
            </div>
          ))}
          {row.length === 1 && <div className="flex-1" />}
        </div>
      ))}
    </>
  )
}
