import { fetchTopArtisans } from "@/app/lib/data";
import Image from "next/image";
import Link from "next/link";
import { DOMPurify } from "dompurify";
import { formatNumber, sliceText } from "@/app/lib/utils";

export async function ArtisanCards() {
    const topArtisans = await fetchTopArtisans();
    console.log("TOP ARTISANS: ", topArtisans);  // for testing purpose

    return (
        <>
            {topArtisans.map(artisan => (
                <Link key={artisan.id} href={`/artisans/${artisan.id}`}>
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
                        <h3 className="cardTag">{artisan.display_name}</h3>
                    </div>
                </Link>
            ))}
        </>
    );
}