'use client'

import clsx from 'clsx'

export interface TabItem {
  label: string
  value: string
}

interface DefaultTabProps {
  tabs: TabItem[]
  active: string
  onChange: (value: string) => void
}

export default function DefaultTab({ tabs, active, onChange }: DefaultTabProps) {
  return (
    <nav
      aria-label="페이지 분류 탭"
      className="position-centered-x full-width fixed top-14 z-10 h-9 border-b border-gray-100 bg-white px-4"
    >
      <ul role="tablist" className="flex">
        {tabs.map(({ label, value }) => (
          <li key={value} className="flex-row-center h-9 min-w-15">
            <button
              role="tab"
              type="button"
              aria-selected={value === active}
              tabIndex={value === active ? 0 : -1}
              className={clsx(
                'body2-sb flex h-full flex-col items-center justify-start transition-colors',
                value === active ? 'border-b-2 border-purple-500 text-purple-500' : 'text-gray-600',
              )}
              onClick={() => onChange(value)}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
