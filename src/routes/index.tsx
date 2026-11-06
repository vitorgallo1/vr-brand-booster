import { useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  CalendarClock,
  Compass,
  DollarSign,
  LayoutGrid,
  MessageCircle,
  Percent,
  Quote,
  ShieldCheck,
  Wallet,
  Zap,
} from "lucide-react";
import heroWallpaper from "@/assets/wallpaperhero.png";
import heroBike from "@/assets/hero-bike.jpg";
// Foto da fachada (inauguração), reduzida para 1600px em WebP — o slot renderiza a ~600px.
import fachadaVR from "@/assets/fachada-vr.webp";
import logoVRHorizontal from "@/assets/logohorizontal.png";
import bancoItau from "@/assets/bancos/itau.svg";
import bancoBradesco from "@/assets/bancos/bradesco.svg";
import bancoSantander from "@/assets/bancos/santander.svg";
import bancoBB from "@/assets/bancos/bb.svg";
import bancoSicredi from "@/assets/bancos/sicredi.svg";
import bancoCaixa from "@/assets/bancos/caixa.svg";
// PNG e não SVG: são os arquivos que a loja forneceu. Recortados no limite da arte e
// exportados a 96px de altura (4x do tamanho de exibição), fundo branco — igual ao do
// quadrinho que os envolve, então some.
import bancoPorto from "@/assets/bancos/portobank.png";
import bancoPan from "@/assets/bancos/pan.png";
import { carregarVitrine } from "@/servidor/estoque";
import { ordenarDestaques } from "@/lib/motos";
import {
  BikeCard,
  Lightbox,
  SeloMarca,
  marcasPresentes,
  paraBike,
  type Bike,
} from "@/components/vitrine";

export const Route = createFileRoute("/")({
  component: Index,
  // A vitrine vem do estoque salvo no painel /admin. Enquanto ninguém cadastrou nada,
  // o servidor devolve o catálogo que veio no projeto (src/data/catalogo.ts).
  loader: async () => carregarVitrine(),
});

const WHATSAPP = `https://wa.me/5548991788090?text=${encodeURIComponent(
  "Olá! Gostaria de conhecer as motos da VR Multimarcas Biguaçu.",
)}`;

// Usado pela nav desktop, nav mobile e footer — os 3 lugares que listam as mesmas
// âncoras da página, cada um com seu próprio estilo de link.
const NAV_LINKS = [
  { href: "#destaques", label: "Mais vendidas" },
  { href: "#linha", label: "Motos" },
  { href: "#financiamento", label: "Financiamento" },
  { href: "#experiencia", label: "Experiência" },
  { href: "#servicos", label: "Serviços" },
  { href: "#visite", label: "Visite" },
];

function Index() {
  const { motos } = Route.useLoaderData();
  const bikes = useMemo(() => motos.map(paraBike), [motos]);
  const [lightbox, setLightbox] = useState<{ bike: Bike; cor: number; foto: number } | null>(null);
  const ampliar = (bike: Bike, cor: number, foto = 0) => setLightbox({ bike, cor, foto });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <Stats />
      <Destaques bikes={bikes} onAmpliar={ampliar} />
      <Lineup bikes={bikes} onAmpliar={ampliar} />
      <Testimonials />
      <Financing />
      <Experience />
      <Services />
      <Visit />
      <Footer />
      {lightbox && (
        <Lightbox
          bike={lightbox.bike}
          corInicial={lightbox.cor}
          fotoInicial={lightbox.foto}
          onClose={() => setLightbox(null)}
        />
      )}
    </div>
  );
}

