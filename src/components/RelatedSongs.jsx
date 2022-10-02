import SongBar from "./SongBar"

const RelatedSongs = ({ isPlaying, activeSong, handlePauseClick, handlePlayClick, data, artistId,song}) => (
  <div className="flex-col flex">
    <h1 className="font-bold text-3xl text-white">Related Songs</h1>
    <div className="mt-6 w-full flex flex-col">
      {data?.map((song, i) => (
        <SongBar
          key={`${song.key}-${artistId}`}
          song={song}
          i={i}
          isPlaying={isPlaying}
          activeSong={activeSong}
          artistId={artistId}
          handlePauseClick={handlePauseClick}
          handlePlayClick={handlePlayClick}
        />
      ))}
    </div>
  </div>
);

export default RelatedSongs;
