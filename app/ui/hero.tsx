import { fetchHeroContent } from "../lib/data";
import Image from "next/image";
import Link from "next/link";

export default async function HeroSection() {
    const herosData = await fetchHeroContent();
    const data = herosData[0];
    console.log("HERO CONTENT: ", herosData);  // for testing purpose

    // destructure data
    const {
        title,
        source,
        alt,
        description,
        link
    } = data;

    console.log("link: ", link.ancor_text);

    return (
        <>
            <div className="hero-container">
                <Image
                    src={source}
                    alt={alt}
                    width={1080}
                    height={500}
                />
            </div>
            <div className="shade"></div>
            <div className="hero-text-holder">
                <h1 className="hero-title">{title}</h1>
                {link.url ? <Link href={`${typeof link.url === "string" ? link.url : link.url.href}`} className="hero-button-link" ><button>{link.ancor_text}</button></Link> : null}
            </div>
        </>
    )

}