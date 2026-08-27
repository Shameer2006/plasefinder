import json
import os

output_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "../src/data/chronicles"))
os.makedirs(output_dir, exist_ok=True)

batch2_part7 = {
    "ph": {
        "code": "PH",
        "name": "Philippines",
        "capital": "Manila",
        "continent": "Asia",
        "population": "115.6 Million",
        "currency": "Philippine Peso (PHP)",
        "languages": ["Filipino (Tagalog)", "English"],
        "seoTitle": "History of the Philippines: Pearl of the Orient Seas, Sun & Stars Flag, and 1898 Republic",
        "metaDescription": "Explore the detailed history of the Philippines. Discover José Rizal, the 1898 Malolos Republic, the Sun and Three Stars flag, and the 1986 EDSA Revolution.",
        "mapFormation": "Comprising an archipelago of 7,641 volcanic and tropical islands spanning 300,000 square kilometers in the western Pacific Ocean, the Republic of the Philippines (<em>Republika ng Pilipinas</em>) is divided into three primary island groups: <strong>Luzon, Visayas, and Mindanao</strong>.<br><br>Austronesian navigators settled the islands around 2200 BCE. Coastal barangays and maritime thalassocracies (the Kingdom of Tondo, Rajahnate of Cebu, Sultanate of Sulu) traded with China, India, and the Malay world. In 1521, Portuguese explorer Ferdinand Magellan arrived in Samar on a Spanish expedition, and in 1565, Miguel López de Legazpi established the Spanish East Indies, naming the islands <em>Las Islas Filipinas</em> after King Philip II of Spain. The Manila-Acapulco Galleon Trade connected Asia and the Americas for 250 years.<br><br>Following the <strong>Philippine Revolution of 1896</strong> led by Andrés Bonifacio (Katipunan) and General Emilio Aguinaldo, the Philippines declared independence on <strong>June 12, 1898</strong>. Following the Spanish-American War, the Treaty of Paris transferred the islands to the United States. Full sovereign recognition was attained on <strong>July 4, 1946</strong>, with the Treaty of Manila following World War II.",
        "flagHistory": "The national flag of the Philippines—the <em>Pambansang Watawat ng Pilipinas</em>—features a horizontal bicolor of royal blue (top) and crimson red (bottom), with a white equilateral triangle at the hoist containing a golden <strong>Eight-Rayed Sun</strong> and three golden <strong>Five-Pointed Stars</strong>, officially hoisted on <strong>June 12, 1898</strong>, in Kawit, Cavite.<br><br>The design was created by General Emilio Aguinaldo and sewn in Hong Kong by Marcela Agoncillo. In patriotic symbolism: <strong>Royal Blue</strong> represents peace, truth, and justice; <strong>Crimson Red</strong> symbolizes patriotism and valor; and <strong>White</strong> represents equality and fraternity. The <strong>Golden Sun</strong> represents the giant strides made by the nation toward progress, with its <strong>Eight Rays</strong> symbolizing the first eight provinces placed under martial law during the 1896 Revolution (Manila, Cavite, Bulacan, Pampanga, Nueva Ecija, Tarlac, Laguna, and Batangas). The <strong>Three Stars</strong> represent the three principal geographical island groups: Luzon, Visayas (Panay), and Mindanao.<br><br>Unique in world vexillology, the flag is flown with the <strong>Red band on top in times of declared war</strong>, and Blue on top in times of peace.",
        "freedomStory": "The Philippine struggle for independence was ignited by the intellectual brilliance of national hero <strong>Dr. José Rizal</strong>, whose novels <em>Noli Me Tángere</em> and <em>El Filibusterismo</em> exposed colonial injustices.<br><br>On <strong>June 12, 1898</strong>, General Emilio Aguinaldo proclaimed independence from the balcony of his home in Kawit, Cavite, where the national anthem and flag were first presented, convening the revolutionary Malolos Congress to establish the <strong>First Philippine Republic (1899)</strong>—the first constitutional democracy in Asia.<br><br>In February 1986, the Filipino people inspired the world through the peaceful <strong>People Power Revolution (EDSA Revolution)</strong>, when millions of unarmed citizens and Catholic nuns carrying rosaries confronted military tanks on Epifanio de los Santos Avenue in Manila, ending authoritarian rule and inaugurating <strong>Corazon Aquino</strong> as President under the democratic 1987 Constitution.",
        "challenges": "As a dynamic economy in Southeast Asia and a global leader in business process outsourcing (BPO) and seafaring, the Philippines balances rapid growth with natural disaster resilience. Situated on the Pacific Typhoon Belt and Ring of Fire, top priorities include reinforcing coastal sea walls against super typhoons, expanding renewable solar and geothermal power, and asserting maritime sovereign rights in the West Philippine Sea.",
        "images": {
            "landscape": {
                "url": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop",
                "alt": "Banaue Rice Terraces carved into mountain slopes, Philippines",
                "caption": "The 2,000-year-old Banaue Rice Terraces carved into the Cordillera mountains of Ifugao, Luzon, a UNESCO World Heritage cultural landscape."
            },
            "landmark": {
                "url": "https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?q=80&w=1200&auto=format&fit=crop",
                "alt": "Rizal Monument in Luneta Park, Manila, Philippines",
                "caption": "The Rizal Monument in Luneta (Rizal Park), Manila, guarding the memorial and resting place of national hero Dr. José Rizal."
            },
            "streetview": {
                "url": "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=1200&auto=format&fit=crop",
                "alt": "Philippine street view with colorful Jeepneys and English signage",
                "caption": "Philippine street view indicators: colorful iconic passenger Jeepneys, English road signs, white rectangular license plates with green characters, and tropical foliage."
            }
        },
        "streetViewMeta": {
            "drivingSide": "Right (switched from left on March 10, 1945)",
            "licensePlates": "White rectangular plates with green or black characters (format: ABC 1234) with 'PILIPINAS' or 'MATATAG NA REPUBLIKA' inscribed along the bottom.",
            "utilityPoles": "Reinforced concrete poles or wooden poles with heavy bundles of overhead telecommunication cables (spaghetti wires).",
            "roadMarkings": "Continuous or dashed white centerlines; solid yellow lines on mountain highway curves; English road signage ('STOP', 'ONE WAY', 'BARANGAY').",
            "delineators": "White concrete boundary stones with distance markers along national highways (Manila kilometer zero).",
            "cameraGen": "Dense Gen 3 and Gen 4 coverage across Metro Manila, Cebu, Davao, Luzon, and the Visayas."
        },
        "aiSummary": {
            "geo": "Archipelago of 7,641 islands in the western Pacific; organized into Luzon, Visayas, and Mindanao.",
            "flag": "Blue and red horizontal bicolor with white triangle, 8-rayed sun and 3 stars; red flown on top during war.",
            "freedom": "1898 independence declaration; Asia's first constitutional republic; 1986 peaceful People Power Revolution.",
            "challenge": "Super typhoon and disaster resilience, West Philippine Sea maritime defense, and digital BPO scaling."
        },
        "faqs": [
            {
                "question": "Why does the Philippine flag change during war?",
                "answer": "The Philippine flag is unique in world vexillology: the Blue stripe is on top during times of peace, but the flag is inverted with the Red stripe on top during times of war."
            },
            {
                "question": "What is the 1986 EDSA People Power Revolution?",
                "answer": "The People Power Revolution was a series of peaceful mass demonstrations in Manila in February 1986 that ended 20 years of authoritarian rule without bloodshed."
            }
        ],
        "timeline": [
            {"year": "1521", "event": "Ferdinand Magellan arrives in Samar; First Mass celebrated in the Philippines."},
            {"year": "1896", "event": "The Philippine Revolution breaks out against Spanish rule led by Andrés Bonifacio's Katipunan."},
            {"year": "1898", "event": "General Emilio Aguinaldo proclaims Philippine independence in Kawit, Cavite on June 12."},
            {"year": "1946", "event": "The United States formally recognizes Philippine independence on July 4 under the Treaty of Manila."},
            {"year": "1986", "event": "The peaceful EDSA People Power Revolution restores democratic constitutional government on February 25."},
            {"year": "1987", "event": "Ratification of the 1987 Constitution of the Republic of the Philippines."}
        ]
    },
    "vn": {
        "code": "VN",
        "name": "Vietnam",
        "capital": "Hanoi",
        "continent": "Asia",
        "population": "98.8 Million",
        "currency": "Vietnamese Đồng (VND)",
        "languages": ["Vietnamese"],
        "seoTitle": "History of Vietnam: Ascending Dragon, Golden Star Red Flag, and 1945 Independence",
        "metaDescription": "Discover the detailed history of Vietnam. Explore the Red River Delta, imperial Hue, the 1945 Declaration of Independence, and the golden star flag.",
        "mapFormation": "Spanning 331,212 square kilometers in an elongated S-shaped coastal curve along the South China Sea (East Sea) in Southeast Asia, the Socialist Republic of Vietnam (<em>Việt Nam</em>) is anchored by two fertile agricultural delta systems: the <strong>Red River Delta</strong> in the north and the vast <strong>Mekong River Delta</strong> in the south, divided by the Truong Son (Annamite) mountain spine.<br><br>Vietnamese civilization originated over 4,000 years ago during the legendary Hùng Kings era (Văn Lang) and Đông Sơn bronze culture in the Red River Valley. Following a millennium of northern domination, General <strong>Ngô Quyền</strong> defeated Southern Han forces at the Battle of Bạch Đằng River in <strong>938 CE</strong>, establishing sovereign independence. Successive imperial dynasties—the Lý, Trần, and Lê—expanded frontiers southward (<em>Nam tiến</em>) and resisted Mongol invasions under General Trần Hưng Đạo.<br><br>In 1802, Emperor Gia Long unified the nation and established the capital at <strong>Huế</strong> under the Nguyễn Dynasty. Following French colonial rule (French Indochina), Vietnam declared sovereign independence on <strong>September 2, 1945</strong>, in Hanoi under Ho Chi Minh.",
        "flagHistory": "The national flag of Vietnam—the <em>Cờ đỏ sao vàng</em> (Red Flag with Golden Star)—features a bright golden five-pointed star centered on a vivid crimson-red field, officially adopted by the National Assembly on <strong>September 5, 1945</strong>.<br><br>The design was created in 1940 by revolutionary patriot Nguyễn Hữu Tiến during the Southern Uprising (<em>Khởi nghĩa Nam Kỳ</em>). In patriotic symbolism: The <strong>Red Field</strong> represents revolutionary struggle, passion, and the blood shed by martyrs for national liberation. The <strong>Golden Star</strong> represents the radiant light of the Vietnamese nation and the yellow skin of its people. The <strong>Five Points</strong> of the star symbolize the solidarity of the five core social classes united in national construction: <strong>Workers, Peasants, Soldiers, Intellectuals, and Traders</strong>.",
        "freedomStory": "Vietnam's modern path to sovereign independence is a story of heroic tenacity against colonial and imperial powers.<br><br>On <strong>September 2, 1945</strong>, before hundreds of thousands of citizens in Ba Dinh Square, Hanoi, <strong>President Ho Chi Minh</strong> read the <strong>Declaration of Independence of the Democratic Republic of Vietnam</strong>, drawing from both the American Declaration of Independence and the French Declaration of the Rights of Man: <em>'All men are created equal. They are endowed by their Creator with certain inalienable rights; among these are Life, Liberty, and the pursuit of Happiness.'</em><br><br>Following the 1954 victory at the Battle of Điện Biên Phủ and the conclusion of the Vietnam War on April 30, 1975, the country was officially reunified on July 2, 1976. In 1986, Vietnam initiated <strong>Đổi Mới</strong> (Renovation) economic reforms, transitioning toward a dynamic socialist-oriented market economy integrated into global trade.",
        "challenges": "As a premier high-tech manufacturing and electronics powerhouse (Samsung, Apple suppliers) in ASEAN, Vietnam balances rapid industrialization with environmental preservation. Foremost priorities include mitigating climate saltwater intrusion and river sediment loss across the Mekong Delta, expanding offshore wind and solar power, and upgrading deep-sea container ports.",
        "images": {
            "landscape": {
                "url": "https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=1200&auto=format&fit=crop",
                "alt": "Ha Long Bay emerald waters and limestone karst islands, Vietnam",
                "caption": "Ha Long Bay in the Gulf of Tonkin, northeastern Vietnam, a UNESCO World Heritage wonderland of over 1,600 limestone karst islands."
            },
            "landmark": {
                "url": "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1200&auto=format&fit=crop",
                "alt": "Imperial City of Hue and Citadel gates, Vietnam",
                "caption": "The Imperial City of Huế, the historic seat of the Nguyễn Dynasty emperors built along the Perfume River in central Vietnam."
            },
            "streetview": {
                "url": "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=1200&auto=format&fit=crop",
                "alt": "Vietnamese street view with motorbikes and blue highway markers",
                "caption": "Vietnamese street view indicators: dense flow of motorbikes, white plates with red dot dividers, and blue highway signs with Vietnamese diacritics."
            }
        },
        "streetViewMeta": {
            "drivingSide": "Right",
            "licensePlates": "White rectangular plates with black characters formatted with two-digit province code (e.g., 29-33 for Hanoi, 50-59 for Ho Chi Minh City), letter series, and five digits with a dot.",
            "utilityPoles": "Reinforced concrete poles with numerous overhead fiber and power lines; metal light poles along national expressways.",
            "roadMarkings": "Continuous or dashed yellow centerlines; solid white edge lines; prominent Vietnamese diacritics on road signage (e.g., 'CẨM', 'ĐI CHẬM').",
            "delineators": "White posts with red reflective caps along national highways (Quốc lộ).",
            "cameraGen": "Trekker and street coverage in Hanoi, Ho Chi Minh City, Da Nang, Hue, and Ha Long."
        },
        "aiSummary": {
            "geo": "S-shaped Southeast Asian coastal nation; Red River and Mekong Deltas; capital in thousand-year-old Hanoi.",
            "flag": "Cờ đỏ sao vàng: red field with central five-pointed golden star representing five united social classes.",
            "freedom": "1945 Declaration of Independence read by Ho Chi Minh; 1976 national reunification; 1986 Đổi Mới reforms.",
            "challenge": "Mekong Delta saltwater intrusion climate resilience, semiconductor manufacturing scaling, and port logistics."
        },
        "faqs": [
            {
                "question": "What is the meaning of the five-pointed star on the Vietnamese flag?",
                "answer": "The five points of the golden star represent the solidarity of the five core classes building the nation: workers, peasants, soldiers, intellectuals, and traders."
            },
            {
                "question": "What were the 'Đổi Mới' reforms in Vietnam?",
                "answer": "Launched in 1986, Đổi Mới ('Renovation') was a comprehensive economic reform program that transitioned Vietnam from a centrally planned economy to a globally integrated market economy."
            }
        ],
        "timeline": [
            {"year": "938 CE", "event": "General Ngô Quyền defeats the Southern Han at the Battle of Bạch Đằng River, ending Chinese rule."},
            {"year": "1010", "event": "Emperor Lý Thái Tổ establishes the capital at Thăng Long (modern Hanoi)."},
            {"year": "1802", "event": "Emperor Gia Long unifies Vietnam, founding the Nguyễn Dynasty in Huế."},
            {"year": "1945", "event": "Ho Chi Minh reads the Declaration of Independence in Hanoi on September 2."},
            {"year": "1954", "event": "Victory at the Battle of Điện Biên Phủ concludes the First Indochina War."},
            {"year": "1976", "event": "Official reunification of the Socialist Republic of Vietnam on July 2."},
            {"year": "1986", "event": "The Communist Party of Vietnam initiates the historic Đổi Mới economic reforms."}
        ]
    },
    "cz": {
        "code": "CZ",
        "name": "Czech Republic",
        "capital": "Prague",
        "continent": "Europe",
        "population": "10.8 Million",
        "currency": "Czech Koruna (CZK)",
        "languages": ["Czech"],
        "seoTitle": "History of the Czech Republic: Crown of Bohemia, Blue Wedge Flag, and Velvet Revolution",
        "metaDescription": "Explore the detailed history of Czechia. Discover the Kingdom of Bohemia, Charles IV, the 1920 tricolor flag, the 1989 Velvet Revolution, and Václav Havel.",
        "mapFormation": "Occupying 78,871 square kilometers in the geographic heart of Central Europe, the Czech Republic (<em>Česká republika / Česko</em>) is naturally enclosed by mountain ridges (the Krkonoše, Šumava, Ore Mountains, and Sudetes), comprising the three historic lands of the Bohemian Crown: <strong>Bohemia, Moravia, and Czech Silesia</strong>.<br><br>The historic Duchy of Bohemia was established in the late 9th century under the Přemyslid dynasty. In 1198, it was elevated to the hereditary <strong>Kingdom of Bohemia</strong> within the Holy Roman Empire. Under King and Holy Roman Emperor <strong>Charles IV (1346–1378)</strong>, Prague became the golden imperial capital of Europe, founding Central Europe's first university (Charles University in 1348) and the Charles Bridge.<br><br>Following centuries under the Habsburg Monarchy, the sovereign democratic state of <strong>Czechoslovakia</strong> was founded on <strong>October 28, 1918</strong>, led by philosopher-statesman Tomáš Garrigue Masaryk. Following the peaceful <strong>Velvet Divorce</strong>, the independent Czech Republic was established on <strong>January 1, 1993</strong>.",
        "flagHistory": "The national flag of the Czech Republic—the <em>Státní vlajka České republiky</em>—features two horizontal bands of white (top) and red (bottom), with a blue equilateral triangle (wedge) extending from the hoist to the midpoint of the flag, officially adopted on <strong>March 30, 1920</strong>.<br><br>The design was created by heraldist Jaroslav Kursa. In historical symbolism: <strong>White and Red</strong> are the ancient heraldic colors of the Kingdom of Bohemia (the crowned double-tailed Silver Lion on a red shield). In 1920, the <strong>Blue Wedge</strong> was added to distinguish the flag from neighboring Poland and to incorporate the blue color of Moravia and Slovakia into the Czechoslovak federation. When Czechoslovakia peacefully split in 1993, the Czech Republic retained the beloved banner.",
        "freedomStory": "Czech history is a testament to the power of intellectual truth, human dignity, and non-violent civic resistance.<br><br>In the early 15th century, religious reformer <strong>Jan Hus</strong> championed truth and conscience at Charles University. In 1968, the <strong>Prague Spring</strong> under Alexander Dubček sought to build 'socialism with a human face' before being crushed by Warsaw Pact tanks.<br><br>In 1977, dissident playwright <strong>Václav Havel</strong> co-founded <strong>Charter 77</strong>, an underground civic movement demanding human rights. Following the student protests of November 17, 1989, the peaceful <strong>Velvet Revolution (Sametová revoluce)</strong> toppled communist rule without a single death. Václav Havel was elected President, guiding the country to NATO accession in 1999 and the European Union in 2004.",
        "challenges": "As an advanced industrial manufacturing hub (Škoda Auto) with one of the lowest unemployment rates in the European Union, the Czech Republic focuses on modernizing automotive supply chains toward electric vehicles, expanding nuclear energy at Dukovany and Temelín, and investing in high-speed passenger rail.",
        "images": {
            "landscape": {
                "url": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
                "alt": "Bohemian Switzerland sandstone rock formations, Czech Republic",
                "caption": "The Pravčická brána sandstone arch in Bohemian Switzerland National Park, the largest natural sandstone arch in Europe."
            },
            "landmark": {
                "url": "https://images.unsplash.com/photo-1541845157-a6d2d100c931?q=80&w=1200&auto=format&fit=crop",
                "alt": "Charles Bridge and Prague Castle across the Vltava River, Czech Republic",
                "caption": "The medieval Charles Bridge crossing the Vltava River toward Prague Castle, the largest ancient castle complex in the world."
            },
            "streetview": {
                "url": "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=1200&auto=format&fit=crop",
                "alt": "Czech highway with blue signage and red/white delineators",
                "caption": "Czech street view indicators: white Euro plates with blue 'CZ' strip, red-and-white striped bridge markers, and blue town signs with white borders."
            }
        },
        "streetViewMeta": {
            "drivingSide": "Right (switched from left on March 15, 1939)",
            "licensePlates": "White standard Euro plates with blue EU strip on left ('CZ'); the first letter after the first digit indicates the region (e.g., 'A' for Prague, 'B' for South Moravia/Brno).",
            "utilityPoles": "Reinforced concrete poles with metal climbing rungs or wooden poles in rural Moravia.",
            "roadMarkings": "Continuous or dashed white centerlines; solid white edge lines; blue-background highway exit signs.",
            "delineators": "White posts with red reflectors on the right and white on the left, with small orange reflectors on bridge abutments.",
            "cameraGen": "Dense Gen 3 and Gen 4 coverage across all 14 regions from Bohemia to Moravia."
        },
        "aiSummary": {
            "geo": "Central European nation comprising Bohemia, Moravia, and Silesia; capital in Prague on the Vltava.",
            "flag": "White and red horizontal bicolor with a blue hoist wedge, created in 1920 by Jaroslav Kursa.",
            "freedom": "1918 Czechoslovak democracy; 1989 peaceful Velvet Revolution led by Václav Havel; 1993 independent Republic.",
            "challenge": "Automotive EV transformation, nuclear power expansion at Dukovany, and high-speed rail construction."
        },
        "faqs": [
            {
                "question": "What was the Velvet Revolution of 1989?",
                "answer": "The Velvet Revolution was a peaceful, non-violent mass demonstration in November-December 1989 that toppled the communist regime in Czechoslovakia, electing dissident writer Václav Havel as President."
            },
            {
                "question": "What is the meaning of the blue triangle on the Czech flag?",
                "answer": "The blue wedge was added in 1920 to the traditional red-and-white Bohemian colors to distinguish the flag from Poland and incorporate the blue emblem of Moravia and Slovakia."
            }
        ],
        "timeline": [
            {"year": "1348", "event": "King Charles IV founds Charles University in Prague and Charles Bridge."},
            {"year": "1918", "event": "Tomáš Garrigue Masaryk establishes independent democratic Czechoslovakia on October 28."},
            {"year": "1968", "event": "The Prague Spring reform movement is halted by Warsaw Pact military intervention."},
            {"year": "1989", "event": "The Velvet Revolution peacefully restores democracy; Václav Havel is elected President."},
            {"year": "1993", "event": "The peaceful Velvet Divorce creates the sovereign Czech Republic on January 1."},
            {"year": "2004", "event": "The Czech Republic officially joins the European Union."}
        ]
    },
    "ro": {
        "code": "RO",
        "name": "Romania",
        "capital": "Bucharest",
        "continent": "Europe",
        "population": "19.0 Million",
        "currency": "Romanian Leu (RON)",
        "languages": ["Romanian"],
        "seoTitle": "History of Romania: Carpathian Fortress, Blue-Yellow-Red Tricolor, and 1918 Great Union",
        "metaDescription": "Discover the detailed history of Romania. Explore the Dacian kingdom, Vlad the Impaler, the 1918 Great Union, the Carpathian Mountains, and the Romanian tricolor.",
        "mapFormation": "Spanning 238,397 square kilometers in Southeastern Europe centered on the arc of the <strong>Carpathian Mountains</strong> and the lower Danube River delta along the Black Sea, Romania (<em>România</em>) is the twelfth-largest country in the European Union.<br><br>The territory was inhabited in antiquity by the Dacians under King Decebalus before being conquered by Roman Emperor Trajan in 106 CE, leading to the Daco-Roman ethnogenesis and Latin Romance language of modern Romanians. In the Middle Ages, three principalities emerged: <strong>Wallachia, Moldavia, and Transylvania</strong>.<br><br>In 1859, the personal union of Wallachia and Moldavia under Prince Alexandru Ioan Cuza created the United Principalities. Full sovereign independence from the Ottoman Empire was achieved during the 1877–1878 War of Independence. Following World War I, the <strong>Great Union of December 1, 1918</strong> (<em>Marea Unire</em>) united Transylvania, Bessarabia, and Bukovina with the Kingdom of Romania in Alba Iulia, establishing modern frontiers.",
        "flagHistory": "The national flag of Romania—the <em>Tricolorul</em>—features three equal vertical bands of cobalt blue (hoist), chrome yellow (middle), and vermilion red (fly), formally adopted by the Provisional Government on <strong>June 26, 1848</strong>, during the Wallachian Revolution.<br><br>The three colors combine the traditional heraldic banners of the Romanian principalities: <strong>Blue</strong> for Wallachia (symbolizing liberty and the blue skies), <strong>Yellow</strong> for Moldavia (symbolizing justice and golden wheat fields), and <strong>Red</strong> for Transylvania (symbolizing fraternity and patriotic blood shed in defense of the realm). Following the 1989 Revolution, the communist coat of arms was removed from the center, restoring the pure historic tricolor.",
        "freedomStory": "Romania's sovereign freedom is rooted in the 1848 Wallachian Revolution and the heroic events of the 1989 Romanian Revolution.<br><br>On <strong>December 1, 1918</strong>, over 100,000 delegates gathered at the National Assembly in Alba Iulia to proclaim the unification of Transylvania with Romania (celebrated annually as Great Union Day / <em>Ziua Marii Uniri</em>).<br><br>In December 1989, popular protests against the totalitarian regime of Nicolae Ceaușescu erupted in Timișoara and Bucharest. Courageous citizens cut the communist crest out of the center of Romanian flags, creating the famous 'flag with a hole'. On <strong>December 22, 1989</strong>, the dictatorship was overthrown, establishing constitutional democracy under the 1991 Constitution. Romania joined NATO in 2004 and the European Union in 2007.",
        "challenges": "As a major industrial and agricultural economy and NATO's Black Sea strategic anchor, Romania is accelerating national infrastructure projects. Foremost priorities include completing the A7 and A8 Moldavia highway corridors, expanding nuclear power units at Cernavodă, and developing offshore natural gas reserves in the Black Sea (Neptun Deep).",
        "images": {
            "landscape": {
                "url": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
                "alt": "Transfăgărășan highway winding through the Carpathian Mountains, Romania",
                "caption": "The Transfăgărășan highway winding through the Făgăraș Mountains of the Southern Carpathians in central Romania."
            },
            "landmark": {
                "url": "https://images.unsplash.com/photo-1512813195386-6cf811ad3542?q=80&w=1200&auto=format&fit=crop",
                "alt": "Bran Castle (Dracula's Castle) in Transylvania, Romania",
                "caption": "Bran Castle perched on a cliff in Transylvania near Brașov, built in 1377 by Teutonic Knights and Saxons of Kronstadt."
            },
            "streetview": {
                "url": "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=1200&auto=format&fit=crop",
                "alt": "Romanian street view with blue/yellow/red markers and concrete poles",
                "caption": "Romanian street view tells: white Euro plates with blue 'RO' strip, concrete poles with holes or metal climbing rungs, and rural wooden fences."
            }
        },
        "streetViewMeta": {
            "drivingSide": "Right",
            "licensePlates": "White standard Euro plates with blue EU strip on left ('RO'); two letters denote the county (e.g., 'B' for Bucharest, 'CJ' for Cluj) followed by two or three digits and three letters.",
            "utilityPoles": "Reinforced concrete poles with rectangular ladder holes (similar to Polish poles) or circular concrete posts; wooden fences in Transylvanian villages.",
            "roadMarkings": "Continuous or dashed white centerlines; solid white edge lines; blue highway signs with Romanian diacritics (ă, â, î, ș, ț).",
            "delineators": "White posts with red reflectors on right and white on left.",
            "cameraGen": "Dense Gen 3 and Gen 4 coverage across all 41 counties and Bucharest."
        },
        "aiSummary": {
            "geo": "Southeastern European country around the Carpathian Mountains and Danube Delta; capital in Bucharest.",
            "flag": "Tricolorul: vertical blue, yellow, and red bands combining Wallachia, Moldavia, and Transylvania.",
            "freedom": "1918 Great Union of Alba Iulia; 1989 Romanian Revolution restored democracy.",
            "challenge": "Highway infrastructure modernization (A7/A8), Black Sea energy development, and tech hub expansion."
        },
        "faqs": [
            {
                "question": "What is celebrated on December 1 in Romania?",
                "answer": "December 1 is Great Union Day (Ziua Marii Uniri), Romania's National Day, commemorating the 1918 assembly in Alba Iulia that unified Transylvania, Bessarabia, and Bukovina with the Kingdom of Romania."
            },
            {
                "question": "Why is the Romanian language unique in Eastern Europe?",
                "answer": "Romanian is the only Eastern Romance language, descending from Vulgar Latin spoken in the Roman province of Dacia, making it closely related to Italian, Spanish, French, and Portuguese."
            }
        ],
        "timeline": [
            {"year": "106 CE", "event": "Emperor Trajan conquers Dacia, initiating Romanization and the Romanian language."},
            {"year": "1859", "event": "Alexandru Ioan Cuza unifies Wallachia and Moldavia into the United Principalities."},
            {"year": "1877", "event": "Romania proclaims sovereign independence from the Ottoman Empire on May 9."},
            {"year": "1918", "event": "The Great Union of Alba Iulia on December 1 unites all historic Romanian lands."},
            {"year": "1989", "event": "The December Revolution topples the communist regime, restoring democracy."},
            {"year": "2007", "event": "Romania officially joins the European Union."}
        ]
    }
}

for code, data in batch2_part7.items():
    file_path = os.path.join(output_dir, f"{code}.json")
    with open(file_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print(f"Updated {code.upper()} chronicle successfully.")
