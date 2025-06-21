import { ProductImage } from '@/app/lib/definitions';
import ThumbnailList from './thumbnail-list';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Image from 'next/image';

type Props = {
    images: ProductImage[];
    selectedIndex: number;
    setSelectedIndex: (index: number | ((index: number) => number) ) => void;
};

export function ImageGallery({ images, selectedIndex, setSelectedIndex }: Props) {
    const handlePrev = () => setSelectedIndex((prev: number) => (prev === 0 ? images.length - 1 : prev - 1));

    const handleNext = () => setSelectedIndex((prev: number) => (prev === images.length - 1 ? 0 : prev + 1));

    return (
        <div>
            <div className="relative flex justify-center items-center gallery-main-display-holder">
                <button
                    onClick={handlePrev}
                    className="absolute left-0 text-gray-600 hover:text-black gallery-nav-btn"
                >
                    <FaChevronLeft size={32} />
                </button>

                <Image
                    src={images[selectedIndex].source}
                    alt={`Main Image ${selectedIndex}`}
                    className="rounded-lg w-full max-h-[400px] object-contain"
                    width={400}
                    height={400}
                />

                <button
                    onClick={handleNext}
                    className="absolute right-0 text-gray-600 hover:text-black gallery-nav-btn"
                >
                    <FaChevronRight size={32} />
                </button>
            </div>

            <ThumbnailList
                images={images}
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}
            />
        </div>
    );
}