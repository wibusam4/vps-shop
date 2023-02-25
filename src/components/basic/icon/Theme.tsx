interface ThemeProps {}

const Theme: React.FC<ThemeProps> = () => {
  return (
    <span className="svg-icon svg-icon-primary svg-icon-2x">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="44px"
        height="44px"
        viewBox="0 0 24 24"
        version="1.1"
      >
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <rect x="0" y="0" width="24" height="24" />
          <path
            d="M12,20 C7.581722,20 4,16.418278 4,12 C4,7.581722 7.581722,4 12,4 C16.418278,4 20,7.581722 20,12 C20,16.418278 16.418278,20 12,20 Z M12,5.99999664 C8.6862915,6 6,8.6862915 6,12 C6,15.3137085 8.6862915,18 12,18.0000034 L12,5.99999664 Z"
            fill="#000000"
            fillRule="nonzero"
          />
        </g>
      </svg>
    </span>
  );
};

export default Theme;
