import type { CSSProperties } from "react"
import type { Metadata } from "next"
import { ArrowRight, Menu } from "lucide-react"
import { Reveal } from "@/components/pombaz/reveal"
import { ReceitaMagicaVideo } from "./receita-magica-video"

export const metadata: Metadata = {
  title: "Receita Mágica | POMBAZ",
  description:
    "30 receitas práticas para emagrecer de verdade, com acesso imediato pela POMBAZ.",
}

const blueTheme = {
  "--brand-yellow": "#399cff",
  "--brand-yellow-rgb": "57, 156, 255",
} as CSSProperties

export default function ReceitaMagicaPage() {
  return (
    <main
      className="pombaz-blue-theme min-h-screen overflow-x-hidden bg-black text-white"
      style={blueTheme}
    >
      <section
        id="top"
        className="relative min-h-[100svh] overflow-hidden border-b border-[color:var(--border-subtle)] bg-black pt-24 lg:h-[100svh] lg:pt-32"
      >
        <header className="fixed inset-x-0 top-0 z-[100] border-b border-transparent bg-transparent">
          <div className="mx-auto max-w-7xl px-6 md:px-0">
            <div className="flex h-16 items-center justify-between md:h-20">
              <a href="/" className="flex items-center gap-3" aria-label="POMBAZ">
                <img
                  src="/Pombazlogo.webp"
                  alt="POMBAZ"
                  width={34}
                  height={34}
                  className="h-[34px] w-[34px] rounded-[6px] object-contain"
                />
                <span className="font-[family:var(--font-heading)] text-xl font-bold tracking-[-0.03em] text-[color:var(--text-primary)] md:text-2xl">
                  POMBAZ
                </span>
              </a>

              <div className="flex items-center gap-3">
                <a href="#comprar" className="pombaz-button pombaz-button-outline group hidden lg:inline-flex">
                  Quero agora · R$16,90
                  <ArrowRight className="h-3.5 w-3.5 pombaz-arrow" />
                </a>

                <button
                  type="button"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[color:var(--border-subtle)] bg-[rgba(10,10,10,0.55)] text-[color:var(--text-primary)] backdrop-blur md:hidden"
                  aria-label="Abrir menu"
                >
                  <Menu className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="relative mx-auto grid min-h-[calc(100svh-6rem)] max-w-7xl grid-rows-[auto_1fr] items-start gap-0 px-6 md:px-0 lg:h-full lg:min-h-0 lg:grid-cols-[minmax(0,1.35fr)_minmax(360px,1fr)] lg:grid-rows-1 lg:items-center lg:gap-6">
          <div className="relative z-[90] mx-auto w-full max-w-[52rem] self-start pt-4 text-center lg:mx-0 lg:z-10 lg:self-center lg:pt-0 lg:text-left">
            <Reveal>
              <span className="pombaz-label">— POMBAZ · RECEITA MÁGICA</span>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="pombaz-heading mx-auto mt-3 max-w-[14ch] text-[clamp(25px,7.6vw,32px)] leading-[0.96] text-[color:var(--text-primary)] sm:max-w-[16ch] md:text-[clamp(42px,5.2vw,70px)] lg:mx-0 lg:mt-6 lg:max-w-[13ch]">
                30 receitas para
                <br />
                <span className="pombaz-italic-highlight">emagrecer de verdade.</span>
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="mx-auto mt-4 max-w-[32rem] text-sm leading-relaxed text-[color:var(--text-primary)] sm:text-base md:mt-7 md:text-[1.0625rem] lg:mx-0">
                Receitas práticas, saborosas e fáceis de fazer, criadas para quem quer
                perder peso sem sofrimento e sem abrir mão de comer bem.
              </p>
            </Reveal>

            <Reveal delay={240}>
              <p className="mx-auto mt-4 flex max-w-[24rem] flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-[color:var(--text-secondary)] sm:max-w-none sm:text-sm md:mt-8 lg:mx-0 lg:justify-start">
                <span>Receitas práticas</span>
                <span className="text-[color:var(--text-muted)]">•</span>
                <span>Acesso imediato</span>
                <span className="text-[color:var(--text-muted)]">•</span>
                <span>R$16,90</span>
              </p>
            </Reveal>

            <Reveal delay={320}>
              <div className="mt-4 flex flex-col items-center gap-2 sm:flex-row sm:items-center sm:justify-center lg:mt-10 lg:justify-start lg:gap-4">
                <a id="comprar" href="#" className="pombaz-button group">
                  Quero emagrecer agora
                  <ArrowRight className="h-4 w-4 pombaz-arrow" />
                </a>
                <span className="pombaz-link-secondary inline-flex items-center gap-2">
                  Acesso imediato
                </span>
              </div>
            </Reveal>
          </div>

          <Reveal delay={180} className="pointer-events-none relative z-10 -mt-3 flex h-[44svh] min-h-[280px] items-end justify-center self-end overflow-hidden lg:z-[60] lg:mt-0 lg:h-full lg:min-h-[360px] lg:justify-end lg:overflow-visible">
            <div className="relative flex h-full w-full items-end justify-center overflow-visible lg:justify-end">
              <ReceitaMagicaVideo />
            </div>
          </Reveal>
        </div>

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[80] h-40 bg-gradient-to-b from-transparent via-black/65 to-black"
          aria-hidden="true"
        />
      </section>

      {/* SEÇÃO 1: POR QUE FUNCIONA */}
      <section className="relative overflow-hidden bg-[#050d1a] py-24 sm:py-32">
        <div className="pointer-events-none absolute right-0 top-0 -z-10 h-[600px] w-[600px] rounded-full bg-[#1a6abf]/20 blur-[150px]" />
        <div className="pointer-events-none absolute bottom-0 left-0 -z-10 h-[500px] w-[500px] rounded-full bg-[#0d2a4a]/40 blur-[150px]" />

        <div className="mx-auto max-w-7xl px-6 md:px-0">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <span className="pombaz-label text-blue-500">— POR QUE FUNCIONA</span>
            <h2 className="mt-4 font-[family:var(--font-heading)] text-3xl font-medium tracking-tight text-white sm:text-5xl">
              Simples, rápido e sem complicação
            </h2>
            <p className="mt-4 text-slate-400">
              Você não precisa ser cozinheiro, ter ingredientes caros ou seguir dietas impossíveis. Só precisa das receitas certas.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                title: "Prontas em minutos",
                desc: "Todas as receitas foram pensadas para quem tem rotina corrida...",
                icon: <img src='/relogio.png' alt='Relógio' className='h-8 w-8 bg-transparent border-none object-contain' />,
              },
              {
                title: "Ingredientes do mercado",
                desc: "Nada exótico ou caro...",
                icon: <img src='/ingrediente.png' alt='Ingrediente' className='h-8 w-8 bg-transparent border-none object-contain' />,
              },
              {
                title: "Déficit sem fome",
                desc: "Receitas saciantes que te ajudam...",
                icon: <img src='/cintura.png' alt='Cintura' className='h-8 w-8 bg-transparent border-none object-contain' />,
              },
              {
                title: "Qualquer pessoa consegue",
                desc: "Do absoluto iniciante a quem treina há anos...",
                icon: <img src='/perfil.png' alt='Perfil' className='h-8 w-8 bg-transparent border-none object-contain' />,
              },
              {
                title: "Mix completo",
                desc: "Low carb, déficit calórico, proteico...",
                icon: <img src='/mix.jpg' alt='Mix' className='h-8 w-8 bg-transparent border-none object-contain' />,
              },
              {
                title: "Acesso imediato",
                desc: "Comprou, recebeu. Acesse do celular...",
                icon: <img src='/cadeado.png' alt='Cadeado' className='h-8 w-8 bg-transparent border-none object-contain' />,
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group flex gap-4 rounded-2xl bg-gradient-to-br from-[#0B1325] to-[#03060D] border border-[#1e293b] hover:border-[#a38a59]/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/10 p-6 md:p-8"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-transparent border-none">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm text-slate-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO 2: AMOSTRA DO CONTEÚDO */}
      <section className="relative overflow-hidden bg-[#050d1a] py-24 sm:py-32">
        <div className="pointer-events-none absolute right-0 top-0 -z-10 h-[600px] w-[600px] rounded-full bg-[#1a6abf]/20 blur-[150px]" />
        <div className="pointer-events-none absolute bottom-0 left-0 -z-10 h-[500px] w-[500px] rounded-full bg-[#0d2a4a]/40 blur-[150px]" />
        <div className="mx-auto max-w-7xl px-6 md:px-0">
          <div className="mb-16">
            <span className="pombaz-label text-blue-500">— AMOSTRA DO CONTEÚDO</span>
            <h2 className="mt-4 font-[family:var(--font-heading)] text-3xl font-medium tracking-tight text-white sm:text-5xl">
              Veja o que te espera dentro
            </h2>
            <p className="mt-4 text-slate-400">
              Essas são só 3 das 30 receitas...
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                img: "/placeholder.png",
                title: "Salada turbinada de atum com abacate",
                macros: ["~280 kcal", "32g proteína", "10 min."],
              },
              {
                img: "/placeholder.png",
                title: "Panqueca fit de aveia e banana",
                macros: ["~220 kcal", "15g proteína", "5 min."],
              },
              {
                img: "/placeholder.png",
                title: "Sopa cremosa de legumes com frango",
                macros: ["~310 kcal", "28g proteína", "15 min."],
              },
            ].map((item, i) => (
              <div key={i} className="group overflow-hidden rounded-3xl bg-gradient-to-br from-[#0B1325] to-[#03060D] border border-[#1e293b] hover:border-[#a38a59]/40 transition-colors duration-300">
                <div className="aspect-[4/3] w-full overflow-hidden bg-transparent border-none">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="h-full w-full bg-transparent border-none object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 md:p-8">
                  <h3 className="font-[family:var(--font-heading)] text-xl font-medium text-white">{item.title}</h3>
                  <p className="mt-2 text-sm text-slate-400">
                    Uma opção deliciosa e super prática para encaixar na sua rotina sem sair da dieta.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {item.macros.map((macro, j) => (
                      <span
                        key={j}
                        className="rounded-full border border-slate-700 bg-slate-800/50 px-3 py-1 text-xs font-medium text-slate-300"
                      >
                        {macro}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO 3: O QUE VOCÊ RECEBE */}
      <section className="relative overflow-hidden bg-[#050d1a] py-24 sm:py-32">
        <div className="pointer-events-none absolute right-0 top-0 -z-10 h-[600px] w-[600px] rounded-full bg-[#1a6abf]/20 blur-[150px]" />
        <div className="pointer-events-none absolute bottom-0 left-0 -z-10 h-[500px] w-[500px] rounded-full bg-[#0d2a4a]/40 blur-[150px]" />
        <div className="mx-auto max-w-4xl px-6 md:px-0">
          <div className="mb-16 text-center">
            <span className="pombaz-label text-blue-500">— O QUE VOCÊ RECEBE</span>
            <h2 className="mt-4 font-[family:var(--font-heading)] text-3xl font-medium tracking-tight text-white sm:text-5xl">
              Tudo o que precisa para começar hoje
            </h2>
          </div>

          <div className="space-y-4">
            {[
              { n: "01", t: "Café da manhã acelerador", d: "Opções para começar o dia com saciedade e energia." },
              { n: "02", t: "Almoços leves e completos", d: "Refeições ricas em proteínas e vegetais que não pesam." },
              { n: "03", t: "Lanches que não sabotam", d: "A solução para aquela fome da tarde ou vontade de doce." },
              { n: "04", t: "Jantares reconfortantes e leves", d: "Pratos quentes e rápidos para fechar o dia em déficit." },
              { n: "05", t: "Receitas pós-treino inteligentes", d: "O combustível certo para recuperar e construir músculo." },
              { n: "06", t: "Sobremesas sem culpa", d: "Doces fit que matam a vontade sem estragar o resultado." },
            ].map((item, i) => (
              <div
                key={i}
                className="flex flex-col gap-4 rounded-2xl bg-gradient-to-br from-[#0B1325] to-[#03060D] border border-[#1e293b] hover:border-[#a38a59]/40 transition-colors duration-300 p-6 sm:flex-row sm:items-center sm:p-8"
              >
                <span className="font-[family:var(--font-heading)] text-4xl text-slate-700">{item.n}</span>
                <div>
                  <h3 className="font-semibold text-white">{item.t}</h3>
                  <p className="mt-1 text-sm text-slate-400">{item.d}</p>
                </div>
              </div>
            ))}

            <div className="relative mt-8 flex flex-col gap-4 overflow-hidden rounded-2xl bg-gradient-to-br from-[#0B1325] to-[#03060D] border border-[#1e293b] hover:border-[#a38a59]/40 transition-colors duration-300 p-6 sm:flex-row sm:items-center sm:p-8">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent" />
              <span className="text-4xl">🎁</span>
              <div className="relative z-10">
                <h3 className="font-semibold text-blue-400">Bônus: Guia de montagem de prato</h3>
                <p className="mt-1 text-sm text-slate-300">
                  Um guia prático ensinando como montar qualquer refeição para o emagrecimento, usando as proporções perfeitas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 4: RESULTADOS REAIS */}
      <section className="relative overflow-hidden bg-[#050d1a] py-24 sm:py-32">
        <div className="pointer-events-none absolute right-0 top-0 -z-10 h-[600px] w-[600px] rounded-full bg-[#1a6abf]/20 blur-[150px]" />
        <div className="pointer-events-none absolute bottom-0 left-0 -z-10 h-[500px] w-[500px] rounded-full bg-[#0d2a4a]/40 blur-[150px]" />
        <div className="mx-auto max-w-7xl px-6 md:px-0">
          <div className="mb-16 text-center">
            <span className="pombaz-label text-blue-500">— RESULTADOS REAIS</span>
            <h2 className="mt-4 font-[family:var(--font-heading)] text-3xl font-medium tracking-tight text-white sm:text-5xl">
              Quem aplicou, viu a diferença
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                name: "Ana M.",
                initial: "AM",
                sub: "Estudante, 24 anos",
                text: "As receitas são super fáceis. Nunca achei que ia conseguir comer bem e ainda perder peso, mas em 2 semanas já vi muita diferença na balança e nas roupas!",
              },
              {
                name: "Rafael F.",
                initial: "RF",
                sub: "Frequentador de academia, 29 anos",
                text: "Eu não tinha tempo pra cozinhar, acabava comendo besteira. Com o guia, eu resolvo meu pós-treino e o jantar em 15 minutos. Ajudou demais na secada.",
              },
              {
                name: "Carla S.",
                initial: "CS",
                sub: "Mãe e profissional, 34 anos",
                text: "Pra quem tem rotina maluca com filho e trabalho, esse ebook foi a salvação. As opções de almoço são práticas e não precisa de ingrediente caro.",
              },
            ].map((item, i) => (
              <div key={i} className="flex flex-col justify-between rounded-2xl bg-gradient-to-br from-[#0B1325] to-[#03060D] border border-[#1e293b] hover:border-[#a38a59]/40 transition-colors duration-300 p-8">
                <div>
                  <div className="flex gap-1 text-sm text-yellow-500">★★★★★</div>
                  <p className="mt-6 italic text-slate-300">"{item.text}"</p>
                </div>
                <div className="mt-8 flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 font-medium text-slate-400">
                    {item.initial}
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{item.name}</h4>
                    <p className="text-xs text-slate-500">{item.sub}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO 5: CALL TO ACTION / OFERTA */}
      <section className="relative overflow-hidden bg-[#050d1a] py-32">
        <div className="pointer-events-none absolute right-0 top-0 -z-10 h-[600px] w-[600px] rounded-full bg-[#1a6abf]/20 blur-[150px]" />
        <div className="pointer-events-none absolute bottom-0 left-0 -z-10 h-[500px] w-[500px] rounded-full bg-[#0d2a4a]/40 blur-[150px]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black" />
        <div className="relative z-10 mx-auto max-w-2xl px-6 text-center md:px-0">
          <img
            src="/placeholder.png"
            alt="Avatar"
            className="mx-auto mb-8 h-20 w-20 rounded-full bg-transparent border-none object-cover"
          />
          <h2 className="font-[family:var(--font-heading)] text-4xl font-medium tracking-tight text-white sm:text-6xl">
            Comece hoje mesmo
          </h2>
          <p className="mt-6 text-lg text-slate-400">
            Pare de adiar seus resultados por falta de organização. Tenha em mãos as melhores opções para emagrecer sem complicação.
          </p>

          <div className="mx-auto mt-12 max-w-sm rounded-3xl bg-gradient-to-br from-[#0B1325] to-[#03060D] border border-[#1e293b] hover:border-[#a38a59]/40 transition-colors duration-300 p-8 shadow-2xl">
            <span className="text-sm font-medium text-slate-500 line-through">De R$ 37</span>
            <div className="mt-2 font-[family:var(--font-heading)] text-6xl font-bold tracking-tight text-white">
              R$ 16,90
            </div>
            <p className="mt-3 text-sm text-slate-400">Acesso vitalício • Digital • Imediato</p>

            <a
              href="#comprar"
              className="mt-8 flex w-full items-center justify-center gap-2 bg-gradient-to-b from-[#5ba4fc] to-[#1a62ea] text-[#041124] font-bold tracking-widest uppercase rounded-xl border-[3px] border-[#010a17] shadow-[inset_0_2px_4px_rgba(255,255,255,0.5),0_4px_10px_rgba(0,0,0,0.5)] hover:brightness-110 hover:-translate-y-1 transition-all duration-300 px-8 py-4 text-base"
            >
              🔥 Quero acesso agora <ArrowRight className="h-5 w-5" />
            </a>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-slate-500">
              <span className="flex items-center gap-1">🔒 Compra segura</span>
              <span className="flex items-center gap-1">✅ Acesso imediato</span>
              <span className="flex items-center gap-1">📱 Funciona no celular</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
