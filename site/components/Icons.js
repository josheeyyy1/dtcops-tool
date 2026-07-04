function base(props) {
  return {
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
    ...props,
  };
}

export function IconLayers(props) {
  return (
    <svg {...base(props)}>
      <path d="M12 3 3 8l9 5 9-5-9-5Z" />
      <path d="m3 13 9 5 9-5" />
      <path d="m3 8 9 5 9-5" />
    </svg>
  );
}

export function IconTarget(props) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r=".5" fill="currentColor" />
    </svg>
  );
}

export function IconBell(props) {
  return (
    <svg {...base(props)}>
      <path d="M7 9a5 5 0 0 1 10 0c0 4 1.5 5.5 2 6H5c.5-.5 2-2 2-6Z" />
      <path d="M10 18a2 2 0 0 0 4 0" />
    </svg>
  );
}

export function IconChart(props) {
  return (
    <svg {...base(props)}>
      <path d="M4 20V10" />
      <path d="M12 20V4" />
      <path d="M20 20v-6" />
      <path d="M4 20h16" />
    </svg>
  );
}

export function IconArrowRight(props) {
  return (
    <svg {...base(props)}>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

export function IconCheck(props) {
  return (
    <svg {...base(props)}>
      <path d="m5 13 4 4 10-10" />
    </svg>
  );
}

export function IconX(props) {
  return (
    <svg {...base(props)}>
      <path d="M6 6l12 12" />
      <path d="M18 6 6 18" />
    </svg>
  );
}

export function IconCalendar(props) {
  return (
    <svg {...base(props)}>
      <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
      <path d="M3.5 10h17" />
      <path d="M8 3v4" />
      <path d="M16 3v4" />
    </svg>
  );
}
