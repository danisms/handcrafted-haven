import { ProductImage } from "@/app/lib/definitions";

type Props = {
    images: ProductImage[];
    selectedIndex: number;
    setSelectedIndex: (index: number) => void;
}

export default function ThumbnailList({ images, selectedIndex, setSelectedIndex }: Props) {
    return (
        <div className="flex gap-4 mt-4 gallery-thumbnails-holder">
            {images.map((image, index) => (
                <img
                    key={index}
                    src={image.source}
                    alt={`Thumbnail ${index}`}
                    onClick={() => setSelectedIndex(index)}
                    className={`rounded-lg cursor-pointer border-2 ${selectedIndex === index ? 'border-black' : 'border-transparent'}`}
                />
            ))}
        </div>
    );
}