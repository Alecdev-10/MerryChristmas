"""Vague 1 — 48 épingles informationnelles (recettes I1 à I4 du dossier AJagency).

Aucun vocabulaire de vente. Titre : mot-clé exact en tête. Texte sur l'image : 6 mots max.
"""
U = "https://merry-christmas-shop-2026.vercel.app"
FIN = " Le guide complet est dans notre boutique virtuelle de Noël. Lien affilié : nous pouvons toucher une commission."

B_GUIDES = "Guides et astuces déco de Noël"
B_2026 = "Déco de Noël 2026 : idées et tendances"
B_SAPIN = "Sapin de Noël : idées déco"
B_SCANDI = "Déco de Noël scandinave"
B_CHIC = "Noël chic blanc et doré"
B_TABLE = "Déco table de Noël"
B_EXT = "Décoration de Noël extérieur"
B_GUIRL = "Guirlandes lumineuses de Noël"
B_VILLAGE = "Village de Noël lumineux"
B_BOULES = "Boules de Noël rouge et or"

# ─── I1 · Le pas-à-pas (T-GUIDE · #guide-sapin) ─────────────────────────
BASE_STEPS = ["Gonfler chaque branche", "La lumière d'abord", "Ruban en vagues larges", "Grosses boules près du tronc", "Cimier puis jupe"]
I1 = [
    dict(kw="comment décorer son sapin", title="Comment décorer son sapin de Noël : la méthode en 5 étapes", img="Décorer son sapin en 5 étapes", pal="sapin", fill="vert",
         steps=["Gonfler chaque branche", "La lumière d'abord", "Ruban en vagues larges", "Grosses boules près du tronc", "Cimier puis jupe"], tips="Commencez toujours par gonfler les branches une à une, de bas en haut : vingt minutes qui changent tout. Posez ensuite la guirlande, environ 100 LED par tranche de 30 cm, en partant du cœur de chaque branche vers l'extérieur.", board=B_GUIDES),
    dict(kw="comment décorer un sapin blanc", title="Comment décorer un sapin blanc : la méthode en 5 étapes", img="Sapin blanc : 5 étapes", pal="givre", fill="blanc",
         steps=["Gonfler les branches floquées", "Lumière blanc chaud", "Ruban champagne en vagues", "Boules or et argent", "Étoile dorée au sommet"], tips="Sur un sapin blanc ou floqué, misez sur l'or, le champagne et l'argent : le rouge vif durcit vite l'ensemble. Gardez une lumière blanc chaud pour éviter l'effet bleuté en photo, et ajoutez des boules en verre qui accrochent les reflets.", board=B_GUIDES),
    dict(kw="déco sapin étape par étape", title="Déco sapin étape par étape : l'ordre qui change tout", img="L'ordre qui change tout", pal="velours", fill="vert",
         steps=["Choisir trois couleurs", "Ouvrir les branches une à une", "Guirlande du cœur au bout", "Boules du tronc vers le bord", "Reculer et combler les trous"], tips="L'ordre compte plus que les décorations : branches, lumière, ruban, boules, puis cimier. Placez les plus grosses boules à l'intérieur pour donner de la profondeur, et gardez les petites pour combler les trous au bout des branches.", board=B_SAPIN),
    dict(kw="tuto sapin de noël", title="Tuto sapin de Noël : 5 étapes pour un sapin qui a l'air cher", img="Un sapin qui a l'air cher", pal="or", fill="vert",
         steps=["Une palette de deux couleurs", "600 LED pour 180 cm", "Mélanger mat et brillant", "Glisser des branches de pin", "Panier ou caisse au pied"], tips="Un sapin qui a l'air cher tient à deux détails : beaucoup de lumière chaude et deux ou trois couleurs seulement. Mélangez les finitions mates, brillantes et pailletées dans la même teinte pour un rendu riche sans surcharger.", board=B_GUIDES),
    dict(kw="sapin champagne et or", title="Sapin champagne et or : décorer son sapin en 5 étapes", img="Sapin champagne et or", pal="creme", fill="vert",
         steps=["Gonfler chaque branche", "Lumière blanc chaud", "Ruban velours champagne", "Boules or, champagne, crème", "Étoile dorée, jupe crème"], tips="Pour un sapin champagne et or, associez des boules mates champagne, de l'or brillant et quelques touches crème. Un ruban en velours posé en vagues larges relie le tout, et une jupe crème au pied termine l'effet glamour.", board=B_CHIC),
    dict(kw="sapin rouge et or", title="Sapin rouge et or : la méthode en 5 étapes pour le réussir", img="Sapin rouge et or réussi", pal="velours", fill="vert",
         steps=["Gonfler chaque branche", "Guirlande blanc chaud", "Ruban rouge en vagues", "Boules or près du tronc", "Cimier doré, panier au pied"], tips="Le rouge et or reste la palette la plus chaleureuse. Pour éviter l'effet chargé, gardez l'or pour les grosses boules au cœur du sapin et le rouge pour les petites au bord, puis cachez le pied dans un panier en osier.", board=B_SAPIN),
    dict(kw="sapin floqué déco", title="Sapin floqué déco : 5 étapes pour un effet winter wonderland", img="Sapin floqué, effet neige", pal="givre", fill="blanc",
         steps=["Secouer le flocage en trop", "Lumière chaude, très dense", "Ruban blanc ou argent", "Boules verre et argent", "Neige au pied du sapin"], tips="Le sapin floqué demande beaucoup de lumière : prévoyez un peu plus de LED que pour un sapin vert, car le blanc les absorbe. Ajoutez des boules en verre et argent, puis un tapis de neige artificielle au pied pour l'effet winter wonderland.", board=B_SAPIN),
    dict(kw="sapin de noël scandinave", title="Sapin de Noël scandinave : 5 étapes pour un style épuré", img="Sapin scandinave en 5 étapes", pal="creme", fill="vert",
         steps=["Choisir un sapin fin", "Peu de lumière, bien répartie", "Rubans en laine ou lin", "Bois, paille et blanc", "Caisse en bois au pied"], tips="Le sapin scandinave mise sur la retenue : peu de décorations, mais bien choisies. Privilégiez le bois clair, la paille, la laine et le blanc, laissez respirer les branches et remplacez la jupe par une caisse en bois.", board=B_SCANDI),
    dict(kw="décorer un petit sapin", title="Décorer un petit sapin : 5 étapes pour un résultat généreux", img="Petit sapin, grand effet", pal="rose", fill="vert",
         steps=["Surélever le petit sapin", "Fil cuivre micro-LED", "Ruban fin en spirale", "Petites boules de 3 cm", "Étoile légère au sommet"], tips="Un petit sapin gagne à être surélevé sur un tabouret ou une caisse. Utilisez des boules de 3 à 4 cm et un fil cuivre à micro-LED : les grosses décorations l'écrasent, alors que les petites le rendent généreux.", board=B_GUIDES),
    dict(kw="sapin blanc et doré", title="Sapin blanc et doré : la méthode en 5 étapes, sans faute", img="Sapin blanc et doré", pal="creme", fill="blanc",
         steps=["Gonfler les branches", "Lumière blanc chaud dense", "Ruban doré en vagues", "Boules or mates et brillantes", "Étoile dorée, jupe blanche"], tips="Le blanc et doré fonctionne mieux avec deux finitions d'or : mate pour le fond, brillante pour les reflets. Gardez une seule couleur de lumière, blanc chaud, et répétez le doré sur la table et la cheminée pour un salon cohérent.", board=B_CHIC),
    dict(kw="sapin de noël nature", title="Sapin de Noël nature : 5 étapes pour une déco naturelle", img="Sapin nature en 5 étapes", pal="sapin", fill="vert",
         steps=["Gonfler chaque branche", "Guirlande blanc chaud", "Ruban en lin naturel", "Pommes de pin et bois", "Panier en osier au pied"], tips="Pour un sapin nature, remplacez une partie des boules par des pommes de pin, des tranches d'orange séchées et des étoiles en bois. Un ruban en lin et un panier en osier au pied complètent l'ensemble sans plastique visible.", board=B_SAPIN),
    dict(kw="idée déco sapin", title="Idée déco sapin : la méthode en 5 étapes des décorateurs", img="La méthode des décorateurs", pal="nuit", fill="vert",
         steps=["Travailler par couches", "Lumière, puis ruban", "Boules, des grosses aux petites", "Pics et branchages en relief", "Recul de trois pas"], tips="Les décorateurs travaillent en couches : la lumière d'abord, puis le ruban, puis les boules des plus grosses aux plus petites. Reculez de trois pas après chaque couche pour repérer les trous, c'est là que se joue le rendu final.", board=B_GUIDES),
]
for x in I1:
    x["recette"] = "I1"; x["dest"] = U + "/inspiration#guide-sapin"

