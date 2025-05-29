import { Playfair_Display, Cormorant_Garamond, Lato } from 'next/font/google';

export const playfair = Playfair_Display({
    subsets: ['latin'],
    variable: '--font-heading'
});

export const cormorant = Cormorant_Garamond({
    weight: '300',
    subsets: ['latin'],
    variable: '--font-subheading',
})

export const lato = Lato({
    weight: "300",
    subsets: ['latin'],
    variable: '--body-font'
})


