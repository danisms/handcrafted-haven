import { fetchMostRatedProducts } from "@/app/lib/data";
import Image from "next/image";
import Link from "next/link";
import { DOMPurify } from "dompurify";
import { formatCurrency, formatNumber, sliceText } from "@/app/lib/utils";

export async function MostRatedProductCards() {
    const topRatedProducts = await fetchMostRatedProducts();
    console.log("TOP RATED PRODUCTS: ", topRatedProducts);  // for testin purpose

    return (
        <>
            {topRatedProducts.map(product => (
                <div key={product.id} className="productHolder">
                    <div className="productDetailHolder">
                        <div className="image-holder">
                            <Image src={product.product_images[0].source} alt={product.product_images[0].alt} width={350} height={300} />
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