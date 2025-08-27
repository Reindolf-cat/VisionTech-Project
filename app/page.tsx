"use client"

import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
  return (
    <div>
      {/* Header */}
      <section className="header">
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
        <div className="text-box absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
          <br />
          <p className="text-lg mb-8"><strong>At VisionTech, we don't just teach computers — we empower futures.</strong></p>
          <Link href="/about" className="visit inline-block text-white border border-white px-8 py-3 hover:bg-orange-500 hover:border-orange-500 transition-all">
            Visit Us To Know More
          </Link>
        </div>
      </section>

      {/* Programs */}
      <section className="programs py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Programs We Offer</h1>
          <p className="text-gray-600 mb-12 max-w-4xl mx-auto">
            At VisionTech Computer Training Institute, we offer a wide range of practical, career-focused programs designed to meet the demands of today's fast-evolving tech industry. Our curriculum is tailored to equip students with hands-on skills, real-world knowledge, and certifications that set them apart in the job market.
            <br /><br />
            <i><b>Our programs cover essential areas such as:</b></i>
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="programs-col bg-gray-800 text-white p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-4 text-center">Foundational Courses</h4>
              <ul className="text-left space-y-2">
                <li>• Basic Computer Literacy</li>
                <li>• Microsoft Office Suite</li>
                <li>• Internet & Email Essentials</li>
                <li>• Intro. to Keyboard Skills</li>
              </ul>
            </div>
            <div className="programs-col bg-gray-800 text-white p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-4 text-center">Diploma</h4>
              <ul className="text-left space-y-2">
                <li>• Graphic & Web Design</li>
                <li>• Computer Networking</li>
                <li>• Software Development</li>
                <li>• Cybersecurity</li>
                <li>• Database Management</li>
              </ul>
            </div>
            <div className="programs-col bg-gray-800 text-white p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-4 text-center">Degree</h4>
              <ul className="text-left space-y-2">
                <li>• Advanced Software Engineering</li>
                <li>• Full Stack Web Development</li>
                <li>• Advanced Networking & Security</li>
                <li>• Data Science & Analytics</li>
                <li>• IT Project Management</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Campus */}
      <section className="campus py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Our Campus</h1>
          <p className="text-gray-600 mb-12 max-w-4xl mx-auto">
            Welcome to the VisionTech Computer Training Institute campus — a modern, vibrant, and innovation-driven environment designed to inspire learning, creativity, and professional growth.
            Strategically located in the heart of Ghana, our campus combines cutting-edge technology with a student-centered atmosphere. From fully equipped computer labs and smart classrooms to high-speed internet access and a digital resource center, every corner of VisionTech is built to support 21st-century learning.
            Our campus is more than just a place to study — it's a dynamic community where ideas are born, skills are sharpened, and futures are shaped. Students benefit from interactive workshops, mentorship, group projects, and career guidance — all within a safe, inclusive, and forward-thinking setting.
            <br />At VisionTech, we don't just train — we transform.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="campus-col">
              <Image src="/campus3.jpeg" alt="Campus" width={400} height={300} className="w-full rounded-lg" />
            </div>
            <div className="campus-col">
              <Image src="/campus1.jpeg" alt="Campus" width={400} height={300} className="w-full rounded-lg" />
            </div>
            <div className="campus-col">
              <Image src="/campus.jpeg" alt="Campus" width={400} height={300} className="w-full rounded-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="facilities py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Our Facilities</h1>
          <p className="text-gray-600 mb-12 max-w-4xl mx-auto">
            At VisionTech, we provide top-tier facilities that create the perfect environment for hands-on, technology-driven learning.
            <br />Our campus features modern computer labs, smart classrooms, high-speed internet, a digital resource center, and a comfortable student lounge — all designed to support academic excellence and innovation.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="facilities-col text-left">
              <Image src="/facilities.jpg" alt="Lecture Halls" width={400} height={300} className="w-full rounded-lg mb-4" />
              <h4 className="text-xl font-semibold mb-2">Lecture Halls</h4>
              <p className="text-gray-600">VisionTech's classrooms are designed for interactive and engaging learning. Each room is equipped with modern teaching aids, projectors, whiteboards, and comfortable seating to create a focused, student-friendly environment. With small class sizes, every learner gets the attention and support they need to succeed.</p>
            </div>
            <div className="facilities-col text-left">
              <Image src="/compl.jpg" alt="Computer Library" width={400} height={300} className="w-full rounded-lg mb-4" />
              <h4 className="text-xl font-semibold mb-2">Computer Library</h4>
              <p className="text-gray-600">Our Computer Library at VisionTech is a quiet, tech-enhanced space where students can research, study, and access digital resources. Equipped with connected computers, e-books, academic software, and online databases, the library supports both independent learning and group collaboration. <br /> It's the perfect place to deepen your knowledge beyond the classroom.</p>
            </div>
            <div className="facilities-col text-left">
              <Image src="/conf1.png" alt="Conference Room" width={400} height={300} className="w-full rounded-lg mb-4" />
              <h4 className="text-xl font-semibold mb-2">Conference Room</h4>
              <p className="text-gray-600">Our Conference Room at VisionTech is a fully equipped space designed for meetings, presentations, and academic discussions. With modern audiovisual equipment, comfortable seating, and a professional setting, it serves as the hub for staff meetings, student workshops, guest lectures, and collaborative events. It's where ideas are shared, strategies are shaped, and innovation takes center stage.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">What Our Students Say</h1>
          <p className="text-gray-600 mb-12 max-w-4xl mx-auto">
            At VisionTech Institute, we believe our students' success is the true measure of our impact. Hear directly from our graduates and current learners about how VisionTech has helped them grow, gain in-demand skills, and achieve their career goals. Their journeys inspire everything we do.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="testimonials-col bg-gray-800 text-white p-6 rounded-lg flex items-start space-x-4">
              <Image src="/std1.jpg" alt="Jane Oppong" width={60} height={60} className="rounded-full" />
              <div className="text-left">
                <p className="italic mb-4">
                  "Before I joined VisionTech, I had never touched a computer. Today, I can confidently design websites, manage networks, and even assist others with tech issues. The instructors are patient, highly knowledgeable, and genuinely care about your progress. The learning environment is modern and supportive, and I felt motivated every step of the way. VisionTech didn't just teach me skills — it changed my life."
                </p>
                <h4 className="font-semibold">Jane Oppong</h4>
              </div>
            </div>
            <div className="testimonials-col bg-gray-800 text-white p-6 rounded-lg flex items-start space-x-4">
              <Image src="/std2.jpg" alt="Smith Opoku" width={60} height={60} className="rounded-full" />
              <div className="text-left">
                <p className="italic mb-4">
                  "VisionTech was a turning point in my life. I enrolled in the Software Development diploma program with zero coding experience, but the practical training and mentorship I received gave me the confidence to build real applications. The instructors push you to be your best, and the campus environment makes learning enjoyable. Today, I'm working as a junior developer — all thanks to VisionTech."
                </p>
                <h4 className="font-semibold">Smith Opoku</h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta py-20 px-4 bg-cover bg-center" style={{backgroundImage: "url('/contact-us.jpg')"}}>
        <div className="max-w-2xl mx-auto text-center bg-black bg-opacity-50 p-8 rounded-lg">
          <h1 className="text-3xl font-bold text-white mb-8">Get In Touch</h1>
          <Link href="/contact" className="visit inline-block text-white border border-white px-8 py-3 hover:bg-orange-500 hover:border-orange-500 transition-all">
            CONTACT US
          </Link>
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
        .header {
          min-height: 100vh;
          width: 100%;
          background-image: linear-gradient(rgba(4, 9, 30, 0.7), rgba(4, 9, 30, 0.7)), url('/lab.png');
          background-position: center;
          background-size: cover;
          position: relative;
        }
        .programs-col:hover {
          box-shadow: 0 0 20px 0px rgb(6, 107, 209);
        }
      `}</style>
    </div>
  )
}
