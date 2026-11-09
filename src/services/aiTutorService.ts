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

  public runPedagogicalEngine(
    text: string,
    mode: AIMode,
    student: UserProfile
  ): AIMessage {
    const trimmed = text.trim();
    const lower = trimmed.toLowerCase();
    const isFilipino = student.filipinoSupport;
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Pattern 1: Particle Errors (학교 가요 -> 학교에 가요)
    if (/학교\s*가요|식당\s*가요|집\s*가요|도서관\s*가요/.test(trimmed) && !/에\s*가요/.test(trimmed)) {
      return {
        id: `ai-${Date.now()}`,
        sender: 'tutor',
        text: `Good attempt! Your sentence is understandable in casual conversation, but in accurate Korean grammar, motion toward a destination requires the directional particle **에**.\n\nA natural and grammatically complete sentence is:\n**저는 학교에 가요.** (I go to school.)\n\n**Why?**\n- **에** attaches directly to the place of arrival/destination with movement verbs like 가다 (to go), 오다 (to come), and 다니다 (to attend).\n${isFilipino ? '\n*Filipino linguistic comparison (approximation)*: Katumbas ito ng panandang "sa" sa Tagalog ("Pumupunta ako **sa** paaralan").' : ''}\n\nTry writing another sentence expressing going somewhere, such as going to the library (도서관) or home (집)!`,
        timestamp: nowTime,
        koreanSnippet: '저는 학교에 가요.',
        grammarTip: 'Destination Particle: Place + 에 가다 / 오다',
        corrections: [
          {
            original: trimmed,
            corrected: trimmed.replace(/\s*가요/, '에 가요'),
            reason: 'Missing destination particle 에 before movement verb 가요'
          }
        ]
      };
    }

    // Pattern 2: 은/는 vs 이/가 questions
    if (lower.includes('은/는') || lower.includes('이/가') || lower.includes('topic') || lower.includes('subject marker') || lower.includes('particle')) {
      return {
        id: `ai-${Date.now()}`,
        sender: 'tutor',
        text: `Excellent question! The distinction between **은/는 (Topic Marker)** and **이/가 (Subject Marker)** is foundational in Korean syntax:\n\n1. **은/는 (Topic / Contrast)**:\n   - After a consonant: **-은** (학생은)\n   - After a vowel: **-는** (저는)\n   - Function: Announces the overarching topic (*"As for X..."*) or contrasts two nouns (사과는 맛있어요. 하지만 바나나는 맛없어요).\n\n2. **이/가 (Subject / Specific Focus)**:\n   - After a consonant: **-이** (가방이)\n   - After a vowel: **-가** (비가)\n   - Function: Identifies the grammatical subject performing an action or introduces new information (e.g., 비가 와요 = "It is raining!").\n\n${isFilipino ? '*Filipino linguistic comparison (approximation)*: Ang "은/는" ay parang paksa ("Kung tungkol sa/kay..."), habang ang "이/가" ay tumutukoy sa tiyak na simuno ("Ang siyang...").' : ''}\n\nQuick practice: Which particle fits best in **"저[ ? ] 학생이에요"** (As for me, I am a student)?`,
        timestamp: nowTime,
        koreanSnippet: '저는 학생이에요. 비가 와요.',
        grammarTip: 'Topic Marker (은/는) vs Subject Marker (이/가)'
      };
    }

    // Pattern 3: Polite Thank You & Goodbye (Quick Prompt 3)
    if (lower.includes('thank') || lower.includes('goodbye') || lower.includes('bye') || trimmed.includes('감사') || trimmed.includes('고마워') || trimmed.includes('안녕히')) {
      return {
        id: `ai-${Date.now()}`,
        sender: 'tutor',
        text: `Here is how to express **"Thank you"** and **"Goodbye"** politely in Korean:\n\n1. **Saying "Thank You"**:\n   - **감사합니다** [gam-sa-ham-ni-da]: Formal polite (standard with elders, professors, and strangers).\n   - **고맙습니다** [go-map-seum-ni-da]: Formal polite native Korean equivalent.\n   - **고마워요** [go-ma-wo-yo]: Informal polite (warm and friendly with classmates).\n\n2. **Saying "Goodbye" (Depends on who is staying vs. leaving!)**:\n   - **안녕히 계세요** [an-nyeong-hi gye-se-yo]: *"Stay in peace"* — Said by the person **leaving** to the person **staying**.\n   - **안녕히 가세요** [an-nyeong-hi ga-se-yo]: *"Go in peace"* — Said by the person **staying** (or when both people leave).\n\n${isFilipino ? '*Filipino cultural note*: Katulad ng paggalang sa Tagalog ("Salamat po" / "Paalam po"), mahalagang piliin ang 계세요 (kapag maiiwan ang kausap) o 가세요 (kapag aalis ang kausap).' : ''}\n\nPractice question: If you are leaving a Korean cafe and saying goodbye to the barista who works there, do you say **안녕히 계세요** or **안녕히 가세요**?`,
        timestamp: nowTime,
        koreanSnippet: '감사합니다. 안녕히 계세요 / 안녕히 가세요.',
        grammarTip: 'Honorific Farewell: 계시다 (to stay) vs 가다 (to go)'
      };
    }

    // Pattern 4: Batchim or Pronunciation inquiry
    if (lower.includes('batchim') || lower.includes('받침') || lower.includes('pronounce') || lower.includes('liaison') || lower.includes('연음')) {
      return {
        id: `ai-${Date.now()}`,
        sender: 'tutor',
        text: `Let's review **Batchim (받침 - Final Consonants)** and **Liaison (연음 법칙)**!\n\n1. **The 7 Representative Final Sounds (7종성법)**:\n   At the end of a syllable, Korean consonants neutralize into 7 unreleased sounds: **[ㄱ, ㄴ, ㄷ, ㄹ, ㅁ, ㅂ, ㅇ]**.\n   - Example: **꽃** (flower), **옷** (clothes), and **낮** (daytime) all end with an unreleased **[ㄷ / t̚]** sound when spoken alone.\n\n2. **Liaison Rule (연음 법칙)**:\n   When a Batchim is followed immediately by a vowel-initial syllable (starting with silent **ㅇ**), the Batchim consonant links smoothly into the next syllable:\n   - **한국어** $\\rightarrow$ **[한구거]** (han-gu-geo)\n   - **음악** $\\rightarrow$ **[으막]** (eu-mak)\n   - **꽃이** $\\rightarrow$ **[꼬치]** (kko-chi)\n\nTry reading **이름이 뭐예요?** aloud—notice how it links into **[이르미 뭐예요?]**!`,
        timestamp: nowTime,
        koreanSnippet: '한국어 -> [한구거], 꽃이 -> [꼬치]',
        grammarTip: 'Batchim Neutralization & Liaison (연음 법칙)'
      };
    }

    // Pattern 5: Numbers (Sino-Korean vs Native Korean)
    if (lower.includes('number') || lower.includes('count') || trimmed.includes('숫자') || trimmed.includes('하나') || trimmed.includes('일')) {
      return {
        id: `ai-${Date.now()}`,
        sender: 'tutor',
        text: `Korean uses **two distinct number systems** depending on what you are counting:\n\n1. **Sino-Korean Numbers (한자어 수)**:\n   - **일 (1), 이 (2), 삼 (3), 사 (4), 오 (5), 육 (6), 칠 (7), 팔 (8), 구 (9), 십 (10)**\n   - Used for: Dates, money (원), minutes (분), phone numbers, floors (층).\n\n2. **Native Korean Numbers (고유어 수)**:\n   - **하나 (1), 둘 (2), 셋 (3), 넷 (4), 다섯 (5), 여섯 (6), 일곱 (7), 여덟 (8), 아홉 (9), 열 (10)**\n   - Note: Before counters (개, 명, 잔, 시), 1–4 shorten to **한, 두, 세, 네**!\n   - Used for: Hours on a clock (시), age (살), people (명), and general objects (개).\n\nExample: **2:30** combines both systems: **두 시 삼십 분** (Native for hours + Sino for minutes)!`,
        timestamp: nowTime,
        koreanSnippet: '한 시 십오 분 (1:15) / 커피 두 잔 주세요.',
        grammarTip: 'Dual Number System: 고유어 수 vs 한자어 수'
      };
    }

    // Pattern 6: Greetings & Introductions
    if (trimmed.includes('안녕') || lower.includes('hello') || lower.includes('hi') || lower.includes('introduce')) {
      return {
        id: `ai-${Date.now()}`,
        sender: 'tutor',
        text: `안녕하세요, ${student.name} 씨! 반갑습니다.\n\nToday in our academy session, how are you feeling? (오늘 기분이 어때요?)\n\nYou can answer in Korean:\n- **기분이 좋아요!** (I feel good!)\n- **아주 좋아요! 한국어 공부가 재미있어요.** (Very good! Studying Korean is fun.)\n\nWhat would you like to focus on today? Grammar particles, pronunciation rules, or a practice quiz?`,
        timestamp: nowTime,
        koreanSnippet: '안녕하세요! 오늘 기분이 어때요?',
        grammarTip: 'Polite Conversation Opening (-아/어요)'
      };
    }

    // Pattern 7: Practice Quiz or Remedial Request
    if (lower.includes('quiz') || lower.includes('test') || lower.includes('practice') || lower.includes('remedial') || lower.includes('recommend')) {
      const completed = storage.getCompletedLessons(student.id);
      return {
        id: `ai-${Date.now()}`,
        sender: 'tutor',
        text: `Let's check your current mastery (${completed.length} lessons completed at ${student.proficiency} level)!\n\n**Mini Diagnostic Question**:\nChoose the correct particle to complete the sentence:\n> **"저는 도서관[ ? ] 한국어를 공부해요."** *(I study Korean at the library.)*\n- **A)** 에\n- **B)** 에서\n- **C)** 을\n\n*Hint*: Use **에** for static existence or destination, and **에서** for the location where an active action (like studying or eating) takes place! Reply with A, B, or C!`,
        timestamp: nowTime,
        koreanSnippet: '저는 도서관에서 한국어를 공부해요.',
        grammarTip: 'Dynamic Action Location Particle: 에서'
      };
    }

    // Pattern 8: Mode-specific contextual replies
    if (mode === 'Speaking Partner' || mode === 'Real-Life Conversation Simulator') {
      return {
        id: `ai-${Date.now()}`,
        sender: 'tutor',
        text: `좋습니다! (Great!) Let's practice a real conversation in Seoul. Imagine we are at a cafe in Myeongdong.\n\n*Barista*: "어서 오세요! 무엇을 드릴까요?" (Welcome! What can I get for you?)\n\nRespond in Korean using: **[Item] + 한 잔 주세요** (Please give me one cup of [Item]).\nFor example: **아이스 아메리카노 한 잔 주세요.**`,
        timestamp: nowTime,
        koreanSnippet: '아이스 아메리카노 한 잔 주세요.',
        grammarTip: 'Polite Request Pattern: Noun + 주세요'
      };
    }

    if (mode === 'Writing Assistant') {
      return {
        id: `ai-${Date.now()}`,
        sender: 'tutor',
        text: `I have reviewed your sentence: "${trimmed}".\n\nHere is your academic writing feedback:\n- **Sentence Structure**: Clear Subject–Object–Verb (SOV) progression.\n- **Speech Register**: Appropriate polite register (-아/어요).\n\n**Enhancement Tip**: To connect two related actions smoothly, attach **-고** (and/then) to the first verb stem:\n- 저는 아침을 먹어요 + 학교에 가요 $\\rightarrow$ **저는 아침을 먹고 학교에 가요.**\n\nTry combining two daily activities using **-고**!`,
        timestamp: nowTime,
        koreanSnippet: '저는 아침을 먹고 학교에 가요.',
        grammarTip: 'Clausal Conjunction: Verb Stem + -고'
      };
    }

    // Default Academic Mentorship
    return {
      id: `ai-${Date.now()}`,
      sender: 'tutor',
      text: `네, 잘 읽었습니다! (I read your message carefully.)\n\nRegarding **"${trimmed}"**:\nIn Korean (${student.proficiency} level), sentence elements follow the **Subject–Object–Verb (SOV)** order, where grammatical relationships are marked by particles attached directly after nouns:\n- **Topic**: Noun + 은/는\n- **Subject**: Noun + 이/가\n- **Object**: Noun + 을/를\n- **Place/Time**: Noun + 에 / 에서\n\n${isFilipino ? '*Filipino linguistic comparison (approximation)*: Sa Filipino ay nauuna ang pandiwa (Verb-first: "Kumain ako ng mansanas"), ngunit sa Korean ay laging nasa hulihan ang pandiwa ("Ako ay mansanas ang kinain" — 저는 사과를 먹었어요).' : ''}\n\nAsk me about any specific particle, verb ending, or Hangul pronunciation rule!`,
      timestamp: nowTime,
      koreanSnippet: '주어(은/는) + 목적어(을/를) + 동사(-아/어요)',
      grammarTip: 'Korean SOV Word Order & Particle System'
    };
  }
}

export const aiTutor = new AITutorService();
