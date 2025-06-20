import { ArtisanProfile } from "@/app/lib/definitions"
import { placeholders } from "@/app/lib/placeholder-data";
import { formatCurrency, formatNumber, sliceText } from "@/app/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { ProductCards } from "../products/product-cards";
import { FaPlusCircle } from "react-icons/fa";

export function DisplayUpdatableArtisanProfile({ profileData }: { profileData: ArtisanProfile }) {
    console.log("PROFILE DATA: ", profileData);  // for testing purpose

    const artisanData = profileData.artisan;
    const products = profileData.products;

    // get artisan data
    artisanData['profile_photo'] = artisanData.profile_photo ? artisanData.profile_photo : artisanData.gender == 'm' ? placeholders.male_profile_picture : placeholders.female_profile_picture;
    artisanData['banner'] = artisanData.banner ? artisanData.banner : placeholders.artisan_profile_banner;

    return (
        <>
            {/* PROFILE HEADER */}
            <div className="artisan-profile-header" style={{
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
                    />
                </div>
                <div className="artisan-title-holder">
                    <h1 className="artisan-title">{sliceText(artisanData.display_name, 15, false, true)}</h1>
                    <button>ABOUT</button>
                </div>
            </div>
            {/* PROFILE SEARCH AND FILTER BODY */}
            <div className="profile-interactive-space-holder">
                <input type="search" placeholder="Search Products" />
                {/* <select name="filter-product">
                    <option value="">Filter</option>
                    <option value="">Filter By Nothing For Now</option>

                </select> */}
                <select name="sort-product">
                    <option value="">Sort</option>
                    <option value="">Sort By Nothing For Now</option>
                </select>
            </div>

            {/* PROFILE PRODUCT DISPLAYS */}
            <div className="add-product-btn-holder" style={{ width: '100%', display: 'grid', justifyContent: 'center' }}>
                <Link href={`/profile/${artisanData.id}/add-product`} style={{textAlign: 'center', margin: '0 auto' }}><button><FaPlusCircle /> PRODUCT</button></Link>
            </div>
            <div className="products-holder">
                <ProductCards products={products} editable={true} />
            </div>
        </>
    )
}