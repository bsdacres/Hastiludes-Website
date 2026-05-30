export default function Footer() {
  return (
    <footer class="site-footer" id="contact">
      <div class="site-footer-inner">
        <p class="site-footer-brand">Hastiludes</p>

        <div class="site-footer-navrow">
          <div class="site-footer-links" aria-label="Footer links">
            <a href="/coming-soon">Docs</a>
            <a href="/terms-of-service">Terms</a>
          </div>

          <div class="site-footer-socials" aria-label="Social links">
            <a
              href="https://x.com/hastiludes"
              target="_blank"
              rel="noreferrer"
              aria-label="Follow Hastiludes on X"
              class="social-icon-link"
            >
              <svg viewBox="0 0 1200 1227" aria-hidden="true" focusable="false">
                <path
                  fill="currentColor"
                  d="M714.16 519.284L1160.89 0H1055.06L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.454 750.218L842.672 1226.37H1200L714.137 519.284H714.16ZM569.165 687.828L521.697 619.928L144.011 79.6944H306.615L611.455 515.949L658.923 583.849L1055.11 1150.71H892.506L569.165 687.854V687.828Z"
                />
              </svg>
            </a>
            <a
              href="https://discord.gg/CP3DhrznJz"
              target="_blank"
              rel="noreferrer"
              aria-label="Join Hastiludes on Discord"
              class="social-icon-link"
            >
              <svg viewBox="0 0 127.14 96.36" aria-hidden="true" focusable="false">
                <path
                  fill="currentColor"
                  d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36a77.7,77.7,0,0,0,6.89-11.26A68.42,68.42,0,0,1,28.79,80.1c.91-.66,1.8-1.35,2.66-2.06a75.57,75.57,0,0,0,64.24,0c.87.71,1.76,1.4,2.66,2.06a68.68,68.68,0,0,1-10.83,5,77,77,0,0,0,6.89,11.24A105.25,105.25,0,0,0,126.58,80.2h0C129.22,52.84,122.07,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,59.94,31,52.88s5-12.81,11.44-12.81S54,45.82,53.89,52.88,48.86,65.69,42.45,65.69Zm42.24,0c-6.27,0-11.44-5.75-11.44-12.81S78.29,40.07,84.69,40.07,96.25,45.82,96.13,52.88,91.1,65.69,84.69,65.69Z"
                />
              </svg>
            </a>
          </div>
        </div>

        <p class="site-footer-meta">© {new Date().getFullYear()} Hastiludes. All rights reserved.</p>
      </div>
    </footer>
  );
}