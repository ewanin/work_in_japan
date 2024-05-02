import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';
import enData from '../../public/languageData/en.json';
import jpData from '../../public/languageData/jp.json';
import { GoClockFill } from "react-icons/go";
import { IoBriefcase } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import AboutJapanSection from '../components/AboutJapanSection';
import gsap from 'gsap';

const JobListings = () => {
    // State and language context
    const { language } = useLanguage();
    const [jobs, setJobs] = useState([]);
    const [jobListings, setJobListings] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [filters, setFilters] = useState({
        jobTitle: '',
        companyName: '',
        location: ''
    });
    let data;

    // Language switch
    switch (language) {
        case 'english':
            data = enData;
            break;
        case 'japanese':
            data = jpData;
            break;
        default:
            data = enData;
    }

    // Fetching jobs
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get('/jobs.json');
                setJobs(response.data);
                setJobListings(response.data);
            } catch (error) {
                console.error('Error fetching job listings:', error);
            }
        };

        fetchJobs();
    }, []);

    // Animation effect
    useEffect(() => {
        const title = document.getElementById('title');
        const text = title.textContent;
        title.textContent = '';

        const tl = gsap.timeline();
        for (let i = 0; i < text.length; i++) {
            tl.to(title, { textContent: text.substr(0, i + 1), duration: 0.1, ease: 'none' });
        }
    }, []);

    // Handle filter change
    const handleFilterChange = (filterType, value) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [filterType]: value
        }));
    };

    // Get unique values from an array
    const getUniqueValues = (array) => {
        return Array.from(new Set(array));
    };

    // Filter job listings based on filters and search term
    useEffect(() => {
        const filtered = jobListings.filter(job => {
            return (
                (filters.jobTitle === '' || job.title[language].toLowerCase().includes(filters.jobTitle.toLowerCase())) &&
                (filters.companyName === '' || job.company[language].toLowerCase().includes(filters.companyName.toLowerCase())) &&
                (filters.location === '' || job.location[language].toLowerCase().includes(filters.location.toLowerCase()))
            );
        });
        setFilteredJobs(filtered);
    }, [filters, jobListings, language]);

    // JSX
    return (
        <div className="left-0 right-0 bg-HeroImage bg-repeat-x relative top-[50px] z-10">
            <div className='container mx-auto py-8 px-8 mb-8'>
                {/* Title */}
                <h1 id='title' className='md:text-[100px] md:leading-normal text-[60px] leading-[60px] w-fit mx-auto text-center mt-5 font-bold opacity-[0.2] text-white drop-shadow-textShadow'>{data.translation.main_Content.title}</h1>
                {/* Filters */}
                <div className="flex flex-wrap gap-2 my-4">
                    {/* Job Title Filter */}
                    <select
                        value={filters.jobTitle}
                        onChange={e => handleFilterChange('jobTitle', e.target.value)}
                        className="border border-gray-300 rounded px-4 py-3 focus:outline-none focus:border-blue-500 md:w-fit [width:-webkit-fill-available]"
                    >
                        <option value="">{data.translation.other_data.job_title}</option>
                        {/* Populate options dynamically */}
                        {getUniqueValues(jobs.map(job => job.title[language])).map(title => (
                            <option key={title} value={title}>
                                {title}
                            </option>
                        ))}
                    </select>
                    {/* Company Name Filter */}
                    <select
                        value={filters.companyName}
                        onChange={e => handleFilterChange('companyName', e.target.value)}
                        className="border border-gray-300 rounded px-4 py-3 focus:outline-none focus:border-blue-500 md:w-fit [width:-webkit-fill-available]"
                    >
                        <option value="">{data.translation.other_data.company_name}</option>
                        {/* Populate options dynamically */}
                        {getUniqueValues(jobs.map(job => job.company[language])).map(company => (
                            <option key={company} value={company}>
                                {company}
                            </option>
                        ))}
                    </select>
                    {/* Location Filter */}
                    <select
                        value={filters.location}
                        onChange={e => handleFilterChange('location', e.target.value)}
                        className="border border-gray-300 rounded px-4 py-3 focus:outline-none focus:border-blue-500 md:w-fit [width:-webkit-fill-available]"
                    >
                        <option value="">{data.translation.other_data.location}</option>
                        {/* Populate options dynamically */}
                        {getUniqueValues(jobs.map(job => job.location[language])).map(location => (
                            <option key={location} value={location}>
                                {location}
                            </option>
                        ))}
                    </select>
                </div>
                {/* Display message if no results */}
                {filteredJobs.length === 0 && (
                    <p className="text-center text-gray-600">{data.translation.other_data.no_job_found}</p>
                )}
                {/* Display job listings */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredJobs.map(job => (
                        <div key={job.id} className="bg-white rounded-lg shadow-md p-4 hover:scale-[102%] hover:border hover:bg-[#04ade60d]">
                            <h2 className="text-lg font-semibold text-gray-800 mb-2">{job.title[language]}</h2>
                            <p className='text-sm text-gray-600 mb-2 flex items-center gap-2'><GoClockFill />{job.jobType[language]}</p>
                            <p className="text-sm text-gray-600 mb-2 flex items-center gap-2"><IoBriefcase />{job.company[language]}</p>
                            <p className="text-sm text-gray-600 flex items-center gap-2"><FaLocationDot />{job.location[language]}</p>
                            <Link to={`/jobs/${encodeURIComponent(job.title[language])}`}>
                                <button className="bg-[#04ADE6] text-white rounded px-4 py-2 mt-4 hover:bg-blue-600">{job.view_details[language]}</button>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
            {/* About Japan Section */}
            <AboutJapanSection />
        </div>
    );
};

export default JobListings;