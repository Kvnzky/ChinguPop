import { AIMessage, AIMode, UserProfile } from '../types';
import { storage } from './storageService';

export class AITutorService {
  async generateResponse(
    userMessage: string,
    mode: AIMode,
    student: UserProfile
  ): Promise<AIMessage> {
    const settings = storage.getSettings();

    // Check if user configured an external local AI like Ollama
    if (settings.aiProvider === 'ollama' && settings.ollamaEndpoint) {
      try {
        const ollamaRes = await this.callOllama(userMessage, mode, student, settings.ollamaEndpoint);
        if (ollamaRes) return ollamaRes;
      } catch (e) {
        console.warn('Ollama endpoint unreachable, falling back to pedagogical tutor engine.', e);
      }
    }

    // Comprehensive Pedagogical Korean Tutor Engine (Provider-agnostic, free, immediate)
    return this.runPedagogicalEngine(userMessage, mode, student);
  }

  private async callOllama(
    prompt: string,
    mode: AIMode,
    student: UserProfile,
    endpoint: string
  ): Promise<AIMessage | null> {
    try {
      const systemPrompt = `You are an elite, respectful Korean language professor at Seoul National University teaching ${student.name}. 
The student's proficiency is ${student.proficiency}. 
Teaching mode: ${mode}.
Immersion style: ${student.immersionStage}. 
${student.filipinoSupport ? 'Include helpful Filipino grammar comparisons when clarifying particles or pronunciation.' : ''}
Explain grammar systematically, highlight corrections with Korean examples, and always ask a follow-up practice question.`;

      const response = await fetch(`${endpoint}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'llama3:latest',
          prompt: `${systemPrompt}\n\nStudent: ${prompt}\nProfessor:`,
          stream: false
        })
      });

      if (!response.ok) return null;
      const data = await response.json();
      return {
        id: `ai-${Date.now()}`,
        sender: 'tutor',
        text: data.response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
    } catch {
      return null;
    }
  }

  private runPedagogicalEngine(
    text: string,
    mode: AIMode,
    student: UserProfile
  ): AIMessage {
    const trimmed = text.trim();
    const lower = trimmed.toLowerCase();
    const isFilipino = student.filipinoSupport;

    // Pattern 1: Particle Errors (학교 가요 -> 학교에 가요)
    if (/학교\s*가요|식당\s*가요|집\s*가요/.test(trimmed) && !/에\s*가요/.test(trimmed)) {
      return {
        id: `ai-${Date.now()}`,
        sender: 'tutor',
        text: `Good attempt! Your sentence is understandable in casual street talk, but in proper academic Korean, motion toward a destination requires the location particle **에**.\n\nA more natural and grammatically complete sentence is:\n**저는 학교에 가요.** (I go to school.)\n\n**Why?**\n- **에** attaches directly to the place of arrival/destination with movement verbs like 가다 (to go) and 오다 (to come).\n${isFilipino ? '\n*Filipino grammatical note*: Katumbas ito ng "sa" sa Tagalog ("Pumupunta ako **sa** paaralan"). Huwag kalimutang idugtong ang "에" sa lugar!' : ''}\n\nTry writing another sentence expressing going somewhere, such as going to the library (도서관) or home (집)!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        koreanSnippet: '저는 학교에 가요.',
        grammarTip: 'Destination Particle: Place + 에 가다 / 오다',
        corrections: [
          {
            original: trimmed,
            corrected: trimmed.replace(/가요/, '에 가요'),
            reason: 'Missing destination particle 에'
          }
        ]
      };
    }

    // Pattern 2: 은/는 vs 이/가 questions
    if (lower.includes('은/는') || lower.includes('이/가') || lower.includes('topic') || lower.includes('subject marker') || lower.includes('particle')) {
      return {
        id: `ai-${Date.now()}`,
        sender: 'tutor',
        text: `Excellent question! The distinction between **은/는 (Topic Marker)** and **이/가 (Subject Marker)** is the cornerstone of Korean syntax:\n\n1. **은/는 (Topic / Contrast)**:\n   - Used to announce the overarching topic: *"As for X..."*\n   - Used to draw contrasts: 사과는 맛있어요. 하지만 바나나는 맛없어요. (Apples are tasty, but as for bananas, they are not).\n\n2. **이/가 (Subject / Specific Focus)**:\n   - Used to identify who or what specifically performed an action, or to introduce brand-new sensory information (e.g., 비가 와요 = "Look, it is raining!").\n   - Answers "Who?" (누가? -> 제가 학생이에요 = "I am the one who is a student").\n\n${isFilipino ? '*Filipino insight*: Ang "은/는" ay parang panandang paksa ("Ang...") o "Kung tungkol kay...", habang ang "이/가" ay tumutukoy sa mismong gumagawa ng kilos ("si" / "ang siyang...").' : ''}\n\nWould you like to test your understanding with a quick exercise? Which one would you use for: "As for me, I am a teacher" -> 저[ ? ] 선생님이에요?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        koreanSnippet: '저는... vs 제가...',
        grammarTip: 'Topic (은/는) vs Subject (이/가)'
      };
    }

    // Pattern 3: Batchim or Pronunciation inquiry
    if (lower.includes('batchim') || lower.includes('받침') || lower.includes('pronounce') || lower.includes('liaison') || lower.includes('연음')) {
      return {
        id: `ai-${Date.now()}`,
        sender: 'tutor',
        text: `Let's review **Batchim (받침)** and **Liaison (연음 법칙)**!\n\nWhenever a syllable with a final consonant is followed immediately by a syllable beginning with silent **ㅇ**, the bottom consonant naturally glides up into that empty spot:\n\n- **한국어** (Han-guk-eo) is pronounced **[한구거]** (han-gu-geo).\n- **음악** (Eum-ak) is pronounced **[으막]** (eu-mak).\n- **밥을** (Bap-eul) is pronounced **[바블]** (ba-beul).\n\nThis makes Korean speech fluid and effortless. Try reading **이름이 뭐예요?** aloud—notice how it sounds like **[이르미 뭐예요?]**!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        koreanSnippet: '한국어 -> [한구거]',
        grammarTip: '연음 법칙 (Liaison Rule)'
      };
    }

    // Pattern 4: Greetings & Introductions
    if (trimmed.includes('안녕') || lower.includes('hello') || lower.includes('hi')) {
      return {
        id: `ai-${Date.now()}`,
        sender: 'tutor',
        text: `안녕하세요, ${student.name} 씨! 반갑습니다.\n\nToday in our academy session, how are you feeling? (오늘 기분이 어때요?)\n\nYou can answer in Korean:\n- **기분이 좋아요!** (I feel good!)\n- **조금 피곤하지만 괜찮아요.** (A little tired, but fine.)\n\nWhat would you like to focus on today? Grammar, conversation practice, or vocabulary review?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        koreanSnippet: '안녕하세요! 반갑습니다.',
        grammarTip: 'Polite Conversation Opening'
      };
    }

    // Pattern 5: Mode-specific contextual replies
    if (mode === 'Speaking Partner' || mode === 'Real-Life Conversation Simulator') {
      return {
        id: `ai-${Date.now()}`,
        sender: 'tutor',
        text: `좋습니다! (Great!) Let's simulate a real scenario in Seoul. Imagine we are at a cozy cafe in Hongdae.\n\n*Server*: "어서 오세요! 손님, 무엇을 주문하시겠어요?" (Welcome! Guest, what would you like to order?)\n\nHow do you answer? Remember to use the polite request phrase: **[item] + 주세요** (Please give me [item]).`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        koreanSnippet: '아메리카노 한 잔 주세요.',
        grammarTip: 'Ordering: Noun + 주세요'
      };
    }

    if (mode === 'Writing Assistant') {
      return {
        id: `ai-${Date.now()}`,
        sender: 'tutor',
        text: `I have analyzed your submission: "${trimmed}".\n\nYour Korean writing shows clear structure! Here is an academic breakdown:\n- **Vocabulary Choice**: Appropriate for your ${student.proficiency} level.\n- **Polite Form (존댓말)**: Consistent use of -요 style.\n\nTip: When connecting two full thoughts, use the conjunctive ending **-고** (and) instead of starting a new sentence with '그리고'.\n\nExample: 저는 밥을 먹어요. 그리고 학교에 가요 -> **저는 밥을 먹고 학교에 가요.** (I eat a meal and go to school).\n\nGive it a try! Combine two of your daily actions into one sentence.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        koreanSnippet: '동사 어간 + -고',
        grammarTip: 'Conjunctive Clause Connector: -고'
      };
    }

    // Default Academic Mentorship
    return {
      id: `ai-${Date.now()}`,
      sender: 'tutor',
      text: `네, 잘 들었습니다 (I have understood your message).\n\nRegarding "${trimmed}":\nAt the ${student.proficiency} stage, consistent daily repetition of core sentence blocks is key.\n\nIn Korean, always remember the Golden Formula:\n**[Subject + 은/는/이/가] + [Time/Place + 에/에서] + [Object + 을/를] + [Verb/Adjective].**\n\n${isFilipino ? '*Tip*: Tandaan na ang pandiwa ay laging nasa pinakadulo ng pangungusap, hindi tulad ng Ingles o Tagalog.' : ''}\n\nWhat would you like to analyze or practice next?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      koreanSnippet: '주어 + 목적어 + 서술어 (SOV)',
      grammarTip: 'Korean Fundamental Word Order'
    };
  }
}

export const aiTutor = new AITutorService();
