import React from 'react';
import { 
  LightBulbIcon, 
  RocketLaunchIcon, 
  MicrophoneIcon, 
  ComputerDesktopIcon,
  FireIcon,
  MapIcon,
  HeartIcon,
  UsersIcon,
  TrophyIcon
} from '@heroicons/react/24/outline';

const About = () => {
  const clubCategories = [
    {
      title: "For Professionals & Entrepreneurs",
      icon: <RocketLaunchIcon className="h-8 w-8" />,
      clubs: [
        {
          name: "Innovation Club",
          description: "A hub for creative minds to explore new ideas, solve problems, and turn concepts into reality.",
          icon: <LightBulbIcon className="h-6 w-6" />
        },
        {
          name: "Startup Club", 
          description: "Connect with aspiring and current founders, mentors, and investors to navigate the startup ecosystem and accelerate your business growth.",
          icon: <RocketLaunchIcon className="h-6 w-6" />
        },
        {
          name: "Public Speaking & Communication Club",
          description: "Master the art of public speaking, presentations, and effective communication to boost your confidence and leadership skills.",
          icon: <MicrophoneIcon className="h-6 w-6" />
        },
        {
          name: "Tech & Innovation Forum",
          description: "Stay ahead of the curve by exploring emerging technologies, from AI to blockchain, with fellow tech enthusiasts.",
          icon: <ComputerDesktopIcon className="h-6 w-6" />
        }
      ]
    },
    {
      title: "For Adventure & Personal Growth",
      icon: <FireIcon className="h-8 w-8" />,
      clubs: [
        {
          name: "Survival Course",
          description: "Learn essential skills for outdoor survival, including camping, rock climbing, rappelling, and firefighting.",
          icon: <FireIcon className="h-6 w-6" />
        },
        {
          name: "Weekend Wanderers Club",
          description: "Explore the beautiful landscapes around Vizag through organized hikes, treks, and adventure trips.",
          icon: <MapIcon className="h-6 w-6" />
        },
        {
          name: "Foodie's Club",
          description: "A space for food lovers to discover new cuisines, learn cooking techniques, and share their passion for food.",
          icon: <HeartIcon className="h-6 w-6" />
        }
      ]
    },
    {
      title: "For Community & Relationships",
      icon: <UsersIcon className="h-8 w-8" />,
      clubs: [
        {
          name: "Couples' Club",
          description: "A unique club for couples to connect, learn new things, and strengthen their relationship through social activities and shared experiences.",
          icon: <HeartIcon className="h-6 w-6" />
        },
        {
          name: "Singles' Social Club",
          description: "A welcoming space for single individuals to meet, connect, and build meaningful friendships through engaging events like themed mixers, skill workshops, and group outings. This is a great, non-dating-app alternative for people to expand their social circle.",
          icon: <UsersIcon className="h-6 w-6" />
        }
      ]
    },
    {
      title: "Sports & Recreation",
      icon: <TrophyIcon className="h-8 w-8" />,
      clubs: [
        {
          name: "Sports & Recreation Club",
          description: "Join a community focused on physical fitness and friendly competition with activities like Badminton Tournaments, Group Running/Cycling along Vizag's beautiful beach road, and Volleyball/Cricket matches.",
          icon: <TrophyIcon className="h-6 w-6" />
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-teal-600 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Welcome to <span className="text-yellow-300">IQLabs</span>
            </h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
              A vibrant community hub where passionate individuals come together to learn, grow, and create lasting connections in Vizag.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-blue-50 to-transparent"></div>
      </div>

      {/* Mission Section */}
      <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-base text-gray-600 max-w-3xl mx-auto leading-relaxed">
            At IQLabs, we believe in the power of community to transform lives. Whether you're an entrepreneur looking to innovate, 
            an adventurer seeking new experiences, or someone wanting to build meaningful relationships, we provide the platform 
            and community to help you thrive in Vizag.
          </p>
        </div>

        {/* Club Categories */}
        <div className="space-y-6">
          {clubCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-teal-500 p-4">
                <div className="flex items-center justify-center text-white">
                  {category.icon}
                  <h3 className="text-xl font-bold ml-3">{category.title}</h3>
                </div>
              </div>
              
              <div className="p-4">
                <div className="grid md:grid-cols-2 gap-4">
                  {category.clubs.map((club, clubIndex) => (
                    <div key={clubIndex} className="group hover:shadow-lg transition-all duration-300 border border-gray-200 rounded-lg p-3 hover:border-blue-300">
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 p-1.5 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                          <div className="text-blue-600">
                            {club.icon}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-base font-semibold text-gray-900 mb-2">{club.name}</h4>
                          <p className="text-gray-600 text-sm leading-relaxed">{club.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-8 text-center bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl p-6 text-white">
          <h3 className="text-xl md:text-2xl font-bold mb-3">Ready to Join Our Community?</h3>
          <p className="text-base mb-4 opacity-90">
            Connect with like-minded individuals, explore new opportunities, and grow together in Vizag's most vibrant community.
          </p>
          <button className="bg-white text-orange-500 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
            Get Started Today
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;