# Video Listing (React + TypeScript)

This project implements **video listing UI** that fetches **videos from YouTube**, displays **9 cards per page** with **pagination**, and provides **filter controls** (keyword + sort by creation date + Alphabetic Order).

## Why I approached it this way

- **Separation of concerns:** the YouTube API integration is isolated in `src/api/youtube.ts` and the UI is built out of small, focused components (`VideoListing`, `FiltersBar`, `Pagination`, `VideoCard`).
- **Client-side pagination:** “display 9 video cards with pagination”, so I fetch once and paginate locally. This keeps the UI responsive and avoids repeated API calls.
- **Testability:** `VideoListing` accepts a `fetcher` prop, which makes it easy to test pagination/filter behaviour without making real network requests.
- **Accessible basics:** semantic roles/labels are used for the listing and pagination, and cards are keyboard-focusable links.
- **Light and Dark Themes:** defaults to light theme but user has the option to dark theme.

## Requirements checklist

- ✅ React & TypeScript
- ✅ Fetch data videos from YouTube (YouTube Data API v3)
- ✅ Display **9** cards per page with pagination
- ✅ At least **1 filter control** (keyword filter + date sort + Alphabetic sort)
- ✅ Cards link to the YouTube video on click (open in new tab)
- ✅ **2 Jest tests** (pagination + filtering)

## Getting started

### 1) Install dependencies

```bash
npm install
```

### 2) Run the app

```bash
npm run dev
```

### 3) Run tests

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

- **Make API key more secure:** instead of just having it in the frontend env file
- **Server-driven filtering:** wire the keyword filter into the YouTube search query instead of filtering locally (while still keeping local pagination).
- **Better error UX:** dedicated empty states, “no results” messaging, and retry button.
- **Caching & request dedupe:** cache the response and avoid refetching on remount.
- **More filters:** date range (last 7/30 days), channel/playlist selection, etc.
- **E2E tests:** 
