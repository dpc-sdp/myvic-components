// Inner content of SVG icons
const icons = {
  // Outer
  markerOuter: `<path fill="white" fill-rule="evenodd" clip-rule="evenodd"
      d="M0 6C0 10.41 6 16 6 16C6 16 12 10.41 12 6C12 2.7492 9.31714 0 6 0C2.68286 0 0 2.7492 0 6Z M3.75 6C3.75 4.758 4.758 3.75 6 3.75C7.242 3.75 8.25 4.758 8.25 6C8.25 7.242 7.242 8.25 6 8.25C4.758 8.25 3.75 7.242 3.75 6Z" />`,
  circleOuter: `<circle cx="16.0741" cy="16.2337" r="16" fill="white"/>`,

  // Inner
  markerInner: `<path fill="white" fill-rule="evenodd" clip-rule="evenodd"
  d="M3.75 6C3.75 4.758 4.758 3.75 6 3.75C7.242 3.75 8.25 4.758 8.25 6C8.25 7.242 7.242 8.25 6 8.25C4.758 8.25 3.75 7.242 3.75 6Z" />`,
  pedestrian: `<path d="M1.75515 14.2819L3.41298 11.1044C3.86198 10.2755 4.5182 9.58473 5.31258 9.10119C9.14631 6.82168 9.62985 6.85621 10.1134 6.89075L12.7037 7.06344C13.4981 7.09798 14.0507 7.30521 16.7102 11.208C16.8138 11.3462 16.9519 11.4498 17.1592 11.4843L20.3367 11.9679C21.2001 12.106 21.7873 12.9004 21.6491 13.7638C21.511 14.6273 20.7166 15.2144 19.8531 15.0763L16.6756 14.5928C15.6395 14.4201 14.707 13.8675 14.1198 13.004C13.9817 12.7968 13.878 12.6241 13.7399 12.4514L12.4776 18.6614L14.5343 21.7422C14.9487 22.1566 15.2941 22.7092 15.5013 23.2618L17.6772 29.6169C18.0226 30.5494 17.5045 31.5855 16.572 31.8964C16.3648 31.9655 16.1921 32 15.9849 32C15.225 32 14.5343 31.5165 14.258 30.7912L12.0821 24.4361C12.0475 24.3671 12.013 24.3325 11.9784 24.2634L6.93587 19.1863C6.21057 18.461 5.93427 17.4594 6.1415 16.4924L7.24672 11.5879C7.1431 11.657 7.03949 11.7261 6.90134 11.7952C6.59049 11.9679 6.34872 12.2442 6.17603 12.555L4.5182 15.7325C4.2419 16.2506 3.68929 16.5614 3.13668 16.5614C2.89491 16.5614 2.65314 16.4924 2.41137 16.3887C1.65153 15.9743 1.37523 15.0418 1.75515 14.2819Z" fill="white"/>
    <path d="M11.9408 6.11326C13.6289 6.11326 14.9974 4.74476 14.9974 3.05663C14.9974 1.3685 13.6289 0 11.9408 0C10.2526 0 8.88414 1.3685 8.88414 3.05663C8.88414 4.74476 10.2526 6.11326 11.9408 6.11326Z" fill="white"/>
    <path d="M6.16423 22.3965L0.973139 26.6585C0.389444 27.1696 0.178761 27.9882 0.444705 28.6997C0.517236 28.8931 0.610489 29.0451 0.748641 29.2143C1.36687 29.9776 2.517 30.1019 3.26993 29.4526L8.46101 25.1906C8.90656 24.8038 9.30375 24.2857 9.54551 23.7538L9.67412 22.9675L7.05037 20.3377L6.28856 22.241C6.23676 22.2963 6.21949 22.3412 6.16423 22.3965Z" fill="white"/>`,
  car: `<path d="M33.8334 8.05248H31.5236L30.0334 4.2316C29.251 2.27532 27.053 0.960938 24.5569 0.960938H11.3687C8.87261 0.960938 6.63731 2.27532 5.89221 4.2316L4.40202 8.05248H2.09221C1.08633 8.05248 0.266724 8.72495 0.266724 9.55026V10.4061C0.266724 11.2314 1.08633 11.9039 2.09221 11.9039H2.72555C2.353 13.2794 2.16672 14.6855 2.16672 16.0916V23.2748C2.16672 24.1001 2.98633 24.7726 3.99221 24.7726H7.04712C8.053 24.7726 8.87261 24.1001 8.87261 23.2748V20.9823H27.1275V23.2748C27.1275 24.1001 27.9471 24.7726 28.953 24.7726H32.0079C33.0138 24.7726 33.8334 24.1001 33.8334 23.2748V16.061C33.8334 14.6549 33.6471 13.2489 33.2746 11.8733H33.9079C34.9138 11.8733 35.7334 11.2009 35.7334 10.3756V9.51969C35.6589 8.72495 34.8393 8.05248 33.8334 8.05248ZM7.60594 9.58082L9.35692 5.11805C9.65496 4.38444 10.4746 3.89537 11.3687 3.89537H24.5569C25.4883 3.89537 26.3079 4.38444 26.5687 5.11805L28.3197 9.58082C28.3942 9.79479 28.2079 9.97819 27.9471 9.97819H7.97849C7.7177 10.0088 7.53143 9.79479 7.60594 9.58082ZM11.4059 16.8863H7.7177C7.08437 16.8863 6.60006 16.489 6.60006 15.9693V14.5327C6.60006 13.9825 7.23339 13.524 7.90398 13.6157L11.3314 14.0742C11.7785 14.1353 12.151 14.4104 12.2628 14.7772L12.5236 15.7554C12.6726 16.3361 12.151 16.8863 11.4059 16.8863ZM29.2883 15.9693C29.2883 16.489 28.804 16.8863 28.1706 16.8863H24.4824C23.7746 16.8863 23.253 16.3361 23.402 15.7859L23.6628 14.8078C23.7746 14.441 24.1099 14.1659 24.5942 14.1047L28.0216 13.6462C28.6922 13.5545 29.3255 13.9825 29.3255 14.5632V15.9693H29.2883Z" fill="white"/>`,
  exclamation: `<path d="M5.00001 22.5C7.48401 22.5 9.5 20.484 9.5 18V4.5C9.5 2.016 7.48401 0 5.00001 0C2.51601 0 0.5 2.016 0.5 4.5V18C0.5 20.484 2.51601 22.5 5.00001 22.5Z" fill="white"/>
    <path d="M0.5 31.5C0.5 33.984 2.51601 36 5.00001 36C7.48401 36 9.5 33.984 9.5 31.5C9.5 29.016 7.48401 27 5.00001 27C2.51601 27 0.5 29.016 0.5 31.5Z" fill="white"/>`
}

