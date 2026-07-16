import { createFileRoute } from "@tanstack/react-router";
import heroBike from "@/assets/hero-bike.jpg";
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
      className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-md"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Logo />
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#linha" className="transition hover:text-foreground">Linha</a>
          <a href="#experiencia" className="transition hover:text-foreground">Experiência</a>
          <a href="#servicos" className="transition hover:text-foreground">Serviços</a>
          <a href="#financiamento" className="transition hover:text-foreground">Financiamento</a>
          <a href="#visite" className="transition hover:text-foreground">Visite</a>
        </nav>
        <a
          href={WHATSAPP}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-gold px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
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
    <section className="relative overflow-hidden bg-gradient-hero">
      <div className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:22px_22px]" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 pb-20 pt-14 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-8 lg:px-8 lg:pb-28 lg:pt-20">
        <div className="max-w-xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Grupo VR • Franquia oficial
          </span>
          <h1 className="mt-6 font-display text-[42px] font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-[68px]">
            Sua próxima moto
            <br />
            <span className="text-gradient-gold">começa aqui.</span>
          </h1>
          <p className="mt-6 max-w-md text-base text-muted-foreground sm:text-lg">
            Showroom completo, oficina certificada e um time que entende de moto de verdade.
            Multimarcas, condição justa e a experiência premium do Grupo VR.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#linha"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-gold px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition hover:opacity-95"
            >
              Ver a linha
              <span aria-hidden>→</span>
            </a>
            <a
              href={WHATSAPP}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-6 py-3.5 text-sm font-medium text-foreground transition hover:border-primary/40 hover:bg-surface"
            >
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Falar no WhatsApp
            </a>
          </div>
          <dl className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-border/50 pt-6 text-left">
            {[
              { k: "+30", v: "modelos" },
              { k: "12 meses", v: "de garantia" },
              { k: "48h", v: "para pilotar" },
            ].map((s) => (
              <div key={s.v}>
                <dt className="font-display text-2xl font-semibold text-foreground">{s.k}</dt>
                <dd className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                  {s.v}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="relative">
          <div aria-hidden className="absolute -inset-8 rounded-full bg-primary/15 blur-3xl" />
          <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-surface ring-gold">
            <img
              src={heroBike}
              alt="Moto esportiva em destaque no showroom VR Multimarcas"
              width={1600}
              height={1200}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-background/95 via-background/40 to-transparent p-5">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-primary">
                  Destaque
                </p>
                <p className="mt-1 font-display text-lg font-semibold">Yamaha MT-03 2026</p>
              </div>
              <span className="rounded-full border border-primary/40 bg-background/70 px-3 py-1 text-xs font-medium text-primary">
                Novo
              </span>
            </div>
          </div>
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
    <section className="border-y border-border/60 bg-surface/40">
      <div className="mx-auto grid max-w-7xl grid-cols-2 divide-border/50 px-5 py-10 sm:grid-cols-4 sm:divide-x lg:px-8">
        {items.map((s, i) => (
          <div key={s.v} className={`px-2 py-3 sm:px-6 ${i > 0 ? "sm:pl-8" : ""}`}>
            <p className="font-display text-3xl font-semibold text-gradient-gold sm:text-4xl">
              {s.k}
            </p>
            <p className="mt-2 text-sm font-medium text-foreground">{s.v}</p>
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
  price: string;
  img: string;
  wa: string;
};

const BIKES: Bike[] = [
  {
    tag: "Trail",
    name: "SHI 175",
    desc: "Versátil no asfalto e firme na estrada de chão. Robusta, econômica e pronta para a rotina do oeste catarinense.",
    specs: ["175cc", "Partida elétrica", "Freio a disco"],
    price: "a partir de R$ 289/mês",
    img: bikeTrail,
    wa: "https://wa.me/5549999999999?text=Ol%C3%A1!%20Quero%20uma%20simula%C3%A7%C3%A3o%20da%20SHI%20175.",
  },
  {
    tag: "Urbana",
    name: "JET 125",
    desc: "Scooter ágil e econômica, com design moderno e conforto para o dia a dia na cidade.",
    specs: ["125cc", "Automática", "Baixo consumo"],
    price: "a partir de R$ 219/mês",
    img: bikeScooter,
    wa: "https://wa.me/5549999999999?text=Ol%C3%A1!%20Quero%20uma%20simula%C3%A7%C3%A3o%20da%20JET%20125.",
  },
  {
    tag: "Naked",
    name: "JEF 170",
    desc: "Naked esportiva com presença forte, painel digital e desempenho para quem gosta de pilotar.",
    specs: ["170cc", "Painel digital", "Freio a disco"],
    price: "a partir de R$ 269/mês",
    img: bikeNaked,
    wa: "https://wa.me/5549999999999?text=Ol%C3%A1!%20Quero%20uma%20simula%C3%A7%C3%A3o%20da%20JEF%20170.",
  },
];

function Lineup() {
  return (
    <section id="linha" className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
      <header className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div className="max-w-xl">
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-primary">
            Linha 2026
          </p>
          <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.05] sm:text-5xl">
            Escolha a sua
            <br />
            <span className="text-gradient-gold">próxima máquina.</span>
          </h2>
        </div>
        <p className="max-w-sm text-muted-foreground">
          Da naked urbana à trail off-road, cada moto é escolhida a dedo pela nossa curadoria.
          Todas com procedência, garantia e revisão inclusa.
        </p>
      </header>
      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {BIKES.map((b) => (
          <article
            key={b.name}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-surface/60 transition hover:-translate-y-1 hover:border-primary/40 hover:bg-surface"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-background">
              <img
                src={b.img}
                alt={b.name}
                width={1200}
                height={900}
                loading="lazy"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
              />
              <span className="absolute left-4 top-4 rounded-full border border-primary/30 bg-background/70 px-3 py-1 text-[11px] font-medium uppercase tracking-widest text-primary backdrop-blur">
                {b.tag}
              </span>
            </div>
            <div className="flex flex-1 flex-col gap-5 p-6">
              <div>
                <h3 className="font-display text-2xl font-semibold">{b.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.desc}</p>
              </div>
              <ul className="grid grid-cols-1 gap-2 text-sm">
                {b.specs.map((s) => (
                  <li key={s} className="flex items-center gap-2 text-muted-foreground">
                    <span className="h-1 w-1 rounded-full bg-primary" />
                    {s}
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex items-center justify-between border-t border-border/60 pt-5">
                <div>
                  <p className="text-[11px] uppercase tracking-widest text-muted-foreground">
                    Financiamento
                  </p>
                  <p className="mt-0.5 font-display text-sm font-semibold text-foreground">
                    {b.price}
                  </p>
                </div>
                <a
                  href={b.wa}
                  className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 px-4 py-2 text-xs font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground"
                >
                  Simular
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
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-primary"
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
    <section id="experiencia" className="relative overflow-hidden border-y border-border/60">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-24 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8">
        <div className="relative order-2 lg:order-1">
          <div className="relative overflow-hidden rounded-2xl border border-border/60">
            <img
              src={showroom}
              alt="Showroom VR Multimarcas com iluminação ambiente"
              width={1600}
              height={1000}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-4 hidden max-w-[240px] rounded-xl border border-primary/30 bg-background/95 p-4 shadow-[var(--shadow-elegant)] backdrop-blur sm:block">
            <p className="text-[11px] uppercase tracking-widest text-primary">Padrão VR</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Cada loja segue o mesmo protocolo de excelência e curadoria do Grupo VR.
            </p>
          </div>
        </div>
        <div className="order-1 max-w-lg lg:order-2">
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-primary">
            A experiência VR
          </p>
          <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.05] sm:text-5xl">
            Comprar moto pode ser
            <br />
            <span className="text-gradient-gold">simples de verdade.</span>
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
                <span className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-primary/30 bg-primary/10 text-primary">
                  ✓
                </span>
                <div>
                  <p className="font-medium text-foreground">{f.t}</p>
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
    <section id="servicos" className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
      <div className="mb-14 max-w-2xl">
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-primary">
          Serviços
        </p>
        <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.05] sm:text-5xl">
          Muito além
          <br />
          <span className="text-gradient-gold">da venda.</span>
        </h2>
      </div>
      <div className="grid gap-px overflow-hidden rounded-2xl border border-border/70 bg-border/60 sm:grid-cols-2">
        {items.map((s, i) => (
          <div key={s.t} className="bg-surface/60 p-8 transition hover:bg-surface">
            <p className="font-display text-xs font-medium text-primary">0{i + 1}</p>
            <h3 className="mt-6 font-display text-xl font-semibold">{s.t}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Financing() {
  return (
    <section id="financiamento" className="relative overflow-hidden bg-surface/40 py-24 lg:py-32">
      <div
        aria-hidden
        className="absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_20%_0%,color-mix(in_oklab,var(--primary)_25%,transparent),transparent_50%),radial-gradient(circle_at_80%_100%,color-mix(in_oklab,var(--primary)_18%,transparent),transparent_50%)]"
      />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:px-8">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-primary">
            Financiamento
          </p>
          <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.05] sm:text-5xl">
            Sua moto cabe
            <br />
            <span className="text-gradient-gold">no orçamento.</span>
          </h2>
          <p className="mt-5 max-w-md text-muted-foreground">
            Trabalhamos com todos os principais bancos e financeiras. Análise em poucas horas,
            entrada facilitada e o prazo que fecha na sua rotina.
          </p>
        </div>
        <div className="rounded-2xl border border-primary/25 bg-background/60 p-8 backdrop-blur-sm ring-gold">
          <div className="grid gap-6 sm:grid-cols-2">
            {[
              { k: "Até 48x", v: "prazo estendido" },
              { k: "Entrada", v: "a partir de 10%" },
              { k: "24h", v: "aprovação rápida" },
              { k: "0%", v: "de burocracia" },
            ].map((f) => (
              <div key={f.v} className="border-l-2 border-primary/60 pl-4">
                <p className="font-display text-2xl font-semibold">{f.k}</p>
                <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                  {f.v}
                </p>
              </div>
            ))}
          </div>
          <a
            href={WHATSAPP}
            className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-gold px-6 py-3.5 text-sm font-semibold text-primary-foreground transition hover:opacity-95"
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
    <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
      <div className="mb-14 max-w-2xl">
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-primary">
          Quem já pilota com a gente
        </p>
        <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.05] sm:text-5xl">
          Confiança que se
          <br />
          <span className="text-gradient-gold">conta em quilômetros.</span>
        </h2>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {items.map((r) => (
          <figure key={r.n} className="flex h-full flex-col rounded-2xl border border-border/70 bg-surface/60 p-7">
            <div className="flex gap-0.5 text-primary" aria-label="5 estrelas">★★★★★</div>
            <blockquote className="mt-5 flex-1 text-sm leading-relaxed text-foreground/90">
              “{r.t}”
            </blockquote>
            <figcaption className="mt-6 border-t border-border/60 pt-4 text-sm">
              <p className="font-medium">{r.n}</p>
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
    <section id="visite" className="border-t border-border/60 bg-surface/40">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:px-8 lg:py-28">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-primary">
            Venha nos visitar
          </p>
          <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.05] sm:text-5xl">
            Um café, uma volta
            <br />
            <span className="text-gradient-gold">e a sua próxima moto.</span>
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
              <a href={WHATSAPP} className="mt-2 block text-sm text-primary hover:underline">
                (49) 9 9999-9999
              </a>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-widest text-muted-foreground">E-mail</p>
              <a href="mailto:contato@vrmultimarcas.com.br" className="mt-2 block text-sm text-primary hover:underline">
                contato@vrmultimarcas.com.br
              </a>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-primary/30 bg-background p-10 ring-gold">
          <p className="font-display text-sm text-primary">Pronto pra pilotar?</p>
          <h3 className="mt-3 font-display text-3xl font-semibold leading-tight">
            Fale com um consultor VR agora mesmo.
          </h3>
          <p className="mt-4 text-sm text-muted-foreground">
            Respondemos em minutos. Simulação, test-ride e reserva sem sair do sofá.
          </p>
          <div className="mt-8 flex flex-col gap-3">
            <a
              href={WHATSAPP}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-gold px-6 py-3.5 text-sm font-semibold text-primary-foreground transition hover:opacity-95"
            >
              Chamar no WhatsApp
              <span aria-hidden>→</span>
            </a>
            <a
              href="tel:+554999999999"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-transparent px-6 py-3.5 text-sm font-medium text-foreground transition hover:border-primary/40"
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
    <footer className="border-t border-border/60">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-12 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="flex flex-col gap-3">
          <Logo />
          <p className="max-w-sm text-xs text-muted-foreground">
            VR Multimarcas é uma unidade franqueada do Grupo VR, referência em varejo
            motociclístico no Brasil.
          </p>
        </div>
        <div className="flex flex-wrap gap-6 text-xs text-muted-foreground">
          <a href="#linha" className="hover:text-foreground">Linha</a>
          <a href="#servicos" className="hover:text-foreground">Serviços</a>
          <a href="#financiamento" className="hover:text-foreground">Financiamento</a>
          <a href="#visite" className="hover:text-foreground">Visite</a>
        </div>
        <p className="text-[11px] text-muted-foreground">
          © {new Date().getFullYear()} VR Multimarcas. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
