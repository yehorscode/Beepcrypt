import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Link } from "@radix-ui/react-navigation-menu";
import { Outlet } from "react-router-dom";
import { useTheme } from "@/components/utils/theme-provider";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Layout() {
    const texts = [
        "Isn't it too light?",
        "Do your eyes burn yet?",
        "AAAAAAAAAAAAAAA",
        "MY EYES!!!!",
        "please turn dark mode on again",
    ];
    const { theme, setTheme } = useTheme();

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    return (
        <div className="">
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                            <Link className="font-mono font-bold" href="/">
                                Beepcrypt
                            </Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                            <Link href="/">Homepage</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem className="">
                        <Tooltip>
                            <TooltipTrigger>
                                <NavigationMenuLink
                                    asChild
                                    className="shadow-md shadow-red-500"
                                >
                                    <Link href="/secure">Secure morse</Link>
                                </NavigationMenuLink>
                            </TooltipTrigger>
                            <TooltipContent>Not really secure but try</TooltipContent>
                        </Tooltip>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                            <Link href="/translate">Translate</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem className="flex justify-end">
                        <button
                            onClick={toggleTheme}
                            className="ml-4 px-2 py-1 rounded border border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white transition-colors"
                            aria-label="Switch theme"
                        >
                            {theme === "dark" ? "Dark Mode" : " Light Mode"}
                            {theme === "light" ? (
                                <span className="text-xs ml-1 dark:text-gray-500">
                                    {
                                        texts[
                                            Math.floor(
                                                Math.random() * texts.length
                                            )
                                        ]
                                    }
                                </span>
                            ) : null}
                        </button>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
            <Outlet />
        </div>
    );
}
