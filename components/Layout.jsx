import Head from 'next/head'
import Navbar from './Navbar'

const Layout = ({ children }) => {
    return (
        <>
            <Head>
                <title>World Countries</title>
            </Head>
            <Navbar />
            <main>
                {children}
            </main>
        </>
    )
}

export default Layout