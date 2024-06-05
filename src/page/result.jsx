import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Checkbox from '@mui/material/Checkbox';
import Slider from '@mui/material/Slider';
import { ResultCard } from '../component';
import conf from "../component/conf/conf"

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import { EmptyComp } from '../component';


function result() {
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    const navigate = useNavigate();
    const location = useLocation();

    const [products, setProducts] = useState();

    const [open, setOpen] = useState(true)

    const [priceRange, setPriceRange] = useState({ min: 0, max: 5000 });

    console.log(products);

    // Parse query parameters from the URL
    const queryParamsFromURL = new URLSearchParams(location.search);
    const initialQuery = queryParamsFromURL.get('cat') || ' ';
    const initialPage = parseInt(queryParamsFromURL.get('page')) || 1;
    const initialLimit = parseInt(queryParamsFromURL.get('limit')) || 10;
    const initialSortBy = queryParamsFromURL.get('sortBy') || 'title';
    const initialSortType = queryParamsFromURL.get('sortType') || 'asc';
    const initialSearchQuery = queryParamsFromURL.get('searchQuery') || '';

    const [queryParams, setQueryParams] = useState({
        cat: initialQuery,
        page: initialPage,
        limit: initialLimit,
        sortBy: initialSortBy,
        sortType: initialSortType,
        minPrice: priceRange.min,
        maxPrice: priceRange.max,
        searchQuery: initialSearchQuery,
    });

    const category = queryParams.cat.split(',')

    const exist = (n) => {
        const exist = category.includes(n);
        return exist;
    }

    const del = (n) => {
        const filteredCategories = category.filter(category => category !== n);

        const updatedCat = filteredCategories.join(',');
        // console.log(updatedCat);
        setQueryParams((prevParams) => ({
            ...prevParams,
            cat: updatedCat
        }));
    }


    const fetchProducts = async () => {
        
        try {
            const response = await axios.post(`${conf.apiUrl}/product/products`, {}, {params: queryParams}, {
                withCredentials: true
            });
            if (response) {
                setProducts(response.data.data);
                setOpen(false)
            }
            
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        // Update the URL with the current query parameters
        const searchParams = new URLSearchParams(queryParams).toString();
        navigate(`${location.pathname}?${searchParams}`);
        
        // Fetch products based on the current query parameters
        fetchProducts();
    }, [queryParams]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (exist(value)) {
            del(value)
        } else {
            setQueryParams((prevParams) => ({
                ...prevParams,
                [name]: prevParams.cat+","+value,
            }));
            setQueryParams((prevParams) => ({
                ...prevParams,
                searchQuery: " ",
            }));
        }
    };

    const handleChang = (e) => {
        const { name, value } = e.target;
        setQueryParams.searchQuery = ""
        setQueryParams((prevParams) => ({
            ...prevParams,
            [name]: value
        }));
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchProducts();
    };

    

    if ( open ) {
        return <div className='w-full h-[800px]'><Backdrop
                  className='w-full h-[800px]'
                  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                  open={open}
                  ><div className='mr-5'>Please wait while searching the product</div>
                  <CircularProgress color="inherit" />
                </Backdrop></div>
      }
    
      // console.log(wishs?.length);
      if (products?.length <= 0 ) {
        return  <div >
                  <EmptyComp size="w-0" line1="No Product Found" line2="No product found with these keywords " />
                </div>
      }


  return (
    <div className='bg-gray-100 '>
        <div className='border border-white '></div>
        <div className='mx-16 border border-gray-100 h-auto bg-gray-100'>
            <div className='flex justify-between bg-gray-100 mt-10'>
                <div className='  w-[380px] bg-gradient-to-b from-white via-white via-white to-gray-100 h-screen'>
                <form onSubmit={handleSearch}>
                    <div className='ml-3 text-xl text-gray-800 mt-5 text-center'>Filter</div>
                    
                    <div className='ml-3 text-xl mb-3 text-violet-900 mt-3'>Browse Category</div>
                    <div className='flex '>
                        <div className='w-1/2 mb-2'>
                          <Checkbox name='cat' checked={exist("led")} value="led" onChange={handleChange} size="small" className='h-9' />
                          <label htmlFor="query">Led's</label>
                        </div >
                    </div>
                    <div className='flex justify-evenly'>
                        <div className='w-1/2'>
                          <Checkbox name='cat' checked={exist("sensors")} value="sensors" onChange={handleChange} size="small" className='h-9' />
                          <label htmlFor="query">Sensors</label>
                        </div >
                        <div className='w-1/2'>
                          <Checkbox name='cat' checked={exist("boards")} value="boards" onChange={handleChange} size="small" className='h-9' />
                          <label htmlFor="query">Boards</label>
                        </div>
                    </div>
                    <div className='flex justify-evenly'>
                        <div className='w-1/2'>
                          <Checkbox name='cat' checked={exist("batteries")} value="batteries" onChange={handleChange} size="small" className='h-9' />
                          <label htmlFor="query">Batteries</label>
                        </div>
                        <div className='w-1/2'>
                          <Checkbox name='cat' checked={exist("motors")} value="motors" onChange={handleChange} size="small" className='h-9' />
                          <label htmlFor="query">Dc motors</label>
                        </div>
                    </div>
                    <div className='flex justify-evenly'>
                        <div className='w-1/2'>
                          <Checkbox name='cat' checked={exist("drones")} value="drones" onChange={handleChange} size="small" className='h-9' />
                          <label htmlFor="query">Drones</label>
                        </div>
                        <div className='w-1/2'>
                          <Checkbox name='cat' checked={exist("speakers")} value="speakers" onChange={handleChange} size="small" className='h-9' />
                          <label htmlFor="query">Speakers & buzzers</label>
                        </div>
                    </div>
                    <div className='flex justify-evenly'>
                        <div className='w-1/2'>
                          <Checkbox name='cat' checked={exist("cars")} value="cars" onChange={handleChange} size="small" className='h-9' />
                          <label htmlFor="query">Rc cars</label>
                        </div>
                        <div className='w-1/2'>
                          <Checkbox name='cat' checked={exist("bluthooth")} value="bluthooth" onChange={handleChange} size="small" className='h-9' />
                          <label htmlFor="query">Bluetooth module</label>
                        </div>
                    </div>
                    <div className='flex justify-evenly'>
                        <div className='w-1/2'>
                          <Checkbox name='cat' checked={exist("chargers")} value="chargers" onChange={handleChange} size="small" className='h-9' />
                          <label htmlFor="query">Chargers</label>
                        </div>
                        <div className='w-1/2'>
                          <Checkbox name='cat' checked={exist("capacitors")} value="capacitors" onChange={handleChange} size="small" className='h-9' />
                          <label htmlFor="query">Capacitors</label>
                        </div>
                    </div>
                    <div className='flex '>
                        <div className='w-1/2 mb-2'>
                          <Checkbox name='cat' checked={exist("other")} value="other" onChange={handleChange} size="small" className='h-9' />
                          <label htmlFor="query">Other all</label>
                        </div >
                    </div>

                    <div className='ml-3 text-xl mb-3 text-violet-900 mt-5'>Sort by</div>
                    <div  className=' my-5'>
                            <select
                                id="sortBy"
                                name="sortBy"
                                value={queryParams.sortBy}
                                onChange={handleChang}
                                className='w-36 mx-3 border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 '
                            >
                                <option className='text-violet-900' value="price">price</option>
                                <option className='text-violet-900' value="width">width</option>
                                <option className='text-violet-900' value="height">height</option>
                                <option className='text-violet-900' value="weight">weight</option>
                            </select>
                            <select
                                id="sortType"
                                name="sortType"
                                value={queryParams.sortType}
                                onChange={handleChang}
                                className='ml-4 w-36 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border px-2 py-1 '
                            >
                                <option className='text-violet-900' value="des">Low to high</option>
                                <option className='text-violet-900' value="asc">High to low</option>
                            </select>
                    </div>
                    
                    <div>
                        <h2 className='mx-3 text-xl my-5 mt-6 text-violet-900'>Price Range</h2>
                        <div className='w-80 mx-10 mt-3 flex justify-between'>
                            <Slider
                                className='w-32'
                              getAriaLabel={() => 'Temperature range'}
                              name='minPrice'
                              value={queryParams.minPrice}
                              onChange={handleChang}
                              valueLabelDisplay="auto"
                              min={0}
                              max={1000}
                            />
                            <span className='w-56 ml-4'>Min ₹ {queryParams.minPrice}</span> 
                        </div>
                        <div className='w-80 mx-10 mt-3 flex justify-between mb-10'>
                            <Slider
                            className='w-32'
                              getAriaLabel={() => 'Temperature range'}
                              name='maxPrice'
                              value={queryParams.maxPrice}
                              onChange={handleChang}
                              valueLabelDisplay="auto"
                              min={0}
                              max={5000}
                            //   getAriaValueText={valuetext}
                            />
                            <span className='w-56 ml-4'>Max ₹ {queryParams.maxPrice}</span> 
                        </div>
                    </div>
                </form>
                </div>
                <div className='border h-auto w-full ml-2 '>
                    {products?.length > 0 ? products?.map((pro) => (
                        <div key={pro._id}>
                            <ResultCard {...pro}/>
                        </div>
                    )) : (<div className='text-2xl text-red-600 text-center mt-72'>No result data Found for this search or Filter</div>)}
                </div>
            </div>
        </div>
    </div>
  )
}

export default result
