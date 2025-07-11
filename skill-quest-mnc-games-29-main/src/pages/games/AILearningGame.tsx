import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Gamepad, Bot, MessageSquare, User, Trophy } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";

const AILearningGame = () => {
  const { toast } = useToast();
  const [userMessage, setUserMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<Array<{ role: string; content: string }>>([
    {
      role: "assistant",
      content: "Welcome to your first day at TechCorp! I'm AIDA, your AI onboarding assistant. I can help you learn about IT Security, Business Strategy, Crisis Management, Leadership, and more. How can I assist you today?"
    }
  ]);
  
  const [gameState, setGameState] = useState({
    name: "",
    role: "IT Security Specialist",
    knowledgeProgress: 0,
    currentTopic: "Getting Started",
    challenges: [
      { id: 1, title: "Security Policy Quiz", completed: false },
      { id: 2, title: "Phishing Identification", completed: false },
      { id: 3, title: "Incident Response Simulation", completed: false }
    ],
    stage: "intro", // intro, conversation, challenge, completed
    currentChallenge: null as number | null,
    challengeData: null as any
  });

  const [typingMessage, setTypingMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Enhanced AI response system with comprehensive knowledge base
  const getAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase().trim();
    
    // Handle empty or very short inputs
    if (!input || input.length < 2) {
      return "I'd be happy to help! Could you please ask me a specific question or tell me what you'd like to learn about?";
    }

    // Enhanced greeting detection
    if (input.match(/^(hi|hello|hey|good morning|good afternoon|good evening)$/)) {
      return "Hello! I'm AIDA, your AI learning assistant. I can help you with corporate training topics, answer questions about business, technology, leadership, and much more. What would you like to explore today?";
    }

    // Name introduction handling
    if (input.includes("my name") || input.includes("i am ") || input.includes("i'm ")) {
      let name = userInput.match(/(?:my name is|i am|i'm) ([a-zA-Z]+)/i)?.[1] || "";
      if (name) {
        name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
        setGameState(prev => ({ ...prev, name }));
        return `Nice to meet you, ${name}! I'm here to assist you with learning and development. Whether you want to know about business strategies, leadership skills, technology, or any other topic, just ask me. What would you like to learn about?`;
      }
    }

    // Business and Corporate Training Topics
    if (input.includes("business strategy") || input.includes("strategic planning")) {
      return "Business strategy involves defining long-term goals and determining the best approach to achieve them. Key components include market analysis, competitive positioning, resource allocation, and strategic planning. In corporate training, we use simulations where employees act as executives making strategic decisions about product launches, market expansion, and resource management.";
    }

    if (input.includes("leadership") || input.includes("management") || input.includes("team lead")) {
      return "Leadership training focuses on developing skills like decision-making, team motivation, conflict resolution, and strategic thinking. Effective leaders communicate clearly, delegate appropriately, and inspire their teams. Our training simulations include scenarios where you practice managing diverse teams, handling workplace conflicts, and making tough decisions under pressure.";
    }

    if (input.includes("crisis management") || input.includes("emergency") || input.includes("risk management")) {
      return "Crisis management involves preparing for, responding to, and recovering from unexpected events that could harm an organization. Key steps include: 1) Risk assessment and prevention, 2) Crisis response planning, 3) Communication strategies, 4) Recovery and learning. Training includes simulations of cybersecurity breaches, PR crises, and operational emergencies.";
    }

    if (input.includes("sales") || input.includes("negotiation") || input.includes("customer service")) {
      return "Sales and negotiation training develops persuasion, communication, and relationship-building skills. Key techniques include active listening, understanding customer needs, handling objections, and creating win-win solutions. Our simulations cover B2B sales scenarios, difficult customer interactions, and complex contract negotiations.";
    }

    // Technology Topics
    if (input.includes("cybersecurity") || input.includes("security") || input.includes("hacking")) {
      return "Cybersecurity is critical for protecting digital assets and data. Key areas include: threat detection, incident response, security policies, employee training, and risk assessment. Common threats include phishing, malware, ransomware, and social engineering. Best practices include using strong passwords, multi-factor authentication, regular updates, and security awareness training.";
    }

    if (input.includes("artificial intelligence") || input.includes("ai") || input.includes("machine learning")) {
      return "Artificial Intelligence (AI) is transforming business operations through automation, data analysis, and decision support. AI applications include chatbots, predictive analytics, process automation, and personalized learning systems. In corporate training, AI helps customize learning experiences, track progress, and provide intelligent feedback to learners.";
    }

    if (input.includes("data") || input.includes("analytics") || input.includes("big data")) {
      return "Data analytics involves collecting, processing, and analyzing data to make informed business decisions. Key concepts include data visualization, statistical analysis, predictive modeling, and data-driven decision making. Organizations use analytics for customer insights, operational efficiency, risk management, and strategic planning.";
    }

    // HR and Workplace Topics
    if (input.includes("human resources") || input.includes("hr") || input.includes("employee")) {
      return "Human Resources focuses on managing people within organizations. Key areas include recruitment, training and development, performance management, employee relations, and compliance. Modern HR emphasizes employee engagement, diversity and inclusion, remote work management, and creating positive workplace cultures.";
    }

    if (input.includes("communication") || input.includes("presentation") || input.includes("public speaking")) {
      return "Effective communication is essential for workplace success. Key skills include active listening, clear messaging, non-verbal communication, and adapting your style to different audiences. For presentations, focus on structure, storytelling, visual aids, and audience engagement. Practice helps build confidence and improve delivery.";
    }

    // Project Management
    if (input.includes("project management") || input.includes("agile") || input.includes("scrum")) {
      return "Project management involves planning, executing, and delivering projects successfully. Popular methodologies include Agile, Scrum, and traditional Waterfall approaches. Key skills include scope management, timeline planning, resource allocation, risk management, and team coordination. Agile focuses on iterative development and continuous improvement.";
    }

    // Finance and Economics
    if (input.includes("finance") || input.includes("budget") || input.includes("financial")) {
      return "Financial management involves planning, organizing, and controlling financial resources. Key concepts include budgeting, financial analysis, investment decisions, risk management, and performance measurement. In business, financial literacy helps with strategic planning, cost management, and understanding organizational performance metrics.";
    }

    if (input.includes("marketing") || input.includes("brand") || input.includes("customer")) {
      return "Marketing involves promoting products or services to target audiences. Key areas include market research, branding, digital marketing, customer segmentation, and campaign management. Modern marketing emphasizes data-driven strategies, customer experience, social media engagement, and measuring return on investment (ROI).";
    }

    // Innovation and Change Management
    if (input.includes("innovation") || input.includes("creativity") || input.includes("change management")) {
      return "Innovation drives business growth through new ideas, products, and processes. Key elements include creative thinking, experimentation, risk-taking, and continuous improvement. Change management helps organizations adapt to new technologies, market conditions, and business strategies while maintaining employee engagement and operational effectiveness.";
    }

    // Learning and Development
    if (input.includes("training") || input.includes("learning") || input.includes("development")) {
      return "Learning and development (L&D) helps employees acquire new skills and knowledge. Effective training programs include needs assessment, clear objectives, engaging content, practical application, and performance measurement. Modern approaches include e-learning, microlearning, gamification, and personalized learning paths.";
    }

    // Question-based responses
    if (input.startsWith("what") || input.startsWith("how") || input.startsWith("why") || input.startsWith("when") || input.startsWith("where")) {
      if (input.includes("gamification")) {
        return "Gamification applies game elements like points, badges, leaderboards, and challenges to non-game contexts. In corporate training, it increases engagement, motivation, and knowledge retention. Benefits include improved participation rates, better learning outcomes, and enhanced skill development through interactive experiences.";
      }
      
      if (input.includes("corporate training") || input.includes("employee training")) {
        return "Corporate training develops employee skills and knowledge to improve job performance and support business objectives. Effective programs include technical skills training, soft skills development, compliance training, and leadership development. Modern approaches use blended learning, simulations, and technology-enhanced training methods.";
      }

      if (input.includes("soft skills")) {
        return "Soft skills are interpersonal abilities that affect how you work and interact with others. Key soft skills include communication, teamwork, problem-solving, adaptability, leadership, time management, and emotional intelligence. These skills are crucial for career success and are often developed through training, practice, and real-world experience.";
      }

      // General "what is" questions
      if (input.includes("what is") || input.includes("what are")) {
        return "I'd be happy to explain that topic! Could you be more specific about what you'd like to know? I can help with business concepts, technology topics, workplace skills, training methods, and many other subjects. Just ask me about the specific area you're interested in.";
      }

      // How-to questions
      if (input.includes("how to") || input.includes("how can")) {
        return "Great question! I can provide step-by-step guidance on many topics including business processes, skill development, problem-solving techniques, and training methods. Could you tell me specifically what you'd like to learn how to do?";
      }
    }

    // Challenge and quiz requests
    if (input.includes("challenge") || input.includes("quiz") || input.includes("test") || input.includes("practice")) {
      return "I can offer you interactive challenges to test your knowledge! We have security policy quizzes, phishing identification exercises, and incident response simulations. Which type of challenge interests you most?";
    }

    // Help and assistance
    if (input.includes("help") || input.includes("assist") || input.includes("support")) {
      return "I'm here to help! I can assist you with learning about business strategy, leadership, crisis management, technology, HR topics, project management, and much more. You can ask me questions, request explanations, or try our interactive training challenges. What specific area would you like help with?";
    }

    // Personal development
    if (input.includes("career") || input.includes("skill") || input.includes("improve") || input.includes("grow")) {
      return "Personal and professional development is key to career success. Focus areas include developing both technical and soft skills, building leadership capabilities, expanding your network, staying current with industry trends, and taking on new challenges. What specific skills or areas would you like to develop?";
    }

    // Workplace culture and ethics
    if (input.includes("culture") || input.includes("ethics") || input.includes("diversity") || input.includes("inclusion")) {
      return "Workplace culture and ethics are fundamental to organizational success. Key elements include diversity and inclusion, ethical decision-making, respect and professionalism, open communication, and creating psychological safety. Strong cultures promote employee engagement, innovation, and business performance.";
    }

    // Technology and digital transformation
    if (input.includes("digital") || input.includes("technology") || input.includes("automation")) {
      return "Digital transformation involves using technology to fundamentally change business operations and customer experiences. Key areas include process automation, data analytics, cloud computing, artificial intelligence, and digital customer engagement. Success requires both technological implementation and cultural change management.";
    }

    // Fallback responses for unmatched queries
    const fallbackResponses = [
      "That's an interesting question! While I specialize in corporate training and business topics, I'd be happy to help you explore this further. Could you provide more context or ask about a specific aspect?",
      "I understand you're asking about that topic. Let me help you by connecting it to workplace learning and development. What specific aspect would you like to focus on?",
      "Great question! I can provide insights on many topics, especially those related to business, technology, and professional development. Could you tell me more about what you'd like to learn?",
      "I'd like to help you with that! While my expertise is in corporate training and business skills, I can often find connections to professional development. What's your main interest in this topic?",
      "Interesting! Let me see how I can help you understand this topic better, particularly from a business or professional development perspective. What would you like to know specifically?"
    ];

    // Update progress for any interaction
    setGameState(prevState => ({ 
      ...prevState, 
      knowledgeProgress: Math.min(prevState.knowledgeProgress + 5, 100)
    }));

    return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
  };

  // Updated simulateAIResponse function
  function simulateAIResponse(userInput: string): string {
    return getAIResponse(userInput);
  }

  const handleSendMessage = () => {
    if (!userMessage.trim()) return;

    // Add user message to chat
    setChatHistory([...chatHistory, { role: "user", content: userMessage }]);
    setUserMessage("");
    
    // Simulate AI typing
    setIsTyping(true);

    // Generate AI response with delay for realism
    setTimeout(() => {
      const aiResponse = simulateAIResponse(userMessage);
      setTypingMessage(aiResponse);

      let i = 0;
      const typingInterval = setInterval(() => {
        i++;
        if (i >= aiResponse.length) {
          clearInterval(typingInterval);
          setIsTyping(false);
          setChatHistory(prev => [...prev, { role: "assistant", content: aiResponse }]);
          setTypingMessage("");
        }
      }, 30); // Fast typing speed
    }, 500);
  };

  const startChallenge = (challengeId: number) => {
    setGameState(prev => ({ 
      ...prev, 
      stage: "challenge",
      currentChallenge: challengeId,
      challengeData: {
        ...aiResponses.challenges[challengeId as keyof typeof aiResponses.challenges],
        currentStep: 0,
        userAnswers: [],
        score: 0,
        completed: false
      }
    }));
  };

  const handleChallengeAnswer = (answer: any) => {
    const challenge = gameState.currentChallenge;
    const challengeData = gameState.challengeData;
    
    if (!challenge || !challengeData) return;
    
    let isCorrect = false;
    let explanation = "";
    let newScore = challengeData.score;
    
    // Handle answer based on challenge type
    if (challenge === 1) { // Quiz
      const currentQuestion = challengeData.questions[challengeData.currentStep];
      isCorrect = answer === currentQuestion.answer;
      if (isCorrect) newScore++;
      
      if (challengeData.currentStep < challengeData.questions.length - 1) {
        // Move to next question
        setGameState(prev => ({
          ...prev,
          challengeData: {
            ...prev.challengeData,
            currentStep: prev.challengeData.currentStep + 1,
            userAnswers: [...prev.challengeData.userAnswers, answer],
            score: newScore
          }
        }));
      } else {
        // Challenge complete
        completeChallenge(newScore, challengeData.questions.length);
      }
    } else if (challenge === 2) { // Phishing examples
      const currentExample = challengeData.examples[challengeData.currentStep];
      isCorrect = answer === currentExample.isPhishing;
      explanation = currentExample.explanation;
      if (isCorrect) newScore++;
      
      if (challengeData.currentStep < challengeData.examples.length - 1) {
        // Show explanation then move to next example
        setGameState(prev => ({
          ...prev,
          challengeData: {
            ...prev.challengeData,
            showExplanation: true,
            isCorrect,
            explanation,
            score: newScore
          }
        }));
        
        setTimeout(() => {
          setGameState(prev => ({
            ...prev,
            challengeData: {
              ...prev.challengeData,
              currentStep: prev.challengeData.currentStep + 1,
              userAnswers: [...prev.challengeData.userAnswers, answer],
              showExplanation: false
            }
          }));
        }, 3000);
      } else {
        // Show final explanation then complete challenge
        setGameState(prev => ({
          ...prev,
          challengeData: {
            ...prev.challengeData,
            showExplanation: true,
            isCorrect,
            explanation
          }
        }));
        
        setTimeout(() => {
          completeChallenge(newScore, challengeData.examples.length);
        }, 3000);
      }
    } else if (challenge === 3) { // Incident response
      const currentStep = challengeData.steps[challengeData.currentStep];
      isCorrect = answer === currentStep.correctAnswer;
      explanation = currentStep.explanation;
      if (isCorrect) newScore++;
      
      if (challengeData.currentStep < challengeData.steps.length - 1) {
        // Show explanation then move to next step
        setGameState(prev => ({
          ...prev,
          challengeData: {
            ...prev.challengeData,
            showExplanation: true,
            isCorrect,
            explanation,
            score: newScore
          }
        }));
        
        setTimeout(() => {
          setGameState(prev => ({
            ...prev,
            challengeData: {
              ...prev.challengeData,
              currentStep: prev.challengeData.currentStep + 1,
              userAnswers: [...prev.challengeData.userAnswers, answer],
              showExplanation: false
            }
          }));
        }, 3000);
      } else {
        // Show final explanation then complete challenge
        setGameState(prev => ({
          ...prev,
          challengeData: {
            ...prev.challengeData,
            showExplanation: true,
            isCorrect,
            explanation
          }
        }));
        
        setTimeout(() => {
          completeChallenge(newScore, challengeData.steps.length);
        }, 3000);
      }
    }
  };

  const completeChallenge = (score: number, totalPossible: number) => {
    if (!gameState.currentChallenge) return;
    
    // Mark challenge as completed
    const updatedChallenges = gameState.challenges.map(c => 
      c.id === gameState.currentChallenge ? { ...c, completed: true } : c
    );
    
    // Add significant knowledge progress
    const progressIncrease = Math.floor((score / totalPossible) * 30);
    
    setGameState(prev => ({ 
      ...prev, 
      challenges: updatedChallenges,
      knowledgeProgress: Math.min(prev.knowledgeProgress + progressIncrease, 100),
      stage: "conversation",
      currentChallenge: null
    }));
    
    // Add completion message to chat
    const performanceMessage = score === totalPossible 
      ? "Perfect score! Excellent work!" 
      : score >= totalPossible * 0.7 
      ? "Good job! You've shown a solid understanding." 
      : "You've completed the challenge. Some additional review might be helpful.";
    
    const challengeName = gameState.challenges.find(c => c.id === gameState.currentChallenge)?.title || "";
    
    setChatHistory(prev => [
      ...prev, 
      { 
        role: "assistant", 
        content: `You've completed the ${challengeName}! Score: ${score}/${totalPossible}. ${performanceMessage} What would you like to explore next?` 
      }
    ]);
    
    toast({
      title: `${challengeName} Completed`,
      description: `Score: ${score}/${totalPossible}`,
    });
    
    // Check if all challenges are completed
    if (updatedChallenges.every(c => c.completed) && gameState.knowledgeProgress + progressIncrease >= 90) {
      setTimeout(() => {
        setGameState(prev => ({ ...prev, stage: "completed" }));
        setChatHistory(prev => [
          ...prev, 
          { 
            role: "assistant", 
            content: "Congratulations! You've completed all the challenges and reached the required knowledge level for your role. You're ready to start your IT Security position at TechCorp!" 
          }
        ]);
        
        toast({
          title: "Training Complete!",
          description: "You've successfully completed your onboarding training.",
        });
      }, 2000);
    }
  };

  const restartGame = () => {
    setChatHistory([
      {
        role: "assistant",
        content: "Welcome to your first day at TechCorp! I'm AIDA, your AI onboarding assistant. I can help you learn about IT Security, Business Strategy, Crisis Management, Leadership, and more. How can I assist you today?"
      }
    ]);
    setGameState({
      name: "",
      role: "IT Security Specialist",
      knowledgeProgress: 0,
      currentTopic: "Getting Started",
      challenges: [
        { id: 1, title: "Security Policy Quiz", completed: false },
        { id: 2, title: "Phishing Identification", completed: false },
        { id: 3, title: "Incident Response Simulation", completed: false }
      ],
      stage: "intro",
      currentChallenge: null,
      challengeData: null
    });
    setUserMessage("");
    setTypingMessage("");
    setIsTyping(false);
  };

  const renderChallengeContent = () => {
    if (!gameState.currentChallenge || !gameState.challengeData) return null;
    
    const { currentChallenge, challengeData } = gameState;
    
    if (currentChallenge === 1) { // Security Policy Quiz
      const currentQuestion = challengeData.questions[challengeData.currentStep];
      return (
        <div className="space-y-4">
          <h3 className="font-medium">Question {challengeData.currentStep + 1} of {challengeData.questions.length}</h3>
          <p className="text-lg">{currentQuestion.question}</p>
          <div className="space-y-2 mt-4">
            {currentQuestion.options.map((option: string) => (
              <Button 
                key={option}
                variant="outline"
                className="w-full justify-start text-left"
                onClick={() => handleChallengeAnswer(option)}
              >
                {option}
              </Button>
            ))}
          </div>
        </div>
      );
    } else if (currentChallenge === 2) { // Phishing Identification
      if (challengeData.showExplanation) {
        return (
          <div className={`p-4 rounded-md ${challengeData.isCorrect ? 'bg-green-50' : 'bg-red-50'}`}>
            <p className="font-medium mb-2">{challengeData.isCorrect ? 'Correct!' : 'Incorrect!'}</p>
            <p>{challengeData.explanation}</p>
          </div>
        );
      }
      
      const currentExample = challengeData.examples[challengeData.currentStep];
      return (
        <div className="space-y-4">
          <h3 className="font-medium">Example {challengeData.currentStep + 1} of {challengeData.examples.length}</h3>
          <div className="p-4 border rounded-md bg-white">
            <p className="font-mono">{currentExample.content}</p>
          </div>
          <div className="flex gap-2 mt-4">
            <Button 
              variant="outline"
              className="flex-1"
              onClick={() => handleChallengeAnswer(true)}
            >
              This is phishing
            </Button>
            <Button 
              variant="outline"
              className="flex-1"
              onClick={() => handleChallengeAnswer(false)}
            >
              This is legitimate
            </Button>
          </div>
        </div>
      );
    } else if (currentChallenge === 3) { // Incident Response
      if (challengeData.showExplanation) {
        return (
          <div className={`p-4 rounded-md ${challengeData.isCorrect ? 'bg-green-50' : 'bg-red-50'}`}>
            <p className="font-medium mb-2">{challengeData.isCorrect ? 'Correct!' : 'Incorrect!'}</p>
            <p>{challengeData.explanation}</p>
          </div>
        );
      }
      
      const currentStep = challengeData.steps[challengeData.currentStep];
      return (
        <div className="space-y-4">
          <h3 className="font-medium">Step {challengeData.currentStep + 1} of {challengeData.steps.length}</h3>
          <p className="text-lg">{currentStep.question}</p>
          <div className="space-y-2 mt-4">
            {currentStep.options.map((option: string) => (
              <Button 
                key={option}
                variant="outline"
                className="w-full justify-start text-left"
                onClick={() => handleChallengeAnswer(option)}
              >
                {option}
              </Button>
            ))}
          </div>
        </div>
      );
    }
    
    return null;
  };

  // aiResponses object needed for startChallenge function
  const aiResponses = {
    challenges: {
      1: {
        title: "Security Policy Quiz",
        description: "Let's test your knowledge of TechCorp's security policies.",
        questions: [
          {
            question: "How often should passwords be changed according to TechCorp policy?",
            options: ["30 days", "60 days", "90 days", "180 days"],
            answer: "90 days"
          },
          {
            question: "Which authentication method is required for all employees?",
            options: ["Single-factor", "Two-factor (2FA)", "Biometric only", "Password only"],
            answer: "Two-factor (2FA)"
          },
          {
            question: "What must be done with sensitive customer data?",
            options: ["Store locally", "Use cloud storage", "Encrypt it", "Share via email"],
            answer: "Encrypt it"
          }
        ]
      },
      2: {
        title: "Phishing Identification",
        description: "Can you identify which of these emails are phishing attempts?",
        examples: [
          {
            content: "URGENT: Your account has been compromised. Click here to reset your password immediately: http://teckcorp-security.net/reset",
            isPhishing: true,
            explanation: "This is phishing. Notice the urgency, suspicious URL (misspelled domain), and the request to click immediately."
          },
          {
            content: "Dear colleague, please review the attached Q2 report before tomorrow's meeting. Regards, Jennifer from Finance.",
            isPhishing: false,
            explanation: "This appears legitimate. It's from a known department, doesn't create urgency, and is requesting a normal business activity."
          },
          {
            content: "Your package delivery failed. Please update your information within 24 hours: [DOWNLOAD ATTACHMENT]",
            isPhishing: true,
            explanation: "This is phishing. It creates urgency and asks you to download an attachment for a vague delivery issue."
          }
        ]
      },
      3: {
        title: "Incident Response Simulation",
        description: "You receive an alert that multiple failed login attempts have occurred on a server. What do you do?",
        steps: [
          {
            question: "What should be your first action?",
            options: [
              "Immediately shut down the server", 
              "Call the police", 
              "Document the time and nature of the alert", 
              "Email all staff about the breach"
            ],
            correctAnswer: "Document the time and nature of the alert",
            explanation: "Always begin by documenting the incident details. This is the first step in proper incident response."
          },
          {
            question: "Who should you notify first?",
            options: [
              "The CEO", 
              "Your direct supervisor", 
              "The security incident response team", 
              "All employees"
            ],
            correctAnswer: "The security incident response team",
            explanation: "The security incident response team should be notified immediately as they are trained to handle such situations."
          },
          {
            question: "What should you do about the affected server?",
            options: [
              "Ignore it until more information is available", 
              "Isolate it from the network while maintaining it for investigation", 
              "Format and reinstall the operating system immediately", 
              "Do nothing until ordered by management"
            ],
            correctAnswer: "Isolate it from the network while maintaining it for investigation",
            explanation: "Isolating protects other systems while preserving evidence for investigation."
          }
        ]
      }
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Gamepad className="h-8 w-8" />
              AI-Powered Learning Simulation
            </h1>
            <p className="text-muted-foreground">Personalized onboarding experience with an AI assistant</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Left sidebar - Progress and challenges */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Role Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-16 w-16 mb-2">
                    <AvatarFallback>
                      {gameState.name ? gameState.name.charAt(0).toUpperCase() : "U"}
                    </AvatarFallback>
                  </Avatar>
                  <p className="text-lg font-medium">{gameState.name || "New Employee"}</p>
                  <p className="text-sm text-muted-foreground">{gameState.role}</p>
                  <p className="text-sm mt-2">Current Topic: {gameState.currentTopic}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Knowledge Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{gameState.knowledgeProgress}%</span>
                  </div>
                  <Progress value={gameState.knowledgeProgress} className="h-2" />
                  <p className="text-xs text-muted-foreground text-center mt-2">
                    {gameState.knowledgeProgress < 30
                      ? "Just getting started"
                      : gameState.knowledgeProgress < 60
                      ? "Making good progress"
                      : gameState.knowledgeProgress < 90
                      ? "Almost there!"
                      : "Expert level reached!"}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Training Challenges</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {gameState.challenges.map((challenge) => (
                    <div
                      key={challenge.id}
                      className="flex items-center gap-2 p-2 rounded-md border"
                    >
                      {challenge.completed ? (
                        <div className="bg-green-100 text-green-700 p-1 rounded-full">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      ) : (
                        <div className="bg-gray-100 text-gray-400 p-1 rounded-full">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}
                      <span className="text-sm">{challenge.title}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main content area - Chat or Challenge */}
          <div className="md:col-span-2">
            {gameState.stage === "challenge" ? (
              <Card>
                <CardHeader>
                  <CardTitle>{gameState.challengeData?.title}</CardTitle>
                  <CardDescription>{gameState.challengeData?.description}</CardDescription>
                </CardHeader>
                <CardContent>{renderChallengeContent()}</CardContent>
              </Card>
            ) : gameState.stage === "completed" ? (
              <Card>
                <CardHeader>
                  <CardTitle>Training Complete!</CardTitle>
                  <CardDescription>Congratulations on completing your onboarding training!</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center space-y-4">
                    <div className="bg-primary text-primary-foreground p-4 rounded-full">
                      <Trophy className="h-12 w-12" />
                    </div>
                    <h3 className="text-xl font-bold">
                      {gameState.name ? gameState.name : "New Employee"} - IT Security Specialist
                    </h3>
                    <p className="text-center">
                      You've successfully completed your onboarding training and are ready to start your role at TechCorp.
                      Your knowledge of security policies, phishing identification, and incident response meets our requirements.
                    </p>
                    <Button onClick={restartGame} className="mt-4">
                      Start Over
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="relative">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bot className="h-5 w-5" />
                    AIDA - AI Onboarding Assistant
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] overflow-y-auto space-y-4 mb-4">
                    {chatHistory.map((msg, index) => (
                      <div
                        key={index}
                        className={`flex ${
                          msg.role === "user" ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-3 ${
                            msg.role === "user"
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            {msg.role === "user" ? (
                              <>
                                <span className="text-xs font-medium">You</span>
                                <User className="h-3 w-3" />
                              </>
                            ) : (
                              <>
                                <Bot className="h-3 w-3" />
                                <span className="text-xs font-medium">AIDA</span>
                              </>
                            )}
                          </div>
                          {msg.content}
                        </div>
                      </div>
                    ))}
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="max-w-[80%] rounded-lg p-3 bg-muted">
                          <div className="flex items-center gap-2 mb-1">
                            <Bot className="h-3 w-3" />
                            <span className="text-xs font-medium">AIDA</span>
                          </div>
                          {typingMessage}
                          <span className="inline-block animate-pulse">_</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="Ask me anything about business, technology, training, or any topic..."
                      value={userMessage}
                      onChange={(e) => setUserMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    />
                    <Button onClick={handleSendMessage}>
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
                <CardFooter className="text-xs text-muted-foreground">
                  <div>
                    <p>Ask me about any topic - business strategy, technology, leadership, HR, project management, or anything else!</p>
                  </div>
                </CardFooter>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AILearningGame;
