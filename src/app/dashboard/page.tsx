'use client'

import React, { useEffect } from 'react'
import { LayoutEngine } from '@/components/layout/LayoutEngine'
import { useLayoutStore } from '@/stores/layoutStore'
import { Button } from '@/components/ui/button'
import { Home, Settings, PlusCircle } from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  const { currentLayout, createDefaultLayout, addPanel } = useLayoutStore()

  useEffect(() => {
    if (!currentLayout) {
      createDefaultLayout()
    }
  }, [currentLayout, createDefaultLayout])

  const handleAddPanel = (type: any) => {
    addPanel(type)
  }

  if (!currentLayout) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Setting up your dashboard...</h2>
          <p className="text-muted-foreground">Creating your personalized streaming experience</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Top Header */}
      <header className="border-b border-border bg-card px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <Home className="w-4 h-4 mr-2" />
                Home
              </Button>
            </Link>
            <h1 className="text-xl font-semibold">NEWTUBE Dashboard</h1>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleAddPanel('video-feed')}
            >
              <PlusCircle className="w-4 h-4 mr-2" />
              Add Panel
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Layout Engine */}
      <main className="flex-1 overflow-hidden">
        <LayoutEngine
          layout={currentLayout}
          onLayoutChange={(updatedLayout) => {
            // The layout store will handle this automatically
            console.log('Layout updated:', updatedLayout)
          }}
        />
      </main>

      {/* Welcome Message */}
      <div className="fixed bottom-4 left-4 bg-primary text-primary-foreground rounded-lg p-4 shadow-lg max-w-md">
        <p className="text-sm font-medium mb-2">Welcome to your dashboard!</p>
        <p className="text-sm opacity-90">
          Drag panels to rearrange them. Click the + button to add more panels.
        </p>
      </div>
    </div>
  )
}