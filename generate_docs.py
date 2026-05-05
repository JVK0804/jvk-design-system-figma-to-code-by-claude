from fpdf import FPDF
from fpdf.enums import XPos, YPos

# Design system colours
CREAM         = (232, 228, 217)
CREAM_BRIGHT  = (245, 242, 235)
CREAM_SHADOW  = (212, 207, 191)
TEAL          = (14, 116, 144)
TEAL_VOLT     = (34, 184, 207)
TEAL_PHOSPHOR = (165, 243, 252)
INK           = (28, 26, 20)
INK_MUTED     = (90, 86, 72)
INK_DISABLED  = (154, 148, 136)


class PDF(FPDF):
    def header(self):
        if self.page_no() > 1:
            self.set_font('Helvetica', 'I', 7.5)
            self.set_text_color(*INK_DISABLED)
            self.cell(0, 6,
                      'Kaushik JV -- Design System v2  |  Zillennial Bridge | Heritage Cream x Cerulean Teal',
                      new_x=XPos.LMARGIN, new_y=YPos.NEXT)
            self.set_draw_color(*CREAM_SHADOW)
            self.line(self.l_margin, self.get_y(), self.w - self.r_margin, self.get_y())
            self.ln(4)

    def footer(self):
        self.set_y(-14)
        self.set_draw_color(*CREAM_SHADOW)
        self.line(self.l_margin, self.get_y(), self.w - self.r_margin, self.get_y())
        self.ln(2)
        self.set_font('Helvetica', '', 7.5)
        self.set_text_color(*INK_DISABLED)
        self.cell(0, 6, f'Page {self.page_no()}', align='C')

    def section_title(self, num, title):
        self.ln(6)
        self.set_font('Helvetica', 'B', 16)
        self.set_text_color(*TEAL)
        self.cell(0, 10, f'{num} -- {title}', new_x=XPos.LMARGIN, new_y=YPos.NEXT)
        self.set_draw_color(*TEAL)
        self.line(self.l_margin, self.get_y(), self.w - self.r_margin, self.get_y())
        self.ln(6)
        self.set_text_color(*INK)

    def body(self, text):
        self.set_font('Helvetica', '', 10)
        self.set_text_color(*INK_MUTED)
        self.multi_cell(0, 6, text, new_x=XPos.LMARGIN, new_y=YPos.NEXT)
        self.ln(3)

    def label(self, text):
        self.ln(2)
        self.set_font('Helvetica', 'B', 8)
        self.set_text_color(*INK_DISABLED)
        self.cell(0, 5, text.upper(), new_x=XPos.LMARGIN, new_y=YPos.NEXT)
        self.ln(2)

    def code_block(self, code):
        x, y = self.l_margin, self.get_y()
        lines = code.strip().split('\n')
        h = len(lines) * 5.5 + 8
        self.set_fill_color(*CREAM_BRIGHT)
        self.set_draw_color(*CREAM_SHADOW)
        self.rect(x, y, self.w - self.l_margin - self.r_margin, h, 'DF')
        self.set_xy(x + 4, y + 4)
        self.set_font('Courier', '', 8)
        self.set_text_color(*INK)
        for line in lines:
            self.cell(0, 5.5, line, new_x=XPos.LMARGIN, new_y=YPos.NEXT)
        self.ln(6)

    def color_swatch(self, token, hex_val, rgb_val, usage):
        x, y = self.l_margin, self.get_y()
        self.set_fill_color(*rgb_val)
        self.set_draw_color(*CREAM_SHADOW)
        self.rect(x, y, 18, 10, 'DF')
        self.set_xy(x + 22, y + 1)
        self.set_font('Helvetica', 'B', 9)
        self.set_text_color(*INK)
        self.cell(65, 5, token, new_x=XPos.RIGHT, new_y=YPos.TOP)
        self.set_font('Helvetica', '', 8.5)
        self.set_text_color(*TEAL)
        self.cell(40, 5, hex_val, new_x=XPos.RIGHT, new_y=YPos.TOP)
        self.set_font('Helvetica', 'I', 8)
        self.set_text_color(*INK_MUTED)
        self.cell(0, 5, usage, new_x=XPos.LMARGIN, new_y=YPos.NEXT)
        self.ln(6)

    def table_header(self, cols, widths):
        self.set_fill_color(*TEAL)
        self.set_text_color(*CREAM_BRIGHT)
        self.set_font('Helvetica', 'B', 9)
        for col, w in zip(cols, widths):
            self.cell(w, 7, col, border=0, fill=True, align='L',
                      new_x=XPos.RIGHT, new_y=YPos.TOP)
        self.ln()
        self.set_text_color(*INK)

    def table_row(self, values, widths, alt=False):
        self.set_fill_color(*(CREAM_BRIGHT if alt else (255, 255, 255)))
        self.set_font('Helvetica', '', 9)
        self.set_text_color(*INK_MUTED)
        for val, w in zip(values, widths):
            self.cell(w, 6.5, str(val), border=0, fill=True, align='L',
                      new_x=XPos.RIGHT, new_y=YPos.TOP)
        self.ln()


