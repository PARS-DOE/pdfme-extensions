// Simple SVG icon components for text formatting

// Helper function to create SVG string
const createSvgStr = (path) => {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${path}</svg>`;
};

// Text alignment icons
export const TextAlignLeftIcon = createSvgStr('<line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="12" x2="15" y2="12"></line><line x1="3" y1="18" x2="18" y2="18"></line>');
export const TextAlignCenterIcon = createSvgStr('<line x1="3" y1="6" x2="21" y2="6"></line><line x1="6" y1="12" x2="18" y2="12"></line><line x1="5" y1="18" x2="19" y2="18"></line>');
export const TextAlignRightIcon = createSvgStr('<line x1="3" y1="6" x2="21" y2="6"></line><line x1="9" y1="12" x2="21" y2="12"></line><line x1="6" y1="18" x2="21" y2="18"></line>');
export const TextAlignJustifyIcon = createSvgStr('<line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="18" x2="21" y2="18"></line>');

// Text decoration icons
export const TextUnderlineIcon = createSvgStr('<path d="M6 4v6a6 6 0 0 0 12 0V4"></path><line x1="4" y1="20" x2="20" y2="20"></line>');
export const TextStrikethroughIcon = createSvgStr('<path d="M17 9V5a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v4"></path><path d="M7 13v4a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-4"></path><line x1="4" y1="13" x2="20" y2="13"></line>');

// Vertical alignment icons
export const TextVerticalAlignTopIcon = createSvgStr('<rect x="5" y="6" width="14" height="14" rx="2"></rect><line x1="5" y1="3" x2="19" y2="3"></line>');
export const TextVerticalAlignMiddleIcon = createSvgStr('<rect x="5" y="5" width="14" height="14" rx="2"></rect><line x1="5" y1="12" x2="19" y2="12"></line>');
export const TextVerticalAlignBottomIcon = createSvgStr('<rect x="5" y="4" width="14" height="14" rx="2"></rect><line x1="5" y1="21" x2="19" y2="21"></line>');

// Export the createSvgStr function for use in other files
export { createSvgStr };
