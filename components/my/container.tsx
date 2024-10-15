import { cn } from "@/lib/utils";

export default function Container({ className, children }: { className?: string, children: JSX.Element | JSX.Element[] | React.ReactNode }) {
    return (
        <div className={cn("max-w-[1080px] w-full mx-auto", className)}>
            {children}
        </div>
    )
}