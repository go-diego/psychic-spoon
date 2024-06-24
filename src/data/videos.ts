import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { z } from 'zod'

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

export type Comment = {
  video_id: string
  content: string
  user_id: string
  created_at: string
  id: string
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

type NewVideo = Pick<Video, 'title' | 'description' | 'user_id' | 'video_url'>
export const NewVideoSchema = z.object({
  title: z.string().min(1).max(50),
  description: z.string().min(1).max(500),
  user_id: z.string().min(1).max(50),
  video_url: z.string().min(1),
})
const postVideo = async (video: NewVideo) => {
  await axios.post(`${BASE_URL}/videos`, video)
}
export const usePostVideo = (
  onSuccess?: (newVideo: NewVideo) => void,
  onError?: (error: Error) => void,
) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: postVideo,
    onSuccess: (_, newVideo) => {
      onSuccess?.(newVideo)
      queryClient.invalidateQueries({ queryKey: ['videos', newVideo.user_id] })
    },
    onError,
  })
}

type VideoResponse = {
  video: Video
}
export const getVideo = async (id: string) => {
  const response = await axios.get<VideoResponse>(
    `${BASE_URL}/videos/single?video_id=${id}`,
  )
  return response.data
}

type CommentsResponse = {
  comments: Comment[]
}
const getComments = async (videoId: string): Promise<CommentsResponse> => {
  const response = await axios(
    `${BASE_URL}/videos/comments?video_id=${videoId}`,
  )
  return response.data
}
export const useComments = (videoId: string) => {
  return useQuery<CommentsResponse, Error>({
    queryKey: ['comments', videoId],
    queryFn: () => getComments(videoId),
  })
}

type NewComment = Pick<Comment, 'content' | 'video_id' | 'user_id'>
const postComment = async (newComment: NewComment) => {
  await axios.post(`${BASE_URL}/videos/comments`, newComment)
}
export const usePostComment = (
  onSuccess?: (newComment: NewComment) => void,
  onError?: (error: Error) => void,
) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: postComment,
    onSuccess: (_, newComment) => {
      onSuccess?.(newComment)
      queryClient.invalidateQueries({
        queryKey: ['comments', newComment.video_id],
      })
    },
    onError,
  })
}
