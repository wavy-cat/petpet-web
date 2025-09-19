import * as React from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

export function ModeToggle() {
	const [theme, setTheme] = React.useState<"dark" | "theme-light" | null>(null);

	React.useEffect(() => {
		const isDarkMode = document.documentElement.classList.contains("dark");
		setTheme(isDarkMode ? "dark" : "theme-light");
	}, []);

	React.useEffect(() => {
		if (theme !== null) {
			const isDark = theme === "dark";
			document.documentElement.classList[isDark ? "add" : "remove"]("dark");
		}
	}, [theme]);

	const toggleTheme = () => {
		setTheme(prevTheme => (prevTheme === "theme-light" ? "dark" : "theme-light"));
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
