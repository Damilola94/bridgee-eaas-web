"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Button from "../../inputs/Button";

interface Props {
  post: any;
}

export default function Intro({ post }: Props) {
  const router = useRouter();

  return (
    <section className="w-full mb-36">
      <div className="max-w-4xl mx-auto px-4">
        <Link href="/blog" className="text-success hover:underline mb-6 inline-block">
          ← Back to Blog
        </Link>

        <div className="w-full h-80 relative mb-8 rounded-xl overflow-hidden">
          <Image
            src={post.image || "/placeholder.svg"}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>

        <h1 className="text-4xl font-bold mb-6">{post.title}</h1>

        <div className="prose prose-lg max-w-none mb-12">
          {post.content.split("\n\n").map((paragraph: string, index: number) => {
            if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
              return (
                <h2 key={index} className="text-2xl font-semibold mt-8 mb-4">
                  {paragraph.replace(/\*\*/g, "")}
                </h2>
              );
            }

            return (
              <p key={index} className="text-lg leading-relaxed mb-4">
                {paragraph}
              </p>
            );
          })}
        </div>

        <div className="bg-blue-50 p-6 rounded-lg mt-12">
          <p className="text-center text-gray-700 mb-4">
            Ready to experience safe online trading?
          </p>

          <div className="flex justify-center">
            <Button
              className="text-lg ff-bold !rounded-md w-fit"
              paddingY="p-3.5"
              onClick={() => router.push(post.buttonLink)}
            >
              {post.buttonText}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}