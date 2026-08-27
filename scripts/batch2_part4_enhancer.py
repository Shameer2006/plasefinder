import json
import os

output_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "../src/data/chronicles"))
os.makedirs(output_dir, exist_ok=True)

batch2_part4 = {
    "co": {
        "code": "CO",
        "name": "Colombia",
        "capital": "Bogotá",
        "continent": "South America",
        "population": "52.2 Million",
        "currency": "Colombian Peso (COP)",
        "languages": ["Spanish"],
        "seoTitle": "History of Colombia: Crossroads of Two Oceans, Miranda Tricolor, and Bolívar Independence",
        "metaDescription": "Explore the detailed history of Colombia. Discover Gran Colombia, Simón Bolívar, the yellow-blue-red flag, and Andean biodiversity.",
        "mapFormation": "Occupying 1.14 million square kilometers in the northwestern gateway of South America, the Republic of Colombia is the only country in South America with coastlines on both the <strong>Pacific Ocean and the Caribbean Sea</strong>. The terrain is dominated by the majestic three-pronged cordillera of the <strong>Andes</strong> (Western, Central, and Eastern Cordilleras), the eastern Llanos plains, and the southern Amazonian rainforest.<br><br>The territory was home to advanced indigenous civilizations—including the Muisca, Tayrona, and Quimbaya, famous for gold metallurgy that inspired the legend of <em>El Dorado</em>. In the 16th century, Spanish conquistadors established the <strong>Viceroyalty of New Granada</strong> with its capital in Santa Fe de Bogotá.<br><br>Following the War of Independence led by <em>El Libertador</em> <strong>Simón Bolívar</strong>, the Congress of Angostura created the sovereign republic of <strong>Gran Colombia in 1819</strong>, uniting modern Colombia, Venezuela, Ecuador, and Panama. Following the dissolution of Gran Colombia in 1830 and the secession of Panama in 1903, the modern sovereign borders of the Republic of Colombia were established.",
        "flagHistory": "The national flag of Colombia—the <em>Tricolor Nacional</em>—features three horizontal bands of yellow, blue, and red with an unequal 2:1:1 proportion (the yellow band occupies the entire upper half of the flag).<br><br>The banner was created by precursor revolutionary leader <strong>Francisco de Miranda</strong> and adopted by Simón Bolívar for Gran Colombia in 1819. In classic heraldic and patriotic symbolism: <strong>Yellow</strong> (occupying half the flag) represents the boundless gold and mineral wealth of Colombian soil, the radiant sun, and justice; <strong>Blue</strong> represents the two oceans that embrace the nation and the open sky; and <strong>Red</strong> honors the sacred blood spilled by patriots and freedom fighters to secure sovereign liberty.",
        "freedomStory": "Colombia's path to sovereign freedom was forged through the brilliant military genius of Simón Bolívar and General Francisco de Paula Santander.<br><br>On <strong>July 20, 1810</strong>, the citizens of Bogotá formed the first Supreme Government Junta following the incident of Llorente's Flowerpot (celebrated as Colombian Independence Day). On <strong>August 7, 1819</strong>, Bolívar's liberating army achieved a decisive victory at the <strong>Battle of Boyacá</strong>, liberating Bogotá and ending Spanish colonial rule in New Granada.<br><br>In 1991, the nation enacted the progressive <strong>Constitution of 1991</strong>, establishing Colombia as a pluralistic constitutional state recognizing indigenous rights and human dignity. In 2016, the Colombian government signed the historic Final Peace Accord with the FARC in Cartagena, ending over five decades of internal armed conflict.",
        "challenges": "As the world's second most biodiverse nation and a top exporter of Arabica coffee and emeralds, Colombia balances economic growth with ecological stewardship. Foremost priorities include implementing sustainable agroforestry in the Amazon, executing territorial peace pacts in rural Pacific provinces, and expanding solar and geothermal grids.",
        "images": {
            "landscape": {
                "url": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
                "alt": "Cocora Valley wax palms in Quindío, Colombia",
                "caption": "The towering Quindío wax palms—the national tree of Colombia—in the lush green mountains of the Cocora Valley, Salento."
            },
            "landmark": {
                "url": "https://images.unsplash.com/photo-1512813195386-6cf811ad3542?q=80&w=1200&auto=format&fit=crop",
                "alt": "Santuario de Las Lajas in Nariño, Colombia",
                "caption": "Santuario de Las Lajas in Ipiales, Nariño, a magnificent neo-Gothic basilica built inside the canyon of the Guáitara River."
            },
            "streetview": {
                "url": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop",
                "alt": "Colombian street view with yellow taxi and cross-backed road signs",
                "caption": "Legendary Colombian Street View tell: road signs featuring an 'X' cross-brace on the back, bright yellow license plates on passenger cars, and yellow taxis."
            }
        },
        "streetViewMeta": {
            "drivingSide": "Right",
            "licensePlates": "Bright yellow rectangular plates for private passenger cars (three letters, three numbers) with the municipality name printed at the bottom; white plates for commercial transport.",
            "utilityPoles": "Wooden or concrete poles with crossbars; famous Colombian road signs featuring a prominent metal 'X' cross-brace on the back.",
            "roadMarkings": "Continuous or dashed yellow centerlines; solid white edge lines; national route shields with the word 'COLOMBIA' across the top.",
            "delineators": "White posts with red reflectors on the right and white on the left.",
            "cameraGen": "Dense Gen 3 and Gen 4 coverage across Bogotá, Medellín, Cali, the Coffee Axis, and Caribbean coast."
        },
        "aiSummary": {
            "geo": "Northwestern South American nation with Pacific and Caribbean coasts; Andes mountains and Amazon basin.",
            "flag": "Yellow, blue, and red horizontal tricolor (2:1:1 proportion) created by Francisco de Miranda and Bolívar.",
            "freedom": "1810 July 20 declaration and 1819 Battle of Boyacá; 1991 democratic Constitution and 2016 Peace Accord.",
            "challenge": "Territorial rural peace consolidation, Amazon conservation, and renewable energy expansion."
        },
        "faqs": [
            {
                "question": "What is the most famous Street View clue for Colombia?",
                "answer": "The back of Colombian road signs has a distinctive metal 'X' cross-brace support structure, and nearly all private passenger vehicles have bright yellow license plates with municipality names at the bottom."
            },
            {
                "question": "When did Colombia achieve independence?",
                "answer": "Independence was first declared in Bogotá on July 20, 1810, and secured militarily on August 7, 1819, at the Battle of Boyacá by Simón Bolívar."
            }
        ],
        "timeline": [
            {"year": "1538", "event": "Gonzalo Jiménez de Quesada founds Santa Fe de Bogotá in the Muisca highlands."},
            {"year": "1810", "event": "The Cry of Independence in Bogotá on July 20 establishes the first sovereign junta."},
            {"year": "1819", "event": "Simón Bolívar wins the Battle of Boyacá and proclaims the Republic of Gran Colombia."},
            {"year": "1886", "event": "Promulgation of the centralized Constitution of the Republic of Colombia."},
            {"year": "1991", "event": "A nationwide constituent assembly promulgates the progressive 1991 Constitution."},
            {"year": "2016", "event": "Signing of the historic Final Peace Agreement ending decades of internal conflict."}
        ]
    },
    "pe": {
        "code": "PE",
        "name": "Peru",
        "capital": "Lima",
        "continent": "South America",
        "population": "34.3 Million",
        "currency": "Peruvian Sol (PEN)",
        "languages": ["Spanish", "Quechua", "Aymara"],
        "seoTitle": "History of Peru: Cradle of the Inca Empire, Red-White-Red Flag, and 1821 Independence",
        "metaDescription": "Discover the detailed history of Peru. Explore the Inca Empire of Cusco, Machu Picchu, José de San Martín's 1821 Independence, and the Peruvian flag.",
        "mapFormation": "Spanning 1.28 million square kilometers along the central Pacific coast of South America, the Republic of Peru (<em>Perú</em>) encompasses three distinct geographic zones: the arid coastal desert (<em>Costa</em>), the towering Andean cordillera (<em>Sierra</em>) with peaks exceeding 6,700 meters, and the immense Amazonian rainforest basin (<em>Selva</em>) covering 60% of national territory.<br><br>Peru is the ancient home of <strong>Caral-Supe</strong> (c. 3000 BCE)—the oldest known civilization in the Americas—followed by the Chavín, Nazca, Moche, and Wari cultures. In the 15th century, the <strong>Inca Empire (Tawantinsuyu)</strong> expanded from its capital in Cusco under Pachacuti, constructing monumental stone citadels like <strong>Machu Picchu</strong> and a 40,000-kilometer paved road network (Qhapaq Ñan).<br><br>Following the Spanish conquest led by Francisco Pizarro in 1532, Lima was founded in 1535 as the capital of the <strong>Viceroyalty of Peru</strong>, the supreme administrative and mining center of the Spanish Empire in South America for nearly three centuries. Sovereign independence was proclaimed on <strong>July 28, 1821</strong>, by General José de San Martín, and finalized at the Battle of Ayacucho in 1824.",
        "flagHistory": "The national flag of Peru—the <em>Bandera Nacional</em>—is a striking vertical triband of red, white, and red, designed by liberating general <strong>José de San Martín</strong> in 1820 and standardized by Congress on <strong>February 25, 1825</strong>.<br><br>According to historical tradition, while resting near the bay of Paracas, San Martín was inspired by a flock of <strong>parihuanas</strong> (flamingos with vivid red wings and white chests) soaring into the sky. In patriotic symbolism: <strong>Red</strong> honors the blood spilled by Inca warriors and patriot heroes defending the homeland; while <strong>White</strong> represents peace, justice, and social purity.<br><br>The state ensign (<em>Pabellón Nacional</em>) bears the <strong>National Shield</strong> in the white stripe, divided into three fields showcasing Peru's natural wealth: the <strong>Vicuña</strong> (animal kingdom), the <strong>Cinchona Tree</strong> (plant kingdom / source of quinine), and the <strong>Cornucopia</strong> spilling golden coins (mineral kingdom).",
        "freedomStory": "Peru was the central stronghold of Spanish royalist power in South America, making its liberation a momentous continental campaign.<br><br>Following his legendary crossing of the Andes and liberation of Chile, General <strong>José de San Martín</strong> landed his liberating expedition at Paracas in 1820. On <strong>July 28, 1821</strong>, San Martín stepped onto the balcony of the Plaza Mayor in Lima and proclaimed the immortal words: <em>'From this moment on, Peru is free and independent by the general will of the peoples and by the justice of its cause that God defends. Long live the Homeland! Long live Freedom!'</em><br><br>Sovereign liberation across the continent was sealed on <strong>December 9, 1824</strong>, on the high Andean plateau at the <strong>Battle of Ayacucho</strong>, where Marshal Antonio José de Sucre decisively defeated the Spanish Viceroy, permanently ending three centuries of Spanish imperial rule in South America.",
        "challenges": "As a top global producer of copper, zinc, silver, and gold, Peru balances mining resource export growth with social development and environmental protection. Foremost priorities include strengthening democratic institutional stability, modernizing Andean irrigation and transport corridors, and protecting the Amazon biosphere against illegal gold mining.",
        "images": {
            "landscape": {
                "url": "https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=1200&auto=format&fit=crop",
                "alt": "Machu Picchu Inca citadel in the Andes mountains, Peru",
                "caption": "The 15th-century Inca citadel of Machu Picchu perched on an Andean mountain ridge above the Urubamba River valley in Cusco, Peru."
            },
            "landmark": {
                "url": "https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?q=80&w=1200&auto=format&fit=crop",
                "alt": "Plaza Mayor and Cathedral of Lima, Peru",
                "caption": "The Cathedral of Lima on the Plaza Mayor, where General José de San Martín officially proclaimed Peruvian independence in 1821."
            },
            "streetview": {
                "url": "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=1200&auto=format&fit=crop",
                "alt": "Peruvian Andean highway with black-and-white striped signs",
                "caption": "Peruvian street view indicators: national highway shields with PE codes, black-and-white striped signposts, and rugged Andean desert terrain."
            }
        },
        "streetViewMeta": {
            "drivingSide": "Right",
            "licensePlates": "White rectangular plates with a colored top band containing the Peruvian flag and 'PERU'; commercial public transport plates have full yellow backgrounds.",
            "utilityPoles": "Wooden poles with metal crossbars or concrete poles in coastal cities; black-and-white striped sign support posts.",
            "roadMarkings": "Continuous or dashed yellow centerlines; solid white outer edge lines; national route marker shields labeled 'PE'.",
            "delineators": "White posts with red reflectors on the right; stone retaining walls along mountain switchbacks.",
            "cameraGen": "Comprehensive Gen 3 and Gen 4 coverage across the Pan-American Highway, Lima, Cusco, Arequipa, and Lake Titicaca."
        },
        "aiSummary": {
            "geo": "Pacific coastal nation with Andean highlands and Amazon basin; center of the ancient Inca Empire.",
            "flag": "Red, white, and red vertical triband inspired by flamingos seen by General San Martín in 1820.",
            "freedom": "1821 proclamation by San Martín; finalized at the decisive Battle of Ayacucho on Dec 9, 1824.",
            "challenge": "Democratic institutional stability, Andean mining logistics, and Amazon rainforest protection."
        },
        "faqs": [
            {
                "question": "When did Peru declare independence?",
                "answer": "Independence was proclaimed on July 28, 1821, by General José de San Martín in Lima, celebrated as Peru's National Day (Fiestas Patrias)."
            },
            {
                "question": "What is the historical significance of the Battle of Ayacucho (1824)?",
                "answer": "Fought on December 9, 1824, the Battle of Ayacucho was the final major military engagement of the Spanish American wars of independence, ending Spanish colonial rule in South America."
            }
        ],
        "timeline": [
            {"year": "3000 BCE", "event": "The Sacred City of Caral-Supe develops as the oldest known civilization in the Americas."},
            {"year": "1438", "event": "Pachacuti expands the Inca Empire from Cusco, constructing Machu Picchu."},
            {"year": "1535", "event": "Francisco Pizarro founds the City of Kings (Lima) as the capital of the Viceroyalty."},
            {"year": "1821", "event": "General José de San Martín proclaims Peruvian independence in Lima on July 28."},
            {"year": "1824", "event": "The Battle of Ayacucho seals sovereign independence for Peru and South America."},
            {"year": "1911", "event": "Hiram Bingham brings international academic attention to the Inca citadel of Machu Picchu."}
        ]
    },
    "th": {
        "code": "TH",
        "name": "Thailand",
        "capital": "Bangkok",
        "continent": "Asia",
        "population": "71.8 Million",
        "currency": "Thai Baht (THB)",
        "languages": ["Thai"],
        "seoTitle": "History of Thailand: Land of the Free, Trairanga Flag, and Modern Constitutional Monarchy",
        "metaDescription": "Explore the detailed history of Thailand. Discover Sukhothai, Ayutthaya, King Chulalongkorn's modernization, the Trairanga flag, and left-hand driving.",
        "mapFormation": "Occupying 513,120 square kilometers in the heart of Mainland Southeast Asia, the Kingdom of Thailand (<em>Prathet Thai</em> - 'Land of the Free') is naturally framed by the Andaman Sea to the west and the Gulf of Thailand to the east, centered on the fertile Chao Phraya River basin.<br><br>The kingdom traces its historical lineage through four successive golden eras: the <strong>Sukhothai Kingdom (1238–1438)</strong> where King Ram Khamhaeng created the Thai alphabet; the magnificent <strong>Ayutthaya Kingdom (1351–1767)</strong>, a legendary cosmopolitan trading metropolis; the brief Thonburi period under King Taksin; and the <strong>Rattanakosin Kingdom</strong> founded in 1782 by King Rama I of the Chakri Dynasty, who established Bangkok as the capital.<br><br>Through the brilliant diplomatic statesmanship of <strong>King Mongkut (Rama IV) and King Chulalongkorn the Great (Rama V)</strong>, Thailand was the <strong>only nation in Southeast Asia to preserve its sovereign independence</strong> and never fall under European colonial rule, modernizing institutions and codifying modern borders.",
        "flagHistory": "The national flag of Thailand—the <strong>Trairanga</strong> (The Tricolor Flag)—features five horizontal stripes in red, white, blue, white, and red, with the central blue stripe occupying one-third of the flag's height (a 1:1:2:1:1 proportion), officially adopted by King Rama VI on <strong>September 28, 1917</strong>.<br><br>The design harmoniously unites the three foundational pillars of the Thai nation: <strong>Red</strong> symbolizes the nation and the lifeblood of the Thai people; <strong>White</strong> represents the purity of the Buddhist religion and spiritual dharma; and the central <strong>Blue</strong> band represents the revered Royal Monarchy. Blue was chosen by King Rama VI to honor Thailand's World War I allies (Great Britain, France, and the United States), who all featured red, white, and blue banners.",
        "freedomStory": "Thailand's proud sovereign identity is anchored in its unique history of never having been colonized by foreign European powers.<br><br>During the 19th century, King Chulalongkorn (Rama V) enacted sweeping modernization reforms: abolishing slavery without civil unrest, constructing national railway lines, modernizing the legal system, and establishing modern ministries.<br><br>On <strong>June 24, 1932</strong>, the Siamese Revolution of 1932 led by the <em>Khana Ratsadon</em> (People's Party) peacefully transformed the country from an absolute monarchy into a constitutional democracy, promulgating the nation's first constitution. In the modern era, Thailand became a founding member of ASEAN in 1967 and a regional hub in automotive assembly, electronics, and global culinary tourism.",
        "challenges": "As Southeast Asia's second-largest economy, Thailand is modernizing its manufacturing base toward electric vehicles and digital services through the <strong>Eastern Economic Corridor (EEC)</strong>. Domestically, priorities include managing demographic aging, expanding high-speed rail corridors connecting Bangkok to regional borders, and implementing sustainable water management in the Chao Phraya delta.",
        "images": {
            "landscape": {
                "url": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
                "alt": "Phang Nga Bay limestone karst islands in southern Thailand",
                "caption": "The dramatic limestone karst towers rising from the emerald waters of Phang Nga Bay in southern Thailand."
            },
            "landmark": {
                "url": "https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=1200&auto=format&fit=crop",
                "alt": "Wat Arun (Temple of Dawn) along the Chao Phraya River in Bangkok, Thailand",
                "caption": "Wat Arun (Temple of Dawn) rising 70 meters above the Chao Phraya River in Bangkok, encrusted with colorful porcelain."
            },
            "streetview": {
                "url": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop",
                "alt": "Thai road with left-hand driving and Thai script signage",
                "caption": "Thai street view clues: driving on the left, distinctive rounded Thai script on blue and green highway signboards, and white license plates."
            }
        },
        "streetViewMeta": {
            "drivingSide": "Left",
            "licensePlates": "White rectangular plates with black Thai script and numbers; province name printed at the bottom in Thai; yellow plates for commercial taxis.",
            "utilityPoles": "Square cross-section reinforced concrete utility poles (unique in Southeast Asia) with multiple horizontal crossbars.",
            "roadMarkings": "Continuous or dashed white centerlines; yellow lines for turn bays; distinctive blue overhead directional signs with Thai and English subtitles.",
            "delineators": "Black-and-white striped concrete guideposts with circular reflectors.",
            "cameraGen": "Dense Gen 3 and Gen 4 coverage across all 77 provinces from Chiang Mai to Phuket."
        },
        "aiSummary": {
            "geo": "Mainland Southeast Asian nation; only country in the region never colonized by European empires.",
            "flag": "The Trairanga: red, white, blue, white, red horizontal stripes representing Nation, Religion, and King.",
            "freedom": "Modernized by King Chulalongkorn (Rama V); 1932 peaceful revolution established constitutional democracy.",
            "challenge": "Eastern Economic Corridor EV transition, aging demographics, and Chao Phraya delta flood defense."
        },
        "faqs": [
            {
                "question": "Why is Thailand called the 'Land of the Free'?",
                "answer": "The word 'Thai' literally means 'free' in the Thai language. Thailand is named the 'Land of the Free' because it was the only Southeast Asian nation that successfully preserved its independence from European colonial rule."
            },
            {
                "question": "What is the most unique Street View clue for Thailand?",
                "answer": "In Thailand, traffic drives on the left, utility poles have a distinct square cross-section (rather than round), and road signs feature the distinctive Thai alphabet."
            }
        ],
        "timeline": [
            {"year": "1238", "event": "Founding of the Sukhothai Kingdom, creating the Thai alphabet and classical culture."},
            {"year": "1351", "event": "Establishment of the Ayutthaya Kingdom, which became a global trade crossroads."},
            {"year": "1782", "event": "King Rama I founds the Chakri Dynasty and establishes Bangkok as the capital."},
            {"year": "1868–1910", "event": "Reign of King Chulalongkorn (Rama V), who modernizes Siam and preserves sovereign independence."},
            {"year": "1917", "event": "King Rama VI introduces the modern Trairanga tricolor flag."},
            {"year": "1932", "event": "The Siamese Revolution transforms the absolute monarchy into a constitutional democracy."}
        ]
    }
}

for code, data in batch2_part4.items():
    file_path = os.path.join(output_dir, f"{code}.json")
    with open(file_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print(f"Updated {code.upper()} chronicle successfully.")
