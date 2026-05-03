"use client"

import { useEffect, useState, useCallback } from "react"
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Dumbbell, Trophy, Star } from "lucide-react"
import type { ProtocolGuide, ProtocolExercise } from "@/lib/protocol/types"

type PageType = "welcome" | "exercise" | "conclusion"

interface PageState {
  type: PageType
  exerciseIndex?: number
}

export function EbookProtocolClient({ slug }: { slug: string }) {
  const [guide, setGuide] = useState<ProtocolGuide | null>(null)
  const [exercises, setExercises] = useState<ProtocolExercise[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [page, setPage] = useState<PageState>({ type: "welcome" })

  useEffect(() => {
    fetch(`/api/protocol/${slug}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) {
          setError(data.error)
        } else {
          setGuide(data.guide)
          setExercises(data.exercises ?? [])
        }
      })
      .catch(() => setError("Erro ao carregar protocolo."))
      .finally(() => setLoading(false))
  }, [slug])

  const totalPages = 2 + exercises.length // welcome + exercises + conclusion
  const currentPageIndex =
    page.type === "welcome" ? 0 : page.type === "exercise" ? (page.exerciseIndex ?? 0) + 1 : totalPages - 1

  const goNext = useCallback(() => {
    if (page.type === "welcome") {
      if (exercises.length > 0) setPage({ type: "exercise", exerciseIndex: 0 })
      else setPage({ type: "conclusion" })
    } else if (page.type === "exercise") {
      const next = (page.exerciseIndex ?? 0) + 1
      if (next < exercises.length) setPage({ type: "exercise", exerciseIndex: next })
      else setPage({ type: "conclusion" })
    }
  }, [page, exercises.length])

  const goPrev = useCallback(() => {
    if (page.type === "conclusion") {
      if (exercises.length > 0) setPage({ type: "exercise", exerciseIndex: exercises.length - 1 })
      else setPage({ type: "welcome" })
    } else if (page.type === "exercise") {
      const prev = (page.exerciseIndex ?? 0) - 1
      if (prev >= 0) setPage({ type: "exercise", exerciseIndex: prev })
      else setPage({ type: "welcome" })
    }
  }, [page, exercises.length])

  if (loading) return <LoadingScreen />
  if (error || !guide) return <ErrorScreen message={error || "Protocolo não encontrado."} />

  return (
    <div className="protocol-root">
      <style>{`
        .protocol-root {
          min-height: 100vh;
          background: #0A0A0A;
          color: #fff;
          font-family: var(--font-body, system-ui, sans-serif);
        }
        .proto-accent { color: #AAFF00; }
        .proto-accent-alt { color: #FFE600; }
        .proto-border { border-color: rgba(170,255,0,0.18); }
        .proto-bg-card { background: #111111; }
        .proto-bg-card2 { background: #141414; }
        .proto-header {
          position: sticky;
          top: 0;
          z-index: 50;
          background: rgba(10,10,10,0.92);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(170,255,0,0.1);
        }
        .proto-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          background: #AAFF00;
          color: #0A0A0A;
          font-weight: 800;
          font-size: 13px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          border-radius: 999px;
          border: none;
          cursor: pointer;
          transition: background 0.2s, transform 0.1s;
        }
        .proto-btn:hover { background: #c8ff3e; transform: translateY(-1px); }
        .proto-btn:active { transform: translateY(0); }
        .proto-btn-outline {
          background: transparent;
          color: #AAFF00;
          border: 1px solid rgba(170,255,0,0.4);
        }
        .proto-btn-outline:hover { background: rgba(170,255,0,0.08); }
        .proto-btn:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }
        .proto-progress-bar {
          height: 2px;
          background: rgba(170,255,0,0.12);
          width: 100%;
        }
        .proto-progress-fill {
          height: 100%;
          background: #AAFF00;
          transition: width 0.4s ease;
        }
        .proto-image-card {
          position: relative;
          aspect-ratio: 1;
          border-radius: 12px;
          overflow: hidden;
          background: #1a1a1a;
          border: 1px solid rgba(170,255,0,0.12);
        }
        .proto-image-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .proto-caption {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          padding: 6px 8px;
          background: linear-gradient(to top, rgba(0,0,0,0.88), transparent);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #AAFF00;
        }
        .proto-paragraph {
          font-size: 15px;
          line-height: 1.75;
          color: rgba(255,255,255,0.78);
          margin: 0;
        }
        .proto-paragraph-label {
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #AAFF00;
          margin-bottom: 10px;
          display: block;
        }
        .proto-section {
          padding: 22px;
          border-radius: 16px;
          border: 1px solid rgba(170,255,0,0.1);
          background: #111;
        }
        .proto-section + .proto-section { margin-top: 16px; }
        @media (min-width: 768px) {
          .proto-section { padding: 28px 32px; }
        }
        .proto-images-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 10px;
          margin-top: 24px;
        }
        @media (max-width: 600px) {
          .proto-images-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        .proto-dot-nav {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .proto-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(170,255,0,0.25);
          transition: all 0.3s;
          cursor: pointer;
        }
        .proto-dot.active {
          background: #AAFF00;
          width: 20px;
          border-radius: 3px;
        }
      `}</style>

      {/* Header */}
      <header className="proto-header">
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <img src="/Pombazlogo.webp" alt="POMBAZ" style={{ height: 32, width: 32, objectFit: "contain" }} />
            <span style={{ fontWeight: 900, fontSize: 18, letterSpacing: "-0.03em", color: "#fff" }}>POMBAZ</span>
          </a>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(170,255,0,0.7)" }}>
              {guide.title}
            </span>
          </div>
        </div>
        {/* Progress bar */}
        <div className="proto-progress-bar">
          <div className="proto-progress-fill" style={{ width: `${((currentPageIndex + 1) / totalPages) * 100}%` }} />
        </div>
      </header>

      {/* Content */}
      <main style={{ maxWidth: 860, margin: "0 auto", padding: "40px 24px 100px" }}>
        {page.type === "welcome" && <WelcomePage guide={guide} onStart={goNext} />}
        {page.type === "exercise" && page.exerciseIndex !== undefined && exercises[page.exerciseIndex] && (
          <ExercisePage
            exercise={exercises[page.exerciseIndex]}
            index={page.exerciseIndex}
            total={exercises.length}
          />
        )}
        {page.type === "conclusion" && <ConclusionPage guide={guide} />}
      </main>

      {/* Bottom navigation */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0,
        background: "rgba(10,10,10,0.96)",
        backdropFilter: "blur(16px)",
        borderTop: "1px solid rgba(170,255,0,0.1)",
        padding: "16px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        zIndex: 50,
      }}>
        <button
          className="proto-btn proto-btn-outline"
          onClick={goPrev}
          disabled={page.type === "welcome"}
        >
          <ChevronLeft size={16} />
          Anterior
        </button>

        {/* Dot nav */}
        <div className="proto-dot-nav" style={{ maxWidth: 200, overflowX: "auto" }}>
          {Array.from({ length: totalPages }).map((_, i) => (
            <div
              key={i}
              className={`proto-dot ${i === currentPageIndex ? "active" : ""}`}
              onClick={() => {
                if (i === 0) setPage({ type: "welcome" })
                else if (i === totalPages - 1) setPage({ type: "conclusion" })
                else setPage({ type: "exercise", exerciseIndex: i - 1 })
              }}
            />
          ))}
        </div>

        <button
          className="proto-btn"
          onClick={goNext}
          disabled={page.type === "conclusion"}
        >
          Próximo
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  )
}

function WelcomePage({ guide, onStart }: { guide: ProtocolGuide; onStart: () => void }) {
  return (
    <div>
      <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(170,255,0,0.08)", border: "1px solid rgba(170,255,0,0.2)", borderRadius: 999, padding: "6px 16px", marginBottom: 28 }}>
        <Dumbbell size={14} color="#AAFF00" />
        <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: "#AAFF00" }}>Protocolo de Treino</span>
      </div>

      <h1 style={{ fontSize: "clamp(36px,7vw,80px)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 0.95, marginBottom: 28 }}>
        {guide.title}
      </h1>

      <div style={{ width: 56, height: 3, background: "#AAFF00", marginBottom: 36, borderRadius: 2 }} />

      {guide.welcome_text && (
        <div style={{ whiteSpace: "pre-wrap", fontSize: 16, lineHeight: 1.8, color: "rgba(255,255,255,0.75)", marginBottom: 48, maxWidth: 680 }}>
          {guide.welcome_text}
        </div>
      )}

      <button className="proto-btn" onClick={onStart} style={{ fontSize: 14, padding: "16px 36px" }}>
        Iniciar Protocolo
        <ArrowRight size={18} />
      </button>
    </div>
  )
}

function ExercisePage({ exercise, index, total }: { exercise: ProtocolExercise; index: number; total: number }) {
  return (
    <div>
      {/* Exercise header */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
        <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(170,255,0,0.6)" }}>
          Exercício {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </div>

      <h1 style={{ fontSize: "clamp(28px,5vw,60px)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 0.95, marginBottom: 8 }}>
        {exercise.title}
      </h1>
      <div style={{ width: 40, height: 3, background: "#AAFF00", marginBottom: 32, borderRadius: 2 }} />

      {/* Paragraphs */}
      <div className="proto-section">
        <span className="proto-paragraph-label">📐 Anatomia & Estabilização</span>
        <p className="proto-paragraph">{exercise.paragraph_anatomy}</p>
      </div>

      <div className="proto-section">
        <span className="proto-paragraph-label">⚡ Técnica de Execução</span>
        <p className="proto-paragraph">{exercise.paragraph_technique}</p>
      </div>

      <div className="proto-section">
        <span className="proto-paragraph-label">🏋️ Séries & Repetições por Biotipo</span>
        <p className="proto-paragraph">{exercise.paragraph_sets}</p>
      </div>

      {/* Images grid */}
      {exercise.images && exercise.images.length > 0 && (
        <div>
          <div style={{ marginTop: 32, marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ flex: 1, height: 1, background: "rgba(170,255,0,0.12)" }} />
            <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(170,255,0,0.5)" }}>Execução Visual</span>
            <div style={{ flex: 1, height: 1, background: "rgba(170,255,0,0.12)" }} />
          </div>
          <div className="proto-images-grid">
            {exercise.images.map((img, i) => (
              <div key={i} className="proto-image-card">
                {img.url ? (
                  <img src={img.url} alt={img.caption || `Imagem ${i + 1}`} />
                ) : (
                  <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: "rgba(170,255,0,0.3)", textTransform: "uppercase", letterSpacing: "0.1em", textAlign: "center", padding: 8 }}>
                    Imagem {i + 1}
                  </div>
                )}
                {img.caption && <div className="proto-caption">{img.caption}</div>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function ConclusionPage({ guide }: { guide: ProtocolGuide }) {
  return (
    <div style={{ textAlign: "center", paddingTop: 40 }}>
      <div style={{ width: 72, height: 72, background: "rgba(170,255,0,0.1)", border: "1px solid rgba(170,255,0,0.3)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 28px" }}>
        <Trophy size={32} color="#AAFF00" />
      </div>

      <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(170,255,0,0.08)", border: "1px solid rgba(170,255,0,0.2)", borderRadius: 999, padding: "6px 16px", marginBottom: 24 }}>
        <Star size={12} color="#AAFF00" />
        <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: "#AAFF00" }}>Protocolo Completo</span>
      </div>

      <h1 style={{ fontSize: "clamp(32px,6vw,64px)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 0.95, marginBottom: 28 }}>
        {guide.title}
      </h1>

      <div style={{ width: 56, height: 3, background: "#AAFF00", margin: "0 auto 36px", borderRadius: 2 }} />

      {guide.conclusion_text && (
        <div style={{ whiteSpace: "pre-wrap", fontSize: 16, lineHeight: 1.85, color: "rgba(255,255,255,0.75)", maxWidth: 640, margin: "0 auto 48px", textAlign: "left" }}>
          {guide.conclusion_text}
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
        <a href="/" className="proto-btn proto-btn-outline" style={{ textDecoration: "none" }}>
          <ArrowLeft size={16} />
          Voltar ao início
        </a>
      </div>
    </div>
  )
}

function LoadingScreen() {
  return (
    <div style={{ minHeight: "100vh", background: "#0A0A0A", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ width: 48, height: 48, border: "2px solid rgba(170,255,0,0.2)", borderTop: "2px solid #AAFF00", borderRadius: "50%", margin: "0 auto 20px", animation: "spin 0.8s linear infinite" }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(170,255,0,0.6)" }}>Carregando protocolo</p>
      </div>
    </div>
  )
}

function ErrorScreen({ message }: { message: string }) {
  return (
    <div style={{ minHeight: "100vh", background: "#0A0A0A", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ textAlign: "center", maxWidth: 400 }}>
        <Dumbbell size={40} color="rgba(170,255,0,0.3)" style={{ margin: "0 auto 20px" }} />
        <h1 style={{ fontSize: 22, fontWeight: 900, color: "#fff", marginBottom: 12 }}>Protocolo não encontrado</h1>
        <p style={{ color: "rgba(255,255,255,0.5)", marginBottom: 32 }}>{message}</p>
        <a href="/" className="proto-btn" style={{ textDecoration: "none" }}>
          <ArrowLeft size={16} />
          Voltar ao início
        </a>
      </div>
    </div>
  )
}
