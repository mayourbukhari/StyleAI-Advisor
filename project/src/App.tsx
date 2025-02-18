import React, { useState } from 'react';
import { Camera, ChevronRight, User, UserCircle2, Sparkles, Loader2, Scissors, Clock, Palette, Github, Linkedin, Mail } from 'lucide-react';
import OpenAI from 'openai';

type FaceShape = 'oval' | 'round' | 'square' | 'heart' | 'diamond' | 'rectangular';
type BodyType = 'ectomorph' | 'mesomorph' | 'endomorph';
type StylePreference = 'classic' | 'modern' | 'trendy' | 'professional' | 'casual';
type MaintenanceLevel = 'low' | 'medium' | 'high';

interface StyleRecommendation {
  imageUrl: string;
  description: string;
  maintenanceTips: string[];
}

const openai = new OpenAI({
  apiKey: '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',
  dangerouslyAllowBrowser: true
});

function App() {
  const [step, setStep] = useState<number>(1);
  const [faceShape, setFaceShape] = useState<FaceShape>('oval');
  const [bodyType, setBodyType] = useState<BodyType>('mesomorph');
  const [age, setAge] = useState<string>('25-34');
  const [stylePreference, setStylePreference] = useState<StylePreference>('classic');
  const [maintenanceLevel, setMaintenanceLevel] = useState<MaintenanceLevel>('medium');
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<StyleRecommendation[]>([]);
  const [showAbout, setShowAbout] = useState(false);

  const faceShapes: FaceShape[] = ['oval', 'round', 'square', 'heart', 'diamond', 'rectangular'];
  const bodyTypes: BodyType[] = ['ectomorph', 'mesomorph', 'endomorph'];
  const ageRanges = ['18-24', '25-34', '35-44', '45-54', '55+'];
  const stylePreferences: StylePreference[] = ['classic', 'modern', 'trendy', 'professional', 'casual'];
  const maintenanceLevels: MaintenanceLevel[] = ['low', 'medium', 'high'];

  const generateRecommendations = async () => {
    setLoading(true);
    try {
      const prompt = `Generate a sophisticated hairstyle and grooming recommendation for a person with:
        - Face Shape: ${faceShape}
        - Body Type: ${bodyType}
        - Age Range: ${age}
        - Style Preference: ${stylePreference}
        - Maintenance Level: ${maintenanceLevel}
        Create a natural-looking, professional hairstyle that complements these features.`;

      const response = await openai.images.generate({
        model: "dall-e-3",
        prompt,
        n: 3,
        size: "1024x1024",
        quality: "standard",
      });

      const recommendations = response.data.map((image, index) => ({
        imageUrl: image.url || '',
        description: getStyleDescription(index),
        maintenanceTips: getMaintenanceTips(maintenanceLevel),
      }));

      setRecommendations(recommendations);
      setStep(6);
    } catch (error) {
      console.error('Error generating recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStyleDescription = (index: number) => {
    const descriptions = [
      `A sophisticated ${stylePreference} style that perfectly complements your ${faceShape} face shape, creating a balanced and harmonious look.`,
      `A modern interpretation of ${stylePreference} grooming that enhances your natural features while maintaining a professional appearance.`,
      `An elegant ${stylePreference} cut that works well with your ${bodyType} body type and suits your age group.`,
    ];
    return descriptions[index];
  };

  const getMaintenanceTips = (level: MaintenanceLevel) => {
    const tips = {
      low: [
        'Visit your barber every 6-8 weeks',
        'Use minimal styling products',
        'Quick 5-minute morning routine',
      ],
      medium: [
        'Schedule trims every 4-6 weeks',
        'Use quality styling products',
        '10-15 minute styling routine',
      ],
      high: [
        'Regular maintenance every 3-4 weeks',
        'Professional styling products required',
        'Detailed 20-minute styling routine',
      ],
    };
    return tips[level];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <UserCircle2 className="h-8 w-8 text-indigo-600" />
              <span className="text-xl font-bold text-gray-900">StyleAI Advisor</span>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setShowAbout(true)} 
                className="text-gray-600 hover:text-gray-900"
              >
                About
              </button>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {showAbout && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4 relative">
            <button 
              onClick={() => setShowAbout(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
            <div className="text-center mb-6">
              <img 
                src="https://ibb.co/0R8wmmSy" 
                alt="Syed Mohsin Bukhari" 
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h2 className="text-2xl font-bold text-gray-900">Syed Mohsin Bukhari</h2>
              <p className="text-indigo-600 font-medium">Full Stack Developer & UI/UX Designer</p>
            </div>
            <div className="space-y-4 text-gray-600">
              <p>
                I'm a passionate full-stack developer and UI/UX designer with expertise in creating 
                beautiful, functional, and user-centric web applications. StyleAI Advisor is one of 
                my projects that combines modern design principles with artificial intelligence to 
                provide personalized style recommendations.
              </p>
              <p>
                With a strong foundation in both front-end and back-end development, I specialize 
                in creating seamless user experiences using cutting-edge technologies like React, 
                TypeScript, and AI integration.
              </p>
            </div>
            <div className="flex justify-center space-x-4 mt-6">
              <a href="https://github.com/mayourbukhari" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
                <Github className="h-6 w-6" />
              </a>
              <a href="https://www.linkedin.com/in/syed-mohsin-bukhari/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="mailto:syedmohsin.com" className="text-gray-600 hover:text-gray-900">
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      )}

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold text-gray-900">
                {step === 1 && "Let's Find Your Perfect Style"}
                {step === 2 && "Your Face Shape"}
                {step === 3 && "Your Body Type"}
                {step === 4 && "Style Preferences"}
                {step === 5 && "Maintenance Level"}
                {step === 6 && "Your Personalized Recommendations"}
              </h1>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Step {step} of 6</span>
                <div className="w-24 h-2 bg-gray-200 rounded-full">
                  <div 
                    className="h-2 bg-indigo-600 rounded-full transition-all duration-500"
                    style={{ width: `${(step / 6) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {step === 1 && (
              <div className="space-y-8">
                <div className="text-center max-w-2xl mx-auto">
                  <div className="flex justify-center mb-6">
                    <Sparkles className="h-16 w-16 text-indigo-600" />
                  </div>
                  <h2 className="text-2xl font-semibold mb-4">
                    Discover Your Perfect Look with AI
                  </h2>
                  <p className="text-gray-600 mb-8">
                    Our AI-powered system analyzes your features to recommend personalized grooming styles
                    that enhance your natural appearance.
                  </p>
                  <button 
                    onClick={() => setStep(2)}
                    className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition flex items-center justify-center space-x-2 mx-auto"
                  >
                    <span>Start Your Style Journey</span>
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <p className="text-gray-600 mb-6">
                  Select the face shape that best matches yours:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {faceShapes.map((shape) => (
                    <button
                      key={shape}
                      onClick={() => setFaceShape(shape)}
                      className={`p-4 rounded-lg border-2 transition ${
                        faceShape === shape
                          ? 'border-indigo-600 bg-indigo-50'
                          : 'border-gray-200 hover:border-indigo-300'
                      }`}
                    >
                      <div className="flex items-center justify-center mb-2">
                        <User className="h-8 w-8 text-gray-700" />
                      </div>
                      <p className="text-center capitalize">{shape}</p>
                    </button>
                  ))}
                </div>
                <div className="flex justify-end mt-8">
                  <button
                    onClick={() => setStep(3)}
                    className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <p className="text-gray-600 mb-6">
                  Select your body type:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {bodyTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => setBodyType(type)}
                      className={`p-6 rounded-lg border-2 transition ${
                        bodyType === type
                          ? 'border-indigo-600 bg-indigo-50'
                          : 'border-gray-200 hover:border-indigo-300'
                      }`}
                    >
                      <p className="text-center capitalize font-medium">{type}</p>
                      <p className="text-sm text-gray-500 text-center mt-2">
                        {type === 'ectomorph' && 'Lean and long body structure'}
                        {type === 'mesomorph' && 'Athletic and muscular build'}
                        {type === 'endomorph' && 'Naturally strong and solid build'}
                      </p>
                    </button>
                  ))}
                </div>
                <div className="flex justify-between mt-8">
                  <button
                    onClick={() => setStep(2)}
                    className="text-gray-600 hover:text-gray-900 transition"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(4)}
                    className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <p className="text-gray-600 mb-6">
                  What's your preferred style?
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {stylePreferences.map((style) => (
                    <button
                      key={style}
                      onClick={() => setStylePreference(style)}
                      className={`p-6 rounded-lg border-2 transition ${
                        stylePreference === style
                          ? 'border-indigo-600 bg-indigo-50'
                          : 'border-gray-200 hover:border-indigo-300'
                      }`}
                    >
                      <div className="flex justify-center mb-3">
                        <Palette className="h-6 w-6 text-gray-700" />
                      </div>
                      <p className="text-center capitalize font-medium">{style}</p>
                    </button>
                  ))}
                </div>
                <div className="flex justify-between mt-8">
                  <button
                    onClick={() => setStep(3)}
                    className="text-gray-600 hover:text-gray-900 transition"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(5)}
                    className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="space-y-6">
                <p className="text-gray-600 mb-6">
                  How much time can you dedicate to maintenance?
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {maintenanceLevels.map((level) => (
                    <button
                      key={level}
                      onClick={() => setMaintenanceLevel(level)}
                      className={`p-6 rounded-lg border-2 transition ${
                        maintenanceLevel === level
                          ? 'border-indigo-600 bg-indigo-50'
                          : 'border-gray-200 hover:border-indigo-300'
                      }`}
                    >
                      <div className="flex justify-center mb-3">
                        <Clock className="h-6 w-6 text-gray-700" />
                      </div>
                      <p className="text-center capitalize font-medium">{level}</p>
                      <p className="text-sm text-gray-500 text-center mt-2">
                        {level === 'low' && '5-10 minutes daily'}
                        {level === 'medium' && '10-15 minutes daily'}
                        {level === 'high' && '15+ minutes daily'}
                      </p>
                    </button>
                  ))}
                </div>
                <div className="flex justify-between mt-8">
                  <button
                    onClick={() => setStep(4)}
                    className="text-gray-600 hover:text-gray-900 transition"
                  >
                    Back
                  </button>
                  <button
                    onClick={generateRecommendations}
                    className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition flex items-center space-x-2"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span>Generating...</span>
                      </>
                    ) : (
                      <>
                        <span>Generate Recommendations</span>
                        <Sparkles className="h-5 w-5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {step === 6 && recommendations.length > 0 && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {recommendations.map((rec, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                      <img 
                        src={rec.imageUrl} 
                        alt={`Style recommendation ${index + 1}`}
                        className="w-full h-64 object-cover"
                      />
                      <div className="p-4">
                        <p className="text-gray-800 mb-4">{rec.description}</p>
                        <h3 className="font-semibold text-gray-900 mb-2">Maintenance Tips:</h3>
                        <ul className="space-y-2">
                          {rec.maintenanceTips.map((tip, tipIndex) => (
                            <li key={tipIndex} className="flex items-start space-x-2">
                              <Scissors className="h-5 w-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-600">{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center mt-8">
                  <button
                    onClick={() => setStep(1)}
                    className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
                  >
                    Start Over
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="bg-white mt-12 py-8 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <UserCircle2 className="h-6 w-6 text-indigo-600" />
                <span className="text-lg font-bold text-gray-900">StyleAI Advisor</span>
              </div>
              <p className="text-gray-600">
                Personalized AI-powered style recommendations for everyone.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Developer</h3>
              <p className="text-gray-600">Syed Mohsin Bukhari</p>
              <p className="text-gray-600">Full Stack Developer & UI/UX Designer</p>
              <div className="flex space-x-4 mt-4">
                <a href="https://github.com/mayourbukhari" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
                  <Github className="h-5 w-5" />
                </a>
                <a href="https://linkedin.com/in/syed-mohsin-bukhari/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="mailto:syedmohsinb786@gmail.com" className="text-gray-600 hover:text-gray-900">
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact</h3>
              <p className="text-gray-600">For inquiries and support:</p>
              <a href="mailto:syedmohsinb786@gmail.com" className="text-indigo-600 hover:text-indigo-700">
                syedmohsinb786@gmail.com
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-gray-600">
            <p>© {new Date().getFullYear()} StyleAI Advisor. Designed and developed by Syed Mohsin Bukhari</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;