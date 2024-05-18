import { Global } from '@emotion/react';

const Fonts = () => (
	<Global
		styles={`
        @font-face {
            font-family: "Gentium Book Plus";
            font-weight: 400;
            font-variant: normal;
            font-style: normal;
            src: url('/fonts/gentium-book-plus/GentiumBookPlus-Regular.ttf');
          }
        
          @font-face {
            font-family: "Gentium Book Plus";
            font-weight: 400;
            font-variant: normal;
            font-style: italic;
            src: url('/fonts/gentium-book-plus/GentiumBookPlus-Italic.ttf');
          }
        
          @font-face {
            font-family: "Gentium Book Plus";
            font-weight: 700;
            font-variant: normal;
            src: url('/fonts/gentium-book-plus/GentiumBookPlus-Bold.ttf');
          }
        
          @font-face {
            font-family: "Gentium Book Plus";
            font-weight: 700;
            font-style: italic;
            src: url('/fonts/gentium-book-plus/GentiumBookPlus-BoldItalic.ttf');
          }

          @font-face {
            font-family: "Inter";
            font-weight: 500;
            font-style: normal;
            src: url('/fonts/inter/Inter-VariableFont_slnt,wght.ttf');
          }
      `}
	/>
);

export default Fonts;
