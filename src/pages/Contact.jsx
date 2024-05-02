import React from 'react';
import enData from '../../public/languageData/en.json';
import jpData from '../../public/languageData/jp.json';
import { useLanguage } from '../LanguageContext';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";

const Contact = () => {
    // Language context
    const { language } = useLanguage();
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

    // JSX
    return (
        <section className="bg-HeroImage bg-repeat-x py-8 px-8 absolute top-[50px] z-10 [width:-webkit-fill-available;]">
            <div className="container mx-auto">
                {/* Contact Title */}
                <h2 className="text-3xl font-bold text-gray-800 mb-4">{data.translation.contact.title}</h2>
                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                    {/* Address */}
                    <div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">{data.translation.contact.office_title}</h3>
                        <p className="text-lg text-gray-600 mb-4">{data.translation.contact.address}</p>
                        <p className="text-lg text-gray-600 mb-4">{data.translation.contact.phone}</p>
                        <p className="text-lg text-gray-600 mb-4">{data.translation.contact.email}</p>
                        {/* Social Icons */}
                        <div className="flex items-center space-x-4 mt-8 mb-4 text-gray-800">
                            <FaFacebookF size={24} className='' />
                            <FaXTwitter size={24} />
                            <FaInstagram size={24} />
                            <FaLinkedinIn size={24} />
                            <FaYoutube size={24} />
                        </div>
                    </div>
                    {/* Contact Form */}
                    <div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">{data.translation.contact.message_title}</h3>
                        <form>
                            <div className="flex flex-wrap justify-between items-center gap-2">
                                <div className='lg:w-[49%] w-full'>
                                    <label htmlFor="name" className="block text-lg font-medium text-gray-700">{data.translation.contact.message_name}</label>
                                    <input required type="text" id="name" name="name" className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500" />
                                </div>
                                <div className=' lg:w-[49%] w-full'>
                                    <label htmlFor="email" className="block text-lg font-medium text-gray-700">{data.translation.contact.message_email}</label>
                                    <input required type="email" id="email" name="email" className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500" />
                                </div>
                            </div>
                            <div className="mt-4">
                                <label htmlFor="message" className="block text-lg font-medium text-gray-700">{data.translation.contact.message}</label>
                                <textarea required id="message" name="message" rows="3" className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"></textarea>
                            </div>
                            <div className="mt-4">
                                <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600">{data.translation.contact.message_send}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;