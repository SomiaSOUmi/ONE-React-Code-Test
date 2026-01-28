import VideoListing from "./components/VideoListing";
import ThemeToggle from "./components/ThemeToggle";
import { fetchYouTubeVideos } from "./api/youtube";

export default function App() {
  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">Red Bull Playlist</h1>
        <ThemeToggle />
      </header>

      <main className="app__main">
        <VideoListing fetcher={fetchYouTubeVideos} pageSize={9} />
      </main>

    </div>
  );
}
