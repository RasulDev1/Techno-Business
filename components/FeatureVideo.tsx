// Видео функции. На телефоне видео сначала уменьшено: нажатие на обложку раскрывает его, «Свернуть ↑» возвращает
type Props = { label: string; shortLabel: string; title: string; src: string; poster: string };

export default function FeatureVideo({ label, shortLabel, title, src, poster }: Props) {
  return (
    <article className="sheet feature">
      <span className="card-label"><span className="t-full">{label}</span><span className="t-short">{shortLabel}</span></span>
      <div className="feature-media">
        <video controls preload="metadata" playsInline poster={poster} aria-label={`${title}: видео`}>
          <source src={src} type="video/mp4" />
        </video>
        <button type="button" className="feature-cover" aria-label={`Раскрыть видео: ${title}`}>
          <span><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg></span>
        </button>
      </div>
      <h2>{title}</h2>
      <button type="button" className="feature-close">Свернуть ↑</button>
    </article>
  );
}
