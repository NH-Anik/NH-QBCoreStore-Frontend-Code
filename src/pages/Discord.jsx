import DiscordCom from '../component/DiscordCom';
import Layout from '../component/Layout/Layout';

const Discord = () => {
    return (
        <Layout title={"Discord"}>
            <div>
                <h1 className="text-3xl font-bold text-white text-center mt-10 mb-10 capitalize">we are on discord and you can join</h1>
                <DiscordCom/>
            </div>
        </Layout>
    );
};

export default Discord;