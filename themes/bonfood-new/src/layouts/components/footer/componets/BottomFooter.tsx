import Container from "@bonfood-new-src/components/Container";

function BottomFooter() {
  return (
    <Container>
      <div className="flex flex-row w-full justify-between items-center text-sm text-center lg:text-base py-4 md:py-8 text-gray-500 mx-auto pt-12">
        <span className="text-left">
          Все права защищены ©{" "}
          <span className="text-primary-500 hover:text-hover">
            Bonfood Distribution
          </span>
          , 2023
        </span>
        <a
          className="footer__dev flex flex-row shrink-0 text-right space-x-2"
          href="https://init.kz/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="flex justify-between items-center text-sm lg:text-base">
            Разработка сайтов<br></br>Веб-студия
          </div>
          <div className="flex justify-between items-center">
            <svg
              className="footer__logo fill-gray-500 hover:fill-primary-500 h-12"
              xmlns="http://www.w3.org/2000/svg"
              xmlSpace="preserve"
              version="1.1"
              style={{
                shapeRendering: "geometricPrecision",
                textRendering: "geometricPrecision",
                fillRule: "evenodd",
                clipRule: "evenodd",
              }}
              viewBox="0 0 5813.82 4168.45"
            >
              <defs></defs>
              <g id="Слой_x0020_1">
                <metadata id="CorelCorpID_0Corel-Layer"></metadata>
                <path d="M156.71 0l5657.11 0 0 4168.45 -5813.82 0 0 -4168.45 156.71 0zm5343.7 313.41l-5186.99 0 0 3541.62 5186.99 0 0 -3541.62z"></path>
                <path d="M1524.51 1185.97l0 300.25 -355.29 0 0 -300.25 355.29 0zm0 490.41l0 1291.08 -355.29 0 0 -1291.08 355.29 0zm1496.25 1291.08l-360.3 0 0 -753.13c0,-91.74 -15.01,-161.38 -45.04,-208.92 -30.02,-47.54 -88.41,-71.31 -175.14,-71.31 -186.82,0 -280.24,113.43 -280.24,340.29l0 693.08 -352.79 0 0 -1291.08 337.78 0 0 180.14c106.75,-143.45 249.37,-215.17 427.85,-215.17 138.46,0 247.71,40.03 327.78,120.1 80.06,80.07 120.1,194.33 120.1,342.78l0 863.23zm633.03 -1781.49l0 300.25 -355.29 0 0 -300.25 355.29 0zm0 490.41l0 1291.08 -355.29 0 0 -1291.08 355.29 0zm990.83 0l0 240.2 -262.72 0 0 608c0,38.37 0.84,66.31 2.51,83.82 1.66,17.52 7.51,35.45 17.51,53.79 10.01,18.35 25.44,30.44 46.3,36.28 20.85,5.84 50.45,8.76 88.82,8.76 43.37,0 79.23,-1.67 107.59,-5.01l0 270.23c-86.74,6.67 -158.47,10.01 -215.18,10.01 -155.13,0 -260.62,-27.11 -316.51,-81.33 -55.88,-54.2 -83.81,-158.87 -83.81,-314.01l0 -670.56 -215.18 0 0 -240.2 215.18 0 0 -390.33 352.79 0 0 390.33 262.72 0z"></path>
              </g>
            </svg>
          </div>
        </a>
      </div>
    </Container>
  );
}

export default BottomFooter;
