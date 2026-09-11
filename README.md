# Evolution Fitness Studio — Website Institucional & Painel Administrativo

Aplicação web completa, moderna, premium e responsiva desenvolvida para a academia **Evolution Fitness Studio**, localizada em **Três Rios - RJ**.

O projeto conta com:
1. **Site Público Institucional**: Apresentação da marca, modalidades com indicação de turmas ativas e aviso sobre o retorno do Jump, compromisso de acompanhamento, galeria de fotos reais, vídeos, depoimentos de alunos, horários de funcionamento dinâmicos, localização com botão "Como Chegar" e canais oficiais de contato (WhatsApp e Instagram).
2. **Painel Administrativo Protegido**: Sistema de gerenciamento visual para a responsável pela academia atualizar todos os textos, fotos, modalidades, horários e contatos sem precisar editar código.
3. **Persistência Híbrida**: Funciona de forma autônoma em modo de pré-visualização (localStorage reativo) e com sincronização em nuvem completa via **Firebase (Firestore, Authentication e Storage)**.

---

## 1. Identidade e Informações Confirmadas

- **Nome**: Evolution Fitness Studio
- **Cidade**: Três Rios - RJ
- **Endereço**: Rua Doutor Valmir Peçanha, 50, Três Rios - RJ, CEP 25802-180
- **WhatsApp**: (24) 98143-3386 (`https://wa.me/5524981433386`)
- **Instagram**: `@evolutionfitness_tr` (`https://www.instagram.com/evolutionfitness_tr/`)
- **Horários Padrão**:
  - Segunda a Sexta: 06:00 às 22:00
  - Sábado: 08:00 às 13:00
  - Domingo: Fechado
- **Modalidades Confirmadas**:
  - Musculação
  - GAP
  - Spinning
  - Glúteos
  - Circuito
  - Body Pump
  - Aulas coletivas
  - *Jump* (com o aviso explícito e obrigatório: **Previsto para retornar**)

---

## 2. Tecnologias Utilizadas

- **React 18** com **TypeScript** e **Vite**
- **Tailwind CSS** (design premium, sem neons, respeitando a paleta oficial da marca)
- **Lucide Icons**
- **Firebase v11** (Firestore, Firebase Authentication e Firebase Storage)
- **Arquitetura Reativa**: Suporte instantâneo tanto para ambiente local/preview quanto para produção em nuvem.

---

## 3. Passo a Passo: Publicação e Deploy

### A. Conectar ao Repositório GitHub

1. Inicialize o repositório local caso ainda não o tenha feito:
   ```bash
   git init
   git add .
   git commit -m "feat: site institucional e painel evolution fitness studio"
   ```
2. Crie um novo repositório no seu GitHub (ex: `evolution-fitness-studio`).
3. Conecte o repositório local ao GitHub e envie os arquivos:
   ```bash
   git remote add origin https://github.com/SEU_USUARIO/evolution-fitness-studio.git
   git branch -M main
   git push -u origin main
   ```

---

### B. Como Hospedar na Vercel

1. Acesse **[vercel.com](https://vercel.com)** e faça login com a sua conta GitHub.
2. Clique em **Add New...** → **Project**.
3. Importe o repositório `evolution-fitness-studio`.
4. Em **Framework Preset**, o Vite será detectado automaticamente.
5. Em **Environment Variables**, adicione as variáveis do Firebase descritas no item **D** abaixo.
6. Clique em **Deploy**. Seu site estará no ar com certificado SSL gratuito e alta velocidade de carregamento!

---

### C. Como Configurar o Firebase (Authentication, Firestore e Storage)

#### 1. Criar o Projeto no Firebase
1. Acesse o **[Console do Firebase](https://console.firebase.google.com/)**.
2. Clique em **Adicionar projeto** e dê o nome `evolution-fitness-studio`.
3. Siga os passos e finalize a criação.
4. No painel do projeto, clique no ícone **Web (`</>`)** para registrar a aplicação web.
5. Copie as chaves do objeto `firebaseConfig`.

#### 2. Configurar o Firebase Authentication
1. No menu lateral do Firebase, clique em **Criação** → **Authentication**.
2. Clique em **Vamos começar**.
3. Na aba **Sign-in method**, selecione **E-mail/senha**, ative a primeira opção e clique em **Salvar**.
4. Na aba **Users (Usuários)**, clique em **Adicionar usuário**:
   - E-mail: `evolutionfitnesstresrios@gmail.com`
   - Senha: Crie uma senha segura para a responsável pelo estúdio.

#### 3. Configurar o Firestore Database
1. No menu lateral, acesse **Criação** → **Firestore Database**.
2. Clique em **Criar banco de dados**.
3. Escolha o local do servidor mais próximo (ex: `southamerica-east1` em São Paulo).
4. Na aba **Regras**, utilize as regras seguras:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       // Qualquer pessoa pode ler o conteúdo público da academia
       match /site_content/{document} {
         allow read: if true;
         // Apenas o administrador autenticado pode alterar o conteúdo
         allow write: if request.auth != null;
       }
     }
   }
   ```
5. Clique em **Publicar**.

#### 4. Configurar o Firebase Storage
1. No menu lateral, acesse **Criação** → **Storage**.
2. Clique em **Começar**.
3. Na aba **Regras**, configure:
   ```javascript
   rules_version = '2';
   service firebase.storage {
     match /b/{bucket}/o {
       match /{allPaths=**} {
         allow read: if true;
         allow write: if request.auth != null;
       }
     }
   }
   ```
4. Clique em **Publicar**.

---

### D. Como Inserir as Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto (ou adicione na Vercel nas configurações do projeto em *Settings* → *Environment Variables*):

```env
VITE_FIREBASE_API_KEY=sua_api_key_aqui
VITE_FIREBASE_AUTH_DOMAIN=evolution-fitness-studio.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=evolution-fitness-studio
VITE_FIREBASE_STORAGE_BUCKET=evolution-fitness-studio.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id_aqui
VITE_FIREBASE_APP_ID=seu_app_id_aqui
```

---

## 4. Como Acessar o Painel Administrativo

1. No rodapé do site institucional ou através do botão no topo, clique em **Acesso Administrativo** (ou acesse diretamente pelo link com `#admin` no final da URL).
2. Informe o e-mail: `evolutionfitnesstresrios@gmail.com`
3. Digite a senha cadastrada.
4. Você terá acesso ao painel com abas completas para gerenciar:
   - **Dashboard**: Métricas em tempo real e atalhos rápidos.
   - **Conteúdo do site**: Headline, subtítulo e apresentação institucional.
   - **Modalidades**: Adicionar, editar, alterar imagem, ativar/desativar e reordenar turmas.
   - **Fotos**: Upload e gerenciamento da galeria com texto alternativo para SEO.
   - **Vídeos**: Cadastro de vídeos via link do YouTube, Instagram ou upload MP4.
   - **Depoimentos**: Cadastro de depoimentos com nome, foto e data.
   - **Horários**: Alteração de horários para cada dia da semana.
   - **Contatos**: Atualização de WhatsApp, telefone, Instagram e endereço.
   - **Configurações**: Status da conexão e botão de restauração.

---

© Evolution Fitness Studio • Três Rios - RJ. Todos os direitos reservados.
