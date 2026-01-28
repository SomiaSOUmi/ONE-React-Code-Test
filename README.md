# Video Listing (React + TypeScript)

This project implements the requested **video listing UI** that fetches **18 videos from YouTube**, displays **9 cards per page** with **pagination**, and provides **filter controls** (keyword + sort by creation date).

## Why I approached it this way

- **Separation of concerns:** the YouTube API integration is isolated in `src/api/youtube.ts` and the UI is built out of small, focused components (`VideoListing`, `FiltersBar`, `Pagination`, `VideoCard`).
- **Client-side pagination:** the requirement states “fetch 18 videos” and “display 9 video cards with pagination”, so I fetch once and paginate locally. This keeps the UI responsive and avoids repeated API calls.
- **Testability:** `VideoListing` accepts a `fetcher` prop, which makes it easy to test pagination/filter behaviour without making real network requests.
- **Accessible basics:** semantic roles/labels are used for the listing and pagination, and cards are keyboard-focusable links.

## Requirements checklist

- ✅ React & TypeScript
- ✅ Fetch data for **18** videos from YouTube (YouTube Data API v3)
- ✅ Display **9** cards per page with pagination
- ✅ At least **1 filter control** (keyword filter + date sort)
- ✅ Cards link to the YouTube video on click (open in new tab)
- ✅ **2 Jest tests** (pagination + filtering)

## Getting started

### 1) Install dependencies

```bash
npm install
```

### 2) Configure YouTube API key

Copy the example env file and set your API key:

```bash
cp .env .env
```

Set:

- `VITE_YOUTUBE_API_KEY` (required)
- Optionally `VITE_YOUTUBE_PLAYLIST_ID` (recommended for predictable results)
- Or `VITE_YOUTUBE_SEARCH_QUERY` (used when playlist id is not set)

> Note: You must enable “YouTube Data API v3” for the project that owns the key.

### 3) Run the app

```bash
npm run dev
```

### 4) Run tests

```bash
npm test
```

## Project structure

- `src/api/youtube.ts` — fetches videos from YouTube and normalizes to the `Video` model.
- `src/components/VideoListing.tsx` — orchestrates fetching, filtering, sorting, and pagination.
- `src/components/FiltersBar.tsx` — keyword input + date sort dropdown.
- `src/components/Pagination.tsx` — prev/next + page buttons.
- `src/components/VideoCard.tsx` — clickable card linking to YouTube.

## Improvements if I had more time

- **Server-driven filtering:** wire the keyword filter into the YouTube search query instead of filtering locally (while still keeping local pagination).
- **Better error UX:** dedicated empty states, “no results” messaging, and retry button.
- **Loading skeletons:** match the wireframe layout while loading.
- **Caching & request dedupe:** cache the 18-video response and avoid refetching on remount.
- **More filters:** date range (last 7/30 days), channel/playlist selection, etc.
- **E2E tests:** add Playwright/Cypress for a simple happy-path flow.
