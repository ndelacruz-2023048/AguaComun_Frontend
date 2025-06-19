import { useState } from "react";
import { motion } from "framer-motion";
import { Icon } from '@iconify/react'

export const SiderImage = ({ images }) => {
    const [positionIndexes, setPositionIndexes] = useState([0, 1, 2, 3, 4]);

    const handleNext = () => {
        setPositionIndexes((prev) =>
            prev.map((index) => (index + 1) % images.length)
        );
    };

    const handleBack = () => {
        setPositionIndexes((prev) =>
            prev.map((index) => (index + images.length - 1) % images.length)
        );
    };

    const positions = ["center", "left1", "left", "right", "right1"];

    const imageVariants = {
        center: { x: "0%", scale: 1, zIndex: 5 },
        left1: { x: "-50%", scale: 0.7, zIndex: 3 },
        left: { x: "-90%", scale: 0.5, zIndex: 2 },
        right: { x: "70%", scale: 0.5, zIndex: 1 },
        right1: { x: "50%", scale: 0.7, zIndex: 3 },
    };

    const goToSlide = (slideIndex) => {
        setPositionIndexes((prev) => {
            const updatedIndexes = Array.from({ length: 5 }, (_, i) => (i + slideIndex) % images.length);
            return updatedIndexes;
        });
    };

    return (
        <>
            <div className="relative w-full xl:max-w-xl 2xl:max-w-3xl mx-auto">
                {images.length > 0 ? (
                    <>
                        {images.map((image, index) => (
                            <motion.img
                                key={index}
                                src={image}
                                alt={`Report ${index}`}
                                initial="center"
                                animate={positions[positionIndexes[index]]}
                                variants={imageVariants}
                                transition={{ duration: 0.5 }}
                                className="rounded-lg object-cover"
                                style={{
                                    width: "80%",
                                    position: "absolute",
                                    height: "420px",
                                }}
                            />
                        ))}
                    </>
                ) : (
                    <p>No hay imágenes disponibles</p>
                )}
            </div>

            <div className="flex xl:ml-140 2xl:ml-160 xl:mt-108 2xl:mt-110 gap-5 items-center">
                <button
                    onClick={handleBack}
                    className="bg-gray-500 text-white px-2 py-1 rounded shadow hover:bg-gray-700 transition"
                >
                    <Icon icon="ic:baseline-arrow-back-ios" width="20" height="20" />
                </button>
                <div className="flex justify-center mt-4 space-x-2">
                    {images.map((_, slideIndex) => (
                        <div
                            key={slideIndex}
                            onClick={() => goToSlide(slideIndex)}
                            className={`w-2 h-2 rounded-full cursor-pointer ${
                                positionIndexes.includes(slideIndex) ? 'bg-gray-400' : 'bg-gray-400'
                            }`}
                        />
                    ))}
                </div>
                <button
                    onClick={handleNext}
                    className="bg-gray-500 text-white px-2 py-1 rounded shadow hover:bg-gray-700 transition"
                >
                    <Icon icon="ic:baseline-arrow-forward-ios" width="20" height="20" />
                </button>
            </div>
        </>
    );
}