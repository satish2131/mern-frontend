import React, { useState, useEffect, useCallback } from "react";
import { getCourses } from "../api";
import { FaSearch, FaFilter, FaStar, FaClock, FaHeart, FaRegHeart, FaBookOpen, FaSpinner } from "react-icons/fa";
import EnrollmentModal from "../components/EnrollmentModal";
import "./Courses.css";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  // Filters & Sorting
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [wishlist, setWishlist] = useState([]);

  const limit = 12;

  // Listen for enrollCourseFromSearch event from Navbar
  useEffect(() => {
    const handleEnrollEvent = (e) => {
      const course = e.detail;
      if (course) {
        setSelectedCourse(course);
        setShowModal(true);
        const cardEl = document.getElementById(course._id);
        if (cardEl) {
          cardEl.scrollIntoView({ behavior: "smooth", block: "center" });
          cardEl.classList.add("highlight");
          setTimeout(() => cardEl.classList.remove("highlight"), 2000);
        }
      }
    };
    window.addEventListener("enrollCourseFromSearch", handleEnrollEvent);
    return () => window.removeEventListener("enrollCourseFromSearch", handleEnrollEvent);
  }, []);

  const fetchPage = useCallback(async (p = 1) => {
    setLoading(true);
    try {
      const data = await getCourses(p, limit);
      const items = data.items || data || [];

      // Enrich items with fallback properties for e-commerce catalog
      const enriched = items.map((c, i) => ({
        ...c,
        price: c.price || [3999, 4999, 2999, 5999, 1999][i % 5],
        rating: c.rating || [4.9, 4.85, 4.95, 4.78, 4.88][i % 5],
        reviewsCount: c.reviewsCount || Math.floor(Math.random() * 800) + 200,
        category: c.category || ["Web Dev", "AI & ML", "Cloud", "Database", "Design"][i % 5]
      }));

      setCourses(prev => (p === 1 ? enriched : [...prev, ...enriched]));
      setHasMore(p < (data.totalPages || 1));
    } catch (err) {
      console.log("Error loading courses:", err);
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchPage(1);
  }, [fetchPage]);

  const toggleWishlist = (id) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  const enrollCourse = (course) => {
    setSelectedCourse(course);
    setShowModal(true);
  };

  // Filter & Sort Logic
  const categories = ["All", "Web Dev", "AI & ML", "Cloud", "Database", "Design"];

  const filteredCourses = courses.filter(c => {
    const matchesCategory = selectedCategory === "All" || c.category === selectedCategory;
    const matchesSearch = c.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0; // default popular
  });

  return (
    <div className="courses-page animate-fade-in">
      <div className="catalog-header-bg">
        <div className="catalog-header-container">
          <span className="badge badge-primary">E-COMMERCE CATALOG</span>
          <h1>Explore Masterclasses & Skill Certifications</h1>
          <p>Over {courses.length > 0 ? courses.length : 12}+ interactive tech courses designed for career growth.</p>
        </div>
      </div>

      <div className="catalog-container">
        {/* Top Control Bar */}
        <div className="catalog-control-bar glass-panel">
          <div className="catalog-search-box">
            <FaSearch className="control-search-icon" />
            <input
              type="text"
              placeholder="Search courses by keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Sort Dropdown */}
          <div className="catalog-sort-box">
            <label><FaFilter size={12} /> Sort By:</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated ★</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Category Pills Bar */}
        <div className="catalog-category-bar">
          {categories.map(cat => (
            <button
              key={cat}
              className={`cat-pill-btn ${selectedCategory === cat ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Course Grid */}
        <div className="catalog-grid">
          {filteredCourses.length === 0 && !loading ? (
            <div className="empty-catalog-state glass-panel">
              <FaBookOpen size={44} color="#64748b" />
              <h3>No courses found</h3>
              <p>Try adjusting your search query or selected category filter.</p>
              <button className="btn btn-primary" onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}>
                Reset All Filters
              </button>
            </div>
          ) : (
            filteredCourses.map((course) => (
              <div key={course._id} id={course._id} className="catalog-card glass-card">
                <div className="card-media">
                  <img
                    src={course.image || "https://img.freepik.com/free-vector/gradient-ui-ux-background_23-2149052117.jpg"}
                    alt={course.title}
                    loading="lazy"
                    decoding="async"
                    width="300"
                    height="190"
                  />
                  <span className="media-category-badge">{course.category}</span>
                  <button
                    className={`wishlist-btn ${wishlist.includes(course._id) ? "active" : ""}`}
                    onClick={() => toggleWishlist(course._id)}
                    aria-label="Wishlist"
                  >
                    {wishlist.includes(course._id) ? <FaHeart color="#f43f5e" /> : <FaRegHeart />}
                  </button>
                </div>

                <div className="card-body">
                  <div className="card-meta-row">
                    <span className="meta-rating"><FaStar color="#fbbf24" size={12} /> {course.rating} ({course.reviewsCount})</span>
                    <span className="meta-duration"><FaClock size={12} /> {course.duration || "Self-Paced"}</span>
                  </div>

                  <h3 className="course-card-title">{course.title}</h3>
                  <p className="course-card-desc">{course.description}</p>

                  <div className="card-price-row">
                    <div className="price-box">
                      <span className="current-price">₹{Number(course.price).toLocaleString('en-IN')}</span>
                      <span className="original-price">₹{(Number(course.price) * 2).toLocaleString('en-IN')}</span>
                    </div>
                    <span className="discount-pill">50% OFF</span>
                  </div>

                  <div className="card-action-row">
                    <button className="btn btn-primary card-enroll-btn" onClick={() => enrollCourse(course)}>
                      Enroll Now
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Loading Spinner / Pagination */}
        {loading && (
          <div className="catalog-loading">
            <FaSpinner className="spin" size={24} /> Loading Masterclasses...
          </div>
        )}

        {!loading && hasMore && (
          <div className="load-more-container">
            <button className="btn btn-outline" onClick={() => { const next = page + 1; setPage(next); fetchPage(next); }}>
              Load More Courses
            </button>
          </div>
        )}
      </div>

      <EnrollmentModal
        show={showModal}
        course={selectedCourse}
        onClose={() => setShowModal(false)}
        fromHome={false}
      />
    </div>
  );
}
