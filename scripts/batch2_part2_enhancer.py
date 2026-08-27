import json
import os

output_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "../src/data/chronicles"))
os.makedirs(output_dir, exist_ok=True)

batch2_part2 = {
    "dk": {
        "code": "DK",
        "name": "Denmark",
        "capital": "Copenhagen",
        "continent": "Europe",
        "population": "5.9 Million",
        "currency": "Danish Krone (DKK)",
        "languages": ["Danish"],
        "seoTitle": "History of Denmark: Kingdom of the Dannebrog, Jutland Peninsula, and Democracy",
        "metaDescription": "Discover the detailed history of Denmark. Explore King Gorm the Old, the world's oldest flag Dannebrog (1219), the 1849 Constitution, and green wind power.",
        "mapFormation": "Occupying the Jutland Peninsula and an archipelago of 443 named islands (including Zealand, Funen, and Bornholm) across 42,933 square kilometers, the Kingdom of Denmark (<em>Danmark</em>) guards the strategic straits connecting the North Sea to the Baltic Sea. The sovereign Danish Realm (<em>Rigsfællesskabet</em>) also includes the autonomous self-governing territories of the <strong>Faroe Islands</strong> in the North Atlantic and <strong>Greenland</strong>, the world's largest island.<br><br>The historic Danish state coalesced during the Viking Age under King Gorm the Old and his son <strong>Harald Bluetooth</strong> around <strong>965 CE</strong>, who united Denmark and converted the Danes to Christianity, commemorated on the famous <strong>Jelling Stones</strong> ('Denmark's birth certificate'). In the 14th century, Queen Margaret I established the Kalmar Union, uniting Scandinavia under Danish hegemony.<br><br>Following losses in the Napoleonic Wars and the 1864 Second Schleswig War against Prussia and Austria, Danish borders stabilized in 1920 when a democratic plebiscite returned Northern Schleswig (Sønderjylland) to Denmark.",
        "flagHistory": "The national flag of Denmark—the <strong>Dannebrog</strong> (Cloth of the Danes)—holds the Guinness World Record as the oldest continuously used national flag in world history, featuring a white Nordic Cross on a field of crimson red.<br><br>According to legendary historical chronicles in the 13th-century <em>Gesta Danorum</em> by Saxo Grammaticus, the flag miraculously fell from the heavens on <strong>June 15, 1219</strong>, during the Battle of Lindanise (modern Tallinn, Estonia) to King Valdemar II the Victorious, rallying Danish forces to victory. The Dannebrog became the structural design template for all Nordic flags across Scandinavia, Finland, and Iceland.",
        "freedomStory": "Denmark's transition from royal absolutism to modern constitutional democracy occurred through peaceful consensus.<br><br>On <strong>June 5, 1849</strong>, King Frederick VII signed the <strong>Constitutional Act of Denmark (Danmarks Riges Grundlov)</strong>, peacefully ending over two centuries of royal absolutism and establishing a constitutional monarchy with a bicameral parliament and basic civil liberties (celebrated annually as Constitution Day / <em>Grundlovsdag</em>).<br><br>During World War II, the Danish people staged heroic resistance against Nazi occupation, successfully evacuating over 95% of the Danish Jewish population across the Øresund to safety in neutral Sweden in October 1943. In the post-war era, Denmark co-founded NATO in 1949 and pioneered the world's leading wind turbine manufacturing industry through Vestas and Ørsted.",
        "challenges": "As a global leader in green transition aiming for a 70% greenhouse gas reduction, Denmark is pioneering artificial energy islands in the North Sea. Domestically, priorities include digital public administration, healthcare workforce expansion, and managing constitutional defense partnerships with Greenland and the Faroe Islands.",
        "images": {
            "landscape": {
                "url": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
                "alt": "Møns Klint white chalk cliffs in Denmark",
                "caption": "The dramatic white chalk cliffs of Møns Klint along the Baltic Sea coast on the island of Møn, Denmark."
            },
            "landmark": {
                "url": "https://images.unsplash.com/photo-1512813195386-6cf811ad3542?q=80&w=1200&auto=format&fit=crop",
                "alt": "Nyhavn colorful waterfront in Copenhagen, Denmark",
                "caption": "The 17th-century colorful canal townhouses of Nyhavn in Copenhagen, where fairy-tale author Hans Christian Andersen lived."
            },
            "streetview": {
                "url": "https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=1200&auto=format&fit=crop",
                "alt": "Danish road landscape with red border license plates and cycle tracks",
                "caption": "Danish street view clues: white license plates with a thin red rectangular border, yellow warning signs with red borders, and extensive cycle paths."
            }
        },
        "streetViewMeta": {
            "drivingSide": "Right",
            "licensePlates": "White rectangular plates with a thin red outer border line (unique in Europe); commercial van plates are yellow with a red border.",
            "utilityPoles": "Underground power lines; wooden poles rare; prominent roadside speed limit signs with red circular borders.",
            "roadMarkings": "Continuous or dashed white centerlines; solid white edge lines; wide curbside bicycle paths.",
            "delineators": "Yellow-and-white plastic posts with a red diagonal reflector on top.",
            "cameraGen": "Complete Gen 3 and Gen 4 coverage across Jutland and all major islands."
        },
        "aiSummary": {
            "geo": "Jutland Peninsula and island archipelago; Danish Realm includes Greenland and the Faroe Islands.",
            "flag": "The Dannebrog: world's oldest national flag (1219), white cross on crimson red.",
            "freedom": "1849 Grundlov Constitution established democracy; 1943 heroic rescue of Danish Jews.",
            "challenge": "North Sea energy island construction, green transition, and Arctic Greenland defense coordination."
        },
        "faqs": [
            {
                "question": "What is the oldest continuously used national flag in the world?",
                "answer": "The Dannebrog of Denmark holds the world record, first recorded in 1219 during the Battle of Lindanise."
            },
            {
                "question": "What is the Danish Realm (Rigsfællesskabet)?",
                "answer": "The Danish Realm is the constitutional union consisting of metropolitan Denmark in Europe, along with the autonomous self-governing territories of Greenland and the Faroe Islands."
            }
        ],
        "timeline": [
            {"year": "965 CE", "event": "Harald Bluetooth unifies Denmark and erects the Jelling Stone."},
            {"year": "1219", "event": "The Dannebrog flag falls from the sky at the Battle of Lindanise in Estonia."},
            {"year": "1849", "event": "King Frederick VII signs the Constitution (Grundlov), ending royal absolutism."},
            {"year": "1920", "event": "Northern Schleswig is reunited with Denmark following a democratic plebiscite."},
            {"year": "1943", "event": "The Danish Resistance evacuates over 7,000 Danish Jews to safety in Sweden."},
            {"year": "2000", "event": "Inauguration of the Øresund Bridge connecting Copenhagen directly to Malmö, Sweden."}
        ]
    },
    "fi": {
        "code": "FI",
        "name": "Finland",
        "capital": "Helsinki",
        "continent": "Europe",
        "population": "5.6 Million",
        "currency": "Euro (EUR)",
        "languages": ["Finnish", "Swedish"],
        "seoTitle": "History of Finland: Land of a Thousand Lakes, Blue Cross Flag, and 1917 Independence",
        "metaDescription": "Explore the detailed history of Finland. Discover the 1917 Independence, Winter War heroism, the Siniristilippu flag, and Nordic education.",
        "mapFormation": "Covering 338,472 square kilometers in Northern Europe between the Gulf of Bothnia and the Gulf of Finland, the Republic of Finland (<em>Suomi</em>) is celebrated as the 'Land of a Thousand Lakes', encompassing over 187,888 lakes and 178,947 islands, with over 75% of the land area blanketed by pristine boreal taiga forests.<br><br>From the 13th century until 1809, Finland was an integral part of the Kingdom of Sweden. Following the Finnish War (1808–1809), Sweden ceded the territory to Tsar Alexander I of the Russian Empire, who established the autonomous <strong>Grand Duchy of Finland</strong>, preserving Swedish civil law and constitutional institutions.<br><br>Following the collapse of the Russian Tsardom in 1917, the Finnish Parliament (Eduskunta) proclaimed sovereign independence on <strong>December 6, 1917</strong> (celebrated as Independence Day / <em>Itsenäisyyspäivä</em>). Finnish borders were preserved through the heroic resistance of the Winter War (1939–1940) and Continuation War, codified in the 1947 Paris Peace Treaties.",
        "flagHistory": "The national flag of Finland—the <strong>Siniristilippu</strong> (The Blue Cross Flag)—was designed by poet Eero Snellman and artist Bruno Fabritius, officially adopted on <strong>May 29, 1918</strong>.<br><br>The design features a sea-blue Nordic cross on a pure white field. In the immortal words of Finnish poet Zachris Topelius: <strong>Blue</strong> represents the thousands of blue lakes and clear skies of Finland; while <strong>White</strong> represents the pure white snow that covers the land in winter.",
        "freedomStory": "Finland's struggle for independence was anchored in exceptional civic solidarity, early democratic suffrage, and unmatched military resilience (<em>Sisu</em>).<br><br>In 1906, through the Parliament Act, Finland became the <strong>first country in Europe to grant women full voting rights and the first in the world to allow women to stand for parliamentary election</strong>. When independence was declared on December 6, 1917, statesman Pehr Evind Svinhufvud and General Carl Gustaf Emil Mannerheim secured sovereign recognition.<br><br>In November 1939, when the Soviet Union invaded in the <strong>Winter War</strong>, Finnish soldiers on skis in white camouflage defended their independence against overwhelming odds. In the post-war era, Finland built a world-renowned education system and high-tech economy (Nokia, Linux, gaming), ranking consistently as the world's happiest country.",
        "challenges": "In 2023, Finland officially ended decades of military non-alignment by joining <strong>NATO</strong>, reinforcing its 1,340-kilometer eastern frontier. Domestically, the nation advances 100% carbon-neutral energy goals through the Olkiluoto 3 nuclear reactor and vast wind farms, while managing demographic aging in rural municipalities.",
        "images": {
            "landscape": {
                "url": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
                "alt": "Finnish lake and pine taiga forest landscape",
                "caption": "The Saimaa lake labyrinth and boreal forest in southeastern Finland, home to the endangered Saimaa ringed seal."
            },
            "landmark": {
                "url": "https://images.unsplash.com/photo-1512813195386-6cf811ad3542?q=80&w=1200&auto=format&fit=crop",
                "alt": "Helsinki Cathedral on Senate Square, Finland",
                "caption": "The neoclassical Helsinki Cathedral overlooking Senate Square in Helsinki, completed in 1852 by Carl Ludvig Engel."
            },
            "streetview": {
                "url": "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=1200&auto=format&fit=crop",
                "alt": "Finnish highway with yellow warning signs and birch forests",
                "caption": "Finnish street view tells: solid white edge lines, yellow warning signs with red borders, wooden poles with metal brackets, and dense birch trees."
            }
        },
        "streetViewMeta": {
            "drivingSide": "Right",
            "licensePlates": "White standard Euro plates with blue EU strip on left ('FIN'); format of three letters, a hyphen, and three digits.",
            "utilityPoles": "Wooden poles with metal bracket tops; blue-and-white road junction signs with distances in kilometers.",
            "roadMarkings": "Continuous white centerlines (white road markings throughout; no yellow lines); solid white outer edge lines.",
            "delineators": "White posts with red reflectors on both sides, with yellow chevron markers at sharp turns.",
            "cameraGen": "Dense Gen 3 and Gen 4 coverage across all 19 regions from Uusimaa to Lapland."
        },
        "aiSummary": {
            "geo": "Land of 188,000 lakes; transitioned from Swedish realm to Russian Grand Duchy, declaring independence in 1917.",
            "flag": "Siniristilippu: blue Nordic cross on a pure white field, representing lakes and winter snow.",
            "freedom": "1906 universal female suffrage pioneer; 1917 independence; defended sovereignty in the 1939 Winter War.",
            "challenge": "NATO eastern border integration, carbon neutrality, and rural demographic aging."
        },
        "faqs": [
            {
                "question": "What is Finnish 'Sisu'?",
                "answer": "'Sisu' is a unique Finnish cultural concept signifying extraordinary courage, stoic determination, and perseverance in the face of adversity."
            },
            {
                "question": "When did Finnish women gain voting rights?",
                "answer": "In 1906, Finland became the first country in Europe to grant women the right to vote and the first in the world to allow women to run for parliament."
            }
        ],
        "timeline": [
            {"year": "1809", "event": "Sweden cedes Finland to Russia; Tsar Alexander I establishes the Grand Duchy of Finland."},
            {"year": "1906", "event": "Finland grants universal suffrage and the right to stand for election to women."},
            {"year": "1917", "event": "The Finnish Parliament adopts the Declaration of Independence on December 6."},
            {"year": "1939–1940", "event": "The Winter War against the Soviet Union preserves Finnish independence."},
            {"year": "1995", "event": "Finland joins the European Union alongside Sweden and Austria."},
            {"year": "2023", "event": "Finland officially becomes the 31st member state of NATO."}
        ]
    },
    "gr": {
        "code": "GR",
        "name": "Greece",
        "capital": "Athens",
        "continent": "Europe",
        "population": "10.4 Million",
        "currency": "Euro (EUR)",
        "languages": ["Greek"],
        "seoTitle": "History of Greece: Cradle of Democracy, Sky-Blue & White Flag, and 1821 Revolution",
        "metaDescription": "Explore the detailed history of Greece. Discover ancient Athens, the 1821 Greek War of Independence, the Byzantine legacy, and the blue-and-white flag.",
        "mapFormation": "Positioned at the strategic juncture of Europe, Asia, and Africa in Southeastern Europe across 131,957 square kilometers, the Hellenic Republic (<em>Elláda / Hellas</em>) encompasses the southern tip of the Balkan Peninsula and an archipelago of over 2,000 islands across the Aegean and Ionian Seas, anchored by <strong>Crete, Rhodes, and the Cyclades</strong>.<br><br>Greece is the historic <strong>Cradle of Western Civilization</strong>, birthplace of democracy in 5th-century BCE Classical Athens, philosophy (Socrates, Plato, Aristotle), theater, the Olympic Games, and Western science. Following Alexander the Great's Hellenistic empire and integration into the Roman and Byzantine Empires (330–1453 CE), the Greek lands came under Ottoman rule following the Fall of Constantinople in 1453.<br><br>The modern Greek state was forged in the <strong>Greek War of Independence (1821–1829)</strong>. Sovereign independence was recognized under the <strong>London Protocol of 1830</strong>. Through successive treaties—the Treaty of Berlin (1881), the Balkan Wars (1912–1913), and the Treaty of Lausanne (1923)—Greece incorporated Thessaly, Macedonia, Epirus, Crete, and the Aegean islands, finalizing modern borders with the 1947 integration of the Dodecanese islands from Italy.",
        "flagHistory": "The national flag of Greece—the <em>Galanólefki</em> (The Sky-Blue and White)—features nine alternating horizontal stripes of blue and white, with a blue square canton containing a white cross in the upper hoist.<br><br>The design was formally adopted by the First National Assembly at Epidaurus on <strong>January 15, 1822</strong>, during the War of Independence. The <strong>White Cross</strong> in the canton represents Eastern Orthodox Christianity and the blessing of the Church in the revolution. The <strong>Nine Stripes</strong> correspond to the nine syllables of the immortal revolutionary battle cry of 1821: <em>'E-lef-the-rí-a í Thá-na-tos'</em> (<strong>'Freedom or Death'</strong>). In poetic lore, <strong>Blue</strong> represents the Aegean Sea and Mediterranean sky, while <strong>White</strong> represents the pure foaming waves of the sea and the purity of the struggle for freedom.",
        "freedomStory": "The resurrection of sovereign Greek statehood was ignited on <strong>March 25, 1821</strong> (celebrated as Greek Independence Day / <em>25th of March</em>), when Bishop Germanos of Old Patras raised the revolutionary banner at the Monastery of Agia Lavra.<br><br>Aided by passionate philhellenes across Europe (including poet Lord Byron), Greek naval captains (Laskarina Bouboulina, Andreas Miaoulis) and guerrilla commanders (Theodoros Kolokotronis) fought fiercely against imperial Ottoman forces. Following the decisive Allied naval victory at the Battle of Navarino in 1827, sovereign independence was formally established.<br><br>Following the restoration of democracy in 1974 (<em>Metapolitefsi</em>) after the fall of the military junta, Greece established a stable democratic parliamentary republic, acceding to the European Economic Community (EU) in 1981.",
        "challenges": "As a top Mediterranean maritime powerhouse with the world's largest commercial merchant shipping fleet and a premier global tourism destination, Greece balances economic growth with climate resilience. Foremost priorities include mitigating summer wildfire and flood risks, expanding solar and wind infrastructure to green island grids, and managing Aegean maritime territorial stability.",
        "images": {
            "landscape": {
                "url": "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1200&auto=format&fit=crop",
                "alt": "Santorini caldera and Aegean Sea, Greece",
                "caption": "The whitewashed cliffside villages of Oia overlooking the volcanic caldera of Santorini in the Aegean Sea, Greece."
            },
            "landmark": {
                "url": "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1200&auto=format&fit=crop",
                "alt": "Acropolis and Parthenon in Athens, Greece",
                "caption": "The Parthenon atop the sacred rock of the Acropolis in Athens, completed in 438 BCE as the monumental symbol of ancient Athenian democracy."
            },
            "streetview": {
                "url": "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=1200&auto=format&fit=crop",
                "alt": "Greek highway with Greek alphabet signage and small blue license strip",
                "caption": "Greek street view indicators: Greek alphabet signage (with Latin subtitles), white plates with blue 'GR' strip, and rocky Mediterranean olive groves."
            }
        },
        "streetViewMeta": {
            "drivingSide": "Right",
            "licensePlates": "White rectangular plates with blue strip on left ('GR') and three letters followed by four numbers formatted in Greek characters that exist in both Greek and Latin alphabets.",
            "utilityPoles": "Wooden poles with metal crossbars and white porcelain insulators; concrete poles in urban Athens and Thessaloniki.",
            "roadMarkings": "Continuous or dashed white centerlines; solid white edge lines; blue-background regional highway signs with Greek and Latin transliterations.",
            "delineators": "White posts with red reflectors on the right and white on the left.",
            "cameraGen": "Comprehensive Gen 3 and Gen 4 coverage across the mainland and all major island groups."
        },
        "aiSummary": {
            "geo": "Southeastern European cradle of Western civilization; archipelago of 2,000+ islands.",
            "flag": "Galanólefki: 9 blue-and-white stripes symbolizing 'Freedom or Death' with a white cross.",
            "freedom": "1821 Revolution initiated on March 25; London Protocol 1830 recognized sovereign state.",
            "challenge": "Wildfire climate defense, green island grid transitions, and Aegean maritime coordination."
        },
        "faqs": [
            {
                "question": "What is the historical meaning of March 25 in Greece?",
                "answer": "March 25 is Greek Independence Day, commemorating the outbreak of the 1821 Greek War of Independence against Ottoman rule, coinciding with the Feast of the Annunciation."
            },
            {
                "question": "What is the meaning of the nine stripes on the Greek flag?",
                "answer": "The nine stripes represent the nine syllables of the Greek revolutionary motto 'Eleftheria i Thanatos' ('Freedom or Death')."
            }
        ],
        "timeline": [
            {"year": "508 BCE", "event": "Cleisthenes institutes democratic reforms in Athens, creating the world's first democracy."},
            {"year": "1821", "event": "Bishop Germanos raises the revolutionary banner on March 25, sparking the War of Independence."},
            {"year": "1830", "event": "The London Protocol formally recognizes the sovereign independence of the Kingdom of Greece."},
            {"year": "1913", "event": "The Treaty of Bucharest concludes the Balkan Wars, incorporating Macedonia, Epirus, and Crete."},
            {"year": "1974", "event": "The fall of the military junta leads to the restoration of democracy (Metapolitefsi)."},
            {"year": "1981", "event": "Greece accedes to the European Economic Community (European Union)."}
        ]
    },
    "pt": {
        "code": "PT",
        "name": "Portugal",
        "capital": "Lisbon",
        "continent": "Europe",
        "population": "10.4 Million",
        "currency": "Euro (EUR)",
        "languages": ["Portuguese"],
        "seoTitle": "History of Portugal: Age of Discovery, Green-Red Armillary Flag, and Carnation Revolution",
        "metaDescription": "Discover the detailed history of Portugal. Explore the Treaty of Windsor (1386), maritime discoveries of Vasco da Gama, the 1974 Carnation Revolution, and the armillary sphere flag.",
        "mapFormation": "Occupying the southwestern edge of the Iberian Peninsula along the Atlantic Ocean across 92,212 square kilometers, the Portuguese Republic (<em>República Portuguesa</em>) also includes the autonomous volcanic archipelagos of the <strong>Azores and Madeira</strong> in the North Atlantic.<br><br>Portugal is one of the oldest sovereign nation-states in Europe with virtually unchanged continental land borders since the 13th century. The kingdom was founded on <strong>June 24, 1128</strong>, when <strong>Afonso Henriques</strong> (Afonso I) defeated his mother's forces at the Battle of São Mamede, proclaiming himself King in 1139. Papal recognition was codified by Pope Alexander III in the papal bull <em>Manifestis Probatum (1179)</em>.<br><br>The continental borders were permanently established via the <strong>Treaty of Alcañices (1297)</strong> with Castile. In 1386, the <strong>Treaty of Windsor</strong> established the Anglo-Portuguese Alliance, the oldest active diplomatic alliance in world history.",
        "flagHistory": "The national flag of Portugal—the <em>Bandeira de Portugal</em>—features an unequal vertical bicolor of green (2/5 at the hoist) and red (3/5 at the fly), with the National Shield overlaid upon a golden <strong>Armillary Sphere</strong> centered on the dividing line, officially adopted on <strong>June 30, 1911</strong>, following the proclamation of the Republic.<br><br>The design was created by a republican committee including painter Columbano Bordalo Pinheiro. In republican symbolism: <strong>Green</strong> represents hope in the nation's future, and <strong>Red</strong> honors the blood of patriots shed for the republic. The golden <strong>Armillary Sphere</strong>—a navigational instrument used by Portuguese navigators during the Age of Discovery—honors Prince Henry the Navigator, Vasco da Gama, and Ferdinand Magellan. The central white shield bears five blue shields (<em>quinas</em>) representing the five Moorish kings defeated by Afonso Henriques, surrounded by a red border with seven golden castles representing fortified frontier cities.",
        "freedomStory": "Portugal's modern democracy was born through one of history's most peaceful and romantic revolutions: the <strong>Carnation Revolution (Revolução dos Cravos)</strong> on <strong>April 25, 1974</strong>.<br><br>Following nearly five decades of authoritarian corporatist dictatorship under the <em>Estado Novo</em> of António de Oliveira Salazar, progressive officers of the Armed Forces Movement (MFA) launched a peaceful military coup. Citizens joined soldiers in the streets of Lisbon, placing red and white carnations into the muzzles of their rifles (celebrated annually as Freedom Day / <em>Dia da Liberdade</em>).<br><br>The revolution restored full civil liberties, ended colonial wars in Africa, and promulgated the democratic Constitution of 1976. Portugal joined the European Economic Community in 1986 and successfully hosted Expo '98 in Lisbon.",
        "challenges": "As a pioneer in renewable energy generating over 70% of its electricity from wind, solar, and hydro, Portugal balances environmental transitions with economic modernization. Central priorities include expanding affordable housing across Lisbon and Porto, developing lithium mining corridors, and upgrading railway links with Spain.",
        "images": {
            "landscape": {
                "url": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
                "alt": "Ponta da Piedade sea stacks and cliffs in Algarve, Portugal",
                "caption": "The golden limestone sea cliffs and turquoise waters of Ponta da Piedade in the Algarve, southern Portugal."
            },
            "landmark": {
                "url": "https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?q=80&w=1200&auto=format&fit=crop",
                "alt": "Belém Tower in Lisbon, Portugal",
                "caption": "Belém Tower (Torre de Belém) on the Tagus River in Lisbon, a Manueline fortress commemorating Vasco da Gama's 1497 expedition to India."
            },
            "streetview": {
                "url": "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=1200&auto=format&fit=crop",
                "alt": "Portuguese street view with cobblestone calçada and blue-yellow plates",
                "caption": "Portuguese street view tells: older plates with yellow year strip on right (pre-2020), traditional calçada portuguesa stone sidewalks, and tiled facades (azulejos)."
            }
        },
        "streetViewMeta": {
            "drivingSide": "Right",
            "licensePlates": "Standard Euro plates with blue EU strip on left ('P'); older plates (pre-2020) have a distinctive yellow strip on the right showing registration month/year.",
            "utilityPoles": "Wooden poles with metal diagonal struts; concrete poles with circular holes near the top in suburban districts.",
            "roadMarkings": "Continuous or dashed white centerlines; solid white edge lines; distinctive Portuguese stop signs ('STOP') and town entry plaques.",
            "delineators": "White posts with yellow reflectors on the right and white on the left.",
            "cameraGen": "Complete Gen 3 and Gen 4 coverage across continental Portugal, Madeira, and the Azores."
        },
        "aiSummary": {
            "geo": "Oldest nation-state in Europe with unchanged borders since 1297; Atlantic nation with Azores and Madeira.",
            "flag": "Green and red vertical bicolor with the golden navigational Armillary Sphere and National Shield.",
            "freedom": "1974 peaceful Carnation Revolution on April 25 restored democracy; enacted 1976 Constitution.",
            "challenge": "Affordable housing expansion, green hydrogen scaling, and Iberian rail modernization."
        },
        "faqs": [
            {
                "question": "What was the Carnation Revolution on April 25, 1974?",
                "answer": "The Carnation Revolution was a peaceful coup in Lisbon that ended nearly 50 years of Estado Novo dictatorship, restoring democracy without bloodshed as soldiers put carnations in their gun barrels."
            },
            {
                "question": "What is the Armillary Sphere on the Portuguese flag?",
                "answer": "The armillary sphere is an ancient astronomical navigation tool representing Portugal's maritime exploration during the Age of Discovery."
            }
        ],
        "timeline": [
            {"year": "1139", "event": "Afonso Henriques wins the Battle of Ourique, proclaiming himself the first King of Portugal."},
            {"year": "1297", "event": "The Treaty of Alcañices establishes Portugal's definitive continental land borders."},
            {"year": "1498", "event": "Vasco da Gama arrives in India, establishing the first direct sea route from Europe to Asia."},
            {"year": "1755", "event": "The Great Lisbon Earthquake destroys the capital, leading to the Pombaline architectural reconstruction."},
            {"year": "1910", "event": "The October 5 Revolution overthrows the monarchy, establishing the Portuguese First Republic."},
            {"year": "1974", "event": "The Carnation Revolution on April 25 peacefully restores constitutional democracy."},
            {"year": "1986", "event": "Portugal accedes to the European Economic Community (European Union)."}
        ]
    }
}

for code, data in batch2_part2.items():
    file_path = os.path.join(output_dir, f"{code}.json")
    with open(file_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print(f"Updated {code.upper()} chronicle successfully.")
