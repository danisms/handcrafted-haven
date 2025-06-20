'use client';

import { Product } from '@/app/lib/definitions';
import { formatCurrency, formatNumber, sliceText } from '@/app/lib/utils';
import { useState } from 'react';
import { ImageGallery } from '../component/image-gallery';
import { MessageSquare, ThumbsDown, ThumbsUp } from 'lucide-react';
import Image from 'next/image';
import { placeholders } from '@/app/lib/placeholder-data';
import { DisplayComments } from '../component/bread-crumbs';
import { AddProductComment } from './product-forms';

export function ProductDetail({ product_data }: { product_data: Product }) {
    const productImages = product_data.product_images;
    const artisanData = product_data.owner;
    artisanData.profile_photo = artisanData.profile_photo || artisanData.gender == 'm' ? placeholders.male_profile_picture : placeholders.female_profile_picture;
    artisanData.about = artisanData.about || `Artisan does not have anything about ${artisanData.gender == 'm' ? 'him' : 'her'} yet.`;

    const [selectedIndex, setSelectedIndex] = useState<number>(0);

    return (
        <div className="product-detail-page-main-holder">
            <h2 className="product-name">{product_data.name}</h2>
            <div className="product-gallery-holder">
                <div className="relative">
                    <span className="absolute top-2 left-2 bg-[#e1ba64] text-white font-semibold px-3 py-1 rounded-md shadow price-tag">
                        {formatCurrency(product_data.price)}
                    </span>

                    <ImageGallery
                        images={productImages}
                        selectedIndex={selectedIndex}
                        setSelectedIndex={setSelectedIndex}
                    />
                </div>
            </div>
            <div className="product-interactive-buttons-holder">
                <button className="buy-product-btn">BUY</button>
                <div className="rating-buttons-holder">
                    <button className="rating-btn"><ThumbsUp color="green" /> {formatNumber(product_data.rating.likes)}</button>
                    <button className="rating-btn"><ThumbsDown color="red" /> {formatNumber(product_data.rating.dislikes)}</button>
                    <a href="#view-comments"><button className="rating-btn"><MessageSquare /> {formatNumber(product_data.comments.length)}</button></a>
                </div>
            </div>

            {/* PRODUCT DESCRIPTION*/}
            <section>
                <h3 className="title">Product Description {`(${sliceText(product_data.name, 20, false, true)})`}</h3>
                <p dangerouslySetInnerHTML={{ __html: product_data.description }} />
            </section>

            {/* ARTISAN ABOUT */}
            <section>
                <h3 className="title">About Artisan {`(${sliceText(artisanData.display_name, 20, false, true)})`}</h3>
                <p>
                    <div className="inline-image-holder">
                        <Image className="inline-image" src={artisanData.profile_photo} alt={`Photo of ${artisanData.display_name}`} width={100} height={100} />
                    </div>
                    <span dangerouslySetInnerHTML={{ __html: artisanData.about }} />
                </p>
            </section>

            {/* PRODUCT COMMENTS */}
            <section>
                <h3 id="view-comments" className="title">Product Comments {`(${sliceText(artisanData.display_name, 20, false, true)})`}</h3>
                <p className="product-comments-holder">
                    <DisplayComments comments={product_data.comments} />
                </p>
                <p className='add-comment-outer-holder'>
                    <AddProductComment product_id={product_data.id} />
                </p>
            </section>
        </div>

    );
}