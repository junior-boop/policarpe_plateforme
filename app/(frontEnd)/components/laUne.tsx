import Container from "@/components/my/container";

export default function LaUne() {
    return (
        <div className="py-6">
            <Container>
                <div className="w-full flex items-start h-[550px] rounded-xl overflow-hidden">
                    <div className="bg-gray-900 flex-1 h-full bg-center bg-no-repeat bg-cover" style={{ backgroundImage: `url(https://actucameroun.com/wp-content/uploads/2024/04/patience-dabany-1140x480.jpg.webp)` }}>
                        <div className="bg-[#0002] w-full h-full p-8 flex justify-end">
                            <div className="bg-[#7BDFFF] w-[350px] h-full">
                                <div className="px-6 py-8 flex flex-col justify-between h-full">
                                    <div>
                                        <div className="bg-[#ff0044] text-white font-bold text-base w-fit px-2 py-1 uppercase mb-2">Culture</div>
                                        <div className="font-anto text-4xl">Gabon: la mère d’Ali Bongo, Patience Dabany évacuée en France</div>
                                        <div className="mt-4">
                                            Integer eu lorem maximus, auctor libero nec, condimentum risus. Donec ut ultrices elit. Phasellus malesuada venenatis nulla, eget elementum leo pharetra ac....
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold">Par Polycarpe Essomba | il y a 12 minutes</div>
                                    </div>
                                </div>
                            </div>
                        </div></div>

                </div>
            </Container>
        </div>
    )
}