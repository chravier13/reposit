"use client"

import { ArrowLeft, Play, X, Copy, Check } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Label } from "@/components/ui/label"
import { useState, useEffect } from "react"
import { PrizeShowcase } from "@/components/prize-showcase"

export default function PlayPage() {
  const [selectedCredits, setSelectedCredits] = useState(1)
  const [showRedemptionModal, setShowRedemptionModal] = useState(false)
  const [showHistoryModal, setShowHistoryModal] = useState(false)
  const [showWinModal, setShowWinModal] = useState(false)
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const [currentPrize, setCurrentPrize] = useState(0)
  const [isSpinning, setIsSpinning] = useState(false)
  const [finalPrize, setFinalPrize] = useState(null)
  const [showConfetti, setShowConfetti] = useState(false)
  const [tokenCount, setTokenCount] = useState(2)

  const prices = {
    1: 5,
    5: 20,
    20: 80,
  }

  const afterpayAmounts = {
    1: "1",
    5: "5",
    20: "20",
  }

  // Sample history data
  const historyData = [
    {
      code: "GATCHA3D14F55K",
      prize: "The Videographer Snowboard",
      redeemed: false,
    },
    {
      code: "GATCHA3D14C36F",
      prize: "Eris Motion Sticker",
      redeemed: false,
    },
    {
      code: "GATCHA7A7D0A08",
      prize: "Guts Motion Sticker",
      redeemed: true,
    },
  ]

  // Prize pool for spinning
  const prizePool = [
    {
      name: "iPhone 16 Pro",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-8LN71cOUMu2WVMkSbaJKNM2S6p6Z9s.png",
      tier: "RARE",
      tierColor: "text-purple-600",
    },
    {
      name: "PlayStation 5",
      image: "/images/playstation-5.png",
      tier: "EPIC",
      tierColor: "text-blue-600",
    },
    {
      name: "The Videographer Snowboard",
      image: "/placeholder.svg?height=200&width=200&text=Snowboard",
      tier: "RARE",
      tierColor: "text-purple-600",
    },
    {
      name: "Bomber Jacket",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-HO62L72Pu5MoD8JUd1NqN17u5HGWdQ.png",
      tier: "UNCOMMON",
      tierColor: "text-green-600",
    },
    {
      name: "Bissell Vacuum",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Zp2ezGufTcy3fGXDjgXxWrg1CRLPR6.png",
      tier: "RARE",
      tierColor: "text-purple-600",
    },
    {
      name: "Gaming Headset",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Oj9nvFKdtS6stlnOqhyaKV8zNMR0ZX.png",
      tier: "UNCOMMON",
      tierColor: "text-green-600",
    },
    {
      name: "Gift Vouchers",
      image: "/images/gift-vouchers.png",
      tier: "COMMON",
      tierColor: "text-gray-600",
    },
    {
      name: "Rolex Day-Date",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ORdEJP3OsgL6frUFSdsGZDVZ2h3jmR.png",
      tier: "LEGENDARY",
      tierColor: "text-amber-500",
    },
    {
      name: "Nike Air Max",
      image: "/images/nike-air-max.png",
      tier: "UNCOMMON",
      tierColor: "text-green-600",
    },
    {
      name: "AirPods Pro",
      image: "/images/airpods-pro.png",
      tier: "RARE",
      tierColor: "text-purple-600",
    },
  ]

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const handlePlayNow = () => {
    if (tokenCount <= 0) return

    setTokenCount((prev) => prev - 1)
    setShowWinModal(true)
    setIsSpinning(true)
    setCurrentPrize(0)

    // Spin through prizes for 3 seconds
    const spinInterval = setInterval(() => {
      setCurrentPrize((prev) => (prev + 1) % prizePool.length)
    }, 100)

    setTimeout(() => {
      clearInterval(spinInterval)
      const randomPrize = prizePool[Math.floor(Math.random() * prizePool.length)]
      setFinalPrize(randomPrize)
      setIsSpinning(false)

      // Show confetti
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 2000)
    }, 3000)
  }

  const handleBuyTokens = () => {
    setTokenCount((prev) => prev + selectedCredits)
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <Navigation className="bg-transparent pb-2" />
      <div className="h-[1px] bg-gray-200" />

      {showConfetti && <ConfettiEffect />}

      <main className="relative pt-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <Link href="/" className="inline-flex items-center text-black/90 hover:text-black transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Link>
          </div>

          <div
            className="bg-white rounded-3xl p-8 md:p-12 max-w-5xl mx-auto"
            style={{ boxShadow: "0 0 30px rgba(0, 0, 0, 0.1), 0 0 60px rgba(0, 0, 0, 0.05)" }}
          >
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left Column - Gatcha Machine */}
              <div className="flex justify-center">
                <div className="relative w-[240px] h-[320px] md:w-[280px] md:h-[360px]">
                  <Image
                    src="/images/gatcha-machine-updated.png"
                    alt="Gatcha Machine"
                    fill
                    className="object-contain animate-shake"
                    priority
                  />
                </div>
              </div>

              {/* Right Column - Content */}
              <div className="flex flex-col items-center gap-6">
                <div className="text-center">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">FEELING LUCKY?</h2>
                  <p className="text-black/80 text-sm leading-relaxed max-w-md">
                    Use tokens to play and win exciting prizes from your favorite brands. Every play gives you a chance
                    to win premium products, exclusive items, or special discounts.
                  </p>
                </div>

                <div className="flex items-center gap-2 text-lg text-black">
                  <span className="font-bold">Your Tokens:</span>
                  <div className="flex items-center gap-1">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20design%20-%202025-01-23T170658.103-vhdUsdU836nP4hyTS6w9ddOI1VrRJW.png"
                      alt="Token Icon"
                      width={24}
                      height={24}
                      className="opacity-80"
                    />
                    <span className="font-mono">{tokenCount}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-3 w-full max-w-[336px]">
                  <Button
                    onClick={handlePlayNow}
                    size="lg"
                    disabled={tokenCount <= 0}
                    className={`w-full border-2 border-black rounded-lg py-6 text-lg font-medium shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150 ${
                      tokenCount <= 0
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0 hover:translate-y-0"
                        : "bg-gradient-to-r from-[#b38327] via-[#ffbd59] to-[#ffd699] hover:from-[#a37216] hover:via-[#eead48] hover:to-[#eec588] text-black"
                    }`}
                  >
                    {tokenCount <= 0 ? "Need Tokens" : "Play Now"}
                  </Button>
                  <Button
                    onClick={() => setShowHistoryModal(true)}
                    size="lg"
                    variant="outline"
                    className="w-full border-2 border-black bg-white text-black hover:bg-gray-50 rounded-lg py-6 text-lg font-medium shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150"
                  >
                    My History
                  </Button>
                  <div className="text-center mt-2">
                    <button
                      onClick={() => setShowRedemptionModal(true)}
                      className="text-sm underline cursor-pointer hover:text-gray-600 transition-colors"
                    >
                      Redemption Instructions
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full max-w-6xl mx-auto mt-10">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-[#b38327] via-[#ffbd59] to-[#ffd699] text-transparent bg-clip-text">
              How Gatcha Works
            </h2>
            <div className="bg-black rounded-3xl p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center text-center">
                  <div className="w-32 h-32 mb-6 relative">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20design%20-%202025-01-23T170658.103-vhdUsdU836nP4hyTS6w9ddOI1VrRJW.png"
                      alt="Token"
                      fill
                      className="object-contain animate-spin-slow"
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white">1. Buy Tokens</h3>
                  <p className="text-gray-400">Get your tokens ready for a chance to win amazing prizes</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-32 h-32 mb-6 relative flex items-center justify-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-[#b38327] via-[#ffbd59] to-[#ffd699] rounded-full flex items-center justify-center shadow-lg">
                      <Play className="w-8 h-8 text-black ml-1" fill="currentColor" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white">2. Play Gatcha</h3>
                  <p className="text-gray-400">Use your tokens to play and test your luck</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-32 h-32 mb-6 relative flex items-center justify-center">
                    <span className="text-8xl animate-bounce-gentle relative sparkle-effect">🎁</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white">3. Win Prizes</h3>
                  <p className="text-gray-400">Instantly receive your winning prize or discount</p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full max-w-6xl mx-auto mt-24">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-[#b38327] via-[#ffbd59] to-[#ffd699] text-transparent bg-clip-text">
              Need Tokens?
            </h2>

            <div className="grid md:grid-cols-2 gap-16 items-start">
              <div className="relative aspect-square bg-gray-100 rounded-2xl overflow-hidden border border-gray-200">
                <div className="absolute inset-0 flex items-center justify-center px-8">
                  <div className="relative w-full h-full">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20design%20-%202025-01-23T170658.103-vhdUsdU836nP4hyTS6w9ddOI1VrRJW.png"
                      alt="Gatcha Token"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-8 text-center h-full flex flex-col justify-between py-4">
                <div>
                  <h3 className="text-5xl font-bold mb-4">Gatcha Token</h3>
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex items-center gap-2">
                      <div className="relative w-3 h-3">
                        <div className="absolute inset-0 rounded-full bg-green-500 animate-pulse scale-75" />
                        <div className="absolute inset-0 rounded-full bg-green-500 opacity-50 animate-ping scale-75" />
                      </div>
                      <span className="text-sm">Instant Delivery</span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-xl font-bold">${prices[selectedCredits]}</span>
                      <div className="flex items-center justify-center gap-1 text-sm">
                        <span>or 4 interest-free payments of ${afterpayAmounts[selectedCredits]} with</span>
                        <Image
                          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screen%20Shot%202025-01-23%20at%206.01.20%20PM-3QeHjZhZzqVCrFX7JNL6KYD0slSxoQ.png"
                          alt="Afterpay"
                          width={85}
                          height={23}
                          className="inline-block"
                        />
                        <button
                          className="text-gray-500 hover:text-gray-700"
                          aria-label="More information about Afterpay"
                        >
                          ⓘ
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-base text-gray-600">
                  Unlock the excitement of Gatcha with these tokens! Tokens grant you access to our thrilling Gatcha
                  minigame, where you can win various exciting prizes at random.
                </p>

                <div className="space-y-3">
                  <Label className="text-sm font-medium">Select Your Package</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <Button
                      variant="outline"
                      className={`h-auto py-3 px-4 transition-colors ${
                        selectedCredits === 1
                          ? "bg-[#ffbd59]/10 border-[#ffbd59]"
                          : "hover:bg-[#ffbd59]/10 hover:border-[#ffbd59]"
                      }`}
                      onClick={() => setSelectedCredits(1)}
                    >
                      1 Credit
                    </Button>
                    <Button
                      variant="outline"
                      className={`h-auto py-3 px-4 transition-colors ${
                        selectedCredits === 5
                          ? "bg-[#ffbd59]/10 border-[#ffbd59]"
                          : "hover:bg-[#ffbd59]/10 hover:border-[#ffbd59]"
                      }`}
                      onClick={() => setSelectedCredits(5)}
                    >
                      5 Credits
                    </Button>
                    <Button
                      variant="outline"
                      className={`h-auto py-3 px-4 transition-colors ${
                        selectedCredits === 20
                          ? "bg-[#ffbd59]/10 border-[#ffbd59]"
                          : "hover:bg-[#ffbd59]/10 hover:border-[#ffbd59]"
                      }`}
                      onClick={() => setSelectedCredits(20)}
                    >
                      20 Credits
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full border-2 py-6 text-lg font-semibold rounded-full hover:bg-black/5"
                  >
                    Add to Cart
                  </Button>
                  <Button
                    onClick={handleBuyTokens}
                    size="lg"
                    className="w-full bg-gradient-to-r from-[#b38327] via-[#ffbd59] to-[#ffd699] hover:from-[#a37216] hover:via-[#eead48] hover:to-[#eec588] text-black rounded-full py-6 text-lg font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                  >
                    Buy it Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <PrizeShowcase />
        </div>
      </main>

      {/* Win Modal */}
      {showWinModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 relative border-4 border-[#ffbd59]">
            <div className="text-center">
              {!isSpinning && finalPrize && <h2 className="text-2xl font-bold text-black mb-6">🎉 You Won! 🎉</h2>}

              <div className="mb-6">
                {isSpinning ? (
                  <div className="space-y-4">
                    <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
                      <Image
                        src={prizePool[currentPrize].image || "/placeholder.svg"}
                        alt={prizePool[currentPrize].name}
                        width={150}
                        height={150}
                        className="object-contain"
                      />
                    </div>
                    <div className="text-lg font-semibold">{prizePool[currentPrize].name}</div>
                    <div className={`text-sm font-bold ${prizePool[currentPrize].tierColor}`}>
                      {prizePool[currentPrize].tier}
                    </div>
                  </div>
                ) : finalPrize ? (
                  <div className="space-y-4">
                    <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
                      <Image
                        src={finalPrize.image || "/placeholder.svg"}
                        alt={finalPrize.name}
                        width={150}
                        height={150}
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Prize:</div>
                      <div className="text-lg font-semibold mb-2">{finalPrize.name}</div>
                      <div className="text-sm text-gray-600 mb-1">Tier:</div>
                      <div className={`text-lg font-bold ${finalPrize.tierColor}`}>{finalPrize.tier}</div>
                    </div>
                  </div>
                ) : null}
              </div>

              {!isSpinning && (
                <Button
                  onClick={() => {
                    setShowWinModal(false)
                    setFinalPrize(null)
                  }}
                  className="bg-gradient-to-r from-[#b38327] via-[#ffbd59] to-[#ffd699] hover:from-[#a37216] hover:via-[#eead48] hover:to-[#eec588] text-black border-2 border-black rounded-lg px-8 py-3 text-lg font-medium shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150"
                >
                  Close
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* My History Modal */}
      {showHistoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-4xl w-full mx-4 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowHistoryModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-black mb-6">PRIZES</h2>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-3 px-4 text-xs font-bold text-gray-700 uppercase">CODE</th>
                      <th className="text-left py-3 px-4 text-xs font-bold text-gray-700 uppercase">PRIZE</th>
                      <th className="text-left py-3 px-4 text-xs font-bold text-gray-700 uppercase">ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {historyData.map((item, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-gray-600">{item.code}</span>
                            <button
                              onClick={() => handleCopyCode(item.code)}
                              className="text-gray-400 hover:text-gray-600 transition-colors"
                              aria-label="Copy code"
                            >
                              {copiedCode === item.code ? (
                                <Check className="w-4 h-4 text-green-500" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-left">
                          <span className="text-sm text-gray-600">{item.prize}</span>
                        </td>
                        <td className="py-4 px-4 text-left">
                          {item.redeemed ? (
                            <Button
                              size="sm"
                              disabled
                              className="bg-gray-200 text-gray-500 border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium"
                            >
                              Redeemed
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              className="bg-gradient-to-r from-[#b38327] via-[#ffbd59] to-[#ffd699] hover:from-[#a37216] hover:via-[#eead48] hover:to-[#eec588] text-black border border-black rounded-lg px-4 py-2 text-sm font-medium shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all duration-150"
                            >
                              Claim Prize
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-center gap-4 mt-6">
                <Button
                  size="sm"
                  disabled
                  className="px-4 py-2 bg-gray-200 text-gray-500 border border-gray-300 rounded-lg"
                >
                  Previous
                </Button>
                <span className="text-sm text-gray-600">Page 1 of 3</span>
                <Button
                  size="sm"
                  className="px-4 py-2 bg-gradient-to-r from-[#b38327] via-[#ffbd59] to-[#ffd699] hover:from-[#a37216] hover:via-[#eead48] hover:to-[#eec588] text-black border border-black rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all duration-150"
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Redemption Instructions Modal */}
      {showRedemptionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 relative">
            <button
              onClick={() => setShowRedemptionModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-black mb-6">REDEEM YOUR PRIZE</h2>

              <div className="text-left space-y-4 text-gray-700">
                <div className="flex items-start gap-3">
                  <span className="bg-[#ffbd59] text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                    1
                  </span>
                  <p>After winning a prize, go to "My History."</p>
                </div>

                <div className="flex items-start gap-3">
                  <span className="bg-[#ffbd59] text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                    2
                  </span>
                  <p>
                    Tap "Apply Discount." You'll be taken directly to the prize product page with the discount code
                    automatically applied.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <span className="bg-[#ffbd59] text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                    3
                  </span>
                  <p>Add the prize to your cart — it will show as 100% off at checkout.</p>
                </div>

                <div className="flex items-start gap-3">
                  <span className="bg-[#ffbd59] text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                    4
                  </span>
                  <p>
                    Complete checkout with your free prize. You can also add and purchase other items at the same time
                    if you'd like.
                  </p>
                </div>
              </div>
            </div>

            <Button
              onClick={() => setShowRedemptionModal(false)}
              className="w-full bg-gradient-to-r from-[#b38327] via-[#ffbd59] to-[#ffd699] hover:from-[#a37216] hover:via-[#eead48] hover:to-[#eec588] text-black border-2 border-black rounded-lg py-3 text-lg font-medium shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150"
            >
              CLOSE
            </Button>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes confetti-fall {
          0% {
            transform: translateY(-10px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}

// Separate component for confetti to ensure it renders properly
function ConfettiEffect() {
  const [confetti, setConfetti] = useState([])

  useEffect(() => {
    // Generate confetti pieces
    const pieces = []
    const colors = [
      "#ffbd59", // Yellow (brand color)
      "#ff5e5e", // Red
      "#5e8eff", // Blue
      "#5eff8e", // Green
      "#c45eff", // Purple
      "#ff5ec4", // Pink
    ]

    for (let i = 0; i < 100; i++) {
      pieces.push({
        id: i,
        x: Math.random() * 100,
        y: -20,
        width: Math.random() * 3 + 2,
        height: Math.random() * 15 + 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        delay: Math.random() * 0.5,
        duration: 1 + Math.random() * 2,
      })
    }

    setConfetti(pieces)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="absolute"
          style={{
            left: `${piece.x}%`,
            top: `${piece.y}%`,
            width: `${piece.width}px`,
            height: `${piece.height}px`,
            backgroundColor: piece.color,
            transform: `rotate(${piece.rotation}deg)`,
            animation: `confetti-fall ${piece.duration}s ease-out forwards`,
            animationDelay: `${piece.delay}s`,
            borderRadius: "1px",
          }}
        />
      ))}
    </div>
  )
}
