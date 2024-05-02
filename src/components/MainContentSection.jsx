import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';
import enData from '../../public/languageData/en.json';
import jpData from '../../public/languageData/jp.json';
import { GoClockFill } from "react-icons/go";
import { IoBriefcase } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import gsap from 'gsap';

const MainContentSection = () => {
    // State and Context
    const { language } = useLanguage();
    const [jobs, setJobs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const jobsPerPage = 9;
    let data;

    // Select language
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

    // Fetch jobs on component mount
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get('/jobs.json');
                setJobs(response.data);
            } catch (error) {
                console.error('Error fetching job listings:', error);
            }
        };

        fetchJobs();
    }, []);

    // Animate title
    useEffect(() => {
        const title = document.getElementById('title');
        const text = title.textContent;
        title.textContent = '';

        const tl = gsap.timeline();
        for (let i = 0; i < text.length; i++) {
            tl.to(title, { textContent: text.substr(0, i + 1), duration: 0.1, ease: 'none' });
        }
    }, []);

    // Handlers
    const handleSearchInputChange = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Filtered jobs
    const filteredJobs = jobs.filter(job => {
        const title = job.title[language] || ''; // Ensure title is defined or default to an empty string
        const company = job.company[language] || ''; // Ensure company is defined or default to an empty string
        const location = job.location[language] || ''; // Ensure location is defined or default to an empty string

        return title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            company.toLowerCase().includes(searchTerm.toLowerCase()) ||
            location.toLowerCase().includes(searchTerm.toLowerCase());
    });

    // Pagination
    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

    // JSX
    return (
        <main className="bg-HeroImage bg-repeat-x">
            <div className="container mx-auto py-8 px-8">
                {/* Title */}
                <h1 id='title' className='md:text-[100px] md:leading-normal text-[60px] leading-[60px] w-fit mx-auto text-center mt-5 font-bold opacity-[0.2] text-white drop-shadow-textShadow'>{data.translation.main_Content.title}</h1>

                {/* Search input */}
                <section className="mb-8 mt-4">
                    <div className="max-w-xl mx-auto">
                        <input
                            type="text"
                            placeholder={data.translation.main_Content.search_placeholder}
                            className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:border-blue-500"
                            value={searchTerm}
                            onChange={handleSearchInputChange}
                        />
                    </div>
                </section>

                {/* Job listings */}
                <section className="mb-8">
                    {filteredJobs.length === 0 && (
                        <div className="text-center text-gray-600">{data.translation.other_data.no_job_found} "{searchTerm}"</div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {currentJobs.map(job => (
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
                </section>

                {/* Pagination */}
                <section className="text-center">
                    <div>
                        {Array.from({ length: Math.ceil(filteredJobs.length / jobsPerPage) }, (_, i) => (
                            <button key={i + 1} onClick={() => handlePageChange(i + 1)} className={`px-3 py-1 mx-1 ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}>{i + 1}</button>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
};

export default MainContentSection;