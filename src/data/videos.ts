// video.ts
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const BASE_URL = 'https://take-home-assessment-423502.uc.r.appspot.com/api'

export type Video = {
  id: string
  title: string
  description: string
  video_url: string
  user_id: string
  num_comments: number
  created_at: string
}

type VideosResponse = {
  videos: Video[]
}
const getVideos = async (userId: string): Promise<VideosResponse> => {
  const response = await axios(`${BASE_URL}/videos?user_id=${userId}`)
  return response.data
}

export const useVideos = (userId: string, enabled?: boolean) => {
  return useQuery<VideosResponse, Error>({
    queryKey: ['videos', userId],
    queryFn: () => getVideos(userId),
    enabled,
  })
}
