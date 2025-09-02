"use client"

import Link from "next/link"
import Image from "next/image"

export default function AboutPage() {
    return (
        <div>
            {/* Header */}
            <section className="sub-header">
                <nav className="flex justify-between items-center p-8 lg:px-16">
                    <Image src="/logo3.png" alt="VisionTech Logo" width={150} height={50} />
                    <div className="nav-links">
                        <ul className="flex space-x-8 text-white">
                            <li><Link href="/" className="hover:text-cyan-300 transition-colors">HOME</Link></li>
                            <li><Link href="/about" className="hover:text-cyan-300 transition-colors">ABOUT</Link></li>
                            <li><Link href="/programs" className="hover:text-cyan-300 transition-colors">HOW TO APPLY</Link></li>
                            <li><Link href="/contact" className="hover:text-cyan-300 transition-colors">CONTACT</Link></li>
                        </ul>
                    </div>
                </nav>
                <div className="text-center py-16">
                    <h2 className="text-4xl font-bold text-white">About Us</h2>
                </div>
            </section>

            {/* About Us Content */}
            <section className="about-us py-20 px-4">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold mb-8">Institute History</h1>
                    <div className="space-y-6 text-gray-700">
                        <p>
                            VisionTech Institute was founded in 2018 by a group of passionate educators and IT professionals who saw a growing need for practical, career-focused technology training in the region. Led by Mr. Samuel Owusu, a veteran in ICT education, the institute began with a single classroom, a few computers, and a bold vision: to empower youth and professionals with the digital skills needed to succeed in a fast-changing world.
                        </p>
                        <p>
                            In our first year, we launched with just 20 students, offering short courses in basic computing, Microsoft Office, and internet literacy. The response was overwhelmingly positive, and by 2020, we expanded to include programs in graphic design, web development, and hardware engineering.
                        </p>
                        <p>
                            Despite challenges brought by the global pandemic in 2020, VisionTech adapted quickly — introducing online learning and blended classes, making tech education more accessible than ever before.
                        </p>
                        <p>
                            By 2022, we had trained over 1,000 students, built partnerships with local businesses for internships, and added new tracks in cybersecurity, networking, and mobile app development. We also held our first graduation ceremony, celebrating students who had gone on to launch startups, gain employment, or continue advanced studies.
                        </p>
                        <p>
                            Today, VisionTech Institute stands as a respected name in practical ICT education. With modern labs, certified instructors, and an ever-evolving curriculum, we continue to bridge the gap between learning and industry — one student at a time.
                        </p>
                    </div>

                    <div className="mt-16">
                        <h1 className="text-3xl font-bold mb-8">Vision and Mission Statements</h1>

                        <div className="mb-12">
                            <h2 className="text-2xl font-semibold mb-4 text-blue-600">Vision</h2>
                            <p className="text-gray-700">
                                At VisionTech Institute, we envision a future where every individual has access to transformative technology education that unlocks their full potential. We strive to become a recognized leader in digital training and innovation, producing graduates who are not only job-ready but also capable of driving positive change in their communities. Our goal is to bridge the digital divide by providing education that is practical, relevant, and future-focused — creating a generation of thinkers, creators, and leaders empowered through technology.
                            </p>
                        </div>

                        <div className="mb-12">
                            <h2 className="text-2xl font-semibold mb-4 text-blue-600">Mission</h2>
                            <p className="text-gray-700">
                                Our mission at VisionTech Institute is to deliver practical, high-quality technology education that equips students with the skills, confidence, and mindset needed to succeed in today's digital world. We are committed to creating a hands-on, learner-centered environment where innovation, creativity, and critical thinking are encouraged. By combining expert instruction, real-world projects, and industry-relevant programs, we aim to bridge the gap between education and employment — empowering individuals to build meaningful, future-ready careers.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold mb-6 text-blue-600">Our Core Values</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h3 className="text-lg font-semibold mb-2 text-gray-800">Excellence</h3>
                                    <p className="text-gray-600">We strive for the highest standards in teaching, learning, and service delivery.</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h3 className="text-lg font-semibold mb-2 text-gray-800">Innovation</h3>
                                    <p className="text-gray-600">We embrace change, technology, and creative thinking to solve real-world challenges.</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h3 className="text-lg font-semibold mb-2 text-gray-800">Integrity</h3>
                                    <p className="text-gray-600">We equip our students with the knowledge, skills, and confidence to lead and succeed.</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h3 className="text-lg font-semibold mb-2 text-gray-800">Accessibility</h3>
                                    <p className="text-gray-600">We believe education should be inclusive and available to all, regardless of background.</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h3 className="text-lg font-semibold mb-2 text-gray-800">Lifelong Learning</h3>
                                    <p className="text-gray-600">We promote continuous growth and learning beyond the classroom.</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h3 className="text-lg font-semibold mb-2 text-gray-800">Community Impact</h3>
                                    <p className="text-gray-600">We are committed to making a positive difference in our communities through education and skills development.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer bg-gray-900 text-white py-12 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h4 className="text-xl font-semibold mb-4">About us</h4>
                    <p className="text-gray-300 mb-6">
                        VisionTech Institute is a forward-thinking educational institution dedicated to empowering individuals with cutting-edge technical and professional skills. Our mission is to bridge the gap between education and industry by providing practical, hands-on training in today's most in-demand fields—ranging from information technology and digital marketing to business management and beyond.
                        <br /><br />
                        With a team of experienced instructors, industry-aligned curriculum, and a learner-centered approach, we equip our students not just with knowledge, but with the confidence and real-world expertise to thrive in a competitive job market. At VisionTech, your future is our focus.
                    </p>
                    <div className="about text-gray-300">
                        Email: visiontechinst@gmail.com
                        <br />Tel: +233 546 83 6583/+233 244 46 5000
                    </div>
                </div>
            </footer>

            <style jsx global>{`
        .sub-header {
          min-height: 50vh;
          width: 100%;
          background-image: linear-gradient(rgba(4, 9, 30, 0.7), rgba(4, 9, 30, 0.7)), url('/lab.png');
          background-position: center;
          background-size: cover;
          position: relative;
        }
      `}</style>
        </div>
    )
}