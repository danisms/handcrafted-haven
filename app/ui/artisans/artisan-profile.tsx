'use client';

import { useState, useEffect } from 'react';
import { ArtisanProfile } from "@/app/lib/definitions"
import { placeholders } from "@/app/lib/placeholder-data";
import { shouldOptimizeImage, sliceText } from "@/app/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { ProductCards } from "../products/product-cards";
import { FaPlusCircle } from "react-icons/fa";


export function DisplayUpdatableArtisanProfile({ profileData }: { profileData: ArtisanProfile }) {
    const artisanData = { ...profileData.artisan };
    const allProducts = profileData.products;

    artisanData.profile_photo = artisanData.profile_photo || (artisanData.gender === 'm' ? placeholders.male_profile_picture : placeholders.female_profile_picture);
    artisanData.banner = artisanData.banner || placeholders.artisan_profile_banner;

    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState('');
    const [displayedProducts, setDisplayedProducts] = useState(allProducts);

    useEffect(() => {
        let filtered = [...allProducts];

        // Search
        if (searchTerm.trim() !== '') {
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Sort
        if (sortOption === 'name-asc') {
            filtered.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortOption === 'name-desc') {
            filtered.sort((a, b) => b.name.localeCompare(a.name));
        } else if (sortOption === 'price-asc') {
            filtered.sort((a, b) => a.price - b.price);
        } else if (sortOption === 'price-desc') {
            filtered.sort((a, b) => b.price - a.price);
        }

        setDisplayedProducts(filtered);
    }, [searchTerm, sortOption, allProducts]);

    return (
        <>
            {/* PROFILE HEADER */}
            <div
                className="artisan-profile-header"
                style={{
                    backgroundImage: `url(${artisanData.banner})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="artisan-photo-holder">
                    <Image
                        src={artisanData.profile_photo}
                        alt={`${artisanData.display_name} profile photo`}
                        width={200}
                        height={200}
                        unoptimized={shouldOptimizeImage(artisanData.profile_photo)}
                    />
                </div>
                <div className="artisan-title-holder">
                    <h1 className="artisan-title">{sliceText(artisanData.display_name, 15, false, true)}</h1>
                    <button>ABOUT</button>
                </div>
            </div>

            {/* SEARCH & SORT */}
            <div className="profile-interactive-space-holder">
                <input
                    type="search"
                    placeholder="Search Products"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <select
                    name="sort-product"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                >
                    <option value="">Sort</option>
                    <option value="name-asc">Name (A → Z)</option>
                    <option value="name-desc">Name (Z → A)</option>
                    <option value="price-asc">Price (Low → High)</option>
                    <option value="price-desc">Price (High → Low)</option>
                </select>
            </div>

            {/* ADD PRODUCT BUTTON */}
            <div className="add-product-btn-holder" style={{ width: '100%', display: 'grid', justifyContent: 'center' }}>
                <Link href={`/profile/${artisanData.id}/add-product`} style={{ textAlign: 'center', margin: '0 auto' }}>
                    <button><FaPlusCircle /> PRODUCT</button>
                </Link>
            </div>

            {/* PRODUCTS DISPLAY */}
            <div className="products-holder">
                <ProductCards products={displayedProducts} editable={true} />
            </div>
        </>
    );
}