pdf = PDF('P', 'mm', 'A4')
pdf.set_margins(20, 20, 20)
pdf.set_auto_page_break(auto=True, margin=18)

# -- COVER PAGE -------------------------------------------------
pdf.add_page()

pdf.set_fill_color(*CREAM)
pdf.rect(0, 0, 210, 297, 'F')
pdf.set_fill_color(*TEAL)
pdf.rect(0, 0, 8, 297, 'F')

pdf.set_xy(20, 55)
pdf.set_font('Helvetica', 'B', 34)
pdf.set_text_color(*INK)
pdf.multi_cell(0, 15, 'Kaushik JV\nDesign System v2', new_x=XPos.LMARGIN, new_y=YPos.NEXT)

pdf.ln(4)
pdf.set_font('Helvetica', 'I', 13)
pdf.set_text_color(*TEAL)
pdf.cell(0, 8, 'Zillennial Bridge | Heritage Cream x Cerulean Teal',
         new_x=XPos.LMARGIN, new_y=YPos.NEXT)

pdf.ln(6)
pdf.set_font('Helvetica', '', 10.5)
pdf.set_text_color(*INK_MUTED)
pdf.multi_cell(0, 7,
    'A design engineering system that bridges Tactile Nostalgia (1995-2005)\n'
    "with Apple's 2026 Liquid Glass minimalist standards. Built for a portfolio\n"
    'that signals dual fluency in design craft and front-end engineering.',
    new_x=XPos.LMARGIN, new_y=YPos.NEXT)

pdf.ln(10)
pdf.set_fill_color(*TEAL)
pdf.set_text_color(*CREAM_BRIGHT)
pdf.set_font('Helvetica', 'B', 9)
pdf.cell(34, 8, '  VERSION 2.0  ', fill=True, align='C',
         new_x=XPos.LMARGIN, new_y=YPos.NEXT)

pdf.ln(14)
pdf.set_draw_color(*CREAM_SHADOW)
pdf.line(20, pdf.get_y(), 190, pdf.get_y())
pdf.ln(10)

pdf.set_font('Helvetica', 'B', 8.5)
pdf.set_text_color(*INK_DISABLED)
pdf.cell(0, 5, 'TECH STACK', new_x=XPos.LMARGIN, new_y=YPos.NEXT)
pdf.ln(2)

stack = [
    ('Framework',  'Next.js 14 (App Router) + TypeScript'),
    ('Styling',    'CSS Custom Properties + Tailwind CSS'),
    ('Animation',  'Framer Motion -- Spring physics'),
    ('Fonts',      'Fraunces  Playfair Display  DM Serif Display  Space Mono'),
    ('Tokens',     'W3C Design Tokens format (tokens.json)'),
    ('Repository', 'github.com/JVK0804/jvk-design-system-figma-to-code-by-claude'),
]
for lbl, val in stack:
    pdf.set_font('Helvetica', 'B', 9)
    pdf.set_text_color(*INK)
    pdf.cell(38, 6.5, lbl, new_x=XPos.RIGHT, new_y=YPos.TOP)
    pdf.set_font('Helvetica', '', 9)
    pdf.set_text_color(*INK_MUTED)
    pdf.cell(0, 6.5, val, new_x=XPos.LMARGIN, new_y=YPos.NEXT)

pdf.ln(10)
pdf.set_draw_color(*CREAM_SHADOW)
pdf.line(20, pdf.get_y(), 190, pdf.get_y())
pdf.ln(6)

