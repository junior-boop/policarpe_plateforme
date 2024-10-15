import { SvgSpinners3DotsFade } from "../icons";

export default function Loading() {
    return (
        <div className="w-full h-[100vh] fixed top-0 left-0 right-0 bg-white flex items-center justify-center">
            <SvgSpinners3DotsFade className="w-16" />
        </div>
    )
}