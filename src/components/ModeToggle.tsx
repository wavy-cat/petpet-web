import * as React from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

type Theme = "dark" | "light";

export function ModeToggle() {
	const [theme, setTheme] = React.useState<Theme>('light');

	React.useEffect(() => {
		const storedTheme = localStorage.getItem("theme") as Theme | null;
		const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

		if (storedTheme) {
			setTheme(storedTheme);
		} else {
			setTheme(prefersDark ? "dark" : "light");
		}
	}, []);

	React.useEffect(() => {
		const root = window.document.documentElement;

		root.classList.remove("light", "dark");
		root.classList.add(theme);

		localStorage.setItem("theme", theme);
	}, [theme]);

	const toggleTheme = () => {
		setTheme(prevTheme => (prevTheme === "light" ? "dark" : "light"));
	};

	return (
		<Button className="cursor-pointer" variant="ghost" size="icon" onClick={toggleTheme}>
			<Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
			<Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
			<span className="sr-only">Toggle theme</span>
		</Button>
	);
}

export default ModeToggle;