pdf.set_font('Helvetica', 'B', 8.5)
pdf.set_text_color(*INK_DISABLED)
pdf.cell(0, 5, 'CONTENTS', new_x=XPos.LMARGIN, new_y=YPos.NEXT)
pdf.ln(2)
toc = [
    ('01', 'Design Philosophy'),
    ('02', 'Colour Tokens'),
    ('03', 'Typography Scale'),
    ('04', 'Spacing System'),
    ('05', 'Border Radius'),
    ('06', 'Glass Card Component'),
    ('07', 'Haptic Spring'),
    ('08', 'Button Variants'),
    ('09', 'Tags & Badges'),
    ('10', 'File Structure & Usage'),
    ('11', 'System Status'),
]
for num, title in toc:
    pdf.set_font('Helvetica', 'B', 9)
    pdf.set_text_color(*TEAL)
    pdf.cell(12, 6, num, new_x=XPos.RIGHT, new_y=YPos.TOP)
    pdf.set_font('Helvetica', '', 9)
    pdf.set_text_color(*INK_MUTED)
    pdf.cell(0, 6, '  ' + title, new_x=XPos.LMARGIN, new_y=YPos.NEXT)

pdf.set_y(-28)
pdf.set_font('Helvetica', '', 7.5)
pdf.set_text_color(*INK_DISABLED)
pdf.cell(0, 5,
    'Generated from Figma Design System v2  |  Component code produced alongside Figma build by Claude AI',
    align='C', new_x=XPos.LMARGIN, new_y=YPos.NEXT)

# -- 01 DESIGN PHILOSOPHY ---------------------------------------
pdf.add_page()
pdf.section_title('01', 'Design Philosophy')
pdf.body(
    'The design system operates on three core principles that govern every decision '
    '-- from colour selection to animation timing. Each principle is load-bearing; '
    'removing any one collapses the aesthetic contract.'
)

principles = [
    ('Tactile Skeuomorphism 2.0',
     'Modern glassmorphism mimics the weight and texture of physical hardware -- translucent '
     'plastics, CRT-style glows, grain on every surface. Physical weight is achieved through '
     'layered translucency, not literal texture mapping.'),
    ('Intentional Friction',
     'Interactions have a physical press phase (30ms compress to scale(0.955)) and a '
     'spring-return (280ms overshoot to scale(1.018)). Mechanical feel, fluid 120Hz execution. '
     'The "click-clack" is a design decision, not an animation afterthought.'),
    ('The Hybrid Palette',
     'Heritage Cream base (#E8E4D9) evoking 90s computer beige, paired with High-Voltage '
     'Cerulean Teal (#0E7490) evoking fiber-optic infrastructure. Two eras on one surface.'),
]

for i, (title, desc) in enumerate(principles, 1):
    x, y = pdf.l_margin, pdf.get_y()
    pdf.set_fill_color(*TEAL)
    pdf.rect(x, y, 8, 8, 'F')
    pdf.set_xy(x + 2, y + 1.5)
    pdf.set_font('Helvetica', 'B', 8)
    pdf.set_text_color(*CREAM_BRIGHT)
    pdf.cell(4, 5, str(i), align='C', new_x=XPos.RIGHT, new_y=YPos.TOP)
    pdf.set_xy(x + 12, y)
    pdf.set_font('Helvetica', 'B', 11)
    pdf.set_text_color(*INK)
    pdf.cell(0, 8, title, new_x=XPos.LMARGIN, new_y=YPos.NEXT)
    pdf.set_x(x + 12)
    pdf.set_font('Helvetica', '', 9.5)
    pdf.set_text_color(*INK_MUTED)
    pdf.multi_cell(0, 6, desc, new_x=XPos.LMARGIN, new_y=YPos.NEXT)
    pdf.ln(5)

# -- 02 COLOUR TOKENS -------------------------------------------
pdf.section_title('02', 'Colour Tokens')
pdf.body(
    'All backgrounds carry a warm brown undertone. Never substitute with neutral or cool greys '
    '-- this is what makes the system feel human rather than clinical. The accent (#0E7490) '
    'appears on one semantic layer only: interactive elements.'
)

