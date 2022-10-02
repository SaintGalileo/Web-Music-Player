import { Loader, Error, SongCard } from "../components";
import { genres } from "../assets/constants"
import { useGetSongByGenreQuery } from "../redux/services/shazamCore"
import { useDispatch, useSelector } from "react-redux";
import {selectGenreListId } from "../redux/features/playerSlice";

const Discover = () => {
    const dispatch = useDispatch();
    const { activeSong, isPlaying,genreListId } = useSelector((state) => state.player)
    const { data, isFetching, error } = useGetSongByGenreQuery(genreListId ||"POP")

    const genreTitle = genres.find(({value})=>value===genreListId)?.title
    if (isFetching) return <Loader title={"Looking for Amazement"} />
    if (error) return <Error />
    return (
        <div className="flex flex-col ">
            <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
                <h2 className="font-bold text-3xl text-white text-left">Explore {genreTitle}</h2>
                <select
                    onChange={(e) => dispatch(selectGenreListId(e.target.value))}
                    value={genreListId || "pop"}
                    className="bg-black text-gray-400 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5"
                >
                    {genres.map((genre) => <option key={genre.value}>{genre.value}</option>)}
                </select>
            </div>
            <div className="flex flex-wrap sm:justify-start justify-center gap-8">
                {data.map((song, i) => (
                    <SongCard
                        data={data}
                        isPlaying={isPlaying}
                        activeSong={activeSong}
                        key={song.key}
                        song={song}
                        i={i}
                    />
                ))}
            </div>
        </div>
    )
}

export default Discover;
