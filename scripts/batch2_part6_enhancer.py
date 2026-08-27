import json
import os

output_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "../src/data/chronicles"))
os.makedirs(output_dir, exist_ok=True)

batch2_part6 = {
    "ma": {
        "code": "MA",
        "name": "Morocco",
        "capital": "Rabat",
        "continent": "Africa",
        "population": "37.8 Million",
        "currency": "Moroccan Dirham (MAD)",
        "languages": ["Arabic", "Berber (Tamazight)", "French"],
        "seoTitle": "History of Morocco: Kingdom of the Maghreb, Green Pentagram Flag, and 1956 Independence",
        "metaDescription": "Explore the detailed history of Morocco. Discover the Alaouite Dynasty, Atlas Mountains, King Mohammed V, the green star flag, and solar energy.",
        "mapFormation": "Spanning 446,550 square kilometers in Northwest Africa at the gateway between the Atlantic Ocean and the Mediterranean Sea across the Strait of Gibraltar, the Kingdom of Morocco (<em>Al-Mamlaka al-Maghribiyya</em> - 'The Western Kingdom') is framed by the snow-crested spine of the <strong>Atlas Mountains</strong> (Mount Toubkal, 4,167 meters) and the vast sands of the Sahara Desert.<br><br>Indigenous Amazigh (Berber) kingdoms traded across the Mediterranean during antiquity. In <strong>789 CE</strong>, Idris I founded the <strong>Idrisid Dynasty</strong> and established the imperial city of Fes, the oldest continuous royal capital in Morocco. Successive Amazigh dynasties—the Almoravids and Almohads (11th–13th century)—ruled vast empires spanning North Africa and Muslim Andalusia (southern Spain).<br><br>Since 1666, Morocco has been governed by the <strong>Alaouite Dynasty</strong>. Following the Treaty of Fes (1912) establishing French and Spanish protectorates, King Mohammed V led the national liberation movement, securing sovereign independence on <strong>March 2, 1956</strong>.",
        "flagHistory": "The national flag of Morocco—the <em>Liwaa al-Maghrib</em>—features a vivid crimson-red field bearing at the exact center a bold green five-pointed interlaced pentagram, officially codified by Royal Dahir of Sultan Moulay Youssef on <strong>November 17, 1915</strong>.<br><br>The historic red field has represented the Alaouite Dynasty and sovereign authority since the 17th century. The central <strong>Green Pentagram</strong> (Seal of Solomon / <em>Khātim Sulaymān</em>) was added to distinguish Moroccan maritime vessels from other red flags at sea. In Islamic and national symbolism: <strong>Red</strong> honors the courage, hardiness, and bravery of the Moroccan people; <strong>Green</strong> is the sacred color of Islam representing prosperity and peace; and the <strong>Five Points</strong> of the star symbolize the Five Pillars of Islam (Faith, Prayer, Charity, Fasting, and Pilgrimage).",
        "freedomStory": "Morocco's struggle for independence was a courageous national mobilization spearheaded by the historic alliance between the Royal Monarchy and the nationalist resistance.<br><br>On <strong>January 11, 1944</strong>, nationalist leaders presented the historic <strong>Manifesto of Independence</strong> (<em>Wathīqat al-Istiqlāl</em>) demanding full sovereignty. In August 1953, French colonial authorities exiled <strong>Sultan Mohammed V</strong> to Corsica and Madagascar, igniting mass armed resistance (the Revolution of the King and the People / <em>Thawrat al-Malik wa ash-Sha'b</em>).<br><br>Sultan Mohammed V returned in triumph to Rabat on November 16, 1955, declaring the dawn of freedom. Independence was officially proclaimed on <strong>March 2, 1956</strong>. In November 1975, King Hassan II led the peaceful <strong>Green March</strong> of 350,000 unarmed citizens into the Sahara.",
        "challenges": "As a premier industrial and renewable energy hub in Africa hosting the world's largest concentrated solar farm (<strong>Noor Ouarzazate</strong>) and the high-speed Al Boraq bullet train, Morocco balances rapid modernization with climate adaptation. Foremost priorities include constructing major coastal seawater desalination plants to combat persistent drought, upgrading automotive and aerospace manufacturing, and hosting the 2030 FIFA World Cup.",
        "images": {
            "landscape": {
                "url": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
                "alt": "Sahara desert sand dunes of Erg Chebbi in Merzouga, Morocco",
                "caption": "The towering orange sand dunes of Erg Chebbi near Merzouga in the Moroccan Sahara Desert."
            },
            "landmark": {
                "url": "https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?q=80&w=1200&auto=format&fit=crop",
                "alt": "Hassan II Mosque in Casablanca, Morocco",
                "caption": "The Hassan II Mosque in Casablanca, featuring the world's second-tallest minaret at 210 meters, perched directly over the Atlantic Ocean."
            },
            "streetview": {
                "url": "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=1200&auto=format&fit=crop",
                "alt": "Moroccan street view with Arabic signs and red/white curbstones",
                "caption": "Moroccan street view indicators: Arabic and French bilingual road signs, red-and-white painted curb stones, and terracotta earth buildings."
            }
        },
        "streetViewMeta": {
            "drivingSide": "Right",
            "licensePlates": "White rectangular plates with Arabic numbers separated by a vertical line and a regional Arabic letter code denoting the province.",
            "utilityPoles": "Reinforced concrete poles with square profiles or wooden poles; red-and-white painted concrete curbs in urban centers.",
            "roadMarkings": "Continuous or dashed white centerlines; solid white edge lines; blue highway signs with Arabic and French script.",
            "delineators": "White posts with red reflectors along national routes.",
            "cameraGen": "Coverage in major historic medinas, tourist monuments, and urban transit corridors."
        },
        "aiSummary": {
            "geo": "Northwest African kingdom connecting Mediterranean and Atlantic; Atlas Mountains and Sahara Desert.",
            "flag": "Red field with a central green 5-pointed interlaced pentagram (Seal of Solomon) representing Islam's pillars.",
            "freedom": "1944 Independence Manifesto; 1953 Revolution of the King and the People; independence on March 2, 1956.",
            "challenge": "Mega-scale seawater desalination, Noor solar scaling, and 2030 World Cup infrastructure."
        },
        "faqs": [
            {
                "question": "What is the green star on the Moroccan flag?",
                "answer": "The green five-pointed star is the Seal of Solomon (Khātim Sulaymān), symbolizing health, wisdom, and the Five Pillars of Islam on the traditional red Alaouite field."
            },
            {
                "question": "What was the Green March of 1975?",
                "answer": "The Green March was a peaceful mass demonstration in November 1975 organized by King Hassan II, in which 350,000 unarmed Moroccan citizens marched into the Western Sahara."
            }
        ],
        "timeline": [
            {"year": "789 CE", "event": "Idris I establishes the Idrisid Dynasty and founds the imperial city of Fes."},
            {"year": "1666", "event": "The Alaouite Dynasty assumes rule over Morocco, continuing to the present day."},
            {"year": "1912", "event": "The Treaty of Fes establishes French and Spanish protectorates over Morocco."},
            {"year": "1956", "event": "Morocco regains sovereign independence on March 2 under King Mohammed V."},
            {"year": "1975", "event": "King Hassan II leads the historic Green March of 350,000 citizens into the Sahara."},
            {"year": "2018", "event": "Inauguration of Al Boraq, the first high-speed rail line on the African continent."}
        ]
    },
    "my": {
        "code": "MY",
        "name": "Malaysia",
        "capital": "Kuala Lumpur (Administrative: Putrajaya)",
        "continent": "Asia",
        "population": "34.3 Million",
        "currency": "Malaysian Ringgit (MYR)",
        "languages": ["Malay (Bahasa Melayu)", "English", "Mandarin", "Tamil"],
        "seoTitle": "History of Malaysia: Malacca Sultanate, Jalur Gemilang Flag, and 1957 Merdeka",
        "metaDescription": "Discover the detailed history of Malaysia. Explore the Malacca maritime sultanate, Tunku Abdul Rahman's 1957 Merdeka, the Petronas Towers, and left-hand driving.",
        "mapFormation": "Spanning 330,803 square kilometers across two distinct landmasses separated by the South China Sea, the Federation of Malaysia comprises <strong>Peninsular Malaysia</strong> (West Malaysia) bordering Thailand, and <strong>East Malaysia</strong> (Sabah and Sarawak on the island of Borneo) bordering Indonesia and Brunei.<br><br>In 1400, Parameswara founded the <strong>Malacca Sultanate</strong> along the strategic Malacca Strait, creating a wealthy cosmopolitan trading hub linking China, India, and the Arab world. Following Portuguese capture in 1511, Dutch rule in 1641, and British colonial administration via the Straits Settlements, the British united the nine royal Malay states and two settlements into the Federation of Malaya.<br><br>Under founding Prime Minister <strong>Tunku Abdul Rahman</strong>, the Federation of Malaya achieved sovereign independence on <strong>August 31, 1957</strong>. On <strong>September 16, 1963</strong>, the sovereign federation of <strong>Malaysia</strong> was formed through the union of Malaya, Singapore (which separated in 1965), Sarawak, and North Borneo (Sabah).",
        "flagHistory": "The national flag of Malaysia—the <strong>Jalur Gemilang</strong> (Stripes of Glory)—features 14 alternating horizontal stripes of red and white, with a dark blue canton bearing a yellow crescent and a 14-pointed star (the <em>Bintang Persekutuan</em> or Federal Star), officially adopted on <strong>September 16, 1963</strong>.<br><br>The design was created by architect Mohamed Hamzah. In vexillological symbolism: The <strong>14 Stripes and 14 Points</strong> on the star represent the equal status of the 13 member states and the federal government. The <strong>Yellow</strong> of the crescent and star is the royal color of the Malay Rulers (Yang di-Pertuan Agong); the <strong>Crescent</strong> symbolizes Islam as the official religion; the <strong>Blue Canton</strong> represents the unity and harmony of the multicultural Malaysian people; <strong>Red</strong> symbolizes heroic bravery; and <strong>White</strong> represents spiritual purity.",
        "freedomStory": "Malaysia's sovereign independence was achieved through peaceful, multi-ethnic constitutional consensus.<br><br>On the stroke of midnight on <strong>August 30, 1957</strong>, the British Union Jack was lowered at the Royal Selangor Club Padang in Kuala Lumpur. The following morning at Merdeka Stadium, Tunku Abdul Rahman raised his right hand and led thousands of citizens in chanting the immortal call: <strong>'MERDEKA!'</strong> (Freedom!) seven times.<br><br>Under the leadership of Prime Minister Mahathir Mohamad in the 1990s, Malaysia executed 'Vision 2020', constructing the futuristic administrative capital of Putrajaya and the iconic 452-meter <strong>Petronas Twin Towers</strong>, transforming the country into a global electronics manufacturing and Islamic finance hub.",
        "challenges": "As a key semiconductor assembly and testing hub producing over 13% of global chip packaging, Malaysia modernizes its digital economy through the New Industrial Master Plan (NIMP 2030). Priorities include expanding renewable solar grids, conserving Borneo's ancient rainforests, and maintaining harmonious multi-ethnic social cohesion.",
        "images": {
            "landscape": {
                "url": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
                "alt": "Mount Kinabalu in Sabah, Malaysian Borneo",
                "caption": "Mount Kinabalu (4,095 meters) in Kinabalu National Park, Sabah, the highest peak in Malaysia and UNESCO World Heritage sanctuary."
            },
            "landmark": {
                "url": "https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?q=80&w=1200&auto=format&fit=crop",
                "alt": "Petronas Twin Towers in Kuala Lumpur, Malaysia",
                "caption": "The 88-story Petronas Twin Towers in Kuala Lumpur, the tallest twin towers in the world designed by architect César Pelli."
            },
            "streetview": {
                "url": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop",
                "alt": "Malaysian highway with left-hand driving and black license plates",
                "caption": "Malaysian street view tells: driving on the left, black license plates with white silver characters, blue expressway signs with yellow route shields (E1)."
            }
        },
        "streetViewMeta": {
            "drivingSide": "Left",
            "licensePlates": "Black rectangular plates with white or silver lettering formatted with a 1-3 letter state prefix (e.g., W/V for Kuala Lumpur, J for Johor) followed by numbers.",
            "utilityPoles": "Round concrete poles or wooden poles with black brackets; blue expressway signs with yellow route markers (e.g., E1).",
            "roadMarkings": "Continuous or dashed white centerlines; solid white edge lines; prominent Bahasa Melayu road markings ('BERHENTI', 'AWAS').",
            "delineators": "Black-and-white striped guardrails and bridge pillars with red/white reflectors.",
            "cameraGen": "Dense Gen 3 and Gen 4 coverage across Peninsular Malaysia, Sabah, and Sarawak."
        },
        "aiSummary": {
            "geo": "Southeast Asian federation spanning Peninsular Malaysia and Borneo; capital in Kuala Lumpur and Putrajaya.",
            "flag": "Jalur Gemilang: 14 red/white stripes, blue canton, yellow crescent and 14-pointed Federal Star.",
            "freedom": "1957 Merdeka declaration led by Tunku Abdul Rahman; 1963 formation of the Malaysian federation.",
            "challenge": "Global semiconductor supply chain leadership, Borneo conservation, and multi-ethnic harmony."
        },
        "faqs": [
            {
                "question": "What is the difference between Merdeka Day and Malaysia Day?",
                "answer": "Merdeka Day (August 31, 1957) celebrates the independence of the Federation of Malaya from Great Britain. Malaysia Day (September 16, 1963) celebrates the union of Malaya, Sabah, Sarawak, and Singapore to form Malaysia."
            },
            {
                "question": "What is the meaning of the 14-pointed star on the Malaysian flag?",
                "answer": "The 14-pointed star (Bintang Persekutuan) represents the equal unity between the 13 member states of Malaysia and the Federal Government."
            }
        ],
        "timeline": [
            {"year": "1400", "event": "Parameswara founds the Malacca Sultanate, establishing a global maritime trading empire."},
            {"year": "1957", "event": "Tunku Abdul Rahman declares Merdeka (Independence) on August 31 at Merdeka Stadium."},
            {"year": "1963", "event": "The Federation of Malaysia is established on September 16, uniting Malaya, Sabah, and Sarawak."},
            {"year": "1965", "event": "Singapore peacefully separates from Malaysia to become an independent republic."},
            {"year": "1998", "event": "Official opening of the iconic 452-meter Petronas Twin Towers in Kuala Lumpur."}
        ]
    },
    "nz": {
        "code": "NZ",
        "name": "New Zealand",
        "capital": "Wellington",
        "continent": "Oceania",
        "population": "5.2 Million",
        "currency": "New Zealand Dollar (NZD)",
        "languages": ["English", "Māori (Te Reo Māori)", "NZ Sign Language"],
        "seoTitle": "History of New Zealand: Land of the Long White Cloud, Treaty of Waitangi, and Southern Cross Flag",
        "metaDescription": "Explore the detailed history of New Zealand. Discover Māori voyagers, the 1840 Treaty of Waitangi, 1893 women's suffrage, and the Southern Cross flag.",
        "mapFormation": "Located in the southwestern Pacific Ocean across 268,021 square kilometers, New Zealand (<em>Aotearoa</em> - 'Land of the Long White Cloud') consists of two main landmasses—the <strong>North Island (Te Ika-a-Māui)</strong> and the mountainous <strong>South Island (Te Waipounamu)</strong>, divided by Cook Strait.<br><br>Polynesian navigators discovered and settled Aotearoa in the late 13th century (c. 1280–1350 CE) aboard ocean-going waka canoes, developing the vibrant indigenous <strong>Māori</strong> tribal culture and <em>iwi</em> social structure. Dutch explorer Abel Tasman sighted the islands in 1642, followed by British navigator Captain James Cook in 1769.<br><br>On <strong>February 6, 1840</strong>, over 500 Māori rangatira (chiefs) and representatives of the British Crown signed the foundational <strong>Treaty of Waitangi (Te Tiriti o Waitangi)</strong> in the Bay of Islands, establishing British governance while guaranteeing Māori rights to their lands and treasures (<em>taonga</em>). New Zealand became a self-governing Dominion in 1907 and achieved full legislative autonomy under the Statute of Westminster in 1947.",
        "flagHistory": "The national flag of New Zealand features a royal blue field with the British <strong>Union Jack</strong> in the upper hoist canton, and four red five-pointed stars with white borders representing the <strong>Southern Cross</strong> (<em>Crux</em>) on the fly half, officially adopted under the New Zealand Ensign Act on <strong>June 12, 1902</strong>.<br><br>The design was created in 1869 by First Lieutenant Albert Hastings Markham of the Royal Navy. Unlike the Australian flag (which features five white stars with 7 points), the New Zealand flag features <strong>Four Red Stars with White Fimbriations</strong> (Alpha, Beta, Gamma, and Delta Crucis), representing the Southern Cross constellation that guided Māori voyagers and navigators across the Pacific Ocean for centuries.",
        "freedomStory": "New Zealand has been a world-leading pioneer in universal human rights, social equity, and nuclear-free diplomacy.<br><br>On <strong>September 19, 1893</strong>, following a nationwide campaign led by suffragist <strong>Kate Sheppard</strong>, Governor Lord Glasgow signed the Electoral Act 1893, making New Zealand the <strong>first self-governing country in world history to grant women the right to vote in parliamentary elections</strong>.<br><br>In 1975, the government established the <strong>Waitangi Tribunal</strong> to investigate and settle historical breaches of the Treaty of Waitangi, restoring ancestral lands and cultural rights to Māori iwi. In 1987, New Zealand enacted the landmark New Zealand Nuclear Free Zone legislation, establishing its independent, principled foreign policy.",
        "challenges": "As an advanced agricultural and green tourism economy generating over 80% of its electricity from renewable hydro, geothermal, and wind power, New Zealand addresses seismic resilience along the Alpine Fault (Pacific Ring of Fire), housing affordability in Auckland, and transitioning agricultural livestock emissions sustainably.",
        "images": {
            "landscape": {
                "url": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
                "alt": "Milford Sound fjord in Fiordland, New Zealand",
                "caption": "Milford Sound (Piopiotahi) in Fiordland National Park, South Island, New Zealand, described by Rudyard Kipling as the 'Eighth Wonder of the World'."
            },
            "landmark": {
                "url": "https://images.unsplash.com/photo-1512813195386-6cf811ad3542?q=80&w=1200&auto=format&fit=crop",
                "alt": "Waitangi Treaty Grounds in Bay of Islands, New Zealand",
                "caption": "The Waitangi Treaty Grounds in the Bay of Islands, North Island, where the foundational Treaty of Waitangi was signed on February 6, 1840."
            },
            "streetview": {
                "url": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop",
                "alt": "New Zealand road with left-hand driving and white dashed centerlines",
                "caption": "New Zealand street view clues: driving on the left, white license plates with black font (no blue strip), white guideposts with red reflectors, and rolling green sheep pastures."
            }
        },
        "streetViewMeta": {
            "drivingSide": "Left",
            "licensePlates": "White rectangular plates with black embossed letters and numbers (format: ABC123), with no state slogans or colored strips.",
            "utilityPoles": "Dark creosote-treated wooden utility poles or concrete poles with white insulators; distinctive wooden bridge railings.",
            "roadMarkings": "Continuous or dashed white centerlines; solid white edge lines; yellow dashed lines where passing is prohibited.",
            "delineators": "White posts with red rectangular reflectors on the left and white on the right.",
            "cameraGen": "Dense Gen 3 and Gen 4 coverage across both North and South Islands."
        },
        "aiSummary": {
            "geo": "South Pacific nation comprising North and South Islands; home to Māori culture and alpine fjords.",
            "flag": "Blue field with Union Jack and 4 red stars with white borders representing the Southern Cross.",
            "freedom": "1840 Treaty of Waitangi; 1893 world-first female voting rights; 1987 nuclear-free legislation.",
            "challenge": "Seismic fault line risk management, agricultural methane reduction, and housing affordability."
        },
        "faqs": [
            {
                "question": "When did women get the right to vote in New Zealand?",
                "answer": "On September 19, 1893, New Zealand became the first self-governing country in the world to grant all women the right to vote in parliamentary elections, led by Kate Sheppard."
            },
            {
                "question": "What is the Treaty of Waitangi?",
                "answer": "Signed on February 6, 1840, the Treaty of Waitangi is the founding constitutional document of New Zealand, establishing an agreement between the British Crown and Māori chiefs."
            }
        ],
        "timeline": [
            {"year": "1280–1350", "event": "Polynesian voyagers discover and settle Aotearoa (New Zealand), developing Māori culture."},
            {"year": "1840", "event": "The Treaty of Waitangi is signed on February 6, founding modern New Zealand."},
            {"year": "1893", "event": "New Zealand becomes the first country in the world to grant women the right to vote."},
            {"year": "1947", "event": "New Zealand formally adopts the Statute of Westminster, achieving full legal autonomy."},
            {"year": "1975", "event": "Establishment of the Waitangi Tribunal to settle historic treaty grievances."},
            {"year": "1987", "event": "New Zealand Parliament passes legislation declaring the nation nuclear-free."}
        ]
    }
}

for code, data in batch2_part6.items():
    file_path = os.path.join(output_dir, f"{code}.json")
    with open(file_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print(f"Updated {code.upper()} chronicle successfully.")
