export default function Services() {
    return (
      <section id="services" className="py-20 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold">Services</h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold">Web Development</h3>
            <p className="text-gray-600 mt-2">I build high-performance and modern websites.</p>
          </div>
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold">UI/UX Design</h3>
            <p className="text-gray-600 mt-2">Creating visually appealing and user-friendly interfaces.</p>
          </div>
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold">GSAP Animations</h3>
            <p className="text-gray-600 mt-2">Adding smooth animations to enhance user experience.</p>
          </div>
        </div>
      </section>
    );
  }
  