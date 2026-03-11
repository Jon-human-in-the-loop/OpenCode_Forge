# OpenCode One-Click Installer - Ideas de Diseño

## Contexto
Una web app que permite configurar e instalar OpenCode con las mejores skills, plugins, agentes, MCP servers y configuraciones pre-seleccionadas. Genera un script de instalación personalizado.

---

<response>
<text>

## Idea 1: Terminal Noir — Estética de Terminal Retro-Futurista

**Design Movement**: Retrofuturismo digital + estética hacker/terminal
**Core Principles**:
1. La interfaz emula una terminal de comandos sofisticada con toques modernos
2. Monocromático con acentos de verde fosforescente (estilo Matrix/CRT)
3. Información densa pero legible, como un dashboard de operaciones
4. Sensación de "poder" y control total

**Color Philosophy**: Fondo negro profundo (#0a0a0a) con texto verde fosforescente (#00ff41) como acento primario, gris carbón para superficies elevadas, y ámbar (#ffb000) para warnings/highlights. La paleta evoca pantallas CRT y terminales de los 80s pero con refinamiento moderno.

**Layout Paradigm**: Layout vertical tipo "terminal flow" — un panel principal central estrecho (max 800px) que simula una ventana de terminal, con secciones colapsables tipo acordeón para cada categoría (Skills, Plugins, MCP Servers, Agents). Sidebar izquierdo con "tree view" de la configuración.

**Signature Elements**:
1. Cursor parpadeante animado en el header
2. Efecto de "typing" para los textos descriptivos
3. Bordes con efecto scanline sutil

**Interaction Philosophy**: Cada selección se refleja en tiempo real en un "preview" de terminal que muestra el script generado. Toggle switches estilizados como [ON]/[OFF] de terminal.

**Animation**: Transiciones con efecto de "glitch" sutil, texto que aparece con efecto typewriter, elementos que entran con fade-in desde la izquierda como líneas de terminal.

**Typography System**: JetBrains Mono para todo el contenido técnico, Space Grotesk para headings. Monospace dominante.

</text>
<probability>0.07</probability>
</response>

---

<response>
<text>

## Idea 2: Blueprint Builder — Estética de Planos Técnicos

**Design Movement**: Diseño industrial / Blueprint engineering
**Core Principles**:
1. La interfaz se siente como un plano de ingeniería interactivo
2. Grid visible como papel milimetrado de fondo
3. Componentes conectados visualmente como un diagrama de flujo
4. Precisión y claridad técnica

**Color Philosophy**: Fondo azul oscuro profundo (#0d1b2a) evocando papel de planos, con líneas blancas/cyan claras (#e0f7fa) para el grid y contenido. Acentos en naranja cálido (#ff6d00) para CTAs y elementos interactivos. El azul transmite confianza técnica, el naranja urgencia de acción.

**Layout Paradigm**: Layout de "blueprint" con grid visible de fondo. Las secciones son "módulos" conectados por líneas punteadas animadas. El flujo va de arriba a abajo: Selección de Proveedor → Skills → Plugins → MCP Servers → Agents → Generar Script. Cada módulo es una "estación" en el plano.

**Signature Elements**:
1. Grid de puntos de fondo que reacciona al scroll
2. Líneas de conexión animadas entre módulos seleccionados
3. Badges con estilo de "stamp" técnico (RECOMMENDED, PRO, ESSENTIAL)

**Interaction Philosophy**: Drag-and-drop de componentes al "plano de instalación". Hover revela especificaciones técnicas como un tooltip de ingeniería. El script final se presenta como un "documento técnico" exportable.

**Animation**: Líneas que se dibujan progresivamente conectando módulos, elementos que se "imprimen" en el plano con efecto de fade-in + scale, progress bar estilo blueprint.

**Typography System**: Space Mono para datos técnicos y código, DM Sans para texto descriptivo. Jerarquía clara con tamaños contrastantes.

</text>
<probability>0.05</probability>
</response>

---

<response>
<text>

## Idea 3: Neon Forge — Estética Cyberpunk Minimalista

**Design Movement**: Cyberpunk minimalista / Neon brutalism
**Core Principles**:
1. Fondo oscuro con acentos de neón vibrantes pero controlados
2. Cards con bordes brillantes que flotan sobre fondos profundos
3. Sensación de "forjar" tu configuración pieza por pieza
4. Contraste extremo entre oscuridad y luz

**Color Philosophy**: Negro absoluto (#000000) de fondo con gradientes sutiles a gris oscuro (#111). Acento primario en cyan eléctrico (#06b6d4) y magenta (#d946ef) como secundario. Los neones no son decorativos sino funcionales: cyan = seleccionado/activo, magenta = destacado/recomendado. Blanco puro para texto principal.

**Layout Paradigm**: Layout asimétrico con panel izquierdo (40%) mostrando categorías como tabs verticales con iconos neón, y panel derecho (60%) mostrando las opciones en grid de cards. Footer fijo con el "forge bar" — una barra de progreso que muestra cuántos componentes has seleccionado y el botón de generar script.

**Signature Elements**:
1. Glow effect en bordes de cards seleccionadas (box-shadow con color neón)
2. Partículas flotantes sutiles en el background
3. "Forge bar" inferior con contador animado y efecto de pulso

**Interaction Philosophy**: Cards que se "encienden" al seleccionarlas con glow progresivo. Hover produce un brillo sutil. El script generado aparece en un modal con efecto de "materialización" desde partículas.

**Animation**: Glow pulsante en elementos activos, transiciones con ease-out suaves, cards que entran con stagger animation, contador que incrementa con spring physics.

**Typography System**: Geist Sans para UI general, Geist Mono para código y datos técnicos. Pesos extremos: 300 para body, 800 para headings.

</text>
<probability>0.08</probability>
</response>
