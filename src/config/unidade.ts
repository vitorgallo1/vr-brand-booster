// Dados da loja de Biguaçu. Tudo que é próprio da loja mora aqui; a página, o painel e
// as páginas de moto leem daqui.
//
// O painel /admin e a vitrine com cores vêm do projeto de Tijucas/Taubaté, que tem uma
// lista de lojas. Aqui a lista tem uma loja só, com o estoque próprio de Biguaçu.
// PENDENTE: razão social e CNPJ da VR Biguaçu.

export type UnidadeId = "biguacu";

type DiaDaSemana =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

type Unidade = {
  id: UnidadeId;
  nome: string;
  nomeCurto: string;
  cidade: string;
  uf: string;
  /** Razão social e CNPJ, para o rodapé e os dados estruturados. */
  razaoSocial: string;
  cnpj: string;
  endereco: {
    /** Rua, número e complemento — vai para os dados estruturados. */
    rua: string;
    bairro: string;
    cep: string;
    linha1: string;
    linha2: string;
    /** Uma linha só, para o rodapé. */
    curto: string;
    /** Consulta do embed do Google Maps. */
    busca: string;
  };
  whatsapp: {
    /** Só dígitos, com 55 e DDD. Vazio = ainda não informado. */
    e164: string;
    exibicao: string;
  };
  horario: string[];
  /** O mesmo horário em formato de máquina, para os dados estruturados (schema.org). */
  funcionamento?: { dias: DiaDaSemana[]; abre: string; fecha: string }[];
  /** Endereço público do site. Alimenta canônica, og:image, robots e sitemap. */
  siteUrl: string;
};

export const UNIDADES: Record<UnidadeId, Unidade> = {
  biguacu: {
    id: "biguacu",
    nome: "VR Multimarcas Biguaçu",
    nomeCurto: "VR Biguaçu",
    cidade: "Biguaçu",
    uf: "SC",
    razaoSocial: "",
    cnpj: "",
    endereco: {
      rua: "Rua Manoel Mariano Ferreira, 160",
      bairro: "Rio Caveiras",
      cep: "88161-372",
      linha1: "Rua Manoel Mariano Ferreira, 160 — Rio Caveiras",
      linha2: "Biguaçu / SC, 88161-372",
      curto: "Rua Manoel Mariano Ferreira, 160, Rio Caveiras, Biguaçu/SC",
      busca: "Rua Manoel Mariano Ferreira, 160, Rio Caveiras, Biguaçu - SC, 88161-372",
    },
    whatsapp: { e164: "5548991788090", exibicao: "(48) 99178-8090" },
    horario: ["Segunda a sábado: 10:00 às 19:00", "Domingo: fechado"],
    funcionamento: [
      {
        dias: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        abre: "10:00",
        fecha: "19:00",
      },
    ],
    siteUrl: "https://moonlit-khapse-0411d1.netlify.app",
  },
};

export const UNIDADE_ID: UnidadeId = "biguacu";
export const UNIDADE = UNIDADES[UNIDADE_ID];

export const SITE_URL = UNIDADE.siteUrl;

export const MAPS_EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent(
  UNIDADE.endereco.busca,
)}&output=embed`;

export const TEM_WHATSAPP = UNIDADE.whatsapp.e164.length > 0;

export const TELEFONE_HREF = TEM_WHATSAPP ? `tel:+${UNIDADE.whatsapp.e164}` : "";

// Link de WhatsApp com mensagem pronta. Sem argumento, usa a mensagem geral da LP.
export function whatsappUrl(mensagem?: string) {
  const texto = mensagem ?? `Olá! Gostaria de conhecer as motos da ${UNIDADE.nome}.`;
  const destino = TEM_WHATSAPP ? UNIDADE.whatsapp.e164 : "";
  return `https://wa.me/${destino}?text=${encodeURIComponent(texto)}`;
}
