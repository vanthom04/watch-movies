'use client'

import * as React from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'

import { cn } from '@/lib/utils'

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn('relative flex w-full touch-none select-none cursor-pointer items-center', className)}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-1 w-full grow overflow-hidden rounded-full bg-[#4d4d4d]">
      <SliderPrimitive.Range className="absolute h-full bg-[#ff5833]" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-3 w-3 rounded-full border-none bg-[#ff5833] ring-offset-[#ff5833] outline-none transition-colors disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
))

Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