# ─── I2 · La palette (T-GUIDE · #guide-palettes) ────────────────────────
I2 = [
    dict(kw="palette noël 2026", title="Palette Noël 2026 : 5 couleurs pour un salon blanc et doré", img="Palette Noël 2026 : blanc et doré", pal="creme",
         colors=[("#fbf7ee", "Blanc crème"), ("#f1e4c8", "Champagne"), ("#d8b878", "Or doux"), ("#b38a4d", "Laiton"), ("#9aa58c", "Vert sauge")],
         tips="Le blanc et doré reste la palette la plus enregistrée de la saison. Gardez le blanc crème pour les grandes surfaces et l'or pour les détails, puis ajoutez une touche de vert sauge avec des branches pour réchauffer l'ensemble.", board=B_2026),
    dict(kw="couleurs déco noël", title="Couleurs déco Noël : la palette champagne et or de 2026", img="Champagne et or", pal="velours",
         colors=[("#fbf7ee", "Ivoire"), ("#f1e4c8", "Champagne"), ("#d8b878", "Or"), ("#8a6a3a", "Bronze"), ("#2a070d", "Bordeaux noir")],
         tips="Le champagne et or donne un Noël glamour sans clinquant. Associez des boules mates champagne à quelques touches d'or brillant, et ajoutez un bordeaux très sombre en petite quantité pour donner de la profondeur au sapin.", board=B_CHIC),
    dict(kw="noël blanc et doré idées", title="Noël blanc et doré idées : la palette en 5 couleurs", img="Noël blanc et doré", pal="creme",
         colors=[("#ffffff", "Blanc pur"), ("#efe6d6", "Lin"), ("#e2c58f", "Or pâle"), ("#c49a50", "Or vif"), ("#7d6a55", "Taupe")],
         tips="Pour un Noël blanc et doré qui ne paraît pas froid, mélangez plusieurs blancs : pur, lin et crème. L'or pâle sur les grandes boules et l'or vif sur les petites créent du relief, et le taupe sert d'ombre discrète.", board=B_CHIC),
    dict(kw="palette rouge et vert noël", title="Palette rouge et vert Noël : la version élégante en 5 couleurs", img="Rouge et vert, version chic", pal="sapin",
         colors=[("#9c1b26", "Rouge baie"), ("#4a0d16", "Bordeaux"), ("#1e4c4a", "Vert sapin"), ("#c9a27e", "Bois clair"), ("#f3eef2", "Neige")],
         tips="Le rouge et vert devient élégant quand on fonce les teintes : rouge baie et bordeaux plutôt que rouge vif, vert sapin plutôt que vert pomme. Ajoutez du bois clair et du blanc neige pour aérer la palette.", board=B_2026),
    dict(kw="noël givré déco", title="Noël givré déco : la palette blanc, argent et bleu glacier", img="La palette du Noël givré", pal="givre",
         colors=[("#ffffff", "Neige"), ("#dfe7ec", "Givre"), ("#a9b6c0", "Argent"), ("#6f7f8c", "Ardoise"), ("#d8b878", "Pointe d'or")],
         tips="Le Noël givré repose sur le blanc, l'argent et un bleu glacier très doux. Une pointe d'or, juste sur le cimier ou les bougies, évite l'effet trop froid, et le verre transparent multiplie les reflets de la guirlande.", board=B_2026),
    dict(kw="déco noël bordeaux", title="Déco Noël bordeaux : la palette bordeaux et cuivre en 5 teintes", img="Bordeaux et cuivre", pal="velours",
         colors=[("#2a070d", "Bordeaux noir"), ("#7a1222", "Bordeaux"), ("#b8733f", "Cuivre"), ("#e8c9a6", "Sable"), ("#1e4c4a", "Vert profond")],
         tips="Le bordeaux et cuivre est plus moderne que le rouge classique et superbe à la lumière des bougies. Utilisez le velours pour les rubans, le cuivre pour les petites boules et un vert profond pour relier le tout au sapin.", board=B_2026),
    dict(kw="déco noël vert sauge", title="Déco Noël vert sauge : la palette douce et naturelle de 2026", img="Vert sauge et crème", pal="creme",
         colors=[("#9aa58c", "Vert sauge"), ("#6b7a5e", "Olive"), ("#efe6d6", "Crème"), ("#d8c3a5", "Lin"), ("#b38a4d", "Laiton")],
         tips="Le vert sauge apporte une douceur naturelle très recherchée cette année. Associez-le au crème et au lin pour les textiles, puis au laiton pour les bougeoirs : la palette fonctionne aussi bien sur un sapin que sur une table.", board=B_2026),
    dict(kw="noël bleu nuit et or", title="Noël bleu nuit et or : la palette céleste en 5 couleurs", img="Bleu nuit et or", pal="nuit",
         colors=[("#14213d", "Bleu nuit"), ("#26375e", "Indigo"), ("#d8b878", "Or"), ("#f1e4c8", "Champagne"), ("#f3eef2", "Étoile")],
         tips="Le Noël céleste associe un bleu nuit profond à l'or et au champagne, comme un ciel étoilé. Choisissez des boules étoilées, des lumières blanc chaud et quelques étoiles dorées suspendues à des hauteurs différentes.", board=B_2026),
    dict(kw="couleurs table de noël", title="Couleurs table de Noël : la palette pour une table chic", img="La palette de la table", pal="rose",
         colors=[("#ffffff", "Nappe blanche"), ("#d8b878", "Or"), ("#9c1b26", "Rouge baie"), ("#1e4c4a", "Vert sapin"), ("#c9a27e", "Bois")],
         tips="Pour une table de Noël chic, reprenez les couleurs du sapin. Une nappe blanche, un chemin doré et quelques baies rouges suffisent, et le vert sapin arrive naturellement avec les branches posées au centre.", board=B_TABLE),
    dict(kw="palette déco noël salon", title="Palette déco Noël salon : 5 couleurs qui vont ensemble", img="5 couleurs qui vont ensemble", pal="or",
         colors=[("#7a1222", "Bordeaux"), ("#f2b544", "Lampion"), ("#1e4c4a", "Vert sapin"), ("#efe6d6", "Crème"), ("#5a3520", "Noyer")],
         tips="Dans un salon, une palette réussie tient en trois couleurs principales et deux couleurs d'appui. Répétez chacune au moins trois fois dans la pièce, par exemple sur le sapin, les coussins et la cheminée, pour que l'œil fasse le lien.", board=B_GUIDES),
    dict(kw="noël rose poudré déco", title="Noël rose poudré déco : la palette tendre et dorée de 2026", img="Rose poudré et or", pal="rose",
         colors=[("#f4d6cf", "Rose poudré"), ("#e8b4a6", "Vieux rose"), ("#d8b878", "Or doux"), ("#fbf7ee", "Ivoire"), ("#8c6b62", "Mauve gris")],
         tips="Le rose poudré associé à l'or donne un Noël tendre et lumineux. Gardez le vieux rose pour les grosses boules, l'ivoire pour le ruban et l'or doux pour le cimier, avec une lumière blanc chaud pour rester chaleureux.", board=B_2026),
    dict(kw="tendance déco noël 2026", title="Tendance déco Noël 2026 : la palette glamour champagne", img="La tendance glamour 2026", pal="nuit",
         colors=[("#f1e4c8", "Champagne"), ("#d8b878", "Or"), ("#fbf7ee", "Ivoire"), ("#a9b6c0", "Argent doux"), ("#2a070d", "Noir velours")],
         tips="La tendance glamour de 2026 mélange champagne, or et ivoire avec une touche de noir velours. Le secret est la matière : verre, velours et paillettes dans la même couleur donnent un rendu riche sans multiplier les teintes.", board=B_CHIC),
]
for x in I2:
    x["recette"] = "I2"; x["dest"] = U + "/inspiration#guide-palettes"

