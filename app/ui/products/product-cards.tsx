import { fetchMostRatedProducts } from "@/app/lib/data";
import Image from "next/image";
import Link from "next/link";
import { DOMPurify } from "dompurify";
import { formatCurrency, formatNumber, shouldOptimizeImage, sliceText } from "@/app/lib/utils";
import { Product, Products } from "@/app/lib/definitions";
import { FaEye, FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { placeholders } from "@/app/lib/placeholder-data";
import { DeleteArtisanProduct, UpdateArtisanProduct } from "./buttons";
import DisplayEmpty from "../display-empty";

export function ProductCards({ products, editable = false }: { products: Products, editable: boolean }) {
    // check for empty
    if (products.length <= 0) return <DisplayEmpty msg="NO PRODUCT ON PROFILE YET" />;

    return (
        <>
            {products.map(product => (
                <div key={product.id} className="productHolder">
                    <div className="productDetailHolder">
                        <Link href={`/profile/${product.owner_id}/${product.id}`}>
                            <div className="image-holder">
                                <Image src={product.product_images[0]?.source || placeholders.missing_image} alt={product.product_images[0]?.alt || "Missing Image Placeholder"} width={350} height={300} unoptimized={shouldOptimizeImage(product.product_images[0]?.source)} />
                            </div>
                            <div className="product-buttons-holder">
                                <Link href={`/products/${product.id}`}><button>VIEW <FaEye /></button></Link>
                                <span>{`(${formatNumber(product.likes)})`}<FaThumbsUp style={{ display: 'inline-block' }} /></span>
                                <span>{`(${formatNumber(product.dislikes)})`}<FaThumbsDown /></span>
                            </div>
                            <p className="product-about" dangerouslySetInnerHTML={{ __html: sliceText(product.description, 180, false) }} />
                        </Link>
                    </div>
                    <div className="cardTagsHolder">
                        <h3 className="cardTag">{formatCurrency(product.price)}</h3>
                        {editable ? (
                            <>
                                <UpdateArtisanProduct artisan_id={product.owner_id} product_id={product.id} />
                                <DeleteArtisanProduct artisan_id={product.owner_id} product_id={product.id} />
                            </>
                        ) : null}
                    </div>
                </div>
            ))}
        </>
    );
}

export async function MostRatedProductCards({ topRatedProducts }: { topRatedProducts: Product[] }) {
    console.log("TOP RATED PRODUCTS: ", topRatedProducts);  // for testin purpose

    return (
        <>
            {topRatedProducts.map(product => (
                <div key={product.id} className="productHolder">
                    <div className="productDetailHolder">
                        <div className="image-holder">
                            <Image src={product.product_images[0].source} alt={product.product_images[0].alt} width={350} height={300} unoptimized={shouldOptimizeImage(product.product_images[0]?.source)} />
                        </div>
                        <Link href={`/products/${product.id}`}><button>{`View (${formatNumber(product.likes)} like(s))`}</button></Link>
                        <p className="product-about" dangerouslySetInnerHTML={{ __html: sliceText(product.description, 280, false) }} />
                    </div>
                    <h3 className="cardTag">{formatCurrency(product.price)}</h3>
                </div>
            ))}
        </>
    );
}