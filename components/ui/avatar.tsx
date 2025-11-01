"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils"

/**
 * Render a styled avatar container that wraps Radix AvatarPrimitive.Root.
 *
 * Applies default rounded, sizing, and layout classes and merges any provided `className`; all other props are forwarded to the underlying Root.
 *
 * @param className - Additional CSS classes to merge with the component's default classes
 * @returns The rendered AvatarPrimitive.Root element with composed classes and forwarded props
 */
function Avatar({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root>) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        "relative flex size-8 shrink-0 overflow-hidden rounded-full",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders the avatar image slot with enforced square aspect ratio and full-size styling.
 *
 * @returns A React element for the avatar image where the provided `className` is merged with default `aspect-square` and full-size styles.
 */
function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full", className)}
      {...props}
    />
  )
}

/**
 * Renders the avatar fallback slot displayed when the avatar image is unavailable.
 *
 * @param className - Additional CSS class names to merge with the component's default styles
 * @returns The rendered avatar fallback element used to display fallback content (e.g., initials or an icon)
 */
function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "bg-muted flex size-full items-center justify-center rounded-full",
        className
      )}
      {...props}
    />
  )
}

export { Avatar, AvatarImage, AvatarFallback }