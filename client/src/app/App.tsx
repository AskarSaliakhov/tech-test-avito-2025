import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AllAdvertisementsPage } from "../pages/AllAdvertisements/AllAdvertisementsPage.tsx";
import { DetailedAdvertisementPage } from "../pages/DetailedAdvertisement/DetailedAdvertisementPage.tsx";
import { StatisticsPage } from "../pages/Statistics/StatisticsPage.tsx";
import { Navbar } from "../widgets/ui/Navbar/Navbar.tsx";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navbar />}>
                    <Route index element={<AllAdvertisementsPage />} />
                    <Route path="ads" element={<AllAdvertisementsPage />} />
                    <Route path="ads/:id" element={<DetailedAdvertisementPage />} />
                    <Route path="stats" element={<StatisticsPage />} />
                </Route>
            </Routes>
        </Router>
    )
}
