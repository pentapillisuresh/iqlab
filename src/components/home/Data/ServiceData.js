const serviceData = [
  {
    id: 'iso',
    title: "ISO Certificate Consultation",
    description: "ISO 9001 & 13485 consulting including documentation and certification stages.",
    image: "https://img.freepik.com/free-vector/iso-certification-illustration_23-2148684355.jpg?t=st=1757394498~exp=1757398098~hmac=e4ad5e2e5db092260ced4c40cc2049d402d55375355b1a4f400b674d15e248a0&w=1060",
    icon: 'Shield',
    fee: 0,
    fields: ['name', 'phone', 'email', 'address', 'company', 'gst']
  },
  // {
  //   id: 'survival',
  //   title: "Survival Course",
  //   description: "Covers camping, firefighting, water survival, and more skills.",
  //   image: "https://img.freepik.com/free-photo/kids-having-fun-as-boy-scouts_23-2149657055.jpg?t=st=1757394558~exp=1757398158~hmac=734dd33823d3233d5d4cfa080790e8d526e7dcb4ea6484561b3916f52b66b1b7&w=1060",
  //   icon: 'Compass',
  //   fee: 5000,
  //   fields: ['name', 'phone', 'email', 'address']
  // },
  {
    id: 'club',
    title: "Join the Club",
    description: "Explore clubs across sports, innovation, arts, and more.",
    image: "https://img.freepik.com/free-vector/gradient-join-us-concept-illustrated_23-2148948366.jpg?t=st=1757394669~exp=1757398269~hmac=4e2a27f1822abe315ea0845ffdde3dc978e2e580f46312f1bdbaebb5044d8bba&w=1060",
    icon: 'Users',
    // fee: 365,
    fields: ['name', 'phone', 'email', 'address', 'clubType']
  },
  {
    id: 'career',
    title: "Career Counselling & Guidance",
    description: "Personalized career support to plan, prepare, and succeed.",
    image: "https://img.freepik.com/premium-photo/insurance-advisor-explaining-insurance-policy-woman_658385-1209.jpg?w=1060",
    icon: 'Briefcase',
    // fee: 1500,
    fields: ['name', 'phone', 'email', 'address']
  }
];

export const clubTypes = [
  'Cricket Club',
  'Badminton Club', 
  'Racing Club',
  'Singles Club',
  'Innovation Club',
  'Startup Club',
  'Arts Club',
  'Music Club'
];

export default serviceData;