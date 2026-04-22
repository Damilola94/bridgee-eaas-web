"use client";

import React from "react";
import { useRouter } from 'next/router';
import { notFound } from "next/navigation";

import HomepageContextProvider from "../../../context/Homepage";
import useGetQuery from "../../../hooks/useGetQuery";
import Loading from "../../common/Loading";

import Header from "./Header";
import Hero from "./Hero";
import Intro from "./Intro";
import Footer from "./Footer";

export default function Page() {
  const router = useRouter();
  const id = router.query.slug as string;

  const { data, isFetching } = useGetQuery({
    service: "admin-service/api/v1/",
    endpoint: `blog/published/${id}`,
    queryKey: ["blog", id]
  });

  const post = data?.data;

  if (!isFetching && !post) {
    notFound();
  }

  const formattedPost = post && {
    title: post.title,
    content: post.content,
    category: post.categories?.[0]?.name || "Uncategorized",
    date: post.publishedAt || post.createdAt,
    image: post.coverImageUrl,
    buttonText: post.textOnButton || "Get Started",
    buttonLink: "/"
  };

  if (isFetching || !formattedPost) {
    return (
      <Loading message="Loading blog posts..." />
    );
  }

  return (
    <HomepageContextProvider>
      <div className="p-0">

        <Header />

        <main id="top" className="w-full pt-24">
          <Hero post={formattedPost} />
          <Intro post={formattedPost} />
        </main>

        <div className="px-14 pb-10">
          <Footer />
        </div>
      </div>
    </HomepageContextProvider>
  );
}