const iconViewboxes = {
  markerOuter: '0 0 12 16',
  circleOuter: '0 0 33 33',
  markerInner: '0 0 12 16',
  pedestrian: ' 0 0 22 32',
  car: ' 0 0 36 25',
  exclamation: ' 0 0 10 36'
}

const iconSizes = {
  circleOuter: {
    s: { width: 32, height: 32 },
    m: { width: 48, height: 48 }
  },
  markerOuter: {
    s: { width: 24, height: 32 },
    m: { width: 45, height: 60 },
    l: { width: 57, height: 76 }
  },
  markerInner: {
    s: { width: 24, height: 32 },
    m: { width: 45, height: 60 },
    l: { width: 57, height: 76 }
  },
  pedestrian: {
    s: { width: 13.34, height: 20 },
    m: { width: 16, height: 24 },
    l: { width: 21.34, height: 32 }
  },
  car: {
    s: { width: 20, height: 13.43 },
    m: { width: 28, height: 18.8 },
    l: { width: 35.47, height: 23.81 }
  },
  exclamation: {
    s: { width: 5, height: 20 },
    m: { width: 6, height: 24 },
    l: { width: 9, height: 36 }
  }
}

export const getSvg = (icon, size) => {
  const { width, height } = iconSizes[icon][size]
  return `<svg width="${width}" height="${height}" viewBox="${iconViewboxes[icon]}" xmlns="http://www.w3.org/2000/svg">
    ${icons[icon]}
  </svg>`
}
