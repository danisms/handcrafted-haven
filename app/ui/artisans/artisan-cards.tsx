import { fetchTopArtisans } from "@/app/lib/data";
import Image from "next/image";
import Link from "next/link";
import { DOMPurify } from "dompurify";
import { formatNumber, sliceText } from "@/app/lib/utils";
import { Artisans } from "@/app/lib/definitions";
import { fetchMyArtisanProfiles } from "@/app/lib/data";
import DisplayEmpty from "../display-empty";

export async function ArtisanCards(artisansData: Artisans, parentDirectory: string, editable: boolean = false) {
    return (
        <>
            {artisansData.map(artisan => (
                <Link key={artisan.id} href={`/${parentDirectory}/${artisan.id}`} style={{ width: 'fit-content' }}>
                    <div className="artisanHolder">
                        <div className="artisanDetailHolder">
                            <div className="image-holder">
                                <Image src={artisan.profile_photo} alt={`photo of ${artisan.display_name}`} width={200} height={200} />
                            </div>
                            <div className="artisan-features-holder">
                                <section>
                                    <h3>Feature Collections</h3>
                                    <ul className="list-disc pl-6">
                                        {artisan.artisan_collections?.map(collection_title => (
                                            <li key={collection_title.title}>
                                                {collection_title.title}
                                            </li>
                                        ))}
                                    </ul>
                                    <h4><b>Total Products:</b> {formatNumber(artisan.products)}</h4>
                                </section>
                            </div>
                            <div className="about-section-holder">
                                <section>
                                    <h3>About {artisan.display_name}</h3>
                                    {/* <p className="collection-about" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(collection.about) }} /> */}
                                    <p className="artisan-about" dangerouslySetInnerHTML={{ __html: sliceText(artisan.about, 200, false) }} />
                                </section>
                            </div>
                        </div>
                        <div className="cardTagsHolder">
                            <h3 className="cardTag">{artisan.display_name}</h3>
                            {editable ? (
                                <>
                                    <button onClick={null} className="cardTag cardBtn">Edit</button>
                                    <button onClick={null} className="cardTag cardBtn">Delete</button>
                                </>
                            ) : null}
                        </div>
                    </div>
                </Link >
            ))
            }
        </>
    );
}

export async function TopArtisans() {
    const topArtisans = await fetchTopArtisans();
    console.log("TOP ARTISANS: ", topArtisans);  // for testing purpose
    // create cards for top artisans
    if (topArtisans.length <= 0) return (<DisplayEmpty msg="NO TOP ARTISANS YET" />);
    return ArtisanCards(topArtisans, 'artisans');
}

export async function MyArtisanProfiles() {
    const myArtisanProfiles = await fetchMyArtisanProfiles();
    console.log("MY ARTISAN PROFILES: ", myArtisanProfiles);

    // check for empty
    if (myArtisanProfiles.length <= 0) return <DisplayEmpty msg="ARTISAN PROFILE IS EMPTY" />;
    // create cards
    return (
        <>
            <h1 style={{ textAlign: "center" }}>MY ARTISAN PROFILES</h1>
            <div className="artisans-profiles-holder">
                {ArtisanCards(myArtisanProfiles, 'profile', true)}
            </div>
        </>
    );
}