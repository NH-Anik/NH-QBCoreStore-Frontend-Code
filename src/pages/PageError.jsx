import Lottie from "lottie-react";
import groovyWalkAnimation from "../Lotianimation/animation_ll99bp28.json";
import Layout from './../component/Layout/Layout';

const PageError = () => {
    return (
        <Layout>
            <div className="flex justify-around items-center mt-20">
               <Lottie className="bg-pro" animationData={groovyWalkAnimation} loop={true} />
            </div>
        </Layout>
    );
};

export default PageError;