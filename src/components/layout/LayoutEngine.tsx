'use client'

import React, { useState, useCallback, useEffect } from 'react'
import {
  DndContext,
  closestCenter,
  DragOverlay,
  DragStartEvent,
  DragEndEvent,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  SortableContext,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable'
import { Panel, PanelType, PanelConfig, Layout, ResponsiveBreakpoint } from '@/types'
import { PanelFactory } from '@/components/panels/PanelFactory'
import { BasePanel } from '@/components/panels/BasePanel'
import { cn } from '@/lib/utils'

interface LayoutEngineProps {
  layout: Layout
  onLayoutChange: (layout: Layout) => void
  className?: string
}

// Responsive breakpoints for the grid system
const breakpoints: ResponsiveBreakpoint[] = [
  { name: 'mobile', minWidth: 0, columns: 1, maxPanelWidth: 100 },
  { name: 'tablet', minWidth: 768, columns: 2, maxPanelWidth: 50 },
  { name: 'desktop', minWidth: 1024, columns: 3, maxPanelWidth: 33 },
  { name: 'large', minWidth: 1440, columns: 4, maxPanelWidth: 25 },
  { name: 'xl', minWidth: 1920, columns: 6, maxPanelWidth: 16 }
]

export const LayoutEngine: React.FC<LayoutEngineProps> = ({
  layout,
  onLayoutChange,
  className
}) => {
  const [panels, setPanels] = useState<Panel[]>(layout.panels)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [draggedPanel, setDraggedPanel] = useState<Panel | null>(null)
  const [currentBreakpoint, setCurrentBreakpoint] = useState<ResponsiveBreakpoint>(breakpoints[2])

  // Sensors for drag and drop with accessibility
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  // Update current breakpoint based on window size
  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth
      const newBreakpoint = breakpoints
        .slice()
        .reverse()
        .find(bp => width >= bp.minWidth) || breakpoints[0]
      setCurrentBreakpoint(newBreakpoint)
    }

    updateBreakpoint()
    window.addEventListener('resize', updateBreakpoint)
    return () => window.removeEventListener('resize', updateBreakpoint)
  }, [])

  // Sync local panels with layout prop
  useEffect(() => {
    setPanels(layout.panels)
  }, [layout.panels])

  const handleDragStart = useCallback((event: DragStartEvent) => {
    const { active } = event
    const panel = panels.find(p => p.id === active.id)
    
    setActiveId(active.id as string)
    setDraggedPanel(panel || null)
  }, [panels])

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event
    
    setActiveId(null)
    setDraggedPanel(null)

    if (!over || active.id === over.id) {
      return
    }

    const activeIndex = panels.findIndex(p => p.id === active.id)
    const overIndex = panels.findIndex(p => p.id === over.id)

    if (activeIndex !== -1 && overIndex !== -1) {
      const newPanels = [...panels]
      const [movedPanel] = newPanels.splice(activeIndex, 1)
      newPanels.splice(overIndex, 0, movedPanel)

      setPanels(newPanels)
      
      // Update layout with new panel order
      const updatedLayout = {
        ...layout,
        panels: newPanels,
        updatedAt: new Date().toISOString()
      }
      
      onLayoutChange(updatedLayout)
    }
  }, [panels, layout, onLayoutChange])

  const handlePanelUpdate = useCallback((panelId: string, updates: Partial<Panel>) => {
    const updatedPanels = panels.map(panel =>
      panel.id === panelId ? { ...panel, ...updates } : panel
    )
    
    setPanels(updatedPanels)
    
    const updatedLayout = {
      ...layout,
      panels: updatedPanels,
      updatedAt: new Date().toISOString()
    }
    
    onLayoutChange(updatedLayout)
  }, [panels, layout, onLayoutChange])

  const handlePanelRemove = useCallback((panelId: string) => {
    const updatedPanels = panels.filter(panel => panel.id !== panelId)
    
    setPanels(updatedPanels)
    
    const updatedLayout = {
      ...layout,
      panels: updatedPanels,
      updatedAt: new Date().toISOString()
    }
    
    onLayoutChange(updatedLayout)
  }, [panels, layout, onLayoutChange])

  const addPanel = useCallback((type: PanelType, config?: PanelConfig) => {
    const newPanel: Panel = {
      id: `panel-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type,
      title: getPanelTitle(type),
      position: { x: 0, y: 0 },
      size: { width: 400, height: 300 },
      config: config || {},
      minimized: false,
      visible: true
    }

    const updatedPanels = [...panels, newPanel]
    setPanels(updatedPanels)
    
    const updatedLayout = {
      ...layout,
      panels: updatedPanels,
      updatedAt: new Date().toISOString()
    }
    
    onLayoutChange(updatedLayout)
  }, [panels, layout, onLayoutChange])

  const getPanelTitle = (type: PanelType): string => {
    switch (type) {
      case 'video-feed': return 'Video Feed'
      case 'video-player': return 'Video Player'
      case 'search': return 'Search'
      case 'list': return 'My List'
      case 'recommendations': return 'Recommendations'
      case 'watch-later': return 'Watch Later'
      case 'subscriptions': return 'Subscriptions'
      case 'trending': return 'Trending'
      case 'ai-curated': return 'AI Curated'
      default: return 'Panel'
    }
  }

  const getGridColumns = () => {
    return currentBreakpoint.columns
  }

  const getGridClassName = () => {
    const columns = getGridColumns()
    return `grid gap-4 grid-cols-1 ${
      columns === 2 ? 'md:grid-cols-2' :
      columns === 3 ? 'md:grid-cols-2 lg:grid-cols-3' :
      columns === 4 ? 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' :
      columns === 6 ? 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6' :
      'md:grid-cols-1'
    }`
  }

  return (
    <div className={cn('w-full h-full overflow-auto', className)}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={panels.map(p => p.id)}
          strategy={rectSortingStrategy}
        >
          <div 
            className={cn(
              'p-4 min-h-full',
              getGridClassName()
            )}
            style={{
              '--panel-gap': '1rem',
              '--panel-min-height': '200px'
            } as React.CSSProperties}
          >
            {panels
              .filter(panel => panel.visible)
              .map((panel) => (
                <div
                  key={panel.id}
                  className="min-h-[200px]"
                  style={{
                    minHeight: 'var(--panel-min-height)',
                    aspectRatio: panel.type === 'video-player' ? '16/9' : undefined
                  }}
                >
                  <PanelFactory
                    panel={panel}
                    onUpdate={handlePanelUpdate}
                    onRemove={handlePanelRemove}
                    isDragging={activeId === panel.id}
                  />
                </div>
              ))}
          </div>
        </SortableContext>

        <DragOverlay>
          {draggedPanel && (
            <div className="opacity-95 rotate-3 scale-105">
              <BasePanel
                panel={draggedPanel}
                onUpdate={() => {}}
                onRemove={() => {}}
                isDragging={true}
                showControls={false}
              >
                <div className="h-32 flex items-center justify-center text-muted-foreground">
                  Moving panel...
                </div>
              </BasePanel>
            </div>
          )}
        </DragOverlay>
      </DndContext>

      {/* Layout Debug Info (Development) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 right-4 bg-black/80 text-white text-xs p-2 rounded font-mono">
          Breakpoint: {currentBreakpoint.name} | Columns: {currentBreakpoint.columns}
        </div>
      )}
    </div>
  )
}

export default LayoutEngine