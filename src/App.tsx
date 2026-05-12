import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MapScreen from "./pages/MapScreen";
import Streams from "./pages/Streams";
import StreamPlayer from "./pages/StreamPlayer";
import Ligen from "./pages/Ligen";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import EventDetail from "./pages/EventDetail";
import PlayerDetail from "./pages/PlayerDetail";
import NewsList from "./pages/NewsList";
import NewsDetail from "./pages/NewsDetail";
import Scorer from "./pages/Scorer";
import Community from "./pages/Community";
import MallePally from "./pages/MallePally";
import Onboarding from "./pages/Onboarding";
import Profil from "./pages/Profil";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/karte" element={<MapScreen />} />
        <Route path="/streams" element={<Streams />} />
        <Route path="/streaming/:slug" element={<StreamPlayer />} />
        <Route path="/ligen" element={<Ligen />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/produkt/:slug" element={<ProductDetail />} />
        <Route path="/events/:slug" element={<EventDetail />} />
        <Route path="/spieler/:slug" element={<PlayerDetail />} />
        <Route path="/news" element={<NewsList />} />
        <Route path="/news/:slug" element={<NewsDetail />} />
        <Route path="/scorer" element={<Scorer />} />
        <Route path="/community" element={<Community />} />
        <Route path="/malle-pally" element={<MallePally />} />
        <Route path="/profil" element={<Profil />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
