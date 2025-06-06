import styles from '@/app/ui/css/home.module.css';
import Image from 'next/image';
import Link from 'next/link';

import { heroImages, collections, artisans,  } from './lib/placeholder-data';  // import placeholder data


export default function Page() {
  return (
    <main className={styles.homeContentContainer}>
      <div className='hero-section'>
        <div>
          <Image
            src={`/${heroImages[0].source}`}
            width={1080}
            height={600}
            alt={heroImages[0].alt}
          />
          <h1>{heroImages[0]?.title}</h1>
          <Link
            href={`${heroImages[0]?.link.url}`}
          >
            {heroImages[0]?.link.ancorText}
          </Link>
        </div>
      </div>

      <div className='collections-section slide-cards-container'>

      </div>

      <div className='artisans-section slide-cards-container'>

      </div>

      <div className='most-rated-section slide-cards-container'>

      </div>
      <div className='developers-section slide-cards-container'>

      </div>
    </main>
  );
}
