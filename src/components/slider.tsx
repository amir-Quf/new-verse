"use client"
import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"

export function CarouselDemo() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)
  const items = Array.from({ length: 10 })

  React.useEffect(() => {
    if (!api) return

    const slideCount = api.scrollSnapList().length
    setCount(slideCount)
    setCurrent(api.selectedScrollSnap())

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })

    const interval = setInterval(() => {
      if (!api) return
      const nextIndex = (api.selectedScrollSnap() + 1) % slideCount
      api.scrollTo(nextIndex)
    }, 3000)

    return () => clearInterval(interval)
  }, [api])

  return (
    <div className="flex flex-col my-30 items-center">
      <Carousel
        className="w-full max-w-5xl"
        setApi={setApi}
        opts={{
          align: "start",
        }}
      >
        <CarouselContent>
          {items.map((_, index) => (
            <CarouselItem
              key={index}
              className="sm:basis-1/2 lg:basis-1/3"
            >
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-4xl font-semibold">
                      {index + 1}
                    </span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>

      <div className="flex gap-2 mt-4">
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              current === index
                ? "bg-blue-500 scale-125"
                : "bg-gray-300 scale-100"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
