import React, { useState } from 'react'

const Description = ({ campaign }) => {
    const [showMore, setShowMore] = useState(false);
    return (
        <div>
            <div className='bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100'>
                <h2 className='text-primary font-bold md:text-2xl text-xl mb-4 flex items-center gap-2'>
                    <span>📋</span>
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
