/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { Layout, Twitter, Linkedin, Dribbble, X, Moon, Sun } from "lucide-react";
import { useState, useEffect, type ReactNode } from "react";
import logo from "../logo.png";

interface Resource {
  id: string;
  number: string;
  category: string;
  title: string;
  description: string;
  url: string;
  dark?: boolean;
}

const RESOURCES: Resource[] = [
  // 1. Fundamentos e Introdução ao UX/UI
  {
    id: "livro-fabricio",
    number: "1.1",
    category: "FUNDAMENTOS",
    title: "INTRODUÇÃO E BOAS PRÁTICAS EM UX DESIGN",
    description: "LIVRO DE FABRICIO TEIXEIRA: UM DOS MANUAIS MAIS RESPEITADOS EM PORTUGUÊS PARA INICIANTES.",
    url: "https://fabricioteixeira.com.br/livro/",
  },
  {
    id: "guia-ux-collective",
    number: "1.2",
    category: "INTRODUÇÃO",
    title: "COMO COMEÇAR EM UX DESIGN",
    description: "UM ROTEIRO DETALHADO SOBRE O MERCADO E OS PRIMEIROS PASSOS NA CARREIRA (UX COLLECTIVE BRASIL).",
    url: "https://brasil.uxdesign.cc/como-comecar-em-ux-design-um-guia-completo-5768393e981",
  },
  {
    id: "ux-vs-ui",
    number: "1.3",
    category: "INTRODUÇÃO",
    title: "UX VS. UI DIFFERENCES",
    description: "EXPLICAÇÃO TÉCNICA SOBRE AS RESPONSABILIDADES E INTERSEÇÕES DE CADA PAPEL (UXPIN).",
    url: "https://www.uxpin.com/studio/blog/ux-vs-ui-differences/",
  },
  // 2. Usabilidade e Regras de Interface
  {
    id: "nng-heuristics",
    number: "2.1",
    category: "USABILIDADE",
    title: "10 USABILITY HEURISTICS FOR UI DESIGN",
    description: "O TEXTO CLÁSSICO SOBRE AS HEURÍSTICAS DE JAKOB NIELSEN (NIELSEN NORMAN GROUP).",
    url: "https://www.nngroup.com/articles/ten-usability-heuristics/",
    dark: true,
  },
  {
    id: "vagas-ux-heuristics",
    number: "2.2",
    category: "USABILIDADE",
    title: "10 HEURÍSTICAS DO PONTO DE VISTA DE INICIANTE",
    description: "UMA ABORDAGEM PRÁTICA E ACESSÍVEL DOS CONCEITOS DE NIELSEN (VAGAS UX).",
    url: "https://vagasux.com.br/10-heuristicas-de-nielsen-do-ponto-de-vista-de-uma-iniciante/",
  },
  {
    id: "shneiderman-rules",
    number: "2.3",
    category: "USABILIDADE",
    title: "SHNEIDERMAN’S EIGHT GOLDEN RULES",
    description: "AS OITO REGRAS DE OURO PARA INTERFACES AMIGÁVEIS (INTERACTION DESIGN FOUNDATION).",
    url: "https://www.interaction-design.org/literature/article/shneidermans-eight-golden-rules-of-interface-design",
  },
  // 3. Psicologia e Leis de UX
  {
    id: "laws-of-ux",
    number: "3.1",
    category: "PSICOLOGIA",
    title: "LAWS OF UX",
    description: "A MELHOR REFERÊNCIA VISUAL E TEÓRICA SOBRE LEIS COMO HICK, FITTS E JAKOB (JON YABLONSKI).",
    url: "https://lawsofux.com/",
    dark: true,
  },
  {
    id: "psicologia-aplicada",
    number: "3.2",
    category: "PSICOLOGIA",
    title: "PSICOLOGIA APLICADA EM UX",
    description: "INTRODUÇÃO SOBRE COMO O CÉREBRO INTERPRETA INTERFACES E A IMPORTÂNCIA DOS MODELOS MENTAIS.",
    url: "https://brasil.uxdesign.cc/psicologia-aplicada-em-ux-c7b0e1e9f9c",
  },
  // 4. Estrutura: Arquitetura de Informação e Interação
  {
    id: "alura-ai",
    number: "4.1",
    category: "ESTRUTURA",
    title: "ARQUITETURA DA INFORMAÇÃO: GUIA COMPLETO",
    description: "EXPLICA OS PILARES DE ORGANIZAÇÃO, ROTULAGEM E NAVEGAÇÃO (ALURA).",
    url: "https://www.alura.com.br/artigos/arquitetura-da-informacao",
  },
  {
    id: "interaction-design-guide",
    number: "4.2",
    category: "ESTRUTURA",
    title: "INTERACTION DESIGN (IXD) GUIDE",
    description: "UMA EXPLORAÇÃO DAS CINCO DIMENSÕES DO DESIGN DE INTERAÇÃO (LOGROCKET).",
    url: "https://blog.logrocket.com/ux-design/interaction-design-ixd-definition-examples-guide/",
  },
  {
    id: "ia-101",
    number: "4.3",
    category: "ESTRUTURA",
    title: "INFORMATION ARCHITECTURE 101",
    description: "GUIA PRÁTICO SOBRE SITEMAPS, FLUXOS E TAXONOMIA (BIG SEA).",
    url: "https://bigsea.co/blog/information-architecture-101/",
  },
  // 5. Metodologia e Sistemas de Design
  {
    id: "atomic-design",
    number: "5.1",
    category: "METODOLOGIA",
    title: "ATOMIC DESIGN",
    description: "OBRA SEMINAL DE BRAD FROST SOBRE COMO CONSTRUIR SISTEMAS DE DESIGN MODULARES.",
    url: "https://atomicdesign.bradfrost.com/",
    dark: true,
  },
  {
    id: "design-systems-handbook",
    number: "5.2",
    category: "SISTEMAS",
    title: "DESIGN SYSTEMS HANDBOOK",
    description: "GUIA DEFINITIVO PARA CRIAR E MANTER SISTEMAS DE DESIGN EM EQUIPE (DESIGNBETTER).",
    url: "https://www.designbetter.co/design-systems-handbook",
  },
  // 6. Materiais Práticos e Acadêmicos
  {
    id: "mini-guias",
    number: "6.1",
    category: "PRÁTICA",
    title: "12 MINI GUIAS GRATUITOS DE UI/UX",
    description: "MATERIAIS VISUAIS EM PDF SOBRE PROBLEMAS COMUNS DE DESIGN E DESIGN ATÔMICO.",
    url: "https://sheisacreative.com.br/blog/12-mini-guias-gratuitos-de-ui-ux-design",
  },
  {
    id: "artigo-cientifico",
    number: "6.2",
    category: "ACADÊMICO",
    title: "TÉCNICAS E MÉTODOS DE PESQUISA DE UX",
    description: "ARTIGO ACADÊMICO SOBRE MÉTODOS DE AVALIAÇÃO E HISTÓRICO DA ÁREA (SCIELO).",
    url: "https://dialnet.unirioja.es/descarga/articulo/10219999.pdf",
  },
];

