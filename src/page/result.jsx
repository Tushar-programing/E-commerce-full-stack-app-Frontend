import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Checkbox from '@mui/material/Checkbox';
import Slider from '@mui/material/Slider';
import { ResultCard } from '../component';
import conf from "../component/conf/conf"
import Postcard from '../component/postcard';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import { EmptyComp } from '../component';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';


function result() {
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    const navigate = useNavigate();
    const location = useLocation();

    const [products, setProducts] = useState();

    const [open, setOpen] = useState(true)

    const [value, setValue] = useState([0, 10000]);

    console.log(products);

    // Parse query parameters from the URL
    const queryParamsFromURL = new URLSearchParams(location.search);
    const initialQuery = queryParamsFromURL.get('cat') || ' ';
    const initialPage = parseInt(queryParamsFromURL.get('page')) || 1;
    const initialLimit = parseInt(queryParamsFromURL.get('limit')) || 40;
    const initialSortBy = queryParamsFromURL.get('sortBy') || 'title';
    const initialSortType = queryParamsFromURL.get('sortType') || 'asc';
    const initialSearchQuery = queryParamsFromURL.get('searchQuery') || '';

    const [queryParams, setQueryParams] = useState({
        cat: initialQuery,
        page: initialPage,
        limit: initialLimit,
        sortBy: initialSortBy,
        sortType: initialSortType,
        minPrice: value[0],
        maxPrice: value[1],
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

    const handlePageChange = (event, value) => {
        setQueryParams(prevParams => ({
            ...prevParams,
            page: value, // Update the page property correctly
        }));
    };

    const handleSliderChange = (event, newValue) => {
        setValue(newValue);
        console.log("this is new value",newValue);
        setQueryParams(prevParams => ({
            ...prevParams,
            minPrice: newValue[0],
            maxPrice: newValue[1],
        }));
    };

    function valuetext(value) {
        return `${value}`;
    }

    const [opens, setOpens] = useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpens(newOpen);
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


  return (
    <div className='grid grid-cols-12 md:mt-10 mx-0 sm:mx-20 md:mx-5 lg:mx-20 xl:mx-20 2xl:mx-40 gap-5 2xl:gap-8'>
        <div className=' my-2 md:my-0  md:shadow-2xl col-span-12 md:col-span-5 lg:col-span-4 xl:col-span-3 2xl:col-span-3 h-min bg-white'>
            <div className='ml-3 text-lg my-2 md:my-4 text-center'><span className='md:block hidden'>Filter</span><button onClick={(e) => setOpens(true)} className='px-4 py-1 md:hidden block mx-auto'>Filter</button></div>
            <Drawer className="md:hidden block"  open={opens} onClose={toggleDrawer(false)}>
            <form className='' onSubmit={handleSearch}>
                <div className='ml-3 mb-3 text-lg'>Browse Category</div>
                <div className='ms-4 grid grid-cols-1 gap-0'>
                    <div className=' flex items-center'>
                        <Checkbox name='cat' checked={exist("boards")} value="boards" onChange={handleChange} size="small" className='' />
                        <label htmlFor="query">Ardiuno Boards</label>
                    </div>
                    <div className=' flex items-center'>
                        <Checkbox name='cat' checked={exist("decor")} value="decor" onChange={handleChange} size="small" className='' />
                        <label htmlFor="query">Home Decor</label>
                    </div>
                    <div className=' flex items-center'>
                        <Checkbox name='cat' checked={exist("led")} value="led" onChange={handleChange} size="small" className='' />
                        <label htmlFor="query">Led's</label>
                    </div>
                    <div className=' flex items-center'>
                        <Checkbox name='cat' checked={exist("sensors")} value="sensors" onChange={handleChange} size="small" className='' />
                        <label htmlFor="query">Sensors</label>
                    </div>
                    <div className=' flex items-center'>
                        <Checkbox name='cat' checked={exist("motors")} value="motors" onChange={handleChange} size="small" className='' />
                        <label htmlFor="query">Dc motors</label>
                    </div>
                    <div className=' flex items-center'>
                        <Checkbox name='cat' checked={exist("batteries")} value="batteries" onChange={handleChange} size="small" className='' />
                        <label htmlFor="query">Batteries</label>
                    </div>
                    <div className=' flex items-center'>
                        <Checkbox name='cat' checked={exist("drones")} value="drones" onChange={handleChange} size="small" className='' />
                        <label htmlFor="query">Drones</label>
                    </div>
                    <div className=' flex items-center'>
                        <Checkbox name='cat' checked={exist("speakers")} value="speakers" onChange={handleChange} size="small" className='' />
                        <label htmlFor="query">Speakers & buzzers</label>
                    </div>
                    <div className=' flex items-center'>
                        <Checkbox name='cat' checked={exist("cars")} value="cars" onChange={handleChange} size="small" className='' />
                        <label htmlFor="query">Rc cars</label>
                    </div>
                    <div className=' flex items-center'>
                        <Checkbox name='cat' checked={exist("bluthooth")} value="bluthooth" onChange={handleChange} size="small" className='' />
                        <label htmlFor="query">Bluetooth module</label>
                    </div>
                    <div className=' flex items-center'>
                        <Checkbox name='cat' checked={exist("chargers")} value="chargers" onChange={handleChange} size="small" className='' />
                        <label htmlFor="query">Chargers</label>
                    </div>
                    <div className=' flex items-center'>
                        <Checkbox name='cat' checked={exist("capacitors")} value="capacitors" onChange={handleChange} size="small" className='' />
                        <label htmlFor="query">Capacitors</label>
                    </div>
                    <div className=' flex items-center'>
                        <Checkbox name='cat' checked={exist("built")} value="built" onChange={handleChange} size="small" className='' />
                        <label htmlFor="query">Built in Projects</label>
                    </div>
                    <div className=' flex items-center'>
                        <Checkbox name='cat' checked={exist("other")} value="other" onChange={handleChange} size="small" className='' />
                        <label htmlFor="query">Other all</label>
                    </div>
                </div>
                <div className='mx-3 text-lg mt-3 mb-3'>Sort by</div>
                <div className='mx-3'>
                    <select
                        id="sortBy"
                        name="sortBy"
                        value={queryParams.sortBy}
                        onChange={handleChang}
                        className='ms-2 max-w-52 w-full mb-2 border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 '
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
                        className='ms-2 max-w-52 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border px-2 py-1 '
                    >
                        <option className='text-violet-900' value="des">Low to high</option>
                        <option className='text-violet-900' value="asc">High to low</option>
                    </select>
                    <div className='mt-4 mb-2 text-lg'>{queryParams.sortBy.charAt(0).toUpperCase() + queryParams.sortBy.slice(1)} Range</div>
                    <div className='mx-5'>
                        <Slider
                            getAriaLabel={() => 'Temperature range'}
                            value={value}
                            onChange={handleSliderChange}
                            valueLabelDisplay="auto"
                            getAriaValueText={valuetext}
                            min={1}    // Set minimum value to 1
                            max={10000}
                        />
                    </div>
                </div>
                <div>
                    {/* <div className='border mx-2 lg:mx-8  mt-3 flex justify-between'>
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
                    <div className='border mx-2 lg:mx-8  mt-3 flex justify-between mb-10'>
                        <Slider
                            className='w-32'
                            getAriaLabel={() => 'Temperature range'}
                            name='maxPrice'
                            value={queryParams.maxPrice}
                            onChange={handleChang}
                            valueLabelDisplay="auto"
                            min={0}
                            max={10000}
                        //   getAriaValueText={valuetext}
                        />
                        <span className='w-56 ml-4'>Max ₹ {queryParams.maxPrice}</span> 
                    </div> */}
                </div>
            </form>
            </Drawer>
            <form className='md:block hidden' onSubmit={handleSearch}>
                <div className='ml-3 mb-3 text-lg'>Browse Category</div>
                <div className='ms-4 grid grid-cols-1 gap-0'>
                    <div className=' flex items-center'>
                        <Checkbox name='cat' checked={exist("boards")} value="boards" onChange={handleChange} size="small" className='' />
                        <label htmlFor="query">Ardiuno Boards</label>
                    </div>
                    <div className=' flex items-center'>
                        <Checkbox name='cat' checked={exist("decor")} value="decor" onChange={handleChange} size="small" className='' />
                        <label htmlFor="query">Home Decor</label>
                    </div>
                    <div className=' flex items-center'>
                        <Checkbox name='cat' checked={exist("led")} value="led" onChange={handleChange} size="small" className='' />
                        <label htmlFor="query">Led's</label>
                    </div>
                    <div className=' flex items-center'>
                        <Checkbox name='cat' checked={exist("sensors")} value="sensors" onChange={handleChange} size="small" className='' />
                        <label htmlFor="query">Sensors</label>
                    </div>
                    <div className=' flex items-center'>
                        <Checkbox name='cat' checked={exist("motors")} value="motors" onChange={handleChange} size="small" className='' />
                        <label htmlFor="query">Dc motors</label>
                    </div>
                    <div className=' flex items-center'>
                        <Checkbox name='cat' checked={exist("batteries")} value="batteries" onChange={handleChange} size="small" className='' />
                        <label htmlFor="query">Batteries</label>
                    </div>
                    <div className=' flex items-center'>
                        <Checkbox name='cat' checked={exist("drones")} value="drones" onChange={handleChange} size="small" className='' />
                        <label htmlFor="query">Drones</label>
                    </div>
                    <div className=' flex items-center'>
                        <Checkbox name='cat' checked={exist("speakers")} value="speakers" onChange={handleChange} size="small" className='' />
                        <label htmlFor="query">Speakers & buzzers</label>
                    </div>
                    <div className=' flex items-center'>
                        <Checkbox name='cat' checked={exist("cars")} value="cars" onChange={handleChange} size="small" className='' />
                        <label htmlFor="query">Rc cars</label>
                    </div>
                    <div className=' flex items-center'>
                        <Checkbox name='cat' checked={exist("bluthooth")} value="bluthooth" onChange={handleChange} size="small" className='' />
                        <label htmlFor="query">Bluetooth module</label>
                    </div>
                    <div className=' flex items-center'>
                        <Checkbox name='cat' checked={exist("chargers")} value="chargers" onChange={handleChange} size="small" className='' />
                        <label htmlFor="query">Chargers</label>
                    </div>
                    <div className=' flex items-center'>
                        <Checkbox name='cat' checked={exist("capacitors")} value="capacitors" onChange={handleChange} size="small" className='' />
                        <label htmlFor="query">Capacitors</label>
                    </div>
                    <div className=' flex items-center'>
                        <Checkbox name='cat' checked={exist("built")} value="built" onChange={handleChange} size="small" className='' />
                        <label htmlFor="query">Built in Projects</label>
                    </div>
                    <div className=' flex items-center'>
                        <Checkbox name='cat' checked={exist("other")} value="other" onChange={handleChange} size="small" className='' />
                        <label htmlFor="query">Other all</label>
                    </div>
                </div>
                <div className='mx-3 text-lg mt-3 mb-3'>Sort by</div>
                <div className='mx-3'>
                    <select
                        id="sortBy"
                        name="sortBy"
                        value={queryParams.sortBy}
                        onChange={handleChang}
                        className='ms-2 max-w-52 w-full mb-2 border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 '
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
                        className='ms-2 max-w-52 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border px-2 py-1 '
                    >
                        <option className='text-violet-900' value="des">Low to high</option>
                        <option className='text-violet-900' value="asc">High to low</option>
                    </select>
                    <div className='mt-4 mb-2 text-lg'>{queryParams.sortBy.charAt(0).toUpperCase() + queryParams.sortBy.slice(1)} Range</div>
                    <div className='mx-5'>
                        <Slider
                            getAriaLabel={() => 'Temperature range'}
                            value={value}
                            onChange={handleSliderChange}
                            valueLabelDisplay="auto"
                            getAriaValueText={valuetext}
                            min={1}    // Set minimum value to 1
                            max={10000}
                        />
                    </div>
                </div>
                <div>
                    {/* <div className='border mx-2 lg:mx-8  mt-3 flex justify-between'>
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
                    <div className='border mx-2 lg:mx-8  mt-3 flex justify-between mb-10'>
                        <Slider
                            className='w-32'
                            getAriaLabel={() => 'Temperature range'}
                            name='maxPrice'
                            value={queryParams.maxPrice}
                            onChange={handleChang}
                            valueLabelDisplay="auto"
                            min={0}
                            max={10000}
                        //   getAriaValueText={valuetext}
                        />
                        <span className='w-56 ml-4'>Max ₹ {queryParams.maxPrice}</span> 
                    </div> */}
                </div>
            </form>
        </div>
        <div className='col-span-12 md:col-span-7 lg:col-span-8 xl:col-span-9 2xl:col-span-9 mb-16'>
            <div className=' grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5 '>
                {products?.length > 0 ? products?.map((pro) => (
                    <div key={pro._id} >
                        <Postcard className="shadow-xl border border-white" {...pro}/>
                    </div>
                )) : (<EmptyComp size="w-0" line1="No Product Found" line2="No product found with these keywords " />
            )}
            </div>
            {/* <div className='mt-8 flex justify-center'>
                <Stack spacing={2} >
                    <Pagination
                    count={(products.length / 10) }
                    page={queryParams.initialPage} // Current active page
                    onChange={handlePageChange} // Handler for page change
                    />
                </Stack>
            </div> */}
        </div>
        
    </div>
  )
}

export default result
