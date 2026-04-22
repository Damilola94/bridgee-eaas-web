import React from "react";

interface Props {
  post: any;
}

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-NG", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

export default function Hero({ post }: Props) {
  return (
    <section className="w-full pb-10">
      <div className="w-full max-w-5xl mx-auto text-center pt-14 flex flex-col items-start">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-start bg-[#FAE6F0] px-3 py-1 rounded-full text-success my-4">
            <p>{post.category}</p>
          </div>

          <p className="font-bold">
            <span className="text-[#939393]">Published on </span>
            {formatDate(post.date)}
          </p>
        </div>

        <h1 className="ff-bold text-3xl md:text-5xl md:leading-tight text-left">
          {post.title}
        </h1>
      </div>
    </section>
  );
}