'use client';
import { useState, useRef, useCallback, useEffect } from 'react';
import { useGameStore } from '@/lib/store';
import styles from './CircleToSearch.module.css';

export default function CircleToSearch({ staticImgRef }) {
  const [isDrawing, setIsDrawing] = useState(false);
  const [pathPoints, setPathPoints] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [hintText, setHintText] = useState(null);
  const [hintPosition, setHintPosition] = useState(null);
  const [errorText, setErrorText] = useState(null);
  const [circleCenter, setCircleCenter] = useState(null);
  const [circleRadius, setCircleRadius] = useState(0);
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);
  const dashOffsetRef = useRef(0);

  const {
    circleSearchActive,
    setCircleSearchActive,
    circleSearchesUsed,
    incrementCircleSearch,
    addCircleSearchHint,
  } = useGameStore();

  // Compute bounding circle from path points
  const computeCircle = useCallback((points) => {
    if (points.length < 3) return null;
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const p of points) {
      if (p.x < minX) minX = p.x;
      if (p.y < minY) minY = p.y;
      if (p.x > maxX) maxX = p.x;
      if (p.y > maxY) maxY = p.y;
    }
    const cx = (minX + maxX) / 2;
    const cy = (minY + maxY) / 2;
    const rx = (maxX - minX) / 2;
    const ry = (maxY - minY) / 2;
    const r = Math.max(rx, ry, 30); // minimum radius
    return { cx, cy, r, minX, minY, maxX, maxY };
  }, []);

  // Animate the dashed circle stroke
  const animateCircle = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const circle = computeCircle(pathPoints);
    if (!circle) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Semi-transparent overlay outside the circle
    ctx.save();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(circle.cx, circle.cy, circle.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Animated dashed circle stroke
    dashOffsetRef.current -= 0.5;
    ctx.save();
    ctx.strokeStyle = '#60a5fa';
    ctx.lineWidth = 3;
    ctx.setLineDash([12, 6]);
    ctx.lineDashOffset = dashOffsetRef.current;
    ctx.shadowColor = '#3b82f6';
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.arc(circle.cx, circle.cy, circle.r, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    // Inner glow
    ctx.save();
    ctx.strokeStyle = 'rgba(96, 165, 250, 0.3)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(circle.cx, circle.cy, circle.r - 4, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    animFrameRef.current = requestAnimationFrame(animateCircle);
  }, [pathPoints, computeCircle]);

  // Start animation when confirm is shown
  useEffect(() => {
    if (showConfirm && pathPoints.length > 2) {
      animFrameRef.current = requestAnimationFrame(animateCircle);
    }
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [showConfirm, animateCircle, pathPoints]);

  // Resize canvas to match container
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !circleSearchActive) return;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [circleSearchActive]);

  // Clear state when deactivated
  useEffect(() => {
    if (!circleSearchActive) {
      setPathPoints([]);
      setShowConfirm(false);
      setHintText(null);
      setErrorText(null);
      setAnalyzing(false);
      setCircleCenter(null);
      setCircleRadius(0);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    }
  }, [circleSearchActive]);

  const handlePointerDown = useCallback((e) => {
    if (showConfirm || analyzing || hintText) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setIsDrawing(true);
    setPathPoints([{ x, y }]);
    setHintText(null);
    setErrorText(null);
  }, [showConfirm, analyzing, hintText]);

  const handlePointerMove = useCallback((e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setPathPoints((prev) => [...prev, { x, y }]);

    // Draw the live path
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const points = [...pathPoints, { x, y }];
    if (points.length < 2) return;

    ctx.save();
    ctx.strokeStyle = '#60a5fa';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.shadowColor = '#3b82f6';
    ctx.shadowBlur = 8;
    ctx.setLineDash([8, 4]);
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.stroke();
    ctx.restore();
  }, [isDrawing, pathPoints]);

  const handlePointerUp = useCallback(() => {
    if (!isDrawing) return;
    setIsDrawing(false);

    const circle = computeCircle(pathPoints);
    if (circle && circle.r > 20) {
      setCircleCenter({ x: circle.cx, y: circle.cy });
      setCircleRadius(circle.r);
      setShowConfirm(true);
    } else {
      // Circle too small, clear
      const ctx = canvasRef.current?.getContext('2d');
      if (ctx) ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      setPathPoints([]);
    }
  }, [isDrawing, pathPoints, computeCircle]);

  const handleDismiss = useCallback(() => {
    setShowConfirm(false);
    setPathPoints([]);
    setCircleCenter(null);
    setCircleRadius(0);
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  }, []);

  const handleAnalyze = useCallback(async () => {
    if (!staticImgRef?.current || !circleCenter) return;

    setAnalyzing(true);
    setShowConfirm(false);
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);

    try {
      const img = staticImgRef.current;
      const canvas = canvasRef.current;
      const circle = computeCircle(pathPoints);
      if (!circle) throw new Error('Invalid circle');

      // Create offscreen canvas for cropping
      const offscreen = document.createElement('canvas');
      const cropSize = Math.ceil(circle.r * 2);
      offscreen.width = cropSize;
      offscreen.height = cropSize;
      const offCtx = offscreen.getContext('2d');

      // Map canvas coordinates to image coordinates
      const scaleX = img.naturalWidth / canvas.offsetWidth;
      const scaleY = img.naturalHeight / canvas.offsetHeight;
      const imgCx = circle.cx * scaleX;
      const imgCy = circle.cy * scaleY;
      const imgR = circle.r * Math.max(scaleX, scaleY);

      // Clip to circle and draw
      offCtx.beginPath();
      offCtx.arc(cropSize / 2, cropSize / 2, cropSize / 2, 0, Math.PI * 2);
      offCtx.clip();
      offCtx.drawImage(
        img,
        imgCx - imgR, imgCy - imgR, imgR * 2, imgR * 2,
        0, 0, cropSize, cropSize
      );

      const imageBase64 = offscreen.toDataURL('image/jpeg', 0.8);

      // Show loading on canvas
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(circle.cx, circle.cy, circle.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Pulsing ring while loading
      let pulseFrame;
      let pulseTime = 0;
      const animatePulse = () => {
        pulseTime += 0.03;
        const pulseR = circle.r + Math.sin(pulseTime) * 6;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(circle.cx, circle.cy, circle.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        ctx.save();
        ctx.strokeStyle = `rgba(96, 165, 250, ${0.5 + Math.sin(pulseTime) * 0.3})`;
        ctx.lineWidth = 3;
        ctx.shadowColor = '#3b82f6';
        ctx.shadowBlur = 16;
        ctx.beginPath();
        ctx.arc(circle.cx, circle.cy, pulseR, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
        pulseFrame = requestAnimationFrame(animatePulse);
      };
      pulseFrame = requestAnimationFrame(animatePulse);

      // Call the AI API
      const res = await fetch('/api/circle-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64 }),
      });

      cancelAnimationFrame(pulseFrame);

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Analysis failed');
      }

      // Clear canvas and show hint
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      setHintText(data.hint);
      setHintPosition({ x: circle.cx, y: circle.cy });
      incrementCircleSearch();
      addCircleSearchHint({ position: { x: circle.cx, y: circle.cy }, text: data.hint });
    } catch (err) {
      console.error('Circle search analysis failed:', err);
      setErrorText(err.message || 'Failed to analyze. Try again.');
      const ctx = canvasRef.current?.getContext('2d');
      if (ctx) ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    } finally {
      setAnalyzing(false);
    }
  }, [staticImgRef, circleCenter, pathPoints, computeCircle, incrementCircleSearch, addCircleSearchHint]);

  const handleClose = useCallback(() => {
    setCircleSearchActive(false);
  }, [setCircleSearchActive]);

  const handleDismissHint = useCallback(() => {
    setHintText(null);
    setHintPosition(null);
    setErrorText(null);
    setPathPoints([]);
    setCircleCenter(null);
    setCircleRadius(0);
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    // If used all searches, auto-close
    if (circleSearchesUsed >= 1) {
      // They just used one, so now it's at circleSearchesUsed (already incremented)
      // Check if we should close (will be checked by the remaining count display)
    }
  }, [circleSearchesUsed]);

  if (!circleSearchActive) return null;

  const remainingSearches = 2 - circleSearchesUsed;

  return (
    <div className={styles.overlay}>
      {/* Drawing canvas */}
      <canvas
        ref={canvasRef}
        className={styles.canvas}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        style={{ touchAction: 'none' }}
      />

      {/* Top bar with instructions and close */}
      <div className={styles.topBar}>
        <div className={styles.instructionBadge}>
          <span className={styles.instructionIcon}>⭕</span>
          <span>
            {hintText
              ? 'Tap anywhere to dismiss'
              : analyzing
              ? 'Analyzing...'
              : 'Draw a circle around a clue'}
          </span>
        </div>
        <div className={styles.topBarRight}>
          <span className={styles.remainingBadge}>
            {remainingSearches}/{2} left
          </span>
          <button className={styles.closeBtn} onClick={handleClose} aria-label="Exit Circle Search">
            ✕
          </button>
        </div>
      </div>

      {/* Confirm/cancel buttons near the circle */}
      {showConfirm && circleCenter && (
        <div
          className={styles.confirmGroup}
          style={{
            left: `${Math.min(Math.max(circleCenter.x, 100), window.innerWidth - 100)}px`,
            top: `${Math.min(circleCenter.y + circleRadius + 16, window.innerHeight - 60)}px`,
          }}
        >
          <button className={styles.analyzeBtn} onClick={handleAnalyze} disabled={remainingSearches <= 0}>
            <span>🔍</span> Analyze
          </button>
          <button className={styles.cancelBtn} onClick={handleDismiss}>
            ✕
          </button>
        </div>
      )}

      {/* Hint bubble */}
      {hintText && hintPosition && (
        <div
          className={styles.hintBubble}
          onClick={handleDismissHint}
        >
          <div className={styles.hintHeader}>
            <span className={styles.hintIcon}>🔍</span>
            <span className={styles.hintTitle}>Circle Search Hint</span>
          </div>
          <p className={styles.hintContent}>{hintText}</p>
          <span className={styles.hintDismiss}>Tap to dismiss</span>
        </div>
      )}

      {/* Error message */}
      {errorText && (
        <div className={styles.errorBubble} onClick={handleDismissHint}>
          <p>⚠️ {errorText}</p>
          <span className={styles.hintDismiss}>Tap to dismiss</span>
        </div>
      )}
    </div>
  );
}
