// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import Carousel from './Carousel';
// import { Col, Row } from 'antd';
// import Payment from './Payment';

// const CampaignViewer = () => {
//     const [campaign, setCampaign] = useState({});
//     const [images, setImages] = useState([]);
//     const [showMore, setShowMore] = useState(false);
//     const { id } = useParams()

//     const fetchCampaign = async () => {
//         try {
//             const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/campaign/get/${id}`, {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem('authToken')}`
//                 }
//             })
//             setCampaign(res.data.campaign)
//             setImages(res.data.campaign.image)
//         } catch (error) {
//             console.error(error)
//         }
//     }

//     useEffect(() => {
//         fetchCampaign()
//     }, [id])

//     // Calculate progress percentage
//     const progressPercentage = campaign.goalAmount
//         ? Math.min(Math.round((campaign.raisedAmount / campaign.goalAmount) * 100), 100)
//         : 0;

//     // Calculate days remaining
//     const getDaysRemaining = () => {
//         if (!campaign.endDate) return null;
//         const endDate = new Date(campaign.endDate);
//         const today = new Date();
//         const diffTime = endDate - today;
//         const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//         return diffDays > 0 ? diffDays : 0;
//     };

//     const daysRemaining = getDaysRemaining();

//     // Format currency
//     const formatCurrency = (amount) => {
//         return new Intl.NumberFormat('en-US', {
//             style: 'currency',
//             currency: 'USD',
//             minimumFractionDigits: 0,
//             maximumFractionDigits: 0,
//         }).format(amount || 0);
//     };

//     // Get category display info
//     const getCategoryInfo = (category) => {
//         const categories = {
//             education: { label: 'Education', color: 'bg-blue-500', icon: '📚' },
//             health: { label: 'Health', color: 'bg-green-500', icon: '🏥' },
//             disaster: { label: 'Disaster Relief', color: 'bg-red-500', icon: '🆘' },
//             others: { label: 'Other', color: 'bg-purple-500', icon: '💡' }
//         };
//         return categories[category] || categories.others;
//     };

//     const categoryInfo = getCategoryInfo(campaign.category);

//     // Get progress bar color based on percentage
//     const getProgressColor = () => {
//         if (progressPercentage >= 100) return 'bg-success';
//         if (progressPercentage >= 75) return 'bg-primary';
//         if (progressPercentage >= 50) return 'bg-blue-500';
//         if (progressPercentage >= 25) return 'bg-yellow-500';
//         return 'bg-orange-500';
//     };

//     return (
//         <div className='mt-20 pb-10'>
//             {/* Header Section */}
//             <div className='text-center mb-8 px-4'>
//                 <h1 className='text-primary font-bold text-4xl md:text-5xl mb-3'>{campaign.title}</h1>
//                 {campaign.category && (
//                     <div className='flex justify-center items-center gap-2 mb-2'>
//                         <span className={`${categoryInfo.color} text-white px-4 py-1.5 rounded-full text-sm font-semibold inline-flex items-center gap-2`}>
//                             <span>{categoryInfo.icon}</span>
//                             <span>{categoryInfo.label}</span>
//                         </span>
//                         {campaign.status === 'active' && (
//                             <span className='bg-success text-white px-4 py-1.5 rounded-full text-sm font-semibold'>
//                                 ✓ Active
//                             </span>
//                         )}
//                     </div>
//                 )}
//                 {campaign.createdAt && (
//                     <p className='text-gray-500 text-sm'>
//                         Started on {new Date(campaign.createdAt).toLocaleDateString('en-US', {
//                             year: 'numeric',
//                             month: 'long',
//                             day: 'numeric'
//                         })}
//                     </p>
//                 )}
//             </div>

//             <div className='px-3 max-w-7xl mx-auto'>
//                 <Row gutter={[24, 24]}>
//                     {/* Left Column - Images & Stats */}
//                     <Col xl={12} lg={12} md={24} sm={24} xs={24}>
//                         {/* Carousel */}
//                         <div className='mb-6 rounded-2xl overflow-hidden shadow-lg'>
//                             <Carousel images={images} />
//                         </div>

//                         {/* Campaign Statistics Cards */}
//                         <div className='space-y-4'>
//                             {/* Progress Card */}
//                             <div className='bg-white rounded-2xl shadow-lg p-6 border border-gray-100'>
//                                 <h3 className='text-xl font-bold text-gray-800 mb-4'>Fundraising Progress</h3>

