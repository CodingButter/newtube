'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { Layout, Panel, PanelType, PanelConfig, GridConfig } from '@/types'

interface LayoutStore {
  // Current layout
  currentLayout: Layout | null
  
  // Available layouts
  layouts: Layout[]
  
  // Actions
  setCurrentLayout: (layout: Layout) => void
  updateLayout: (layoutId: string, updates: Partial<Layout>) => void
  createLayout: (name: string) => Layout
  deleteLayout: (layoutId: string) => void
  
  // Panel actions
  addPanel: (type: PanelType, config?: PanelConfig) => void
  removePanel: (panelId: string) => void
  updatePanel: (panelId: string, updates: Partial<Panel>) => void
  
  // Persistence
  saveToLocalStorage: () => void
  loadFromLocalStorage: () => void
  
  // Default layouts
  createDefaultLayout: () => Layout
  resetToDefault: () => void
}

const defaultGridConfig: GridConfig = {
  columns: 3,
  rows: 2,
  gap: 16,
  cellSize: 200
}

const createDefaultPanels = (): Panel[] => [
  {
    id: 'default-video-feed',
    type: 'video-feed',
    title: 'YouTube Feed',
    position: { x: 0, y: 0 },
    size: { width: 400, height: 300 },
    config: {
      platform: 'youtube',
      maxVideos: 10
    },
    minimized: false,
    visible: true
  },
  {
    id: 'default-search',
    type: 'search',
    title: 'Search',
    position: { x: 1, y: 0 },
    size: { width: 400, height: 300 },
    config: {
      platforms: ['youtube', 'vimeo', 'nebula'],
      resultsLimit: 20
    },
    minimized: false,
    visible: true
  },
  {
    id: 'default-recommendations',
    type: 'recommendations',
    title: 'AI Recommendations',
    position: { x: 2, y: 0 },
    size: { width: 400, height: 300 },
    config: {
      category: 'personalized',
      maxRecommendations: 8,
      aiEnabled: true
    },
    minimized: false,
    visible: true
  },
  {
    id: 'default-watch-later',
    type: 'watch-later',
    title: 'Watch Later',
    position: { x: 0, y: 1 },
    size: { width: 400, height: 300 },
    config: {
      listType: 'watch-later'
    },
    minimized: false,
    visible: true
  }
]

export const useLayoutStore = create<LayoutStore>()(
  persist(
    (set, get) => ({
      currentLayout: null,
      layouts: [],

      setCurrentLayout: (layout) => 
        set({ currentLayout: layout }),

      updateLayout: (layoutId, updates) =>
        set((state) => {
          const updatedLayouts = state.layouts.map(layout =>
            layout.id === layoutId
              ? { 
                  ...layout, 
                  ...updates, 
                  updatedAt: new Date().toISOString(),
                  version: layout.version + 1
                }
              : layout
          )
          
          const updatedCurrentLayout = state.currentLayout?.id === layoutId
            ? { 
                ...state.currentLayout, 
                ...updates, 
                updatedAt: new Date().toISOString(),
                version: state.currentLayout.version + 1
              }
            : state.currentLayout
          
          return {
            layouts: updatedLayouts,
            currentLayout: updatedCurrentLayout
          }
        }),

      createLayout: (name) => {
        const newLayout: Layout = {
          id: `layout-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          userId: 'current-user', // TODO: Get from auth
          name,
          panels: [],
          gridConfig: { ...defaultGridConfig },
          version: 1,
          isDefault: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }

        set((state) => ({
          layouts: [...state.layouts, newLayout]
        }))

        return newLayout
      },

      deleteLayout: (layoutId) =>
        set((state) => ({
          layouts: state.layouts.filter(layout => layout.id !== layoutId),
          currentLayout: state.currentLayout?.id === layoutId 
            ? null 
            : state.currentLayout
        })),

      addPanel: (type, config = {}) =>
        set((state) => {
          if (!state.currentLayout) return state

          const newPanel: Panel = {
            id: `panel-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            type,
            title: getPanelTitle(type),
            position: { x: 0, y: 0 },
            size: { width: 400, height: 300 },
            config,
            minimized: false,
            visible: true
          }

          const updatedLayout = {
            ...state.currentLayout,
            panels: [...state.currentLayout.panels, newPanel],
            updatedAt: new Date().toISOString(),
            version: state.currentLayout.version + 1
          }

          return {
            currentLayout: updatedLayout,
            layouts: state.layouts.map(layout =>
              layout.id === updatedLayout.id ? updatedLayout : layout
            )
          }
        }),

      removePanel: (panelId) =>
        set((state) => {
          if (!state.currentLayout) return state

          const updatedLayout = {
            ...state.currentLayout,
            panels: state.currentLayout.panels.filter(panel => panel.id !== panelId),
            updatedAt: new Date().toISOString(),
            version: state.currentLayout.version + 1
          }

          return {
            currentLayout: updatedLayout,
            layouts: state.layouts.map(layout =>
              layout.id === updatedLayout.id ? updatedLayout : layout
            )
          }
        }),

      updatePanel: (panelId, updates) =>
        set((state) => {
          if (!state.currentLayout) return state

          const updatedLayout = {
            ...state.currentLayout,
            panels: state.currentLayout.panels.map(panel =>
              panel.id === panelId ? { ...panel, ...updates } : panel
            ),
            updatedAt: new Date().toISOString(),
            version: state.currentLayout.version + 1
          }

          return {
            currentLayout: updatedLayout,
            layouts: state.layouts.map(layout =>
              layout.id === updatedLayout.id ? updatedLayout : layout
            )
          }
        }),

      saveToLocalStorage: () => {
        // This is handled automatically by zustand persist middleware
        console.log('Layout saved to localStorage')
      },

      loadFromLocalStorage: () => {
        // This is handled automatically by zustand persist middleware
        console.log('Layout loaded from localStorage')
      },

      createDefaultLayout: () => {
        const defaultLayout: Layout = {
          id: 'default-layout',
          userId: 'current-user', // TODO: Get from auth
          name: 'Default Layout',
          panels: createDefaultPanels(),
          gridConfig: { ...defaultGridConfig },
          version: 1,
          isDefault: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }

        set((state) => ({
          layouts: [defaultLayout, ...state.layouts.filter(l => l.id !== 'default-layout')],
          currentLayout: defaultLayout
        }))

        return defaultLayout
      },

      resetToDefault: () => {
        const { createDefaultLayout } = get()
        createDefaultLayout()
      }
    }),
    {
      name: 'newtube-layout-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        layouts: state.layouts,
        currentLayout: state.currentLayout
      }),
      onRehydrateStorage: () => (state) => {
        if (state && (!state.currentLayout || state.layouts.length === 0)) {
          // Create default layout if none exists
          state.createDefaultLayout()
        }
      }
    }
  )
)

function getPanelTitle(type: PanelType): string {
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

export default useLayoutStore