import Image from "next/image";
const Community = () => {
    return (
        <section className="community w-full min-h-screen py-24">
            <div className="container max-w-310 mx-auto flex flex-col lg:flex-row items-start gap-10 lg:gap-20">
                <div data-aos="fade-right" className="left flex-1 mt-10 items-center justify-center w-full lg:w-auto mb-4 lg:mb-0">
                    <div className="text mb-8 lg:mb-12">
                        <h6 className="text-sm uppercase tracking-widest text-[#00ACDB] mb-4">
                            The Community
                        </h6>
                        <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                            Real Results. <br />
                            Real Elite.
                        </h2>
                    </div>
                    <div
                        data-aos="fade-up-right"
                        className="testimonials bg-[#111] p-6 lg:p-8 rounded-2xl max-w-full lg:max-w-xl border-l-4 border-[#00ACDB]">
                        <p className="text-gray-300 leading-relaxed mb-6">
                            &quot;The atmosphere here is unlike any other gym. <br />
                            It&apos;s high-tech, high-energy, and everyone is
                            focused on <br />
                            getting better. The equipment is
                            always top-notch.&quot;
                        </p>
                        <div className="person-info flex items-center gap-4">
                            <img
                                src="/images/testimonails.jpg"
                                alt="Mahmoud Fathy"
                                className="w-14 h-14 rounded-full object-cover"
                            />
                            <div>
                                <h4 className="font-semibold">
                                    Mahmoud Fathy
                                </h4>
                                <h6 className="text-sm text-[#00ACDB]">
                                    Member for 2 years
                                </h6>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="right flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 auto-rows-auto w-full">
                    <div className="right flex flex-col gap-4">
                        <Image
                            data-aos="fade-down"
                            src="/images/boy.jpg"
                            alt="Gym Training"
                            width={600}
                            height={900}
                            priority
                            className="w-full object-cover rounded-2xl h-105 transition-transform duration-300 hover:scale-105 hover:border-4 hover:border-[#00ACDB]"
                        />
                        <Image
                            data-aos="fade-up-right"
                            src="/images/analysis.jpg"
                            alt="Body Analysis"
                            width={600}
                            height={450}
                            className="w-full object-cover rounded-2xl h-45 transition-transform duration-300 hover:scale-105 hover:border-4 hover:border-[#00ACDB]"
                        />
                    </div>
                    <div className="flex flex-col gap-4 mt-4">
                        <Image
                            data-aos="fade-left"
                            src="/images/girlsyoga.jpg"
                            alt="Yoga Training"
                            width={600}
                            height={450}
                            className="w-full object-cover rounded-2xl h-45 transition-transform duration-300 hover:scale-105 hover:border-4 hover:border-[#00ACDB]"
                        />
                        <Image
                            data-aos="fade-up-left"
                            src="/images/device.jpg"
                            alt="Gym Equipment"
                            width={600}
                            height={800}
                            className="w-full object-cover rounded-2xl h-80 transition-transform duration-300 hover:scale-105 hover:border-4 hover:border-[#00ACDB]"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Community;
