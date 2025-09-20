const hrTopics = [
  {
    id: '01',
    label: 'Parenting',
    title: 'Parenting Coaching',
    image: '/images/parent.jpeg',
    color: 'bg-teal-900 bg-opacity-80',
    numberPosition: 'top', // Number at top
    textPosition: 'bottom', // Text at bottom
  },
  {
    id: '02',
    label: 'Career',
    title: 'Career Guidance',
    image: 'https://img.freepik.com/free-photo/young-executive-with-black-briefcase_1098-591.jpg?t=st=1756982456~exp=1756986056~hmac=c7eb09899aee272d11dfd069bfd6929f95a9210cfc2213b69b525f1a451890a8&w=1060',
    color: 'bg-cyan-900 bg-opacity-80',
    numberPosition: 'bottom', // Number at bottom
    textPosition: 'top', // Text at top
  },
  {
    id: '03',
    label: 'Study',
    title: 'Study Guidance',
    image: 'https://img.freepik.com/free-photo/discussing-possible-mistakes_1098-16118.jpg?t=st=1756982325~exp=1756985925~hmac=9987d765a58d10051dd3d00a15dfa8dd4af19c1a43c2bcba51a61b38876df3c4&w=1060',
    color: 'bg-teal-900 bg-opacity-80',
    numberPosition: 'top', // Number at top
    textPosition: 'bottom', // Text at bottom
    hasArrow: true,
  },
  {
    id: '04',
    label: 'Corporate',
    title: 'Corporate Coaching',
    image: 'https://img.freepik.com/free-photo/businessmen-using-touchpad-meeting_1098-233.jpg?t=st=1756981934~exp=1756985534~hmac=e0d28c6ba7259ab7e9ca90a62e0e0ac79e3ae8666c27e9ae4251df17be6d3069&w=1060',
    color: 'bg-cyan-900 bg-opacity-80',
    numberPosition: 'bottom', // Number at bottom
    textPosition: 'top', // Text at top
  },
];


const HRTopicsSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      {hrTopics.map((item) => (
        <div
          key={item.id}
          className="relative h-[500px] overflow-hidden group cursor-pointer"
        >
          {/* Background Image */}
          <img
            src={item.image}
            alt={item.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Overlay */}
          <div
            className={`absolute inset-0 ${item.color} transition-opacity duration-300 group-hover:opacity-90`}
          ></div>

          {/* Large Number - centered and positioned based on numberPosition */}
          <div className={`absolute ${item.numberPosition === 'top' ? 'top-6' : 'bottom-6'} left-0 right-0 flex justify-center text-white text-8xl font-bold opacity-30 leading-none`}>
            {item.id}
          </div>

          {/* Text Content - centered and positioned based on textPosition */}
          <div className={`absolute ${item.textPosition === 'top' ? 'top-6' : 'bottom-6'} left-6 right-6 text-white text-center`}>
            <div className="mb-4">
              <span className="inline-block border border-yellow-400 text-yellow-300 text-xs font-medium rounded-full px-4 py-2 tracking-wider uppercase">
                {item.label}
              </span>
            </div>
            <h3 className="text-3xl font-semibold leading-tight">
              {item.title}
            </h3>

          </div>

          {/* Arrow Button (only for item 03) - positioned in center */}
          {/* {item.hasArrow && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-20 h-20 bg-yellow-600 bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all duration-300 group-hover:scale-110">
                <svg 
                  className="w-8 h-8 text-white" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9 5l7 7-7 7" 
                  />
                </svg>
              </div>
            </div>
          )} */}
        </div>
      ))}
    </div>
  );
};

export default HRTopicsSection;