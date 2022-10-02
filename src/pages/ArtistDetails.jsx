import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components"
import { setActiveSong, playPause } from '../redux/features/playerSlice';
import { useGetSongArtistDetailsQuery} from '../redux/services/shazamCore';

const ArtistDetails = () => {

    const { id:artistId } = useParams();
    const { isPlaying, activeSong } = useSelector((state) => state.player);
    const { data:artistData, isFetching: isFetchingArtistDetails,error } = useGetSongArtistDetailsQuery(artistId)
    if (isFetchingArtistDetails) return <Loader title={'Loading Details...'} />
    if (error) return<Error/>
    return (
        <div className='flex flex-col'>
            <DetailsHeader artistId={artistId} artistData={artistData} />
            <RelatedSongs
                data={Object.values(artistData?.songs)}
                isPlaying={isPlaying}
                activeSong={activeSong}
                artistId={artistId}
            />
        </div>
    )
};

export default ArtistDetails;
