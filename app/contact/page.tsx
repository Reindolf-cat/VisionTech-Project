"use client"

import Link from "next/link"
import Image from "next/image"

export default function ContactPage() {
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
                    <h2 className="text-4xl font-bold text-white">You can contact us through:</h2>
                </div>
            </section>

            {/* Contact Us Content */}
            <section className="contact-us py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Contact Information */}
                        <div className="contact-col space-y-8">
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <h5 className="text-xl font-semibold mb-3 text-blue-600">Location:</h5>
                                <p className="text-gray-700">
                                    VisionTech Institute<br />
                                    123 Tech Avenue, Accra, Ghana<br />
                                    (Landmark: Near Central ICT Hub)
                                </p>
                            </div>

                            <div className="bg-gray-50 p-6 rounded-lg">
                                <h5 className="text-xl font-semibold mb-3 text-blue-600">Phone:</h5>
                                <p className="text-gray-700">
                                    +233 20 123 4567<br />
                                    +233 55 987 6543
                                </p>
                            </div>

                            <div className="bg-gray-50 p-6 rounded-lg">
                                <h5 className="text-xl font-semibold mb-3 text-blue-600">Email:</h5>
                                <p className="text-gray-700">
                                    info@visiontech.edu.gh<br />
                                    admissions@visiontech.edu.gh
                                </p>
                            </div>

                            <div className="bg-gray-50 p-6 rounded-lg">
                                <h5 className="text-xl font-semibold mb-3 text-blue-600">Opening Hours:</h5>
                                <p className="text-gray-700">
                                    Monday – Friday: 8:00 AM – 5:00 PM<br />
                                    Saturday: 9:00 AM – 2:00 PM<br />
                                    Sunday: Closed
                                </p>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="contact-col">
                            <div className="bg-white p-8 rounded-lg shadow-lg">
                                <h3 className="text-2xl font-semibold mb-6 text-center">Send us a Message</h3>
                                <div className="space-y-4">
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Enter your name"
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                    />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Enter email address"
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                    />
                                    <input
                                        type="text"
                                        name="subject"
                                        placeholder="Enter your Subject"
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                    />
                                    <textarea
                                        name="message"
                                        rows={6}
                                        placeholder="Message"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                                    ></textarea>
                                    <button
                                        type="submit"
                                        className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                                    >
                                        Send Message
                                    </button>
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
          background-image: linear-gradient(rgba(4, 9, 30, 0.7), rgba(4, 9, 30, 0.7)), url('/contact-us.jpg');
          background-position: center;
          background-size: cover;
          position: relative;
        }
      `}</style>
        </div>
    )
}