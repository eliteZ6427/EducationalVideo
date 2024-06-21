## Git Repository

Please see the
[@eliteZ6427/EducationalVideo](https://github.com/eliteZ6427/EducationalVideo) 
repository.
# Educational Video Gallery

## Introduction

This project aims to build a responsive video gallery application that allows users to view, search, and upload videos. The core functionalities include displaying a gallery of video thumbnails, providing a detailed view of selected videos, implementing a search feature, and enabling video uploads.

## Components and Their Responsibilities

### 1. Header Component
- **Functionality**: Provides a search bar, a logo that resets the view, and an upload button to open a modal.
- **Responsiveness**: Utilizes Flexbox and Tailwind CSS to adapt to different screen sizes.

### 2. Gallery Component
- **Functionality**: Displays a grid of video thumbnails.
- **Responsiveness**: Uses Tailwind CSS grid utilities to adjust the number of columns based on screen size.

### 3. ShowRoom Component
- **Functionality**: Shows a detailed view of a selected video, including its comments and related videos.
- **Responsiveness**: Employs Flexbox and media queries to ensure a smooth layout transition between mobile and desktop views.

### 4. UploadModal Component
- **Functionality**: Allows users to upload new videos.
- **Validation**: Ensures required fields are filled before submitting.

## Key Functionalities

### 1. Loading Videos
- **Process**: Fetches a list of videos from the API using a user ID from environment variables.
- **Environment Variable Usage**: Utilizes `process.env.NEXT_PUBLIC_USER_ID` to retrieve the user ID.

### 2. Searching Videos
- **Implementation**: Filters the video list based on the search query entered in the search bar.
- **Responsive Updates**: Dynamically updates the displayed video list as the search query changes.

### 3. Selecting and Viewing Videos
- **Functionality**: When a video thumbnail is clicked, detailed information about the selected video is displayed.
- **Error Handling**: Shows a default image if the video fails to load.

### 4. Uploading Videos
- **Modal Interaction**: Opens a modal for video upload, which validates inputs and submits new video data to the server.

## Error Handling

- **Video Load Errors**: Displays a default thumbnail if the video fails to load.
- **API Request Errors**: Logs errors to the console and provides user feedback.

## Security Considerations

- **Environment Variables**: Secured through the `.env.local` file and prefixed with `NEXT_PUBLIC_` for safe client-side access.
- **Data Validation**: Ensures all required fields are validated before form submission.

## Performance Enhancements

- **Asynchronous Data Fetching**: Utilizes `async/await` for fetching data, ensuring non-blocking operations.
- **Efficient State Management**: Maintains and updates state efficiently to ensure smooth user interactions.

## Conclusion

This solution leverages modern web development practices to create a responsive and user-friendly video gallery application. The use of Next.js, React, and Tailwind CSS ensures a robust and scalable architecture, while TypeScript adds type safety for more reliable code. Environment variables are managed securely, and the overall user experience is enhanced through responsive design and comprehensive error handling.

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run
```bash
npm run dev
```
### Build
```bash
npm run build
```
## Developer
Ronny Jang

Email:elite.z.6427@gmail.com