//                                 {/* Amount Stats */}
//                                 <div className='grid grid-cols-2 gap-4 mb-4'>
//                                     <div className='bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-4'>
//                                         <p className='text-sm text-gray-600 mb-1'>Raised</p>
//                                         <p className='text-2xl font-bold text-primary'>{formatCurrency(campaign.raisedAmount)}</p>
//                                     </div>
//                                     <div className='bg-gradient-to-br from-blue-500/10 to-blue-500/5 rounded-xl p-4'>
//                                         <p className='text-sm text-gray-600 mb-1'>Goal</p>
//                                         <p className='text-2xl font-bold text-blue-600'>{formatCurrency(campaign.goalAmount)}</p>
//                                     </div>
//                                 </div>

//                                 {/* Progress Bar */}
//                                 <div className='mb-3'>
//                                     <div className='flex justify-between items-center mb-2'>
//                                         <span className='text-sm font-semibold text-gray-700'>Progress</span>
//                                         <span className='text-lg font-bold text-primary'>{progressPercentage}%</span>
//                                     </div>
//                                     <div className='bg-gray-200 h-4 rounded-full overflow-hidden shadow-inner'>
//                                         <div
//                                             className={`${getProgressColor()} h-full rounded-full transition-all duration-500 ease-out shadow-md`}
//                                             style={{ width: `${progressPercentage}%` }}
//                                         >
//                                             <div className='h-full w-full bg-gradient-to-r from-transparent to-white/30'></div>
//                                         </div>
//                                     </div>
//                                 </div>

//                                 {/* Remaining Amount */}
//                                 {campaign.goalAmount > campaign.raisedAmount && (
//                                     <div className='bg-orange-50 border border-orange-200 rounded-lg p-3 mt-3'>
//                                         <p className='text-sm text-orange-800'>
//                                             <span className='font-semibold'>{formatCurrency(campaign.goalAmount - campaign.raisedAmount)}</span> still needed to reach the goal
//                                         </p>
//                                     </div>
//                                 )}

//                                 {progressPercentage >= 100 && (
//                                     <div className='bg-success/10 border border-success/30 rounded-lg p-3 mt-3'>
//                                         <p className='text-sm text-success font-semibold'>
//                                             🎉 Goal Achieved! Thank you for your support!
//                                         </p>
//                                     </div>
//                                 )}
//                             </div>

//                             {/* Timeline Card */}
//                             <div className='bg-white rounded-2xl shadow-lg p-6 border border-gray-100'>
//                                 <h3 className='text-xl font-bold text-gray-800 mb-4'>Campaign Timeline</h3>

//                                 <div className='space-y-3'>
//                                     {campaign.createdAt && (
//                                         <div className='flex items-start gap-3'>
//                                             <div className='bg-primary/10 rounded-full p-2 mt-1'>
//                                                 <span className='text-lg'>🚀</span>
//                                             </div>
//                                             <div>
//                                                 <p className='text-sm font-semibold text-gray-700'>Campaign Started</p>
//                                                 <p className='text-sm text-gray-500'>
//                                                     {new Date(campaign.createdAt).toLocaleDateString('en-US', {
//                                                         year: 'numeric',
//                                                         month: 'long',
//                                                         day: 'numeric'
//                                                     })}
//                                                 </p>
//                                             </div>
//                                         </div>
//                                     )}

//                                     {campaign.endDate && (
//                                         <div className='flex items-start gap-3'>
//                                             <div className='bg-red-100 rounded-full p-2 mt-1'>
//                                                 <span className='text-lg'>🎯</span>
//                                             </div>
//                                             <div>
//                                                 <p className='text-sm font-semibold text-gray-700'>Campaign Ends</p>
//                                                 <p className='text-sm text-gray-500'>
//                                                     {new Date(campaign.endDate).toLocaleDateString('en-US', {
//                                                         year: 'numeric',
//                                                         month: 'long',
//                                                         day: 'numeric'
//                                                     })}
//                                                 </p>
//                                             </div>
//                                         </div>
//                                     )}

//                                     {daysRemaining !== null && (
//                                         <div className={`${daysRemaining > 7 ? 'bg-green-50 border-green-200' : daysRemaining > 0 ? 'bg-orange-50 border-orange-200' : 'bg-red-50 border-red-200'} border rounded-lg p-3 mt-3`}>
//                                             <p className={`text-sm font-semibold ${daysRemaining > 7 ? 'text-green-800' : daysRemaining > 0 ? 'text-orange-800' : 'text-red-800'}`}>
//                                                 {daysRemaining > 0
//                                                     ? `⏰ ${daysRemaining} day${daysRemaining !== 1 ? 's' : ''} remaining`
//                                                     : '⏰ Campaign has ended'
//                                                 }
//                                             </p>
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>

