"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { authUtils } from "@/lib/auth";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import LoadingSpinner from "@/components/LoadingSpinner";
import {
  FiSearch,
  FiBook,
  FiTarget,
  FiAward,
  FiTrendingUp,
  FiUsers,
  FiPlus,
  FiAlertCircle,
  FiRefreshCw,
  FiPlay,
  FiArrowRight,
  FiStar,
  FiCheckCircle,
  FiLogIn,
} from "react-icons/fi";

export default function Home() {
  const [featuredItems, setFeaturedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [stats, setStats] = useState({
    totalTopics: 0,
    categories: 0,
    studentsHelped: "10K+",
  });

  useEffect(() => {
    // Check authentication state
    setIsLoggedIn(authUtils.isLoggedIn());

    // Fetch latest items for featured section
    fetchFeaturedItems();
  }, []);

  const fetchFeaturedItems = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/items", {
        cache: "no-store",
      });
      if (response.ok) {
        const items = await response.json();
        console.log('Home page - Fetched items:', items); // Debug log
        console.log('Home page - Items count:', items.length); // Debug log
        
        // Sort by creation date (newest first) and get the latest 6 items
        const sortedItems = items.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        );
        const latestItems = sortedItems.slice(0, 6);
        setFeaturedItems(latestItems);

        // Update stats with real data
        const uniqueCategories = [
          ...new Set(items.map((item) => item.category)),
        ];
        setStats({
          totalTopics: items.length,
          categories: uniqueCategories.length,
          studentsHelped: "10K+",
        });
      }
    } catch (error) {
      console.error("Failed to fetch items:", error);
      // Fallback to default items if API fails
      setFeaturedItems([
        {
          id: 1,
          name: "Algebra Fundamentals",
          description:
            "Master the basics of algebra including linear equations, polynomials, and factoring.",
          category: "Algebra",
          difficulty: "Beginner",
          image:
            "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop",
          createdAt: "2024-01-01T00:00:00.000Z",
        },
        {
          id: 2,
          name: "Calculus Mastery",
          description:
            "Comprehensive calculus course covering derivatives, integrals, and applications.",
          category: "Calculus",
          difficulty: "Advanced",
          image:
            "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=400&h=300&fit=crop",
          createdAt: "2024-01-02T00:00:00.000Z",
        },
        {
          id: 3,
          name: "Geometry Essentials",
          description:
            "Explore shapes, angles, and spatial relationships with interactive examples.",
          category: "Geometry",
          difficulty: "Intermediate",
          image:
            "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&h=300&fit=crop",
          createdAt: "2024-01-03T00:00:00.000Z",
        },
      ]);
      // Set fallback stats
      setStats({
        totalTopics: 8,
        categories: 7,
        studentsHelped: "10K+",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <Navigation />

      <main>
        {/* Hero Section */}
        <section className="flex items-center mt-10 xl:mt-25 mb-10 lg:mb-30">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8 order-2 lg:order-1">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full text-sm font-medium">
                  <FiStar className="text-yellow-400" />
                  Trusted by 10,000+ Students
                </div>

                {/* Main Heading */}
                <div className="space-y-6">
                  <h1 className="text-3xl md:text-4xl xl:text-5xl font-bold leading-tight">
                    Master Mathematics with Expert Solutions
                  </h1>

                  <p className="text-xl text-gray-600 leading-relaxed ">
                    Transform your mathematical understanding with our
                    comprehensive collection of solutions, from basic algebra to
                    advanced calculus. Learn at your own pace with expert
                    guidance.
                  </p>
                </div>

                {/* Features List */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-700">
                    <FiCheckCircle className="text-green-600 flex-shrink-0" />
                    <span>Step-by-step solutions for every problem</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <FiCheckCircle className="text-green-600 flex-shrink-0" />
                    <span>8 comprehensive math categories</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <FiCheckCircle className="text-green-600 flex-shrink-0" />
                    <span>Beginner to expert difficulty levels</span>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row lg:flex-wrap gap-4 pt-4">
                  <Link href="/items" className="lg:w-full xl:flex-1 btn btn-primary btn-lg group ">
                    <FiPlay className="mr-2 group-hover:translate-x-1 transition-transform" />
                    Start Learning Now
                    <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href="/login"
                    className="lg:w-full xl:flex-1 btn btn-secondary btn-lg group "
                  >
                    <FiLogIn className="mr-2" />
                    Log In Now
                  </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-black">
                      {stats.categories}+
                    </div>
                    <div className="text-sm text-gray-600">Math Categories</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-black">
                      {stats.totalTopics}+
                    </div>
                    <div className="text-sm text-gray-600">
                      Topics Available
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-black">
                      {stats.studentsHelped}
                    </div>
                    <div className="text-sm text-gray-600">Students Helped</div>
                  </div>
                </div>
              </div>

              {/* Hero Image/Visual */}
              <div className="relative order-1 lg:order-2">
                {/* Main Image */}
                <div className="relative w-full aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&h=600&fit=crop"
                    alt="Mathematics learning environment"
                    className="w-full h-full object-cover"
                  />

                  {/* Floating Cards */}
                  <div className="absolute top-6 left-6 bg-white rounded-2xl p-4 shadow-lg animate-bounce-gentle">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                        <FiTarget className="text-white" />
                      </div>
                      <div>
                        <div className="font-bold text-sm">Algebra</div>
                        <div className="text-xs text-gray-500">15 Topics</div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="absolute bottom-6 right-6 bg-white rounded-2xl p-4 shadow-lg animate-bounce-gentle"
                    style={{ animationDelay: "1s" }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
                        <FiBook className="text-white" />
                      </div>
                      <div>
                        <div className="font-bold text-sm">Calculus</div>
                        <div className="text-xs text-gray-500">12 Topics</div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="absolute top-1/2 right-6 bg-white rounded-2xl p-4 shadow-lg animate-bounce-gentle"
                    style={{ animationDelay: "2s" }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-600 rounded-lg flex items-center justify-center">
                        <FiAward className="text-white" />
                      </div>
                      <div>
                        <div className="font-bold text-sm">98% Success</div>
                        <div className="text-xs text-gray-500">Rate</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Background Decoration */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-black rounded-full opacity-10 animate-pulse"></div>
                <div
                  className="absolute -bottom-8 -left-8 w-32 h-32 bg-gray-400 rounded-full opacity-10 animate-pulse"
                  style={{ animationDelay: "1s" }}
                ></div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-white py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How It Works</h2>
              <p className="text-gray-600 text-lg">
                Three simple steps to get started
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiSearch className="text-2xl text-gray-700" />
                </div>
                <div className="flex items-center justify-center gap-2 mb-3">
                  <span className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                    1
                  </span>
                  <h3 className="text-xl font-bold">Explore</h3>
                </div>
                <p className="text-gray-600">
                  Browse our comprehensive math curriculum and find the perfect
                  topic for your level.
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiBook className="text-2xl text-gray-700" />
                </div>
                <div className="flex items-center justify-center gap-2 mb-3">
                  <span className="bg-gray-700 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                    2
                  </span>
                  <h3 className="text-xl font-bold">Learn</h3>
                </div>
                <p className="text-gray-600">
                  Study with interactive lessons, examples, and step-by-step
                  solutions.
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiTarget className="text-2xl text-gray-700" />
                </div>
                <div className="flex items-center justify-center gap-2 mb-3">
                  <span className="bg-gray-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                    3
                  </span>
                  <h3 className="text-xl font-bold">Master</h3>
                </div>
                <p className="text-gray-600">
                  Practice problems and build confidence in your mathematical
                  abilities.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Items - Latest Items */}
        <section className="bg-gray-50 py-16">
          <div className="container">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-3xl font-bold mb-2">Latest Math Topics</h2>
                <p className="text-gray-600">
                  {loading
                    ? "Loading latest math solutions..."
                    : `Recently added topics • Updated ${new Date().toLocaleDateString()}`}
                </p>
              </div>
              <Link href="/items" className="link">
                View all topics →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {loading ? (
                <div className="col-span-full flex justify-center py-12">
                  <LoadingSpinner
                    size="lg"
                    text="Loading latest math solutions..."
                  />
                </div>
              ) : featuredItems.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6">
                    <FiAlertCircle className="text-4xl text-gray-600" />
                  </div>
                  <p className="text-gray-600 mb-4">
                    No math topics available yet.
                  </p>
                  {isLoggedIn && (
                    <Link href="/add-item" className="btn btn-primary">
                      <FiPlus className="inline mr-2" />
                      Add First Topic
                    </Link>
                  )}
                </div>
              ) : (
                featuredItems.map((item, index) => {
                  // Add badges for latest items
                  const badges = [
                    "Latest",
                    "New",
                    "Recent",
                    "Fresh",
                    "Updated",
                    "Added",
                  ];
                  const badgeColors = [
                    "text-black",
                    "text-gray-700",
                    "text-gray-600",
                    "text-gray-500",
                    "text-gray-400",
                    "text-gray-300",
                  ];

                  // Difficulty colors (keeping original colors for better UX)
                  const difficultyColors = {
                    Beginner: "bg-green-100 text-green-800",
                    Intermediate: "bg-yellow-100 text-yellow-800",
                    Advanced: "bg-red-100 text-red-800",
                    Expert: "bg-purple-100 text-purple-800",
                  };

                  // Calculate how recent the item is
                  const createdDate = new Date(item.createdAt);
                  const now = new Date();
                  const daysDiff = Math.floor(
                    (now - createdDate) / (1000 * 60 * 60 * 24),
                  );
                  const isVeryRecent = daysDiff <= 1;
                  const isRecent = daysDiff <= 7;

                  return (
                    <Link
                      key={item.id}
                      href={`/items/${item.id}`}
                      className="card card-hover p-4 group"
                    >
                      <div className="relative">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-48 object-cover rounded mb-4 group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2 left-2">
                          <span
                            className={`${badgeColors[index] || "text-gray-500"} text-xs font-bold uppercase bg-white/90 px-2 py-1 rounded-full shadow-sm`}
                          >
                            {isVeryRecent
                              ? "🔥 Hot"
                              : isRecent
                                ? badges[index] || "Recent"
                                : badges[index] || "Topic"}
                          </span>
                        </div>
                        <div className="absolute top-2 right-2">
                          <span
                            className={`${difficultyColors[item.difficulty]} text-xs font-bold px-2 py-1 rounded-full`}
                          >
                            {item.difficulty}
                          </span>
                        </div>
                        {/* Date indicator */}
                        {isVeryRecent && (
                          <div className="absolute bottom-2 right-2 bg-black text-white text-xs px-2 py-1 rounded-full">
                            New Today
                          </div>
                        )}
                      </div>
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-bold text-lg group-hover:text-gray-600 transition-colors">
                            {item.name}
                          </h4>
                          <p className="text-gray-600 text-sm line-clamp-2">
                            {item.description}
                          </p>
                        </div>
                        <div className="flex justify-between items-center">
                          <span
                            className={`category-badge ${
                              item.category === "Algebra"
                                ? "category-algebra"
                                : item.category === "Calculus"
                                  ? "category-calculus"
                                  : item.category === "Geometry"
                                    ? "category-geometry"
                                    : item.category === "Statistics"
                                      ? "category-statistics"
                                      : item.category === "Trigonometry"
                                        ? "category-trigonometry"
                                        : item.category === "Number Theory"
                                          ? "category-number-theory"
                                          : item.category === "Logic"
                                            ? "category-logic"
                                            : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {item.category}
                          </span>
                          <span className="text-xs text-gray-500">
                            {daysDiff === 0
                              ? "Today"
                              : daysDiff === 1
                                ? "Yesterday"
                                : daysDiff <= 7
                                  ? `${daysDiff} days ago`
                                  : createdDate.toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })
              )}
            </div>

            {/* Refresh button for logged in users */}
            {isLoggedIn && !loading && featuredItems.length > 0 && (
              <div className="text-center mt-8">
                <button
                  onClick={fetchFeaturedItems}
                  className="btn btn-secondary"
                >
                  <FiRefreshCw className="inline mr-2" />
                  Refresh Latest Topics
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Simple Benefits */}
        <section className="bg-white py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Why Choose Our Math Platform
              </h2>
              <p className="text-gray-600 text-lg">
                Comprehensive learning for every level
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiAward className="text-2xl text-gray-700" />
                </div>
                <h3 className="text-xl font-bold mb-3">Expert Content</h3>
                <p className="text-gray-600">
                  All topics are created by mathematics experts and educators.
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiTrendingUp className="text-2xl text-gray-700" />
                </div>
                <h3 className="text-xl font-bold mb-3">Progressive Learning</h3>
                <p className="text-gray-600">
                  Start from basics and advance to complex mathematical
                  concepts.
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiUsers className="text-2xl text-gray-700" />
                </div>
                <h3 className="text-xl font-bold mb-3">Community Support</h3>
                <p className="text-gray-600">
                  Join a community of learners and get help when you need it.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-gray-50 py-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-4 text-black">
              Ready to Start Learning?
            </h2>
            <p className="text-xl mb-8 text-gray-600">
              {isLoggedIn
                ? "Add new math topics or explore our existing curriculum."
                : "Explore our math curriculum and start your learning journey today."}
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/items"
                className="bg-black text-white px-8 py-3 rounded-lg font-bold hover:bg-gray-800 transition-colors"
              >
                Browse Math Topics
              </Link>
              {isLoggedIn && (
                <Link
                  href="/add-item"
                  className="bg-white text-black border border-black px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
                >
                  Add New Topic
                </Link>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