// Uma arte só para os dois lugares onde a marca aparece (nav e rodapé).
//
// Antes o rodapé usava um segundo arquivo (logo-vr.jpg) que não estava no repositório:
// vinha de src/assets/logo-vr.jpg.asset.json, um ponteiro para o storage do Lovable
// (/__l5e/assets-v1/...). Esse caminho só resolve dentro do preview do Lovable e dava
// 404 em produção — o rodapé ficava com a imagem quebrada.
//
// A variante "horizontal" (nav) recebe um recuo negativo à esquerda para o monograma
// encostar na margem; no rodapé o logo alinha com o parágrafo abaixo dele, então não leva.
function Logo({ variant = "default" }: { variant?: "default" | "horizontal" }) {
  const isHorizontal = variant === "horizontal";
  return (
    <a
      href="#top"
      className={isHorizontal ? "flex items-center -ml-4 md:-ml-6" : "flex items-center"}
      aria-label="VR Biguaçu"
    >
      <img
        src={logoVRHorizontal}
        alt="VR Biguaçu"
        width={262}
        height={36}
        className={
          isHorizontal
            ? "h-9 w-auto max-w-full object-contain md:h-10"
            : "h-8 w-auto max-w-full object-contain md:h-9"
        }
      />
    </a>
  );
}

