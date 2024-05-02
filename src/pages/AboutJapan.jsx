import React from 'react';
import enData from '../../public/languageData/en.json';
import jpData from '../../public/languageData/jp.json';
import { useLanguage } from '../LanguageContext';

const AboutJapan = () => {
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
        <section className="bg-HeroImage bg-repeat-x py-8 px-8 relative top-[50px] z-10">
            <div className="container mx-auto text-justify">
                {/* About Japan Title */}
                <h2 className="text-3xl font-bold text-gray-800 mb-4">{data.translation.about_japan.about_title_1}</h2>
                {/* Introduction */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Image */}
                    <div>
                        <img src={data.translation.about_japan.about_img} alt="Traditional Japanese Architecture" className="rounded-lg shadow-md xl:h-full lg:h-[90%]" />
                    </div>
                    {/* Description */}
                    <div>
                        <p className="text-lg text-gray-600 mb-4">{data.translation.about_japan.about_subtitle_11}</p>
                        <p className="text-lg text-gray-600 mb-4">{data.translation.about_japan.about_subtitle_12}</p>
                        <p className="text-lg text-gray-600">{data.translation.about_japan.about_subtitle_13}</p>
                    </div>
                </div>
                {/* Visa Requirements and Cultural Nuances */}
                <div className="md:flex gap-8">
                    {/* Visa Requirements */}
                    <div className="mt-8">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">{data.translation.about_japan.about_title_2}</h3>
                        <p className="text-lg text-gray-600">{data.translation.about_japan.about_subtitle_21}</p>
                    </div>
                    {/* Cultural Nuances */}
                    <div className="mt-8">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">{data.translation.about_japan.about_title_3}</h3>
                        <p className="text-lg text-gray-600">{data.translation.about_japan.about_subtitle_31}</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutJapan;