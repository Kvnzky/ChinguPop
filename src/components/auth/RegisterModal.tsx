import React, { useState, useEffect } from 'react';
import { UserProfile } from '../../types';
import { storage, STARTER_STUDENT_DEFAULT_PASSWORD } from '../../services/storageService';
import {
  User,
  Mail,
  Clock,
  Compass,
  CheckCircle2,
  Globe,
  ArrowRight,
  X,
  Lock,
  Eye,
  EyeOff,
  KeyRound,
  AlertCircle,
  ShieldCheck,
  LogIn,
  UserPlus,
  Sparkles
} from 'lucide-react';

export type AuthModalTab = 'signin' | 'register' | 'forgot';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegistered: (user: UserProfile) => void;
  currentUserId?: string;
  initialTab?: AuthModalTab;
}

export const RegisterModal: React.FC<RegisterModalProps> = ({
  isOpen,
  onClose,
  onRegistered,
  currentUserId,
  initialTab = 'register'
}) => {
  const [tab, setTab] = useState<AuthModalTab>(initialTab);

  // Registration Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [dailyMinutes, setDailyMinutes] = useState<number>(60);
  const [studyDaysPerWeek, setStudyDaysPerWeek] = useState<number>(7);
  const [goal, setGoal] = useState<string>('K-Pop, K-Drama & Conversational Fluency');
  const [filipinoSupport, setFilipinoSupport] = useState<boolean>(true);

  // Sign-In Form State
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [showSignInPassword, setShowSignInPassword] = useState(false);

  // Forgot / Reset Password State
  const [resetEmail, setResetEmail] = useState('');
  const [resetStep, setResetStep] = useState<1 | 2>(1);
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [verificationCode, setVerificationCode] = useState('');
  const [newResetPassword, setNewResetPassword] = useState('');
  const [confirmResetPassword, setConfirmResetPassword] = useState('');

  // Status & Feedback State
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [registeredUser, setRegisteredUser] = useState<UserProfile | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTab(initialTab);
      setError(null);
      setSuccessMessage(null);
      setRegisteredUser(null);
    }
  }, [isOpen, initialTab]);

  if (!isOpen) return null;

  const activeSession = storage.getSession();
  const currentUser = currentUserId ? storage.getUserById(currentUserId) : undefined;

  // Password validation indicators for registration
  const hasMinLength = password.length >= 8;
  const hasLetter = /[A-Za-z]/.test(password);
  const hasNumOrSpecial = /[0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);
  const passwordsMatch = password.length > 0 && password === confirmPassword;

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedName || trimmedName.length < 2) {
      setError('Please enter your full name (at least 2 characters).');
      return;
    }

    if (!storage.validateEmail(trimmedEmail)) {
      setError('Please enter a valid email address (e.g. alex@example.com).');
      return;
    }

    if (storage.isEmailTaken(trimmedEmail)) {
      setError('An account with this email address is already registered. Please sign in instead.');
      return;
    }

    const pwdCheck = storage.validatePasswordStrength(password);
    if (!pwdCheck.valid) {
      setError(pwdCheck.message || 'Password does not meet security requirements.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match. Please re-enter your confirmation password.');
      return;
    }

    setIsSubmitting(true);
    try {
      const newStudent = storage.registerStudent({
        name: trimmedName,
        email: trimmedEmail,
        password,
        confirmPassword,
        dailyStudyMinutes: dailyMinutes,
        studyDaysPerWeek,
        filipinoSupport,
        bio: `${trimmedName}'s Korean Journey: Focused on ${goal}.`
      });

      setRegisteredUser(newStudent);
      setSuccessMessage(
        `Welcome to ChinguPop, ${newStudent.name}! Your scholar account (${newStudent.studentId}) has been created and verified.`
      );
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      onRegistered(newStudent);
    } catch (err: any) {
      setError(err?.message || 'Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!signInEmail.trim()) {
      setError('Please enter your registered email address.');
      return;
    }
    if (!signInPassword) {
      setError('Please enter your password.');
      return;
    }

    setIsSubmitting(true);
    try {
      const authenticatedUser = storage.authenticateUser(signInEmail.trim(), signInPassword);
      setSignInPassword('');
      onRegistered(authenticatedUser);
      onClose();
    } catch (err: any) {
      setError(err?.message || 'Sign-in failed. Please verify your email and password.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRequestResetCode = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    try {
      const result = storage.requestPasswordReset(resetEmail.trim());
      setGeneratedCode(result.code);
      setVerificationCode(result.code);
      setResetStep(2);
      setSuccessMessage(
        `Verification code generated for ${resetEmail.trim()}. Enter the 6-digit code below to set your new password.`
      );
    } catch (err: any) {
      setError(err?.message || 'Could not initiate password reset.');
    }
  };

  const handleResetPasswordConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    try {
      const updatedUser = storage.resetPasswordWithCode(
        resetEmail.trim(),
        verificationCode.trim(),
        newResetPassword,
        confirmResetPassword
      );
      setSignInEmail(updatedUser.email);
      setSignInPassword('');
      setNewResetPassword('');
      setConfirmResetPassword('');
      setVerificationCode('');
      setGeneratedCode(null);
      setResetStep(1);
      setTab('signin');
      setSuccessMessage('Your password has been reset successfully! You can now sign in with your new password.');
    } catch (err: any) {
      setError(err?.message || 'Password reset failed.');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
    >
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-purple-200 relative my-8">
        
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-[#2C1E6D] via-[#4F35C8] to-[#6C52EE] text-white p-6 relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono tracking-widest text-[#55C8F5] uppercase font-bold">
              ChinguPop Academy
            </span>
            <span className="text-[10px] bg-white/20 border border-purple-300/40 text-purple-100 px-2 py-0.5 rounded-full font-bold">
              Secure Scholar Portal
            </span>
          </div>

          <h2 id="auth-modal-title" className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            {tab === 'register' && (
              <>
                <span>Free Student Registration</span>
                <span className="text-lg font-korean text-purple-200 font-normal">무료 가입</span>
              </>
            )}
            {tab === 'signin' && (
              <>
                <span>Scholar Sign In</span>
                <span className="text-lg font-korean text-purple-200 font-normal">로그인</span>
              </>
            )}
            {tab === 'forgot' && (
              <>
                <span>Reset Account Password</span>
                <span className="text-lg font-korean text-purple-200 font-normal">비밀번호 재설정</span>
              </>
            )}
          </h2>

          <p className="text-xs text-purple-100/90 mt-1">
            {tab === 'register' && 'Create your verified student account to track Hangul, pronunciation, and SRS progress.'}
            {tab === 'signin' && 'Sign in with your registered email address and password to resume your Korean journey.'}
            {tab === 'forgot' && 'Verify your registered email address to securely reset your account password.'}
          </p>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 mt-4 pt-3 border-t border-purple-400/30">
            <button
              type="button"
              onClick={() => {
                setTab('signin');
                setError(null);
                setSuccessMessage(null);
                setRegisteredUser(null);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                tab === 'signin'
                  ? 'bg-white text-[#2C1E6D] shadow-sm'
                  : 'text-purple-200 hover:text-white hover:bg-white/10'
              }`}
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setTab('register');
                setError(null);
                setSuccessMessage(null);
                setRegisteredUser(null);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                tab === 'register'
                  ? 'bg-white text-[#2C1E6D] shadow-sm'
                  : 'text-purple-200 hover:text-white hover:bg-white/10'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Create Account</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setTab('forgot');
                setResetStep(1);
                setError(null);
                setSuccessMessage(null);
                setRegisteredUser(null);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                tab === 'forgot'
                  ? 'bg-white text-[#2C1E6D] shadow-sm'
                  : 'text-purple-200 hover:text-white hover:bg-white/10'
              }`}
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Forgot Password</span>
            </button>
          </div>
        </div>

        {/* Active Session Notice if already authenticated */}
        {activeSession && currentUser && !registeredUser && (
          <div className="mx-6 mt-4 p-3 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2 text-[#2C1E6D]">
              <ShieldCheck className="w-4 h-4 text-[#6C52EE] shrink-0" />
              <span>
                Signed in as <strong>{currentUser.name}</strong> ({currentUser.email})
              </span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="text-[11px] font-bold text-[#6C52EE] hover:underline shrink-0"
            >
              Keep Session
            </button>
          </div>
        )}

        {/* Registration Confirmation View */}
        {registeredUser && (
          <div className="p-6 space-y-5 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-1.5">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                Account Created & Email Verified
              </span>
              <h3 className="text-xl font-bold text-[#1E1B4B]">
                Welcome, {registeredUser.name}!
              </h3>
              <p className="text-xs text-stone-600 max-w-sm mx-auto">
                Your scholar profile is now active and synchronized across the ChinguPop Academy portal.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-left space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-stone-500">Scholar ID:</span>
                <span className="font-mono font-bold text-[#6C52EE]">{registeredUser.studentId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Registered Email:</span>
                <span className="font-semibold text-stone-800">{registeredUser.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Assigned Role:</span>
                <span className="uppercase font-mono text-[11px] px-2 py-0.2 rounded bg-purple-100 text-[#2C1E6D] font-bold">
                  {registeredUser.role}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Account Status:</span>
                <span className="uppercase font-mono text-[11px] px-2 py-0.2 rounded bg-emerald-100 text-emerald-800 font-bold">
                  {registeredUser.status || 'active'}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setRegisteredUser(null);
                onClose();
              }}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#2C1E6D] to-[#6C52EE] hover:from-[#3B288C] hover:to-[#553ACF] text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span>Enter My Scholar Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Tab 1: Sign In Form */}
        {!registeredUser && tab === 'signin' && (
          <form onSubmit={handleSignInSubmit} className="p-6 space-y-4" noValidate>
            {error && (
              <div role="alert" className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {successMessage && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
                <span>{successMessage}</span>
              </div>
            )}

            <div className="space-y-1">
              <label htmlFor="signin-email" className="text-xs font-bold text-[#1E1B4B] flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#6C52EE]" />
                <span>Email Address (이메일)</span>
              </label>
              <input
                id="signin-email"
                type="email"
                value={signInEmail}
                onChange={(e) => setSignInEmail(e.target.value)}
                placeholder="e.g. alex@example.com"
                autoComplete="email"
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#6C52EE]/30 focus:border-[#6C52EE]"
              />
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label htmlFor="signin-password" className="text-xs font-bold text-[#1E1B4B] flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-[#6C52EE]" />
                  <span>Password (비밀번호)</span>
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setResetEmail(signInEmail);
                    setTab('forgot');
                    setResetStep(1);
                    setError(null);
                  }}
                  className="text-[11px] font-semibold text-[#6C52EE] hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  id="signin-password"
                  type={showSignInPassword ? 'text' : 'password'}
                  value={signInPassword}
                  onChange={(e) => setSignInPassword(e.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                  className="w-full px-3.5 py-2.5 pr-10 rounded-xl border border-stone-200 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#6C52EE]/30 focus:border-[#6C52EE]"
                />
                <button
                  type="button"
                  onClick={() => setShowSignInPassword(!showSignInPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                  aria-label={showSignInPassword ? 'Hide password' : 'Show password'}
                >
                  {showSignInPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#2C1E6D] to-[#6C52EE] hover:from-[#3B288C] hover:to-[#553ACF] disabled:opacity-60 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-md active:scale-98 flex items-center justify-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                <span>{isSubmitting ? 'Signing In...' : 'Sign In to Account'}</span>
              </button>
            </div>

            {/* Saved Accounts on This Browser Quick-Select */}
            {storage.getStudents().length > 0 && (
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-[#1E1B4B]">Registered Scholar Accounts on This Device:</span>
                  <span className="text-[10px] text-stone-500">Click to fill email</span>
                </div>
                <div className="space-y-1.5 max-h-32 overflow-y-auto">
                  {storage.getStudents().map((st) => {
                    const hasPwd = storage.hasPassword(st.id);
                    const isDemo = st.email === 'learner@chingupop.com';
                    return (
                      <button
                        key={st.id}
                        type="button"
                        onClick={() => {
                          setSignInEmail(st.email);
                          if (isDemo) {
                            setSignInPassword(STARTER_STUDENT_DEFAULT_PASSWORD);
                          }
                          setError(null);
                        }}
                        className="w-full text-left px-2.5 py-1.5 rounded-lg bg-white hover:bg-purple-50 border border-stone-200 hover:border-purple-300 flex items-center justify-between text-[11px] transition-colors"
                      >
                        <div className="truncate">
                          <span className="font-bold text-[#1E1B4B]">{st.name}</span>
                          <span className="text-stone-500 font-mono text-[10px] ml-1.5">({st.email})</span>
                        </div>
                        <span className="text-[10px] font-bold text-[#6C52EE] shrink-0 ml-2">
                          {isDemo ? 'Fill Demo' : hasPwd ? 'Select' : 'Set Password'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="text-center pt-1">
              <button
                type="button"
                onClick={() => {
                  setTab('register');
                  setError(null);
                }}
                className="text-xs font-bold text-[#6C52EE] hover:underline"
              >
                New to ChinguPop? Create a free student account →
              </button>
            </div>
          </form>
        )}

        {/* Tab 2: New Registration Form */}
        {!registeredUser && tab === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="p-6 space-y-3.5" noValidate>
            {error && (
              <div role="alert" className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-1">
              <label htmlFor="reg-name" className="text-xs font-bold text-[#1E1B4B] flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#6C52EE]" />
                <span>Full Name (성명) *</span>
              </label>
              <input
                id="reg-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Alex Kim"
                autoComplete="name"
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#6C52EE]/30 focus:border-[#6C52EE]"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="reg-email" className="text-xs font-bold text-[#1E1B4B] flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#6C52EE]" />
                <span>Email Address (이메일) *</span>
              </label>
              <input
                id="reg-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. alex@example.com"
                autoComplete="email"
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#6C52EE]/30 focus:border-[#6C52EE]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label htmlFor="reg-password" className="text-xs font-bold text-[#1E1B4B] flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-[#6C52EE]" />
                  <span>Password *</span>
                </label>
                <div className="relative">
                  <input
                    id="reg-password"
                    type={showRegPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min. 8 chars"
                    autoComplete="new-password"
                    required
                    className="w-full px-3.5 py-2 pr-9 rounded-xl border border-stone-200 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#6C52EE]/30 focus:border-[#6C52EE]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowRegPassword(!showRegPassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                    aria-label={showRegPassword ? 'Hide password' : 'Show password'}
                  >
                    {showRegPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="reg-confirm-password" className="text-xs font-bold text-[#1E1B4B] flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-[#6C52EE]" />
                  <span>Confirm Password *</span>
                </label>
                <input
                  id="reg-confirm-password"
                  type={showRegPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                  autoComplete="new-password"
                  required
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-200 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#6C52EE]/30 focus:border-[#6C52EE]"
                />
              </div>
            </div>

            {/* Password Requirements Checklist */}
            <div className="grid grid-cols-2 gap-1.5 px-3 py-2 rounded-xl bg-stone-50 border border-stone-200/80 text-[10px]">
              <div className={`flex items-center gap-1 ${hasMinLength ? 'text-emerald-700 font-semibold' : 'text-stone-500'}`}>
                <span>{hasMinLength ? '✓' : '○'}</span>
                <span>At least 8 characters</span>
              </div>
              <div className={`flex items-center gap-1 ${hasLetter ? 'text-emerald-700 font-semibold' : 'text-stone-500'}`}>
                <span>{hasLetter ? '✓' : '○'}</span>
                <span>Contains a letter (A–Z)</span>
              </div>
              <div className={`flex items-center gap-1 ${hasNumOrSpecial ? 'text-emerald-700 font-semibold' : 'text-stone-500'}`}>
                <span>{hasNumOrSpecial ? '✓' : '○'}</span>
                <span>Number or symbol</span>
              </div>
              <div className={`flex items-center gap-1 ${passwordsMatch ? 'text-emerald-700 font-semibold' : 'text-stone-500'}`}>
                <span>{passwordsMatch ? '✓' : '○'}</span>
                <span>Passwords match</span>
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="reg-goal" className="text-xs font-bold text-[#1E1B4B] flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-[#6C52EE]" />
                <span>Primary Learning Goal (학습 목표)</span>
              </label>
              <select
                id="reg-goal"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-stone-200 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#6C52EE]/30 focus:border-[#6C52EE] bg-white"
              >
                <option value="K-Pop, K-Drama & Conversational Fluency">K-Pop, K-Drama & Conversational Korean</option>
                <option value="Travel & Daily Survival Korean">Travel & Everyday Communication in Korea</option>
                <option value="TOPIK I Certification & Grammar Foundation">TOPIK I Certification & Academic Foundation</option>
                <option value="Business & Workplace Korean">Business & Professional Korean Communication</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label htmlFor="reg-minutes" className="text-xs font-bold text-[#1E1B4B] flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#6C52EE]" />
                  <span>Daily Commitment</span>
                </label>
                <select
                  id="reg-minutes"
                  value={dailyMinutes}
                  onChange={(e) => setDailyMinutes(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#6C52EE]/30 focus:border-[#6C52EE] bg-white"
                >
                  <option value={15}>15 Mins / Day</option>
                  <option value={30}>30 Mins / Day</option>
                  <option value={60}>60 Mins / Day (Standard)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label htmlFor="reg-days" className="text-xs font-bold text-[#1E1B4B]">
                  Study Schedule
                </label>
                <select
                  id="reg-days"
                  value={studyDaysPerWeek}
                  onChange={(e) => setStudyDaysPerWeek(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#6C52EE]/30 focus:border-[#6C52EE] bg-white"
                >
                  <option value={5}>5 Days / Week</option>
                  <option value={7}>7 Days / Week (Daily)</option>
                </select>
              </div>
            </div>

            {/* Filipino Support Option */}
            <label className="flex items-start gap-2.5 p-2.5 rounded-xl border border-stone-200 bg-stone-50 cursor-pointer hover:bg-stone-100/70 transition-colors">
              <input
                type="checkbox"
                checked={filipinoSupport}
                onChange={(e) => setFilipinoSupport(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded text-[#6C52EE] focus:ring-[#6C52EE]"
              />
              <div className="text-xs">
                <span className="font-bold text-[#1E1B4B] flex items-center gap-1">
                  <Globe className="w-3 h-3 text-amber-600" />
                  Enable Filipino bilingual study notes (Tagalog hints)
                </span>
                <span className="text-[11px] text-stone-500 block">
                  Includes helpful phonetic and grammar comparisons with Tagalog alongside English.
                </span>
              </div>
            </label>

            {/* Submit Action */}
            <div className="pt-1">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#FF5CA8] to-[#FF4D94] hover:from-[#FF4D94] hover:to-[#E63985] disabled:opacity-60 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-md active:scale-98 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isSubmitting ? 'Creating Account...' : 'Create Free Student Account'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={() => {
                  setTab('signin');
                  setError(null);
                }}
                className="text-xs font-bold text-[#6C52EE] hover:underline"
              >
                Already have an account? Sign In →
              </button>
            </div>
          </form>
        )}

        {/* Tab 3: Forgot / Reset Password Flow */}
        {!registeredUser && tab === 'forgot' && (
          <div className="p-6 space-y-4">
            {error && (
              <div role="alert" className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {successMessage && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
                <span>{successMessage}</span>
              </div>
            )}

            {resetStep === 1 ? (
              <form onSubmit={handleRequestResetCode} className="space-y-4" noValidate>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Enter the email address associated with your student account. We will generate a 6-digit verification code to reset your password.
                </p>

                <div className="space-y-1">
                  <label htmlFor="reset-email" className="text-xs font-bold text-[#1E1B4B] flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#6C52EE]" />
                    <span>Registered Email Address</span>
                  </label>
                  <input
                    id="reset-email"
                    type="email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="e.g. alex@example.com"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#6C52EE]/30 focus:border-[#6C52EE]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#2C1E6D] to-[#6C52EE] hover:from-[#3B288C] hover:to-[#553ACF] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md"
                >
                  Send 6-Digit Verification Code
                </button>
              </form>
            ) : (
              <form onSubmit={handleResetPasswordConfirm} className="space-y-4" noValidate>
                {generatedCode && (
                  <div className="p-3 rounded-xl bg-purple-50 border border-purple-200 text-xs text-[#2C1E6D] flex items-center justify-between">
                    <span>Verification Code for <strong>{resetEmail}</strong>:</span>
                    <span className="font-mono font-extrabold text-sm bg-white px-2.5 py-1 rounded border border-purple-300 text-[#6C52EE] tracking-widest">
                      {generatedCode}
                    </span>
                  </div>
                )}

                <div className="space-y-1">
                  <label htmlFor="reset-code" className="text-xs font-bold text-[#1E1B4B]">
                    6-Digit Verification Code
                  </label>
                  <input
                    id="reset-code"
                    type="text"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    placeholder="123456"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs font-mono tracking-widest text-stone-800"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="reset-new-pwd" className="text-xs font-bold text-[#1E1B4B]">
                    New Password (min. 8 chars, letter + number/symbol)
                  </label>
                  <input
                    id="reset-new-pwd"
                    type="password"
                    value={newResetPassword}
                    onChange={(e) => setNewResetPassword(e.target.value)}
                    placeholder="Enter new strong password"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs text-stone-800"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="reset-confirm-pwd" className="text-xs font-bold text-[#1E1B4B]">
                    Confirm New Password
                  </label>
                  <input
                    id="reset-confirm-pwd"
                    type="password"
                    value={confirmResetPassword}
                    onChange={(e) => setConfirmResetPassword(e.target.value)}
                    placeholder="Re-enter new password"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs text-stone-800"
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setResetStep(1);
                      setError(null);
                    }}
                    className="px-4 py-2.5 rounded-xl border border-stone-200 text-xs font-bold text-stone-600 hover:bg-stone-50"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#2C1E6D] to-[#6C52EE] text-white font-bold text-xs uppercase tracking-wider shadow-md"
                  >
                    Reset Password
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
