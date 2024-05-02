import React from 'react';
import { Link } from 'react-router-dom';
import enData from '../../public/languageData/en.json';
import jpData from '../../public/languageData/jp.json';
import { useLanguage } from '../LanguageContext';

const AboutJapanSection = () => {
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
        <section className="bg-[#00315B]">
            <div className="py-8 px-8 text-center container mx-auto text-white">
                {/* Title */}
                <h2 className="text-3xl font-bold mb-8">{data.translation.about.title}</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Introduction */}
                    <div className="text-justify lg:order-1 order-2">
                        <h3 className="text-xl font-semibold mb-4">{data.translation.about.introduction_title}</h3>
                        <p className="text-lg mb-4">{data.translation.about.introduction_content}</p>
                        <p className="text-lg mb-4">{data.translation.about.experience_content}</p>
                        <p className="text-lg mb-4">{data.translation.about.cherry_blossom_content}</p>
                    </div>
                    {/* Images */}
                    <div className="lg:order-2 order-1">
                        <img src={data.translation.about.about_img} alt="Japanese Cherry Blossoms" className="rounded-lg shadow-md xl:h-full lg:h-[90%]" />
                    </div>
                </div>
                {/* Explore More Button */}
                <div className="mt-8 text-left w-max">
                    <Link to="/about-japan" className="bg-blue-500 rounded px-6 py-3 hover:bg-blue-600">{data.translation.about.explore_more_button}</Link>
                </div>
            </div>
        </section>
    );
};

export default AboutJapanSection;