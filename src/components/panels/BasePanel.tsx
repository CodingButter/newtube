'use client'

import React, { forwardRef } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { cn } from '@/lib/utils'
import { Panel, PanelProps } from '@/types'
import { GripVertical, X, Minimize, Maximize, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface BasePanelProps extends PanelProps {
  children: React.ReactNode
  showHeader?: boolean
  showControls?: boolean
  resizable?: boolean
}

export const BasePanel = forwardRef<HTMLDivElement, BasePanelProps>(
  (
    {
      panel,
      children,
      onUpdate,
      onRemove,
      isDragging = false,
      className,
      showHeader = true,
      showControls = true,
      resizable = true,
      ...props
    },
    ref
  ) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging: isSortableDragging,
    } = useSortable({
      id: panel.id,
      data: {
        type: 'panel',
        panel,
      },
    })

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      opacity: isDragging || isSortableDragging ? 0.6 : 1,
    }

    const handleMinimize = () => {
      onUpdate(panel.id, { minimized: !panel.minimized })
    }

    const handleClose = () => {
      onRemove(panel.id)
    }

    const handleConfigure = () => {
      // TODO: Open panel configuration modal
      console.log('Configure panel:', panel.id)
    }

    return (
      <div
        ref={setNodeRef}
        style={style}
        className={cn(
          'panel bg-background border border-border rounded-lg shadow-sm overflow-hidden',
          'min-h-[200px] transition-all duration-200',
          panel.minimized && 'h-12',
          isDragging && 'z-50 shadow-lg',
          className
        )}
        {...props}
      >
        {showHeader && (
          <div className="panel-header flex items-center justify-between p-3 border-b border-border bg-muted/50">
            <div className="flex items-center gap-2">
              <div
                {...attributes}
                {...listeners}
                className="cursor-grab active:cursor-grabbing p-1 hover:bg-muted rounded text-muted-foreground"
                aria-label="Drag panel"
              >
                <GripVertical className="h-4 w-4" />
              </div>
              <h3 className="font-medium text-sm text-foreground truncate">
                {panel.title}
              </h3>
            </div>

            {showControls && (
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleConfigure}
                  className="h-6 w-6 p-0"
                  aria-label="Configure panel"
                >
                  <Settings className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleMinimize}
                  className="h-6 w-6 p-0"
                  aria-label={panel.minimized ? 'Maximize panel' : 'Minimize panel'}
                >
                  {panel.minimized ? (
                    <Maximize className="h-3 w-3" />
                  ) : (
                    <Minimize className="h-3 w-3" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClose}
                  className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                  aria-label="Close panel"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            )}
          </div>
        )}

        {!panel.minimized && (
          <div className="panel-content p-4 h-full overflow-auto">
            {children}
          </div>
        )}
      </div>
    )
  }
)

BasePanel.displayName = 'BasePanel'