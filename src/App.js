import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PostList from "./pages/BlogList";
import BlogCreate from "./pages/BlogCreate";
import BlogUpdate from "./pages/BlogUpdate";
import Login from "./pages/Login";
import BulkCreate from "./pages/BulkCreate";
import BlogGetCreate from "./pages/BlogGetCreate";

function App() {

  return (
    <Router> 
      
      <Routes>
        {/* default route */}

        <Route path="/" element={<PostList />} />
        <Route path="/blog/create" element={<BlogCreate />} />
        <Route path="/blog/update/:id" element={<BlogUpdate />} />
        <Route path="/login" element={<Login />} />
        <Route path="/bulk" element={<BulkCreate />} />
        <Route path="/get" element={<BlogGetCreate />} />


      </Routes>
    </Router>
  );
}

export default App;
