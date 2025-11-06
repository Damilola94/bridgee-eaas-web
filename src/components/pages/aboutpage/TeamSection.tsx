/* eslint-disable no-irregular-whitespace */
/* eslint-disable comma-dangle */
"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// eslint-disable-next-line no-duplicate-imports
import type { StaticImageData } from "next/image";

import moyinoluwaAkindeleImage from "../../../assets/images/moyinoluwa-akindele.png";
import ceo from "../../../assets/images/sophy-ceo.png";
import fisayo from "../../../assets/images/fisayo.png";
import jacinta from "../../../assets/images/jacinta.png";
interface TeamMember {
  name: string;
  role: string;
  image: StaticImageData;
}

export default function TeamSection() {
  const teamMembers: TeamMember[] = [
    {
      name: "Sophiya Sadiq",
      role: "Co-Founder/CEO",
      image: ceo,
    },
    {
      name: "Moyinoluwa Akindele",
      role: "Head of product",
      image: moyinoluwaAkindeleImage,
    },
    {
      name: "Jacinta Ijeoma Emeka",
      role: "Visual Brand Storyteller",
      image: jacinta,
    },
    {
      name: "Oluwafisayo Adesina",
      role: "Growth and Marketing",
      image: fisayo,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="mx-auto p-8">
          <div className="w-full my-10">
            <div>
              <h2 className="text-5xl font-bold text-gray-900 mb-6">
                The Team
              </h2>
            </div>
            <div>
              <p className="text-gray-700 text-lg mb-6 text-leading-relaxed text-justify">
               Bridgee is powered by a founding team built for this specific challenge: merging deep financial regulatory expertise with digital agility and massive growth strategies. Our core comprises a previous Startup Head of Operations, bringing crucial experience in building and scaling complex platforms; an MTN Digital Marketer, who understands how to drive high-volume user acquisition in the African mobile ecosystem; a Head of Products from the banking sector, ensuring we have deep compliance and financial product knowledge necessary for the Wema Bank partnership; and a seasoned Brand Storyteller, dedicated to building the market narrative of trust and reliability. This blend of operational excellence, regulatory insight, and marketing horsepower is designed to successfully build and scale Bridgee into the dominant digital escrow provider.
              </p>
            </div>
          </div>
          <motion.div
            className="mt-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* First row - 4 items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {teamMembers.slice(0, 5).map((member, index) => (
                <motion.div
                  key={index}
                  className="transition-shadow duration-300"
                  variants={itemVariants}
                >
                  <div className="w-full h-[280px] relative rounded-lg overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      sizes=""
                      className="object-cover w-full h-full object-top"
                      priority={index < 2}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-xl text-gray-900">
                      {member.name}
                    </h3>
                    <p className="text-gray-600 text-base">{member.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Second row - 3 items centered */}
            {/* {teamMembers.length > 4 && (
              <div className="xl:flex xl:justify-center ">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
                  {teamMembers.slice(4, 7).map((member, index) => (
                    <motion.div
                      key={index + 4}
                      className="transition-shadow duration-300"
                      variants={itemVariants}
                    >
                      <div className="aspect-square relative">
                        <Image
                          src={member.image}
                          alt={member.name}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className="object-cover"
                          priority={false}
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-xl text-gray-900">
                          {member.name}
                        </h3>
                        <p className="text-gray-600 text-base">{member.role}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )} */}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
