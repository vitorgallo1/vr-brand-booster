import { useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import heroWallpaper from "@/assets/wallpaperhero.png";
import showroom from "@/assets/showroom.jpg";
import logoVR from "@/assets/logo-vr.jpg.asset.json";
import logoVRHorizontal from "@/assets/logohorizontal.png";
import bancoItau from "@/assets/bancos/itau.svg";
import bancoBradesco from "@/assets/bancos/bradesco.svg";
import bancoSantander from "@/assets/bancos/santander.svg";
import bancoBB from "@/assets/bancos/bb.svg";
import bancoSicredi from "@/assets/bancos/sicredi.svg";
import bancoCaixa from "@/assets/bancos/caixa.svg";

// Todas as fotos das motos vêm da sequência de giro 360° do fabricante
// (recortes com fundo transparente) — o fundo de estúdio (STUDIO_BG) é aplicado por
// trás delas para dar um visual consistente em toda a vitrine.
const globFrames = (pattern: string) =>
  Object.entries(
    import.meta.glob("/src/assets/motos/360/**/*.webp", {
      eager: true,
      query: "?url",
      import: "default",
    }) as Record<string, string>,
  )
    .filter(([path]) => path.includes(`/360/${pattern}/`))
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, url]) => url);

const SPIN_360 = {
  shi175: globFrames("shi175"),
  jet125: globFrames("jet125"),
  jef150: globFrames("jef150"),
  sbm250s: globFrames("sbm250s"),
  sbm250t: globFrames("sbm250t"),
  shi400sc: globFrames("shi400sc"),
  sbm600v: globFrames("sbm600v"),
  sbm600r: globFrames("sbm600r"),
};

// Seleciona 4 quadros específicos da sequência de giro 360° para as miniaturas da
// vitrine. O primeiro índice de cada lista é sempre o ângulo de perfil (foto de lado),
// conferido manualmente quadro a quadro em cada modelo.
const pickAt = (frames: string[], indices: number[]) => indices.map((i) => frames[i]);

export const Route = createFileRoute("/")({
  component: Index,
});

const WHATSAPP =
  "https://wa.me/5549999999999?text=Ol%C3%A1!%20Gostaria%20de%20conhecer%20as%20motos%20da%20VR%20Multimarcas.";

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <Stats />
      <Lineup />
      <Testimonials />
      <Financing />
      <Experience />
      <Services />
      <Visit />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