export default function App() {
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [isDarkMode]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b-2 border-brand p-6 flex justify-between items-center">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="flex items-center gap-3"
        >
          <img
            src={logo}
            alt="Logo"
            className="w-14 h-14 md:w-14 md:h-14 object-contain"
            referrerPolicy="no-referrer"
          />
          <h1 className="text-xl border-3 border-brand md:text-xl font-mono font-black tracking-tighter bg-brand text-white px-0 py-2 rotate-[-10deg] overflow-hidden whitespace-nowrap w-[140px] flex items-center relative">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: (t) => Math.floor(t * 12) / 12
              }}
              className="flex whitespace-nowrap"
            >
              <span className="inline-block">UX/UI REPO&nbsp;&nbsp;</span>
              <span className="inline-block">UX/UI REPO&nbsp;&nbsp;</span>
            </motion.div>
          </h1>
        </motion.div>

        <nav className="hidden md:block">
          <ul className="flex gap-8 text-sm font-bold items-center">
            <li>
              <button
                onClick={() => setIsAboutOpen(true)}
                className="hover:underline underline-offset-2 decoration-2 cursor-pointer"
              >
                SOBRE
              </button>
            </li>
            <li>
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 border-2 cursor-pointer border-brand hover:bg-brand hover:text-white transition-all flex items-center justify-center"
                title={isDarkMode ? "Modo Claro" : "Modo Escuro"}
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </li>
          </ul>
        </nav>
      </header>

      {/* About Modal */}
      <AnimatePresence>
        {isAboutOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAboutOpen(false)}
              className="fixed inset-0 bg-black/40 z-[60] backdrop-blur-sm"
            />

            {/* Modal Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full md:w-1/2 bg-white z-[70] border-l-8 border-brand p-8 md:p-16 overflow-y-auto shadow-2xl"
            >
              <div className="flex justify-between items-start mb-12">
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter bg-brand text-white px-6 py-2 rotate-[-2deg] inline-block">
                  SOBRE O PROJETO
                </h2>
                <button
                  onClick={() => setIsAboutOpen(false)}
                  className="p-2 hover:bg-brand hover:text-white transition-colors border-4 border-brand"
                >
                  <X size={32} />
                </button>
              </div>

              <div className="space-y-8 text-lg md:text-xl font-bold leading-tight">
                <p className="border-l-8 border-brand pl-6 py-2">
                  O <span className="text-brand">UX/UI LIST</span> NASCEU DA NECESSIDADE DE CENTRALIZAR O CAOS DE INFORMAÇÃO QUE EXISTE NA ÁREA DE DESIGN.
                </p>

                <p>
                  SOU UM DESIGNER QUE ACREDITA QUE O ACESSO AO CONHECIMENTO DEVE SER DIRETO, BRUTALISTA E SEM FRICÇÃO. ESTA LISTA É UMA CURADORIA PESSOAL DOS MELHORES MATERIAIS QUE ME AJUDARAM E CONTINUAM AJUDANDO NA JORNADA.
                </p>

                <div className="bg-accent p-8 border-4 border-brand">
                  <h3 className="text-2xl font-black mb-4 tracking-tight">POR QUE BRUTALISTA?</h3>
                  <p className="text-base">
                    PORQUE O DESIGN MUITAS VEZES SE ESCONDE ATRÁS DE PERFEIÇÕES ESTÉTICAS QUE DISTRAEM DO CONTEÚDO. AQUI, A ESTRUTURA É EXPOSTA, AS CORES SÃO FORTES E A INFORMAÇÃO É A PRIORIDADE.
                  </p>
                </div>

                <p className="text-sm text-zinc-500 italic">
                  CRIADO COM PAIXÃO POR QUEM VIVE O DESIGN TODOS OS DIAS. ESPERO QUE ESTA LISTA SEJA TÃO ÚTIL PARA VOCÊ QUANTO É PARA MIM.
                </p>
              </div>

              <div className="mt-16 pt-8 border-t-4 border-brand flex gap-6">
                <Twitter className="text-brand cursor-pointer hover:scale-110 transition-transform" />
                <Linkedin className="text-brand cursor-pointer hover:scale-110 transition-transform" />
                <Dribbble className="text-brand cursor-pointer hover:scale-110 transition-transform" />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-grow">
        {RESOURCES.map((resource, index) => (
          <motion.section
            key={resource.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={`resource-row ${resource.dark ? "bg-brand text-white" : index % 2 === 1 ? "bg-accent" : "bg-white"
              }`}
          >
            <div className="w-full md:w-2/3">
              <span className={`font-bold block mb-2 text-[10px] ${resource.dark ? "text-white" : "text-brand"}`}>
                {resource.number} // {resource.category}
              </span>
              <h2 className="font-black leading-none break-words text-xl mb-4 tracking-tighter">
                {resource.title}
              </h2>
              <p className={`max-w-2xl border-l-4 pl-4 hidden md:block text-xs font-medium ${resource.dark ? "border-white text-zinc-300" : "border-brand text-brand"
                }`}>
                {resource.description}
              </p>
            </div>

            <div className="w-full md:w-1/3 flex justify-end mt-8 md:mt-0">
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`access-btn text-sm md:text-base ${resource.dark ? "bg-white text-brand border-white hover:bg-zinc-200" : ""
                  }`}
              >
                ACESSAR
              </a>
            </div>
          </motion.section>
        ))}
      </main>

      {/* Footer */}
      <footer className="p-12 border-b-8 border-brand bg-white">
        <div className="flex flex-col md:flex-row justify-between items-center text-[10px] font-bold gap-8">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            © {new Date().getFullYear()} UX LIST — TODOS OS DIREITOS RESERVADOS
          </motion.span>

          <div className="flex flex-wrap justify-center gap-6">
            <FooterLink icon={<Twitter size={16} />} label="TWITTER" href="#" />
            <FooterLink icon={<Dribbble size={16} />} label="DRIBBBLE" href="#" />
            <FooterLink icon={<Linkedin size={16} />} label="LINKEDIN" href="#" />
          </div>
        </div>
      </footer>
    </div>
  );
}

function FooterLink({ icon, label, href }: { icon: ReactNode; label: string; href: string }) {
  return (
    <a
      href={href}
      className="flex items-center gap-2 hover:bg-brand hover:text-white px-3 py-1 transition-colors"
    >
      {icon}
      <span>{label}</span>
    </a>
  );
}
