import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import dayjs from "dayjs";
import { Title } from './ui/text';
import { getLatestBlogs } from '@/sanity/queries';
import { urlFor } from '@/sanity/lib/image';
import { Calendar } from 'lucide-react';


const LatestBlog = async() => {
    const blogs = await getLatestBlogs();
  return (
    <div className="mb-10 lg:mb-20">
        <Title>
            Latest Blogs
        </Title>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-2">
            {blogs?.map((blog) => 
                <div key={blog?._id}>
                    {blog.mainImage && (
                        <Link
                            href={`/blog/${blog?.slug?.current}`}
                        >
                            <Image 
                                src={urlFor(blog?.mainImage).url()}
                                alt="blogImage"
                                width={550}
                                height={550}
                                className="w-full max-h-80 object-cover border-r-2 border-l-2 border-t-2 border-shop_light_blue rounded-t-2xl"
                            /> 
                        </Link>
                    )}
                    <div className="bg-shop_darkest border-r-2 border-l-2 border-b-2 border-shop_light_blue p-6 rounded-b-2xl">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center relative group cursor-pointer">
                                {blog?.blogcategories?.map((item,index) => (
                                    <p key={index} className="mb-0 font-extralight text-shop_light_blue tracking-wider">
                                        {item.title}
                                    </p>
                                ))}
                            </div>
                            <div className="flex items-center gap-1 font-extralight text-shop_light_blue relative group hover:cursor-pointer">
                                <Calendar size={15} />{" "}
                                {dayjs(blog.publishedAt).format("MMMM D, YYYY")}
                            </div>
                        </div>
                        <Link
                            href={`/blog/${blog?.slug?.current}`}
                            className="text-2xl text-shop_light_blue tracking-wider mt-2 line-clamp-2 hover:text-shop_white"
                        >
                            {blog?.title}
                        </Link>
                    </div>
                </div>
            )}
        </div>
    </div>
  );
};

export default LatestBlog