// app/fonts.ts
import { Montserrat, Open_Sans } from 'next/font/google';

export const montserrat = Montserrat({
    subsets: ['latin', 'latin-ext'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    variable: '--font-montserrat',
});

export const openSans = Open_Sans({
    subsets: ['latin', 'latin-ext'],
    weight: ['300', '400', '500', '600', '700', '800'],
    variable: '--font-open-sans',
});
