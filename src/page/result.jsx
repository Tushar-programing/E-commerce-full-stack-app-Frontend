import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Checkbox from '@mui/material/Checkbox';
import Slider from '@mui/material/Slider';
import { Postcard1, ResultCard } from '../component';
import conf from "../component/conf/conf"
import Postcard from '../component/postcard';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import { EmptyComp } from '../component';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';

import { CiFilter } from "react-icons/ci";
import { BsGrid3X3Gap } from "react-icons/bs";
import { TfiLayoutGrid3 } from "react-icons/tfi";
import { RxCross2 } from "react-icons/rx";


function result() {
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    const navigate = useNavigate();
    const location = useLocation();

    const [deskCol, setDeskCol] = useState(4)
    const [showFilter, setShowFilter] = useState(true)

    const [products, setProducts] = useState();

    const [open, setOpen] = useState(true)

    const [value, setValue] = useState([0, 10000]);

    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    

    // Parse query parameters from the URL
    const queryParamsFromURL = new URLSearchParams(location.search);
    const initialQuery = queryParamsFromURL.get('cat') || ' ';
    const initialPage = parseInt(queryParamsFromURL.get('page')) || 1;
    const initialLimit = parseInt(queryParamsFromURL.get('limit')) || 40;
    const initialSortBy = queryParamsFromURL.get('sortBy') || 'price';
    const initialSortType = queryParamsFromURL.get('sortType') || 'asc';
    const initialColor = queryParamsFromURL.get('color') || 'all';
    const initialMaterial = queryParamsFromURL.get('material') || 'all';
    const initialSearchQuery = queryParamsFromURL.get('searchQuery') || '';

    const [queryParams, setQueryParams] = useState({
        cat: initialQuery,
        page: initialPage,
        limit: initialLimit,
        sortBy: initialSortBy,
        sortType: initialSortType,
        minPrice: value[0],
        maxPrice: value[1],
        color: initialColor,
        material: initialMaterial,
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
        // 
        setQueryParams((prevParams) => ({
            ...prevParams,
            cat: updatedCat
        }));
    }


    const fetchProducts = async () => {
        try {
            const response = await axios.post(`${conf.apiUrl}/product/products`, {}, { params: queryParams }, {
                withCredentials: true
            });
            if (response) {
                setProducts(response.data.data);
                setOpen(false)
            }
        } catch (error) {
            
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
                [name]: prevParams.cat + "," + value,
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

    const [isOpen, setIsOpen] = useState({
        hsnCode: false,
        productCategory: false,
        material: false,
        color: false,
        subCategory: false,
    });

    const toggleDropdown = (section) => {
        setIsOpen({ ...isOpen, [section]: !isOpen[section] });
    };

    const [selectedColor, setSelectedColor] = useState()

    // setQueryParams((prevParams) => ({
    //     ...prevParams,
    //     cat: updatedCat
    // }));

    const handleColorChange = (value) => {
        
        setSelectedColor(value);
        setQueryParams((prevParams) => ({
            ...prevParams,
            color: value
        }));
    }

    const handleMaterialChange = (e) => {
        const value = e.target.value;
        setQueryParams((prevParams) => ({
            ...prevParams,
            material: value
        }));
    }



    const toggledrawer = (anchor, open) => (event) => {
        if (
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }
        setState({ ...state, [anchor]: open });
    };

    const handleShowFilter = () => {
        setShowFilter(!showFilter)
        setState((prevState) => ({
            ...prevState,
            bottom: true,
        }));
    }

    const handleCloseFilter = () => {
        setShowFilter(false)
        setState((prevState) => ({
            ...prevState,
            bottom: false,
        }));
    }

    // useEffect(() => {
    //     setShowFilter(state?.bottom)
    // }, [state])

    const colors = [
        { name: 'Red', code: '#ff0000' },
        { name: 'Green', code: '#00ff00' },
        { name: 'Blue', code: '#0000ff' },
        { name: 'Black', code: '#000000' },
        { name: 'White', code: '#ffffff' },
        { name: 'Yellow', code: '#ffff00' },
        { name: 'Silver', code: '#c0c0c0' },
        { name: 'Gold', code: '#ffd700' }
    ];


    if (open) {
        return <div className='w-full h-[800px]'>
            <Backdrop
                className='w-full h-[800px]'
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            ><div className='mr-5'>Please wait while searching the product</div>
                <CircularProgress color="inherit" />
            </Backdrop></div>
    }


    return (
        <div className=' mx-auto max-w-[1536px] border-t-2 pb-20'>
            <div className='md:flex justify-between py-2 sm:py-1 md:py-3 lg:py-5 mb-1 md:mb-2 px-2 md:px-0 md:relative sticky top-0 bg-white z-20'>
                <div className='text-base md:text-lg lg:text-xl my-auto ml-8 text-center md:text-start md:mb-0 mb-1'>{products.length} Result Found for '{queryParams.searchQuery.trim() === "" ? "Categories" : queryParams.searchQuery}'</div>
                <div className='flex justify-between items-center gap-4'>
                    <button className='flex justify-evenly items-center text-sm sm:text-base md:text-lg px-3 py-2 bg-gray-900 text-gray-100 rounded-md' onClick={handleShowFilter}><CiFilter className='text-lg md:text-2xl me-1' /><span className='md:block hidden'>{showFilter ? "Hide" : "Show"}</span><span className='md:hidden'>Show&nbsp;</span> Filter</button>
                    <select
                        id="sortType"
                        name="sortType"
                        value={queryParams.sortType}
                        onChange={handleChang}
                        className='border rounded-md outline-none text-sm md:text-base px-1 md:px-3 py-2 md:py-3 md:me-5 2xl:me-0 bg-white'
                    >
                        <option className='text-black' value="asc">Low to high</option>
                        <option className='text-black' value="des">High to low</option>
                    </select>
                </div>
            </div>
            <div className='grid grid-cols-12 mt-0 border-t'>
                <div className={` lg:col-span-3 col-span-4 overflow-y-auto ${!showFilter ? "hidden" : "md:block hidden"} md:sticky top-0 z-10`}>
                    <div className="xl:w-60 lg:w-56 w-60 mx-auto mt-10 ">
                        <div className="border-b pb-2">
                            <div
                                onClick={() => toggleDropdown('hsnCode')}
                                className="flex justify-between items-center cursor-pointer py-2"
                            >
                                <span>Price Range</span>
                                <span>{isOpen.hsnCode ? '-' : '+'}</span>
                            </div>
                            {isOpen.hsnCode && (
                                <div className="pl-4 mt-2 transition-all duration-500 ease-in-out mb-2">
                                    <Slider
                                        getAriaLabel={() => 'Temperature range'}
                                        value={value}
                                        size="small"
                                        onChange={handleSliderChange}
                                        valueLabelDisplay="auto"
                                        getAriaValueText={valuetext}
                                        min={1}    // Set minimum value to 1
                                        max={5000}
                                        sx={{ color: 'black', '&.Mui-checked': { color: '#242424', }, }}
                                    />
                                    <div className='text-gray-500'>Price: Rs.{value[0]} - Rs.{value[1]}</div>
                                </div>
                            )}
                        </div>

                        {/* Product Category */}
                        <div className="border-b pb-2">
                            <div
                                onClick={() => toggleDropdown('productCategory')}
                                className="flex justify-between items-center cursor-pointer py-2"
                            >
                                <span>Product Category</span>
                                <span>{isOpen.productCategory ? '-' : '+'}</span>
                            </div>
                            {isOpen.productCategory && (
                                <div className="pl-4 mt-2 transition-all duration-500 ease-in-out">
                                    <div className=' flex items-center text-base'>
                                        <Checkbox name='cat' checked={exist("diwali")} value="diwali" onChange={handleChange} size="small" className='' sx={{ color: 'black', '&.Mui-checked': { color: '#242424', }, }} />
                                        <label htmlFor="query">Diwali Light</label>
                                    </div>
                                    <div className=' flex items-center text-sm'>
                                        <Checkbox name='cat' checked={exist("chandelier")} value="chandelier" onChange={handleChange} size="small" className='' sx={{ color: 'black', '&.Mui-checked': { color: '#242424', }, }} />
                                        <label htmlFor="query">Chandeliers</label>
                                    </div>
                                    <div className=' flex items-center text-sm'>
                                        <Checkbox name='cat' checked={exist("ceiling")} value="ceiling" onChange={handleChange} size="small" className='' sx={{ color: 'black', '&.Mui-checked': { color: '#242424', }, }} />
                                        <label htmlFor="query">Ceiling Fixtures</label>
                                    </div>
                                    <div className=' flex items-center text-sm'>
                                        <Checkbox name='cat' checked={exist("lamp")} value="lamp" onChange={handleChange} size="small" className='' sx={{ color: 'black', '&.Mui-checked': { color: '#242424', }, }} />
                                        <label htmlFor="query">Lamps & Lighting</label>
                                    </div>
                                    <div className=' flex items-center text-sm'>
                                        <Checkbox name='cat' checked={exist("outdoor")} value="outdoor" onChange={handleChange} size="small" className='' sx={{ color: 'black', '&.Mui-checked': { color: '#242424', }, }} />
                                        <label htmlFor="query">Outdoor Lighting</label>
                                    </div>
                                    <div className=' flex items-center text-sm'>
                                        <Checkbox name='cat' checked={exist("wall")} value="wall" onChange={handleChange} size="small" className='' sx={{ color: 'black', '&.Mui-checked': { color: '#242424', }, }} />
                                        <label htmlFor="query">Wall Lamps</label>
                                    </div>
                                    <div className=' flex items-center text-sm'>
                                        <Checkbox name='cat' checked={exist("garden")} value="garden" onChange={handleChange} size="small" className='' sx={{ color: 'black', '&.Mui-checked': { color: '#242424', }, }} />
                                        <label htmlFor="query">Garden Lighting</label>
                                    </div>
                                    <div className=' flex items-center text-sm'>
                                        <Checkbox name='cat' checked={exist("floor")} value="floor" onChange={handleChange} size="small" className='' sx={{ color: 'black', '&.Mui-checked': { color: '#242424', }, }} />
                                        <label htmlFor="query">Floor Lamp</label>
                                    </div>
                                    <div className=' flex items-center text-sm'>
                                        <Checkbox name='cat' checked={exist("mood")} value="mood" onChange={handleChange} size="small" className='' sx={{ color: 'black', '&.Mui-checked': { color: '#242424', }, }} />
                                        <label htmlFor="query">Mood Lighting</label>
                                    </div>
                                    <div className=' flex items-center text-sm'>
                                        <Checkbox name='cat' checked={exist("patio")} value="patio" onChange={handleChange} size="small" className='' sx={{ color: 'black', '&.Mui-checked': { color: '#242424', }, }} />
                                        <label htmlFor="query">Patio Lights</label>
                                    </div>
                                    <div className=' flex items-center text-sm'>
                                        <Checkbox name='cat' checked={exist("other")} value="other" onChange={handleChange} size="small" className='' sx={{ color: 'black', '&.Mui-checked': { color: '#242424', }, }} />
                                        <label htmlFor="query">Other all</label>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Color */}
                        <div className="border-b pb-2">
                            <div
                                onClick={() => toggleDropdown('color')}
                                className="flex justify-between items-center cursor-pointer py-2"
                            >
                                <span>Color</span>
                                <span>{isOpen.color ? '-' : '+'}</span>
                            </div>
                            {isOpen.color && (
                                <div className="pl-4 mt-2 transition-all duration-500 ease-in-out mb-5">
                                    <div className='flex flex-wrap gap-2'>
                                        <button onClick={() => handleColorChange("all")} className={`bg-white shadow-md w-6 h-6 ${selectedColor === "all" && "border-b-2 border-gray-700"}`}>All</button>
                                        {colors.map((color) => (
                                            <button
                                                key={color.name}
                                                onClick={() => handleColorChange(color.code)}
                                                style={{ backgroundColor: color.code, color: '#fff' }}
                                                className={`w-6 h-6 rounded-full ${selectedColor === color.code && 'border-2'} ${color.code === ("#0000ff" || "#000000") ? "border-gray-600" : "border-gray-600"} shadow-md`}
                                            >
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Material */}
                        <div className="border-b pb-2">
                            <div
                                onClick={() => toggleDropdown('material')}
                                className="flex justify-between items-center cursor-pointer py-2"
                            >
                                <span>Material</span>
                                <span>{isOpen.material ? '-' : '+'}</span>
                            </div>
                            {isOpen.material && (
                                <div className="pl-4 mt-2 transition-all duration-500 ease-in-out mb-2">
                                    <select onChange={handleMaterialChange} value={queryParams.material} className="border p-1 w-full rounded-md outline-none">
                                        <option value="all">All</option>
                                        <option value="plastic">Plastic</option>
                                        <option value="copper">Copper</option>
                                        <option value="aluminium">Aluminium</option>
                                        <option value="pvc">PVC</option>
                                        <option value="glass">Glass</option>
                                    </select>
                                </div>
                            )}
                        </div>

                        {/* Sub Category */}
                        <div className="border-b pb-2">
                            <div
                                onClick={() => toggleDropdown('subCategory')}
                                className="flex justify-between items-center cursor-pointer py-2"
                            >
                                <span>Occation Lights</span>
                                <span>{isOpen.subCategory ? '-' : '+'}</span>
                            </div>
                            {isOpen.subCategory && (
                                <div className="pl-4 mt-2 transition-all duration-500 ease-in-out">
                                    <div className=' flex items-center'>
                                        <Checkbox name='cat' checked={exist("diwali")} value="diwali" onChange={handleChange} size="small" className='' />
                                        <label htmlFor="query">Diwali Lights</label>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className={` ${showFilter ? "lg:col-span-9 md:col-span-8 col-span-12" : "col-span-12"} `}>
                    <div className=' flex flex-col md:flex-row justify-between ps-1 md:ps-4 pe-3 md:pe-7 py-1 md:mb-5 mb-1 items-start pt-2 md:sticky top-0 z-10'>
                        <div className='flex flex-wrap '>
                            {category.length > 1 && category?.map((ct) =>
                                <button key={ct} onClick={e => del(ct)} className='flex justify-center items-center bg-gray-100 mx-2 px-1 mb-2'>
                                    <div className='text-sm  md:text-base mx-1 md:mx-2 px-1 md:px-2 py-[2px] md:py-1'>{ct}</div>
                                    <div ><RxCross2 /></div>
                                </button>
                            )}
                        </div>
                        <div className='flex text-xl items-center ms-auto md:ms-8 md:mt-0 mt-1'><button onClick={e => setDeskCol(3)}><BsGrid3X3Gap className='me-2 w-6 h-6' /></button><button onClick={e => setDeskCol(4)}><TfiLayoutGrid3 /></button></div>
                    </div>
                    <div className={`grid ${deskCol === 3 ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"} md:gap-6 gap-3 px-5 pt-2`}>
                        {products.map((pro) => (
                            <Postcard1 key={pro?._id} {...pro} />
                        ))}
                    </div>
                </div>
            </div>


            <div className='md:hidden'>
                {['left', 'right', 'top', 'bottom'].map((anchor) => (
                    <React.Fragment key={anchor}>
                        <Drawer
                            anchor={anchor}
                            open={state[anchor]}
                            onClose={toggledrawer(anchor, false)}
                            className='md:hidden'
                        >
                            <button onClick={handleCloseFilter} className='mt-3 me-3 ms-auto '><RxCross2 className='w-7 h-7' /></button>
                            <div className=" w-60 mx-auto mt-10 h-screen">
                                <div className="border-b pb-2">
                                    <div
                                        onClick={() => toggleDropdown('hsnCode')}
                                        className="flex justify-between items-center cursor-pointer py-2"
                                    >
                                        <span>Price Range</span>
                                        <span>{isOpen.hsnCode ? '-' : '+'}</span>
                                    </div>
                                    {isOpen.hsnCode && (
                                        <div className="pl-4 mt-2 transition-all duration-500 ease-in-out mb-2">
                                            <Slider
                                                getAriaLabel={() => 'Temperature range'}
                                                value={value}
                                                size="small"
                                                onChange={handleSliderChange}
                                                valueLabelDisplay="auto"
                                                getAriaValueText={valuetext}
                                                min={1}    // Set minimum value to 1
                                                max={5000}
                                                sx={{ color: 'black', '&.Mui-checked': { color: '#242424', }, }}
                                            />
                                            <div className='text-gray-500'>Price: Rs.{value[0]} - Rs.{value[1]}</div>
                                        </div>
                                    )}
                                </div>
                                
                                {/* Product Category */}
                                <div className="border-b pb-2">
                                    <div
                                        onClick={() => toggleDropdown('productCategory')}
                                        className="flex justify-between items-center cursor-pointer py-2"
                                    >
                                        <span>Product Category</span>
                                        <span>{isOpen.productCategory ? '-' : '+'}</span>
                                    </div>
                                    {isOpen.productCategory && (
                                        <div className="pl-4 mt-2 transition-all duration-500 ease-in-out">
                                            <div className=' flex items-center text-base'>
                                                <Checkbox name='cat' checked={exist("diwali")} value="diwali" onChange={handleChange} size="small" className='' sx={{ color: 'black', '&.Mui-checked': { color: '#242424', }, }} />
                                                <label htmlFor="query">Diwali Light</label>
                                            </div>
                                            <div className=' flex items-center text-sm'>
                                                <Checkbox name='cat' checked={exist("chandelier")} value="chandelier" onChange={handleChange} size="small" className='' sx={{ color: 'black', '&.Mui-checked': { color: '#242424', }, }} />
                                                <label htmlFor="query">Chandeliers</label>
                                            </div>
                                            <div className=' flex items-center text-sm'>
                                                <Checkbox name='cat' checked={exist("ceiling")} value="ceiling" onChange={handleChange} size="small" className='' sx={{ color: 'black', '&.Mui-checked': { color: '#242424', }, }} />
                                                <label htmlFor="query">Ceiling Fixtures</label>
                                            </div>
                                            <div className=' flex items-center text-sm'>
                                                <Checkbox name='cat' checked={exist("lamp")} value="lamp" onChange={handleChange} size="small" className='' sx={{ color: 'black', '&.Mui-checked': { color: '#242424', }, }} />
                                                <label htmlFor="query">Lamps & Lighting</label>
                                            </div>
                                            <div className=' flex items-center text-sm'>
                                                <Checkbox name='cat' checked={exist("outdoor")} value="outdoor" onChange={handleChange} size="small" className='' sx={{ color: 'black', '&.Mui-checked': { color: '#242424', }, }} />
                                                <label htmlFor="query">Outdoor Lighting</label>
                                            </div>
                                            <div className=' flex items-center text-sm'>
                                                <Checkbox name='cat' checked={exist("wall")} value="wall" onChange={handleChange} size="small" className='' sx={{ color: 'black', '&.Mui-checked': { color: '#242424', }, }} />
                                                <label htmlFor="query">Wall Lamps</label>
                                            </div>
                                            <div className=' flex items-center text-sm'>
                                                <Checkbox name='cat' checked={exist("garden")} value="garden" onChange={handleChange} size="small" className='' sx={{ color: 'black', '&.Mui-checked': { color: '#242424', }, }} />
                                                <label htmlFor="query">Garden Lighting</label>
                                            </div>
                                            <div className=' flex items-center text-sm'>
                                                <Checkbox name='cat' checked={exist("floor")} value="floor" onChange={handleChange} size="small" className='' sx={{ color: 'black', '&.Mui-checked': { color: '#242424', }, }} />
                                                <label htmlFor="query">Floor Lamp</label>
                                            </div>
                                            <div className=' flex items-center text-sm'>
                                                <Checkbox name='cat' checked={exist("mood")} value="mood" onChange={handleChange} size="small" className='' sx={{ color: 'black', '&.Mui-checked': { color: '#242424', }, }} />
                                                <label htmlFor="query">Mood Lighting</label>
                                            </div>
                                            <div className=' flex items-center text-sm'>
                                                <Checkbox name='cat' checked={exist("patio")} value="patio" onChange={handleChange} size="small" className='' sx={{ color: 'black', '&.Mui-checked': { color: '#242424', }, }} />
                                                <label htmlFor="query">Patio Lights</label>
                                            </div>
                                            <div className=' flex items-center text-sm'>
                                                <Checkbox name='cat' checked={exist("other")} value="other" onChange={handleChange} size="small" className='' sx={{ color: 'black', '&.Mui-checked': { color: '#242424', }, }} />
                                                <label htmlFor="query">Other all</label>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                
                                {/* Color */}
                                <div className="border-b pb-2">
                                    <div
                                        onClick={() => toggleDropdown('color')}
                                        className="flex justify-between items-center cursor-pointer py-2"
                                    >
                                        <span>Color</span>
                                        <span>{isOpen.color ? '-' : '+'}</span>
                                    </div>
                                    {isOpen.color && (
                                        <div className="pl-4 mt-2 transition-all duration-500 ease-in-out mb-5">
                                            <div className='flex flex-wrap gap-2'>
                                                <button onClick={() => handleColorChange("all")} className={`bg-white shadow-md w-6 h-6 ${selectedColor === "all" && "border-b-2 border-gray-700"}`}>All</button>
                                                {colors.map((color) => (
                                                    <button
                                                        key={color.name}
                                                        onClick={() => handleColorChange(color.code)}
                                                        style={{ backgroundColor: color.code, color: '#fff' }}
                                                        className={`w-6 h-6 rounded-full ${selectedColor === color.code && 'border-2'} ${color.code === ("#0000ff" || "#000000") ? "border-gray-600" : "border-gray-600"} shadow-md`}
                                                    >
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                
                                {/* Material */}
                                <div className="border-b pb-2">
                                    <div
                                        onClick={() => toggleDropdown('material')}
                                        className="flex justify-between items-center cursor-pointer py-2"
                                    >
                                        <span>Material</span>
                                        <span>{isOpen.material ? '-' : '+'}</span>
                                    </div>
                                    {isOpen.material && (
                                        <div className="pl-4 mt-2 transition-all duration-500 ease-in-out mb-2">
                                            <select onChange={handleMaterialChange} value={queryParams.material} className="border p-1 w-full rounded-md outline-none">
                                                <option value="all">All</option>
                                                <option value="plastic">Plastic</option>
                                                <option value="copper">Copper</option>
                                                <option value="aluminium">Aluminium</option>
                                                <option value="pvc">PVC</option>
                                                <option value="glass">Glass</option>
                                            </select>
                                        </div>
                                    )}
                                </div>
                                
                                {/* Sub Category */}
                                <div className="border-b pb-2">
                                    <div
                                        onClick={() => toggleDropdown('subCategory')}
                                        className="flex justify-between items-center cursor-pointer py-2"
                                    >
                                        <span>Occation Lights</span>
                                        <span>{isOpen.subCategory ? '-' : '+'}</span>
                                    </div>
                                    {isOpen.subCategory && (
                                        <div className="pl-4 mt-2 transition-all duration-500 ease-in-out">
                                            <div className=' flex items-center'>
                                                <Checkbox name='cat' checked={exist("diwali")} value="diwali" onChange={handleChange} size="small" className='' />
                                                <label htmlFor="query">Diwali Lights</label>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Drawer>
                    </React.Fragment>
                ))}
            </div>
        </div>
    )
}

export default result