groups = [
    ('Base -- Heritage Cream', [
        ('--color-heritage-cream', '#E8E4D9', (232,228,217), 'Page base, scene background'),
        ('--color-cream-bright',   '#F5F2EB', (245,242,235), 'Card highlight, specular layer'),
        ('--color-cream-shadow',   '#D4CFBF', (212,207,191), 'Depth, dividers, borders'),
    ]),
    ('Accent -- Cerulean Teal', [
        ('--color-primary',          '#0E7490', (14,116,144),  'Primary interactive, CTAs'),
        ('--color-primary-hover',    '#22B8CF', (34,184,207),  'Hover states, CRT glow'),
        ('--color-primary-phosphor', '#A5F3FC', (165,243,252), 'CRT terminal text on dark'),
        ('--color-primary-subtle',   'rgba(14,116,144,0.10)', (225,240,242), 'Tag fills, badge backgrounds'),
        ('--color-primary-border',   'rgba(14,116,144,0.28)', (198,223,229), 'Tag and badge borders'),
    ]),
    ('Ink -- Text Ramp', [
        ('--color-ink',          '#1C1A14', (28,26,20),    'Primary text on cream'),
        ('--color-ink-muted',    '#5A5648', (90,86,72),    'Body copy, descriptions'),
        ('--color-ink-disabled', '#9A9488', (154,148,136), 'Captions, metadata, read-time'),
    ]),
]

for group_name, colors in groups:
    pdf.label(group_name)
    for token, hex_val, rgb_val, usage in colors:
        pdf.color_swatch(token, hex_val, rgb_val, usage)

pdf.label('Contrast Ratios (on #E8E4D9)')
widths = [52, 22, 36, 60]
pdf.table_header(['Colour', 'Ratio', 'WCAG', 'Role'], widths)
for i, row in enumerate([
    ('#0E7490 on cream', '4.8:1', 'AA',  'Body text safe'),
    ('#1C1A14 on cream', '12.1:1','AAA', 'Primary text'),
    ('#5A5648 on cream', '5.2:1', 'AA',  'Body copy safe'),
]):
    pdf.table_row(row, widths, alt=bool(i % 2))

# -- 03 TYPOGRAPHY ----------------------------------------------
pdf.section_title('03', 'Typography Scale')
pdf.body(
    'Display and H1 use weight 200 (Extra Light). This reads as open and approachable rather '
    'than cold. Weight 500 is reserved for structural work: H3, labels, and CTAs.'
)

pdf.label('Font Families')
fw = [44, 46, 38, 42]
pdf.table_header(['Token', 'Family', 'Role', 'Source'], fw)
for i, row in enumerate([
    ('--font-display',        'SF Pro Display',    'Hero/H1 sans',         'System'),
    ('--font-body',           'SF Pro Text',       'H2 to body sans',      'System'),
    ('--font-mono',           'SF Mono',           'Terminal labels',      'System'),
    ('--font-mono-space',     'Space Mono',        'CRT labels, mono',     'Google Fonts'),
    ('--font-serif-fraunces', 'Fraunces',          'Retro-futurist display','Google Fonts'),
    ('--font-serif-playfair', 'Playfair Display',  'Editorial display',    'Google Fonts'),
    ('--font-serif-dm',       'DM Serif Display',  'Tech-editorial display','Google Fonts'),
]):
    pdf.table_row(row, fw, alt=bool(i % 2))

pdf.ln(5)
pdf.label('Type Scale')
tw = [26, 16, 20, 24, 22, 62]
pdf.table_header(['Name', 'Size', 'Weight', 'Tracking', 'Line-H', 'Usage'], tw)
for i, row in enumerate([
    ('Display',  '80px', '200', '-0.05em', '1.0',  'Hero headline'),
    ('H1',       '52px', '200', '-0.04em', '1.1',  'Section hero'),
    ('H2',       '28px', '400', '-0.03em', '1.2',  'Section titles'),
    ('H3',       '20px', '500', '-0.02em', '1.3',  'Card titles'),
    ('Body',     '16px', '400', '-0.01em', '1.75', 'Body copy'),
    ('Caption',  '13px', '400', '0em',     '1.5',  'Metadata, read-time'),
    ('Label',    '11px', '500', '+0.08em', '1.4',  'UI labels (CAPS)'),
    ('Terminal', '13px', '400', '+0.12em', '1.6',  'CRT terminal text (CAPS)'),
]):
    pdf.table_row(row, tw, alt=bool(i % 2))

