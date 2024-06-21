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
