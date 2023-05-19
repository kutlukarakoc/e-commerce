import { useState, useEffect } from 'react'

/**
   * useWindowWidth hook returns the window width.
   * this hook updates when the window width changes.
**/

export const useWindowWidth = () => {

   // a state variable to hold the innerWidth value
   const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth)

   useEffect(() => {
      // function to update state according to window inner width
      const handleResize = () => setWindowWidth(window.innerWidth)
      // attach handleResize function to window as event
      window.addEventListener('resize', handleResize)
      // clean up
      return () => window.removeEventListener('resize', handleResize)
   }, [])

   // return state
   return windowWidth
}