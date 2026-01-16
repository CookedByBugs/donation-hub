import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Carousel from './Carousel';
import { Col, Row } from 'antd';
import Payment from './Payment';
const CampaignViewer = () => {
    const [campaign, setCampaign] = useState({});
    const [images, setImages] = useState([]);

    const { id } = useParams()

    const fetchCampaign = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/campaign/get/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            })
            setCampaign(res.data.campaign)
            setImages(res.data.campaign.image)
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        fetchCampaign()
    }, [id])
    return (
        <div className='mt-30'>
            <h1 className='text-center text-primary font-bold text-4xl my-10'>{campaign.title}</h1>
            <div className='p-3'>
                <Row gutter={[16, 16]}>
                    <Col xl={12} lg={12} md={12} sm={24} xs={24} className='!h-full'>
                        <Carousel images={images} />
                    </Col>
                    <Col xl={12} lg={12} md={12} sm={24} xs={24} className='!h-full '>
                        <div className="p-5 shadow-lg shadow-black/40 rounded-2xl">
                            <h2 className='text-primary font-bold text-2xl mb-2'>Description</h2>
                            <div className='overflow-y-scroll h-[500px]'>
                                <p dangerouslySetInnerHTML={{ __html: campaign.description }}></p>
                            </div>
                        </div>
                    </Col>
                    <Col span={24}>
                        <hr className='text-primary my-3 max-w-[80%] mx-auto' />
                    </Col>
                    <Col lg={12} md={12} sm={24} xs={24}>

                    </Col>
                    <Col lg={12} md={12} sm={24} xs={24}>
                        <Payment campaign={campaign} />
                    </Col>
                </Row>

            </div>
        </div>
    )
}

export default CampaignViewer