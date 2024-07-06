import Footer from './Footer';
import Header from './Header';
import {Helmet} from "react-helmet";
import { Toaster } from 'react-hot-toast';

const Layout = ({children,title,description,keywords,author}) => {
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <div>
                  <meta name="description" content={description} />
                  <meta name="keywords" content={keywords}/>
                  <meta name="author" content={author} />
                </div>
                <title>{title}</title>               
            </Helmet>
            
            <Header/>
                <main>
                    <Toaster position="top-center"/>
                    {children}
                </main>
            <Footer/>
        </div>
    );
};

Layout.defaultProps = {
    title: "QBCore Store Website",
    description: "QBCore Store website for online shopping",
    keywords: "QBCore-Store",
    author: "QBCore",
}

export default Layout;