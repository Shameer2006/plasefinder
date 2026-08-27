import json
import os

output_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "../src/data/chronicles"))
os.makedirs(output_dir, exist_ok=True)

batch1_part2 = {
    "id": {
        "code": "ID",
        "name": "Indonesia",
        "capital": "Jakarta (moving to Nusantara)",
        "continent": "Asia",
        "population": "277.5 Million",
        "currency": "Indonesian Rupiah (IDR)",
        "languages": ["Indonesian (Bahasa Indonesia)"],
        "seoTitle": "History of Indonesia: Emerald Equator, Sang Saka Merah Putih Flag, and 1945 Independence",
        "metaDescription": "Explore the detailed history of Indonesia. Discover the Srivijaya and Majapahit empires, the 1945 Proclamation of Independence, and the Red-White flag.",
        "mapFormation": "Straddling the equator across Southeast Asia and Oceania across 1.9 million square kilometers, the Republic of Indonesia is the world's largest archipelagic state, comprising over 17,500 islands stretching from Sumatra to Papua. Ancient maritime empires—including the Buddhist <strong>Srivijaya Empire</strong> in Sumatra (7th–11th century) and the Hindu-Buddhist <strong>Majapahit Empire</strong> in Java (13th–16th century) under Prime Minister Gajah Mada—established extensive spice trading routes across the Malacca Strait.<br><br>In the 17th century, the Dutch East India Company (VOC) colonized the archipelago as the Dutch East Indies. Following Japanese occupation in World War II, Indonesian leaders <strong>Sukarno and Mohammad Hatta</strong> proclaimed independence on <strong>August 17, 1945</strong>. Following the Indonesian National Revolution, the Netherlands officially recognized Indonesian sovereignty in the 1949 Dutch-Indonesian Round Table Conference, finalizing the modern archipelagic borders from Sabang to Merauke.",
        "flagHistory": "The national flag of Indonesia—known as <strong>Sang Saka Merah Putih</strong> (The Sacred Red and White)—features two equal horizontal bands of red (top) and white (bottom), officially introduced on <strong>August 17, 1945</strong>.<br><br>The red and white color scheme traces its ancient royal heritage back over 700 years to the 9-striped naval banner of the <strong>Majapahit Empire</strong> in 1293. In traditional Indonesian philosophy: <strong>Red</strong> symbolizes human physical courage and blood; <strong>White</strong> represents spiritual purity and the soul. Together, they represent the complete human being and the eternal spirit of the archipelago.",
        "freedomStory": "Indonesia's path to sovereign freedom was forged through a historic combination of mass revolutionary mobilization and international diplomacy.<br><br>On the morning of <strong>August 17, 1945</strong>, at Pegangsaan Timur 56 in Jakarta, Sukarno read the concise <strong>Proclamation of Indonesian Independence</strong> (<em>Teks Proklamasi</em>). When Dutch forces attempted to re-establish colonial rule, millions of young freedom fighters (<em>Pemuda</em>) waged a four-year military and diplomatic war of independence, epitomized by the Battle of Surabaya on November 10, 1945 (celebrated as Heroes' Day / <em>Hari Pahlawan</em>).<br><br>The nation established the unifying state philosophy of <strong>Pancasila</strong> (Five Principles) and the national motto <em>'Bhinneka Tunggal Ika'</em> ('Unity in Diversity'), uniting over 300 distinct ethnic groups under one democratic republic.",
        "challenges": "As Southeast Asia's largest economy and a leading G20 member, Indonesia balances massive mineral resource downstreaming (nickel/EV supply chains) with environmental conservation across Borneo and Sumatra. Foremost priorities include constructing the new sustainable rainforest capital of <strong>Nusantara</strong> in East Kalimantan to alleviate ground subsidence in Jakarta, expanding geothermal energy, and managing inter-island maritime logistics.",
        "images": {
            "landscape": {
                "url": "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=1200&auto=format&fit=crop",
                "alt": "Mount Bromo volcano in East Java, Indonesia",
                "caption": "Mount Bromo in the Bromo Tengger Semeru National Park, an active volcano rising from the Sea of Sand in East Java."
            },
            "landmark": {
                "url": "https://images.unsplash.com/photo-1548115184-bc6544d06a58?q=80&w=1200&auto=format&fit=crop",
                "alt": "Borobudur Buddhist Temple in Central Java, Indonesia",
                "caption": "Borobudur Temple in Central Java, built in the 8th and 9th centuries during the Sailendra Dynasty, the world's largest Buddhist monument."
            },
            "streetview": {
                "url": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop",
                "alt": "Indonesian street view with black license plates and left-hand driving",
                "caption": "Indonesian road clues: driving on the left, black license plates with triple date stamps, and lush tropical roadside palm vegetation."
            }
        },
        "streetViewMeta": {
            "drivingSide": "Left",
            "licensePlates": "Black rectangular plates with white lettering formatted as 1-2 area letters, 1-4 numbers, and month/year expiration stamp.",
            "utilityPoles": "Reinforced concrete poles with multiple transformer cylinders; wooden poles along rural Sumatran tracks.",
            "roadMarkings": "Continuous or dashed white centerlines; solid yellow lines on major national corridors.",
            "delineators": "Black-and-white striped curbstones at intersections and bridges.",
            "cameraGen": "Extensive Gen 3 and Gen 4 coverage across Java, Sumatra, Bali, Kalimantan, Sulawesi, and Nusa Tenggara."
        },
        "aiSummary": {
            "geo": "World's largest archipelagic state spanning 17,500+ islands; borders shaped by the Majapahit Empire and 1949 independence.",
            "flag": "Sang Saka Merah Putih: red and white horizontal bicolor originating from the 1293 Majapahit banner.",
            "freedom": "1945 Proclamation of Independence read by Sukarno; unified under the Pancasila philosophy.",
            "challenge": "Capital relocation to Nusantara in Kalimantan, rainforest conservation, and inter-island connectivity."
        },
        "faqs": [
            {
                "question": "When did Indonesia declare its independence?",
                "answer": "Indonesia declared independence on August 17, 1945, when Sukarno and Mohammad Hatta read the Proclamation of Independence in Jakarta."
            },
            {
                "question": "What is the meaning of the national motto 'Bhinneka Tunggal Ika'?",
                "answer": "Originating from an ancient 14th-century Javanese poem by Mpu Tantular, it translates to 'Unity in Diversity', celebrating harmonious coexistence among hundreds of cultures."
            }
        ],
        "timeline": [
            {"year": "1293", "event": "The Majapahit Empire is established in East Java, unifying the Indonesian archipelago."},
            {"year": "1602", "event": "The Dutch East India Company (VOC) begins colonial monopolization of the spice trade."},
            {"year": "1945", "event": "Sukarno and Mohammad Hatta proclaim Indonesian independence on August 17."},
            {"year": "1949", "event": "The Netherlands officially transfers sovereignty at the Round Table Conference."},
            {"year": "1955", "event": "Bandung hosts the historic Asian-African Conference, founding the Non-Aligned Movement."},
            {"year": "1998", "event": "The Reformasi movement initiates the modern democratic era of the Republic of Indonesia."},
            {"year": "2024", "event": "Indonesia begins phased government operations in the new green capital city of Nusantara."}
        ]
    },
    "tr": {
        "code": "TR",
        "name": "Turkey",
        "capital": "Ankara",
        "continent": "Europe/Asia",
        "population": "85.3 Million",
        "currency": "Turkish Lira (TRY)",
        "languages": ["Turkish"],
        "seoTitle": "History of Turkey: Anatolian Bridge, Crescent & Star Flag, and Atatürk Republic",
        "metaDescription": "Explore the detailed history of Turkey. Discover the Ottoman Empire, Mustafa Kemal Atatürk's 1923 Republic, the Bosphorus, and the Turkish flag.",
        "mapFormation": "Straddling the continents of Europe and Asia across 783,562 square kilometers, the Republic of Turkey (<em>Türkiye Cumhuriyeti</em>) occupies the Anatolian peninsula bounded by the Black Sea, Aegean Sea, and Mediterranean Sea, controlling the strategic <strong>Bosphorus and Dardanelles Straits</strong> (the Turkish Straits) linking the Black Sea to the Mediterranean.<br><br>Anatolia has cradled major civilizations for millennia, including the Hittites, Greeks, Romans, and Byzantines with their imperial capital in Constantinople. In 1071, Seljuk Turks won the Battle of Manzikert, opening Anatolia to Turkish settlement. In 1299, Osman I founded the <strong>Ottoman Empire</strong>, which captured Constantinople in 1453 under Sultan Mehmed II, governing an empire spanning Southeast Europe, Western Asia, and North Africa for over six centuries.<br><br>Following the collapse of the Ottoman Empire in World War I, the modern sovereign borders were defended in the Turkish War of Independence led by <strong>Mustafa Kemal Atatürk</strong> and internationally codified in the <strong>Treaty of Lausanne on July 24, 1923</strong>. The Republic was officially proclaimed on <strong>October 29, 1923</strong>, establishing the capital in central <strong>Ankara</strong>.",
        "flagHistory": "The national flag of Turkey—the <strong>Al Bayrak</strong> (The Red Flag) or <em>Ay Yıldız</em> (Crescent and Star)—features a white crescent moon and five-pointed star positioned slightly off-center on a vivid crimson-red field.<br><br>The design directly inherits the state standard of the Ottoman Empire, codified in 1844 by Sultan Abdülmejid I and standardized under the Turkish Flag Law in 1936. In Turkish poetic lore, the design reflects the celestial reflection of the crescent moon and evening star shining in a pool of blood spilled by Turkish patriots defending their homeland. The <strong>Crescent</strong> represents progress and renewal, while the <strong>Star</strong> represents light, victory, and the unity of the Turkish nation.",
        "freedomStory": "Turkey's sovereign freedom was forged through the heroic crucible of the <strong>Turkish War of Independence (1919–1923)</strong>.<br><br>Following the post-WWI partition of Ottoman territories under the Treaty of Sèvres, Field Marshal <strong>Mustafa Kemal Atatürk</strong> landed at Samsun on May 19, 1919, rallying national resistance. The Grand National Assembly convened in Ankara in April 1920 under the rallying cry: <em>'Egemenlik, kayıtsız şartsız Milletindir'</em> ('Sovereignty unconditionally belongs to the Nation').<br><br>Following decisive military victories, the Treaty of Lausanne recognized Turkish sovereignty. On <strong>October 29, 1923</strong>, the Grand National Assembly proclaimed the Republic of Turkey, electing Atatürk as its first President. Atatürk executed revolutionary modernization reforms: establishing a secular civil code, replacing Arabic script with the Latin Turkish alphabet, granting full equal political rights and suffrage to women in 1934, and founding a modern industrial state.",
        "challenges": "Positioned at the geopolitical pivot between Europe, the Middle East, and the Caucasus, Turkey manages vital transit corridors, gas pipelines, and NATO defense responsibilities. Domestically, the nation addresses inflation and currency stabilization, advances renewable solar and wind power, and executes comprehensive earthquake retrofitting programs across active North and East Anatolian fault lines.",
        "images": {
            "landscape": {
                "url": "https://images.unsplash.com/photo-1543783207-ec64e4d95325?q=80&w=1200&auto=format&fit=crop",
                "alt": "Cappadocia hot air balloons and fairy chimneys, Turkey",
                "caption": "Hot air balloons over the volcanic rock fairy chimneys of Cappadocia in central Anatolia, Turkey."
            },
            "landmark": {
                "url": "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1200&auto=format&fit=crop",
                "alt": "Hagia Sophia Grand Mosque in Istanbul, Turkey",
                "caption": "Hagia Sophia in Istanbul, constructed in 537 CE as a Byzantine cathedral, later an imperial Ottoman mosque and UNESCO monument."
            },
            "streetview": {
                "url": "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=1200&auto=format&fit=crop",
                "alt": "Turkish highway with red-bordered signs and blue license plate strip",
                "caption": "Turkish street view characteristics: white plates with blue left-hand 'TR' strip, red-bordered speed limit circles, and Turkish town signs (Nüfus)."
            }
        },
        "streetViewMeta": {
            "drivingSide": "Right",
            "licensePlates": "White rectangular plates with blue strip on the left containing 'TR'; the first two digits represent the province (e.g., 34 for Istanbul, 06 for Ankara).",
            "utilityPoles": "Metal lattice towers or wooden poles with horizontal struts; concrete poles in urban centers.",
            "roadMarkings": "Continuous or dashed white centerlines; solid white edge lines; blue-background city entry signs listing population (Nüfus) and altitude (Rakım).",
            "delineators": "White posts with red reflectors on the right and white on the left.",
            "cameraGen": "Extensive Gen 3 and Gen 4 coverage across all 81 provinces."
        },
        "aiSummary": {
            "geo": "Transcontinental bridge between Europe and Asia; borders codified in the 1923 Treaty of Lausanne.",
            "flag": "Ay Yıldız: crimson red field with white crescent moon and five-pointed star.",
            "freedom": "1919-1923 War of Independence led by Atatürk; secular democratic Republic proclaimed Oct 29, 1923.",
            "challenge": "Seismic fault line infrastructure resilience, economic inflation stabilization, and regional trade corridor balancing."
        },
        "faqs": [
            {
                "question": "When was the Republic of Turkey founded?",
                "answer": "The Republic of Turkey was officially proclaimed on October 29, 1923, by Mustafa Kemal Atatürk, who became its founding President."
            },
            {
                "question": "What is the strategic significance of the Turkish Straits?",
                "answer": "The Bosphorus and Dardanelles Straits connect the Black Sea to the Mediterranean, regulated under the 1936 Montreux Convention as a vital maritime trade artery."
            }
        ],
        "timeline": [
            {"year": "1071", "event": "Seljuk Sultan Alp Arslan defeats Byzantine forces at the Battle of Manzikert, opening Anatolia."},
            {"year": "1453", "event": "Sultan Mehmed II captures Constantinople, establishing it as the imperial Ottoman capital."},
            {"year": "1919", "event": "Mustafa Kemal Atatürk lands in Samsun on May 19, initiating the Turkish War of Independence."},
            {"year": "1923", "event": "The Treaty of Lausanne is signed; the Republic of Turkey is proclaimed on October 29 with Ankara as capital."},
            {"year": "1934", "event": "Turkish women are granted full voting and parliamentary candidacy rights."},
            {"year": "1952", "event": "Turkey joins NATO, anchoring the alliance's strategic southern flank."}
        ]
    },
    "sa": {
        "code": "SA",
        "name": "Saudi Arabia",
        "capital": "Riyadh",
        "continent": "Asia",
        "population": "36.4 Million",
        "currency": "Saudi Riyal (SAR)",
        "languages": ["Arabic"],
        "seoTitle": "History of Saudi Arabia: Arabian Peninsula, Shahada Green Flag, and Vision 2030",
        "metaDescription": "Explore the comprehensive history of Saudi Arabia. Discover the unification of King Abdulaziz, the Shahada sword flag, Mecca and Medina, and Vision 2030.",
        "mapFormation": "Covering 2.15 million square kilometers across 80% of the Arabian Peninsula in Western Asia, the Kingdom of Saudi Arabia (<em>Al-Mamlaka Al-Arabiya As-Saudiya</em>) is bounded by the Red Sea to the west and the Arabian Gulf to the east, home to the vast Rub' al Khali (Empty Quarter) desert.<br><br>The Arabian Peninsula is the sacred cradle of Islam, where the Prophet Muhammad established the first Islamic community in <strong>Mecca and Medina</strong> (the Two Holy Mosques) in the 7th century CE. The modern Saudi state is the culmination of three historical Saudi states, beginning with the 1744 alliance between Imam Muhammad bin Saud and Sheikh Muhammad ibn Abd al-Wahhab in Diriyah.<br><br>On <strong>September 23, 1932</strong>, following a thirty-year campaign that began with the daring recapture of Riyadh in 1902, <strong>King Abdulaziz Al Saud (Ibn Saud)</strong> issued a Royal Decree unifying the Kingdoms of Nejd and Hejaz into the modern Kingdom of Saudi Arabia (celebrated annually as Saudi National Day).",
        "flagHistory": "The national flag of Saudi Arabia is a revered green banner featuring the white Arabic <strong>Shahada</strong> (the Islamic declaration of faith) positioned above a horizontal white sword.<br><br>The inscription in elegant Arabic Thuluth script reads: <em>'Lā ʾilāha ʾillā-llāh, Muḥammadur-rasūlu-llāh'</em> ('There is no god but Allah; Muhammad is the Messenger of Allah'). Beneath the inscription is a straight white sword pointing to the hoist, symbolizing justice, strength, and the defense of truth. Because the flag contains the sacred word of God, it is never lowered to half-mast under any circumstances and is printed identically on both the obverse and reverse sides so the script reads correctly from right to left.",
        "freedomStory": "Saudi Arabia's modern sovereign identity was forged through the visionary leadership and unifying campaigns of King Abdulaziz Al Saud.<br><br>In January 1902, with just 40 men, young Abdulaziz recaptured Masmak Fortress in Riyadh, re-establishing the House of Saud. Through strategic tribal alliances and military campaigns, he incorporated the Eastern Province (Al-Hasa) in 1913, Asir in 1920, and the Hejaz in 1925, unifying the disparate tribes of the peninsula under one sovereign monarchy on September 23, 1932.<br><br>The discovery of commercial petroleum at Dammam Well No. 7 ('Prosperity Well') in 1938 transformed the kingdom into a global energy superpower, founding the modern infrastructure network connecting the Red Sea to the Arabian Gulf.",
        "challenges": "Under the transformative <strong>Vision 2030</strong> economic blueprint led by Crown Prince Mohammed bin Salman, Saudi Arabia is executing the largest economic diversification program in the Middle East. Priorities include constructing the futuristic renewable mega-region of <strong>NEOM</strong>, developing world-class cultural heritage tourism at AlUla and Diriyah, expanding women's workforce participation, and installing 50 gigawatts of solar and green hydrogen capacity.",
        "images": {
            "landscape": {
                "url": "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=1200&auto=format&fit=crop",
                "alt": "Hegra ancient Nabataean tombs in AlUla, Saudi Arabia",
                "caption": "The monumental rock-cut Nabataean tombs of Hegra (Mada'in Salih) in AlUla, Saudi Arabia's first UNESCO World Heritage Site."
            },
            "landmark": {
                "url": "https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?q=80&w=1200&auto=format&fit=crop",
                "alt": "Kingdom Centre skyscraper in Riyadh, Saudi Arabia",
                "caption": "The Kingdom Centre tower illuminating the modern skyline of Riyadh, the capital and financial heart of Saudi Arabia."
            },
            "streetview": {
                "url": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
                "alt": "Saudi Arabian modern highway with Arabic and English signs",
                "caption": "Saudi street view signatures: multi-lane illuminated desert expressways, Arabic/English bilingual green signs, and white license plates."
            }
        },
        "streetViewMeta": {
            "drivingSide": "Right",
            "licensePlates": "White rectangular plates divided into two sections: Arabic letters and digits on the right, English/Latin characters on the left, with the Saudi crest in the center.",
            "utilityPoles": "Tall galvanized steel light poles along desert highways; concrete posts in residential districts.",
            "roadMarkings": "Continuous or dashed yellow and white lane dividers; reflective raised pavement markers (Cat's eyes).",
            "delineators": "Guideposts with yellow reflectors along desert shoulders.",
            "cameraGen": "Pristine Gen 4 coverage across Riyadh, Jeddah, Dammam, Mecca, Medina, and the AlUla region."
        },
        "aiSummary": {
            "geo": "Arabian Peninsula kingdom; unified by King Abdulaziz on September 23, 1932.",
            "flag": "Green banner with the white Arabic Shahada inscription above a straight sword representing justice.",
            "freedom": "Sovereign unification of Nejd and Hejaz in 1932; modern Vision 2030 economic transformation.",
            "challenge": "Vision 2030 post-oil diversification, green hydrogen energy scaling, and water desalination management."
        },
        "faqs": [
            {
                "question": "When was the Kingdom of Saudi Arabia unified?",
                "answer": "Saudi Arabia was unified on September 23, 1932, by King Abdulaziz Al Saud (Ibn Saud), celebrated annually as Saudi National Day."
            },
            {
                "question": "Why is the Saudi Arabian flag never flown at half-mast?",
                "answer": "The flag is never lowered to half-mast because it bears the sacred Islamic declaration of faith (the Shahada), and lowering it is considered sacrilegious."
            }
        ],
        "timeline": [
            {"year": "1744", "event": "Imam Muhammad bin Saud establishes the First Saudi State in Diriyah."},
            {"year": "1902", "event": "Abdulaziz Al Saud recaptures Riyadh and Masmak Fortress, founding the modern Third Saudi State."},
            {"year": "1932", "event": "Royal Decree officially unifies the Kingdom of Saudi Arabia on September 23."},
            {"year": "1938", "event": "Commercial petroleum is discovered at Dammam Well No. 7 (Prosperity Well)."},
            {"year": "2016", "event": "Saudi Arabia launches the transformative Vision 2030 economic blueprint."},
            {"year": "2023", "event": "Riyadh is selected to host the World Expo 2030, highlighting global cultural leadership."}
        ]
    },
    "ar": {
        "code": "AR",
        "name": "Argentina",
        "capital": "Buenos Aires",
        "continent": "South America",
        "population": "46.2 Million",
        "currency": "Argentine Peso (ARS)",
        "languages": ["Spanish"],
        "seoTitle": "History of Argentina: Pampas to Patagonia, Sun of May Flag, and 1816 Independence",
        "metaDescription": "Explore the detailed history of Argentina. Discover José de San Martín, the 1816 Congress of Tucumán, the Sun of May celestial flag, and the Andes.",
        "mapFormation": "Stretching 3,650 kilometers from subtropical rainforests in the north to the glacial channels of Tierra del Fuego in the south across 2.78 million square kilometers, the Argentine Republic is the second-largest nation in South America. The sovereign realm is bounded to the west by the Andes mountains, bordering Chile along the longest continuous international mountain boundary in the Americas.<br><br>The territory was administered by the Spanish Crown as part of the Viceroyalty of Peru, and later the <strong>Viceroyalty of the Río de la Plata</strong> established in 1776 with its capital in Buenos Aires. Following the May Revolution of 1810 and independence in 1816, Argentina underwent decades of internal conflict between <em>Unitarios</em> (centralists in Buenos Aires) and <em>Federales</em> (provincial leaders) before establishing the unified Federal Republic under the <strong>1853 Constitution of Argentina</strong>.",
        "flagHistory": "The national flag of Argentina—the <strong>Celeste y Blanca</strong> (Light Blue and White)—was created by revolutionary general and national hero <strong>Manuel Belgrano</strong> on February 27, 1812, in Rosario.<br><br>The flag features three equal horizontal bands of light sky blue (top and bottom) and white (middle). At the center of the white band is the golden-yellow <strong>Sun of May</strong> (<em>Sol de Mayo</em>), a radiant celestial sun with 32 alternating straight and wavy rays modeled after the Inca sun god Inti. The sun commemorates the May Revolution of May 25, 1810, when the sun broke through clouds over Buenos Aires as the first patriotic government was proclaimed.",
        "freedomStory": "Argentina's struggle for independence was a continental liberation campaign that freed not only Argentina, but also Chile and Peru.<br><br>On <strong>May 25, 1810</strong>, the citizens of Buenos Aires deposed the Spanish Viceroy and established the First Junta (the May Revolution). On <strong>July 9, 1816</strong>, delegates from the United Provinces of the Río de la Plata convened at the <strong>Congress of Tucumán</strong>, formally declaring sovereign independence from the Spanish Crown.<br><br>General <strong>José de San Martín</strong>—the 'Father of the Nation'—executed one of the most brilliant military feats in world history in 1817 by leading his Army of the Andes over 4,000-meter Andean passes into Chile, defeating royalist armies at the Battles of Chacabuco and Maipú, and sailing northward to liberate Lima, Peru in 1821.",
        "challenges": "As South America's second-largest economy, Argentina balances immense agricultural fertile wealth across the Pampas and massive lithium and shale energy reserves in Vaca Muerta with economic restructuring. Foremost priorities include fiscal and macroeconomic currency stabilization, expanding lithium battery extraction corridors in the northern Puna, and advancing Patagonia wind power.",
        "images": {
            "landscape": {
                "url": "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=1200&auto=format&fit=crop",
                "alt": "Perito Moreno Glacier in Patagonia, Argentina",
                "caption": "The towering ice walls of the Perito Moreno Glacier in Los Glaciares National Park, Santa Cruz Province, southern Argentina."
            },
            "landmark": {
                "url": "https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?q=80&w=1200&auto=format&fit=crop",
                "alt": "Casa Rosada and Plaza de Mayo in Buenos Aires, Argentina",
                "caption": "The Casa Rosada (Pink House) presidential palace on the historic Plaza de Mayo in Buenos Aires."
            },
            "streetview": {
                "url": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop",
                "alt": "Argentine national highway with black and white guardrail posts",
                "caption": "Argentine street view indicators: black-and-white diagonal hazard posts, RN highway shields, long car antenna meta, and flat Pampas plains."
            }
        },
        "streetViewMeta": {
            "drivingSide": "Right",
            "licensePlates": "Mercosur plates with a black top strip containing 'ARGENTINA'; older plates are black with three white letters and three numbers.",
            "utilityPoles": "Concrete poles with metal crossbars; wooden poles in rural Pampas farms.",
            "roadMarkings": "Yellow centerlines separating traffic; white dashed or solid edge lines; national route marker shields labeled 'RN'.",
            "delineators": "Black-and-white diagonally striped guardrail posts and concrete bridge abutments.",
            "cameraGen": "Comprehensive Gen 3 and Gen 4 coverage across all 23 provinces from Jujuy to Ushuaia."
        },
        "aiSummary": {
            "geo": "Second-largest South American nation; bounded by the Andes and the Atlantic; unified under the 1853 Constitution.",
            "flag": "Celeste y Blanca: sky blue and white horizontal triband featuring the golden 32-ray Sun of May.",
            "freedom": "1810 May Revolution and 1816 Congress of Tucumán; liberated by General José de San Martín.",
            "challenge": "Fiscal currency stabilization, Vaca Muerta shale energy scaling, and lithium resource industrialization."
        },
        "faqs": [
            {
                "question": "When did Argentina declare its independence?",
                "answer": "Argentina declared independence on July 9, 1816, at the Congress of Tucumán, celebrated annually as Independence Day (Día de la Independencia)."
            },
            {
                "question": "What is the Sun of May on the Argentine flag?",
                "answer": "The Sun of May (Sol de Mayo) is a radiant golden sun with 32 alternating straight and wavy rays, modeled after the Inca sun god Inti to commemorate the May Revolution of 1810."
            }
        ],
        "timeline": [
            {"year": "1776", "event": "The Spanish Crown creates the Viceroyalty of the Río de la Plata with Buenos Aires as capital."},
            {"year": "1810", "event": "The May Revolution of May 25 deposes the Spanish Viceroy and establishes the First Junta."},
            {"year": "1816", "event": "The Congress of Tucumán declares Argentine independence on July 9."},
            {"year": "1817", "event": "General José de San Martín leads the Army of the Andes across the mountains to liberate Chile and Peru."},
            {"year": "1853", "event": "Promulgation of the Constitution of the Argentine Republic in Santa Fe."},
            {"year": "1983", "event": "Raúl Alfonsín is elected President, marking the permanent restoration of constitutional democracy."}
        ]
    },
    "cl": {
        "code": "CL",
        "name": "Chile",
        "capital": "Santiago",
        "continent": "South America",
        "population": "19.6 Million",
        "currency": "Chilean Peso (CLP)",
        "languages": ["Spanish"],
        "seoTitle": "History of Chile: Andean Spine, Lone Star Flag Vexillology, and 1818 Independence",
        "metaDescription": "Explore the detailed history of Chile. Discover the Atacama Desert, Bernardo O'Higgins, the 1818 Independence, and the Lone Star flag.",
        "mapFormation": "Stretching over 4,300 kilometers along the southwestern coast of South America while averaging just 175 kilometers in width, the Republic of Chile is the longest and narrowest country in the world, flanked by the Pacific Ocean to the west and the towering Andes Mountains to the east.<br><br>The territory spans dramatic ecological extremes: from the hyper-arid <strong>Atacama Desert</strong> in the north (the driest non-polar desert on Earth) to the Mediterranean central agricultural valleys and the glacial fjords of Chilean Patagonia in the south. Indigenous Mapuche communities fiercely resisted both Inca expansion and Spanish conquest in the multi-century Arauco War.<br><br>Following the 1810 First National Government Junta and the Chilean War of Independence led by <strong>Bernardo O'Higgins</strong>, Chile declared sovereign independence on <strong>February 12, 1818</strong>. In the late 19th century, victory in the War of the Pacific (1879–1884) expanded Chilean borders northward into the mineral-rich Atacama, and in 1888, Chile formally incorporated Rapa Nui (Easter Island) in the Pacific.",
        "flagHistory": "The national flag of Chile—known affectionately as <strong>La Estrella Solitaria</strong> (The Lone Star)—features two equal horizontal bands of white (top) and red (bottom), with a blue square canton containing a white five-pointed star in the upper hoist, officially adopted on <strong>October 18, 1817</strong>.<br><br>The design was created during the War of Independence by Minister of War José Ignacio Zenteno and painter Charles Wood. In traditional vexillological symbolism: <strong>Blue</strong> represents the clear Pacific skies and mountain air; <strong>White</strong> represents the snow-covered peaks of the Andes; and <strong>Red</strong> symbolizes the blood of indigenous warriors and patriots who fought for liberty. The single <strong>White Star</strong> represents the guiding star of progress and the unitary character of the Chilean republic.",
        "freedomStory": "Chile's path to sovereign freedom was achieved through the heroism of the Army of the Andes and visionary founding statesmen.<br><br>On <strong>September 18, 1810</strong>, the citizens of Santiago established the First National Government Junta (celebrated annually as the <em>Fiestas Patrias</em>). Following the Battle of Rancagua, Chilean patriots regrouped in Mendoza with General José de San Martín. In 1817, the Army of the Andes achieved a decisive victory at the Battle of Chacabuco.<br><br>On <strong>February 12, 1818</strong>, Supreme Director <strong>Bernardo O'Higgins</strong> proclaimed Chilean independence in Talca, confirmed two months later by the decisive victory at the Battle of Maipú. Following a 1988 democratic plebiscite, Chile returned to full constitutional democracy in 1990.",
        "challenges": "As the world's premier producer of copper and lithium and an OECD member, Chile leads global clean energy transitions. Foremost priorities include developing green hydrogen in Magallanes, modernizing water desalination networks in the Atacama mining corridor, and expanding seismic resilience against major subduction earthquakes along the Nazca-South American plate boundary.",
        "images": {
            "landscape": {
                "url": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
                "alt": "Torres del Paine granite peaks in Chilean Patagonia",
                "caption": "The iconic granite horn peaks of Torres del Paine National Park in Chilean Patagonia, southern Chile."
            },
            "landmark": {
                "url": "https://images.unsplash.com/photo-1512813195386-6cf811ad3542?q=80&w=1200&auto=format&fit=crop",
                "alt": "Palacio de La Moneda in Santiago, Chile",
                "caption": "Palacio de La Moneda in Santiago, the historic neoclassical presidential palace of the Republic of Chile."
            },
            "streetview": {
                "url": "https://images.unsplash.com/photo-1509840841025-9088ba78a826?q=80&w=1200&auto=format&fit=crop",
                "alt": "Chilean highway with all-white road markings and Andes mountains",
                "caption": "Chilean street view signatures: all-white road centerlines, Andes mountains visible to the east, and silver-backed road signs."
            }
        },
        "streetViewMeta": {
            "drivingSide": "Right",
            "licensePlates": "White rectangular plates with black lettering in BB-BB-11 format; older plates feature two letters and four numbers.",
            "utilityPoles": "Reinforced concrete poles with multiple transformer cylinders and metal cross-arms.",
            "roadMarkings": "All-white centerlines (solid or dashed) unique in South America where centerlines are usually yellow; solid white edge lines.",
            "delineators": "White cylindrical posts with red rectangular reflectors on the right (white on the left).",
            "cameraGen": "Dense Gen 3 and Gen 4 coverage across the entire country from Arica in the north to Punta Arenas in the south."
        },
        "aiSummary": {
            "geo": "Longest narrow nation in the world stretching 4,300 km; bounded by the Pacific and Andes mountains.",
            "flag": "La Estrella Solitaria: white and red horizontal bicolor with a blue canton and single white star.",
            "freedom": "1810 First Junta and 1818 Declaration of Independence proclaimed by Bernardo O'Higgins.",
            "challenge": "Green hydrogen leadership, Atacama water desalination, and lithium battery manufacturing."
        },
        "faqs": [
            {
                "question": "When did Chile declare independence?",
                "answer": "Chile established its first government on September 18, 1810, and officially proclaimed independence on February 12, 1818, led by Bernardo O'Higgins."
            },
            {
                "question": "Why is Chile geographically unique?",
                "answer": "Chile is the longest and narrowest nation on Earth, stretching 4,300 km from the driest desert (Atacama) to glacial Patagonian fjords while averaging only 175 km in width."
            }
        ],
        "timeline": [
            {"year": "1810", "event": "The First National Government Junta convenes in Santiago on September 18 (Fiestas Patrias)."},
            {"year": "1817", "event": "The Army of the Andes wins the Battle of Chacabuco, liberating central Chile."},
            {"year": "1818", "event": "Bernardo O'Higgins proclaims Chilean independence on February 12 in Talca."},
            {"year": "1879-1884", "event": "Victory in the War of the Pacific expands Chilean territory northward into the Atacama."},
            {"year": "1888", "event": "Chile incorporates Rapa Nui (Easter Island) in the South Pacific Ocean."},
            {"year": "1990", "event": "Patricio Aylwin takes office as President, restoring constitutional democracy."}
        ]
    }
}

for code, data in batch1_part2.items():
    file_path = os.path.join(output_dir, f"{code}.json")
    with open(file_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print(f"Updated {code.upper()} chronicle successfully.")
