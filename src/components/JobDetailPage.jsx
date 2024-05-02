import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { GoDotFill } from 'react-icons/go';
import { useLanguage } from '../LanguageContext';
import enData from '../../public/languageData/en.json';
import jpData from '../../public/languageData/jp.json';
import { IoBriefcase } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";

const JobDetailPage = () => {
    // Hooks and context
    const { title } = useParams();
    const { language } = useLanguage();
    const [job, setJob] = useState(null);
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

    // Fetch job details
    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                const response = await axios.get(`/jobs.json`);
                const jobData = response.data.find(job => job.title[language] === title);
                setJob(jobData);
            } catch (error) {
                console.error('Error fetching job details:', error);
            }
        };
        fetchJobDetails();
    }, [title]);

    // JSX
    if (!job) {
        return <div>Loading...</div>;
    }

    return (
        <div className="bg-HeroImage bg-repeat-x ">
            <div className="container mx-auto py-8 px-8 relative top-[50px] z-10 text-justify">
                {/* Job Title, Company, Location */}
                <h1 className="text-3xl font-bold mb-4">{job.title[language]}</h1>
                <h2 className="text-lg text-gray-600 font-semibold mb-2 flex items-center gap-2"><IoBriefcase />{job.company[language]}</h2>
                <p className="text-gray-600 font-semibold mb-8 flex items-center gap-2"><FaLocationDot />{job.location[language]}</p>

                {/* Additional Details */}
                <h2 className="text-xl font-bold mb-2">{data.translation.other_data.full_job_description}</h2>
                <p className="text-gray-800">{job.description[language]}</p>
                <p className="text-gray-800 mb-4">{job.fullDescription[language]}</p>

                {/* Other Details */}
                <div className='flex gap-8'>
                    <div>
                        {/* Responsibilities */}
                        <h2 className="text-xl font-bold mb-2">{data.translation.other_data.role_responsibilities}</h2>
                        <div className="list-disc list-inside text-gray-800 mb-4">
                            {job.roleResponsibilities[language].map((responsibility, index) => (
                                <div key={index} className='flex md:items-center items-start gap-2'>
                                    <div className=' mt-[5px]'><GoDotFill /> </div>
                                    <div>{responsibility}</div>
                                </div>
                            ))}
                        </div>

                        {/* Qualifications */}
                        <h2 className="text-xl font-bold mb-2">{data.translation.other_data.qualifications}</h2>
                        <div className="list-disc list-inside text-gray-800 mb-4">
                            {job.qualifications[language].map((qualification, index) => (
                                <div key={index} className='flex md:items-center items-start gap-2'>
                                    <div className=' mt-[5px]'><GoDotFill /> </div>
                                    <div>{qualification}</div>
                                </div>
                            ))}
                        </div>

                        {/* Benefits */}
                        <h2 className="text-xl font-bold mb-2">{data.translation.other_data.benefits}</h2>
                        <div className="list-disc list-inside text-gray-800 mb-4">
                            {job.benefits[language].map((benefit, index) => (
                                <div key={index} className='flex md:items-center items-start gap-2'>
                                    <div className=' mt-[5px]'><GoDotFill /> </div>
                                    <div>{benefit}</div>
                                </div>
                            ))}
                        </div>

                        {/* Additional Job Details */}
                        <div className="flex flex-wrap md:gap-4 gap-2">
                            <div className='flex items-center gap-2'>
                                <h2 className=" text-lg font-bold">{data.translation.other_data.job_type}</h2>
                                <p className="text-gray-800">{job.jobType[language]}</p>
                            </div>

                            <div className="flex md:items-center items-start gap-2">
                                <h2 className=" text-lg font-bold">{data.translation.other_data.pay}</h2>
                                <p className="text-gray-800">{job.pay[language]}</p>
                            </div>

                            <div className="flex items-center gap-2">
                                <h2 className=" text-lg font-bold">{data.translation.other_data.schedule}</h2>
                                <p className='text-gray-800'>{job.schedule[language]}</p>
                            </div>
                        </div>
                    </div>

                    {/* Side Image */}
                    <div className='lg:block hidden mx-auto'>
                        <img src="/jobDetail.jpg" alt="Not Available" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDetailPage;