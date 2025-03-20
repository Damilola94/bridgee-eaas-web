"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// eslint-disable-next-line no-duplicate-imports
import type { StaticImageData } from "next/image";

import jerryPetersImage from "../../../assets/images/jerry-peters.png";
import moyinoluwaAkindeleImage from "../../../assets/images/moyinoluwa-akindele.png";
import victorOnwueluImage from "../../../assets/images/victor-onwuelu.png";
import oluwafisayoAdesinaImage from "../../../assets/images/oluwafisayo-adesina.png";

interface TeamMember {
  name: string;
  role: string;
  image: StaticImageData;
}

export default function TeamSection() {
  const teamMembers: TeamMember[] = [
    {
      name: "Jerry Peters",
      role: "Chief Executive Officer",
      image: jerryPetersImage
    },
    {
      name: "Moyinoluwa Akindele",
      role: "Operations",
      image: moyinoluwaAkindeleImage
    },
    {
      name: "Victor Onwuelu",
      role: "Design",
      image: victorOnwueluImage
    },
    {
      name: "Oluwafisayo Adesina",
      role: "Marketing",
      image: oluwafisayoAdesinaImage
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="py-16 bg-[#faeafa]">
      <div className="container mx-auto px-4">
        <div className="mx-auto p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-5xl font-bold text-gray-900 mb-6">
                The Team
              </h2>
            </div>
            <div>
              <p className="text-gray-700 text-lg mb-6">
                We are a team of tech eggheads who understand the challenges
                faced by buyers in today&apos;s fast-paced digital marketplace,
                where scams and fraudulent activities are becoming increasingly
                common. At the heart of Bridge is our innovative platform, which
                acts as a trusted intermediary (escrow) during transactions.
              </p>
            </div>
          </div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className=" transition-shadow duration-300"
                variants={itemVariants}
              >
                <div className="aspect-square relative">
                  <Image
                    src={member.image}
                    alt={member.name}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}
