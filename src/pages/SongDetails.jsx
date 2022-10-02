import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components"
import { setActiveSong, playPause } from '../redux/features/playerSlice';
import { useGetSongDetailsQuery, useGetSongRelatedQuery } from '../redux/services/shazamCore';

const SongDetails = () => {
    const dispatch = useDispatch()
    const handlePauseClick = () => {
        dispatch(playPause(false))
    }
    const handlePlayClick = (song,i) => {
        dispatch(setActiveSong({ song, i,data }));
        dispatch(playPause(true))

    }
    const { isPlaying, activeSong } = useSelector((state) => state.player);
    
    const { songid } = useParams();
    const { data, isFetching: isFetchingRelatedSongs,error } = useGetSongRelatedQuery({songid})
    const { data: songData, isFetching: isFetchingSongDetails } = useGetSongDetailsQuery(songid)
    if (isFetchingRelatedSongs || isFetchingSongDetails) return <Loader title={'Searching for amazing stuffs...'} />
    if (error) return<Error/>
    return (
        <div className='flex flex-col'>
            <DetailsHeader artistId="" songData={songData} />
            <div className='mb-10'>
                <h2 className='text-white text-3xl font-bold'>Lryics:</h2>
                <div className='mt-5'>
                    {songData?.sections[1].type === "LYRICS" ? songData?.sections[1].text.map((line, i) => (
                        <p className='text-gray-400  text-base my-1'>{line}</p>
                    )) : (
                        <p className='text-gray-400 text-base'>ooop, No lyrics found</p>
                    )}
                </div>
            </div>
            <RelatedSongs
                data={data}
                handlePauseClick={handlePauseClick}
                handlePlayClick={handlePlayClick}
                isPlaying={isPlaying}
                activeSong={activeSong}
            />
        </div>
    )
};

export default SongDetails;
