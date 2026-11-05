# HANGUL ACADEMY (한글 아카데미)
## A Premium University-Style Korean Language Learning Management System (LMS) & AI Tutor

**Hangul Academy** is a complete, production-ready Korean language learning platform and academic management system. It provides a structured university institute experience modeled after premier Korean language institutes in Seoul (such as Seoul National University's Language Education Institute).

---

## 🏛️ Academic & Architectural Philosophy

Unlike gamified language apps with cartoon mascots, hearts, lives, and artificial streak pressures, **Hangul Academy** focuses on genuine academic mastery:

- **Four Competencies**: Balanced training across **Reading (읽기)**, **Writing (쓰기)**, **Listening (듣기)**, and **Speaking (말하기)**.
- **Dual Track**: Strict alignment with **TOPIK I & TOPIK II** standards combined with a practical conversational oral proficiency curriculum.
- **Progressive Immersion**: Dynamically adapts instruction language:
  - *Pre-A1 / Beginner*: Core English explanations + Tagalog/Filipino bridge for grammar particles and pronunciation.
  - *Elementary*: Bilingual with Korean classroom instructions.
  - *Intermediate*: Predominantly Korean with English reserved for nuanced syntax.
  - *Advanced*: 100% authentic native Korean immersion.
- **Zero Paid API Requirement**: Fully functional out of the box using client-side browser speech engines and a built-in pedagogical Korean linguistics engine. Supports optional local open-source LLMs (Ollama) or custom endpoints with complete transparency.

---

## 🚀 Key Modules & Capabilities

### 1. 🔤 Dedicated Hangul Reading & Writing Lab
- **Interactive Hangul Alphabet Chart**: 21 Vowels (10 basic, 11 compound/diphthongs) and 19 Consonants (14 basic, 5 double tense).
- **The 7 Representative Batchim (받침) Sounds**: Interactive breakdown of why final consonants collapse into 7 phonetic stops (`[ㄱ], [ㄴ], [ㄷ], [ㄹ], [ㅁ], [ㅂ], [ㅇ]`) and Liaison (*연음 법칙*).
- **Syllable Block Construction Lab**: Real-time geometric assembly of Initial (초성) + Medial (중성) + Final Batchim (종성) with dynamic Unicode synthesis.
- **HTML5 Touch/Mouse Stroke Canvas**: Stroke order tracing with stroke clear, width controls, and watermark guides.

### 2. 🎓 Virtual University Classroom
- **Seoul Institute Lesson Flow**: Learning objectives, comprehensive academic explanation, Korean examples in context with pronunciation guides, vocabulary drawers, and interactive knowledge checks.
- **Virtual Whiteboard**: Visual breakdown of grammar formulas, particle badges, and common beginner pitfalls.
- **Student Personal Notebook**: Persistent private note-taking per lesson stored directly in student records.
- **Asynchronous & Live Bridge**: Built-in attendance logging and live conferencing integration hooks.

### 3. 🎙️ Oral Speaking Laboratory & Pronunciation Feedback
- **Speech Synthesis**: Native Korean audio playback with normal (0.85x) and slow (0.65x) speed toggles.
- **Microphone Articulation Scoring**: Real-time speech recognition matching student speech against target Korean sentences.
- **Diagnostic Syllable Breakdown**: Visual indicators for matched (`✓`) and missed (`✗`) syllables with phonetic feedback.
- **Ethical Transparency**: Discloses that browser-based speech recognition serves as an acoustic feedback approximation and does not fabricate acoustic phoneme lab grades.

### 4. 🤖 Personal AI Korean Teacher
- **9 Specialized Teaching Modes**:
  1. *Grammar Tutor*
  2. *Speaking Partner*
  3. *Vocabulary Tutor*
  4. *Writing Assistant*
  5. *Pronunciation Practice*
  6. *Reading Comprehension Tutor*
  7. *Listening Practice Tutor*
  8. *TOPIK Preparation Tutor*
  9. *Real-Life Conversation Simulator* (Campus, Cafe, Subway, Shopping, Workplace)
- **Pedagogical Corrections**: Explains *why* sentences are unnatural, breaks down mistakes into original vs corrected forms, and provides immediate follow-up practice prompts.
- **Filipino Language Scaffolding**: Clarifies Korean particles (`은/는`, `이/가`, `을/를`) and pronunciation using Filipino linguistic analogies (e.g. topic marker comparison to Tagalog *"ang"*).

### 5. 🧠 Spaced Repetition Vocabulary (SuperMemo SM-2)
- **Scientific SM-2 Algorithm**: Quality ratings: *Again* (1d interval), *Hard* (1-2d), *Good* (3-6d), *Easy* (7+d).
- **Card Anatomy**: Korean word, audio pronunciation, romanization, part of speech, English & Filipino translations, and contextual example sentences.
- **Custom Word Deck**: Students can add new words with parts of speech and custom examples.

### 6. 📝 Assignments, Quizzes & Examinations
- **Written Coursework**: Homework prompts, student essay submissions, teacher feedback review, and AI grammar diagnostics.
- **Timed Evaluations**: Weekly mastery quizzes and monthly TOPIK evaluation exams with countdown timers.
- **Automatic Grading & Academic Pass/Fail Scale**:
  - **Grade A**: 90–100% (Distinction)
  - **Grade B**: 80–89% (Merit)
  - **Grade C**: 70–79% (Satisfactory)
  - **Grade D**: 60–69% (Pass)
  - **Grade F**: Below 60% (Remedial required)

### 7. 📅 Personalized 60-Minute Daily Study Planner
- **Target Allocation**:
  - *20 min*: Structured core lesson
  - *10 min*: Grammar and vocabulary (SM-2)
  - *10 min*: Listening practice and audio dictation
  - *10 min*: Speaking lab voice articulation
  - *5 min*: Reading or writing comprehension
  - *5 min*: Review and homework submission
- **7-Day Dynamic Calendar**: Each day focuses on a distinct linguistic competency.

### 8. 📜 Official Certificates & Verification System
- **Formal Completion Diplomas**: Complete with student name, course level, conferral date, honors grade, registration number, and unique verification code.
- **Verification Portal**: Allows public verification of credentials via certificate registration number.
- **Print Optimization**: High-resolution print CSS for framing and official transcripts.

### 9. 👥 Multi-Student & Role-Based Management
- **Student Role**: Min-ji Dela Cruz (Default Pre-A1 student, 60m/day, Filipino notes ON), Alexandre Dubois (Level 1 student). Each student has independent progress, flashcards, submissions, and notes.
- **Teacher Role**: Prof. Min-jun Kim (채점 및 피드백) with submission queue, grading tools, and feedback editors.
- **Dean / Admin Role**: Dean Sung-ho Park with student directory management, course & lesson publishing tools, system settings, and JSON database export/reset.

---

## 🛠️ Technology Stack & Zero-Cost Architecture

- **Frontend**: React 19, TypeScript, Tailwind CSS, Lucide Icons, Vite 6.
- **PWA**: Installable web app manifest (`manifest.webmanifest`), Service Worker offline caching (`sw.js`).
- **Data Persistence**: Offline-first unified storage engine in `localStorage` / `IndexedDB`, plus complete PostgreSQL & Supabase SQL schema with Row-Level Security in `supabase/schema.sql`.
- **Speech**: Web Speech API (`SpeechSynthesis` with `ko-KR` voice selection and `webkitSpeechRecognition`).
- **Zero Paid Dependencies**: Does not require any mandatory paid subscription or API key.

---

## 🏃 Running the Application Locally

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation & Launch
```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Build production bundle
npm run build
```

Open your browser at `http://localhost:5173`.

---

## 💾 Optional Supabase Cloud Integration

If you wish to sync with remote Supabase cloud storage, simply configure `.env`:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

Then execute the relational schema provided in `supabase/schema.sql` in the Supabase SQL Editor. When credentials are omitted, the application operates on its persistent offline-first unified storage service with 100% features available.

---

## 📄 License & Academic Integrity
Built for educational excellence in Korean language pedagogy. All linguistic materials, explanations, and Hangul assets adhere to the official standards of the National Institute of Korean Language (국립국어원).
