import React, { useState } from 'react'

const Description = ({ campaign }) => {
    const [showMore, setShowMore] = useState(false);
    return (
        <div>
            <div className='bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-6 md:p-8 h-full flex flex-col'>
                <h2 className='text-gray-800 font-bold md:text-2xl text-xl mb-6 pb-4 border-b border-gray-100 flex items-center gap-3'>
                    <span className="bg-primary/10 text-primary p-2 rounded-xl h-10 w-10 flex items-center justify-center">
                       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    </span>
                    <span>Campaign Description</span>
                </h2>
                <div className={`prose max-w-none ${!showMore ? 'max-h-[300px] overflow-hidden relative' : ''}`}>
                    <div
                        className='text-gray-700 leading-relaxed'
                        dangerouslySetInnerHTML={{
                            __html: showMore
                                ? campaign.description
                                : (campaign.description?.slice(0, 500) || '') + (!showMore && campaign.description?.length > 500 ? '...' : '')
                        }}
                    />
                    {!showMore && campaign.description?.length > 500 && (
                        <div className='absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent'></div>
                    )}
                </div>
                {campaign.description?.length > 500 && (
                    <button
                        onClick={() => setShowMore(!showMore)}
                        className='text-primary font-semibold mt-4 hover:underline transition-all flex items-center gap-1'
                    >
                        {showMore ? '▲ Show less' : '▼ Show more'}
                    </button>
                )}
            </div>
        </div>
    )
}

export default Description