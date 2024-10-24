import React from "react";
import Image from "next/image";
import Link from "next/link";

import BlogPost from "../../../assets/images/blog-post.png";

import Pagination from "./Pagination";

const benefits = [
  {
    badge: BlogPost,
    bg: "#EDF9F9",
    title: "Introduction to Bridge",
    desc: "Introducing Bridge, its mission, and the reasons behind its creation.",
    update: "PRODUCT UPDATES",
    dateCreated: "12 Dec 2023"
  },
  {
    badge: BlogPost,
    bg: "#FAE9FC",
    title: "Introduction to Bridge",
    desc: "Introducing Bridge, its mission, and the reasons behind its creation.",
    update: "SECURITY TIPS",
    dateCreated: "12 Dec 2023"
  },
  {
    badge: BlogPost,
    bg: "#E8F6FF",
    title: "Introduction to Bridge",
    desc: "Introducing Bridge, its mission, and the reasons behind its creation.",
    update: "INDUSTRY NEWS",
    dateCreated: "12 Dec 2023"
  },
  {
    badge: BlogPost,
    bg: "#EDF9F9",
    title: "Introduction to Bridge",
    desc: "Introducing Bridge, its mission, and the reasons behind its creation.",
    update: "PRODUCT UPDATES",
    dateCreated: "12 Dec 2023"
  },
  {
    badge: BlogPost,
    bg: "#FAE9FC",
    title: "Introduction to Bridge",
    desc: "Introducing Bridge, its mission, and the reasons behind its creation.",
    update: "SECURITY TIPS",
    dateCreated: "12 Dec 2023"
  },
  {
    badge: BlogPost,
    bg: "#E8F6FF",
    title: "Introduction to Bridge",
    desc: "Introducing Bridge, its mission, and the reasons behind its creation.",
    update: "INDUSTRY NEWS",
    dateCreated: "12 Dec 2023"
  },
  {
    badge: BlogPost,
    bg: "#EDF9F9",
    title: "Introduction to Bridge",
    desc: "Introducing Bridge, its mission, and the reasons behind its creation.",
    update: "PRODUCT UPDATES",
    dateCreated: "12 Dec 2023"
  },
  {
    badge: BlogPost,
    bg: "#FAE9FC",
    title: "Introduction to Bridge",
    desc: "Introducing Bridge, its mission, and the reasons behind its creation.",
    update: "SECURITY TIPS",
    dateCreated: "12 Dec 2023"
  },
  {
    badge: BlogPost,
    bg: "#E8F6FF",
    title: "Introduction to Bridge",
    desc: "Introducing Bridge, its mission, and the reasons behind its creation.",
    update: "INDUSTRY NEWS",
    dateCreated: "12 Dec 2023"
  }
];

function BlogPage() {
  return (
    <section id="why-us" className="w-full relative overflow- py-28">
      <div className="w-full index-content">
        <div className="w-full max-w-4xl text-center mx-auto space-x-5 mb-2">
          <span className="uppercase cursor-pointer text-success">
            All Posts
          </span>
          <span className="uppercase cursor-pointer">Online Security tips</span>
          <span className="uppercase cursor-pointer">Customer Stories</span>
          <span className="uppercase cursor-pointer">Product Updates</span>
          <span className="uppercase cursor-pointer">How-To Guides</span>
          <span className="uppercase cursor-pointer">Industry news</span>
        </div>
        <div className="w-full relative pt-20">
          <div className="flex flex-wrap -mx-3">
            {benefits.map((item) => (
              <div
                className="w-full flex-col mdx2:w-1/3 p-10 mt-16"
                key={item.title}
              >
                <div className="w-full flex-col items-center mt-5 mdx2:mt-0">
                  <Link href="/singlepost">
                    <Image
                      src={item.badge}
                      alt="Delivery image"
                      className="w-full h-auto rounded-xl cursor-pointer"
                    />
                  </Link>

                  <div className="flex justify-between items-center mt-3">
                    <h3 className="text-xs ff-medium text-success cursor-pointer">
                      {item.update}
                    </h3>
                    <p className="text-xs leading-relaxed cursor-pointer">
                      {item.dateCreated}
                    </p>
                  </div>
                </div>
                <div className="mt-5">
                  <h3 className="text-2xl ff-medium mb-4 cursor-pointer">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#939393] cursor-pointer">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Pagination/>
      </div>
    </section>
  );
}

export default BlogPage;
