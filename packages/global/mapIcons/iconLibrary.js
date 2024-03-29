// Inner content of SVG icons
export const icons = {
  plus: `<path d="M8 0C8.55228 2.41411e-08 9 0.447715 9 1V15C9 15.5523 8.55228 16 8 16C7.44771 16 7 15.5523 7 15L7 1C7 0.447715 7.44772 -2.41411e-08 8 0Z" fill="currentColor"/>
    <path d="M0 8C0 7.44772 0.447715 7 1 7H15C15.5523 7 16 7.44772 16 8C16 8.55228 15.5523 9 15 9H1C0.447715 9 0 8.55228 0 8Z" fill="currentColor"/>`,
  minus: `<rect width="16" height="2" rx="1" fill="currentColor"/>`,
  pinOuter: `<path fill="!!!customColor!!!" fill-rule="evenodd" clip-rule="evenodd"
    d="M0 6C0 10.41 6 16 6 16C6 16 12 10.41 12 6C12 2.7492 9.31714 0 6 0C2.68286 0 0 2.7492 0 6Z M3.75 6C3.75 4.758 4.758 3.75 6 3.75C7.242 3.75 8.25 4.758 8.25 6C8.25 7.242 7.242 8.25 6 8.25C4.758 8.25 3.75 7.242 3.75 6Z" />`,
  pinInner: `<path fill="white" fill-rule="evenodd" clip-rule="evenodd"
    d="M3.75 6C3.75 4.758 4.758 3.75 6 3.75C7.242 3.75 8.25 4.758 8.25 6C8.25 7.242 7.242 8.25 6 8.25C4.758 8.25 3.75 7.242 3.75 6Z" />`,
  circleOuter: `<circle cx="16.0741" cy="16.2337" r="16" fill="!!!customColor!!!"/>`,
  geolocationCircle: `<circle fill="#53565a4f" stroke-width="0" cx="14" cy="14" r="14"/>
  <circle fill="!!!customColor!!!" stroke-width="0" cx="14" cy="14" r="6"/>`,
  hollowCluster: `<circle stroke="!!!customColor!!!" fill="#ffffff" stroke-width="1" cx="4" cy="4" r="3.5"/>
    <text x="50%" y="50%" dy="1.25" text-anchor="middle" fill="!!!customColor!!!" style="font-size: 3.7px; font-weight: bold; font-family:VIC-Regular, Arial, Helvetica, sans-serif;">!!!customText!!!</text>`,
  filledCluster: `<circle fill="#53565a44" stroke-width="0" cx="4" cy="4" r="4"/>
    <circle fill="!!!customColor!!!" stroke-width="0" cx="4" cy="4" r="3.1"/>
    <text x="50%" y="50%" dy="0.83" text-anchor="middle" fill="#ffffff" style="font-size: 2.4px; font-weight: bold; font-family:VIC-Regular, Arial, Helvetica, sans-serif;">!!!customText!!!</text>`,

  carCircle: `<circle cx="16.5499" cy="16.8103" r="16" fill="!!!customColor!!!"/>
    <path d="M25.9043 14.2851H24.6018L23.7615 12.1305C23.3203 11.0273 22.0808 10.2861 20.6732 10.2861H13.2363C11.8287 10.2861 10.5682 11.0273 10.148 12.1305L9.3077 14.2851H8.00518C7.43795 14.2851 6.97577 14.6643 6.97577 15.1297V15.6124C6.97577 16.0778 7.43795 16.457 8.00518 16.457H8.36232C8.15224 17.2327 8.0472 18.0256 8.0472 18.8185V22.8692C8.0472 23.3346 8.50938 23.7138 9.07661 23.7138H10.7993C11.3665 23.7138 11.8287 23.3346 11.8287 22.8692V21.5764H22.1228V22.8692C22.1228 23.3346 22.585 23.7138 23.1522 23.7138H24.8749C25.4422 23.7138 25.9043 23.3346 25.9043 22.8692V18.8012C25.9043 18.0083 25.7993 17.2154 25.5892 16.4397H25.9464C26.5136 16.4397 26.9758 16.0605 26.9758 15.5951V15.1125C26.9338 14.6643 26.4716 14.2851 25.9043 14.2851ZM11.1144 15.147L12.1018 12.6304C12.2699 12.2167 12.7321 11.9409 13.2363 11.9409H20.6732C21.1985 11.9409 21.6606 12.2167 21.8077 12.6304L22.7951 15.147C22.8371 15.2676 22.7321 15.3711 22.585 15.3711H11.3245C11.1774 15.3883 11.0724 15.2676 11.1144 15.147ZM13.2573 19.2666H11.1774C10.8203 19.2666 10.5472 19.0425 10.5472 18.7495V17.9394C10.5472 17.6291 10.9043 17.3705 11.2825 17.4223L13.2153 17.6808C13.4674 17.7153 13.6775 17.8704 13.7405 18.0773L13.8875 18.6288C13.9716 18.9564 13.6775 19.2666 13.2573 19.2666ZM23.3413 18.7495C23.3413 19.0425 23.0682 19.2666 22.7111 19.2666H20.6312C20.2321 19.2666 19.938 18.9564 20.022 18.6461L20.169 18.0945C20.2321 17.8877 20.4211 17.7325 20.6943 17.6981L22.627 17.4395C23.0052 17.3878 23.3623 17.6291 23.3623 17.9566V18.7495H23.3413Z" fill="white"/>`,
  carPin: `<g filter="url(#filter_car)">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.5 30.5C8.5 47.0375 31 68 31 68C31 68 53.5 47.0375 53.5 30.5C53.5 18.3095 43.4393 8 31 8C18.5607 8 8.5 18.3095 8.5 30.5Z" fill="!!!customColor!!!"/>
    <path d="M43.5 26.1992H41.6765L40.5 23.1827C39.8824 21.6383 38.1471 20.6006 36.1765 20.6006H25.7647C23.7941 20.6006 22.0294 21.6383 21.4412 23.1827L20.2647 26.1992H18.4412C17.6471 26.1992 17 26.7301 17 27.3816V28.0573C17 28.7089 17.6471 29.2398 18.4412 29.2398H18.9412C18.6471 30.3257 18.5 31.4358 18.5 32.5458V38.2168C18.5 38.8684 19.1471 39.3993 19.9412 39.3993H22.3529C23.1471 39.3993 23.7941 38.8684 23.7941 38.2168V36.4069H38.2059V38.2168C38.2059 38.8684 38.8529 39.3993 39.6471 39.3993H42.0588C42.8529 39.3993 43.5 38.8684 43.5 38.2168V32.5217C43.5 31.4116 43.3529 30.3016 43.0588 29.2156H43.5588C44.3529 29.2156 45 28.6847 45 28.0332V27.3575C44.9412 26.7301 44.2941 26.1992 43.5 26.1992ZM22.7941 27.4058L24.1765 23.8825C24.4118 23.3034 25.0588 22.9172 25.7647 22.9172H36.1765C36.9118 22.9172 37.5588 23.3034 37.7647 23.8825L39.1471 27.4058C39.2059 27.5747 39.0588 27.7195 38.8529 27.7195H23.0882C22.8824 27.7436 22.7353 27.5747 22.7941 27.4058ZM25.7941 33.1733H22.8824C22.3824 33.1733 22 32.8596 22 32.4493V31.3151C22 30.8807 22.5 30.5188 23.0294 30.5912L25.7353 30.9531C26.0882 31.0014 26.3824 31.2186 26.4706 31.5082L26.6765 32.2804C26.7941 32.7389 26.3824 33.1733 25.7941 33.1733ZM39.9118 32.4493C39.9118 32.8596 39.5294 33.1733 39.0294 33.1733H36.1176C35.5588 33.1733 35.1471 32.7389 35.2647 32.3045L35.4706 31.5323C35.5588 31.2427 35.8235 31.0255 36.2059 30.9773L38.9118 30.6153C39.4412 30.5429 39.9412 30.8807 39.9412 31.3392V32.4493H39.9118Z" fill="white"/>
    </g>
    <defs>
    <filter id="filter_car" x="-7" y="0" width="76" height="76" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
    <feOffset/>
    <feGaussianBlur stdDeviation="4"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"/>
    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
    </filter>
    </defs>`,
  carPinLarge: `<g filter="url(#filter_carL)">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.5 40.5C12.5 61.4475 41 88 41 88C41 88 69.5 61.4475 69.5 40.5C69.5 25.0587 56.7564 12 41 12C25.2436 12 12.5 25.0587 12.5 40.5Z" fill="!!!customColor!!!"/>
    <path d="M56.8334 35.0525H54.5236L53.0334 31.2316C52.251 29.2753 50.053 27.9609 47.5569 27.9609H34.3687C31.8726 27.9609 29.6373 29.2753 28.8922 31.2316L27.402 35.0525H25.0922C24.0863 35.0525 23.2667 35.7249 23.2667 36.5503V37.4061C23.2667 38.2314 24.0863 38.9039 25.0922 38.9039H25.7255C25.353 40.2794 25.1667 41.6855 25.1667 43.0916V50.2748C25.1667 51.1001 25.9863 51.7726 26.9922 51.7726H30.0471C31.053 51.7726 31.8726 51.1001 31.8726 50.2748V47.9823H50.1275V50.2748C50.1275 51.1001 50.9471 51.7726 51.953 51.7726H55.0079C56.0138 51.7726 56.8334 51.1001 56.8334 50.2748V43.061C56.8334 41.6549 56.6471 40.2489 56.2746 38.8733H56.9079C57.9138 38.8733 58.7334 38.2009 58.7334 37.3756V36.5197C58.6589 35.7249 57.8393 35.0525 56.8334 35.0525ZM30.6059 36.5808L32.3569 32.118C32.655 31.3844 33.4746 30.8954 34.3687 30.8954H47.5569C48.4883 30.8954 49.3079 31.3844 49.5687 32.118L51.3197 36.5808C51.3942 36.7948 51.2079 36.9782 50.9471 36.9782H30.9785C30.7177 37.0088 30.5314 36.7948 30.6059 36.5808ZM34.4059 43.8863H30.7177C30.0844 43.8863 29.6001 43.489 29.6001 42.9693V41.5327C29.6001 40.9825 30.2334 40.524 30.904 40.6157L34.3314 41.0742C34.7785 41.1353 35.151 41.4104 35.2628 41.7772L35.5236 42.7554C35.6726 43.3361 35.151 43.8863 34.4059 43.8863ZM52.2883 42.9693C52.2883 43.489 51.804 43.8863 51.1706 43.8863H47.4824C46.7746 43.8863 46.253 43.3361 46.402 42.7859L46.6628 41.8078C46.7746 41.441 47.1099 41.1659 47.5942 41.1047L51.0216 40.6462C51.6922 40.5545 52.3255 40.9825 52.3255 41.5632V42.9693H52.2883Z" fill="white"/>
    </g>
    <defs>
    <filter id="filter_carL" x="-9" y="0" width="100" height="100" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
    <feOffset/>
    <feGaussianBlur stdDeviation="6"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.4 0"/>
    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
    </filter>
    </defs>`,
  exclamationCircle: `<circle cx="16.9758" cy="16" r="16" fill="!!!customColor!!!"/>
    <path d="M16.9758 18.5C18.3558 18.5 19.4758 17.38 19.4758 16V8.5C19.4758 7.12 18.3558 6 16.9758 6C15.5958 6 14.4758 7.12 14.4758 8.5V16C14.4758 17.38 15.5958 18.5 16.9758 18.5Z" fill="white"/>
    <path d="M14.4758 23.5C14.4758 24.88 15.5958 26 16.9758 26C18.3558 26 19.4758 24.88 19.4758 23.5C19.4758 22.12 18.3558 21 16.9758 21C15.5958 21 14.4758 22.12 14.4758 23.5Z" fill="white"/>`,
  exclamationPin: `<g filter="url(#filter_exc)">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.5 30.5C8.5 47.0375 31 68 31 68C31 68 53.5 47.0375 53.5 30.5C53.5 18.3095 43.4393 8 31 8C18.5607 8 8.5 18.3095 8.5 30.5Z" fill="!!!customColor!!!"/>
    <path d="M31 35C32.656 35 34 33.656 34 32V23C34 21.344 32.656 20 31 20C29.344 20 28 21.344 28 23V32C28 33.656 29.344 35 31 35Z" fill="white"/>
    <path d="M28 41C28 42.656 29.344 44 31 44C32.656 44 34 42.656 34 41C34 39.344 32.656 38 31 38C29.344 38 28 39.344 28 41Z" fill="white"/>
    </g>
    <defs>
    <filter id="filter_exc" x="-7" y="0" width="76" height="76" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
    <feOffset/>
    <feGaussianBlur stdDeviation="4"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"/>
    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
    </filter>
    </defs>`,
  exclamationPinLarge: `<g filter="url(#filter_excL)">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.5 40.5C12.5 61.4475 41 88 41 88C41 88 69.5 61.4475 69.5 40.5C69.5 25.0587 56.7564 12 41 12C25.2436 12 12.5 25.0587 12.5 40.5Z" fill="!!!customColor!!!"/>
    <path d="M41 48.5C43.484 48.5 45.5 46.484 45.5 44V30.5C45.5 28.016 43.484 26 41 26C38.516 26 36.5 28.016 36.5 30.5V44C36.5 46.484 38.516 48.5 41 48.5Z" fill="white"/>
    <path d="M36.5 57.5C36.5 59.984 38.516 62 41 62C43.484 62 45.5 59.984 45.5 57.5C45.5 55.016 43.484 53 41 53C38.516 53 36.5 55.016 36.5 57.5Z" fill="white"/>
    </g>
    <defs>
    <filter id="filter_excL" x="-7" y="0" width="100" height="100" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
    <feOffset/>
    <feGaussianBlur stdDeviation="6"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.4 0"/>
    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
    </filter>
    </defs>`,
  pedestrianCircle: `<circle cx="16.9753" cy="16" r="16" fill="!!!customColor!!!"/>
    <path d="M11.1976 14.9262L12.2337 12.9403C12.5143 12.4222 12.9245 11.9905 13.421 11.6883C15.8171 10.2636 16.1193 10.2852 16.4215 10.3067L18.0405 10.4147C18.537 10.4363 18.8824 10.5658 20.5445 13.0051C20.6093 13.0914 20.6956 13.1562 20.8251 13.1777L22.8111 13.48C23.3508 13.5663 23.7177 14.0628 23.6314 14.6024C23.545 15.1421 23.0485 15.5091 22.5089 15.4227L20.5229 15.1205C19.8753 15.0126 19.2925 14.6672 18.9255 14.1275C18.8392 13.998 18.7744 13.8901 18.6881 13.7822L17.8991 17.6635L19.1846 19.5889C19.4436 19.848 19.6595 20.1933 19.789 20.5387L21.1489 24.5106C21.3648 25.0935 21.041 25.7411 20.4582 25.9353C20.3286 25.9785 20.2207 26.0001 20.0912 26.0001C19.6163 26.0001 19.1846 25.6979 19.0119 25.2446L17.6519 21.2727C17.6303 21.2295 17.6088 21.2079 17.5872 21.1647L14.4355 17.9915C13.9822 17.5382 13.8095 16.9122 13.9391 16.3078L14.6298 13.2425C14.5651 13.2857 14.5003 13.3288 14.414 13.372C14.2197 13.48 14.0686 13.6526 13.9606 13.8469L12.9245 15.8329C12.7518 16.1567 12.4064 16.351 12.061 16.351C11.9099 16.351 11.7588 16.3078 11.6077 16.243C11.1328 15.984 10.9601 15.4011 11.1976 14.9262Z" fill="white"/>
    <path d="M17.5634 9.8208C18.6185 9.8208 19.4738 8.96549 19.4738 7.9104C19.4738 6.85532 18.6185 6 17.5634 6C16.5083 6 15.653 6.85532 15.653 7.9104C15.653 8.96549 16.5083 9.8208 17.5634 9.8208Z" fill="white"/>
    <path d="M13.9534 19.9979L10.7089 22.6616C10.3441 22.9811 10.2124 23.4927 10.3786 23.9374C10.424 24.0583 10.4823 24.1533 10.5686 24.259C10.955 24.7361 11.6738 24.8138 12.1444 24.408L15.3889 21.7442C15.6673 21.5024 15.9156 21.1787 16.0667 20.8462L16.1471 20.3548L14.5072 18.7111L14.0311 19.9007C13.9987 19.9353 13.9879 19.9633 13.9534 19.9979Z" fill="white"/>`,
  pedestrianPin: `<g filter="url(#filter_ped)">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M8 30.5C8 47.0375 30.5 68 30.5 68C30.5 68 53 47.0375 53 30.5C53 18.3095 42.9393 8 30.5 8C18.0607 8 8 18.3095 8 30.5Z" fill="!!!customColor!!!"/>
    <path d="M23.5662 30.7114L24.8096 28.3283C25.1464 27.7066 25.6385 27.1885 26.2343 26.8259C29.1096 25.1163 29.4723 25.1422 29.8349 25.1681L31.7777 25.2976C32.3735 25.3235 32.7879 25.4789 34.7825 28.406C34.8602 28.5096 34.9638 28.5873 35.1192 28.6132L37.5024 28.9759C38.15 29.0795 38.5903 29.6753 38.4867 30.3229C38.3831 30.9705 37.7873 31.4108 37.1397 31.3072L34.7566 30.9446C33.9795 30.8151 33.2801 30.4006 32.8397 29.753C32.7361 29.5976 32.6584 29.4681 32.5548 29.3385L31.608 33.9961L33.1506 36.3066C33.4614 36.6175 33.7205 37.0319 33.8759 37.4464L35.5078 42.2126C35.7668 42.912 35.3783 43.6892 34.6789 43.9223C34.5235 43.9741 34.3939 44 34.2385 44C33.6686 44 33.1506 43.6374 32.9433 43.0934L31.3114 38.3271C31.2855 38.2753 31.2596 38.2494 31.2337 38.1976L27.4518 34.3898C26.9078 33.8458 26.7006 33.0946 26.856 32.3693L27.6849 28.691C27.6072 28.7428 27.5295 28.7946 27.4259 28.8464C27.1927 28.9759 27.0114 29.1831 26.8819 29.4163L25.6385 31.7994C25.4313 32.1879 25.0168 32.4211 24.6024 32.4211C24.4211 32.4211 24.2397 32.3693 24.0584 32.2916C23.4885 31.9807 23.2813 31.2813 23.5662 30.7114Z" fill="white"/>
    <path d="M31.2052 24.5849C32.4713 24.5849 33.4976 23.5586 33.4976 22.2925C33.4976 21.0264 32.4713 20 31.2052 20C29.9391 20 28.9127 21.0264 28.9127 22.2925C28.9127 23.5586 29.9391 24.5849 31.2052 24.5849Z" fill="white"/>
    <path d="M26.8732 36.7973L22.9799 39.9939C22.5421 40.3772 22.3841 40.9911 22.5835 41.5248C22.6379 41.6698 22.7079 41.7838 22.8115 41.9107C23.2752 42.4832 24.1377 42.5765 24.7024 42.0895L28.5958 38.893C28.9299 38.6028 29.2278 38.2143 29.4091 37.8154L29.5056 37.2257L27.5378 35.2533L26.9664 36.6808C26.9276 36.7222 26.9146 36.7559 26.8732 36.7973Z" fill="white"/>
    </g>
    <defs>
    <filter id="filter_ped" x="-7.5" y="0" width="76" height="76" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
    <feOffset/>
    <feGaussianBlur stdDeviation="4"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"/>
    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
    </filter>
    </defs>`,
  pedestrianPinLarge: `<g filter="url(#filter_pedL)">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.5 40.5C12.5 61.4475 41 88 41 88C41 88 69.5 61.4475 69.5 40.5C69.5 25.0587 56.7564 12 41 12C25.2436 12 12.5 25.0587 12.5 40.5Z" fill="!!!customColor!!!"/>
    <path d="M31.7551 41.2819L33.413 38.1044C33.862 37.2755 34.5182 36.5847 35.3126 36.1012C39.1463 33.8217 39.6298 33.8562 40.1134 33.8908L42.7037 34.0634C43.4981 34.098 44.0507 34.3052 46.7102 38.208C46.8138 38.3462 46.9519 38.4498 47.1592 38.4843L50.3367 38.9679C51.2001 39.106 51.7873 39.9004 51.6491 40.7638C51.511 41.6273 50.7166 42.2144 49.8531 42.0763L46.6756 41.5928C45.6395 41.4201 44.707 40.8675 44.1198 40.004C43.9817 39.7968 43.878 39.6241 43.7399 39.4514L42.4776 45.6614L44.5343 48.7422C44.9487 49.1566 45.2941 49.7092 45.5013 50.2618L47.6772 56.6169C48.0226 57.5494 47.5045 58.5855 46.572 58.8964C46.3648 58.9655 46.1921 59 45.9849 59C45.225 59 44.5343 58.5165 44.258 57.7912L42.0821 51.4361C42.0475 51.3671 42.013 51.3325 41.9784 51.2634L36.9359 46.1863C36.2106 45.461 35.9343 44.4594 36.1415 43.4924L37.2467 38.5879C37.1431 38.657 37.0395 38.7261 36.9013 38.7952C36.5905 38.9679 36.3487 39.2442 36.176 39.555L34.5182 42.7325C34.2419 43.2506 33.6893 43.5614 33.1367 43.5614C32.8949 43.5614 32.6531 43.4924 32.4114 43.3887C31.6515 42.9743 31.3752 42.0418 31.7551 41.2819Z" fill="white"/>
    <path d="M41.9408 33.1133C43.6289 33.1133 44.9974 31.7448 44.9974 30.0566C44.9974 28.3685 43.6289 27 41.9408 27C40.2526 27 38.8841 28.3685 38.8841 30.0566C38.8841 31.7448 40.2526 33.1133 41.9408 33.1133Z" fill="white"/>
    <path d="M36.1642 49.3965L30.9731 53.6585C30.3894 54.1696 30.1788 54.9882 30.4447 55.6997C30.5172 55.8931 30.6105 56.0451 30.7486 56.2143C31.3669 56.9776 32.517 57.1019 33.2699 56.4526L38.461 52.1906C38.9066 51.8038 39.3037 51.2857 39.5455 50.7538L39.6741 49.9675L37.0504 47.3377L36.2886 49.241C36.2368 49.2963 36.2195 49.3412 36.1642 49.3965Z" fill="white"/>
    </g>
    <defs>
    <filter id="filter_pedL" x="-9" y="0" width="100" height="100" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
    <feOffset/>
    <feGaussianBlur stdDeviation="6"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.4 0"/>
    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
    </filter>
    </defs>`
}

