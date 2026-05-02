'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { AuthLoading } from '@/components/ui/AuthLoading';


export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccessScreen, setShowSuccessScreen] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (res?.ok) {
        setShowSuccessScreen(true);
      } else {
        setError('Invalid email or password');
        setLoading(false);
      }
    } catch (err) {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (showSuccessScreen) {
    return <AuthLoading onComplete={() => {
      router.push('/');
      router.refresh();
    }} />;
  }

  return (
    <div className="min-h-screen bg-brand-dark flex flex-col items-center justify-center p-6">
      <Link href="/" className="mb-8 cursor-pointer group">
        <div className="flex items-center space-x-1">
          <div className="w-8 h-8 bg-brand-purple flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] border border-brand-purple/50 group-hover:scale-105 transition-transform">
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor">
              <rect x="2" y="4" width="8" height="3" />
              <rect x="4.5" y="7" width="3" height="13" />
              <rect x="14" y="4" width="8" height="3" />
              <rect x="14" y="7" width="3" height="3" />
              <rect x="14" y="10" width="8" height="3" />
              <rect x="19" y="13" width="3" height="4" />
              <rect x="14" y="17" width="8" height="3" />
            </svg>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tighter">
            TRAC<span className="text-brand-purple">STAC</span>
          </h1>
        </div>
      </Link>

      <Card className="w-full max-w-md border border-white/5 shadow-2xl">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-2xl font-black italic uppercase tracking-tighter">Welcome Back</CardTitle>
          <p className="text-white/50 text-sm">Enter your credentials to access the stack.</p>
        </CardHeader>
        <CardContent className="space-y-6 pt-4">
          {error && <p className="bg-red-500/10 border border-red-500/50 text-red-500 text-xs p-3 rounded-lg text-center font-bold">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-white/50 ml-1">Email Address</label>
              <input 
                required
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com" 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-purple transition-colors placeholder:text-white/20"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-white/50 ml-1">Password</label>
              <div className="relative">
                <input 
                  required
                  type={showPassword ? 'text' : 'password'} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-purple transition-colors placeholder:text-white/20 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors p-1"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
               <Link href="#" className="text-xs text-brand-purple font-bold hover:underline">Forgot Password?</Link>
            </div>
            <Button 
              disabled={loading}
              type="submit" 
              variant="primary" 
              className="w-full py-4 font-black uppercase tracking-widest mt-2"
            >
              {loading ? 'Logging in...' : 'Login to Portal'}
            </Button>
          </form>


          <p className="text-center text-sm text-white/40">
            New User? <Link href="/signup" className="text-brand-purple font-bold hover:underline cursor-pointer">Signup here</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
