import json
import os

output_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "../src/data/chronicles"))
os.makedirs(output_dir, exist_ok=True)

batch1_data = {
    "cn": {
        "code": "CN",
        "name": "China",
        "capital": "Beijing",
        "continent": "Asia",
        "population": "1.41 Billion",
        "currency": "Renminbi Yuan (CNY)",
        "languages": ["Mandarin Chinese"],
        "seoTitle": "History of China: Dynastic Unification, Five-Starred Red Flag, and Modern Power",
        "metaDescription": "Explore the comprehensive history of China. Discover the Qin unification, Great Wall, 1911 Revolution, Five-Starred Red Flag, and economic rise.",
        "mapFormation": "Spanning 9.6 million square kilometers across East Asia from the Pamir Mountains to the Pacific Ocean, the People's Republic of China is the world's third-largest country by land area, cradled by two great river arteries: the Yellow River (Huang He) and the Yangtze (Chang Jiang).<br><br>The territorial foundations of a unified Chinese state were forged in <strong>221 BCE</strong> when Qin Shi Huang conquered the Warring States, establishing the Qin Dynasty, standardizing script and currency, and connecting frontier fortifications into the <strong>Great Wall of China</strong>. Successive imperial dynasties—the Han, Tang, Song, Ming, and Qing—expanded frontiers across the Silk Road corridors of Central Asia and the Tibetan plateau.<br><br>Following the collapse of the Qing Dynasty in the <strong>Xinhai Revolution of 1911</strong> and the conclusion of the Chinese Civil War in 1949, Chairman Mao Zedong proclaimed the People's Republic of China on October 1, 1949, establishing the modern sovereign state with subsequent peaceful reintegrations of Hong Kong (1997) and Macau (1999).",
        "flagHistory": "The national flag of China—the <strong>Five-Starred Red Flag</strong> (<em>Wǔxīng Hóngqí</em>)—was designed by Zeng Liansong and officially hoisted over Tiananmen Square on <strong>October 1, 1949</strong>.<br><br>The flag features a brilliant red field symbolizing the blood of revolutionary martyrs and the communist revolution. In the upper hoist canton are five golden-yellow five-pointed stars: one large central star surrounded by an arc of four smaller stars, each with one point aimed directly toward the center of the primary star. In official symbolism, the large star represents the unified leadership of the Communist Party of China, while the four smaller stars symbolize the four social classes united in national construction (the working class, the peasantry, the urban petty bourgeoisie, and the national bourgeoisie).",
        "freedomStory": "China's modern path to sovereign independence arose from resistance against the 'Century of Humiliation' (1839–1949) initiated by the Opium Wars and unequal treaties with colonial powers.<br><br>In October 1911, Dr. Sun Yat-sen led the <strong>Xinhai Revolution</strong>, overthrowing over two millennia of imperial dynastic rule and founding the Republic of China based on the 'Three Principles of the People' (Nationalism, Democracy, and People's Livelihood). Following heroic national resistance during World War II, the People's Republic of China established sovereign self-determination in 1949.<br><br>Under the leadership of Deng Xiaoping beginning in 1978, China initiated historic <strong>'Reform and Opening-up'</strong> policies, establishing Special Economic Zones in Shenzhen and Shanghai that lifted over 800 million citizens out of poverty and built the world's second-largest economy.",
        "challenges": "China navigates profound demographic, environmental, and technological transitions. Chief among these is managing a shrinking working-age population resulting from historic demographic trends, accelerating investments in domestic semiconductor manufacturing, and decarbonizing the world's largest industrial manufacturing base through massive solar, wind, and ultra-high-voltage transmission networks.",
        "images": {
            "landscape": {
                "url": "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?q=80&w=1200&auto=format&fit=crop",
                "alt": "Great Wall of China winding across mountain ridges",
                "caption": "The Great Wall of China winding across the rugged mountain ridges of northern China, built over two millennia to defend imperial frontiers."
            },
            "landmark": {
                "url": "https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?q=80&w=1200&auto=format&fit=crop",
                "alt": "Forbidden City in Beijing, China",
                "caption": "The Forbidden City in Beijing, the imperial palace complex of the Ming and Qing dynasties and masterpiece of classical Chinese architecture."
            },
            "streetview": {
                "url": "https://images.unsplash.com/photo-1513415755852-c07a58667a42?q=80&w=1200&auto=format&fit=crop",
                "alt": "Chinese highway and skyline infrastructure",
                "caption": "Chinese transportation infrastructure: green express highway shields, blue license plates, and multi-lane modern overpasses."
            }
        },
        "streetViewMeta": {
            "drivingSide": "Right",
            "licensePlates": "Blue rectangular plates with white Chinese characters and numbers for regular passenger vehicles; green-and-white gradient plates for electric vehicles.",
            "utilityPoles": "Tall concrete poles with metal climbing steps and transformer platforms.",
            "roadMarkings": "White or yellow dashed centerlines; solid yellow lines on mountainous divided highways.",
            "delineators": "Red and white striped guideposts with square glass reflectors.",
            "cameraGen": "Official Street View is limited; comprehensive panoramic museum and university campus trekker coverage."
        },
        "aiSummary": {
            "geo": "East Asian nation spanning 9.6M sq km; unified in 221 BCE by Qin Shi Huang and modernized in 1949.",
            "flag": "Five-Starred Red Flag: large golden star representing state leadership flanked by four smaller stars.",
            "freedom": "1911 Xinhai Revolution ended dynastic rule; 1949 independence and 1978 economic modernization.",
            "challenge": "Demographic super-aging, renewable energy grid transition, and high-tech supply chain resilience."
        },
        "faqs": [
            {
                "question": "When was China first unified as a single empire?",
                "answer": "China was first unified in 221 BCE by Qin Shi Huang, the first Emperor of the Qin Dynasty, who connected the Great Wall and standardized laws."
            },
            {
                "question": "What do the five stars on the Chinese flag represent?",
                "answer": "The large star represents the leadership of the Communist Party, and the four smaller stars symbolize the four social classes united in national progress."
            },
            {
                "question": "What was the Xinhai Revolution of 1911?",
                "answer": "The Xinhai Revolution overthrew the Qing Dynasty, ending more than 2,000 years of imperial monarchy and establishing the Republic of China."
            }
        ],
        "timeline": [
            {"year": "221 BCE", "event": "Qin Shi Huang unifies the Warring States, founding the first imperial Chinese dynasty."},
            {"year": "1368", "event": "The Ming Dynasty is established, constructing the Forbidden City and modern Great Wall."},
            {"year": "1911", "event": "The Xinhai Revolution overthrows the Qing Dynasty, ending imperial monarchy."},
            {"year": "1949", "event": "Mao Zedong proclaims the People's Republic of China on October 1 in Beijing."},
            {"year": "1978", "event": "Deng Xiaoping launches Reform and Opening-up, initiating rapid economic modernization."},
            {"year": "1997", "event": "Hong Kong returns to Chinese sovereignty under the One Country, Two Systems framework."},
            {"year": "2008", "event": "Beijing hosts the Summer Olympic Games, showcasing world-class infrastructure."}
        ]
    },
    "ru": {
        "code": "RU",
        "name": "Russia",
        "capital": "Moscow",
        "continent": "Europe",
        "population": "144.2 Million",
        "currency": "Russian Ruble (RUB)",
        "languages": ["Russian"],
        "seoTitle": "History of Russia: Eurasian Continental Borders, White-Blue-Red Flag, and Sovereignty",
        "metaDescription": "Explore the detailed history of Russia. Discover Kievan Rus, Peter the Great's empire, the 1991 Russian Federation, and the historic tricolor flag.",
        "mapFormation": "Spanning 17.1 million square kilometers across Eastern Europe and Northern Asia, the Russian Federation is the largest sovereign nation on Earth by land area, covering eleven time zones from the Baltic Sea to the Bering Strait.<br><br>The historic state originated with the East Slavic confederation of <strong>Kievan Rus</strong> in the 9th century, followed by the rise of the Grand Duchy of Moscow in the 14th century. Under Tsar Ivan IV (the Terrible), Russia expanded eastward across the Ural Mountains into the vast boreal forests of Siberia.<br><br>Tsar <strong>Peter the Great (1682–1725)</strong> transformed the Tsardom into the Russian Empire, founding Saint Petersburg as a 'Window to Europe' and expanding south to the Black Sea and east to the Pacific Ocean. Following the 1917 Russian Revolution, the territory formed the core of the Soviet Union (USSR). On <strong>December 25, 1991</strong>, following the dissolution of the Soviet Union, the modern Russian Federation emerged as the sovereign successor state.",
        "flagHistory": "The national flag of Russia—a horizontal tricolor of <strong>White, Blue, and Red</strong>—was created in 1696 by Tsar Peter the Great as the civil merchant ensign of the Russian Empire, inspired by the Dutch tricolor.<br><br>In traditional Russian heraldic symbolism, <strong>White</strong> represents nobility, peace, and the snows of the North; <strong>Blue</strong> represents faithfulness, honesty, and the skies; and <strong>Red</strong> symbolizes courage, generosity, and love. The flag was officially reinstated by the Supreme Soviet of the Russian SFSR on <strong>August 22, 1991</strong>, replacing the Soviet hammer-and-sickle banner.",
        "freedomStory": "Russia's modern sovereignty was established through the dramatic democratic transition of 1991.<br><br>Following decades of Soviet totalitarian administration and the reform programs of <em>Glasnost</em> (openness) and <em>Perestroika</em> (restructuring) initiated by Mikhail Gorbachev, the Russian Parliament adopted the <strong>Declaration of State Sovereignty on June 12, 1990</strong> (celebrated annually as Russia Day).<br><br>On <strong>December 12, 1993</strong>, citizens approved the Constitution of the Russian Federation in a nationwide referendum, establishing a federal democratic state with separation of powers, judicial guarantees, and private property rights.",
        "challenges": "Contemporary Russia confronts extensive economic and geopolitical restructuring. Core internal priorities include modernizing vast trans-Siberian transportation corridors, investing in Arctic icebreaker shipping routes along the Northern Sea Route, and managing demographic population stabilization across vast rural provinces.",
        "images": {
            "landscape": {
                "url": "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=1200&auto=format&fit=crop",
                "alt": "Lake Baikal in Siberia, Russia",
                "caption": "Lake Baikal in Siberia, the world's deepest and oldest freshwater lake containing 20% of Earth's unfrozen surface freshwater."
            },
            "landmark": {
                "url": "https://images.unsplash.com/photo-1513326738677-b964603b136d?q=80&w=1200&auto=format&fit=crop",
                "alt": "Saint Basil's Cathedral in Moscow, Russia",
                "caption": "Saint Basil's Cathedral in Red Square, Moscow, commissioned by Ivan IV in 1555 and an icon of Russian architecture."
            },
            "streetview": {
                "url": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
                "alt": "Russian highway with Cyrillic signs and blue road markers",
                "caption": "Russian street view cues: white rectangular plates with region number codes, Cyrillic highway signs, and wide birch forests."
            }
        },
        "streetViewMeta": {
            "drivingSide": "Right",
            "licensePlates": "White rectangular plates with black Cyrillic letters and a distinct separated box on the right containing the Russian flag and 2-3 digit regional code (e.g., 77 for Moscow).",
            "utilityPoles": "Concrete poles with rounded or square cross-sections; black/white painted bases in urban centers.",
            "roadMarkings": "White dashed centerlines; solid white edge lines; blue-background highway signs with Cyrillic script.",
            "delineators": "White posts with a slanted black band and red rectangular reflector.",
            "cameraGen": "Massive Gen 3 and Gen 4 coverage across major federal highways from Saint Petersburg to Vladivostok."
        },
        "aiSummary": {
            "geo": "Largest country in the world spanning 17.1M sq km; borders consolidated across Siberia and the Pacific coast.",
            "flag": "White, blue, and red horizontal tricolor designed by Peter the Great in 1696.",
            "freedom": "1990 Declaration of State Sovereignty and 1993 Constitution following Soviet dissolution.",
            "challenge": "Arctic northern sea route development, demographic aging, and transport infrastructure."
        },
        "faqs": [
            {
                "question": "What is the largest country in the world by land area?",
                "answer": "Russia is the largest country in the world, covering over 17.1 million square kilometers across Europe and Asia."
            },
            {
                "question": "When was the modern Russian Federation established?",
                "answer": "The modern Russian Federation emerged on December 25, 1991, following the dissolution of the Soviet Union."
            }
        ],
        "timeline": [
            {"year": "882 CE", "event": "Oleg of Novgorod unifies East Slavic lands, establishing Kievan Rus."},
            {"year": "1703", "event": "Peter the Great founds Saint Petersburg, establishing the Russian Empire."},
            {"year": "1812", "event": "Russian forces defeat Napoleon's Grande Armée during the Patriotic War of 1812."},
            {"year": "1917", "event": "The Russian Revolution ends Tsarist rule, establishing the Soviet state."},
            {"year": "1945", "event": "Victory in World War II cements Soviet global superpower status."},
            {"year": "1961", "event": "Yuri Gagarin becomes the first human in space aboard Vostok 1."},
            {"year": "1991", "event": "The Soviet Union dissolves on December 25; the Russian Federation is established."}
        ]
    },
    "za": {
        "code": "ZA",
        "name": "South Africa",
        "capital": "Pretoria (Executive), Cape Town (Legislative), Bloemfontein (Judicial)",
        "continent": "Africa",
        "population": "60.4 Million",
        "currency": "South African Rand (ZAR)",
        "languages": ["isiZulu", "isiXhosa", "Afrikaans", "English", "Sepedi", "Setswana"],
        "seoTitle": "History of South Africa: Rainbow Nation, Six-Colored Flag, and Nelson Mandela",
        "metaDescription": "Explore the detailed history of South Africa. Discover the 1994 end of Apartheid, Nelson Mandela's presidency, and the iconic six-color flag.",
        "mapFormation": "Occupying the southernmost tip of the African continent across 1.22 million square kilometers, the Republic of South Africa is flanked by the South Atlantic and Indian Oceans, meeting at Cape Agulhas. Indigenous San hunter-gatherers and Khoekhoe pastoralists inhabited the region for over 100,000 years, followed by Bantu-speaking agricultural migrations from Central Africa.<br><br>European colonization began with the Dutch East India Company establishing a replenishment station at Table Bay (Cape Town) under Jan van Riebeeck in 1652. British forces seized the Cape Colony in 1806, prompting thousands of Boer (Afrikaner) settlers to embark on the Great Trek into the interior, establishing the independent South African Republic (Transvaal) and the Orange Free State.<br><br>Following the Anglo-Boer Wars (1899–1902), the British Parliament passed the South Africa Act 1909, creating the unified <strong>Union of South Africa on May 31, 1910</strong>. The modern democratic borders, encompassing nine provinces and completely surrounding the enclave kingdom of Lesotho, were codified in the 1994 post-apartheid democratic transition.",
        "flagHistory": "The national flag of South Africa—universally celebrated as the <strong>Rainbow Flag</strong>—is one of the most vibrant and unified vexillological designs in world history, designed by State Herald Frederick Brownell and officially adopted on <strong>April 27, 1994</strong>.<br><br>The design features a central horizontal green 'Y' (pall) shape originating at the hoist and extending to the outer fly edge. The 'Y' symbol represents the convergence of diverse cultures, languages, and histories into a unified forward path for the 'Rainbow Nation'.<br><br>The flag incorporates six harmonious colors: <strong>Black, Gold, and Green</strong> (representing the historic liberation movements and the African National Congress); alongside <strong>Red, White, and Blue</strong> (representing the European and colonial heritage of the Boer republics and British Union Jack).",
        "freedomStory": "South Africa's journey to sovereign freedom represents one of humanity's greatest moral triumphs against institutionalized racial tyranny.<br><br>Following decades of state-enforced segregation under the Apartheid regime instituted in 1948, the African National Congress (ANC), Pan Africanist Congress, and civic resistance leaders fought for universal human dignity. Leaders such as <strong>Nelson Mandela</strong>, Oliver Tambo, Walter Sisulu, and Archbishop Desmond Tutu mobilized domestic strikes and international sanctions.<br><br>Mandela's release from Victor Verster Prison on February 11, 1990, led to historic multi-party negotiations. On <strong>April 27, 1994</strong>, South Africa held its first non-racial democratic elections (celebrated annually as Freedom Day). Nelson Mandela was inaugurated as the nation's first Black President, establishing a constitutional democracy with one of the most progressive Bills of Rights in the world.",
        "challenges": "In the 21st century, South Africa is the industrial powerhouse of Africa while addressing critical socioeconomic hurdles. Foremost challenges include reducing structural youth unemployment, expanding electric grid capacity through the Just Energy Transition Partnership, and upgrading water infrastructure across drought-prone coastal municipalities.",
        "images": {
            "landscape": {
                "url": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
                "alt": "Table Mountain in Cape Town, South Africa",
                "caption": "Table Mountain overlooking Table Bay in Cape Town, one of the New 7 Wonders of Nature and ancient sandstone landmark of South Africa."
            },
            "landmark": {
                "url": "https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?q=80&w=1200&auto=format&fit=crop",
                "alt": "Union Buildings in Pretoria, South Africa",
                "caption": "The Union Buildings in Pretoria, the seat of the executive government where Nelson Mandela was inaugurated as President in 1994."
            },
            "streetview": {
                "url": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop",
                "alt": "South African road with yellow outer lines and left-hand driving",
                "caption": "South African road meta: driving on the left, continuous yellow outer shoulder lines, and white center dividing lines."
            }
        },
        "streetViewMeta": {
            "drivingSide": "Left",
            "licensePlates": "White rectangular plates with province-specific emblems (e.g., Gauteng features blue lettering, Western Cape features an anchor logo).",
            "utilityPoles": "Wooden utility poles with metal cross-arms; circular concrete posts in newer suburban developments.",
            "roadMarkings": "Continuous bright yellow outer shoulder lines (unique in Southern Africa); white dashed centerlines.",
            "delineators": "Guideposts with red reflectors on the left and white on the right.",
            "cameraGen": "Early Gen 2 coverage with purple sun halo artifacts alongside extensive Gen 3 and Gen 4 coverage."
        },
        "aiSummary": {
            "geo": "Southernmost African nation; borders unified in 1910 and reorganized into nine provinces in 1994.",
            "flag": "The Rainbow Flag: six colors with a central green 'Y' shape symbolizing convergence and unity.",
            "freedom": "1994 non-racial democratic election ended Apartheid; Nelson Mandela inaugurated president.",
            "challenge": "Youth employment creation, power grid load-shedding transitions, and water security."
        },
        "faqs": [
            {
                "question": "Why does South Africa have three capital cities?",
                "answer": "South Africa divides power across three capitals: Pretoria is the Executive capital, Cape Town is the Legislative capital (Parliament), and Bloemfontein is the Judicial capital (Supreme Court of Appeal)."
            },
            {
                "question": "What is the historical significance of April 27 in South Africa?",
                "answer": "April 27 is Freedom Day, commemorating the first democratic, non-racial elections held in 1994, which elected Nelson Mandela as President."
            }
        ],
        "timeline": [
            {"year": "1652", "event": "Jan van Riebeeck establishes a Dutch settlement at Table Bay (Cape Town)."},
            {"year": "1910", "event": "The Union of South Africa is formed on May 31, uniting British colonies and Boer republics."},
            {"year": "1948", "event": "The National Party enacts the formal legal framework of Apartheid."},
            {"year": "1990", "event": "Nelson Mandela is released from prison after 27 years of incarceration on February 11."},
            {"year": "1994", "event": "South Africa holds its first democratic elections; Nelson Mandela is inaugurated as President on May 10."},
            {"year": "1996", "event": "President Mandela signs the new democratic Constitution of the Republic of South Africa."},
            {"year": "2010", "event": "South Africa hosts the FIFA World Cup, the first on the African continent."}
        ]
    },
    "ng": {
        "code": "NG",
        "name": "Nigeria",
        "capital": "Abuja",
        "continent": "Africa",
        "population": "223.8 Million",
        "currency": "Nigerian Naira (NGN)",
        "languages": ["English", "Hausa", "Yoruba", "Igbo"],
        "seoTitle": "History of Nigeria: Giant of Africa, Green-White-Green Flag, and 1960 Independence",
        "metaDescription": "Discover the detailed history of Nigeria. Explore ancient kingdoms of Benin and Oyo, 1960 independence, the Green-White-Green flag, and modern energy.",
        "mapFormation": "Spanning 923,768 square kilometers along the Gulf of Guinea in West Africa, the Federal Republic of Nigeria is the most populous nation on the African continent. The territory is naturally drained by the confluence of the Niger and Benue Rivers meeting at Lokoja.<br><br>The territory has been home to advanced civilizations for over two millennia, including the Nok culture (c. 1500 BCE), the Kingdom of Nri, the Kingdom of Benin famous for its bronze metallurgy, the Yoruba Kingdom of Oyo, and the northern Hausa-Fulani kingdoms that united under Usman dan Fodio in the 1804 Sokoto Caliphate.<br><br>In 1914, British colonial governor Lord Frederick Lugard amalgamated the Northern and Southern Nigeria Protectorates into a single entity. Nigeria attained sovereign independence on <strong>October 1, 1960</strong>. In 1991, the federal capital was officially moved from coastal Lagos to purpose-built <strong>Abuja</strong> in the geographic center of the country.",
        "flagHistory": "The national flag of Nigeria—the iconic <strong>Green-White-Green</strong> vertical triband—was designed in 1959 by Taiwo Akinkunmi, a 23-year-old electrical engineering student, and formally hoisted at independence on <strong>October 1, 1960</strong>.<br><br>The design features two equal outer vertical bands of lush emerald green flanking a central white band. In vexillological symbolism, the two <strong>Green</strong> bands represent Nigeria's rich natural agricultural wealth and lush tropical forests, while the central <strong>White</strong> band represents peace, unity, and integrity.",
        "freedomStory": "Nigeria's journey to sovereign freedom was championed by brilliant anti-colonial intellectuals and regional statesmen through constitutional conferences in London and Lagos.<br><br>Visionary nationalists including <strong>Dr. Nnamdi Azikiwe</strong> (Zik), Chief Obafemi Awolowo, and Sir Ahmadu Bello led the legislative movement for self-determination. The British Parliament passed the Nigeria Independence Act, and on <strong>October 1, 1960</strong>, Nigeria became a fully independent nation, later proclaiming the Federal Republic on October 1, 1963, with Dr. Azikiwe as its first President.<br><br>Following civil war and periods of military rule, Nigeria established uninterrupted democratic governance in 1999 with the enactment of the 1999 Constitution.",
        "challenges": "As Africa's largest demographic powerhouse and a top petroleum exporter, Nigeria is executing economic diversification programs. Foremost priorities include expanding electricity grid transmission, supporting the booming tech and creative Nollywood industries in Lagos, and managing agricultural irrigation across the Sahelian north.",
        "images": {
            "landscape": {
                "url": "https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?q=80&w=1200&auto=format&fit=crop",
                "alt": "Zuma Rock monolith in Niger State, Nigeria",
                "caption": "Zuma Rock, a massive natural granitic monolith rising 725 meters above the surrounding savanna near the capital Abuja."
            },
            "landmark": {
                "url": "https://images.unsplash.com/photo-1512813195386-6cf811ad3542?q=80&w=1200&auto=format&fit=crop",
                "alt": "National Arts Theatre in Lagos, Nigeria",
                "caption": "The National Arts Theatre in Iganmu, Lagos, an iconic cultural landmark celebrating African arts, music, and performance."
            },
            "streetview": {
                "url": "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?q=80&w=1200&auto=format&fit=crop",
                "alt": "Nigerian street view with police escort car meta",
                "caption": "Unique Nigerian Street View clue: a Toyota Hilux police escort vehicle with flashing beacon lights visible in camera footage."
            }
        },
        "streetViewMeta": {
            "drivingSide": "Right",
            "licensePlates": "White rectangular plates with green lettering and the map outline of Nigeria in the center.",
            "utilityPoles": "Wooden poles with horizontal cross-bars; concrete circular poles along dual carriageways.",
            "roadMarkings": "White dashed centerlines; solid yellow lines on dual carriageways.",
            "delineators": "Concrete curbstones painted with alternating black and white stripes near toll plazas and intersections.",
            "cameraGen": "Gen 3 coverage; famous for the 'Police Escort Car' following the Google vehicle in Lagos, Abuja, and Benin City."
        },
        "aiSummary": {
            "geo": "Most populous African nation; borders shaped by the 1914 amalgamation and 1991 capital transfer to Abuja.",
            "flag": "Green-White-Green vertical triband designed by Taiwo Akinkunmi in 1959.",
            "freedom": "Independence achieved on October 1, 1960, led by Dr. Nnamdi Azikiwe and Ahmadu Bello.",
            "challenge": "Economic diversification away from oil, power grid modernization, and creative tech hub scaling."
        },
        "faqs": [
            {
                "question": "When did Nigeria gain independence?",
                "answer": "Nigeria attained independence from British colonial rule on October 1, 1960, becoming a Federal Republic in 1963."
            },
            {
                "question": "Why is Nigeria called the 'Giant of Africa'?",
                "answer": "Nigeria is called the 'Giant of Africa' because of its massive population (over 220 million people, largest in Africa) and its dominant cultural and economic influence."
            }
        ],
        "timeline": [
            {"year": "1500 BCE", "event": "The ancient Nok culture develops advanced terracotta sculptures and iron smelting."},
            {"year": "1914", "event": "Lord Lugard amalgamates the Northern and Southern Nigeria Protectorates."},
            {"year": "1960", "event": "Nigeria achieves sovereign independence from Great Britain on October 1."},
            {"year": "1963", "event": "Nigeria becomes a Federal Republic with Dr. Nnamdi Azikiwe as its first President."},
            {"year": "1991", "event": "The federal capital is officially moved from Lagos to purpose-built Abuja."},
            {"year": "1999", "event": "Democratic civilian governance is restored with the adoption of the 1999 Constitution."}
        ]
    },
    "kr": {
        "code": "KR",
        "name": "South Korea",
        "capital": "Seoul",
        "continent": "Asia",
        "population": "51.7 Million",
        "currency": "South Korean Won (KRW)",
        "languages": ["Korean"],
        "seoTitle": "History of South Korea: Miracle on the Han River, Taegeukgi Flag, and Democracy",
        "metaDescription": "Discover the detailed history of South Korea. Explore the Three Kingdoms, the 1948 Republic, the Taegeukgi Yin-Yang flag, and high-tech democracy.",
        "mapFormation": "Occupying the southern half of the mountainous Korean Peninsula in East Asia across 100,363 square kilometers, the Republic of Korea (<em>Daehan Minguk</em>) is bounded by the Yellow Sea to the west, the Korea Strait to the south, and the Sea of Japan (East Sea) to the east.<br><br>Korean civilization traces its legendary foundation to Dangun Wanggeom in 2333 BCE (Gojoseon), followed by the <strong>Three Kingdoms period</strong> (Goguryeo, Baekje, and Silla) unified under Silla in 676 CE. In 1392, General Yi Seong-gye founded the <strong>Joseon Dynasty</strong>, which governed for over five centuries from its capital in Hanyang (modern Seoul) and oversaw the invention of the Korean Hangul alphabet by King Sejong the Great in 1443.<br><br>Following Japanese colonial rule (1910–1945) and the division of the peninsula along the 38th parallel at the end of World War II, the Republic of Korea was officially proclaimed on <strong>August 15, 1948</strong>. The modern de facto border with North Korea is the 250-kilometer-long Demilitarized Zone (DMZ), established by the 1953 Korean Armistice Agreement.",
        "flagHistory": "The national flag of South Korea—the <strong>Taegeukgi</strong>—is a profound philosophical masterpiece of Taoist and Neo-Confucian cosmology, first used in 1882 by Joseon diplomats and officially adopted on <strong>October 15, 1949</strong>.<br><br>The flag features a pristine white field symbolizing peace, purity, and the traditional white clothing of the Korean people (the 'white-clad folk'). In the center sits the <strong>Taegeuk</strong> circle, divided horizontally into red (Yang - cosmic light, warmth, and masculine energy) at the top and blue (Yin - cosmic shadow, coolness, and feminine energy) at the bottom, representing universal harmony.<br><br>In the four corners are four black trigrams (<em>Gwae</em>) from the I Ching (Book of Changes): <strong>Geon</strong> (top-left: three solid lines = Heaven, Spring, Justice), <strong>Ri</strong> (bottom-left: Fire, Autumn, Wisdom), <strong>Gam</strong> (top-right: Water, Winter, Sincerity), and <strong>Gon</strong> (bottom-right: three broken lines = Earth, Summer, Vitality).",
        "freedomStory": "South Korea's modern liberty represents an inspiring victory against foreign occupation and authoritarianism.<br><br>On <strong>March 1, 1919</strong>, millions of Koreans held peaceful mass demonstrations against Japanese colonial rule (the March 1st Movement), leading to the establishment of the Provisional Government of the Republic of Korea in Shanghai.<br><br>Following the devastation of the Korean War (1950–1953), the nation achieved the phenomenal <strong>'Miracle on the Han River'</strong>, transforming from an impoverished agrarian war ruin into a high-tech industrial superpower. In <strong>June 1987</strong>, massive civic protests across Seoul forced the adoption of direct presidential elections and full constitutional democracy, creating a vibrant, high-tech society leading the world in semiconductors, shipbuilding, and global cultural arts (K-pop/K-dramas).",
        "challenges": "South Korea confronts profound demographic and geopolitical transformations. Foremost among them is the world's lowest total fertility rate, requiring innovative family welfare programs and eldercare automation. Technologically, Korea leads global AI memory chips while managing peninsula defense and clean nuclear and renewable transitions.",
        "images": {
            "landscape": {
                "url": "https://images.unsplash.com/photo-1538485399081-7191377e8241?q=80&w=1200&auto=format&fit=crop",
                "alt": "Bukhansan National Park overlooking Seoul, South Korea",
                "caption": "Bukhansan National Park overlooking the Seoul metropolitan area, where granite mountain peaks meet high-tech urban architecture."
            },
            "landmark": {
                "url": "https://images.unsplash.com/photo-1548115184-bc6544d06a58?q=80&w=1200&auto=format&fit=crop",
                "alt": "Gyeongbokgung Palace in Seoul, South Korea",
                "caption": "Gyeongbokgung Palace in Seoul, the principal royal palace of the Joseon Dynasty built in 1395 under King Taejo."
            },
            "streetview": {
                "url": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
                "alt": "South Korean highway with blue signs and Hangul script",
                "caption": "Korean street view tells: modern blue highway signs with Hangul and English, white license plates, and immaculate asphalt."
            }
        },
        "streetViewMeta": {
            "drivingSide": "Right",
            "licensePlates": "White rectangular plates with black Hangul characters and numerals; older commercial plates are yellow.",
            "utilityPoles": "Concrete utility poles with distinctive yellow-and-black striped hazard stickers near the base.",
            "roadMarkings": "Yellow double centerlines; blue bus-only lanes on urban arterial roads; prominent Hangul road markings.",
            "delineators": "White posts with circular orange reflectors; green chevron hazard markers on highway curves.",
            "cameraGen": "Dense Gen 3 and Gen 4 coverage across the entire mainland and Jeju Island."
        },
        "aiSummary": {
            "geo": "Mountainous East Asian peninsula nation; borders divided along the 1953 DMZ.",
            "flag": "The Taegeukgi: white field with red/blue Yin-Yang circle and four black trigrams representing cosmic harmony.",
            "freedom": "1919 March 1st Movement, 1948 Republic, and 1987 June Democratic Struggle establishing direct democracy.",
            "challenge": "Ultra-low fertility rate, semiconductor supply chain security, and green energy transitions."
        },
        "faqs": [
            {
                "question": "What is the meaning of the symbols on the South Korean flag (Taegeukgi)?",
                "answer": "The red and blue circle (Taegeuk) represents cosmic Yin-Yang harmony, while the four black trigrams in the corners represent Heaven, Earth, Water, and Fire."
            },
            {
                "question": "What was the 'Miracle on the Han River'?",
                "answer": "The 'Miracle on the Han River' refers to the rapid post-war economic development and industrialization of South Korea between the 1960s and 1990s."
            }
        ],
        "timeline": [
            {"year": "2333 BCE", "event": "Legendary founding of Gojoseon by Dangun Wanggeom."},
            {"year": "1443", "event": "King Sejong the Great creates the scientific Hangul alphabet."},
            {"year": "1919", "event": "The March 1st Movement rallies nationwide for independence from Japanese colonial rule."},
            {"year": "1948", "event": "The Republic of Korea is officially established on August 15."},
            {"year": "1953", "event": "The Korean Armistice Agreement establishes the Demilitarized Zone (DMZ)."},
            {"year": "1987", "event": "The June Democratic Struggle forces constitutional reforms for direct presidential elections."},
            {"year": "1988", "event": "Seoul hosts the Summer Olympic Games, demonstrating global economic emergence."}
        ]
    }
}

for code, data in batch1_data.items():
    file_path = os.path.join(output_dir, f"{code}.json")
    with open(file_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print(f"Updated {code.upper()} chronicle successfully.")