# -- 04 SPACING ------------------------------------------------
pdf.section_title('04', 'Spacing System')
pdf.body('Base unit: 4px. All spacing values are multiples of 4. Never use arbitrary values outside this scale.')

sw = [36, 20, 114]
pdf.table_header(['Token', 'Value', 'Semantic Role'], sw)
for i, row in enumerate([
    ('--space-1',  '4px',   'Icon gaps, micro spacing'),
    ('--space-2',  '8px',   'Inline elements'),
    ('--space-3',  '12px',  'Tight stacks'),
    ('--space-4',  '16px',  'Component padding'),
    ('--space-6',  '24px',  'Card internal spacing'),
    ('--space-8',  '32px',  'Between components'),
    ('--space-12', '48px',  'Section gap (mobile)'),
    ('--space-20', '80px',  'Section gap (desktop)'),
    ('--space-28', '112px', 'Hero breathing room'),
]):
    pdf.table_row(row, sw, alt=bool(i % 2))

# -- 05 BORDER RADIUS ------------------------------------------
pdf.section_title('05', 'Border Radius')
pdf.body(
    'Concentric Apple logic: outer container radius is always larger than the inner element '
    'radius. This creates a visually consistent layered depth.'
)

rw = [38, 20, 54, 58]
pdf.table_header(['Token', 'Value', 'Usage', 'Component'], rw)
for i, row in enumerate([
    ('--radius-sm',   '4px',   'Tags, chips, badges',     'Tag component'),
    ('--radius-md',   '8px',   'Buttons, inputs',         'HapticButton'),
    ('--radius-lg',   '14px',  'Project cards',           'GlassCard'),
    ('--radius-xl',   '20px',  'Modals, scene frames',    'Scene container'),
    ('--radius-pill', '100px', 'Label pills, CTA buttons','Pill variant'),
]):
    pdf.table_row(row, rw, alt=bool(i % 2))

# -- 06 GLASS CARD ---------------------------------------------
pdf.section_title('06', 'Glass Card Component')
pdf.body(
    'The project card is a five-layer composition. Order matters precisely. '
    'The grain lives on the scene, not the card -- this makes the grain read as the world\'s '
    'texture, so the card appears to float on a physical surface rather than being printed into it.'
)

pdf.label('Layer Anatomy')
lw = [8, 36, 126]
pdf.table_header(['#', 'Layer', 'Description'], lw)
for i, row in enumerate([
    ('1', 'Scene Grain',       'SVG feTurbulence on scene -- zero HTTP requests, ~0.4kb inline'),
    ('2', 'Heritage Cream',    '#E8E4D9 base scene background -- warm brown undertone always present'),
    ('3', 'Glass Card',        'rgba(232,228,217,0.45) + backdrop-filter: blur(12px)'),
    ('4', 'Specular ::before', 'linear-gradient(135deg, white/28%, white/4%) -- light from top-left'),
    ('5', 'Glint ::after',     '1px top edge: transparent -> white/80% -> transparent'),
    ('6', 'Content',           'z-index: 20, relative positioning -- all children go here'),
]):
    pdf.table_row(row, lw, alt=bool(i % 2))

pdf.ln(4)
pdf.label('GlassCard.tsx -- Usage')
pdf.code_block('''\
import { GlassCard } from './components/GlassCard'

// Basic
<GlassCard>
  <h3>Project Title</h3>
  <p>Description</p>
</GlassCard>

// With grain owned by card (if no parent scene)
<GlassCard withGrain>
  <h3>Project Title</h3>
</GlassCard>''')

pdf.label('CSS Custom Properties Used')
pdf.code_block('''\
--color-glass-bg:            rgba(232, 228, 217, 0.45)
--color-glass-specular-from: rgba(255, 255, 255, 0.28)
--color-glass-specular-to:   rgba(255, 255, 255, 0.04)
--color-glass-glint:         rgba(255, 255, 255, 0.80)
--border-glass:              1px solid rgba(255, 255, 255, 0.55)
--blur-glass:                blur(12px)''')

# -- 07 HAPTIC SPRING ------------------------------------------
pdf.section_title('07', 'Haptic Spring -- Click-Clack')
pdf.body(
    'The mechanical button interaction mimics the physical sensation of pressing a tactile '
    'switch. Two phases, each with a distinct timing and easing curve. Always bind to '
    'onPointerDown, not onClick -- the 60-80ms difference is the entire tactile illusion.'
)

