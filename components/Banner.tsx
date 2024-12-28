import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getData } from '@/features/GetData/getDataSlice';
import axios from "@/api/axios"
import request from '@/api/request';

const Banner = () => {
    const { data } = useSelector((state: any) => state.getDataSlice)
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(request.fetchNetflixOriginals);
            const randomIndex = Math.floor(Math.random() * response.data.results.length);
            const randomMovie = response.data.results[randomIndex];
            dispatch(getData(randomMovie));
            return response;
        };
        fetchData();
    },[dispatch]);

    const truncate = (str:string, n:any) =>{
        return str?.length > n ? str.substr(0, n-1) + '...' : str;
    }
    return (
        <header
            className='banner'
            style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original/${data?.backdrop_path})`,
                backgroundSize: 'cover',
                backgroundPosition: 'top',
                backgroundRepeat :"none",
                width: '100%'
            }}
        >
            <div className='banner_content'>
                <h1 className='banner_title'>{data?.title  || data?.name}</h1>
                <div className='banner_buttons flex gap-2'>
                    <button type='button' className='w-32 bg-[#e6e6e6] rounded text-black h-10 font-bold hover:bg-slate-100'>Play Trailer</button>
                    <button type='button' className=' rounded banner_button'>More Info</button>

                </div>
                <h1 className='banner_description'>
                    {truncate(data?.overview, 200)}</h1>
            </div>
            <div  className='banner_fadeBottom'></div>
        </header>
    );
};

export default Banner;
