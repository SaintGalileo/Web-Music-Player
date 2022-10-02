import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key':  'de52cb6bafmsh174b14e8ee2ddf1p18a6cajsn69a1a9d84a44',
      'X-RapidAPI-Host': 'shazam-core.p.rapidapi.com'
    }
  };
  
  fetch('https://shazam-core.p.rapidapi.com/v1/charts/world', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));

export const shazamCoreApi = createApi({
    reducerPath:"shazamCoreApi",
    baseQuery:fetchBaseQuery({
        baseUrl:"https://shazam-core.p.rapidapi.com/v1/",
        prepareHeaders:(headers)=>{
            headers.set("X-RapidAPI-Key",'de52cb6bafmsh174b14e8ee2ddf1p18a6cajsn69a1a9d84a44')
            return headers
        },
    }),
    endpoints:(builder)=>({
        getTopCharts:builder.query({query:()=>"/charts/world"}),
        getSongsBySearch:builder.query({query:(searchTerm)=>`/search/multi?search_type=SONGS_ARTISTS&query=${searchTerm}`}),
        getSongByGenre:builder.query({query:(genre)=>`/charts/genre-world?genre_code=${genre}`}),
        getSongDetails:builder.query({query:(songid)=>`/tracks/details?track_id=${songid}`}),
        getSongRelated:builder.query({query:({songid})=>`/tracks/related?track_id=${songid}`}),
        getSongArtistDetails:builder.query({query:(artistId)=>`/artists/details?artist_id=${artistId}`}),
        getSongsByCountry:builder.query({query:(countryCode)=>`/charts/country?country_code=${countryCode}`}),

    }),
})

export const {
    useGetTopChartsQuery,
    useGetSongDetailsQuery,
    useGetSongRelatedQuery,
    useGetSongArtistDetailsQuery,
    useGetSongsByCountryQuery,
    useGetSongByGenreQuery,
    useGetSongsBySearchQuery
}=shazamCoreApi