import { ModeToggle } from "@/components/ui/dark-mode"

export function Header() {
    return (
        <div className='bg-secondary h-14 w-full flex justify-between px-10 items-center'>
            <a className="font-bold text-xl" href="/">Ramonotes</a>
            <ModeToggle />
        </div>
    )
}