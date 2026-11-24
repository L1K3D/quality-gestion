import React, { useState, useEffect, useCallback } from 'react';
import { SlideId, QueueExam } from './types/aurora';
import { INITIAL_QUEUE_EXAMS } from './data/mockQueue';
import { TopBar } from './components/TopBar';
import { Sidebar } from './components/Sidebar';
import { ReplicaModal, QrPlateiaModal } from './components/StageModals';
import { GlossaryDrawer } from './components/GlossaryDrawer';
import { ProposalModal } from './components/ProposalModal';
import { Slide1Crise } from './slides/Slide1Crise';
import { Slide2Fluxograma } from './slides/Slide2Fluxograma';
import { Slide3Paretos } from './slides/Slide3Paretos';
import { Slide4CausaRaiz } from './slides/Slide4CausaRaiz';
import { Slide5RiscoPlano } from './slides/Slide5RiscoPlano';
import { Slide6Solucao } from './slides/Slide6Solucao';

function getInitialSlide(): SlideId {
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    const s = Number(params.get('slide'));
    if (s >= 1 && s <= 6) return s as SlideId;
  }
  return 1;
}

export function App() {
  const [currentSlide, setCurrentSlide] = useState<SlideId>(getInitialSlide);
  const [stageMode, setStageMode] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(600); // 10:00
  const [timerRunning, setTimerRunning] = useState(false);
  const [replicaOpen, setReplicaOpen] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);
  const [glossaryOpen, setGlossaryOpen] = useState(false);
  const [glossaryTab, setGlossaryTab] = useState<'contexto' | 'glossario'>('contexto');
  const [highlightTermId, setHighlightTermId] = useState<string | null>(null);
  const [proposalOpen, setProposalOpen] = useState(false);

  const [queueExams, setQueueExams] = useState<QueueExam[]>(INITIAL_QUEUE_EXAMS);

  useEffect(() => {
    if (!timerRunning || secondsLeft <= 0) return;
    const id = window.setInterval(() => {
      setSecondsLeft((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => window.clearInterval(id);
  }, [timerRunning, secondsLeft]);

  const handleToggleStageMode = useCallback(() => {
    setStageMode((prev) => {
      const next = !prev;
      if (next && document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(() => {});
      } else if (!next && document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
      return next;
    });
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isInput =
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable);

      if (e.key === 'F11') {
        e.preventDefault();
        handleToggleStageMode();
        return;
      }

      if (e.key === 'Escape') {
        setReplicaOpen(false);
        setQrOpen(false);
        setGlossaryOpen(false);
        setProposalOpen(false);
        return;
      }

      if (isInput) return;

      if (e.key === 'ArrowRight') {
        setCurrentSlide((prev) => (prev < 6 ? ((prev + 1) as SlideId) : prev));
      } else if (e.key === 'ArrowLeft') {
        setCurrentSlide((prev) => (prev > 1 ? ((prev - 1) as SlideId) : prev));
      } else if (e.key === 'r' || e.key === 'R') {
        setReplicaOpen((prev) => !prev);
      } else if (e.key === 'g' || e.key === 'G') {
        setGlossaryOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleToggleStageMode]);

  const handleInjectExam = (newExam: QueueExam) => {
    setQueueExams((prev) => {
      const filtered = prev.filter((ex) => ex.id !== newExam.id);
      return [newExam, ...filtered];
    });
  };

  const handleReleaseExam = (examId: string) => {
    setQueueExams((prev) =>
      prev.map((ex) => (ex.id === examId ? { ...ex, status: 'laudado' } : ex))
    );
  };

  const handleResetDemo = () => {
    setQueueExams(INITIAL_QUEUE_EXAMS);
  };

  const openContext = () => {
    setGlossaryTab('contexto');
    setHighlightTermId(null);
    setGlossaryOpen(true);
  };

  const explainTerm = (termId: string) => {
    setGlossaryTab('glossario');
    setHighlightTermId(termId);
    setGlossaryOpen(true);
  };

  const renderSlide = () => {
    switch (currentSlide) {
      case 1:
        return <Slide1Crise onOpenContext={openContext} />;
      case 2:
        return <Slide2Fluxograma onExplainTerm={explainTerm} />;
      case 3:
        return <Slide3Paretos onExplainTerm={explainTerm} />;
      case 4:
        return <Slide4CausaRaiz onExplainTerm={explainTerm} />;
      case 5:
        return <Slide5RiscoPlano onExplainTerm={explainTerm} />;
      case 6:
        return (
          <Slide6Solucao
            exams={queueExams}
            onInjectExam={handleInjectExam}
            onReleaseExam={handleReleaseExam}
            onResetDemo={handleResetDemo}
            onOpenReplica={() => setReplicaOpen(true)}
            onOpenQr={() => setQrOpen(true)}
            onExplainTerm={explainTerm}
          />
        );
    }
  };

  return (
    <div className={`min-h-screen flex flex-col bg-[#F8FAFC] ${stageMode ? 'stage-mode' : ''}`}>
      <TopBar
        currentSlide={currentSlide}
        onSelectSlide={setCurrentSlide}
        stageMode={stageMode}
        onToggleStageMode={handleToggleStageMode}
        secondsLeft={secondsLeft}
        timerRunning={timerRunning}
        onToggleTimer={() => setTimerRunning((r) => !r)}
        onResetTimer={() => {
          setTimerRunning(false);
          setSecondsLeft(600);
        }}
        onOpenGlossary={openContext}
        onOpenProposal={() => setProposalOpen(true)}
      />

      <div className="flex flex-1 min-h-0">
        {!stageMode && (
          <Sidebar currentSlide={currentSlide} onSelectSlide={setCurrentSlide} />
        )}

        <main className="flex-1 overflow-y-auto p-6 sm:p-8">
          <div className="mx-auto max-w-6xl">{renderSlide()}</div>
        </main>
      </div>

      <ReplicaModal open={replicaOpen} onClose={() => setReplicaOpen(false)} />
      <QrPlateiaModal open={qrOpen} onClose={() => setQrOpen(false)} />
      <GlossaryDrawer
        open={glossaryOpen}
        initialTab={glossaryTab}
        highlightTermId={highlightTermId}
        onClose={() => setGlossaryOpen(false)}
      />
      <ProposalModal open={proposalOpen} onClose={() => setProposalOpen(false)} />
    </div>
  );
}

export default App;
