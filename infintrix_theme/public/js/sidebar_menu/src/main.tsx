import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
const queryClient1 = new QueryClient()
// const queryClient2 = new QueryClient()

import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Sidebar } from './components/Sidebar.tsx'
// import { RightSidebar } from './components/RightSidebar.tsx'
// import { createTheme } from '@mantine/core';

// const theme = createTheme({
//   // primaryColor: 'var(--primary)',
// });
createRoot(document.getElementById('infintrix_sidebar_menu')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient1}>
      <MantineProvider >
        <Sidebar />
      </MantineProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>,
)


// createRoot(document.getElementById('infintrix_right_sidebar_menu')!).render(
//   <StrictMode>
//     <QueryClientProvider client={queryClient2}>
//       <MantineProvider>
//         <RightSidebar />
//       </MantineProvider>
//       <ReactQueryDevtools initialIsOpen={false} />
//     </QueryClientProvider>
//   </StrictMode>,
// )
