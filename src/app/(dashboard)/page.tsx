'use client'

import React, { useEffect } from 'react'
import { LayoutEngine, PanelToolbar } from '@/components/panels'
import { useLayoutStore } from '@/stores/layoutStore'
import { Button } from '@/components/ui/button'

export default function DashboardPage() {
  const { currentLayout, createDefaultLayout, setCurrentLayout } = useLayoutStore()

  useEffect(() => {
    // Initialize default layout if none exists
    if (!currentLayout) {
      const defaultLayout = createDefaultLayout()
      setCurrentLayout(defaultLayout)
    }
  }, [currentLayout, createDefaultLayout, setCurrentLayout])

  const handleLayoutChange = (updatedLayout: any) => {
    setCurrentLayout(updatedLayout)
  }

  if (!currentLayout) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent mx-auto mb-4" />
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="flex-shrink-0 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                <h1 className="text-xl font-bold text-foreground">
                  NEWTUBE Dashboard
                </h1>
                <p className="text-sm text-muted-foreground">
                  {currentLayout.name} • {currentLayout.panels.length} panels
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <PanelToolbar />
              <Button variant="outline" size="sm">
                Save Layout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        <LayoutEngine
          layout={currentLayout}
          onLayoutChange={handleLayoutChange}
          className="h-full"
        />
      </main>

      {/* Footer */}
      <footer className="flex-shrink-0 border-t border-border bg-muted/20 px-4 py-2">
        <div className="container mx-auto">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div>
              NEWTUBE - Panel-based streaming aggregator
            </div>
            <div className="flex items-center gap-4">
              <span>Drag to reorder panels</span>
              <span>•</span>
              <span>Use toolbar to add new panels</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}