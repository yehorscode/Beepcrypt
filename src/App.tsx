import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/utils/theme-provider";
import { Toaster } from "./components/ui/sonner";
import Homepage from "./pages/Home/Homepage";
import Translate from "./pages/Translator/Translate";
import Layout from "./components/layout";
import NotFound from "./pages/NotFound/NotFound";
import Secure from "./pages/Secure/Secure";
import Leaderboard from "./pages/Leaderboard/Leaderboard";

export default function App() {
    return (
        <BrowserRouter>
        <Toaster/>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route path="*" element={<NotFound />} />
                        <Route index element={<Homepage />} />
                        <Route path="/translate" element={<Translate />} />
                        <Route path="/secure" element={<Secure />} />
                        <Route path="/leaderboard" element={<Leaderboard />} />
                    </Route>
                </Routes>
            </ThemeProvider>
        </BrowserRouter>
    );
}