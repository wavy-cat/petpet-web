import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button.tsx";
import type {Link} from "@/components/header/types.ts";
import {AlignJustify} from "lucide-react";

interface Props {
	links: Link[]
}

export function MobileLinksMenu({links}: Props) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button className="cursor-pointer" variant="ghost" size="icon">
					<AlignJustify/>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				{links.map(link => <a href={link.url}><DropdownMenuItem className="cursor-pointer">{link.title}</DropdownMenuItem></a>)}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}