# ─── I3 · Les erreurs (T-GUIDE · #guide-erreurs) ────────────────────────
E_SAPIN = ["Pas assez de lumière", "Le blanc froid", "Trop de couleurs", "Boules toutes de même taille", "Boules seulement au bord", "Le pied visible", "Branches pas gonflées"]
E_SALON = ["Déco éparpillée partout", "Aucune couleur répétée", "Sapin collé au mur", "Lumière du plafond allumée", "Cheminée oubliée", "Trop de petits objets", "Fils électriques visibles"]
E_TABLE = ["Centre de table trop haut", "Vraies bougies près du papier", "Couleurs sans lien au sapin", "Nappe sans chemin de table", "Assiettes trop serrées", "Aucun détail à chaque place", "Lumière trop forte"]
E_EXT = ["Guirlande non étanche", "Lumières de couleurs mélangées", "Rallonge non protégée", "Porte d'entrée oubliée", "Dix petits objets éparpillés", "Solaire en plein décembre", "Pas de minuteur"]
E_LUM = ["Guirlande trop courte", "Le blanc froid", "Spirale autour du sapin", "Fils visibles", "Clignotement trop rapide", "Une seule source de lumière", "Pas de minuteur"]
I3 = [
    dict(kw="erreurs déco noël", title="Erreurs déco Noël : 7 erreurs qui gâchent un salon (et comment les éviter)", img="7 erreurs de déco de Noël", pal="velours", items=['Déco éparpillée partout', 'Aucune couleur répétée', 'Plafonnier allumé le soir', 'Cheminée oubliée', 'Trop de petits objets', 'Fils électriques visibles', 'Aucune odeur de Noël'],
         tips="La plus fréquente : éparpiller la décoration partout. Regroupez plutôt en trois zones fortes, le sapin, la cheminée et la table. Éteignez aussi le plafonnier le soir : guirlandes, lampes et bougies suffisent à créer l'ambiance.", board=B_GUIDES),
    dict(kw="erreurs déco sapin", title="Erreurs déco sapin : 7 erreurs qui gâchent un sapin de Noël", img="7 erreurs qui gâchent un sapin", pal="sapin", items=['Pas assez de lumière', 'Le blanc froid', 'Trop de couleurs', 'Boules toutes de même taille', 'Boules seulement au bord', 'Le pied visible', 'Branches pas gonflées'],
         tips="Première erreur : trop peu de lumière. Comptez environ 100 LED par tranche de 30 cm de sapin. Deuxième : des boules toutes de la même taille, qui aplatissent l'ensemble. Mélangez trois tailles et glissez les grosses vers le tronc.", board=B_GUIDES),
    dict(kw="déco noël réussie", title="Déco Noël réussie : les 7 erreurs à éviter dans votre salon", img="Les 7 erreurs à éviter", pal="nuit", items=['Sapin collé au mur', 'Rien à hauteur des yeux', "Coussins de l'été restés", 'Aucune lumière basse', 'Décor sans fil conducteur', 'Plaid oublié sur le canapé', 'Fenêtres laissées nues'],
         tips="Une déco de Noël réussie répète les mêmes couleurs dans toute la pièce. Si votre sapin est blanc et doré, reprenez ces teintes sur les coussins et la cheminée. Et éloignez le sapin du mur pour qu'il respire et prenne la lumière.", board=B_2026),
    dict(kw="astuces déco noël salon", title="Astuces déco Noël salon : 7 erreurs à corriger en 10 minutes", img="7 erreurs à corriger vite", pal="or", items=['Garder tous les vieux objets', 'Ne pas trier avant', 'Acheter sans palette', 'Oublier les textiles', 'Décorer la veille de Noël', "Négliger l'entrée", 'Pas de plateau pour regrouper'],
         tips="Bonne nouvelle : la plupart des erreurs se corrigent en dix minutes. Cachez les fils derrière les meubles avec des attaches transparentes, retirez la moitié des petits objets et regroupez le reste sur un plateau ou une étagère.", board=B_GUIDES),
    dict(kw="erreurs table de noël", title="Erreurs table de Noël : 7 erreurs à éviter pour le réveillon", img="Table de Noël : 7 erreurs", pal="rose", items=['Centre de table trop haut', 'Vraies bougies près du papier', 'Couleurs sans lien au sapin', 'Nappe sans chemin de table', 'Assiettes trop serrées', 'Aucun détail à chaque place', 'Lumière trop forte'],
         tips="L'erreur la plus courante : un centre de table trop haut qui empêche les invités de se voir. Restez sous 30 cm. Évitez aussi les vraies bougies près des serviettes en papier et des branches : les bougies LED donnent la même lumière.", board=B_TABLE),
    dict(kw="erreurs déco noël extérieur", title="Erreurs déco Noël extérieur : 7 erreurs à éviter dehors", img="Déco extérieure : 7 erreurs", pal="givre", items=['Guirlande non étanche', 'Couleurs de lumière mélangées', 'Rallonge non protégée', "Porte d'entrée oubliée", 'Dix petits objets éparpillés', 'Solaire en plein décembre', 'Pas de minuteur'],
         tips="Dehors, la première règle est l'étanchéité : IP44 au minimum pour une guirlande exposée à la pluie. Choisissez aussi une seule couleur de lumière pour toute la façade, et un minuteur pour que tout s'allume seul chaque soir.", board=B_EXT),
    dict(kw="erreurs guirlande sapin", title="Erreurs guirlande sapin : 7 erreurs d'éclairage à éviter", img="7 erreurs d'éclairage", pal="nuit", items=['Guirlande trop courte', 'Spirale autour du sapin', 'Clignotement trop rapide', 'Fils qui pendent', 'LED bleutées', 'Une seule source de lumière', 'Prise inaccessible'],
         tips="La guirlande enroulée en spirale autour du sapin est l'erreur la plus visible. Faites plutôt des allers-retours du cœur vers le bout de chaque branche : la lumière vient de l'intérieur et le sapin paraît plus profond.", board=B_GUIRL),
    dict(kw="comment rater son sapin", title="Comment rater son sapin : 7 erreurs que tout le monde fait", img="Les erreurs de tout le monde", pal="velours", items=['Branches pas gonflées', 'Cimier trop lourd', 'Guirlande posée en dernier', 'Tout acheté le même jour', 'Sapin trop grand pour la pièce', 'Jupe oubliée', 'Décorations mal accrochées'],
         tips="Presque tout le monde oublie de gonfler les branches d'un sapin artificiel. C'est pourtant ce qui fait la différence entre un sapin plat et un sapin fourni. Prenez vingt minutes, branche par branche, avant de poser quoi que ce soit.", board=B_SAPIN),
    dict(kw="déco noël ratée", title="Déco Noël ratée : 7 erreurs à éviter pour un salon chaleureux", img="Évitez ces 7 erreurs", pal="creme", items=['Mélanger tous les styles', 'Imiter un catalogue', 'Oublier sa déco habituelle', 'Trop de rouge vif', 'Pas de matière naturelle', 'Aucune bougie', 'Rien sur les murs'],
         tips="Un salon de Noël paraît raté quand rien ne se répond. Choisissez trois couleurs et tenez-vous-y du sapin à la cheminée. Ajoutez des sources de lumière basses, lampes et bougies LED, plutôt qu'un plafonnier trop fort.", board=B_GUIDES),
    dict(kw="erreurs lumières de noël", title="Erreurs lumières de Noël : 7 erreurs qui gâchent l'ambiance", img="Lumières : 7 erreurs", pal="sapin", items=['Le blanc froid', 'Plafonnier trop fort', 'Lampes éteintes', 'Pas de bougies LED', 'Guirlande sans minuteur', 'Ombres trop dures', 'Lumière seulement au sapin'],
         tips="Le blanc froid est l'erreur qui se voit le plus en photo : il rend la pièce bleutée. Choisissez du blanc chaud, autour de 2700 K, et multipliez les petites sources de lumière plutôt qu'une seule grosse guirlande.", board=B_GUIRL),
    dict(kw="erreurs déco table réveillon", title="Erreurs déco table réveillon : 7 détails à ne pas oublier", img="Réveillon : 7 détails", pal="or", items=['Serviettes en papier fin', 'Verres dépareillés', 'Pas de marque-place', 'Chemin trop court', 'Musique oubliée', 'Table montée au dernier moment', 'Aucun vert sur la table'],
         tips="Une belle table de réveillon se construit en trois couches : la nappe ou le chemin, le centre, puis un petit détail à chaque place. Laissez au moins 60 cm par convive pour que les assiettes et les verres respirent.", board=B_TABLE),
    dict(kw="erreurs sapin floqué", title="Erreurs sapin floqué : 7 erreurs à éviter avec un sapin blanc", img="Sapin floqué : 7 erreurs", pal="givre", items=['Trop peu de lumière', 'Rouge vif partout', 'Flocage non secoué', 'Boules toutes blanches', 'Pas de reflets', 'Pied laissé nu', 'Le blanc froid'],
         tips="Le sapin floqué absorbe la lumière : prévoyez plus de LED que pour un sapin vert. Évitez le tout-blanc qui efface les boules, et préférez l'or, le champagne ou l'argent avec du verre qui accroche les reflets.", board=B_SAPIN),
]
for x in I3:
    x["recette"] = "I3"; x["dest"] = U + "/inspiration#guide-erreurs"

