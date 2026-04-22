/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";

// import { blogPosts } from "../../../utilities/blog-data";

// const categories = [
//   "All Posts",
//   "Product Updates",
//   "Shopping Tips / Consumer Protection",
//   "Safety, Escrow & Online Shopping",
//   "Vendor Growth / Trust Building"
// ];

// export default function BlogPage() {
//   const [activeCategory, setActiveCategory] = useState("All Posts");
//   const [currentPage, setCurrentPage] = useState(1);
//   const postsPerPage = 3;

//   const filteredPosts =
//     activeCategory === "All Posts" ? blogPosts : blogPosts.filter((post) => post.category === activeCategory);

//   const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
//   const startIndex = (currentPage - 1) * postsPerPage;
//   const paginatedPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

//   return (
//     <section id="blog" className="w-full relative overflow-hidden py-28">
//       <div className="w-full index-content max-w-6xl mx-auto px-4">
//         <div className="w-full max-w-4xl text-center mx-auto flex flex-wrap justify-center gap-5 mb-12">
//           {categories.map((cat) => (
//             <button
//               key={cat}
//               onClick={() => {
//                 setActiveCategory(cat);
//                 setCurrentPage(1);
//               }}
//               className={`uppercase text-sm cursor-pointer transition-all duration-300 ${activeCategory === cat
//                 ? "text-success font-semibold border-b-2 border-success pb-1"
//                 : "text-gray-500 hover:text-success"
//               }`}
//             >
//               {cat}
//             </button>
//           ))}
//         </div>

//         <div className="w-full relative pt-10">
//           {paginatedPosts.length === 0 ? (
//             <p className="text-center text-gray-500 text-lg py-20">No posts found.</p>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//               {paginatedPosts.map((item) => (
//                 <div key={item.id} className="flex flex-col">
//                   <Link href={`/blog/${item.slug}`}>
//                     <div className="relative h-48 w-full mb-4 cursor-pointer overflow-hidden rounded-xl">
//                       <Image
//                         src={item.image || "/placeholder.svg"}
//                         alt={item.title}
//                         fill
//                         className="object-cover hover:opacity-90 transition-all duration-300"
//                       />
//                     </div>
//                   </Link>

//                   <div className="flex justify-between items-center mb-3">
//                     <span className="text-xs font-medium text-success bg-[#FAE6F0] px-3 py-1 rounded-full">
//                       {item.category.split(" /")[0]}
//                     </span>
//                     <p className="text-xs text-gray-500">{item.date}</p>
//                   </div>

//                   <h3 className="text-lg font-semibold mb-3 line-clamp-2 hover:text-success transition-colors">
//                     <Link href={`/blog/${item.slug}`}>{item.title}</Link>
//                   </h3>
//                   <p className="text-sm text-gray-600 mb-4 line-clamp-2">{item.description}</p>

//                   <Link
//                     href={`/blog/${item.slug}`}
//                     className="mt-auto inline-block px-4 py-2 bg-success text-white rounded text-sm font-medium hover:opacity-90 transition-opacity"
//                   >
//                     Read More
//                   </Link>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {filteredPosts.length > 0 && totalPages > 1 && (
//           <div className="flex justify-center gap-2 mt-12">
//             {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//               <button
//                 key={page}
//                 onClick={() => setCurrentPage(page)}
//                 className={`px-3 py-2 rounded ${currentPage === page ? "bg-success text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//                 }`}
//               >
//                 {page}
//               </button>
//             ))}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";

import useGetQuery from "../../../hooks/useGetQuery";
import Loading from "../../common/Loading";

const categories = [
  "All Posts",
  "Product Updates",
  "Shopping Tips / Consumer Protection",
  "Safety, Escrow & Online Shopping",
  "Vendor Growth / Trust Building"
];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All Posts");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;

  const { data, isFetching } = useGetQuery({
    service: "admin-service/api/v1/",
    endpoint: "blog/",
    extra: "published",
    queryKey: ["blogs-published"]
  });

  const apiPosts = data?.data || [];

  const blogPosts = apiPosts.map((item: any) => ({
    id: item.id,
    title: item.title,
    slug: item.id,
    image: item.coverImageUrl,
    description: item.blogDescription,
    date: item.publishedAt || item.createdAt,
    category: item.categories?.[0]?.name || "Uncategorized"
  }));

  const filteredPosts =
    activeCategory === "All Posts"
      ? blogPosts
      : blogPosts.filter((post: any) => post.category === activeCategory);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const paginatedPosts = filteredPosts.slice(
    startIndex,
    startIndex + postsPerPage
  );

  return (
    <section id="blog" className="w-full relative overflow-hidden py-28">
      <div className="w-full index-content max-w-6xl mx-auto px-4">

        {/* ✅ Categories */}
        <div className="w-full max-w-4xl text-center mx-auto flex flex-wrap justify-center gap-5 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setCurrentPage(1);
              }}
              className={`uppercase text-sm cursor-pointer transition-all duration-300 ${activeCategory === cat
                  ? "text-success font-semibold border-b-2 border-success pb-1"
                  : "text-gray-500 hover:text-success"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="w-full relative pt-10">
          {isFetching ? (
           <Loading message="Loading blog posts..." />
          ) : paginatedPosts.length === 0 ? (
            <p className="text-center text-gray-500 text-lg py-20">
              No posts found.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedPosts.map((item: any) => (
                <div key={item.id} className="flex flex-col">
                  <Link href={`/blog/${item.slug}`}>
                    <div className="relative h-48 w-full mb-4 cursor-pointer overflow-hidden rounded-xl">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        fill
                        className="object-cover hover:opacity-90 transition-all duration-300"
                      />
                    </div>
                  </Link>

                  {/* Meta */}
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-medium text-success bg-[#FAE6F0] px-3 py-1 rounded-full">
                      {item.category.split(" /")[0]}
                    </span>
                    <p className="text-xs text-gray-500">
                      {moment(item.date).format("MMM DD, YYYY")}
                    </p>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold mb-3 line-clamp-2 hover:text-success transition-colors">
                    <Link href={`/blog/${item.slug}`}>
                      {item.title}
                    </Link>
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {item.description}
                  </p>

                  {/* CTA */}
                  <Link
                    href={`/blog/${item.slug}`}
                    className="mt-auto inline-block px-4 py-2 bg-success text-white rounded text-sm font-medium hover:opacity-90 transition-opacity"
                  >
                    {item.textOnButton || "Read More"}
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ✅ Pagination */}
        {filteredPosts.length > 0 && totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-12">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-2 rounded ${currentPage === page
                      ? "bg-success text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                >
                  {page}
                </button>
              )
            )}
          </div>
        )}
      </div>
    </section>
  );
}