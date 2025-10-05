"use client";
import React from "react";
import Image from "next/image";
import { useGetAboutQuery } from "@/redux/features/about/aboutApi";
import { motion } from "framer-motion";

export default function AboutMe() {
  const { data: about, isLoading, isError } = useGetAboutQuery(); // pass empty object if required

  if (isLoading) return <p>Loading...</p>;
  if (isError || !about) return <p>Failed to load About info</p>;

  // Fix image URL
  let imageUrl = about.image;
  if (imageUrl) {
    if (imageUrl.includes("http") && imageUrl.includes("portfolio-backend")) {
      const parts = imageUrl.split("http");
      imageUrl = "http" + parts[parts.length - 1];
    }
    imageUrl = imageUrl.replace("i.ibb.co.com", "i.ibb.co");
  }

  return (
    <motion.div
      className="p-6 bg-white rounded shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex flex-col md:flex-row-reverse md:items-center md:gap-6">
        {/* Image Section */}
        {imageUrl && (
          <div className="w-32 h-32 relative mx-auto mt-15 md:mx-0 mb-4 md:mb-0 flex-shrink-0">
            <Image
              src={imageUrl}
              alt={about.name}
              fill
              sizes="(max-width: 768px) 128px, 200px"
              className="object-cover rounded-full"
            />
          </div>
        )}

        {/* Info Section */}
        <div className="text-center md:text-left mt-15">
          <h2 className="text-2xl text-center font-bold mb-2">{about.name}</h2>
          <p className="text-gray-700 mb-2">{about.bio}</p>
          <p className="text-gray-500 mb-2">Email: {about.email}</p>
          {about.contact && <p className="text-gray-500 mb-2">Contact: {about.contact}</p>}

          {about.skills?.length > 0 && (
            <div className="mt-2">
              <h3 className="font-semibold mb-1">Skills:</h3>
              <ul className="flex flex-wrap justify-center md:justify-start gap-2">
                {about.skills.map((skill: string, idx: number) => (
                  <li
                    key={idx}
                    className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