function Logo({ variant = "default" }: { variant?: "default" | "horizontal" }) {
  const isHorizontal = variant === "horizontal";
  return (
    <a
      href="#top"
      className={isHorizontal ? "flex items-center -ml-4 md:-ml-6" : "flex items-center"}
      aria-label="VR Multimarcas"
    >
      <img
        src={isHorizontal ? logoVRHorizontal : logoVR.url}
        alt="VR Multimarcas"
        width={isHorizontal ? 262 : 200}
        height={isHorizontal ? 36 : 64}
        className={isHorizontal ? "h-9 w-auto md:h-10" : "h-10 w-auto md:h-11"}
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
          <a href="#linha" className="transition hover:text-primary">Motos</a>
          <a href="#financiamento" className="transition hover:text-primary">Financiamento</a>
          <a href="#experiencia" className="transition hover:text-primary">Experiência</a>
          <a href="#servicos" className="transition hover:text-primary">Serviços</a>
          <a href="#visite" className="transition hover:text-primary">Visite</a>
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
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden>
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
          <a href="#linha" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2.5 transition hover:bg-secondary hover:text-primary">Motos</a>
          <a href="#financiamento" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2.5 transition hover:bg-secondary hover:text-primary">Financiamento</a>
          <a href="#experiencia" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2.5 transition hover:bg-secondary hover:text-primary">Experiência</a>
          <a href="#servicos" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2.5 transition hover:bg-secondary hover:text-primary">Serviços</a>
          <a href="#visite" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2.5 transition hover:bg-secondary hover:text-primary">Visite</a>
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
        alt="Showroom VR Multimarcas"
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
            <span className="text-gradient-brand">começa aqui.</span>
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

type Bike = {
  tag: string;
  name: string;
  desc: string;
  specs: string[];
  cash: string;
  parcel: string;
  badge?: string;
  imgs: string[];
  spin360?: string[];
  wa: string;
};

// Modelos e fichas técnicas reais da linha Shineray comercializada no Brasil.
// Fotos oficiais do fabricante (shineray.com.br), usadas pela revenda multimarcas.
// Preços "cash"/"parcel" verificados em 31/07/2026 direto no site do fabricante.
// O fabricante reajusta preços sem aviso prévio — reconferir periodicamente
// (por isso também existe o aviso de "sujeito a alteração" na seção Lineup abaixo).
const wa = (model: string) =>
  `https://wa.me/5549999999999?text=${encodeURIComponent(
    `Olá! Quero uma simulação da ${model}.`,
  )}`;

const BIKES: Bike[] = [
  {
    tag: "Trail",
    name: "SHI 175",
    desc: "Trail leve e versátil, pronta para o asfalto e para a estrada de chão. Painel digital, iluminação full LED e partida elétrica com pedal reserva.",
    specs: ["175cc", "Partida elétrica", "Freio a disco duplo"],
    cash: "R$ 16.490",
    parcel: "48x de R$ 349",
    badge: "Mais vendida",
    imgs: pickAt(SPIN_360.shi175, [7, 0, 14, 21]),
    spin360: SPIN_360.shi175,
    wa: wa("SHI 175"),
  },
  {
    tag: "Urbana",
    name: "JET 125",
    desc: "Automática, leve e econômica — ideal para o dia a dia na cidade. Painel 100% digital, porta-objetos e baixo consumo de combustível.",
    specs: ["125cc", "Câmbio automático", "Baixo consumo"],
    cash: "R$ 11.490",
    parcel: "48x de R$ 239",
    imgs: pickAt(SPIN_360.jet125, [6, 0, 12, 18]),
    spin360: SPIN_360.jet125,
    wa: wa("JET 125"),
  },
  {
    tag: "Naked",
    name: "JEF 150",
    desc: "Naked de entrada com visual moderno, painel 100% digital novo e iluminação full LED. Leve, ágil e com ótimo custo-benefício no dia a dia.",
    specs: ["150cc", "Painel digital", "Freio a disco"],
    cash: "R$ 14.790",
    parcel: "48x de R$ 309",
    imgs: pickAt(SPIN_360.jef150, [7, 0, 14, 21]),
    spin360: SPIN_360.jef150,
    wa: wa("JEF 150"),
  },
  {
    tag: "Sport",
    name: "SBM 250s",
    desc: "Esportiva média com motor DOHC, freios ABS nas duas rodas e painel digital com Bluetooth. Performance de verdade para quem gosta de pilotar.",
    specs: ["250cc DOHC", "ABS duplo canal", "Painel com Bluetooth"],
    cash: "R$ 23.490",
    parcel: "48x de R$ 489",
    badge: "Lançamento",
    imgs: pickAt(SPIN_360.sbm250s, [11, 0, 22, 33]),
    spin360: SPIN_360.sbm250s,
    wa: wa("SBM 250s"),
  },
  {
    tag: "Big Trail",
    name: "SBM 250t",
    desc: "Big trail com motor DOHC refrigerado a líquido, câmbio de 6 marchas e ABS nas duas rodas. Conforto de viagem com fôlego de sobra para a trilha.",
    specs: ["250cc DOHC", "6 marchas", "ABS duplo canal"],
    cash: "R$ 24.990",
    parcel: "48x de R$ 519",
    imgs: pickAt(SPIN_360.sbm250t, [5, 0, 11, 16]),
    spin360: SPIN_360.sbm250t,
    wa: wa("SBM 250t"),
  },
  {
    tag: "Scrambler",
    name: "SHI 400sc",
    desc: "Scrambler de estilo clássico com motor de 400cc, iluminação full LED, USB e sensor de cavalete. Versatilidade para rodovia e cidade.",
    specs: ["400cc", "ABS duplo canal", "Painel TFT"],
    cash: "R$ 24.990",
    parcel: "48x de R$ 521",
    imgs: pickAt(SPIN_360.shi400sc, [6, 0, 12, 18]),
    spin360: SPIN_360.shi400sc,
    wa: wa("SHI 400sc"),
  },
  {
    tag: "Custom",
    name: "SBM 600V",
    desc: "Custom de presença com motor V4 de 600cc, painel TFT com Bluetooth e freio duplo disco com ABS nas duas rodas. Conforto e estilo para rodar em grande estilo.",
    specs: ["600cc V4", "ABS duplo canal", "Painel TFT Bluetooth"],
    cash: "R$ 51.990",
    parcel: "48x de R$ 1.089",
    imgs: pickAt(SPIN_360.sbm600v, [0, 5, 10, 15]),
    spin360: SPIN_360.sbm600v,
    wa: wa("SBM 600V"),
  },
  {
    tag: "Sport",
    name: "SBM 600R",
    desc: "Esportiva de ponta com motor 4 cilindros e 88,4cv, freios ABS nas duas rodas e painel TFT com espelhamento de tela via aplicativo. O topo de linha da revenda.",
    specs: ["600cc 4 cilindros", "88,4cv", "Painel TFT + app"],
    cash: "R$ 52.490",
    parcel: "48x de R$ 1.099",
    badge: "Top de linha",
    imgs: pickAt(SPIN_360.sbm600r, [0, 4, 9, 14]),
    spin360: SPIN_360.sbm600r,
    wa: wa("SBM 600R"),
  },
];

// Quanto maior o divisor, mais arrasto é necessário por quadro — giro mais lento e
// controlado (comparado ao valor original de 6, que virava a moto inteira num gesto rápido).
const DRAG_PX_PER_FRAME = 36;

// Carrega no máximo N imagens por vez. Disparar as ~20-40 imagens de uma sequência 360°
// todas de uma vez faz o navegador enfileirar a maioria como prioridade "Low" e, sob
// contenção de conexão, abortar essas requisições de baixa prioridade (visto em produção
// como NS_BINDING_ABORTED) — indo uma de cada vez por "worker" evita essa contenção.
function preloadFrames(urls: string[], concurrency = 4) {
  let next = 0;
  const loadNext = () => {
    const url = urls[next++];
    if (!url) return;
    const img = new Image();
    img.onload = loadNext;
    img.onerror = loadNext;
    img.src = url;
  };
  for (let i = 0; i < Math.min(concurrency, urls.length); i++) loadNext();
}

// Fundo escuro de estúdio usado atrás dos recortes com fundo transparente — mesmo
// tratamento do card e do lightbox, para a moto parecer fotografada no mesmo ambiente.
const STUDIO_BG =
  "bg-[radial-gradient(ellipse_at_50%_30%,_rgba(255,255,255,0.08),_rgba(10,10,10,0.96)_70%)]";
const THUMB_BG = "bg-neutral-900";

function AngleIndicator({
  angle,
  position,
}: {
  angle: number;
  position: "top-left" | "bottom-left";
}) {
  const rad = (angle * Math.PI) / 180;
  const x2 = 14 + 10 * Math.sin(rad);
  const y2 = 14 - 10 * Math.cos(rad);
  const positionClass = position === "top-left" ? "left-3 top-3" : "bottom-3 left-3";
  return (
    <div
      className={`pointer-events-none absolute ${positionClass} flex items-center gap-2 rounded-full bg-background/85 px-2.5 py-2 shadow backdrop-blur`}
    >
      <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden>
        <circle cx="14" cy="14" r="12" fill="none" className="stroke-border" strokeWidth="1.5" />
        <line x1="14" y1="14" x2={x2} y2={y2} className="stroke-primary" strokeWidth="2" strokeLinecap="round" />
        <circle cx="14" cy="14" r="1.5" className="fill-primary" />
      </svg>
      <span className="text-[11px] font-semibold tabular-nums text-ink">{Math.round(angle)}°</span>
    </div>
  );
}

function Spin360Viewer({
  frames,
  alt,
  onTap,
  anglePosition = "bottom-left",
}: {
  frames: string[];
  alt: string;
  onTap?: () => void;
  anglePosition?: "top-left" | "bottom-left";
}) {
  const [index, setIndex] = useState(0);
  // Quadro efetivamente exibido no <img>. Só acompanha `index` depois que o quadro alvo
  // termina de carregar — ver efeito abaixo. Isso é o que evita a tela quebrada/vazia no
  // primeiro giro, antes do cache do navegador estar aquecido.
  const [displayIndex, setDisplayIndex] = useState(0);
  const [hint, setHint] = useState(true);
  const drag = useRef<{ startX: number; startIndex: number; moved: boolean } | null>(null);

  // Em produção os quadros vêm da rede (não do disco local, como em dev), então sem
  // pré-carregar cada arrasto dispara um fetch novo: a imagem trava até chegar e o
  // índice (já avançado pelo pointermove) "salta" vários quadros de uma vez quando o
  // navegador finalmente termina de baixar. Aquecendo o cache do navegador assim que o
  // viewer monta evita esse efeito de giro brusco.
  useEffect(() => {
    // Sem cleanup de propósito: interromper o preload no meio (ex: img.src = "") é o que
    // gerava os NS_BINDING_ABORTED em produção (o viewer remonta ao trocar de modo/abrir
    // o lightbox, e cancelar o fetch em andamento só forçava uma nova tentativa depois).
    // Deixar o download seguir em segundo plano é inofensivo — o navegador dedupe pedidos
    // repetidos pra mesma URL e o resultado fica no cache HTTP de qualquer forma.
    preloadFrames(frames);
  }, [frames]);

  // Só troca o quadro exibido depois que ele terminou de carregar de fato (cache hit
  // resolve quase instantâneo; cache miss mantém o quadro anterior na tela em vez de
  // piscar em branco). É esse buffer que fazia o giro "não funcionar" no primeiro arrasto
  // em produção — sem ele, o <img src> apontava pra um quadro ainda em voo.
  useEffect(() => {
    let cancelled = false;
    const img = new Image();
    img.fetchPriority = "high";
    img.onload = () => {
      if (!cancelled) setDisplayIndex(index);
    };
    img.onerror = () => {
      if (!cancelled) setDisplayIndex(index);
    };
    img.src = frames[index];
    return () => {
      cancelled = true;
    };
  }, [index, frames]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { startX: e.clientX, startIndex: index, moved: false };
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    if (!drag.current.moved) return;
    setHint(false);
    const framesPerDrag = Math.round(dx / DRAG_PX_PER_FRAME);
    let next = (drag.current.startIndex - framesPerDrag) % frames.length;
    if (next < 0) next += frames.length;
    setIndex(next);
  };

  const endDrag = () => {
    if (drag.current && !drag.current.moved) onTap?.();
    drag.current = null;
  };

  const angle = (displayIndex / frames.length) * 360;

  return (
    <div
      className={`relative h-full w-full touch-pan-y select-none ${
        onTap ? "cursor-zoom-in" : "cursor-grab active:cursor-grabbing"
      }`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
      onPointerCancel={endDrag}
    >
      <img
        src={frames[displayIndex]}
        alt={alt}
        draggable={false}
        className="h-full w-full object-contain pointer-events-none"
      />
      <AngleIndicator angle={angle} position={anglePosition} />
      {hint && (
        <div className="pointer-events-none absolute inset-0 flex items-end justify-center pb-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-background/85 px-3 py-1.5 text-[11px] font-semibold text-ink shadow backdrop-blur">
            <span aria-hidden>↔</span> Arraste para girar
          </span>
        </div>
      )}
    </div>
  );
}

function BikeInfo({ bike }: { bike: Bike }) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-2 rounded-md border border-primary/30 bg-primary/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-primary">
            {bike.tag}
          </span>
          {bike.badge && (
            <span className="inline-flex items-center gap-2 rounded-md bg-primary px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-primary-foreground">
              {bike.badge}
            </span>
          )}
        </div>
        <h3 className="mt-4 font-display text-3xl font-bold text-ink">{bike.name}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{bike.desc}</p>
      </div>

      <ul className="flex flex-wrap gap-1.5 border-y border-border py-5">
        {bike.specs.map((s) => (
          <li
            key={s}
            className="rounded-md bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground"
          >
            {s}
          </li>
        ))}
      </ul>

      <div>
        <p className="text-[11px] uppercase tracking-widest text-muted-foreground">À vista</p>
        <p className="font-display text-3xl font-bold leading-none text-ink">{bike.cash}</p>
        <p className="mt-1.5 text-sm font-semibold text-primary">ou {bike.parcel}</p>
        <a
          href={bike.wa}
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary-dark"
        >
          Simular no WhatsApp
          <span aria-hidden>→</span>
        </a>
      </div>
    </div>
  );
}

function Lightbox({
  bike,
  mode,
  index,
  onClose,
}: {
  bike: Bike;
  mode: "gallery" | "360";
  index: number;
  onClose: () => void;
}) {
  const ZOOM = 2.4;
  const PAN_LIMIT = 220;
  const [visible, setVisible] = useState(false);
  const [lbMode, setLbMode] = useState(mode);
  const [lbIndex, setLbIndex] = useState(index);
  const [zoomed, setZoomed] = useState(false);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const has360 = !!bike.spin360?.length;
  const dialogRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const imgDrag = useRef<{ x: number; y: number; moved: boolean } | null>(null);

  const goTo = (delta: number) => {
    setLbIndex((i) => (i + delta + bike.imgs.length) % bike.imgs.length);
  };

  // Troca de foto ou de modo sempre reseta o zoom/pan da imagem anterior.
  useEffect(() => {
    setZoomed(false);
    setPan({ x: 0, y: 0 });
  }, [lbIndex, lbMode]);

  // Trava de scroll, foco inicial e devolução do foco ao elemento que abriu o lightbox.
  useEffect(() => {
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    const id = requestAnimationFrame(() => {
      setVisible(true);
      dialogRef.current?.focus();
    });
    document.body.style.overflow = "hidden";
    return () => {
      cancelAnimationFrame(id);
      document.body.style.overflow = "";
      previouslyFocused.current?.focus?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Esc fecha, ←/→ navegam entre fotos, Tab fica preso dentro do modal.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (lbMode === "gallery" && (e.key === "ArrowRight" || e.key === "ArrowLeft")) {
        goTo(e.key === "ArrowRight" ? 1 : -1);
        return;
      }
      if (e.key === "Tab") {
        const container = dialogRef.current;
        if (!container) return;
        const focusables = Array.from(
          container.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
          ),
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lbMode, bike.imgs.length, onClose]);

  const onImgPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    imgDrag.current = { x: e.clientX, y: e.clientY, moved: false };
  };

  const onImgPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const drag = imgDrag.current;
    if (!drag) return;
    const dx = e.clientX - drag.x;
    const dy = e.clientY - drag.y;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) drag.moved = true;
    if (zoomed && drag.moved) {
      drag.x = e.clientX;
      drag.y = e.clientY;
      setPan((p) => ({
        x: Math.max(-PAN_LIMIT, Math.min(PAN_LIMIT, p.x + dx / ZOOM)),
        y: Math.max(-PAN_LIMIT, Math.min(PAN_LIMIT, p.y + dy / ZOOM)),
      }));
    }
  };

  const onImgPointerUp = () => {
    const drag = imgDrag.current;
    imgDrag.current = null;
    if (drag && !drag.moved) {
      setZoomed((z) => !z);
      setPan({ x: 0, y: 0 });
    }
  };

  return (
    <div
      className={`fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm transition-opacity duration-300 lg:flex lg:items-center lg:justify-center lg:p-6 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={`${bike.name} — fotos e detalhes`}
        tabIndex={-1}
        className={`grid h-full w-full grid-rows-[auto_1fr] overflow-hidden bg-card outline-none transition-all duration-300 lg:max-h-[88vh] lg:max-w-6xl lg:rounded-2xl lg:shadow-2xl lg:grid-cols-[1fr_380px] lg:grid-rows-1 ${
          visible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <div className={`relative flex h-full flex-col overflow-hidden p-4 sm:p-6 ${STUDIO_BG}`}>
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/40 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
            >
              <span aria-hidden>←</span> Voltar às motos
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/25 bg-black/40 text-white backdrop-blur transition hover:bg-white/10"
            >
              ✕
            </button>
          </div>

          <div className="relative py-2 lg:min-h-0 lg:flex-1">
            <div className="relative mx-auto aspect-[4/3] w-full lg:aspect-auto lg:h-full">
              {lbMode === "360" && bike.spin360 ? (
                <Spin360Viewer frames={bike.spin360} alt={bike.name} anglePosition="top-left" />
              ) : (
                <div
                  onPointerDown={onImgPointerDown}
                  onPointerMove={onImgPointerMove}
                  onPointerUp={onImgPointerUp}
                  onPointerLeave={onImgPointerUp}
                  onPointerCancel={onImgPointerUp}
                  className={`h-full w-full touch-none select-none overflow-hidden ${
                    zoomed ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in"
                  }`}
                >
                  <img
                    src={bike.imgs[lbIndex]}
                    alt={`${bike.name} — foto ${lbIndex + 1}`}
                    draggable={false}
                    className={`h-full w-full object-contain ${zoomed ? "" : "transition-transform duration-300"}`}
                    style={{
                      transform: zoomed
                        ? `scale(${ZOOM}) translate(${pan.x}px, ${pan.y}px)`
                        : "scale(1)",
                    }}
                  />
                </div>
              )}
              {lbMode === "gallery" && bike.imgs.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => goTo(-1)}
                    aria-label="Foto anterior"
                    className="absolute left-2 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-black/30 text-lg text-white backdrop-blur transition hover:bg-black/60"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    onClick={() => goTo(1)}
                    aria-label="Próxima foto"
                    className="absolute right-2 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-black/30 text-lg text-white backdrop-blur transition hover:bg-black/60"
                  >
                    ›
                  </button>
                </>
              )}
              {has360 && (
                <button
                  type="button"
                  onClick={() => {
                    setZoomed(false);
                    setLbMode(lbMode === "360" ? "gallery" : "360");
                  }}
                  className={`absolute bottom-2 left-2 flex h-14 w-14 flex-col items-center justify-center gap-0.5 rounded-full border-2 backdrop-blur transition sm:h-20 sm:w-20 ${
                    lbMode === "360"
                      ? "border-white/30 bg-black/50 text-white hover:bg-black/70"
                      : "border-primary/70 bg-black/50 text-primary hover:bg-black/70"
                  }`}
                >
                  {lbMode === "360" ? (
                    <>
                      <span aria-hidden className="text-base leading-none sm:text-xl">✕</span>
                      <span className="text-[8px] font-semibold sm:text-[10px]">Ver fotos</span>
                    </>
                  ) : (
                    <>
                      <span aria-hidden className="text-base leading-none sm:text-xl">⟳</span>
                      <span className="text-[9px] font-bold leading-none sm:text-[11px]">360°</span>
                      <span className="text-[7px] font-medium sm:text-[9px]">Ver em 360</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {lbMode === "gallery" && (
            <div className="flex shrink-0 flex-col items-center gap-3 pt-2">
              {bike.imgs.length > 1 && (
                <div className="flex justify-center gap-1.5">
                  {bike.imgs.map((im, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        setLbIndex(i);
                        setZoomed(false);
                      }}
                      aria-label={`Ver foto ${i + 1}`}
                      className={`h-1 rounded-full transition ${
                        lbIndex === i ? "w-6 bg-primary" : "w-3 bg-white/25 hover:bg-white/40"
                      }`}
                    />
                  ))}
                </div>
              )}
              <div className="flex w-full justify-center gap-2 overflow-x-auto">
                {bike.imgs.map((im, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setLbIndex(i);
                      setZoomed(false);
                    }}
                    aria-label={`Ver foto ${i + 1}`}
                    aria-current={lbIndex === i}
                    className={`aspect-[4/3] h-16 shrink-0 overflow-hidden rounded-lg border transition sm:h-20 ${THUMB_BG} ${
                      lbIndex === i
                        ? "border-primary ring-1 ring-primary/50"
                        : "border-white/15 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={im} alt="" className="h-full w-full object-contain p-1" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="max-h-full overflow-y-auto border-t border-border p-6 lg:self-center lg:border-l lg:border-t-0 lg:p-8">
          <BikeInfo bike={bike} />
        </div>
      </div>
    </div>
  );
}

function BikeGallery({
  bike,
  onExpand,
}: {
  bike: Bike;
  onExpand: (mode: "gallery" | "360", index: number) => void;
}) {
  const [active, setActive] = useState(0);
  const [mode, setMode] = useState<"gallery" | "360">("gallery");
  const has360 = !!bike.spin360?.length;

  return (
    <div>
      <div className={`relative aspect-[4/3] overflow-hidden ${STUDIO_BG}`}>
        {mode === "360" && bike.spin360 ? (
          <Spin360Viewer
            frames={bike.spin360}
            alt={bike.name}
            onTap={() => onExpand("360", 0)}
          />
        ) : (
          <button
            type="button"
            onClick={() => onExpand("gallery", active)}
            aria-label={`Ampliar foto da ${bike.name}`}
            className="block h-full w-full cursor-zoom-in"
          >
            <img
              src={bike.imgs[active]}
              alt={`${bike.name} — foto ${active + 1}`}
              width={1200}
              height={900}
              loading="lazy"
              className="h-full w-full scale-125 object-contain p-4 transition duration-500 group-hover:scale-[1.32]"
            />
          </button>
        )}
        <span className="absolute left-3 top-3 rounded-md border border-primary/30 bg-background/75 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-primary backdrop-blur">
          {bike.tag}
        </span>
        {bike.badge && (
          <span className="absolute right-3 top-3 rounded-md bg-primary px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-primary-foreground">
            {bike.badge}
          </span>
        )}
        {has360 && (
          <button
            type="button"
            onClick={() => setMode(mode === "360" ? "gallery" : "360")}
            className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-background/85 px-3 py-1.5 text-[11px] font-semibold text-ink shadow backdrop-blur transition hover:bg-background"
          >
            {mode === "360" ? (
              <>
                <span aria-hidden>✕</span> Fotos
              </>
            ) : (
              <>
                <span aria-hidden>⟳</span> 360°
              </>
            )}
          </button>
        )}
      </div>
      <div
        className="grid grid-cols-4 gap-1.5 border-b border-border p-2.5"
        onMouseLeave={() => setActive(0)}
      >
        {bike.imgs.map((im, i) => (
          <button
            key={i}
            type="button"
            onClick={() => {
              setActive(i);
              setMode("gallery");
              onExpand("gallery", i);
            }}
            onMouseEnter={() => setActive(i)}
            aria-label={`Ver foto ${i + 1} da ${bike.name}`}
            aria-current={mode === "gallery" && active === i}
            className={`relative aspect-[4/3] overflow-hidden rounded-md border transition ${THUMB_BG} ${
              mode === "gallery" && active === i
                ? "border-primary ring-1 ring-primary/40"
                : "border-border opacity-60 hover:opacity-100"
            }`}
          >
            <img
              src={im}
              alt=""
              width={300}
              height={225}
              loading="lazy"
              className="h-full w-full object-contain p-1"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

function Lineup() {
  const categories = useMemo(
    () => ["Todas", ...Array.from(new Set(BIKES.map((b) => b.tag)))],
    [],
  );
  const [filter, setFilter] = useState("Todas");
  const visible = filter === "Todas" ? BIKES : BIKES.filter((b) => b.tag === filter);
  const [lightbox, setLightbox] = useState<{
    bike: Bike;
    mode: "gallery" | "360";
    index: number;
  } | null>(null);

  return (
    <section id="linha" className="mx-auto max-w-[1700px] px-5 py-20 lg:px-10 lg:py-24">
      <header className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div className="max-w-xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
            Catálogo — linha 2026
          </p>
          <h2 className="mt-4 font-display text-4xl font-bold leading-[1.05] text-ink sm:text-5xl">
            Escolha a sua próxima máquina.
          </h2>
        </div>
        <p className="max-w-sm text-muted-foreground">
          Da scooter urbana à big trail — todas com procedência, garantia de 12 meses e primeira
          revisão inclusa.
        </p>
      </header>

      <div className="mt-10 flex flex-wrap gap-2" role="group" aria-label="Filtrar por categoria">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setFilter(c)}
            aria-pressed={filter === c}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
              filter === c
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-surface text-muted-foreground hover:border-primary/40 hover:text-primary"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {visible.map((b) => (
          <article
            key={b.name}
            className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-card-hover"
          >
            <BikeGallery
              bike={b}
              onExpand={(mode, index) => setLightbox({ bike: b, mode, index })}
            />
            <div className="flex flex-1 flex-col gap-4 p-5">
              <div>
                <h3 className="font-display text-xl font-bold text-ink">{b.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.desc}</p>
              </div>
              <ul className="flex flex-wrap gap-1.5">
                {b.specs.map((s) => (
                  <li
                    key={s}
                    className="rounded-md bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground"
                  >
                    {s}
                  </li>
                ))}
              </ul>
              <div className="mt-auto border-t border-border pt-4">
                <p className="text-[11px] uppercase tracking-widest text-muted-foreground">
                  À vista
                </p>
                <p className="font-display text-3xl font-bold leading-none text-ink">{b.cash}</p>
                <p className="mt-1.5 text-sm font-semibold text-primary">ou {b.parcel}</p>
                <a
                  href={b.wa}
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary-dark"
                >
                  Simular no WhatsApp
                  <span aria-hidden>→</span>
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-10 flex flex-col items-center gap-3">
        <a
          href={WHATSAPP}
          className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition hover:text-primary"
        >
          Ver todos os modelos disponíveis no showroom
          <span aria-hidden>→</span>
        </a>
        <p className="text-center text-xs text-muted-foreground/70">
          Preços à vista, sujeitos a alteração sem aviso prévio. Consulte condições atualizadas
          com um consultor VR.
        </p>
      </div>

      {lightbox && (
        <Lightbox
          bike={lightbox.bike}
          mode={lightbox.mode}
          index={lightbox.index}
          onClose={() => setLightbox(null)}
        />
      )}
    </section>
  );
}

function Experience() {
  return (
    <section id="experiencia" className="border-y border-border bg-surface">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8 lg:py-24">
        <div className="relative order-2 lg:order-1">
          <div className="overflow-hidden rounded-xl border border-border shadow-card">
            <img
              src={showroom}
              alt="Showroom VR Multimarcas com iluminação ambiente"
              width={1600}
              height={1000}
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
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
            A experiência VR
          </p>
          <h2 className="mt-4 font-display text-4xl font-bold leading-[1.05] text-ink sm:text-5xl">
            Comprar moto pode ser simples de verdade.
          </h2>
          <p className="mt-5 text-muted-foreground">
            Nada de pressão, letra miúda ou aquele papo de vendedor. Aqui você conversa com quem
            pilota, testa antes de decidir e sai com a moto certa pra você.
          </p>
          <ul className="mt-8 space-y-4">
            {[
              {
                t: "Curadoria multimarcas",
                d: "Trabalhamos com as principais fabricantes — você escolhe pelo modelo, não pela marca.",
              },
              {
                t: "Test-ride sem compromisso",
                d: "Reserve, pilote e sinta. Se não for a sua moto, a gente encontra outra.",
              },
              {
                t: "Atendimento humano",
                d: "Zero robô, zero enrolação. Fala com gente que respira duas rodas.",
              },
            ].map((f) => (
              <li key={f.t} className="flex gap-4">
                <span className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  ✓
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
    { t: "Oficina certificada", d: "Mecânicos treinados, peças originais e diagnóstico digital. Sua moto volta melhor do que entrou." },
    { t: "Seminovos com procedência", d: "Toda moto usada passa por 47 pontos de inspeção antes de entrar no showroom." },
    { t: "Acessórios e equipamentos", d: "Capacetes, roupas e acessórios das principais marcas para pilotar com segurança." },
    { t: "Documentação inclusa", d: "Transferência, emplacamento e primeira revisão — a gente cuida de tudo pra você." },
  ];
  return (
    <section id="servicos" className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">
      <div className="mb-12 max-w-2xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
          Serviços
        </p>
        <h2 className="mt-4 font-display text-4xl font-bold leading-[1.05] text-ink sm:text-5xl">
          Muito além da venda.
        </h2>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((s, i) => (
          <div
            key={s.t}
            className="rounded-xl border border-border bg-card p-6 shadow-card transition hover:-translate-y-1 hover:shadow-card-hover"
          >
            <p className="font-display text-sm font-bold text-primary">0{i + 1}</p>
            <h3 className="mt-5 font-display text-lg font-bold text-ink">{s.t}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Financing() {
  return (
    <section
      id="financiamento"
      className="relative overflow-hidden py-20 lg:py-24"
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_20%_0%,hsl(43_74%_52%/0.25),transparent_50%),radial-gradient(circle_at_80%_100%,hsl(43_74%_52%/0.18),transparent_50%)]"
      />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:px-8">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
            Financiamento
          </p>
          <h2 className="mt-4 font-display text-4xl font-bold leading-[1.05] text-ink sm:text-5xl">
            Sua moto cabe no orçamento.
          </h2>
          <p className="mt-5 max-w-md text-muted-foreground">
            Trabalhamos com todos os principais bancos e financeiras. Análise em poucas horas,
            entrada facilitada e o prazo que fecha na sua rotina.
          </p>
          <div className="mt-8">
            <p className="text-[11px] uppercase tracking-widest text-muted-foreground">
              Financeiras parceiras
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2.5">
              {[
                { name: "Itaú", logo: bancoItau },
                { name: "Bradesco", logo: bancoBradesco },
                { name: "Santander", logo: bancoSantander },
                { name: "Banco do Brasil", logo: bancoBB },
                { name: "Sicredi", logo: bancoSicredi },
                { name: "Caixa", logo: bancoCaixa },
              ].map((b) => (
                <span
                  key={b.name}
                  className="flex h-11 items-center rounded-lg bg-white px-3.5 shadow-sm"
                  title={b.name}
                >
                  <img src={b.logo} alt={b.name} className="h-5 w-auto object-contain sm:h-6" />
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-primary/25 bg-background/70 p-8 backdrop-blur-sm shadow-card-hover">
          <div className="grid gap-6 sm:grid-cols-2">
            {[
              { k: "Até 48x", v: "prazo estendido" },
              { k: "Entrada", v: "a partir de 10%" },
              { k: "24h", v: "aprovação rápida" },
              { k: "0%", v: "de burocracia" },
            ].map((f) => (
              <div key={f.v} className="border-l-2 border-primary pl-4">
                <p className="font-display text-2xl font-bold text-ink">{f.k}</p>
                <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                  {f.v}
                </p>
              </div>
            ))}
          </div>
          <a
            href={WHATSAPP}
            className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground shadow-cta transition hover:bg-primary-dark"
          >
            Simular financiamento agora
            <span aria-hidden>→</span>
          </a>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            Sem compromisso. Análise gratuita.
          </p>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const items = [
    { n: "Rafael M.", c: "Chapecó/SC", t: "Terceira moto que compro na VR. Atendimento honesto, entrega no prazo e a oficina é referência. Recomendo de olhos fechados." },
    { n: "Camila B.", c: "Passo Fundo/RS", t: "Fui esperando pressão de vendedor e encontrei gente que ouviu. Saí com a moto certa e uma condição que coube no bolso." },
    { n: "Diego P.", c: "Xanxerê/SC", t: "Comprei uma trail seminova, veio revisada e com documentação em dia. É o padrão que a gente sempre quis num revendedor." },
  ];
  return (
    <section className="border-y border-border bg-surface">
      <div className="mx-auto max-w-7xl px-5 pb-20 pt-10 lg:px-8 lg:pb-24 lg:pt-14">
        <div className="mb-12 max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
            Quem já pilota com a gente
          </p>
          <h2 className="mt-4 font-display text-4xl font-bold leading-[1.05] text-ink sm:text-5xl">
            Confiança que se conta em quilômetros.
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {items.map((r) => (
            <figure
              key={r.n}
              className="flex h-full flex-col rounded-xl border border-border bg-card p-6 shadow-card"
            >
              <div className="flex gap-0.5 text-primary" aria-label="5 estrelas">★★★★★</div>
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground">
                “{r.t}”
              </blockquote>
              <figcaption className="mt-6 border-t border-border pt-4 text-sm">
                <p className="font-semibold text-ink">{r.n}</p>
                <p className="text-xs text-muted-foreground">{r.c}</p>
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
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
            Venha nos visitar
          </p>
          <h2 className="mt-4 font-display text-4xl font-bold leading-[1.05] text-ink sm:text-5xl">
            Um café, uma volta e a sua próxima moto.
          </h2>
          <p className="mt-5 max-w-md text-muted-foreground">
            Nosso showroom foi feito pra você passar tempo. Chega, escolhe, testa. Sem pressa e
            sem pressão.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <div>
              <p className="text-[11px] uppercase tracking-widest text-muted-foreground">Endereço</p>
              <p className="mt-2 text-sm">
                Av. Getúlio Vargas, 2500<br />Centro — Chapecó / SC
              </p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-widest text-muted-foreground">Horário</p>
              <p className="mt-2 text-sm">
                Seg a Sex — 8h às 19h<br />Sáb — 8h às 13h
              </p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-widest text-muted-foreground">WhatsApp</p>
              <a href={WHATSAPP} className="mt-2 block text-sm font-semibold text-primary hover:underline">
                (49) 9 9999-9999
              </a>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-widest text-muted-foreground">E-mail</p>
              <a href="mailto:contato@vrmultimarcas.com.br" className="mt-2 block text-sm font-semibold text-primary hover:underline">
                contato@vrmultimarcas.com.br
              </a>
            </div>
          </div>
          <div className="mt-8 overflow-hidden rounded-xl border border-border shadow-card">
            <iframe
              title="Mapa até a VR Multimarcas"
              src="https://www.google.com/maps?q=Av.+Get%C3%BAlio+Vargas,+2500,+Centro,+Chapec%C3%B3+-+SC&output=embed"
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
              href="tel:+554999999999"
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
            VR Multimarcas é uma unidade franqueada do Grupo VR, referência em varejo
            motociclístico no Brasil.
          </p>
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-ink">Navegação</p>
          <div className="mt-4 flex flex-col gap-2.5 text-sm">
            <a href="#linha" className="transition hover:text-primary">Motos</a>
            <a href="#financiamento" className="transition hover:text-primary">Financiamento</a>
            <a href="#experiencia" className="transition hover:text-primary">Experiência</a>
            <a href="#servicos" className="transition hover:text-primary">Serviços</a>
            <a href="#visite" className="transition hover:text-primary">Visite</a>
          </div>
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-ink">Contato</p>
          <div className="mt-4 flex flex-col gap-2.5 text-sm">
            <span>Av. Getúlio Vargas, 2500 — Chapecó/SC</span>
            <a href={WHATSAPP} className="transition hover:text-primary">(49) 9 9999-9999</a>
            <a href="mailto:contato@vrmultimarcas.com.br" className="transition hover:text-primary">
              contato@vrmultimarcas.com.br
            </a>
          </div>
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-ink">Horário</p>
          <div className="mt-4 flex flex-col gap-2.5 text-sm">
            <span>Seg a Sex — 8h às 19h</span>
            <span>Sáb — 8h às 13h</span>
          </div>
        </div>
      </div>
      {/* TODO: incluir CNPJ e razão social reais da VR Multimarcas aqui quando disponíveis. */}
      <div className="border-t border-border px-5 py-5 lg:px-8">
        <p className="text-[11px] text-muted-foreground/70">
          © {new Date().getFullYear()} VR Multimarcas. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}

function FloatingWhatsApp() {
  return (
    <a
      href={WHATSAPP}
      aria-label="Falar no WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3.5 text-sm font-semibold text-white shadow-[0_10px_30px_-8px_rgba(37,211,102,0.7)] transition hover:brightness-105"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
        <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47s1.06 2.86 1.21 3.06c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.71 2-1.4.25-.69.25-1.28.17-1.4-.07-.13-.27-.2-.57-.35z" />
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.28-1.38a9.9 9.9 0 0 0 4.76 1.21h.01c5.46 0 9.9-4.45 9.9-9.91C21.95 6.45 17.5 2 12.04 2zm0 18.14h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.05-.2-.31a8.19 8.19 0 0 1-1.26-4.36c0-4.54 3.7-8.23 8.25-8.23a8.23 8.23 0 0 1 8.24 8.24c0 4.54-3.7 8.22-8.24 8.22z" />
      </svg>
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}
