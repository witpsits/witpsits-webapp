import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ShieldCheck, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  Terminal, 
  Fingerprint,
  AlertTriangle,
  ArrowRight,
  ShieldAlert
} from "lucide-react";
import { supabase } from "../../lib/supabaseClient";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      const user = data.user;
      
      // Database-Driven Admin Check (Stealth Mode)
      // This ensures no admin emails are hardcoded in the frontend.
      const { data: adminData, error: adminError } = await supabase
        .from('authorized_admins')
        .select('email')
        .eq('email', user.email)
        .single();

      if (adminError || !adminData) {
        await supabase.auth.signOut();
        console.warn("Unauthorized access attempt successfully blocked for:", user.email);
        throw new Error("ACCESS DENIED: Your account is not on the authorized administrator list.");
      }

      navigate("/admin");
    } catch (err) {
      setError(err.message);
      setAttempts(prev => prev + 1);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0E1528] flex items-center justify-center p-4 font-['Space_Grotesk',sans-serif] relative overflow-hidden">
      {/* Background Animated Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#5671FF]/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#FF602D]/10 rounded-full blur-[120px] animate-pulse delay-700"></div>
        
        {/* Decorative Grid */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ 
          backgroundImage: 'linear-gradient(#5671FF 1px, transparent 1px), linear-gradient(90deg, #5671FF 1px, transparent 1px)',
          backgroundSize: '40px 40px' 
        }}></div>
      </div>

      <div className="w-full max-w-md relative z-10 transition-all duration-500">
        {/* Logo/Shield Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-[#5671FF] to-[#FF602D] rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative bg-[#1a2238] p-5 rounded-full border border-[#5671FF]/30 shadow-2xl">
              <ShieldCheck className="w-10 h-10 text-[#5671FF]" />
            </div>
            {attempts > 2 && (
               <div className="absolute -top-1 -right-1 bg-red-500 rounded-full p-1 animate-bounce">
                  <ShieldAlert className="w-4 h-4 text-white" />
               </div>
            )}
          </div>
          <h1 className="text-3xl font-black mt-6 tracking-tight text-white flex items-center gap-2">
            ADMIN <span className="text-[#5671FF] italic">PORTAL</span>
          </h1>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em] mt-2 flex items-center gap-2">
            <Terminal className="w-3 h-3 text-[#5671FF]" />
            Secure Access Gateway
          </p>
        </div>

        {/* Login Form Card */}
        <div className="bg-[#1a2238]/80 backdrop-blur-xl border border-[#5671FF]/20 rounded-2xl overflow-hidden shadow-2xl relative">
          {/* Top Status Bar */}
          <div className="bg-[#5671FF]/10 px-6 py-2 border-b border-[#5671FF]/10 flex items-center justify-between">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/40"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/40"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/40"></div>
            </div>
            <span className="text-[10px] text-[#5671FF] font-mono font-bold tracking-widest">{new Date().toISOString().split('T')[1].split('.')[0]} ACCESS_REQ_SECURE</span>
          </div>

          <form onSubmit={handleLogin} className="p-8 space-y-6">
            {error && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex gap-3 animate-shake">
                <AlertTriangle className="w-5 h-5 text-red-500 shrink-0" />
                <p className="text-red-500 text-xs font-bold uppercase leading-relaxed tracking-tight">
                  {error}
                </p>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                <User className="w-3 h-3 text-[#5671FF]" />
                Admin Credentials
              </label>
              <div className="relative group">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin.identifier@wit.edu.ph"
                  className="w-full bg-[#0E1528] border border-[#5671FF]/20 focus:border-[#5671FF] rounded-xl py-4 px-5 text-white placeholder:text-slate-600 outline-none transition-all focus:ring-4 focus:ring-[#5671FF]/10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                <Lock className="w-3 h-3 text-[#5671FF]" />
                Secure Key
              </label>
              <div className="relative group">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-[#0E1528] border border-[#5671FF]/20 focus:border-[#5671FF] rounded-xl py-4 px-5 pr-12 text-white placeholder:text-slate-600 outline-none transition-all focus:ring-4 focus:ring-[#5671FF]/10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-[#5671FF] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#5671FF] to-[#445cd4] hover:to-[#5671FF] text-white font-black py-4 rounded-xl shadow-lg shadow-[#5671FF]/20 flex items-center justify-center gap-3 transition-all active:scale-[0.98] disabled:opacity-50 overflow-hidden relative group"
            >
              <div className="absolute inset-x-0 bottom-0 h-0.5 bg-white/20 scale-x-0 group-hover:scale-x-100 transition-transform"></div>
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span className="uppercase tracking-[0.2em] text-xs">Authenticating...</span>
                </>
              ) : (
                <>
                  <Fingerprint className="w-5 h-5 text-white/80 group-hover:scale-110 transition-transform" />
                  <span className="uppercase tracking-[0.2em] text-xs">Authorize Entry</span>
                  <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </>
              )}
            </button>
          </form>

          {/* Card Footer */}
          <div className="px-8 pb-8 flex flex-col items-center">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-[#5671FF]/20 to-transparent mb-6"></div>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest text-center">
              WIT SYSTEM ADMINISTRATOR ACCESS ONLY
              <br />
              <span className="opacity-50 mt-1 block tracking-normal italic text-[8px]">All access attempts are fully logged and monitored in accordance with WIT security policies.</span>
            </p>
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-8 text-center">
          <button 
            onClick={() => navigate("/")}
            className="text-slate-500 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-2 mx-auto"
          >
            Return to Public Portal
          </button>
        </div>
      </div>

      {/* CSS For Animations */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        .animate-shake {
          animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        }
      `}</style>
    </div>
  );
};

export default AdminLogin;
