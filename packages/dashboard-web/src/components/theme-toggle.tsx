import { Check, Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "../contexts/theme-context";
import { CATPPUCCIN_FLAVORS } from "../lib/theme";
import { Button } from "./ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export function ThemeToggle() {
	const { theme, setTheme } = useTheme();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="sm" className="w-9 px-0">
					<Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
					<Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
					<span className="sr-only">Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem onClick={() => setTheme("system")}>
					<Monitor className="mr-2 h-4 w-4" />
					<span>System</span>
					{theme === "system" && <Check className="ml-auto h-4 w-4" />}
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme("light")}>
					<Sun className="mr-2 h-4 w-4" />
					<span>Light</span>
					{theme === "light" && <Check className="ml-auto h-4 w-4" />}
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme("dark")}>
					<Moon className="mr-2 h-4 w-4" />
					<span>Dark</span>
					{theme === "dark" && <Check className="ml-auto h-4 w-4" />}
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				{CATPPUCCIN_FLAVORS.map((flavor) => (
					<DropdownMenuItem
						key={flavor.theme}
						onClick={() => setTheme(flavor.theme)}
					>
						<span
							aria-hidden="true"
							className="mr-2 h-4 w-4 rounded-full border border-border"
							style={{ backgroundColor: flavor.swatch }}
						/>
						<span>{flavor.label}</span>
						{theme === flavor.theme && <Check className="ml-auto h-4 w-4" />}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
