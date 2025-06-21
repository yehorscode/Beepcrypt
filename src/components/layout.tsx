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
import { Button } from "./ui/button";
import eyeofra from "@/assets/images/eyeofra.jpg";
import sigmawolf from "@/assets/images/sigmawolf.png";

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
                    <Link
                                className="font-mono font-bold flex justify-center items-center"
                                href="/"
                            >
                    <span className="w-4 h-4 bg-accent-foreground rounded-full inline-block mr-2"></span>
                    <span className="w-5 h-2 bg-accent-foreground rounded-none inline-block"></span>
                    </Link>
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                            <Link
                                className="font-mono font-bold flex justify-center items-center"
                                href="/"
                            >
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
                                    style={{
                                        boxShadow:
                                            theme === "dark"
                                                ? "0px 0px 20px 1px rgba(255, 255, 255, 0.5)"
                                                : "0px 0px 20px 1px rgba(0, 0, 0, 0.5)",
                                    }}
                                >
                                    <Link href="/secure">Secure morse</Link>
                                </NavigationMenuLink>
                            </TooltipTrigger>
                            <TooltipContent>
                                Not really secure but try
                            </TooltipContent>
                        </Tooltip>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                            <Link href="/translate">Translate</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem className="flex justify-end">
                        <Button
                            onClick={toggleTheme}
                            aria-label="Switch theme"
                            variant={"outline"}
                        >
                            {theme === "dark" ? (
                                <>
                                    <img
                                        src={eyeofra}
                                        alt="Light Mode Icon"
                                        className="w-4 h-4 mr-1"
                                    />
                                    Light Mode
                                </>
                            ) : (
                                <>
                                    <img
                                        src={sigmawolf}
                                        alt="Dark Mode Icon"
                                        className="w-4 h-4 mr-1"
                                    />
                                    Dark Mode
                                </>
                            )}
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
                        </Button>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
            <Outlet />
        </div>
    );
}
