import { ArrowLeft, Music as MusicIcon, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";

interface Track {
  title: string;
  artist: string;
  duration: string;
  url: string;
  category: string;
  cover: string;
}

const tracks: Track[] = [
  {
    title: "Relaxing Sleep Music + Insomnia",
    artist: "The Soul of Wind",
    duration: "3:05:48",
    url: "https://www.youtube.com/watch?v=V1RPi2MYptM",
    category: "Nature",
    cover: "https://synctuition.com/wp-content/uploads/2021/08/Webp.net-compress-image-35.jpg"
  },
  {
    title: "Krishna Flute Music",
    artist: "Nova Gujrati",
    duration: "1:00:05",
    url: "https://youtu.be/5jca-sWgemI?si=RjDtkBSqJpB0KSk2",
    category: "Nature",
    cover: "https://i.pinimg.com/736x/79/b2/a0/79b2a04e3d2159d20f833cba0878fe2a.jpg"
  },
  {
    title: "Beautiful Relaxing Music with Piano, Guitar & Bird Sounds",
    artist: "Peder B. Helland",
    duration: "3:03:39",
    url: "https://youtu.be/hlWiI4xVXKY?si=8qVFNl39TfvKgQHw",
    category: "Meditation",
    cover: "https://www.nwf.org/-/media/NEW-WEBSITE/Shared-Folder/Magazines/2024/Spring/GALBATROSS-Eastern-bluebirds-SPRING24-960x630.jpg"
  },
  {
    title: "Relaxing Music for Focus, Sleep & Relaxation",
    artist: "Peder B. Helland",
    duration: "58:41",
    url: "https://youtu.be/lCOF9LN_Zxs?si=tcIRFFmTy03pDiMP",
    category: "Meditation",
    cover: "wallpaperflare.com_wallpaper.jpg"
  },
  {
    title: "Beautiful Meditation Music",
    artist: "Peder B. Helland",
    duration: "37:54",
    url: "https://youtu.be/zLH3iZKvhKg?si=fkSSPkhwu-r_tFeV",
    category: "Meditation",
    cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTukUe2b_4EuOEN8B1SfFlhDm1F_NP_N8huFg&s"
  }
];

const Music = () => {
  const navigate = useNavigate();
  const [currentTrack, setCurrentTrack] = useState<Track>(tracks[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [duration, setDuration] = useState(0);
  const playerRef = useRef<ReactPlayer | null>(null);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleTrackChange = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return hrs > 0
      ? `${hrs}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
      : `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-700 flex items-center justify-between">
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center text-gray-400 hover:text-white transition"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back
            </button>
            <h1 className="text-2xl font-bold flex items-center">
              <MusicIcon className="h-6 w-6 mr-2" />
              Relaxing Music
            </h1>
          </div>

          <div className="p-6">
            <div className="grid gap-4">
              {tracks.map((track) => (
                <div
                  key={track.title}
                  className={`p-4 rounded-lg flex items-center space-x-4 transition cursor-pointer ${currentTrack?.title === track.title
                      ? "bg-indigo-600"
                      : "bg-gray-700 hover:bg-gray-600"
                    }`}
                  onClick={() => handleTrackChange(track)}
                >
                  <img
                    src={track.cover}
                    alt={track.title}
                    className="w-12 h-12 rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{track.title}</h3>
                    <p className="text-sm text-gray-300">{track.artist}</p>
                  </div>
                  <span className="text-sm text-gray-300">{track.duration}</span>
                </div>
              ))}
            </div>
          </div>

          {currentTrack && (
            <div className="bg-gray-900 p-6 flex flex-col items-center border-t border-gray-700">
              <div className="w-full">
                <ReactPlayer
                  ref={playerRef}
                  url={currentTrack.url}
                  playing={isPlaying}
                  width="100%"
                  height="346px"
                  muted={isMuted}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onProgress={({ playedSeconds }) => setPlayedSeconds(playedSeconds)}
                  onDuration={(duration) => setDuration(duration)}
                  config={{ youtube: { playerVars: { controls: 0 } } }}                  
                />
              </div>

              <div className="flex items-center w-full mt-4">
                <button
                  onClick={handlePlayPause}
                  className="p-3 rounded-full bg-gray-700 hover:bg-gray-600 transition"
                >
                  {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                </button>

                <div className="flex-1 mx-4">
                  <input
                    type="range"
                    min={0}
                    max={duration}
                    value={playedSeconds}
                    onChange={(e) => playerRef.current?.seekTo(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
                <span className="text-sm text-gray-300">{formatTime(playedSeconds)} / {formatTime(duration)}</span>

                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-3 m-2 rounded-full bg-gray-700 hover:bg-gray-600 transition"
                >
                  {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Music;
