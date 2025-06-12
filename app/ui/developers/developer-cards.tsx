import { developers } from "@/app/lib/developer-data";
import Image from "next/image";
import { sliceText } from "@/app/lib/utils";
import { FaPhone, FaWhatsapp, FaTwitter, FaInstagram, FaFacebook, FaGithub, FaEnvelope, FaLinkedin } from "react-icons/fa";
import { placeholders } from "@/app/lib/placeholder-data";

export function DevelopersCard() {
    const webDevs = developers;
    console.log("DEVS: ", webDevs);  // for testing purpose

    return (
        <>
            {webDevs.map(dev => (
                <div key={dev.id} className="devHolder">
                    <div className="devDetailHolder">
                        <div className="image-holder">
                            <Image src={dev.photo_url ? dev.photo_url : placeholders.unisex_profile_picture} alt={`photo of ${dev.name ? dev.name : "a dev placeholder"}`} width={250} height={250} />
                        </div>
                        <div className="about-section-holder">
                            <section>
                                <h3>About {dev.name}{dev.title ? ` (${dev.title})` : null}</h3>
                                {/* <p className="collection-about" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(collection.about) }} /> */}
                                <p className="dev-about" dangerouslySetInnerHTML={{ __html: dev.about ? sliceText(dev.about, 250, true) : 'No About' }} />
                            </section>
                            <section className="dev-contacts-holder contacts-holder">
                                {dev.contact.phone ? <a href={`tel:${dev.contact.phone}`} target="_blank" rel="noopener noreferrer"><FaPhone /></a> : null}
                                {dev.contact.whatsapp ? <a href={`https://wa.me/${dev.contact.whatsapp}`} target="_blank" rel="noopener noreferrer"><FaWhatsapp /></a> : null}
                                {dev.contact.email ? <a href={`mailto:${dev.contact.email}`} target="_blank" rel="noopener noreferrer"><FaEnvelope /></a> : null}
                                {dev.contact.github ? <a href={`${dev.contact.github}`} target="_blank" rel="noopener noreferrer"><FaGithub /></a> : null}
                                {dev.contact.linkedin ? <a href={`${dev.contact.linkedin}`} target="_blank" rel="noopener noreferrer"><FaLinkedin /></a> : null}
                                {dev.contact.twitter ? <a href={`${dev.contact.twitter}`} target="_blank" rel="noopener noreferrer"><FaTwitter /></a> : null}
                                {dev.contact.facebook ? <a href={`${dev.contact.facebook}`} target="_blank" rel="noopener noreferrer"><FaFacebook /></a> : null}
                                {dev.contact.instagram ? <a href={`${dev.contact.instagram}`} target="_blank" rel="noopener noreferrer"><FaInstagram /></a> : null}
                            </section>
                        </div>
                    </div>
                    <h3 className="cardTag">{dev.role}</h3>
                </div>
            ))}
        </>
    );
}