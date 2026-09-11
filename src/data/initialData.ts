import { SiteData } from '../types';

export const initialSiteData: SiteData = {
  hero: {
    headline: 'Cada treino é um passo na sua evolução.',
    subtitle: 'Musculação e aulas coletivas com acompanhamento de verdade, em um ambiente moderno e acolhedor.',
    primaryButtonText: 'FALAR NO WHATSAPP',
    secondaryButtonText: 'VER MODALIDADES',
  },
  about: {
    title: 'A sua evolução começa aqui',
    philosophy: 'O aluno não compra musculação. Ele compra transformação, pertencimento, autoestima, saúde e acompanhamento.',
    story: 'Localizada no coração de Três Rios - RJ, a Academia Evolution Fitness nasceu com a proposta de oferecer mais do que um espaço de treino: proporcionamos uma experiência de cuidado, evolução e acolhimento humano. Nossa estrutura foi pensada para atender desde quem está dando os primeiros passos até quem busca superar seus limites.',
    pillars: [
      {
        title: 'Acompanhamento de Verdade',
        description: 'Orientação próxima e atenta dos instrutores para garantir execução segura, correção de movimentos e progresso contínuo.'
      },
      {
        title: 'Ambiente Acolhedor',
        description: 'Um espaço livre de julgamentos, onde você se sente pertencente desde o primeiro dia de treino.'
      },
      {
        title: 'Saúde e Qualidade de Vida',
        description: 'Foco no bem-estar físico e mental, prevenindo lesões e construindo longevidade saudável.'
      },
      {
        title: 'Evolução Consciente',
        description: 'Respeito ao seu ritmo individual com metas sustentáveis e resultados sólidos.'
      }
    ]
  },
  modalities: [
    {
      id: 'musculacao',
      name: 'Musculação',
      description: 'Treinamento resistido com acompanhamento individualizado para fortalecimento, hipertrofia, melhora postural e prevenção de lesões.',
      isActive: true,
      order: 1,
      isReturningSoon: false,
    },
    {
      id: 'gap',
      name: 'GAP',
      description: 'Aula dinâmica com foco no fortalecimento e tonificação de Glúteos, Abdômen e Pernas, com alto gasto calórico e condicionamento.',
      isActive: true,
      order: 2,
      isReturningSoon: false,
    },
    {
      id: 'spinning',
      name: 'Spinning',
      description: 'Treino cardiovascular indoor intenso e motivador sobre a bicicleta, aprimorando a capacidade cardiorrespiratória e a queima calórica.',
      isActive: true,
      order: 3,
      isReturningSoon: false,
    },
    {
      id: 'gluteos',
      name: 'Glúteos',
      description: 'Treinamento específico voltado para ativação, fortalecimento e definição da musculatura dos glúteos e cadeia posterior.',
      isActive: true,
      order: 4,
      isReturningSoon: false,
    },
    {
      id: 'circuito',
      name: 'Circuito',
      description: 'Treino funcional em estações dinâmicas que trabalham agilidade, força, resistência e capacidade pulmonar de forma integrada.',
      isActive: true,
      order: 5,
      isReturningSoon: false,
    },
    {
      id: 'body-pump',
      name: 'Body Pump',
      description: 'Aula coletiva ritmada com barras e anilhas, ideal para quem busca tonificar o corpo inteiro com alta repetição e música envolvente.',
      isActive: true,
      order: 6,
      isReturningSoon: false,
    },
    {
      id: 'aulas-coletivas',
      name: 'Aulas coletivas',
      description: 'Atividades em grupo com energia contagiante, promovendo interação, motivação mútua e diversidade de estímulos no treino diário.',
      isActive: true,
      order: 7,
      isReturningSoon: false,
    },
    {
      id: 'jump',
      name: 'Jump',
      description: 'Aula sobre minitrampolim para alta queima calórica e coordenação motora. Atualmente em preparação para retorno ao cronograma.',
      isActive: true,
      order: 8,
      isReturningSoon: true, // Explicitly registered as "previsto para retornar"
    },
  ],
  gallery: [], // STRICT: No fake photos! Photos to be added via admin panel or real upload.
  videos: [], // STRICT: No fake videos! Videos to be added via admin panel or real upload.
  testimonials: [], // STRICT: No fake testimonials! To be added via admin panel when real students provide them.
  hours: [
    { id: 'mon', dayKey: 'segunda', dayLabel: 'Segunda-feira', hours: '06:00 às 22:00', isOpen: true, order: 1 },
    { id: 'tue', dayKey: 'terca', dayLabel: 'Terça-feira', hours: '06:00 às 22:00', isOpen: true, order: 2 },
    { id: 'wed', dayKey: 'quarta', dayLabel: 'Quarta-feira', hours: '06:00 às 22:00', isOpen: true, order: 3 },
    { id: 'thu', dayKey: 'quinta', dayLabel: 'Quinta-feira', hours: '06:00 às 22:00', isOpen: true, order: 4 },
    { id: 'fri', dayKey: 'sexta', dayLabel: 'Sexta-feira', hours: '06:00 às 22:00', isOpen: true, order: 5 },
    { id: 'sat', dayKey: 'sabado', dayLabel: 'Sábado', hours: '08:00 às 13:00', isOpen: true, order: 6 },
    { id: 'sun', dayKey: 'domingo', dayLabel: 'Domingo', hours: 'Fechado', isOpen: false, order: 7 },
  ],
  contact: {
    studioName: 'Academia Evolution Fitness',
    address: 'Rua Doutor Valmir Peçanha, 50',
    cityState: 'Três Rios - RJ',
    zipCode: '25802-180',
    phoneDisplay: '(24) 98143-3386',
    whatsappNumber: '5524981433386',
    instagramHandle: '@evolutionfitness_tr',
    instagramUrl: 'https://www.instagram.com/evolutionfitness_tr/',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Rua+Doutor+Valmir+Pe%C3%A7anha+50+Tr%C3%AAs+Rios+RJ+25802-180',
  }
};
