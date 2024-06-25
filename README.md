This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

I also used shadcn ui for styling and components.

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# App Functionality Requirements

The website must have the following capabilities:

- Show a list of videos and allow users to select a video from the list.

  - You can view a list of videos on the home page (`/`) where I display a list of videos uploaded by a "featured educator" which I hardcoded to be `john_smith`. I did this so that I could easily have the ability to select a video to view its details. I also didn't want the landing page to look too boring.
  - You can also view a list of videos uploaded by an educator on their profile page (`/profile/:userId`).

- Allow the user to create a new video object with a title, description and a video URL.

  - You can upload a video on your profile page (`/profile/:userId`) if you are logged in. You can "log in" by clicking on the "Log in" button on the top right corner of the page. I didn't implement a full authentication system so you can log in as any user by entering a name. The name provided gets transformed to snake_case and stored in local storage. This is how I determine if a user is logged in. If you are logged in, you can upload a video. If you are not logged in, you can't upload a video.

- A user must be able to comment on a video and view comments from other users.

  - You can comment on a video on the video page (`/video/:videoId`) if you are logged in. If you are not logged in, you can't comment on a video. Any of the cards on the home page or profile page will take you to the video page.

- Open the videos in full screen with full playback functionality.

  - For mp4 videos, I used the HTML5 video element to display the video and added the `controls` prop to display volume, play, full screen buttons (http://localhost:3000/video/kSGmjTA633OyzF9G1bQy is an example of an mp4). For YouTube urls, I used an `iframe` but had to do some extra work. First, I detect if the url is a YouTube url with a `isYouTubeUrl`. If it is, I fetch its oembed data with `getYouTubeOembedData` to get the YouTube videoId (I also use this helper to display a thumbnail image for the card component since the oembed data has all this). With the YouTube videoId I use `makeYouTubeEmbedUrl` to construct a proper "embed" url to use as the source for the iframe. Using the embed url allows you to play the video in full screen and have all the necessary controls. In a previous side-project, I did extensive work around embedding videos from YouTube so I reused some of that logic. Most of this logic exists as utility functions in `/lib/utiils.ts`. http://localhost:3000/video/4WfSeQ7rlS9lVxGkSU9K is an example of a YouTube video but really most videos that have been created are YouTube videos.

- Include options for adjusting playback speed and volume.
  - Same as the previous point.

# Overview

I decided to go with NextJS and pages router for this project. The structures is as follows:

- Home page (/)
  - Here I added a section that displays a list of videos uploaded by a "featured educator" which I hardcoded to be `john_smith`. This was just a design choice. I use react query to load the list of videos.
- Profile page (/profile/:userId)
  - This page displays the profile page for an educator. It shows the educator's name, profile picture, and a list of videos uploaded by the educator. If the user is logged in and on their own profile page, they can upload a video. They can also log out. I use react query's `useMutation` to upload a video and invalidate the videos query (where the query key is the educator/user id) so that the new video is displayed.
- Video page (/video/:videoId)
  - This page displays the details of a video. It shows the video title, description, and the video itself. If the user is logged in, they can comment on the video. I fetch the data server-side (`getServerSideProps`) so that the vide page is shareable and SEO friendly. Once the page loads on the client, I use react query to fetch the comments for the video. I use react query's `useMutation` to add a comment to the video and invalidate the comments query so that the new comment is displayed.

# Screenshots

Home page
![Home page](/screenshots/home-page.png)

Your own profile page while logged in
![Profile page](/screenshots/logged-in-user-profile-page.png)

Viewing other user's profile page
![Profile page](/screenshots/viewing-other-users-profile.png)

Creating a new video
![Create video](/screenshots/create-new-video-dialog.png)

Logging in
![Log in](/screenshots/log-in-dialog.png)

Adding a comment + success feedback
![Add comment](/screenshots/posting-a-comment.png)
![Add comment success](/screenshots/new-comment-added.png)

Video page for mp4 video
![Video page](/screenshots/mp4-video-page.png)
