import React from 'react'
import { SmallCard } from './components'
import Link from 'next/link'
import Image from 'next/image'
import days, { WeekDayProps } from './lw8_data'

const DayHighlightWidget = () => {
  const [_pre, d1, _d2, _d3, _d4, _d5] = days

  return (
    <div className="w-full max-w-xl">
      <SmallCard
        className="border hover:border-scale-800 transition-colors"
        innerClassName="bg-opacity-20"
      >
        <Link href="#currentDay">
          <a className="flex flex-row justify-between items-center w-full h-full gap-2">
            <div className="relative flex-shrink flex items-center p-2 w-2/3 md:w-auto">
              <div className="flex flex-col gap-1 sm:pl-4">
                <div className="flex items-center gap-2">
                  <div className={['flex min-w-[20px] opacity-50', 'opacity-pulse'].join(' ')}>
                    <svg
                      width="21"
                      height="21"
                      viewBox="0 0 21 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.55025 3.97258C5.94078 4.36311 5.94078 4.99627 5.55025 5.38679C2.81658 8.12046 2.81658 12.5526 5.55025 15.2863C5.94078 15.6768 5.94078 16.31 5.55025 16.7005C5.15973 17.091 4.52656 17.091 4.13604 16.7005C0.62132 13.1858 0.62132 7.4873 4.13604 3.97258C4.52656 3.58206 5.15973 3.58206 5.55025 3.97258ZM15.4498 3.97281C15.8403 3.58229 16.4735 3.58229 16.864 3.97281C20.3787 7.48753 20.3787 13.186 16.864 16.7007C16.4735 17.0913 15.8403 17.0913 15.4498 16.7007C15.0592 16.3102 15.0592 15.677 15.4498 15.2865C18.1834 12.5529 18.1834 8.1207 15.4498 5.38703C15.0592 4.9965 15.0592 4.36334 15.4498 3.97281ZM8.37869 6.80101C8.76921 7.19153 8.76921 7.8247 8.37869 8.21522C7.20711 9.38679 7.20711 11.2863 8.37869 12.4579C8.76921 12.8484 8.76921 13.4816 8.37868 13.8721C7.98816 14.2626 7.355 14.2626 6.96447 13.8721C5.01185 11.9195 5.01185 8.75363 6.96447 6.80101C7.355 6.41048 7.98816 6.41048 8.37869 6.80101ZM12.6213 6.80124C13.0119 6.41072 13.645 6.41072 14.0355 6.80124C15.9882 8.75386 15.9882 11.9197 14.0355 13.8723C13.645 14.2628 13.0119 14.2628 12.6213 13.8723C12.2308 13.4818 12.2308 12.8486 12.6213 12.4581C13.7929 11.2865 13.7929 9.38703 12.6213 8.21545C12.2308 7.82493 12.2308 7.19176 12.6213 6.80124ZM10.5 9.33677C11.0523 9.33677 11.5 9.78449 11.5 10.3368V10.3468C11.5 10.8991 11.0523 11.3468 10.5 11.3468C9.94772 11.3468 9.5 10.8991 9.5 10.3468V10.3368C9.5 9.78449 9.94772 9.33677 10.5 9.33677Z"
                        fill="#F2F2F2"
                      />
                    </svg>
                  </div>
                  <span className="text-white">Live now: Day 1</span>
                </div>
                <span className="">{d1.steps[0].title}</span>
              </div>
            </div>
            <div className="relative flex !aspect-video h-[80px] md:h-[100px] gap-2 z-10 rounded overflow-hidden">
              <Image
                src="/images/launchweek/8/lw8-yt-thumb.jpg"
                alt="Youtube video thumbnail"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </a>
        </Link>
      </SmallCard>
    </div>
  )
}

export default DayHighlightWidget