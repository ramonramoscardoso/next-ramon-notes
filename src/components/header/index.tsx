import { ModeToggle } from "@/components/ui/dark-mode"

export function Header() {
    return (
        <div className='w-full bg-slate-600 flex justify-between'>
            Ramonotes
            <ModeToggle />
        </div>
    )
}