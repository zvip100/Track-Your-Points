import YouTube from "react-youtube";
import "../styles/video.css";

const videoId = "I4wi87EVUKc";

function Video() {
  const opts = {
    playerVars: {
      autoplay: 0,
      rel: 0,
      controls: 1,
    },
  };

  return (
    <div className="video-container">
      <YouTube
        videoId={videoId}
        opts={opts}
        className="youtube-player"
        iframeClassName="youtube-iframe"
      />
    </div>
  );
}

export default Video;
