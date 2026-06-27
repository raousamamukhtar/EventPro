"use client"

export function Floating3DShapes() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      <div className="shape-3d-cube shape-3d-cube-1" />
      <div className="shape-3d-cube shape-3d-cube-2" />
      <div className="shape-3d-ring shape-3d-ring-1" />
      <div className="shape-3d-ring shape-3d-ring-2" />
      <div className="shape-3d-pyramid shape-3d-pyramid-1" />
    </div>
  )
}
