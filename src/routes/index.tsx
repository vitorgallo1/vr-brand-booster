import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import heroBike from "@/assets/hero-bike.jpg";
import heroWallpaper from "@/assets/wallpaperhero.png";
import bikeNaked from "@/assets/bike-naked.jpg";
import bikeTrail from "@/assets/bike-trail.jpg";
import bikeScooter from "@/assets/bike-scooter.jpg";
import showroom from "@/assets/showroom.jpg";
import logoVR from "@/assets/logo-vr.jpg.asset.json";

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
      <Experience />
      <Services />
      <Financing />
      <Testimonials />
      <Visit />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

function Logo() {
  return (
    <a href="#top" className="flex items-center" aria-label="VR Multimarcas">
      <img
        src={logoVR.url}
        alt="VR Multimarcas"
        width={200}
        height={64}
        className="h-10 w-auto md:h-11"
      />
    </a>
  );
}

function Nav() {
  return (
    <header
      id="top"
      className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Logo />
        <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
          <a href="#linha" className="transition hover:text-primary">Motos</a>
          <a href="#experiencia" className="transition hover:text-primary">Experiência</a>
          <a href="#servicos" className="transition hover:text-primary">Serviços</a>
          <a href="#financiamento" className="transition hover:text-primary">Financiamento</a>
          <a href="#visite" className="transition hover:text-primary">Visite</a>
        </nav>
        <a
          href={WHATSAPP}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-cta transition hover:bg-primary-dark"
        >
          Fale conosco
          <span aria-hidden>→</span>
        </a>
      </div>
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
  wa: string;
};

// Placeholder: cada moto exibe 4 fotos. Troque estas imagens pelas fotos
// reais de cada modelo (frente, lateral, traseira, detalhe) no Lovable.
const wa = (model: string) =>
  `https://wa.me/5549999999999?text=${encodeURIComponent(
    `Olá! Quero uma simulação da ${model}.`,
  )}`;

const BIKES: Bike[] = [
  {
    tag: "Trail",
    name: "SHI 175",
    desc: "Versátil no asfalto e firme na estrada de chão. Robusta, econômica e pronta para a rotina do oeste catarinense.",
    specs: ["175cc", "Partida elétrica", "Freio a disco"],
    cash: "R$ 13.990",
    parcel: "48x de R$ 289",
    badge: "Mais vendida",
    imgs: [bikeTrail, bikeNaked, bikeScooter, heroBike],
    wa: wa("SHI 175"),
  },
  {
    tag: "Urbana",
    name: "JET 125",
    desc: "Scooter ágil e econômica, com design moderno e conforto para o dia a dia na cidade.",
    specs: ["125cc", "Automática", "Baixo consumo"],
    cash: "R$ 10.490",
    parcel: "48x de R$ 219",
    imgs: [bikeScooter, bikeTrail, heroBike, bikeNaked],
    wa: wa("JET 125"),
  },
  {
    tag: "Naked",
    name: "JEF 170",
    desc: "Naked esportiva com presença forte, painel digital e desempenho para quem gosta de pilotar.",
    specs: ["170cc", "Painel digital", "Freio a disco"],
    cash: "R$ 12.890",
    parcel: "48x de R$ 269",
    imgs: [bikeNaked, heroBike, bikeTrail, bikeScooter],
    wa: wa("JEF 170"),
  },
  {
    tag: "Sport",
    name: "RX 300",
    desc: "Esportiva de médio porte com fairing aerodinâmico, resposta rápida e postura agressiva para quem curte curva.",
    specs: ["300cc", "ABS dianteiro", "Painel TFT"],
    cash: "R$ 20.190",
    parcel: "48x de R$ 419",
    badge: "Lançamento",
    imgs: [heroBike, bikeNaked, bikeTrail, bikeScooter],
    wa: wa("RX 300"),
  },
  {
    tag: "Big Trail",
    name: "MAX 250",
    desc: "Big trail para encarar cidade e trilha com folga. Tanque generoso, suspensão de longo curso e conforto de viagem.",
    specs: ["250cc", "Suspensão reforçada", "Autonomia estendida"],
    cash: "R$ 18.290",
    parcel: "48x de R$ 379",
    imgs: [bikeTrail, heroBike, bikeScooter, bikeNaked],
    wa: wa("MAX 250"),
  },
];

function BikeGallery({ bike }: { bike: Bike }) {
  const [active, setActive] = useState(0);
  return (
    <div>
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
        <img
          src={bike.imgs[active]}
          alt={`${bike.name} — foto ${active + 1}`}
          width={1200}
          height={900}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
        />
        <span className="absolute left-3 top-3 rounded-md border border-primary/30 bg-background/75 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-primary backdrop-blur">
          {bike.tag}
        </span>
        {bike.badge && (
          <span className="absolute right-3 top-3 rounded-md bg-primary px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-primary-foreground">
            {bike.badge}
          </span>
        )}
      </div>
      <div className="grid grid-cols-4 gap-1.5 border-b border-border p-2.5">
        {bike.imgs.map((im, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            onMouseEnter={() => setActive(i)}
            aria-label={`Ver foto ${i + 1} da ${bike.name}`}
            aria-current={active === i}
            className={`relative aspect-[4/3] overflow-hidden rounded-md border transition ${
              active === i
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
              className="h-full w-full object-cover"
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

  return (
    <section id="linha" className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">
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

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((b) => (
          <article
            key={b.name}
            className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-card-hover"
          >
            <BikeGallery bike={b} />
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

      <div className="mt-10 flex justify-center">
        <a
          href={WHATSAPP}
          className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition hover:text-primary"
        >
          Ver todos os modelos disponíveis no showroom
          <span aria-hidden>→</span>
        </a>
      </div>
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
      className="relative overflow-hidden border-y border-border bg-surface py-20 lg:py-24"
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
    <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">
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
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-12 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="flex flex-col gap-3">
          <Logo />
          <p className="max-w-sm text-xs">
            VR Multimarcas é uma unidade franqueada do Grupo VR, referência em varejo
            motociclístico no Brasil.
          </p>
        </div>
        <div className="flex flex-wrap gap-6 text-xs">
          <a href="#linha" className="transition hover:text-primary">Motos</a>
          <a href="#servicos" className="transition hover:text-primary">Serviços</a>
          <a href="#financiamento" className="transition hover:text-primary">Financiamento</a>
          <a href="#visite" className="transition hover:text-primary">Visite</a>
        </div>
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
