import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PostList from "./pages/BlogList";
import BlogCreate from "./pages/BlogCreate";
import BlogUpdate from "./pages/BlogUpdate";
import Login from "./pages/Login";
import BulkCreate from "./pages/BulkCreate";
import BlogGetCreate from "./pages/BlogGetCreate";
import ProtectedRoute from "./ProtectedRoutes";
import BlogList from "./pages/BlogList";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<Login />} />

        {/* Protected */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <BlogList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/blog/create"
          element={
            <ProtectedRoute>
              <BlogCreate />
            </ProtectedRoute>
          }
        />
        <Route
          path="/blog/update/:id"
          element={
            <ProtectedRoute>
              <BlogUpdate />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bulk"
          element={
            <ProtectedRoute>
              <BulkCreate />
            </ProtectedRoute>
          }
        />
        <Route
          path="/get"
          element={
            <ProtectedRoute>
              <BlogGetCreate />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
