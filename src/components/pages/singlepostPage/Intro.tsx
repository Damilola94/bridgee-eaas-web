import React from "react";
import Image from "next/image";

import SinglePost from "../../../assets/images/single-post.png";

function BlogPage() {
  return (
    <section id="why-us" className="w-full relative overflow- mb-36">
      <div className="w-full index-content">
        <div className="w-full relative pt-5">
          <div className="flex flex-wrap -mx-3">
            <div className="w-full">
              <div className="w-full mdx2:w-full max-w-5xl mx-auto">
                <div className="w-full h-full flex items-center mt-5 mdx2:mt-0">
                  <Image
                    src={SinglePost}
                    alt="Single Post"
                    className="w-full h-auto rounded-xl"
                  />
                </div>
              </div>
              <div className="w-full mdx2:w-full flex items-center max-w-4xl mx-auto mb-12 mt-12 mdx2:mb-0  ">
                <div className="w-full text-center mdx2:text-left pr-5">
                  <h1 className="index-title mb-5">Who We Are</h1>
                  <p className="text-xl leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
                    sed diam nonummy nibh euismod tincidunt ut laoreet dolore
                    magna aliquam erat volutpat. Ut wisi enim ad minim veniam,
                    quis nostrud exerci tation ullamcorper suscipit lobortis
                    nisl ut aliquip ex ea commodo consequat. Duis autem vel eum
                    iriure dolor in hendrerit in vulputate velit esse molestie
                    consequat, vel illum dolore eu feugiat nulla facilisis at
                    vero eros et accumsan et iusto odio dignissim qui blandit
                    praesent luptatum zzril delenit augue duis dolore te feugait
                    nulla facilisi.
                  </p>
                  <br />
                  <p className="text-xl leading-relaxed">
                    <strong>
                      Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
                      sed
                    </strong>
                  </p>
                  <br />
                  <p className="text-xl leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
                    sed diam nonummy nibh euismod tincidunt ut laoreet dolore
                    magna aliquam erat volutpat. Ut wisi enim ad minim veniam,
                    quis nostrud exerci tation ullamcorper suscipit lobortis
                    nisl ut aliquip ex ea commodo consequat. Duis autem vel eum
                    iriure dolor in hendrerit in vulputate velit esse molestie
                    consequat, vel illum dolore eu feugiat nulla facilisis at
                    vero eros et accumsan et iusto odio dignissim qui blandit
                    praesent luptatum zzril delenit augue duis dolore te feugait
                    nulla facilisi.
                  </p>
                  <br />
                  <p className="text-xl leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
                    sed diam nonummy nibh euismod tincidunt ut laoreet dolore
                    magna aliquam erat volutpat. Ut wisi enim ad minim veniam,
                    quis nostrud exerci tation ullamcorper suscipit lobortis
                    nisl ut aliquip ex ea commodo consequat. Duis autem vel eum
                    iriure dolor in hendrerit in vulputate velit esse molestie
                    consequat, vel illum dolore eu feugiat nulla facilisis at
                    vero eros et accumsan et iusto odio dignissim qui blandit
                    praesent luptatum zzril delenit augue duis dolore te feugait
                    nulla facilisi.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BlogPage;
