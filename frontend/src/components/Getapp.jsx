import { scooter, check, play_store, app_store } from "../../public/assets"
import { Getappp } from "../constants"

const Getapp = () => {
    return (
        <div className="relative text-white pb-5">
            <div className="absolute top-0 max-lg:hidden left-0 w-full h-full pointer-events-none md:w-3/5 xl:w-auto">
                <img src={scooter} alt="" width={600} height={530} />
            </div>
            <div className="relative z-1 max-w-[40rem] ml-auto mr-[10px] pt-20 max-md:ml-[20px] max-lg:ml-[50px] max-lg:text-center">
                <h4 className="h3 mb-4">Get More Feature With Our Mobile Application </h4>
            </div>
            <div className="relative z-1 max-w-[33rem] ml-auto mr-[100px] max-md:ml-[20px] max-lg:ml-[50px]  ">

                <ul className="">
                    {Getappp.map((item, index) => (
                        <li
                            key={index}
                            className="flex items-start py-4  border-n-6"
                        >
                            <img width={24} height={24} src={check} />
                            <p className="ml-4">{item}</p>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="relative flex z-1 max-w-[40rem] ml-auto gap-7 mr-[10px] pt-10 max-md:ml-[20px] max-lg:ml-[50px]">
                <a href=""><img src={play_store} alt="" /></a>
                <a href=""><img src={app_store} alt="" /></a>
            </div>

        </div>
    )
}

export default Getapp