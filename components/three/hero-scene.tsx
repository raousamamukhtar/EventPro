"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export function Hero3DScene() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100)
    camera.position.z = 4.5

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    const ambient = new THREE.AmbientLight(0xffffff, 0.4)
    scene.add(ambient)

    const directional = new THREE.DirectionalLight(0xffffff, 1.2)
    directional.position.set(5, 5, 5)
    scene.add(directional)

    const pinkLight = new THREE.PointLight(0xec4899, 0.8)
    pinkLight.position.set(-4, -2, -3)
    scene.add(pinkLight)

    const blueLight = new THREE.PointLight(0x6366f1, 0.6)
    blueLight.position.set(4, 2, 2)
    scene.add(blueLight)

    const group = new THREE.Group()
    scene.add(group)

    const knot = new THREE.Mesh(
      new THREE.TorusKnotGeometry(0.85, 0.28, 200, 32),
      new THREE.MeshStandardMaterial({
        color: 0x6366f1,
        emissive: 0x4338ca,
        emissiveIntensity: 0.35,
        metalness: 0.85,
        roughness: 0.15,
      })
    )
    group.add(knot)

    const ringMaterial = (color: number, emissive: number, opacity: number) =>
      new THREE.MeshStandardMaterial({
        color,
        emissive,
        emissiveIntensity: 0.4,
        transparent: true,
        opacity,
        side: THREE.DoubleSide,
      })

    const ring1 = new THREE.Mesh(new THREE.RingGeometry(1.45, 1.5, 64), ringMaterial(0xa855f7, 0x7c3aed, 0.6))
    ring1.rotation.x = Math.PI / 2.2
    group.add(ring1)

    const ring2 = new THREE.Mesh(new THREE.RingGeometry(1.75, 1.78, 64), ringMaterial(0xec4899, 0xdb2777, 0.45))
    ring2.rotation.x = Math.PI / 3
    ring2.rotation.y = 0.4
    group.add(ring2)

    const sphereColors = [0x3b82f6, 0x8b5cf6, 0xec4899, 0x06b6d4]
    const spheres = sphereColors.map((color, index) => {
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.1, 32, 32),
        new THREE.MeshStandardMaterial({
          color,
          emissive: color,
          emissiveIntensity: 0.6,
          metalness: 0.9,
          roughness: 0.1,
        })
      )
      group.add(mesh)
      return { mesh, index }
    })

    const starCount = 1200
    const starPositions = new Float32Array(starCount * 3)
    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3
      starPositions[i3] = (Math.random() - 0.5) * 80
      starPositions[i3 + 1] = (Math.random() - 0.5) * 80
      starPositions[i3 + 2] = (Math.random() - 0.5) * 80
    }
    const stars = new THREE.Points(
      new THREE.BufferGeometry().setAttribute("position", new THREE.BufferAttribute(starPositions, 3)),
      new THREE.PointsMaterial({ color: 0xffffff, size: 0.05, transparent: true, opacity: 0.7 })
    )
    scene.add(stars)

    let pointerX = 0
    let pointerY = 0
    const onPointerMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect()
      pointerX = ((event.clientX - rect.left) / rect.width - 0.5) * 0.4
      pointerY = ((event.clientY - rect.top) / rect.height - 0.5) * 0.4
    }
    container.addEventListener("pointermove", onPointerMove)

    const resize = () => {
      const { width, height } = container.getBoundingClientRect()
      if (width === 0 || height === 0) return
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height, false)
    }

    resize()
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(container)

    let frameId = 0
    const animate = (time: number) => {
      frameId = requestAnimationFrame(animate)
      const t = time * 0.001

      group.rotation.y = t * 0.15 + pointerX
      group.rotation.x = pointerY * 0.5
      knot.rotation.x = t * 0.25
      knot.rotation.z = t * 0.1

      spheres.forEach(({ mesh, index }) => {
        const speed = 0.6 + index * 0.15
        const radius = 1.9 + index * 0.15
        const offset = (index / 4) * Math.PI * 2
        const angle = t * speed + offset
        mesh.position.x = Math.cos(angle) * radius
        mesh.position.z = Math.sin(angle) * radius
        mesh.position.y = Math.sin(angle * 1.5) * 0.35
      })

      stars.rotation.y = t * 0.02
      renderer.render(scene, camera)
    }

    frameId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(frameId)
      resizeObserver.disconnect()
      container.removeEventListener("pointermove", onPointerMove)
      container.removeChild(renderer.domElement)
      knot.geometry.dispose()
      ;(knot.material as THREE.Material).dispose()
      ring1.geometry.dispose()
      ;(ring1.material as THREE.Material).dispose()
      ring2.geometry.dispose()
      ;(ring2.material as THREE.Material).dispose()
      spheres.forEach(({ mesh }) => {
        mesh.geometry.dispose()
        ;(mesh.material as THREE.Material).dispose()
      })
      stars.geometry.dispose()
      ;(stars.material as THREE.Material).dispose()
      renderer.dispose()
    }
  }, [])

  return <div ref={containerRef} className="absolute inset-0" aria-hidden="true" />
}
