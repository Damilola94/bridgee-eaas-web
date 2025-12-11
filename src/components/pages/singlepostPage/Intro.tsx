"use client";
import Image from "next/image";
import Link from "next/link";

import { useRouter } from "next/router";

import type { BlogPost } from "../../../utilities/blog-data";
import Button from "../../inputs/Button";

interface SingleBlogPageProps {
  post: BlogPost
}

export default function SingleBlogPage({ post }: SingleBlogPageProps) {
  const router = useRouter();
  return (
    <section id="single-blog" className="w-full relative overflow-hidden mb-36">
      <div className="w-full index-content max-w-4xl mx-auto px-4">
        <Link href="/blog" className="text-success hover:underline mb-6 inline-block">
          ← Back to Blog
        </Link>

        <div className="w-full relative pt-5">
          <div className="flex flex-wrap">
            <div className="w-full">
              <div className="w-full">
                <div className="w-full h-80 relative mb-8 rounded-xl overflow-hidden">
                  <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                </div>

                <div className="flex justify-between items-center mb-6">
                  <span className="text-sm font-medium text-success bg-[#FAE6F0] px-4 py-2 rounded-full">
                    {post.category}
                  </span>
                  <p className="text-sm text-gray-500">{post.date}</p>
                </div>

                <h1 className="text-4xl font-bold mb-8">{post.title}</h1>
              </div>

              <div className="w-full max-w-4xl mx-auto mb-12">
                <div className="prose prose-lg max-w-none">
                  {post.content.split("\n\n").map((paragraph, index) => {
                    if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
                      return (
                        <h2 key={index} className="text-2xl font-semibold mt-8 mb-4">
                          {paragraph.replace(/\*\*/g, "")}
                        </h2>
                      );
                    }
                    if (paragraph.startsWith("•")) {
                      return (
                        <ul key={index} className="list-disc list-inside space-y-2 mb-4">
                          {paragraph.split("\n").map((bullet, i) => (
                            <li key={i} className="text-lg leading-relaxed">
                              {bullet.replace("• ", "")}
                            </li>
                          ))}
                        </ul>
                      );
                    }
                    return (
                      <p key={index} className="text-lg leading-relaxed mb-4">
                        {paragraph}
                      </p>
                    );
                  })}
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg mt-12">
                <p className="text-center text-gray-700 mb-4">Ready to experience safe online trading?</p>
                <div className="flex justify-center">
                  <Button
                    className="text-lg ff-bold !rounded-md mdx2:!rounded-xl w-fit"
                    paddingY="p-3.5"
                    type="submit"
                    onClick={() => router.push(`${post.buttonLink}`)}

                  >
                    {post.buttonText}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
