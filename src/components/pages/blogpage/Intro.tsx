"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import BlogPost from "../../../assets/images/blog-post.png";

import Pagination from "./Pagination";

const benefits = [
  {
    badge: BlogPost,
    bg: "#EDF9F9",
    title: "Wema Bank Startup Accelerator Programme",
    desc: "Bridgee is thrilled to announce its selection into Wema Bank’s esteemed...",
    update: "Product Updates",
    dateCreated: "15 September 2025"
  }
];

const categories = [
  "All Posts",
  "Online Security Tips",
  "Customer Stories",
  "Product Updates",
  "How-To Guides",
  "Industry News"
];

function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All Posts");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;

  const filteredPosts =
    activeCategory === "All Posts"
      ? benefits
      : benefits.filter(
        (post) =>
          post.update.toLowerCase() === activeCategory.toLowerCase()
      );

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const paginatedPosts = filteredPosts.slice(
    startIndex,
    startIndex + postsPerPage
  );

  return (
    <section id="why-us" className="w-full relative overflow-hidden py-28">
      <div className="w-full index-content">
        <div className="w-full max-w-4xl text-center mx-auto flex flex-wrap justify-center gap-5 mb-2">
          {categories.map((cat) => (
            <span
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setCurrentPage(1);
              }}
              className={`uppercase cursor-pointer transition-all duration-300 ${
                activeCategory === cat
                  ? "text-success font-semibold border-b-2 border-success pb-1"
                  : "text-gray-500 hover:text-success"
              }`}
            >
              {cat}
            </span>
          ))}
        </div>

        <div className="w-full relative pt-20">
          {paginatedPosts.length === 0 ? (
            <p className="text-center text-gray-500 text-lg py-20">
              No posts found.
            </p>
          ) : (
            <div className="flex flex-wrap -mx-3">
              {paginatedPosts.map((item, idx) => (
                <div
                  className="w-full flex-col mdx2:w-1/3 p-10 mt-16"
                  key={idx}
                >
                  <div className="w-full flex-col items-center mt-5 mdx2:mt-0">
                    <Link href="/singlepost">
                      <Image
                        src={item.badge}
                        alt="Blog post image"
                        className="w-full h-auto rounded-xl cursor-pointer hover:opacity-90 transition-all duration-300"
                      />
                    </Link>

                    <div className="flex justify-between items-center mt-3">
                      <h3 className="text-xs ff-medium text-success cursor-pointer bg-[#FAE6F0] px-3 py-1 rounded-full">
                        {item.update}
                      </h3>
                      <p className="text-xs leading-relaxed text-gray-500">
                        {item.dateCreated}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5">
                    <h3 className="text-2xl ff-medium mb-4 cursor-pointer hover:text-success transition-all duration-300">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#939393]">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {filteredPosts.length > 0 && totalPages > 1 && (
          <Pagination
          />
        )}
      </div>
    </section>
  );
}

export default BlogPage;
