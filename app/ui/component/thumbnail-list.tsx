import { ProductImage } from "@/app/lib/definitions";
import Image from "next/image";

type Props = {
    images: ProductImage[];
    selectedIndex: number;
    setSelectedIndex: (index: number) => void;
}

export default function ThumbnailList({ images, selectedIndex, setSelectedIndex }: Props) {
    return (
        <div className="flex gap-4 mt-4 gallery-thumbnails-holder">
            {images.map((image, index) => (
                <Image
                    key={index}
                    src={image.source}
                    alt={`Thumbnail ${index}`}
                    onClick={() => setSelectedIndex(index)}
                    className={`rounded-lg cursor-pointer border-2 ${selectedIndex === index ? 'border-black' : 'border-transparent'}`}
                    width={200}
                    height={200}
                />
            ))}
        </div>
    );
}