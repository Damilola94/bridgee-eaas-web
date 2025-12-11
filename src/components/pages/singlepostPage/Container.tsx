import React from "react";
import { notFound } from "next/navigation";

import HomepageContextProvider from "../../../context/Homepage";

import { blogPosts, getBlogBySlug } from "../../../utilities/blog-data";

import Header from "./Header";
import Hero from "./Hero";
import Footer from "./Footer";
import Intro from "./Intro";

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getBlogBySlug(params.slug);

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The blog post you're looking for does not exist."
    };
  }

  return {
    title: `${post.title} | Bridgee Blog`,
    description: post.description
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  const post = getBlogBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <HomepageContextProvider>
      <div className="p-0">
        <Header />

        <main id="top" className="w-full pt-24">
          <Hero post={post}/>
          <Intro post={post} />
        </main>

        <div className="px-14 pb-10">
          <Footer />
        </div>
      </div>
    </HomepageContextProvider>
  );
}
