import { fetchTopCollections } from "@/app/lib/data";
import Image from "next/image";
import Link from "next/link";
import { DOMPurify } from "dompurify";
import { formatNumber, sliceText } from "@/app/lib/utils";

export async function CollectionCards() {
    const topCollections = await fetchTopCollections();
    console.log("TOP COLLECTIONS: ", topCollections);  // for testin purpose

    return (
        <>
            {topCollections.map(collection => (
                <div key={collection.id} className="collectionHolder">
                    <div className="collectionDetailHolder">
                        <div className="image-holder">
                            <Image src={collection.image.source} alt={collection.image.alt} width={350} height={300} />
                        </div>
                        <Link href={`/collections/${collection.id}`}><button>{`Browse ${formatNumber(collection.products)} Item(s)`}</button></Link>
                        {/* <p className="collection-about" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(collection.about) }} /> */}
                        <p className="collection-about" dangerouslySetInnerHTML={{ __html: sliceText(collection.about, 280, false) }} />
                    </div>
                    <h3 className="cardTag">{collection.title}</h3>
                </div>
            ))}
        </>
    );
}