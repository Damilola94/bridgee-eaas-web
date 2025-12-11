import React from "react";

import { BlogPost } from "../../../utilities/blog-data";

interface SingleBlogPageProps {
  post: BlogPost
}

export default function Hero({ post }: SingleBlogPageProps) {
  return (
    <section className="w-full relative overflow- pb-10">
      <div className="w-full relative header-content overflow-visible">
        <div className="w-full max-w-5xl mx-auto text-center pt-14 flex flex-col items-start justify-start">
          <div className="flex justify-between items-center w-full">
            <div className="flex items-start  p-1 bg-[#FAE6F0] px-3 py-1  rounded-full w-fit text-success my-4 justify-start">
              <p>{post.category}</p>
            </div>
            <p className="font-bold"><span className="text-[#939393]">Published on </span>{post.date}</p>
          </div>
          <h1 className="text-bold ff-bold text-3xl sm:text-3xl md:text-5xl md:leading-tight text-left">
            {post.title}
          </h1>
        </div>
      </div>
    </section>
  );
}
