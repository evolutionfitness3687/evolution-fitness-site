import React, { useState } from 'react';
import {
  Settings,
  ShieldCheck,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Key,
  Server,
  Terminal,
  ExternalLink,
} from 'lucide-react';
import { isFirebaseConfigured } from '../../../services/firebase';
import { resetToConfirmedData } from '../../../services/dataService';
import { ConfirmModal } from '../ConfirmModal';

interface SettingsTabProps {
  onShowToast: (msg: string) => void;
}

export const SettingsTab: React.FC<SettingsTabProps> = ({ onShowToast }) => {
  const [confirmResetOpen, setConfirmResetOpen] = useState(false);
  const [resetting, setResetting] = useState(false);

  const firebaseReady = isFirebaseConfigured();

  const handleResetData = async () => {
    setResetting(true);
    try {
      await resetToConfirmedData();
      onShowToast('Dados restaurados para o padrão confirmado da Evolution Fitness!');
    } catch {
      onShowToast('Erro ao restaurar dados.');
    } finally {
      setResetting(false);
      setConfirmResetOpen(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h2 className="text-xl font-bold text-white font-display">
          Configurações do Sistema e Publicação
        </h2>
        <p className="text-xs text-[#94A3B8] mt-0.5">
          Status da infraestrutura, chaves de ambiente e instruções para publicação no GitHub e Vercel.
        </p>
      </div>

      {/* Integration Status Card */}
      <div className="rounded-2xl bg-[#14141B] border border-[#22222E] p-6 sm:p-8">
        <h3 className="text-base font-bold text-white font-display mb-4 flex items-center gap-2">
          <Server className="w-4 h-4 text-[#C8102E]" />
          <span>Status da Conexão com Firebase</span>
        </h3>

        <div className="p-4 rounded-xl bg-[#1A1A22] border border-[#282836] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            {firebaseReady ? (
              <CheckCircle2 className="w-6 h-6 text-[#10B981] shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-6 h-6 text-[#D4AF37] shrink-0 mt-0.5" />
            )}
            <div>
              <h4 className="text-sm font-bold text-white">
                {firebaseReady
                  ? 'Firebase Conectado e Ativo'
                  : 'Modo de Armazenamento Local / Preview Ativo'}
              </h4>
              <p className="text-xs text-[#94A3B8] mt-1 leading-relaxed">
                {firebaseReady
                  ? 'Todas as alterações são sincronizadas em nuvem no Firestore e Firebase Storage em tempo real.'
                  : 'As alterações são salvas localmente no navegador (localStorage). Para sincronização em nuvem e autenticação definitiva, configure as credenciais no .env.'}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">
            Variáveis de Ambiente (Vite / Vercel)
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
            {[
              'VITE_FIREBASE_API_KEY',
              'VITE_FIREBASE_AUTH_DOMAIN',
              'VITE_FIREBASE_PROJECT_ID',
              'VITE_FIREBASE_STORAGE_BUCKET',
              'VITE_FIREBASE_MESSAGING_SENDER_ID',
              'VITE_FIREBASE_APP_ID',
            ].map((keyName) => {
              const val = (import.meta.env as unknown as Record<string, string | undefined>)[keyName];
              const hasVal = Boolean(val && val.length > 5);

              return (
                <div
                  key={keyName}
                  className="p-2.5 rounded-lg bg-[#0F0F14] border border-[#22222E] flex items-center justify-between"
                >
                  <span className="text-[#CBD5E1] truncate">{keyName}</span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      hasVal ? 'bg-[#10B981]/15 text-[#10B981]' : 'bg-[#EF4444]/15 text-[#EF4444]'
                    }`}
                  >
                    {hasVal ? 'Configurada' : 'Pendente'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Guide: How to create first admin */}
      <div className="rounded-2xl bg-[#14141B] border border-[#22222E] p-6 sm:p-8 space-y-4">
        <h3 className="text-base font-bold text-white font-display flex items-center gap-2">
          <Key className="w-4 h-4 text-[#C8102E]" />
          <span>Como Criar o Primeiro Administrador no Firebase</span>
        </h3>

        <div className="text-xs text-[#94A3B8] space-y-2.5 leading-relaxed">
          <p>
            1. Acesse o console do Firebase em <strong className="text-white">console.firebase.google.com</strong> e abra o seu projeto.
          </p>
          <p>
            2. No menu lateral, acesse <strong className="text-white">Authentication → Users (Usuários)</strong>.
          </p>
          <p>
            3. Clique em <strong className="text-white">Adicionar Usuário</strong>, insira o e-mail oficial (<code className="text-[#C8102E]">evolutionfitnesstresrios@gmail.com</code>) e defina uma senha forte.
          </p>
          <p>
            4. Ative o método de login <strong className="text-white">E-mail/senha</strong> na aba <strong className="text-white">Sign-in method</strong>.
          </p>
          <p>
            5. Pronto! O responsável já poderá fazer login e gerenciar toda a academia sem tocar em código.
          </p>
        </div>
      </div>

      {/* Reset Data to Initial */}
      <div className="rounded-2xl bg-[#14141B] border border-[#EF4444]/30 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-white font-display flex items-center gap-2">
            <RotateCcw className="w-4 h-4 text-[#EF4444]" />
            <span>Restaurar Dados Originais</span>
          </h3>
          <p className="text-xs text-[#94A3B8] mt-1 max-w-lg">
            Restaura todas as modalidades, textos, horários e dados de contato para o padrão original confirmado da Academia Evolution Fitness em Três Rios.
          </p>
        </div>

        <button
          onClick={() => setConfirmResetOpen(true)}
          className="px-4 py-2.5 rounded-lg border border-[#EF4444]/40 text-[#EF4444] hover:bg-[#EF4444]/10 text-xs font-bold transition-colors cursor-pointer shrink-0"
        >
          Restaurar Padrão
        </button>
      </div>

      <ConfirmModal
        isOpen={confirmResetOpen}
        title="Restaurar Dados Originais?"
        message="Esta ação substituirá o conteúdo atual pelas informações originais fornecidas pela academia (horários de 06h às 22h, modalidades confirmadas e contatos oficiais). Deseja continuar?"
        confirmLabel={resetting ? 'Restaurando...' : 'Sim, Restaurar'}
        onConfirm={handleResetData}
        onCancel={() => setConfirmResetOpen(false)}
      />
    </div>
  );
};