function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <header
      id="top"
      className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Logo variant="horizontal" />
        <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:text-primary">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={WHATSAPP}
            className="hidden items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-cta transition hover:bg-primary-dark sm:inline-flex"
          >
            Fale conosco
            <span aria-hidden>→</span>
          </a>
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
            className="grid h-10 w-10 place-items-center rounded-lg border border-border text-ink transition hover:border-primary/40 hover:text-primary md:hidden"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-5 w-5"
              aria-hidden
            >
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>
      {mobileOpen && (
        <nav className="flex flex-col gap-1 border-t border-border bg-background px-5 py-4 text-sm font-medium text-muted-foreground md:hidden">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-2.5 transition hover:bg-secondary hover:text-primary"
            >
              {l.label}
            </a>
          ))}
          <a
            href={WHATSAPP}
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-cta transition hover:bg-primary-dark"
          >
            Fale conosco
            <span aria-hidden>→</span>
          </a>
        </nav>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <img
        src={heroWallpaper}
        alt="Showroom VR Biguaçu"
        width={1717}
        height={916}
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-hero" />
      <div className="mx-auto max-w-[1400px] px-5 pb-20 pt-20 sm:px-8 lg:px-6 lg:pb-28 lg:pt-28">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary-foreground">
            Grupo VR • Franquia oficial
          </span>
          <h1 className="mt-6 font-display text-[42px] font-bold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-[68px]">
            Sua próxima moto
            <br />
            <span className="text-primary">começa aqui.</span>
          </h1>
          <p className="mt-6 max-w-lg text-base text-white/75 sm:text-lg">
            Mais de 30 modelos no showroom, oficina certificada e financiamento aprovado em 24h.
            Escolha a sua e saia pilotando.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#linha"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-semibold text-primary-foreground shadow-cta transition hover:bg-primary-dark"
            >
              Ver catálogo de motos
              <span aria-hidden>→</span>
            </a>
            <a
              href={WHATSAPP}
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-7 py-4 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
            >
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Simular no WhatsApp
            </a>
          </div>
          <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-white/15 pt-6 text-left">
            {[
              { k: "+30", v: "modelos" },
              { k: "12 meses", v: "de garantia" },
              { k: "48h", v: "para pilotar" },
            ].map((s) => (
              <div key={s.v}>
                <dt className="font-display text-2xl font-bold text-white">{s.k}</dt>
                <dd className="mt-1 text-xs uppercase tracking-widest text-white/60">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const items = [
    { k: "+193", v: "Lojas Grupo VR", d: "Presente em 12 estados do Brasil" },
    { k: "+15 anos", v: "De mercado", d: "Tradição e credibilidade no setor" },
    { k: "9,7/10", v: "Satisfação", d: "Avaliação dos nossos clientes" },
    { k: "24h", v: "Aprovação de crédito", d: "Financiamento sem burocracia" },
  ];
  return (
    <section className="border-b border-border bg-surface">
      <div className="mx-auto grid max-w-7xl grid-cols-2 divide-border px-5 py-10 sm:grid-cols-4 sm:divide-x lg:px-8">
        {items.map((s, i) => (
          <div key={s.v} className={`px-2 py-3 sm:px-6 ${i > 0 ? "sm:pl-8" : ""}`}>
            <p className="font-display text-3xl font-bold text-primary sm:text-4xl">{s.k}</p>
            <p className="mt-2 text-sm font-semibold text-ink">{s.v}</p>
            <p className="mt-1 text-xs text-muted-foreground">{s.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------------
// Seções da vitrine
// ---------------------------------------------------------------------------------

function Destaques({
  bikes,
  onAmpliar,
}: {
  bikes: Bike[];
  onAmpliar: (bike: Bike, cor: number) => void;
}) {
  const lista = ordenarDestaques(bikes).slice(0, 6);
  if (lista.length === 0) return null;
  return (
    <section id="destaques" className="scroll-mt-16 border-b border-border">
      <div className="mx-auto max-w-[1400px] px-5 py-20 lg:px-10 lg:py-24">
        <header className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            kicker="Destaques da loja"
            title={
              <>
                As TOP {lista.length} mais vendidas
                <br className="hidden sm:block" /> da VR.
              </>
            }
            className="max-w-2xl"
          />
          <p className="max-w-sm text-muted-foreground">
            Os modelos que mais se destacam no momento. Escolha a cor e peça as condições — a
            resposta vem no WhatsApp.
          </p>
        </header>
        {/* No celular, uma fileira que desliza para o lado: seis cards empilhados
            empurrariam o catálogo para muito longe. */}
        <div className="-mx-5 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3">
          {lista.map((b) => (
            <div key={b.id} className="flex w-[84%] shrink-0 snap-center sm:w-auto">
              <BikeCard bike={b} maisVendida onAmpliar={onAmpliar} />
            </div>
          ))}
        </div>
        <p className="mt-3 text-center text-xs text-muted-foreground sm:hidden">
          Deslize para ver as {lista.length} →
        </p>
      </div>
    </section>
  );
}

function AbaMarca({
  id,
  ativa,
  aoEscolher,
  rotulo,
  children,
}: {
  id: string;
  ativa: string;
  aoEscolher: (id: string) => void;
  rotulo: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={() => aoEscolher(id)}
      aria-pressed={ativa === id}
      aria-label={rotulo}
      className={`inline-flex h-12 shrink-0 items-center gap-2.5 rounded-full border px-5 text-sm font-semibold transition ${
        ativa === id
          ? "border-primary bg-primary/10 text-ink ring-1 ring-primary/40"
          : "border-border bg-surface text-muted-foreground hover:border-primary/40 hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}

function Lineup({
  bikes,
  onAmpliar,
}: {
  bikes: Bike[];
  onAmpliar: (bike: Bike, cor: number) => void;
}) {
  const marcas = useMemo(() => marcasPresentes(bikes), [bikes]);
  // Abre na primeira marca (Shineray), não em "Todas": com todas as marcas abertas a
  // lista fica comprida demais. "Todas" continua disponível, como última aba.
  const [escolhida, setFiltro] = useState<string>(() => marcas[0]?.id ?? "todas");
  const filtro =
    escolhida === "todas" || marcas.some((m) => m.id === escolhida)
      ? escolhida
      : (marcas[0]?.id ?? "todas");
  const topoRef = useRef<HTMLDivElement>(null);

  const grupos = marcas
    .filter((m) => filtro === "todas" || m.id === filtro)
    .map((m) => ({ marca: m, bikes: bikes.filter((b) => b.marca.id === m.id) }));

  const escolher = (id: string) => {
    setFiltro(id);
    // Quem clica na aba com a lista já rolada quer ver o começo da marca, não o meio
    // da marca anterior.
    const topo = topoRef.current;
    if (topo && topo.getBoundingClientRect().top < 0) {
      topo.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="linha" className="scroll-mt-16">
      <div className="mx-auto max-w-[1700px] px-5 pt-20 lg:px-10 lg:pt-24">
        <header className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            kicker="Catálogo — linha 2026"
            title="Escolha pela marca."
            className="max-w-xl"
          />
          <p className="max-w-sm text-muted-foreground">
            Toque numa marca para ver só os modelos dela. Em cada moto, escolha a cor e veja as
            condições.
          </p>
        </header>
      </div>

      <div ref={topoRef} className="scroll-mt-16" />
      {/* Abas presas logo abaixo do cabeçalho: dá para trocar de marca sem voltar ao topo.
          No celular a fileira rola de lado; no computador quebra linha, porque com oito
          marcas a última aba ficaria escondida atrás de uma rolagem que o mouse não vê. */}
      <div className="sticky top-16 z-30 mt-10 border-y border-border bg-background/90 backdrop-blur-md">
        <div
          role="group"
          aria-label="Filtrar por marca"
          className="mx-auto flex max-w-[1700px] gap-2 overflow-x-auto px-5 py-3 [scrollbar-width:none] lg:flex-wrap lg:px-10"
        >
          {marcas.map((m) => {
            const total = bikes.filter((b) => b.marca.id === m.id).length;
            return (
              <AbaMarca
                key={m.id}
                ativa={filtro}
                aoEscolher={escolher}
                id={m.id}
                rotulo={`${m.nome} (${total} modelos)`}
              >
                {m.logo ? (
                  <img
                    src={m.logo}
                    alt=""
                    className={`w-auto object-contain ${m.altura ?? "h-4 sm:h-5"}`}
                  />
                ) : (
                  m.nome
                )}
                <span className="text-xs font-medium text-muted-foreground">{total}</span>
              </AbaMarca>
            );
          })}
          <AbaMarca
            ativa={filtro}
            aoEscolher={escolher}
            id="todas"
            rotulo={`Todas as marcas (${bikes.length} modelos)`}
          >
            Todas
            <span className="text-xs font-medium text-muted-foreground">{bikes.length}</span>
          </AbaMarca>
        </div>
      </div>

      <div className="mx-auto max-w-[1700px] px-5 pb-20 lg:px-10 lg:pb-24">
        {grupos.map(({ marca, bikes: lista }) => (
          <div key={marca.id} className="pt-10">
            <div className="flex items-center gap-4 border-b border-border pb-4">
              <SeloMarca marca={marca} className="h-6 sm:h-7" />
              <span className="text-sm text-muted-foreground">
                {lista.length} modelo{lista.length === 1 ? "" : "s"}
              </span>
            </div>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {lista.map((b) => (
                <BikeCard key={b.id} bike={b} onAmpliar={onAmpliar} />
              ))}
            </div>
          </div>
        ))}

        <div className="mt-12 flex flex-col items-center gap-3">
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition hover:text-primary"
          >
            Não achou o modelo? Pergunte no WhatsApp
            <span aria-hidden>→</span>
          </a>
          <p className="max-w-2xl text-center text-xs text-muted-foreground/70">
            Valores e condições sob consulta, sujeitos a análise de crédito e a alteração sem aviso
            prévio. Imagens ilustrativas, fornecidas pelos fabricantes; cores e itens podem variar
            conforme a versão.
          </p>
        </div>
      </div>
    </section>
  );
}

function SectionHeading({
  kicker,
  title,
  icon: Icon,
  className = "",
}: {
  kicker: string;
  title: React.ReactNode;
  icon?: React.ComponentType<{ className?: string }>;
  className?: string;
}) {
  return (
    <div className={className}>
      {Icon ? (
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-background/60 py-1 pl-1.5 pr-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
          <span className="grid h-5 w-5 place-items-center rounded-full bg-primary/15">
            <Icon className="h-3 w-3" aria-hidden />
          </span>
          {kicker}
        </span>
      ) : (
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
          {kicker}
        </p>
      )}
      <h2 className="mt-4 font-display text-4xl font-bold leading-[1.05] text-ink sm:text-5xl">
        {title}
      </h2>
    </div>
  );
}

const EXPERIENCE_FEATURES = [
  {
    icon: LayoutGrid,
    t: "Curadoria multimarcas",
    d: "Trabalhamos com as principais fabricantes — você escolhe pelo modelo, não pela marca.",
  },
  {
    icon: Compass,
    t: "Test-ride sem compromisso",
    d: "Reserve, pilote e sinta. Se não for a sua moto, a gente encontra outra.",
  },
  {
    icon: MessageCircle,
    t: "Atendimento humano",
    d: "Zero robô, zero enrolação. Fala com gente que respira duas rodas.",
  },
];

function Experience() {
  return (
    <section id="experiencia" className="border-y border-border bg-surface">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8 lg:py-24">
        <div className="relative order-2 lg:order-1">
          <div className="overflow-hidden rounded-xl border border-border shadow-card">
            <img
              src={fachadaVR}
              alt="Fachada da loja VR Biguaçu, com motos expostas na vitrine"
              width={1600}
              height={1066}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-4 hidden max-w-[240px] rounded-xl border border-border bg-card p-4 shadow-card-hover sm:block">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-primary">
              Padrão VR
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Cada loja segue o mesmo protocolo de excelência e curadoria do Grupo VR.
            </p>
          </div>
        </div>
        <div className="order-1 max-w-lg lg:order-2">
          <SectionHeading
            kicker="A experiência VR"
            title="Comprar moto pode ser simples de verdade."
          />
          <p className="mt-5 text-muted-foreground">
            Nada de pressão, letra miúda ou aquele papo de vendedor. Aqui você conversa com quem
            pilota, testa antes de decidir e sai com a moto certa pra você.
          </p>
          <ul className="mt-8 space-y-5">
            {EXPERIENCE_FEATURES.map((f) => (
              <li key={f.t} className="flex gap-4">
                <span className="mt-0.5 grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                  <f.icon className="h-5 w-5" strokeWidth={2} aria-hidden />
                </span>
                <div>
                  <p className="font-semibold text-ink">{f.t}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{f.d}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Services() {
  const items = [
    {
      t: "Oficina certificada",
      d: "Mecânicos treinados, peças originais e diagnóstico digital. Sua moto volta melhor do que entrou.",
    },
    {
      t: "Seminovos com procedência",
      d: "Toda moto usada passa por 47 pontos de inspeção antes de entrar no showroom.",
    },
    {
      t: "Acessórios e equipamentos",
      d: "Capacetes, roupas e acessórios das principais marcas para pilotar com segurança.",
    },
    {
      t: "Documentação inclusa",
      d: "Transferência, emplacamento e primeira revisão — a gente cuida de tudo pra você.",
    },
  ];
  return (
    <section id="servicos" className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">
      <SectionHeading kicker="Serviços" title="Muito além da venda." className="mb-12 max-w-2xl" />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((s, i) => (
          <div key={s.t} className="relative h-full">
            <div className="relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card p-6 shadow-card transition hover:-translate-y-1 hover:shadow-card-hover">
              <span
                aria-hidden
                className="pointer-events-none absolute -right-3 -top-3 select-none font-display text-7xl font-black leading-none text-primary/10"
              >
                0{i + 1}
              </span>
              <h3 className="font-display text-lg font-bold text-ink">{s.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
            </div>
            {i < items.length - 1 && (
              <span
                aria-hidden
                className="absolute left-full top-1/2 hidden h-px w-5 -translate-y-1/2 bg-border lg:block"
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

const FINANCING_STATS = [
  { icon: CalendarClock, k: "Até 48x", v: "Prazo estendido" },
  { icon: Wallet, k: "Entrada", v: "A partir de 10%" },
  { icon: Zap, k: "24h", v: "Aprovação rápida" },
  { icon: Percent, k: "0%", v: "De burocracia" },
];

// `size` é ajuste ótico: a arte do Banco PAN tem a marca pequena dentro do próprio
// quadro, então na altura padrão ela lê menor que as vizinhas.
const BANK_PARTNERS: { name: string; logo: string; size?: string }[] = [
  { name: "Itaú", logo: bancoItau },
  { name: "Bradesco", logo: bancoBradesco },
  { name: "Santander", logo: bancoSantander },
  { name: "Banco do Brasil", logo: bancoBB },
  { name: "Sicredi", logo: bancoSicredi },
  { name: "Caixa", logo: bancoCaixa },
  { name: "PortoBank", logo: bancoPorto },
  { name: "Banco PAN", logo: bancoPan, size: "h-6 sm:h-7" },
];

function Financing() {
  return (
    <section id="financiamento" className="relative overflow-hidden py-20 lg:py-24">
      <img
        src={heroBike}
        alt=""
        aria-hidden
        loading="lazy"
        className="absolute inset-0 hidden h-full w-full object-cover object-[48%_55%] opacity-15 [mask-image:linear-gradient(90deg,transparent,black_35%,black_75%,transparent)] lg:block"
      />
      <div aria-hidden className="absolute inset-0 bg-background/90" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:px-8">
        <div>
          <SectionHeading
            kicker="Financiamento"
            title="Sua moto cabe no orçamento."
            icon={DollarSign}
          />
          <p className="mt-5 max-w-md text-muted-foreground">
            Trabalhamos com todos os principais bancos e financeiras. Análise em poucas horas,
            entrada facilitada e o prazo que fecha na sua rotina.
          </p>
          <div className="mt-6 h-px w-10 bg-primary" aria-hidden />
          <div className="mt-6">
            <p className="text-[11px] uppercase tracking-widest text-muted-foreground">
              Financeiras parceiras
            </p>
            <div className="mt-3 rounded-xl border border-primary/25 bg-background/70 p-4 backdrop-blur-sm shadow-card">
              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                {BANK_PARTNERS.map((b) => (
                  <span
                    key={b.name}
                    className="flex h-11 items-center justify-center rounded-lg bg-white px-3 shadow-sm"
                    title={b.name}
                  >
                    <img
                      src={b.logo}
                      alt={b.name}
                      loading="lazy"
                      className={`w-auto max-w-full object-contain ${b.size ?? "h-5 sm:h-6"}`}
                    />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-primary/25 bg-background/70 p-5 backdrop-blur-sm shadow-card">
          <div className="divide-y divide-border/60">
            {[FINANCING_STATS.slice(0, 2), FINANCING_STATS.slice(2, 4)].map((row, i) => (
              <div key={i} className="grid grid-cols-2 divide-x divide-border/60">
                {row.map((f) => (
                  <div key={f.v} className="flex flex-col items-center px-5 py-4 text-center">
                    <span className="grid h-11 w-11 place-items-center rounded-full bg-primary/10 text-primary">
                      <f.icon className="h-5 w-5" strokeWidth={2} aria-hidden />
                    </span>
                    <p className="mt-3 font-display text-2xl font-bold text-ink">{f.k}</p>
                    <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                      {f.v}
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <a
            href={WHATSAPP}
            className="mt-8 inline-flex w-full items-center justify-center gap-3 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-cta transition hover:brightness-105"
          >
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-black/15">
              <ArrowRight className="h-4 w-4" aria-hidden />
            </span>
            Simular financiamento agora
          </a>
          <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" aria-hidden />
            Sem compromisso. <span className="text-primary">Análise gratuita.</span>
          </p>
        </div>
      </div>
    </section>
  );
}

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function Testimonials() {
  const items = [
    {
      n: "Rafael M.",
      c: "Biguaçu/SC",
      t: "Terceira moto que compro na VR. Atendimento honesto, entrega no prazo e a oficina é referência. Recomendo de olhos fechados.",
    },
    {
      n: "Camila B.",
      c: "Palhoça/SC",
      t: "Fui esperando pressão de vendedor e encontrei gente que ouviu. Saí com a moto certa e uma condição que coube no bolso.",
    },
    {
      n: "Diego P.",
      c: "São José/SC",
      t: "Comprei uma trail, veio revisada e com documentação em dia. É o padrão que a gente sempre quis num revendedor.",
    },
    {
      n: "Jeferson",
      c: "Florianópolis/SC",
      t: "Comprei uma moto 0km. Excelente atendimento e entrega.",
    },
  ];
  return (
    <section className="border-y border-border bg-surface">
      <div className="mx-auto max-w-7xl px-5 pb-20 pt-10 lg:px-8 lg:pb-24 lg:pt-14">
        <SectionHeading
          kicker="Quem já pilota com a gente"
          title="Confiança que se conta em quilômetros."
          className="mb-12 max-w-2xl"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((r) => (
            <figure
              key={r.n}
              className="relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card p-6 shadow-card"
            >
              <Quote
                className="absolute -right-3 -top-3 h-20 w-20 text-primary/10"
                strokeWidth={1}
                aria-hidden
              />
              <div className="relative flex gap-0.5 text-primary" aria-label="5 estrelas">
                ★★★★★
              </div>
              <blockquote className="relative mt-4 flex-1 text-sm leading-relaxed text-foreground">
                “{r.t}”
              </blockquote>
              <figcaption className="relative mt-6 flex items-center gap-3 border-t border-border pt-4">
                <span
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary/10 text-xs font-bold text-primary"
                  aria-hidden
                >
                  {initials(r.n)}
                </span>
                <div className="text-sm">
                  <p className="font-semibold text-ink">{r.n}</p>
                  <p className="text-xs text-muted-foreground">{r.c}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Visit() {
  return (
    <section id="visite" className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:px-8 lg:py-24">
        <div>
          <SectionHeading
            kicker="Venha nos visitar"
            title="Um café, uma volta e a sua próxima moto."
          />
          <p className="mt-5 max-w-md text-muted-foreground">
            Nosso showroom foi feito pra você passar tempo. Chega, escolhe, testa. Sem pressa e sem
            pressão.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <div>
              <p className="text-[11px] uppercase tracking-widest text-muted-foreground">
                Endereço
              </p>
              <p className="mt-2 text-sm">
                Rua Manoel Mariano Ferreira, 160
                <br />
                Rio Caveiras — Biguaçu / SC, 88161-372
              </p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-widest text-muted-foreground">Horário</p>
              <p className="mt-2 text-sm">
                Seg a Sáb — 10h às 19h
                <br />
                Domingo — fechado
              </p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-widest text-muted-foreground">
                WhatsApp
              </p>
              <a
                href={WHATSAPP}
                className="mt-2 block text-sm font-semibold text-primary hover:underline"
              >
                (48) 99178-8090
              </a>
            </div>
          </div>
          <div className="mt-8 overflow-hidden rounded-xl border border-border shadow-card">
            <iframe
              title="Mapa até a VR Biguaçu"
              src="https://www.google.com/maps?q=Rua+Manoel+Mariano+Ferreira,+160,+Rio+Caveiras,+Bigua%C3%A7u+-+SC,+88161-372&output=embed"
              width="100%"
              height="260"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block grayscale-[15%]"
            />
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-8 shadow-card-hover lg:p-10">
          <p className="font-display text-sm font-bold text-primary">Pronto pra pilotar?</p>
          <h3 className="mt-3 font-display text-3xl font-bold leading-tight text-ink">
            Fale com um consultor VR agora mesmo.
          </h3>
          <p className="mt-4 text-sm text-muted-foreground">
            Respondemos em minutos. Simulação, test-ride e reserva sem sair do sofá.
          </p>
          <div className="mt-8 flex flex-col gap-3">
            <a
              href={WHATSAPP}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground shadow-cta transition hover:bg-primary-dark"
            >
              Chamar no WhatsApp
              <span aria-hidden>→</span>
            </a>
            <a
              href="tel:+5548991788090"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-6 py-4 text-sm font-semibold text-ink transition hover:border-primary hover:text-primary"
            >
              Ligar para a loja
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-background text-muted-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div className="flex flex-col gap-3 sm:col-span-2 lg:col-span-1">
          <Logo />
          <p className="max-w-sm text-xs">
            VR Biguaçu é uma unidade franqueada do Grupo VR, referência em varejo motociclístico no
            Brasil.
          </p>
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-ink">Navegação</p>
          <div className="mt-4 flex flex-col gap-2.5 text-sm">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="transition hover:text-primary">
                {l.label}
              </a>
            ))}
          </div>
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-ink">Contato</p>
          <div className="mt-4 flex flex-col gap-2.5 text-sm">
            <span>Rua Manoel Mariano Ferreira, 160 — Rio Caveiras, Biguaçu/SC</span>
            <a href={WHATSAPP} className="transition hover:text-primary">
              (48) 99178-8090
            </a>
          </div>
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-ink">Horário</p>
          <div className="mt-4 flex flex-col gap-2.5 text-sm">
            <span>Seg a Sáb — 10h às 19h</span>
            <span>Domingo — fechado</span>
          </div>
        </div>
      </div>
      {/* TODO: incluir CNPJ e razão social reais da VR Biguaçu aqui quando disponíveis. */}
      <div className="border-t border-border px-5 py-5 lg:px-8">
        <p className="text-[11px] text-muted-foreground/70">
          © {new Date().getFullYear()} VR Biguaçu. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
