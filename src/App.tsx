import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/utils/theme-provider";
import Homepage from "./pages/Home/Homepage";
import Translate from "./pages/Translator/Translate";
import Layout from "./components/layout";
import { Toaster } from "./components/ui/sonner";

export default function App() {
    return (
        <BrowserRouter>
        <Toaster/>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Homepage />} />
                        <Route path="/translate" element={<Translate />} />
                    </Route>
                </Routes>
            </ThemeProvider>
        </BrowserRouter>
    );
}
