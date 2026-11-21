# Checklist anti « site fait par IA »

Synthèse d'une recherche (nov. 2026) sur ce qui trahit un site généré par IA, d'après designers, développeurs et analyses de commentaires Reddit / Hacker News. À relire avant chaque mise en ligne.

## Ce que le site actuel coche déjà (à corriger)

- Fond crème + rouge/vert sapin + police système : le combo « crème + serif + vert forêt » est aujourd'hui l'un des signaux les plus cités.
- Hero centré, puis grille de cartes arrondies identiques.
- Cartes avec un liseré de couleur (bordure haute colorée) : signalé comme presque aussi fiable que les tirets cadratins.
- Hover `translateY(-3px)` sur chaque carte.
- Copy générique (« La boutique déco de Noël », « Cinq rayons d'idées sélectionnées… »).

## Les tics à bannir

### Typographie
- Inter / Roboto / Geist / police système partout, une seule police pour tout.
- Échelle de tailles Tailwind par défaut (12/14/16/18/24/30/36/48/60/72) au lieu d'une échelle à ratio.
- Un seul mot du titre mis en couleur, en italique ou en dégradé.
- Petits labels en MAJUSCULES espacées au-dessus de chaque titre (eyebrows).
- Texte en dégradé (`bg-clip-text`).

### Couleurs
- Violet / indigo, dégradé violet → bleu.
- Crème `#F4F1EA`-ish + serif + accent terracotta ou vert forêt.
- Quasi-noir teinté (`#0B0B0B`, `#111`) + un seul accent acide.
- Lueurs néon (`box-shadow 0 0 40px`) sur fond sombre.

### Mise en page et composants
- Hero centré + 3 cartes + CTA + footer.
- Tout dans des cartes, des cartes dans des cartes.
- Même `border-radius` partout, boutons en pilule partout.
- Même ombre grise douce sous chaque bloc.
- Numérotation 01 / 02 / 03 alors que le contenu n'est pas une séquence.
- Méta-textes joints par des points médians (A · B · C), flèches « → » ajoutées aux liens.
- Emojis utilisés comme icônes.

### Motion
- `fade-up` sur chaque section, `scale(1.05)` au survol de chaque carte.
- Animations partout sans intention ; scrolljacking gratuit.
- Règle : une ou deux idées de mouvement choisies, bien rythmées, qui servent le contenu.

### Rédaction
- « Transformez », « Sublimez », « Découvrez », « Libérez », « Sans effort », « Que vous soyez X, Y ou Z… », « Plus qu'un simple… ».
- Phrases qui vendent au lieu de dire ce que c'est. Abus de tirets cadratins.
- Règle : phrases courtes, concrètes, au vocabulaire de l'acheteur (taille du sapin, longueur de guirlande, intérieur/extérieur).

## Principe directeur

Les tics sont des **défauts non choisis**. Chaque couleur, police, arrondi et animation doit pouvoir se justifier par le sujet (Noël, vitrines, décoration), pas par « c'est propre ».

## Sources

- [Unslop UI — tells issus de 3,2 M de posts Reddit](https://claudecodehq.com/playbooks/unslop-ui)
- [Why every AI-generated template looks the same — DEV](https://dev.to/binbreeze/why-every-ai-generated-template-looks-the-same-and-how-im-fighting-it-3lo2)
- [7 Signs a UI Has Been Vibe Coded — The Fountain Institute](https://www.thefountaininstitute.com/blog/signs-vibe-coded-ui)
- [How to detect AI slop in your design — ux-skill](https://github.com/Laith0003/ux-skill/wiki/How-to-detect-AI-slop-in-your-design)
- [How to avoid that vibe coded look — Robots on Payroll](https://robotsonpayroll.substack.com/p/how-to-avoid-that-vibe-coded-look)
- [Design slop — Gigazine](https://www.gigazine.net/gsc_news/en/20260423-design-slop)
- [How to edit AI website copy — The Admin Bar](https://theadminbar.com/how-to-edit-ai-website-copy/)