const iconViewboxes = {
  plus: '0 0 16 16',
  minus: '0 0 16 2',
  pinOuter: '0 0 12 16',
  pinInner: '0 0 12 16',
  circleOuter: '0 0 33 33',
  geolocationCircle: '0 0 44 44',
  hollowCluster: '0 0 8 8',
  filledCluster: '0 0 8 8',
  carCircle: '0 0 33 33',
  carPin: '0 0 62 76',
  carPinLarge: '0 0 82 100',
  exclamationCircle: '0 0 33 32',
  exclamationPin: '0 0 62 76',
  exclamationPinLarge: '0 0 82 100',
  pedestrianCircle: '0 0 33 32',
  pedestrianPin: '0 0 61 76',
  pedestrianPinLarge: '0 0 82 100'
}

const iconSizes = {
  plus: {
    s: { width: 16, height: 16 }
  },
  minus: {
    s: { width: 16, height: 16 }
  },
  pinOuter: {
    s: { width: 24, height: 32 },
    m: { width: 45, height: 60 },
    l: { width: 57, height: 76 }
  },
  pinInner: {
    s: { width: 24, height: 32 },
    m: { width: 45, height: 60 },
    l: { width: 57, height: 76 }
  },
  circleOuter: {
    s: { width: 32, height: 32 },
    m: { width: 48, height: 48 }
  },
  geolocationCircle: {
    m: { width: 44, height: 44 }
  },
  hollowCluster: {
    s: { width: 30, height: 30 },
    m: { width: 48, height: 48 }
  },
  filledCluster: {
    s: { width: 42, height: 42 },
    m: { width: 58, height: 58 }
  },
  carCircle: {
    s: { width: 24, height: 24 },
    m: { width: 33, height: 33 }
  },
  carPin: {
    m: { width: 62, height: 76 }
  },
  carPinLarge: {
    m: { width: 82, height: 100 }
  },
  exclamationCircle: {
    s: { width: 24, height: 24 },
    m: { width: 33, height: 32 }
  },
  exclamationPin: {
    m: { width: 62, height: 76 }
  },
  exclamationPinLarge: {
    m: { width: 82, height: 100 }
  },
  pedestrianCircle: {
    s: { width: 24, height: 24 },
    m: { width: 33, height: 33 }
  },
  pedestrianPin: {
    m: { width: 61, height: 76 }
  },
  pedestrianPinLarge: {
    m: { width: 82, height: 100 }
  }
}

export const getSvg = (icon, size, color, text) => {
  const iconSvg = icons[icon]
  if (!iconSvg.replaceAll) return '' // needed for unit tests to work
  const { width, height } = iconSizes[icon][size]
  return `<svg width="${width}" height="${height}" viewBox="${iconViewboxes[icon]}" xmlns="http://www.w3.org/2000/svg">
    ${icons[icon].replaceAll('!!!customColor!!!', color).replaceAll('!!!customText!!!', text)}
  </svg>`
}
