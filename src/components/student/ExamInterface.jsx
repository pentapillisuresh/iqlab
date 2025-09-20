import React, { useState, useEffect } from 'react';
import { Clock, BookOpen, Flag, ChevronLeft, ChevronRight, Save, Send } from 'lucide-react';

const ExamInterface = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(5400); // 1.5 hours in seconds
  const [flaggedQuestions, setFlaggedQuestions] = useState(new Set());
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);

  // 90 Psychometric Questions in English and Hindi
  const mockQuestions = [
    {
      id: 1,
      question: "Do you often feel nervous or anxious in social situations?",
      questionHindi: "क्या आप अक्सर सामाजिक स्थितियों में घबराहट या चिंता महसूस करते हैं?",
      marks: 1
    },
    {
      id: 2,
      question: "Do you prefer working alone rather than in a team?",
      questionHindi: "क्या आप टीम में काम करने के बजाय अकेले काम करना पसंद करते हैं?",
      marks: 1
    },
    {
      id: 3,
      question: "Do you find it easy to make decisions quickly?",
      questionHindi: "क्या आपको जल्दी निर्णय लेना आसान लगता है?",
      marks: 1
    },
    {
      id: 4,
      question: "Do you often worry about things that might go wrong?",
      questionHindi: "क्या आप अक्सर उन चीजों के बारे में चिंता करते हैं जो गलत हो सकती हैं?",
      marks: 1
    },
    {
      id: 5,
      question: "Do you enjoy taking on new challenges?",
      questionHindi: "क्या आप नई चुनौतियों का सामना करना पसंद करते हैं?",
      marks: 1
    },
    {
      id: 6,
      question: "Do you find it difficult to express your emotions?",
      questionHindi: "क्या आपको अपनी भावनाओं को व्यक्त करना कठिन लगता है?",
      marks: 1
    },
    {
      id: 7,
      question: "Do you prefer routine and predictable activities?",
      questionHindi: "क्या आप नियमित और पूर्वानुमेय गतिविधियों को प्राथमिकता देते हैं?",
      marks: 1
    },
    {
      id: 8,
      question: "Do you often feel overwhelmed by your responsibilities?",
      questionHindi: "क्या आप अक्सर अपनी जिम्मेदारियों से अभिभूत महसूस करते हैं?",
      marks: 1
    },
    {
      id: 9,
      question: "Do you enjoy meeting new people?",
      questionHindi: "क्या आप नए लोगों से मिलना पसंद करते हैं?",
      marks: 1
    },
    {
      id: 10,
      question: "Do you tend to procrastinate on important tasks?",
      questionHindi: "क्या आप महत्वपूर्ण कार्यों को टालने की प्रवृत्ति रखते हैं?",
      marks: 1
    },
    {
      id: 11,
      question: "Do you feel confident in your ability to handle stress?",
      questionHindi: "क्या आप तनाव को संभालने की अपनी क्षमता में विश्वास महसूस करते हैं?",
      marks: 1
    },
    {
      id: 12,
      question: "Do you prefer to plan ahead rather than be spontaneous?",
      questionHindi: "क्या आप सहज होने के बजाय पहले से योजना बनाना पसंद करते हैं?",
      marks: 1
    },
    {
      id: 13,
      question: "Do you find it easy to concentrate for long periods?",
      questionHindi: "क्या आपको लंबे समय तक ध्यान केंद्रित करना आसान लगता है?",
      marks: 1
    },
    {
      id: 14,
      question: "Do you often compare yourself to others?",
      questionHindi: "क्या आप अक्सर दूसरों से अपनी तुलना करते हैं?",
      marks: 1
    },
    {
      id: 15,
      question: "Do you feel comfortable speaking in front of groups?",
      questionHindi: "क्या आप समूहों के सामने बोलने में सहज महसूस करते हैं?",
      marks: 1
    },
    {
      id: 16,
      question: "Do you tend to be optimistic about the future?",
      questionHindi: "क्या आप भविष्य के बारे में आशावादी होने की प्रवृत्ति रखते हैं?",
      marks: 1
    },
    {
      id: 17,
      question: "Do you find it difficult to say no to requests?",
      questionHindi: "क्या आपको अनुरोधों के लिए ना कहना कठिन लगता है?",
      marks: 1
    },
    {
      id: 18,
      question: "Do you enjoy competitive activities?",
      questionHindi: "क्या आप प्रतिस्पर्धी गतिविधियों का आनंद लेते हैं?",
      marks: 1
    },
    {
      id: 19,
      question: "Do you often feel misunderstood by others?",
      questionHindi: "क्या आप अक्सर दूसरों द्वारा गलत समझे जाने का अनुभव करते हैं?",
      marks: 1
    },
    {
      id: 20,
      question: "Do you believe that hard work always pays off?",
      questionHindi: "क्या आप मानते हैं कि कड़ी मेहनत हमेशा फल देती है?",
      marks: 1
    },
    {
      id: 21,
      question: "Do you get easily frustrated when things don't go as planned?",
      questionHindi: "क्या आप आसानी से निराश हो जाते हैं जब चीजें योजना के अनुसार नहीं होतीं?",
      marks: 1
    },
    {
      id: 22,
      question: "Do you prefer working with details rather than big picture ideas?",
      questionHindi: "क्या आप बड़े विचारों के बजाय विवरण के साथ काम करना पसंद करते हैं?",
      marks: 1
    },
    {
      id: 23,
      question: "Do you often take initiative in group projects?",
      questionHindi: "क्या आप अक्सर सामूहिक परियोजनाओं में पहल करते हैं?",
      marks: 1
    },
    {
      id: 24,
      question: "Do you find it easy to forgive others when they make mistakes?",
      questionHindi: "क्या आपको दूसरों को माफ करना आसान लगता है जब वे गलती करते हैं?",
      marks: 1
    },
    {
      id: 25,
      question: "Do you enjoy solving complex problems?",
      questionHindi: "क्या आप जटिल समस्याओं को हल करने में आनंद लेते हैं?",
      marks: 1
    },
    {
      id: 26,
      question: "Do you feel comfortable with uncertainty and ambiguity?",
      questionHindi: "क्या आप अनिश्चितता और अस्पष्टता के साथ सहज महसूस करते हैं?",
      marks: 1
    },
    {
      id: 27,
      question: "Do you often act on your first instinct?",
      questionHindi: "क्या आप अक्सर अपनी पहली प्रवृत्ति पर कार्य करते हैं?",
      marks: 1
    },
    {
      id: 28,
      question: "Do you prefer structure and clear guidelines in your work?",
      questionHindi: "क्या आप अपने काम में संरचना और स्पष्ट दिशानिर्देश पसंद करते हैं?",
      marks: 1
    },
    {
      id: 29,
      question: "Do you find it easy to adapt to new environments?",
      questionHindi: "क्या आपको नए वातावरण के साथ तालमेल बिठाना आसान लगता है?",
      marks: 1
    },
    {
      id: 30,
      question: "Do you often feel energized after social interactions?",
      questionHindi: "क्या आप अक्सर सामाजिक बातचीत के बाद ऊर्जावान महसूस करते हैं?",
      marks: 1
    },
    {
      id: 31,
      question: "Do you tend to be critical of your own performance?",
      questionHindi: "क्या आप अपने प्रदर्शन की आलोचना करने की प्रवृत्ति रखते हैं?",
      marks: 1
    },
    {
      id: 32,
      question: "Do you enjoy helping others solve their problems?",
      questionHindi: "क्या आप दूसरों की समस्याओं को हल करने में मदद करना पसंद करते हैं?",
      marks: 1
    },
    {
      id: 33,
      question: "Do you prefer to finish tasks completely before starting new ones?",
      questionHindi: "क्या आप नए काम शुरू करने से पहले कार्यों को पूरी तरह खत्म करना पसंद करते हैं?",
      marks: 1
    },
    {
      id: 34,
      question: "Do you find it easy to stay motivated even when facing setbacks?",
      questionHindi: "क्या आपको असफलताओं का सामना करते समय भी प्रेरित रहना आसान लगता है?",
      marks: 1
    },
    {
      id: 35,
      question: "Do you enjoy brainstorming and generating new ideas?",
      questionHindi: "क्या आप विचारमंथन और नए विचार उत्पन्न करने में आनंद लेते हैं?",
      marks: 1
    },
    {
      id: 36,
      question: "Do you prefer to avoid conflict whenever possible?",
      questionHindi: "क्या आप जब भी संभव हो संघर्ष से बचना पसंद करते हैं?",
      marks: 1
    },
    {
      id: 37,
      question: "Do you often question established procedures and methods?",
      questionHindi: "क्या आप अक्सर स्थापित प्रक्रियाओं और तरीकों पर सवाल उठाते हैं?",
      marks: 1
    },
    {
      id: 38,
      question: "Do you find it easy to maintain long-term friendships?",
      questionHindi: "क्या आपको लंबे समय तक दोस्ती बनाए रखना आसान लगता है?",
      marks: 1
    },
    {
      id: 39,
      question: "Do you prefer to work at your own pace?",
      questionHindi: "क्या आप अपनी गति से काम करना पसंद करते हैं?",
      marks: 1
    },
    {
      id: 40,
      question: "Do you often seek feedback from others about your work?",
      questionHindi: "क्या आप अक्सर अपने काम के बारे में दूसरों से प्रतिक्रिया मांगते हैं?",
      marks: 1
    },
    {
      id: 41,
      question: "Do you feel comfortable taking calculated risks?",
      questionHindi: "क्या आप गणनाशील जोखिम लेने में सहज महसूस करते हैं?",
      marks: 1
    },
    {
      id: 42,
      question: "Do you prefer clear deadlines and time constraints?",
      questionHindi: "क्या आप स्पष्ट समय सीमा और समय की बाधाओं को प्राथमिकता देते हैं?",
      marks: 1
    },
    {
      id: 43,
      question: "Do you often analyze situations from multiple perspectives?",
      questionHindi: "क्या आप अक्सर स्थितियों का विश्लेषण कई दृष्टिकोणों से करते हैं?",
      marks: 1
    },
    {
      id: 44,
      question: "Do you enjoy receiving recognition for your achievements?",
      questionHindi: "क्या आप अपनी उपलब्धियों के लिए मान्यता प्राप्त करने में आनंद लेते हैं?",
      marks: 1
    },
    {
      id: 45,
      question: "Do you find it easy to stay calm under pressure?",
      questionHindi: "क्या आपको दबाव में शांत रहना आसान लगता है?",
      marks: 1
    },
    {
      id: 46,
      question: "Do you prefer learning through hands-on experience?",
      questionHindi: "क्या आप व्यावहारिक अनुभव के माध्यम से सीखना पसंद करते हैं?",
      marks: 1
    },
    {
      id: 47,
      question: "Do you often set high standards for yourself?",
      questionHindi: "क्या आप अक्सर अपने लिए उच्च मानक निर्धारित करते हैं?",
      marks: 1
    },
    {
      id: 48,
      question: "Do you find it easy to communicate your ideas to others?",
      questionHindi: "क्या आपको दूसरों के साथ अपने विचार साझा करना आसान लगता है?",
      marks: 1
    },
    {
      id: 49,
      question: "Do you enjoy exploring different solutions to problems?",
      questionHindi: "क्या आप समस्याओं के विभिन्न समाधानों की खोज करने में आनंद लेते हैं?",
      marks: 1
    },
    {
      id: 50,
      question: "Do you prefer to have control over your work environment?",
      questionHindi: "क्या आप अपने कार्य वातावरण पर नियंत्रण रखना पसंद करते हैं?",
      marks: 1
    },
    {
      id: 51,
      question: "Do you often reflect on your past experiences to learn from them?",
      questionHindi: "क्या आप अक्सर अपने पिछले अनुभवों से सीखने के लिए उन पर विचार करते हैं?",
      marks: 1
    },
    {
      id: 52,
      question: "Do you find it easy to trust others with important responsibilities?",
      questionHindi: "क्या आपको महत्वपूर्ण जिम्मेदारियों के साथ दूसरों पर भरोसा करना आसान लगता है?",
      marks: 1
    },
    {
      id: 53,
      question: "Do you prefer practical solutions over creative approaches?",
      questionHindi: "क्या आप रचनात्मक दृष्टिकोणों की तुलना में व्यावहारिक समाधान पसंद करते हैं?",
      marks: 1
    },
    {
      id: 54,
      question: "Do you often feel the need to prove yourself to others?",
      questionHindi: "क्या आप अक्सर दूसरों के सामने खुद को साबित करने की आवश्यकता महसूस करते हैं?",
      marks: 1
    },
    {
      id: 55,
      question: "Do you enjoy working on projects with tight deadlines?",
      questionHindi: "क्या आप तंग समय सीमा वाली परियोजनाओं पर काम करने में आनंद लेते हैं?",
      marks: 1
    },
    {
      id: 56,
      question: "Do you find it easy to empathize with others' feelings?",
      questionHindi: "क्या आपको दूसरों की भावनाओं के साथ सहानुभूति रखना आसान लगता है?",
      marks: 1
    },
    {
      id: 57,
      question: "Do you prefer working with facts and data over intuition?",
      questionHindi: "क्या आप अंतर्ज्ञान की तुलना में तथ्यों और डेटा के साथ काम करना पसंद करते हैं?",
      marks: 1
    },
    {
      id: 58,
      question: "Do you often seek approval from authority figures?",
      questionHindi: "क्या आप अक्सर अधिकारी व्यक्तियों से अनुमोदन मांगते हैं?",
      marks: 1
    },
    {
      id: 59,
      question: "Do you enjoy taking leadership roles in projects?",
      questionHindi: "क्या आप परियोजनाओं में नेतृत्व की भूमिका निभाने में आनंद लेते हैं?",
      marks: 1
    },
    {
      id: 60,
      question: "Do you find it difficult to relax and unwind?",
      questionHindi: "क्या आपको आराम करना और तनाव मुक्त होना कठिन लगता है?",
      marks: 1
    },
    {
      id: 61,
      question: "Do you prefer learning new skills through observation?",
      questionHindi: "क्या आप अवलोकन के माध्यम से नए कौशल सीखना पसंद करते हैं?",
      marks: 1
    },
    {
      id: 62,
      question: "Do you often worry about making the wrong decision?",
      questionHindi: "क्या आप अक्सर गलत निर्णय लेने की चिंता करते हैं?",
      marks: 1
    },
    {
      id: 63,
      question: "Do you enjoy participating in team-building activities?",
      questionHindi: "क्या आप टीम निर्माण गतिविधियों में भाग लेने में आनंद लेते हैं?",
      marks: 1
    },
    {
      id: 64,
      question: "Do you prefer to complete tasks methodically and systematically?",
      questionHindi: "क्या आप कार्यों को व्यवस्थित और क्रमबद्ध तरीके से पूरा करना पसंद करते हैं?",
      marks: 1
    },
    {
      id: 65,
      question: "Do you often find yourself daydreaming about future possibilities?",
      questionHindi: "क्या आप अक्सर भविष्य की संभावनाओं के बारे में दिवास्वप्न देखते रहते हैं?",
      marks: 1
    },
    {
      id: 66,
      question: "Do you find it easy to maintain work-life balance?",
      questionHindi: "क्या आपको कार्य-जीवन संतुलन बनाए रखना आसान लगता है?",
      marks: 1
    },
    {
      id: 67,
      question: "Do you prefer to work independently without supervision?",
      questionHindi: "क्या आप बिना पर्यवेक्षण के स्वतंत्र रूप से काम करना पसंद करते हैं?",
      marks: 1
    },
    {
      id: 68,
      question: "Do you often feel responsible for others' emotions and well-being?",
      questionHindi: "क्या आप अक्सर दूसरों की भावनाओं और कल्याण के लिए जिम्मेदार महसूस करते हैं?",
      marks: 1
    },
    {
      id: 69,
      question: "Do you enjoy experimenting with new approaches and methods?",
      questionHindi: "क्या आप नए दृष्टिकोण और तरीकों के साथ प्रयोग करने में आनंद लेते हैं?",
      marks: 1
    },
    {
      id: 70,
      question: "Do you find it easy to bounce back from disappointments?",
      questionHindi: "क्या आपको निराशाओं से उबरना आसान लगता है?",
      marks: 1
    },
    {
      id: 71,
      question: "Do you prefer to have multiple options before making decisions?",
      questionHindi: "क्या आप निर्णय लेने से पहले कई विकल्प रखना पसंद करते हैं?",
      marks: 1
    },
    {
      id: 72,
      question: "Do you often feel the urge to improve existing processes?",
      questionHindi: "क्या आप अक्सर मौजूदा प्रक्रियाओं को सुधारने की इच्छा महसूस करते हैं?",
      marks: 1
    },
    {
      id: 73,
      question: "Do you find it easy to maintain focus in noisy environments?",
      questionHindi: "क्या आपको शोर भरे वातावरण में ध्यान केंद्रित करना आसान लगता है?",
      marks: 1
    },
    {
      id: 74,
      question: "Do you prefer receiving detailed instructions for new tasks?",
      questionHindi: "क्या आप नए कार्यों के लिए विस्तृत निर्देश प्राप्त करना पसंद करते हैं?",
      marks: 1
    },
    {
      id: 75,
      question: "Do you often feel motivated by competition with others?",
      questionHindi: "क्या आप अक्सर दूसरों के साथ प्रतिस्पर्धा से प्रेरित महसूस करते हैं?",
      marks: 1
    },
    {
      id: 76,
      question: "Do you find it easy to express disagreement diplomatically?",
      questionHindi: "क्या आपको असहमति को कूटनीतिक तरीके से व्यक्त करना आसान लगता है?",
      marks: 1
    },
    {
      id: 77,
      question: "Do you prefer to research thoroughly before making commitments?",
      questionHindi: "क्या आप प्रतिबद्धता बनाने से पहले पूरी तरह से शोध करना पसंद करते हैं?",
      marks: 1
    },
    {
      id: 78,
      question: "Do you often feel drained after attending large social events?",
      questionHindi: "क्या आप अक्सर बड़े सामाजिक कार्यक्रमों में भाग लेने के बाद थकावट महसूस करते हैं?",
      marks: 1
    },
    {
      id: 79,
      question: "Do you enjoy mentoring and coaching others?",
      questionHindi: "क्या आप दूसरों को मार्गदर्शन और कोचिंग देने में आनंद लेते हैं?",
      marks: 1
    },
    {
      id: 80,
      question: "Do you prefer to complete one task at a time rather than multitask?",
      questionHindi: "क्या आप एक साथ कई कार्य करने के बजाय एक समय में एक कार्य पूरा करना पसंद करते हैं?",
      marks: 1
    },
    {
      id: 81,
      question: "Do you often feel the need to control outcomes in situations?",
      questionHindi: "क्या आप अक्सर स्थितियों में परिणामों को नियंत्रित करने की आवश्यकता महसूस करते हैं?",
      marks: 1
    },
    {
      id: 82,
      question: "Do you enjoy attending networking events and conferences?",
      questionHindi: "क्या आप नेटवर्किंग इवेंट और सम्मेलनों में भाग लेने में आनंद लेते हैं?",
      marks: 1
    },
    {
      id: 83,
      question: "Do you find it easy to prioritize tasks based on importance?",
      questionHindi: "क्या आपको महत्व के आधार पर कार्यों को प्राथमिकता देना आसान लगता है?",
      marks: 1
    },
    {
      id: 84,
      question: "Do you often seek new experiences and adventures?",
      questionHindi: "क्या आप अक्सर नए अनुभव और रोमांच की तलाश करते हैं?",
      marks: 1
    },
    {
      id: 85,
      question: "Do you prefer to work in quiet, distraction-free environments?",
      questionHindi: "क्या आप शांत, विक्षेप-मुक्त वातावरण में काम करना पसंद करते हैं?",
      marks: 1
    },
    {
      id: 86,
      question: "Do you often consider the long-term consequences of your actions?",
      questionHindi: "क्या आप अक्सर अपने कार्यों के दीर्घकालिक परिणामों पर विचार करते हैं?",
      marks: 1
    },
    {
      id: 87,
      question: "Do you find it easy to delegate responsibilities to others?",
      questionHindi: "क्या आपको दूसरों को जिम्मेदारियां सौंपना आसान लगता है?",
      marks: 1
    },
    {
      id: 88,
      question: "Do you prefer to follow established guidelines rather than create new ones?",
      questionHindi: "क्या आप नए दिशानिर्देश बनाने के बजाय स्थापित दिशानिर्देशों का पालन करना पसंद करते हैं?",
      marks: 1
    },
    {
      id: 89,
      question: "Do you often feel inspired by other people's success stories?",
      questionHindi: "क्या आप अक्सर दूसरे लोगों की सफलता की कहानियों से प्रेरित महसूस करते हैं?",
      marks: 1
    },
    {
      id: 90,
      question: "Do you believe that persistence is more important than talent?",
      questionHindi: "क्या आप मानते हैं कि दृढ़ता प्रतिभा से अधिक महत्वपूर्ण है?",
      marks: 1
    }
  ];

  useEffect(() => {
    setQuestions(mockQuestions);
    startTimer();
  }, []);

  const startTimer = () => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerChange = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const toggleFlag = (questionId) => {
    setFlaggedQuestions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });
  };

  const handleSubmit = async () => {
    // Simulate submission
    alert('Exam submitted successfully!');
    console.log('Submitted answers:', answers);
    setShowSubmitConfirm(false);
    // In a real app, you would navigate to results page
  };

  const handleAutoSubmit = async () => {
    alert('Time expired! Auto-submitting exam...');
    await handleSubmit();
  };

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const isFirstQuestion = currentQuestionIndex === 0;

  const getAnsweredQuestionsCount = () => {
    return Object.keys(answers).filter(key => answers[key] !== '' && answers[key] !== undefined).length;
  };

  const renderQuestion = () => {
    if (!currentQuestion) return null;

    const questionAnswer = answers[currentQuestion.id] || '';

    return (
      <div className="space-y-6">
        {/* English Question */}
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">English</h3>
          <p className="text-gray-800">{currentQuestion.question}</p>
        </div>

        {/* Hindi Question */}
        <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
          <h3 className="text-lg font-semibold text-orange-900 mb-2">हिंदी</h3>
          <p className="text-gray-800 text-lg">{currentQuestion.questionHindi}</p>
        </div>

        {/* Answer Options */}
        <div className="space-y-3">
          <h4 className="text-md font-medium text-gray-700 mb-3">Select your answer:</h4>
          {[
            { value: 'Yes', label: 'Yes / हाँ' },
            { value: 'No', label: 'No / नहीं' }
          ].map((option) => (
            <label key={option.value} className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-blue-300 hover:bg-blue-50 transition-colors">
              <input
                type="radio"
                name={`question_${currentQuestion.id}`}
                value={option.value}
                checked={questionAnswer === option.value}
                onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                className="text-blue-600 focus:ring-blue-500 w-4 h-4"
              />
              <span className="ml-3 text-gray-700 font-medium">{option.label}</span>
            </label>
          ))}
        </div>
      </div>
    );
  };

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading exam questions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <BookOpen className="h-6 w-6 text-blue-600" />
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Psychometric Assessment</h1>
                <p className="text-sm text-gray-600">Question {currentQuestionIndex + 1} of {questions.length}</p>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="text-sm text-gray-600">Answered</div>
                <div className="text-lg font-bold text-green-600">{getAnsweredQuestionsCount()}/{questions.length}</div>
              </div>
              
              <div className="text-center">
                <div className="text-sm text-gray-600">Time Remaining</div>
                <div className={`text-lg font-bold ${timeRemaining < 600 ? 'text-red-600' : 'text-blue-600'}`}>
                  <Clock className="h-4 w-4 inline mr-1" />
                  {formatTime(timeRemaining)}
                </div>
              </div>

              <button
                onClick={() => setShowSubmitConfirm(true)}
                className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center shadow-sm"
              >
                <Send className="h-4 w-4 mr-2" />
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Question Panel */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              {currentQuestion && (
                <>
                  {/* Question Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                          Question {currentQuestionIndex + 1}
                        </span>
                        <span className="text-sm text-gray-600">
                          {currentQuestion.marks} mark{currentQuestion.marks > 1 ? 's' : ''}
                        </span>
                        {flaggedQuestions.has(currentQuestion.id) && (
                          <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                            Flagged
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <button
                      onClick={() => toggleFlag(currentQuestion.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        flaggedQuestions.has(currentQuestion.id)
                          ? 'bg-yellow-100 text-yellow-600'
                          : 'bg-gray-100 text-gray-600 hover:bg-yellow-100 hover:text-yellow-600'
                      }`}
                    >
                      <Flag className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Question Content */}
                  <div className="mb-8">
                    {renderQuestion()}
                  </div>

                  {/* Navigation */}
                  <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                    <button
                      onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                      disabled={isFirstQuestion}
                      className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronLeft className="h-4 w-4 mr-2" />
                      Previous
                    </button>

                    <div className="flex items-center space-x-3">
                      <Save className="h-5 w-5 text-green-600" />
                      <span className="text-sm text-green-600 font-medium">Auto-saved</span>
                    </div>

                    <button
                      onClick={() => setCurrentQuestionIndex(prev => Math.min(questions.length - 1, prev + 1))}
                      disabled={isLastQuestion}
                      className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Next
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Question Navigator */}
          <div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Question Navigator</h3>
              
              <div className="grid grid-cols-6 gap-2 mb-6 max-h-96 overflow-y-auto">
                {questions.map((q, index) => {
                  const isAnswered = answers[q.id] && answers[q.id] !== '';
                  const isFlagged = flaggedQuestions.has(q.id);
                  const isCurrent = index === currentQuestionIndex;
                  
                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentQuestionIndex(index)}
                      className={`w-10 h-10 rounded-lg text-xs font-medium transition-all relative ${
                        isCurrent
                          ? 'bg-blue-600 text-white shadow-md'
                          : isAnswered
                          ? 'bg-green-100 text-green-800 hover:bg-green-200'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {index + 1}
                      {isFlagged && (
                        <Flag className="h-2.5 w-2.5 text-yellow-500 absolute -top-0.5 -right-0.5" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="space-y-2 text-xs mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-100 rounded"></div>
                  <span className="text-gray-600">Answered</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-gray-100 rounded"></div>
                  <span className="text-gray-600">Not Answered</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-blue-600 rounded"></div>
                  <span className="text-gray-600">Current</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Flag className="h-4 w-4 text-yellow-500" />
                  <span className="text-gray-600">Flagged</span>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="space-y-3 pt-4 border-t border-gray-200">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Answered:</span>
                  <span className="font-medium text-green-600">{getAnsweredQuestionsCount()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Remaining:</span>
                  <span className="font-medium text-gray-600">{questions.length - getAnsweredQuestionsCount()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Flagged:</span>
                  <span className="font-medium text-yellow-600">{flaggedQuestions.size}</span>
                </div>
              </div>

              {/* Progress */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-600 mb-2">Overall Progress</div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-green-500 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${(getAnsweredQuestionsCount() / questions.length) * 100}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  {Math.round((getAnsweredQuestionsCount() / questions.length) * 100)}% complete
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Confirmation Modal */}
      {showSubmitConfirm && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen p-4">
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setShowSubmitConfirm(false)}></div>
            
            <div className="relative bg-white rounded-xl shadow-xl max-w-md w-full p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Submit Assessment?</h3>
              <div className="space-y-3 mb-6">
                <p className="text-gray-600">
                  You have answered {getAnsweredQuestionsCount()} out of {questions.length} questions.
                </p>
                <p className="text-gray-600">
                  Unanswered questions: <span className="font-medium text-red-600">{questions.length - getAnsweredQuestionsCount()}</span>
                </p>
                <p className="text-gray-600">
                  Flagged questions: <span className="font-medium text-yellow-600">{flaggedQuestions.size}</span>
                </p>
                <p className="text-sm text-red-600 font-medium">
                  Once submitted, you cannot make any changes.
                </p>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowSubmitConfirm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Submit Final Answers
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamInterface;