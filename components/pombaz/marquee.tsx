const phrase =
  "POMBAZ ◆ PRODUTOS DIGITAIS ◆ CONTEÚDO QUE CONVERTE ◆ INFOPRODUTOS ◆ RESULTADOS REAIS ◆ "

function Block() {
  return (
    <span
      className="shrink-0 whitespace-nowrap pr-10"
      style={{
        fontSize: "0.78rem",
        fontWeight: 700,
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        color: "#0a0906",
      }}
    >
      {phrase.repeat(2)}
    </span>
  )
}

export function Marquee() {
  return (
    <div
      className="overflow-hidden py-4 md:py-5"
      style={{ backgroundColor: "#F5C518" }}
      aria-label="POMBAZ — Produtos digitais · Conteúdo que converte · Infoprodutos · Resultados reais"
    >
      <div className="flex pombaz-marquee-track w-max">
        <Block />
        <Block />
      </div>
    </div>
  )
}