//                             {/* Organizer Card */}
//                             <div className='bg-gradient-to-br from-primary/5 to-purple-50 rounded-2xl shadow-lg p-6 border border-primary/20'>
//                                 <h3 className='text-xl font-bold text-gray-800 mb-3'>Campaign Organizer</h3>
//                                 <div className='flex items-center gap-3'>
//                                     <div className='bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold'>
//                                         {campaign.createdBy?.name?.[0]?.toUpperCase() || 'N'}
//                                     </div>
//                                     <div>
//                                         <p className='font-semibold text-gray-800'>NGO Organization</p>
//                                         <p className='text-sm text-gray-600'>Verified Organizer</p>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </Col>

//                     {/* Right Column - Description & Payment */}
//                     <Col xl={12} lg={12} md={24} sm={24} xs={24}>
//                         {/* Description Section */}
//                         <div className='bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100'>
//                             <h2 className='text-primary font-bold text-2xl mb-4 flex items-center gap-2'>
//                                 <span>📋</span>
//                                 <span>Campaign Description</span>
//                             </h2>
//                             <div className={`prose max-w-none ${!showMore ? 'max-h-[300px] overflow-hidden relative' : ''}`}>
//                                 <div
//                                     className='text-gray-700 leading-relaxed'
//                                     dangerouslySetInnerHTML={{
//                                         __html: showMore
//                                             ? campaign.description
//                                             : (campaign.description?.slice(0, 500) || '') + (!showMore && campaign.description?.length > 500 ? '...' : '')
//                                     }}
//                                 />
//                                 {!showMore && campaign.description?.length > 500 && (
//                                     <div className='absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent'></div>
//                                 )}
//                             </div>
//                             {campaign.description?.length > 500 && (
//                                 <button
//                                     onClick={() => setShowMore(!showMore)}
//                                     className='text-primary font-semibold mt-4 hover:underline transition-all flex items-center gap-1'
//                                 >
//                                     {showMore ? '▲ Show less' : '▼ Show more'}
//                                 </button>
//                             )}
//                         </div>

//                         {/* Divider */}
//                         <div className='my-6'>
//                             <hr className='border-gray-200' />
//                         </div>

//                         {/* Payment Section */}
//                         <div className='bg-gradient-to-br from-primary/5 to-purple-50 rounded-2xl p-1 shadow-lg'>
//                             <div className='bg-white rounded-xl'>
//                                 <Payment campaign={campaign} />
//                             </div>
//                         </div>

//                         {/* Trust Indicators */}
//                         <div className='mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4'>
//                             <div className='flex items-start gap-3'>
//                                 <span className='text-2xl'>🔒</span>
//                                 <div>
//                                     <p className='font-semibold text-blue-900 mb-1'>Secure & Trusted</p>
//                                     <p className='text-sm text-blue-700'>
//                                         Your donation is secure and will be used exclusively for this campaign.
//                                         All transactions are encrypted and protected.
//                                     </p>
//                                 </div>
//                             </div>
//                         </div>
//                     </Col>
//                 </Row>
//             </div>
//         </div>
//     )
// }

// export default CampaignViewer

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Carousel from "./Carousel";
import { Col, Row } from "antd";
import Payment from "./Payment";
import Info from "./Info";
import Description from "./Description";
const CampaignViewer = () => {
  const [campaign, setCampaign] = useState({});
  const [images, setImages] = useState([]);
  const { id } = useParams();

  const fetchCampaign = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/campaign/get/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        },
      );
      setCampaign(res.data.campaign);
      setImages(res.data.campaign.image);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchCampaign();
  }, [id]);
  return (
    <div className="mt-30">
      <div className="my-10">
        <h1 className="text-center text-primary font-bold text-4xl mb-5">
          {campaign.title}
        </h1>
        <div className="text-center">
          <button className="text-center text-white bg-green-500 px-5 py-1 rounded-full font-semibold capitalize text-xl">
            {campaign.category}
          </button>
        </div>
      </div>
      <div className="md:px-10 px-5">
        <Row gutter={[16, 16]}>
          <Col xl={12} lg={12} md={24} sm={24} xs={24} className="!h-full">
            <div className="mb-6 rounded-2xl overflow-hidden shadow-lg">
              <Carousel images={images} />
            </div>
          </Col>
          <Col xl={12} lg={12} md={24} sm={24} xs={24} className="!h-full ">
            <Description campaign={campaign} />
          </Col>
          <Col span={24}>
            <hr className="text-primary my-3 max-w-[80%] mx-auto" />
          </Col>
          <Col lg={12} md={12} sm={24} xs={24}>
            <Info campaign={campaign} />
          </Col>
          <Col lg={12} md={12} sm={24} xs={24}>
            <Payment campaign={campaign} />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default CampaignViewer;
