'use client'

import React from 'react';
import Image from 'next/image';
import { IoClose } from 'react-icons/io5';

// Import Swiper React components and styles
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import required modules
import { Navigation, Pagination, Zoom } from 'swiper/modules';

interface ImageGalleryModalProps {
    images: string[];
    initialSlide: number;
    onClose: () => void;
}

const ImageGalleryModal = ({ images, initialSlide, onClose }: ImageGalleryModalProps) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-80 backdrop-blur-sm">
            <div className="relative w-full h-full max-w-7xl max-h-[90vh]">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 text-white text-4xl hover:text-gray-300 transition-colors"
                    aria-label="Close image gallery"
                >
                    <IoClose />
                </button>
                <Swiper
                    initialSlide={initialSlide}
                    modules={[Navigation, Pagination, Zoom]}
                    navigation
                    pagination={{ clickable: true }}
                    zoom={true}
                    className="w-full h-full"
                    loop={true}
                >
                    {images.map((img, index) => (
                        <SwiperSlide key={index}>
                            <div className="swiper-zoom-container">
                                <Image
                                    src={img}
                                    alt={`Space image ${index + 1}`}
                                    fill
                                    className="object-contain"
                                    priority={index === initialSlide}
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default ImageGalleryModal;