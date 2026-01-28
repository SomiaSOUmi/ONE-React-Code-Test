import type { Video } from "../types";

type Props = {
  video: Video;
};

export default function VideoCard({ video }: Props) {
  return (
    <a
      className="card"
      href={video.url}
      target="_blank"
      rel="noreferrer"
      role="listitem"
      aria-label={`Open video: ${video.title}`}
    >
      <div className="card__thumbWrap">
        {video.thumbnailUrl ? (
          <img className="card__thumb" src={video.thumbnailUrl} alt="" loading="lazy" />
        ) : (
          <div className="card__thumbFallback">Video thumbnail</div>
        )}
      </div>

      <div className="card__body">
        <h3 className="card__title">{video.title || "Untitled video"}</h3>
        <p className="card__desc">{video.description || "No description available."}</p>
      </div>
    </a>
  );
}