pdf.label('Timing Breakdown')
hw = [30, 24, 34, 82]
pdf.table_header(['Phase', 'Duration', 'Transform', 'Easing'], hw)
for i, row in enumerate([
    ('Press (compress)', '30ms',  'scale(0.955)',     'cubic-bezier(0.4, 0, 1, 1) -- hard ease-in'),
    ('Hold',             '20ms',  'static',           '--'),
    ('Spring return',    '280ms', 'scale(1.018->1.0)','Spring: stiffness 520, damping 22, mass 0.6'),
    ('Settle',           '50ms',  'scale(1.0)',       'micro-damp'),
]):
    pdf.table_row(row, hw, alt=bool(i % 2))

pdf.ln(4)
pdf.label('useHapticPress.ts -- Hook Implementation')
pdf.code_block('''\
const springConfig = {
  type: 'spring',
  stiffness: 520,  // high -- gives snap-back authority
  damping:   22,   // low  -- allows 1.018 overshoot (the "clack")
  mass:       0.6  // keeps total duration under 320ms for 120Hz
}

export function useHapticPress() {
  const controls = useAnimation()

  const onPointerDown = async () => {
    await controls.start({
      scale: 0.955,
      transition: { duration: 0.03, ease: [0.4, 0, 1, 1] }
    })
  }
  const onPointerUp = async () => {
    await controls.start({ scale: 1.018, transition: springConfig })
    await controls.start({ scale: 1, transition: { duration: 0.05 } })
  }

  return { controls, onPointerDown, onPointerUp }
}''')

# -- 08 BUTTONS ------------------------------------------------
pdf.section_title('08', 'Button Variants')
pdf.body(
    'All six button states share the same HapticButton component, controlled via the variant '
    'prop. The haptic spring is disabled when variant="disabled".'
)

bw = [28, 34, 26, 28, 54]
pdf.table_header(['Variant', 'Background', 'Text', 'Border', 'Notes'], bw)
for i, row in enumerate([
    ('primary',   '#0E7490',     '#F5F2EB', 'none',     'Default CTA -- radius-md (8px)'),
    ('pill',      '#0E7490',     '#F5F2EB', 'none',     'Full pill -- radius-pill (100px)'),
    ('hover',     '#22B8CF',     '#F5F2EB', 'none',     'Active/hover state of primary'),
    ('secondary', 'transparent', '#0E7490', '#0E7490',  'Outlined -- 1px solid teal'),
    ('ghost',     'transparent', '#0E7490', 'none',     'No border, subtle hover tint'),
    ('disabled',  '#D4CFBF',     '#9A9488', 'none',     'cursor: not-allowed, opacity 0.7'),
]):
    pdf.table_row(row, bw, alt=bool(i % 2))

pdf.ln(4)
pdf.label('Usage')
pdf.code_block('''\
import { HapticButton } from './components/HapticButton'

<HapticButton variant="primary">View Project</HapticButton>
<HapticButton variant="pill">Get in Touch</HapticButton>
<HapticButton variant="secondary">Learn More</HapticButton>
<HapticButton variant="ghost">See All Work</HapticButton>
<HapticButton variant="disabled">Coming Soon</HapticButton>''')

# -- 09 TAGS & BADGES ------------------------------------------
pdf.section_title('09', 'Tags & Badges')
pdf.body(
    'Tags (size="md") and Badges (size="sm") share the same Tag component. '
    'Both use --color-primary-subtle fill (teal 10%) and --color-primary-border stroke (teal 28%). '
    'Badges add uppercase + letter-spacing for a stamp-like label feel.'
)

tgw = [18, 18, 18, 22, 94]
pdf.table_header(['Size', 'Height', 'Font', 'Padding', 'Notes'], tgw)
for i, row in enumerate([
    ('md', '28px', '13px', '0 12px', 'Normal case -- no forced letter-spacing'),
    ('sm', '22px', '11px', '0 10px', 'Uppercase -- +1.5px letter-spacing (badge style)'),
]):
    pdf.table_row(row, tgw, alt=bool(i % 2))

