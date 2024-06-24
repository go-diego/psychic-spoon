import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import axios from 'axios'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const isYouTubeUrl = (url: string) => {
  if (!url) return false
  const regex = new RegExp(
    /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/,
  )
  return regex.test(url)
}

type YouTubeOembedData = {
  author_name: string
  author_url: string
  height: number
  html: string
  provider_name: string
  provider_url: string
  thumbnail_height: number
  thumbnail_url: string
  thumbnail_width: number
  title: string
  type: string
  version: string
  width: number
}
export const getYouTubeOembedData = async (url: string) => {
  const res = await axios.get<YouTubeOembedData>(
    `https://www.youtube.com/oembed?url=${url}&format=json`,
  )
  return res.data
}

type OnOrOff = '1' | '0'
export interface YouTubeEmbedOptions {
  modestbranding?: OnOrOff
  playsinline?: OnOrOff
  enablejsapi?: OnOrOff
  autoplay?: OnOrOff
  mute?: OnOrOff
  origin?: string
  listType: 'user_uploads' | 'playlist'
}

const youtubeEmbedDefaultOptions: YouTubeEmbedOptions = {
  modestbranding: '1',
  playsinline: '1',
  enablejsapi: '1',
  autoplay: '0',
  mute: '0',
  listType: 'user_uploads',
  origin: process.env.NODE_ENV === 'development' ? 'localhost' : 'TBD', // TBD: Update origin to production URL
}

export const makeYouTubeEmbedUrl = (
  videoId: string,
  options?: YouTubeEmbedOptions,
): string => {
  const baseUrl = new URL(`https://www.youtube.com/embed/${videoId}`)

  const embedOptions = { ...options, ...youtubeEmbedDefaultOptions }
  Object.keys(embedOptions).forEach((key) => {
    if (
      embedOptions[key as keyof typeof youtubeEmbedDefaultOptions] !== undefined
    )
      baseUrl.searchParams.append(
        key,
        embedOptions[key as keyof typeof youtubeEmbedDefaultOptions] as string,
      )
  })

  return baseUrl.toString()
}

export const getYouTubeVideoIdFromOembedData = (url: string) => {
  const indexOfSrcStart = url.indexOf('src="') + 4
  const indexOfSrcEnd = url.indexOf(' ', indexOfSrcStart)
  const srcValue = url.substring(indexOfSrcStart, indexOfSrcEnd)
  const srcUrl = new URL(srcValue.replace('"', ''))
  const videoId = srcUrl.pathname.split('/').reverse()[0]
  return videoId
}
