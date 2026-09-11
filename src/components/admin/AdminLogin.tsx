import React, { useState } from 'react';
import { Lock, Mail, ArrowLeft, ShieldAlert, KeyRound, CheckCircle } from 'lucide-react';
import { loginAdmin } from '../../services/authService';
import { isFirebaseConfigured } from '../../services/firebase';
import { AdminUser } from '../../types';

interface AdminLoginProps {
  onSuccess: (user: AdminUser) => void;
  onBackToSite: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onSuccess, onBackToSite }) => {
  const [email, setEmail] = useState('evolutionfitnesstresrios@gmail.com');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const firebaseReady = isFirebaseConfigured();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const user = await loginAdmin(email, password);
      onSuccess(user);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha na autenticação. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B0E] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-md w-full">
        {/* Back link */}
        <button
          onClick={onBackToSite}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#94A3B8] hover:text-white mb-8 cursor-pointer transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para o site público</span>
        </button>

        {/* Card */}
        <div className="bg-[#14141B] border border-[#22222E] rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-[#C8102E]/10 border border-[#C8102E]/30 flex items-center justify-center mx-auto mb-4 text-[#C8102E]">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-extrabold text-white font-display">
              Acesso Administrativo
            </h2>
            <p className="text-xs text-[#94A3B8] mt-1">
              Academia Evolution Fitness • Gestão de Conteúdo
            </p>
          </div>

          {/* Status info box */}
          <div className="mb-6 p-3 rounded-xl bg-[#1A1A22] border border-[#282836] text-xs">
            <div className="flex items-center gap-2 mb-1">
              {firebaseReady ? (
                <>
                  <CheckCircle className="w-4 h-4 text-[#10B981]" />
                  <span className="font-semibold text-white">Firebase Authentication Conectado</span>
                </>
              ) : (
                <>
                  <KeyRound className="w-4 h-4 text-[#D4AF37]" />
                  <span className="font-semibold text-[#D4AF37]">Modo de Demonstração / Preview</span>
                </>
              )}
            </div>
            <p className="text-[#94A3B8] text-[11px] leading-relaxed">
              {firebaseReady
                ? 'Conexão em nuvem ativa. Insira o e-mail e a senha cadastrados no Firebase.'
                : 'Você pode testar o painel inserindo qualquer senha de 6+ dígitos (ex: 123456). Na publicação, o Firebase Auth validará os dados.'}
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3 rounded-lg bg-[#EF4444]/10 border border-[#EF4444]/30 flex items-start gap-2.5 text-xs text-[#EF4444]">
              <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#CBD5E1] mb-1.5">
                E-mail do Administrador
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#64748B] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@evolutionfitness.com.br"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-lg bg-[#0F0F14] border border-[#282836] text-white text-sm focus:outline-none focus:border-[#C8102E] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#CBD5E1] mb-1.5">
                Senha de Acesso
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#64748B] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-lg bg-[#0F0F14] border border-[#282836] text-white text-sm focus:outline-none focus:border-[#C8102E] transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-[#C8102E] hover:bg-[#A60D24] text-white font-bold text-sm transition-all shadow-md mt-2 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <span>Validando acesso...</span>
              ) : (
                <span>Entrar no Painel</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