# ─── I4 · Le moodboard (T-GRILLE · #guide-styles) ───────────────────────
STYLES = {
    "nordique": dict(tiles=["#f7f3ec", "#dfe7ec", "#c9b79c", "#ffffff"], ink="#2c3e4c", acc="#9c1b26"),
    "cosy": dict(tiles=["#5a3520", "#c9a27e", "#7a1222", "#efe6d6"], ink="#3a1a10", acc="#f2b544"),
    "traditionnel": dict(tiles=["#1e4c4a", "#9c1b26", "#efe6d6", "#143533"], ink="#3a1a10", acc="#f2b544"),
    "mix": dict(tiles=["#efe6d6", "#4a0d16", "#bcd3db", "#e8c9a6"], ink="#3a1a10", acc="#f3eef2"),
    "scandinave": dict(tiles=["#efe6d6", "#d8c3a5", "#9aa58c", "#f7f3ec"], ink="#3a2a1e", acc="#9aa58c"),
    "chic": dict(tiles=["#fbf7ee", "#f1e4c8", "#e2c58f", "#ffffff"], ink="#7d5a24", acc="#c49a50"),
    "chalet": dict(tiles=["#7a1222", "#1e4c4a", "#c9a27e", "#4a0d16"], ink="#f3eef2", acc="#f2b544"),
    "givre": dict(tiles=["#dfe7ec", "#ffffff", "#bcd3db", "#a9b6c0"], ink="#2c3e4c", acc="#6f7f8c"),
    "champagne": dict(tiles=["#2a070d", "#f1e4c8", "#4a0d16", "#d8b878"], ink="#2a070d", acc="#f2b544"),
    "boheme": dict(tiles=["#e8c9a6", "#b8733f", "#efe6d6", "#9aa58c"], ink="#3a1a10", acc="#7a1222"),
    "opera": dict(tiles=["#4a0d16", "#7a1222", "#2a070d", "#5a1a26"], ink="#f3eef2", acc="#f2b544"),
    "celeste": dict(tiles=["#14213d", "#26375e", "#1b2a4a", "#33466e"], ink="#f3eef2", acc="#d8b878"),
}
TILES = [("sapin", "Le coin salon"), ("bougies", "La table"), ("rideau", "La fenêtre"), ("village", "L'étagère")]
I4 = [
    dict(kw="déco noël scandinave", title="Déco Noël scandinave : 4 ambiances pour s'inspirer en 2026", img="Noël scandinave : l'inspiration", style="scandinave", tiles=[('sapin', 'Le sapin fin'), ('bougies', 'Bougies blanches'), ('cimier', 'Étoiles en papier'), ('figurine', 'Petit lutin en bois')], pal="creme",
         tips="Le Noël scandinave se reconnaît à sa retenue : bois clair, lin, laine et beaucoup de blanc. Une seule guirlande bien posée, quelques étoiles en papier à la fenêtre et des bougies sur l'étagère suffisent à créer l'ambiance.", board=B_SCANDI),
    dict(kw="noël chic blanc et doré", title="Noël chic blanc et doré : 4 ambiances pour tout le salon", img="Chic, blanc et doré", style="chic", tiles=[('boules', 'Boules or mat'), ('chemin', 'Chemin doré'), ('cimier', 'Étoile dorée'), ('bougies', 'Bougeoirs laiton')], pal="creme",
         tips="Pour un Noël chic, faites circuler le blanc et le doré dans toute la maison : le sapin, la table, la fenêtre et une étagère. Variez les matières, verre, velours et lin, pour que la palette reste riche malgré deux couleurs seulement.", board=B_CHIC),
    dict(kw="déco noël chalet", title="Déco Noël chalet : 4 ambiances chaleureuses à recréer chez soi", img="L'esprit chalet à la maison", style="chalet", tiles=[('couronne', 'Couronne en bois'), ('lanterne', 'Lanterne au sol'), ('figurine', 'Casse-noisette'), ('sapin', 'Sapin écossais')], pal="velours",
         tips="L'esprit chalet repose sur le rouge, le vert sapin et le bois brut. Ajoutez du tissu écossais sur la table, des casse-noisettes sur l'étagère et une lumière très chaude à la fenêtre pour retrouver l'ambiance montagne.", board=B_2026),
    dict(kw="winter wonderland déco", title="Winter wonderland déco : 4 ambiances givrées pour Noël", img="L'ambiance winter wonderland", style="givre", tiles=[('sapin', 'Sapin floqué'), ('village', 'Village enneigé'), ('rideau', 'Flocons à la fenêtre'), ('boules', 'Boules en verre')], pal="givre",
         tips="Le winter wonderland mise sur le blanc, l'argent et le verre. Un sapin floqué, de la neige artificielle au pied, un village lumineux sur l'étagère et des flocons à la fenêtre créent un décor de conte d'hiver.", board=B_2026),
    dict(kw="noël glam champagne", title="Noël glam champagne : 4 ambiances glamour pour les fêtes", img="Le Noël glam champagne", style="champagne", tiles=[('boules', 'Boules champagne'), ('bougies', 'Bougies dorées'), ('guirlande', 'Guirlande dense'), ('cimier', 'Cimier brillant')], pal="velours",
         tips="Le style glam associe le champagne et l'or à un fond sombre, bordeaux ou noir velours. Les reflets font tout : boules en verre, bougeoirs dorés et guirlandes très denses pour que chaque coin de la pièce brille.", board=B_CHIC),
    dict(kw="déco noël bohème", title="Déco Noël bohème : 4 ambiances naturelles et chaleureuses", img="Le Noël bohème", style="boheme", tiles=[('couronne', 'Couronne séchée'), ('lanterne', 'Lanterne en rotin'), ('guirlande', 'Fil cuivre'), ('centre', 'Herbes et bougies')], pal="rose",
         tips="Le Noël bohème mélange les matières naturelles : macramé, herbes séchées, terre cuite et lin. Les couleurs restent chaudes, terracotta, sable et vert sauge, avec une lumière douce de bougies et de guirlandes fines.", board=B_2026),
    dict(kw="noël opéra velours rouge", title="Noël opéra velours rouge : 4 ambiances théâtrales", img="Le Noël opéra", style="opera", tiles=[('rideau', 'Rideau de velours'), ('bougies', 'Candélabre'), ('boules', 'Boules bordeaux'), ('figurine', 'Le soldat')], pal="velours",
         tips="Le style opéra joue la grande scène : velours rouge profond, or et bougies. Drapez un ruban de velours sur la cheminée, choisissez des boules bordeaux et dorées, et baissez la lumière pour laisser briller les bougies.", board=B_2026),
    dict(kw="noël céleste déco", title="Noël céleste déco : 4 ambiances bleu nuit et étoiles", img="Le Noël céleste", style="celeste", tiles=[('cimier', 'Étoiles suspendues'), ('guirlande', 'Constellation LED'), ('lanterne', 'Lanterne bleue'), ('boules', 'Boules étoilées')], pal="nuit",
         tips="Le Noël céleste transforme la maison en ciel étoilé : bleu nuit, or et étoiles suspendues à différentes hauteurs. Une guirlande à micro-LED dans un bocal ou sur une branche rappelle les constellations.", board=B_2026),
    dict(kw="inspiration déco noël", title="Inspiration déco Noël : 4 ambiances pour trouver votre style", img="Trouvez votre style de Noël", style="mix", tiles=[('sapin', 'Le sapin'), ('centre', 'La table'), ('couronne', 'La porte'), ('village', 'La cheminée')], pal="or",
         tips="Pour trouver votre style, partez de votre salon tel qu'il est : bois clair, plutôt scandinave ; tons chauds et velours, plutôt opéra ou glam. Le style de Noël le plus réussi prolonge votre déco de tous les jours.", board=B_GUIDES),
    dict(kw="déco noël nordique", title="Déco Noël nordique : 4 ambiances simples et lumineuses", img="Un Noël nordique lumineux", style="nordique", tiles=[('lanterne', 'Lumière douce'), ('cimier', 'Étoile en bois'), ('jupe', 'Jupe en laine'), ('bougies', 'Trois bougies')], pal="givre",
         tips="La déco nordique compte sur la lumière plus que sur les objets. Multipliez les petites sources, bougies LED, guirlandes fines et étoiles en papier éclairées, et gardez des matières simples comme le bois clair et la laine.", board=B_SCANDI),
    dict(kw="déco noël cosy", title="Déco Noël cosy : 4 ambiances pour un salon douillet", img="Un salon de Noël cosy", style="cosy", tiles=[('bougies', 'Bougies partout'), ('jupe', 'Jupe en tricot'), ('guirlande', 'Lumière basse'), ('lanterne', 'Coin lecture')], pal="or",
         tips="Un Noël cosy se construit avec des textiles et de la lumière basse : plaids en laine, coussins en velours, bougies et guirlandes chaudes. Évitez le plafonnier le soir et regroupez la déco autour du canapé et du sapin.", board=B_2026),
    dict(kw="déco noël traditionnelle", title="Déco Noël traditionnelle : 4 ambiances classiques et chaleureuses", img="Le Noël traditionnel", style="traditionnel", tiles=[('couronne', 'Couronne de porte'), ('figurine', 'Casse-noisette'), ('village', 'Village lumineux'), ('guinguette', "Guirlande d'ampoules")], pal="sapin",
         tips="Le Noël traditionnel ne se démode pas : rouge, vert et or, couronne sur la porte, casse-noisettes et village lumineux. Pour le moderniser, foncez les teintes et choisissez des matières nobles comme le velours et le verre.", board=B_GUIDES),
]
for x in I4:
    x["recette"] = "I4"; x["dest"] = U + "/inspiration#guide-styles"

