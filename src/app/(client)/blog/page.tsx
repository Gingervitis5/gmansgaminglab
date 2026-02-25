import Container from "@/components/Container";
import { Title } from "@/components/ui/text";
import { urlFor } from "@/sanity/lib/image";
import { getAllBlogs } from "@/sanity/queries";
import dayjs from "dayjs";
import { Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BlogPage = async () => {
  const blogs = await getAllBlogs(6);

  return (
    <div>
      <Container>
        <Title>Blogs</Title>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5 md:mt-10">
          {blogs?.map((blog) => (
            <div key={blog?._id} className="overflow-hidden group border-shop_light_blue border-2 rounded-md">
              {blog?.mainImage && (
                <Image
                  src={urlFor(blog?.mainImage).url()}
                  alt="blogImage"
                  width={500}
                  height={500}
                  className="w-full max-h-80 object-cover rounded-md"
                />
              )}
              <div className="tracking-wide p-5 text-shop_light_blue rounded-b-md bg-shop_darkest">
                <div className="flex text-lg items-center gap-5">
                  <div className="flex items-center relative group cursor-pointer">
                    {blog?.blogcategories?.map((item, index) => (
                      <p
                        key={index}
                        className="tracking-wider font-extralight"
                      >
                        {item?.title}
                      </p>
                    ))}
                    <span className="absolute left-0 -bottom-1.5 bg-lightColor/30 inline-block w-full h-2 group-hover:bg-shop_dark_green hover:cursor-pointer hoverEffect" />
                  </div>
                  <p className="flex items-center gap-1 text-lightColor relative group hover:cursor-pointer hover:text-shop_dark_green hoverEffect">
                    <Calendar size={15} />{" "}
                    {dayjs(blog.publishedAt).format("MMMM D, YYYY")}
                    <span className="absolute left-0 -bottom-1.5 bg-lightColor/30 inline-block w-full h-2 group-hover:bg-shop_dark_green hoverEffect" />
                  </p>
                </div>
                <Link
                  href={`/blog/${blog?.slug?.current}`}
                  className="text-3xl font-extralight tracking-wider mt-5 line-clamp-2 hover:text-shop_dark_green hoverEffect"
                >
                  {blog?.title}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default BlogPage;