import Cards from "./Cards";

const ChooseTier = () => {
    return (
        <div className="bg-[#26282B] py-20">
            <div className="container max-w-310 mx-auto">
                <div data-aos="fade-down" data-aos-easing="linear" data-aos-duration="1500" className="text-center mb-14">
                    <h2 className="text-4xl font-black uppercase tracking-wide text-white mb-3">Choose Your Tier</h2>
                    <p className="text-gray-400 max-w-xl mx-auto">Flexible memberships designed for every level of commitment. No hidden fees, just results</p>
                </div>
                <Cards />
            </div>
        </div>
    );
};
export default ChooseTier;
