"use client"

import Link from "next/link"
import Image from "next/image"

export default function ProgramsPage() {
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
              <li><Link href="/programs" className="hover:text-cyan-300 transition-colors font-bold">HOW TO APPLY</Link></li>
              <li><Link href="/contact" className="hover:text-cyan-300 transition-colors">CONTACT</Link></li>
            </ul>
          </div>
        </nav>
        <div className="text-box absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Our Programs</h1>
        </div>
      </section>

      {/* How to Apply Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white border-l-4 border-blue-600 p-8 shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Apply</h2>
            
            <div className="space-y-4 text-gray-700">
              <p>
                To apply for admission at VisionTech Institute, first review the list of programs we offer and choose the 
                one that matches your career goals.
              </p>
              
              <p>
                Make sure you have all the required documents ready, including a recent passport-sized picture and 
                proof of qualification.
              </p>
              
              <p>
                Then, fill out the online application form with accurate personal, educational, and guardian details. 
                Upload your passport picture and proof of qualification in the designated fields before submitting the 
                form.
              </p>
              
              <p>
                Once submitted, our admissions team will review your application and contact you by email or phone 
                within 3-5 working days.
              </p>
              
              <p className="font-medium">
                Please note that incomplete applications or missing documents may delay processing.
              </p>
            </div>

            <div className="mt-8">
              <Link 
                href="/login" 
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors"
              >
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Programs We Offer */}
      <section className="programs py-20 px-4 bg-gray-50">
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

      <style jsx>{`
        .header {
          min-height: 50vh;
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
