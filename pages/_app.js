import 'bootstrap/dist/css/bootstrap.min.css';
import { SessionProvider } from "next-auth/react";
import { Toaster } from 'react-hot-toast';
import '../public/styles.css'

export default function MyApp({ Component, pageProps: { session, ...pageProps }  }) {
    return (
        <>
            <SessionProvider session={session}>
                <Component {...pageProps} />
            </SessionProvider>
            <Toaster />
        </>
    );
}