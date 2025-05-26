import '../styles/reset.css'
import { Metadata} from 'next'
import Header from '@/_components/Header'
import Footer from '@/_components/Footer'

export const metadata: Metadata = {
    title: "Next.JS Tutorial",
    description: "Learning advanced Next.js App Router concepts."
}

export default function RootLayout (
    {children} : {children: React.ReactNode}
) {
    // throw new Error('Test global error from layout')
    return(
        <html lang="en">
            <body>
                <Header />
                <main>{children}</main>
                <Footer />
            </body>
        </html>
    )
}