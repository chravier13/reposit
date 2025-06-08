"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"

const AnimatedDollarSigns = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = 487
    canvas.height = 650

    // Define the confined area for animations
    const boundaryArea = {
      x: 0,
      y: 0,
      width: 487,
      height: 650,
    }

    const drawSparkle = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, opacity: number) => {
      ctx.fillStyle = `rgba(255, 189, 89, ${opacity})`
      ctx.beginPath()

      // Main diamond
      ctx.moveTo(x, y - size) // Top point
      ctx.lineTo(x + size, y) // Right point
      ctx.lineTo(x, y + size) // Bottom point
      ctx.lineTo(x - size, y) // Left point
      ctx.closePath()
      ctx.fill()

      // Smaller diagonal diamond
      const smallerSize = size * 0.7
      ctx.beginPath()
      ctx.moveTo(x - smallerSize, y) // Left point
      ctx.lineTo(x, y - smallerSize) // Top point
      ctx.lineTo(x + smallerSize, y) // Right point
      ctx.lineTo(x, y + smallerSize) // Bottom point
      ctx.closePath()
      ctx.fill()
    }

    const animations = [
      // Dollar signs - positioned in lower half of boundary
      ...Array(2)
        .fill(null)
        .map(() => ({
          type: "dollar",
          x: boundaryArea.x + Math.random() * boundaryArea.width,
          y: boundaryArea.y + boundaryArea.height * 0.5 + Math.random() * (boundaryArea.height * 0.5),
          initialY: 0,
          size: Math.random() * 37.5 + 25,
          opacity: Math.random(),
          fadeSpeed: (Math.random() * 0.05 + 0.02) * 0.2,
          ySpeed: -0.15,
        })),
      // AOV+ text - positioned in upper half of boundary
      ...Array(2)
        .fill(null)
        .map(() => ({
          type: "aov",
          x: boundaryArea.x + Math.random() * boundaryArea.width,
          y: boundaryArea.y + Math.random() * (boundaryArea.height * 0.5),
          initialY: 0,
          size: Math.random() * 25 + 15,
          opacity: Math.random(),
          fadeSpeed: (Math.random() * 0.05 + 0.02) * 0.2,
          ySpeed: -0.15,
        })),
      // Sparkles with varying sizes
      ...Array(4)
        .fill(null)
        .map(() => ({
          type: "sparkle",
          x: boundaryArea.x + Math.random() * boundaryArea.width,
          y: boundaryArea.y + Math.random() * (boundaryArea.height * 0.3), // Adjusted to top third
          initialY: 0,
          size: Math.random() * 6 + 3,
          opacity: Math.random(),
          fadeSpeed: (Math.random() * 0.05 + 0.02) * 0.2,
          ySpeed: -0.1,
        })),
    ]

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      animations.forEach((item) => {
        if (item.initialY === 0) {
          item.initialY = item.y
        }

        if (item.type === "dollar") {
          ctx.font = `bold ${item.size}px Arial`
          ctx.fillStyle = `rgba(0, 180, 0, ${item.opacity})`
          ctx.fillText("$", item.x, item.y)
        } else if (item.type === "aov") {
          ctx.font = `bold ${item.size}px Arial`
          ctx.fillStyle = `rgba(0, 180, 0, ${item.opacity})`
          ctx.fillText("AOV+", item.x, item.y)
        } else if (item.type === "sparkle") {
          drawSparkle(ctx, item.x, item.y, item.size, item.opacity)
        }

        // Add upward movement when visible
        if (item.opacity > 0.3) {
          item.y += item.ySpeed
        }

        item.opacity += item.fadeSpeed
        if (item.opacity > 1 || item.opacity < 0) {
          item.fadeSpeed = -item.fadeSpeed

          // Reset position when fully faded out
          if (item.opacity <= 0) {
            item.x = boundaryArea.x + Math.random() * boundaryArea.width
            item.y =
              item.type === "sparkle"
                ? boundaryArea.y + Math.random() * (boundaryArea.height * 0.3) // Adjusted for sparkles
                : item.type === "aov"
                  ? boundaryArea.y + Math.random() * (boundaryArea.height * 0.5)
                  : boundaryArea.y + boundaryArea.height * 0.5 + Math.random() * (boundaryArea.height * 0.5)
            item.initialY = 0
          }
        }
      })
      requestAnimationFrame(animate)
    }

    animate()
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-20" />
}

export function HouseWins() {
  return (
    <section className="py-16 bg-white">
      <div className="w-full px-6 md:px-12 lg:px-16 xl:px-20">
        <div className="flex flex-col md:flex-row items-center gap-16 md:gap-20 lg:gap-24 xl:gap-32">
          <div className="w-full md:w-1/2 flex justify-center md:justify-end">
            <div className="relative w-[487px] h-[650px] md:translate-y-[50px]">
              <AnimatedDollarSigns />
              <Image
                src="/images/gatcha-machine-new.png"
                alt="Gatcha machine illustration"
                width={487}
                height={650}
                className="rounded-[5px] relative z-10"
                priority
              />
            </div>
          </div>
          <div className="w-full md:w-1/2 flex flex-col justify-center md:self-start md:pt-[100px]">
            <div className="w-3/4 space-y-8">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                The House
                <br />
                Always Wins
              </h2>
              <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed">
                Gatcha gives you what you need to turn your storefront into a money printer!
              </p>
              <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed">
                Choose what items you want in the Gatcha system and set the probability of your choice! Be in control of
                your own game, play the house, and win every single time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
