import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./pages/Layout";
import ChatPage from "./pages/ChatPage";
import StoragePage from "./pages/StoragePage";
import UploadPage from "./pages/UploadPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Use Layout as a parent for nested routes */}
        <Route path="/" element={<Layout />}>
          <Route path="chat" element={<ChatPage />} />
          <Route path="storage" element={<StoragePage />} />
          <Route path="uploads" element={<UploadPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
