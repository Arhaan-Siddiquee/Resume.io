import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import example from "../assets/example.png";
import preview from "../assets/atspreview.gif";

const Resumeio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState('Jake Ryan');
  
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };
  
  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight - 100;
        if (isVisible) {
          el.classList.add('animate-fade-in');
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const templates = [
    { id: 1, name: 'Jake Ryan', preview: '/api/placeholder/180/240' },
    { id: 2, name: 'Professional', preview: '/api/placeholder/180/240' },
    { id: 3, name: 'Academic', preview: '/api/placeholder/180/240' },
    { id: 4, name: 'Minimal', preview: '/api/placeholder/180/240' },
  ];

  const features = [
    { title: 'Real-time Preview', description: 'See changes instantly as you type' },
    { title: 'LaTeX Support', description: 'Full LaTeX syntax with custom commands' },
    { title: 'Export Options', description: 'Download as PDF, PNG or LaTeX source' },
    { title: 'Pre-built Templates', description: 'Professional templates for any career' },
    { title: 'Collaborative Editing', description: 'Share and collaborate on resumes' },
    { title: 'Version History', description: 'Track changes and restore previous versions' },
  ];

  const testimonials = [
    {
      text: "Resume.io transformed my job search. The LaTeX templates are professional and easy to customize.",
      author: "Emma T., Software Engineer"
    },
    {
      text: "As a hiring manager, I can spot a Resume.io resume immediately. They're clean, professional, and stand out.",
      author: "Marcus L., HR Director"
    },
    {
      text: "The side-by-side editor made learning LaTeX so much easier. I landed my dream job with my first custom resume!",
      author: "Priya K., Data Scientist"
    }
  ];

  const editorCode = `\\documentclass{article}
\\usepackage{geometry}
\\usepackage{titlesec}
\\usepackage{enumitem}

\\begin{document}
\\centerline{\\LARGE \\textbf{Jake Ryan}}
\\centerline{\\small 123 Resume St. | San Francisco, CA | jake@example.com | (555) 123-4567}

\\section*{EXPERIENCE}
\\textbf{Senior Software Engineer} \\hfill Jan 2020 - Present
\\textit{TechCorp, San Francisco, CA}
\\begin{itemize}[leftmargin=*, nosep]
  \\item Led development of company's flagship product increasing user engagement by 45\\%
  \\item Implemented CI/CD pipeline reducing deployment time by 60\\%
\\end{itemize}

\\end{document}`;

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Navigation */}
      <nav className="border-b border-gray-800 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-xl font-bold">Resume.io</span>
              </div>
              <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
                <a href="#features" className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white">Features</a>
                <a href="#templates" className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white">Templates</a>
                <a href="#editor" className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white">Editor</a>
              </div>
            </div>
            <div className="flex items-center">
              <div className="-mr-2 flex md:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                >
                  <span className="sr-only">Open main menu</span>
                  {isMenuOpen ? (
                    <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#features" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700">Features</a>
              <a href="#templates" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700">Templates</a>
              <a href="#editor" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700">Editor</a>
            </div>
            <div className="pt-4 pb-3 border-t border-gray-700">
              <div className="flex items-center px-5">
                <div className="px-2 flex items-center">
                  <button className="block w-full px-4 py-2 text-center text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-500">
                    Sign Up Free
                  </button>
                </div>
                <div className="px-2 flex items-center mt-3">
                  <button className="block w-full px-4 py-2 text-center text-sm font-medium text-white bg-gray-800 rounded-md hover:bg-gray-700">
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl mb-6">
              Create Perfect LaTeX Resumes <span className="text-indigo-500">Without the Hassle</span> and Enhance For ATS
            </h1>
            <p className="max-w-xl mx-auto text-xl text-gray-300">
              Professional resume templates with a powerful side-by-side LaTeX editor. Edit and download your resume in minutes.
            </p>
            <div className="mt-10 flex justify-center">
              <button className="bg-indigo-600 px-8 py-3 text-lg font-medium rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-4">
                <a href="/#/latex">Try Editor Now</a>
              </button>
            </div>  
          </motion.div>
        </div>
        
        {/* Hero Image */}
        <motion.div 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <div className="rounded-lg shadow-2xl overflow-hidden bg-gray-800 border border-gray-700">
            <div className="flex items-center justify-start px-4 py-2 bg-gray-900">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="ml-4 text-gray-400 text-sm">Resume.io LaTeX Editor</div>
            </div>
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/2 bg-gray-900 p-4 font-mono text-sm text-gray-300 overflow-auto" style={{ maxHeight: '400px' }}>
                <pre className="whitespace-pre-wrap">{editorCode}</pre>
              </div>
              <div className="w-full md:w-1/2 p-4 bg-white flex justify-center items-center">
                <img src={example} alt="Resume Preview" className="shadow-lg shadow-black " />
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-gray-800 animate-on-scroll">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold sm:text-4xl">
              Powerful LaTeX Resume Features
            </h2>
            <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
              Everything you need to create professional resumes quickly and efficiently
            </p>
          </div>

          <motion.div 
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index} 
                className="bg-gray-900 rounded-lg px-6 py-8 border border-gray-700 hover:border-indigo-500 transition-all duration-300"
                variants={fadeIn}
              >
                <div className="text-indigo-400 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Templates Showcase */}
      <section id="templates" className="py-16 animate-on-scroll">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16">
      <h2 className="text-3xl font-extrabold sm:text-4xl">
        Enhance your Resume
      </h2>
      <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
        Boost your resume with ATS-friendly optimization to ensure you get noticed.
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div 
        className={`p-6 rounded-lg cursor-pointer transition-all duration-300 transform hover:scale-105 bg-gray-800 border border-gray-700 hover:border-indigo-400`}
      >
        <div className="h-12 mb-4 flex items-center justify-center">
          <svg className="w-10 h-10 text-indigo-400 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <h3 className="text-center font-medium text-lg mb-2">Get ATS Score</h3>
        <p className="text-gray-400 text-sm text-center">Calculate how well your resume might perform in ATS systems</p>
      </div>

      <div 
        className={`p-6 rounded-lg cursor-pointer transition-all duration-300 transform hover:scale-105 bg-gray-800 border border-gray-700 hover:border-indigo-400`}
      >
        <div className="h-12 mb-4 flex items-center justify-center">
          <svg className="w-10 h-10 text-indigo-400 transition-all duration-500 hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
        </div>
        <h3 className="text-center font-medium text-lg mb-2 group-hover:text-indigo-300 transition-colors duration-300">ATS Enhancer</h3>
        <p className="text-gray-400 text-sm text-center">Get specific suggestions to make your resume more ATS-friendly</p>
      </div>

      <div 
        className={`p-6 rounded-lg cursor-pointer transition-all duration-300 transform hover:scale-105 bg-gray-800 border border-gray-700 hover:border-indigo-400`}
      >
        <div className="h-12 mb-4 flex items-center justify-center overflow-hidden">
          <svg className="w-10 h-10 text-indigo-400 hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-center font-medium text-lg mb-2">Resume Feedback</h3>
        <p className="text-gray-400 text-sm text-center">Receive detailed feedback on each section of your resume</p>
      </div>

      <div 
        className={`p-6 rounded-lg cursor-pointer transition-all duration-300 transform hover:scale-105 bg-gray-800 border border-gray-700 hover:border-indigo-400`}
      >
        <div className="h-12 mb-4 flex items-center justify-center">
          <svg className="w-10 h-10 text-indigo-400 transition-transform duration-500 hover:scale-125" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h3 className="text-center font-medium text-lg mb-2">Match Keywords</h3>
        <p className="text-gray-400 text-sm text-center">See how your resume keywords match with the job description</p>
      </div>
    </div>
  </div>
</section>

      {/* Editor Demo */}
      <section id="editor" className="py-16 bg-gray-800 animate-on-scroll">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


          <div className="bg-gray-900 rounded-lg shadow-xl overflow-hidden border border-gray-700">
            <div className="flex items-center px-4 py-2 bg-gray-800 border-b border-gray-700">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row">
              <div className="w-full lg:w-1/2 p-4 bg-gray-900 border-r border-gray-700">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">Options to Choose from</span>
                  <div className="flex space-x-2"></div>
                </div>
                <div className="w-full  bg-gray-900 border-r border-gray-700">
                  
                  <div className="grid grid-cols-2 gap-3 h-96 overflow-auto">
                    {/* ATS Score Box */}
                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-indigo-400 transition-colors">
                      <div className="flex items-center mb-3">
                        <svg className="w-6 h-6 text-indigo-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        <h3 className="font-medium text-white">ATS Score</h3>
                      </div>
                      <p className="text-sm text-gray-300 mb-3">Calculate how well your resume performs in ATS systems</p>
                      <ul className="text-xs text-gray-400 space-y-1 pl-4 list-disc">
                        <li>Scan resume formatting</li>
                        <li>Analyze compatibility</li>
                        <li>Get detailed score reports</li>
                      </ul>
                    </div>
                    
                    {/* ATS Enhancer Box */}
                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-indigo-400 transition-colors">
                      <div className="flex items-center mb-3">
                        <svg className="w-6 h-6 text-indigo-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                        </svg>
                        <h3 className="font-medium text-white">ATS Enhancer</h3>
                      </div>
                      <p className="text-sm text-gray-300 mb-3">Make your resume more ATS-friendly with targeted improvements</p>
                      <ul className="text-xs text-gray-400 space-y-1 pl-4 list-disc">
                        <li>Fix formatting issues</li>
                        <li>Optimize document structure</li>
                        <li>Improve content readability</li>
                      </ul>
                    </div>
                    
                    {/* Resume Feedback Box */}
                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-indigo-400 transition-colors">
                      <div className="flex items-center mb-3">
                        <svg className="w-6 h-6 text-indigo-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <h3 className="font-medium text-white">Resume Feedback</h3>
                      </div>
                      <p className="text-sm text-gray-300 mb-3">Receive detailed feedback on each section of your resume</p>
                      <ul className="text-xs text-gray-400 space-y-1 pl-4 list-disc">
                        <li>Section-by-section analysis</li>
                        <li>Content improvement suggestions</li>
                        <li>Structure recommendations</li>
                      </ul>
                    </div>
                    
                    {/* Keyword Matching Box */}
                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-indigo-400 transition-colors">
                      <div className="flex items-center mb-3">
                        <svg className="w-6 h-6 text-indigo-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <h3 className="font-medium text-white">Keyword Matching</h3>
                      </div>
                      <p className="text-sm text-gray-300 mb-3">See how your resume keywords match with job descriptions</p>
                      <ul className="text-xs text-gray-400 space-y-1 pl-4 list-disc">
                        <li>Identify missing key terms</li>
                        <li>Optimize keyword frequency</li>
                        <li>Match industry terminology</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-1/2 p-4 bg-gray-800">
                <img className="w-full h-full " src={preview} alt="example vid"/>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button className="bg-indigo-600 px-8 py-3 text-lg font-medium rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <a href="/#/enhance">Try Enhancing Your Resume</a>
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 animate-on-scroll">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold sm:text-4xl">
              What Our Users Say
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <div className="flex items-center mb-4">
                  <div className="text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="inline-block">★</span>
                    ))}
                  </div>
                </div>
                <p className="text-gray-300 mb-4">"{testimonial.text}"</p>
                <p className="text-indigo-400 font-medium">{testimonial.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-16 animate-on-scroll">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-indigo-700 rounded-2xl shadow-xl overflow-hidden">
            <div className="pt-10 pb-12 px-6 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
              <div className="lg:flex">
                <div className="lg:w-7/12">
                  <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                    Ready to create your professional resume?
                  </h2>
                  <p className="mt-4 text-lg text-indigo-100 max-w-3xl">
                    Join thousands of professionals who are creating stunning LaTeX resumes with our platform. Start for free today.
                  </p>
                  <div className="mt-10">
                    <div className="flex space-x-4">
                      <button className="bg-white text-indigo-700 px-8 py-3 rounded-md font-medium hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white">
                        Get Started Free
                      </button>
                      <button className="bg-indigo-800 text-white px-8 py-3 rounded-md font-medium hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-800">
                        Watch Demo
                      </button>
                    </div>
                  </div>
                </div>
                <div className="mt-10 lg:mt-0 lg:w-5/12 lg:flex-shrink-0 lg:flex lg:flex-col lg:justify-center">
                  <img className="w-full lg:max-w-md mx-auto" src="/api/placeholder/500/280" alt="Resume dashboard" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-800 animate-on-scroll">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold sm:text-4xl">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-8">
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-bold mb-2">Do I need to know LaTeX to use Resume.io?</h3>
              <p className="text-gray-300">
                No, you don't need any prior LaTeX knowledge! Our editor provides templates and an intuitive interface. However, if you do know LaTeX, you'll have additional flexibility to customize your resume even further.
              </p>
            </div>
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-bold mb-2">Can I export my resume to different formats?</h3>
              <p className="text-gray-300">
                Yes! You can export your resume as PDF (most common), PNG image, or even download the raw LaTeX source code if you want to use it elsewhere.
              </p>
            </div>
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-bold mb-2">Are the templates ATS-friendly?</h3>
              <p className="text-gray-300">
                Absolutely. All our templates are designed to be compatible with Applicant Tracking Systems (ATS) that many employers use to scan resumes. The clean, professional formatting ensures your resume gets past automated filters.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Templates</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Updates</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Documentation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Tutorials</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Support</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Privacy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Twitter</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">GitHub</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">LinkedIn</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Discord</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center">
              <span className="text-xl font-bold mr-2">Resume.io</span>
              <span className="text-gray-400">© {new Date().getFullYear()} All rights reserved.</span>
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">GitHub</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Resumeio;