pdf.ln(4)
pdf.label('Usage')
pdf.code_block('''\
import { Tag } from './components/Tag'

<Tag size="md">Design Systems</Tag>
<Tag size="md">Zillennial</Tag>
<Tag size="sm">NEW</Tag>
<Tag size="sm">LOCKED</Tag>
<Tag size="sm">Phase 1</Tag>''')

# -- 10 FILE STRUCTURE -----------------------------------------
pdf.section_title('10', 'File Structure & Usage')

pdf.label('Directory Tree')
pdf.code_block('''\
figma design system code/
|-- styles/
|   `-- tokens.css          <- CSS custom properties (source of truth)
|-- tokens/
|   `-- tokens.json         <- W3C Design Tokens (Figma + Tailwind)
|-- hooks/
|   `-- useHapticPress.ts   <- Framer Motion spring hook
|-- components/
|   |-- GlassCard.tsx       <- Five-layer glass card primitive
|   |-- GrainOverlay.tsx    <- Performance-safe SVG grain layer
|   |-- HapticButton.tsx    <- Button with 6 states via variant prop
|   `-- Tag.tsx             <- Tag (md 28px) and Badge (sm 22px)
`-- tailwind.config.ts      <- Tailwind extended with all design tokens''')

pdf.label('Implementation Order')
for step in [
    '1.  Drop tokens.css into /styles/ and import in app/globals.css',
    '2.  Paste tailwind.config.ts theme.extend into your tailwind.config.js',
    '3.  Build GrainOverlay -- it wraps everything else in the scene',
    '4.  Build GlassCard with grain wired in via withGrain prop',
    '5.  Build useHapticPress hook',
    '6.  Build HapticButton wrapper using the hook',
    '7.  Build the Project Card using GlassCard + HapticButton',
    '8.  Build the navigation shell with --blur-nav vibrancy',
]:
    pdf.set_font('Helvetica', '', 9.5)
    pdf.set_text_color(*INK_MUTED)
    pdf.cell(0, 6.5, step, new_x=XPos.LMARGIN, new_y=YPos.NEXT)

# -- 11 SYSTEM STATUS ------------------------------------------
pdf.section_title('11', 'System Status')

stw = [90, 80]
pdf.table_header(['Layer', 'Status'], stw)
status_rows = [
    ('Colour tokens',                'Locked'),
    ('Typography scale -- SF Pro',    'Locked'),
    ('Typography scale -- Serif v1.1','Locked'),
    ('Spacing grid',                 'Locked'),
    ('Border radius',                'Locked'),
    ('Glass card anatomy',           'Locked'),
    ('Haptic spring values',         'Locked'),
    ('tokens.css',                   'v2 complete'),
    ('tokens.json',                  'v2 complete'),
    ('GlassCard.tsx',                'v2 complete'),
    ('HapticButton.tsx',             'v2 complete'),
    ('useHapticPress.ts',            'v2 complete'),
    ('GrainOverlay.tsx',             'v2 complete'),
    ('Tag.tsx',                      'v2 complete'),
    ('tailwind.config.ts',           'v2 complete'),
    ('Navigation shell',             'Phase 2'),
    ('Full component library',       'Phase 2'),
]
for i, (layer, status) in enumerate(status_rows):
    pdf.set_fill_color(*(CREAM_BRIGHT if i % 2 else (255, 255, 255)))
    pdf.set_font('Helvetica', '', 9)
    pdf.set_text_color(*INK_MUTED)
    pdf.cell(stw[0], 6.5, layer, border=0, fill=True,
             new_x=XPos.RIGHT, new_y=YPos.TOP)
    if 'Locked' in status:
        pdf.set_text_color(*TEAL)
    elif 'complete' in status:
        pdf.set_text_color(22, 101, 52)
    else:
        pdf.set_text_color(*INK_DISABLED)
    pdf.cell(stw[1], 6.5, status, border=0, fill=True,
             new_x=XPos.LMARGIN, new_y=YPos.NEXT)

pdf.ln(8)
pdf.set_font('Helvetica', 'I', 8)
pdf.set_text_color(*INK_DISABLED)
pdf.cell(0, 5,
    'Kaushik JV  |  Design System v2  |  Last updated 2026  |  '
    'Generated from Figma by Claude AI',
    align='C')

out = '/Users/kaushikjv/Desktop/HCI Projects/Claude Code/Portfolio/Design System v2 - Documentation.pdf'
pdf.output(out)
print(f'PDF saved to: {out}')