RECETTES = {"I1": I1, "I2": I2, "I3": I3, "I4": I4}


FILLERS = {
    "I1": [
        "Ces étapes valent pour un sapin naturel comme pour un sapin artificiel, petit ou grand.",
        "Une méthode simple pour une déco de sapin de Noël réussie, à garder pour le jour où vous montez le sapin.",
        "Enregistrez ces étapes pour le jour du montage : elles marchent pour tous les styles de décoration de sapin de Noël, du classique au plus moderne.",
    ],
    "I2": [
        "Une palette de couleurs de Noël facile à reprendre du sapin à la table.",
        "Enregistrez cette palette pour vos idées déco de Noël : elle va du sapin à la table du réveillon.",
        "Gardez cette palette sous la main pour vos idées déco de Noël 2026 : elle se reprend du sapin à la cheminée et jusqu'à la table du réveillon.",
    ],
    "I3": [
        "Des astuces déco de Noël simples pour un salon plus chaleureux dès ce soir.",
        "Des astuces déco de Noël simples à appliquer, pour une maison plus chaleureuse et plus harmonieuse dès ce soir.",
        "Enregistrez cette liste avant de décorer : ce sont des astuces de déco de Noël simples, qui rendent la maison plus chaleureuse et plus harmonieuse.",
    ],
    "I4": [
        "Une inspiration déco de Noël pour le salon, la table, la fenêtre et l'étagère.",
        "Quatre coins de la maison, une seule ambiance : une inspiration déco de Noël facile à reproduire chez soi.",
        "Quatre coins de la maison, une seule ambiance : enregistrez ce moodboard d'inspiration déco de Noël pour retrouver le style au moment de décorer.",
    ],
}


def description(x):
    best = None
    for f in FILLERS[x["recette"]]:
        d = x["tips"] + " " + f + FIN
        if 400 <= len(d) <= 450:
            return d
        if best is None or abs(len(d) - 425) < abs(len(best) - 425):
            best = d
    return best
