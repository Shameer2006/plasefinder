import json
import os

output_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "../src/data/chronicles"))
os.makedirs(output_dir, exist_ok=True)

batch2_part5 = {
    "at": {
        "code": "AT",
        "name": "Austria",
        "capital": "Vienna",
        "continent": "Europe",
        "population": "9.1 Million",
        "currency": "Euro (EUR)",
        "languages": ["German"],
        "seoTitle": "History of Austria: Alpine Heartland, Red-White-Red Flag, and 1955 State Treaty",
        "metaDescription": "Explore the detailed history of Austria. Discover the Habsburg Dynasty, the 1156 Privilegium Maius, the 1955 State Treaty, and the historic flag of Duke Leopold V.",
        "mapFormation": "Spanning 83,879 square kilometers across the Eastern Alps and the Danube River basin in Central Europe, the Republic of Austria (<em>Österreich</em>) borders eight sovereign European states. The terrain is dominated by rugged alpine ranges (covering 62% of national territory) featuring the Grossglockner (3,798 meters).<br><br>The name <em>Ostarrîchi</em> was first recorded in 996 CE. In 1156, Emperor Frederick Barbarossa issued the <strong>Privilegium Minus</strong>, elevating Austria to an autonomous duchy under the Babenberg dynasty. In 1278, King Rudolf I established the <strong>House of Habsburg</strong>, which grew into one of the most powerful imperial dynasties in world history, governing the Holy Roman Empire, the Austrian Empire, and the Austro-Hungarian Dual Monarchy from the imperial capital of Vienna.<br><br>Following the collapse of the Austro-Hungarian Empire in 1918, the First Republic was established. Austria's modern sovereign independence and permanent international neutrality were codified in the <strong>Austrian State Treaty (Österreichischer Staatsvertrag) on May 15, 1955</strong>.",
        "flagHistory": "The national flag of Austria—the <em>Rot-Weiß-Rot</em> (Red-White-Red horizontal triband)—is one of the oldest sovereign flags in world history, dating back to Duke Leopold V of the Babenberg dynasty in 1191.<br><br>According to legendary medieval chronicles, during the fierce Siege of Acre during the Third Crusade in 1191, Duke Leopold V's white surcoat was drenched entirely in blood. When he removed his sword belt, a pristine white band was revealed beneath, inspiring the Red-White-Red coat of arms adopted by Duke Frederick II in 1230. In heraldic symbolism, <strong>Red</strong> represents physical courage and bravery, while <strong>White</strong> symbolizes honesty, peace, and the Danube River.",
        "freedomStory": "Austria's modern democratic sovereignty was achieved through the historic <strong>Austrian State Treaty of May 15, 1955</strong>, signed at the Belvedere Palace in Vienna by the Allied powers and Austrian Foreign Minister Leopold Figl, who famously proclaimed from the balcony: <em>'Österreich ist frei!'</em> ('Austria is free!').<br><br>On <strong>October 26, 1955</strong>, the Austrian Parliament enacted the Federal Constitutional Law on the <strong>Neutrality of Austria</strong>, pledging perpetual international neutrality (celebrated annually as Austria's National Day / <em>Nationalfeiertag</em>). Today, Austria is a founding pillar of modern European diplomacy, home to the United Nations Office in Vienna (UNOV), the IAEA, and OPEC.",
        "challenges": "As an alpine tourism and high-precision manufacturing powerhouse, Austria balances economic growth with alpine ecology. Foremost priorities include accelerating alpine rail transit via the Semmering and Koralm base tunnels, phasing out fossil energy dependencies, and stewarding pristine freshwater reserves.",
        "images": {
            "landscape": {
                "url": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
                "alt": "Hallstatt lakeside village in the Austrian Alps",
                "caption": "The UNESCO World Heritage village of Hallstatt nestled between Lake Hallstatt and the Dachstein Alps in Salzkammergut, Austria."
            },
            "landmark": {
                "url": "https://images.unsplash.com/photo-1512813195386-6cf811ad3542?q=80&w=1200&auto=format&fit=crop",
                "alt": "Schönbrunn Palace and imperial gardens in Vienna, Austria",
                "caption": "Schönbrunn Palace in Vienna, the 1,441-room Baroque summer residence of the Habsburg monarchs and Empress Maria Theresa."
            },
            "streetview": {
                "url": "https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=1200&auto=format&fit=crop",
                "alt": "Austrian highway with blue signs and state coat of arms license plates",
                "caption": "Austrian street view clues: white license plates with state crests, blue autobahn signs, and distinctive black-and-white Leitpflöcke delineators."
            }
        },
        "streetViewMeta": {
            "drivingSide": "Right",
            "licensePlates": "White standard Euro plates with blue EU strip on left ('A') and the coat of arms of the federal state placed between the district letters and numbers; red border around the plate.",
            "utilityPoles": "Underground utilities; dark wooden poles in remote alpine farms.",
            "roadMarkings": "Continuous or dashed white centerlines; solid white edge lines; blue-background highway exit signs.",
            "delineators": "Iconic Leitpflöcke: hollow white plastic posts with rounded triangular cross-sections, a black top band, and red reflector on right (white on left).",
            "cameraGen": "Dense Gen 3 and Gen 4 coverage across all nine federal states."
        },
        "aiSummary": {
            "geo": "Alpine Central European nation; seat of the Habsburg Empire; borders finalized in 1919 and 1955.",
            "flag": "Rot-Weiß-Rot: red-white-red triband originating from Duke Leopold V at the Siege of Acre in 1191.",
            "freedom": "1955 Austrian State Treaty ended Allied occupation; perpetual neutrality enacted Oct 26, 1955.",
            "challenge": "Alpine rail transit expansion, green energy grid modernization, and international diplomacy."
        },
        "faqs": [
            {
                "question": "What happened on October 26, 1955 in Austria?",
                "answer": "On October 26, 1955, the Austrian Parliament passed the constitutional law declaring Austria's perpetual neutrality, celebrated annually as the Austrian National Day."
            },
            {
                "question": "Why does the Austrian flag date back to the 12th century?",
                "answer": "Legend states that during the 1191 Siege of Acre, Duke Leopold V's white tunic was covered in blood except for the band beneath his sword belt, creating the red-white-red pattern."
            }
        ],
        "timeline": [
            {"year": "996 CE", "event": "First written recording of the name Ostarrîchi (Austria)."},
            {"year": "1278", "event": "Rudolf I of Habsburg defeats Ottokar II, establishing Habsburg rule in Austria."},
            {"year": "1867", "event": "The Austro-Hungarian Compromise (Ausgleich) establishes the Dual Monarchy."},
            {"year": "1918", "event": "Dissolution of the Austro-Hungarian Empire and proclamation of the First Republic."},
            {"year": "1955", "event": "Signing of the Austrian State Treaty restores full sovereign independence."},
            {"year": "1995", "event": "Austria officially joins the European Union."}
        ]
    },
    "be": {
        "code": "BE",
        "name": "Belgium",
        "capital": "Brussels",
        "continent": "Europe",
        "population": "11.7 Million",
        "currency": "Euro (EUR)",
        "languages": ["Dutch (Flemish)", "French", "German"],
        "seoTitle": "History of Belgium: Heart of Europe, Black-Yellow-Red Tricolor, and 1830 Independence",
        "metaDescription": "Discover the detailed history of Belgium. Explore the 1830 Belgian Revolution, Brabant flag colors, the 1831 Constitution, and Brussels as EU capital.",
        "mapFormation": "Covering 30,688 square kilometers in Western Europe, the Kingdom of Belgium (<em>België / Belgique / Belgien</em>) is bounded by the North Sea, France, the Netherlands, Germany, and Luxembourg. The country is geographically divided into three regions: flat coastal Flanders in the north, the rolling plateau of Wallonia in the south, and the bilingual capital region of <strong>Brussels</strong>.<br><br>In antiquity, Julius Caesar noted the bravery of the Celtic Belgae tribes (<em>'Horum omnium fortissimi sunt Belgae'</em>). During the Middle Ages, Flemish textile cities (Bruges, Ghent, Ypres) and the Duchy of Brabant became the richest trading hubs in Europe. After successive periods under Burgundian, Spanish Habsburg, Austrian, French, and Dutch rule, Belgium achieved sovereign statehood through the <strong>Belgian Revolution of August 1830</strong>.<br><br>The <strong>Treaty of London (1839)</strong> internationally recognized Belgian independence and guaranteed its perpetual neutrality.",
        "flagHistory": "The national flag of Belgium—the <em>Driekleur</em>—features three equal vertical bands of black, yellow, and red, officially codified in <strong>Article 193 of the Belgian Constitution</strong> in 1831.<br><br>The colors were derived directly from the historic <strong>Coat of Arms of the Duchy of Brabant</strong>: a golden-yellow lion (<em>Lion of Brabant</em>) with red tongue and claws on a black shield, carried during the Brabant Revolution of 1789 against Austrian rule. Unique in world vexillology, the flag is defined with an unusual ratio of <strong>13:15</strong>.",
        "freedomStory": "Belgium's sovereign independence was sparked on the night of <strong>August 25, 1830</strong>, at the Théâtre Royal de la Monnaie in Brussels during a performance of Daniel Auber's romantic opera <em>La Muette de Portici</em>.<br><br>The patriotic duet <em>'Amour sacré de la patrie'</em> ignited popular uprisings against Dutch administration under King William I. A provisional government convened the National Congress, promulgating the progressive <strong>Belgian Constitution of 1831</strong>, which established a parliamentary constitutional monarchy with comprehensive guarantees of freedom of the press, assembly, and religion. On <strong>July 21, 1831</strong>, Prince Leopold of Saxe-Coburg and Gotha took the constitutional oath as the first King of the Belgians (celebrated annually as Belgian National Day).",
        "challenges": "As the de facto capital of the European Union and headquarters of NATO, Belgium is a diplomatic and logistical crossroads. Domestically, the nation manages its complex federal governance structure across Flemish, Walloon, and Brussels-Capital regions, expanding offshore wind power in the North Sea and modernizing nuclear power extensions.",
        "images": {
            "landscape": {
                "url": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
                "alt": "Ardennes forest and Meuse River valley in Belgium",
                "caption": "The rolling forested hills and limestone river valleys of the Ardennes region in Wallonia, southern Belgium."
            },
            "landmark": {
                "url": "https://images.unsplash.com/photo-1512813195386-6cf811ad3542?q=80&w=1200&auto=format&fit=crop",
                "alt": "Grand Place and Town Hall in Brussels, Belgium",
                "caption": "The Grand-Place (Grote Markt) in Brussels, a UNESCO World Heritage square surrounded by opulent 17th-century guildhalls and the Gothic Town Hall."
            },
            "streetview": {
                "url": "https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=1200&auto=format&fit=crop",
                "alt": "Belgian highway with red font license plates and lighted motorways",
                "caption": "Belgian street view indicators: white license plates with ruby-red characters and borders, bilingual Flemish/French signage, and illuminated motorways."
            }
        },
        "streetViewMeta": {
            "drivingSide": "Right",
            "licensePlates": "White rectangular plates with distinct ruby-red characters and border (unique in Europe alongside a blue 'B' EU strip on the left); format 1-ABC-123.",
            "utilityPoles": "Reinforced concrete poles with curved metal lamp arms; famous fully illuminated motorway highway network at night.",
            "roadMarkings": "Continuous or dashed white centerlines; solid white edge lines; yellow parking curb markings.",
            "delineators": "White posts with red reflectors on right and white on left.",
            "cameraGen": "Dense Gen 3 and Gen 4 coverage across Flanders, Wallonia, and Brussels."
        },
        "aiSummary": {
            "geo": "Crossroads of Western Europe; home to the European Union and NATO headquarters.",
            "flag": "Black, yellow, and red vertical tricolor derived from the 1789 Duchy of Brabant lion banner.",
            "freedom": "1830 Belgian Revolution sparked at the opera; King Leopold I took oath July 21, 1831.",
            "challenge": "Federal language community cohesion, North Sea green energy, and EU diplomatic logistics."
        },
        "faqs": [
            {
                "question": "Why is July 21 celebrated as Belgian National Day?",
                "answer": "July 21 commemorates July 21, 1831, when Prince Leopold of Saxe-Coburg and Gotha took the constitutional oath as Leopold I, the first King of the Belgians."
            },
            {
                "question": "What is unique about Belgian license plates in Street View?",
                "answer": "Belgian license plates feature distinct ruby-red lettering and a red border on a white background, combined with a blue EU strip on the left."
            }
        ],
        "timeline": [
            {"year": "1830", "event": "The Belgian Revolution breaks out on August 25 following an opera performance in Brussels."},
            {"year": "1831", "event": "King Leopold I takes the constitutional oath on July 21; promulgation of the 1831 Constitution."},
            {"year": "1839", "event": "The Treaty of London recognizes Belgian sovereign independence and guarantees neutrality."},
            {"year": "1957", "event": "Belgium co-founds the European Economic Community as an original signatory of the Treaty of Rome."},
            {"year": "1967", "event": "NATO officially establishes its political and military headquarters in Brussels."}
        ]
    },
    "ua": {
        "code": "UA",
        "name": "Ukraine",
        "capital": "Kyiv",
        "continent": "Europe",
        "population": "38.0 Million",
        "currency": "Ukrainian Hryvnia (UAH)",
        "languages": ["Ukrainian"],
        "seoTitle": "History of Ukraine: Breadbasket of Europe, Blue & Yellow Flag, and 1991 Independence",
        "metaDescription": "Explore the detailed history of Ukraine. Discover Kievan Rus, the Cossack Hetmanate, the 1991 Independence referendum, and the blue-and-yellow flag.",
        "mapFormation": "Spanning 603,628 square kilometers across Eastern Europe from the Carpathian Mountains to the Black Sea and Sea of Azov, Ukraine (<em>Ukrayina</em>) is the second-largest country by land area located entirely within Europe, drained by the mighty Dnieper (Dnipro) River.<br><br>The historic state originated in the 9th century with <strong>Kievan Rus</strong> centered on Kyiv, which adopted Christianity in 988 CE under Prince Volodymyr the Great. In the 16th and 17th centuries, the <strong>Zaporozhian Cossacks</strong> established the democratic <strong>Cossack Hetmanate</strong> under Hetman Bohdan Khmelnytsky, defending self-governing frontiers.<br><br>Following the collapse of the Soviet Union, 92.3% of Ukrainian citizens voted overwhelmingly for sovereign independence in the historic nationwide referendum of <strong>December 1, 1991</strong>, codifying Ukraine's modern sovereign frontiers.",
        "flagHistory": "The national flag of Ukraine—the <em>Syno-Zhovtyi Prapor</em>—is an elegant horizontal bicolor of azure blue (top) and golden yellow (bottom), officially restored by the Verkhovna Rada on <strong>January 28, 1992</strong>.<br><br>The design was first hoisted during the 1848 Spring of Nations in Lviv. In poetic and national interpretation, <strong>Azure Blue</strong> represents the vast peaceful open skies, rivers, and mountains of Ukraine, while <strong>Golden Yellow</strong> represents the boundless golden wheat fields that make Ukraine the historic 'Breadbasket of Europe'. At the center of the national coat of arms sits the <strong>Tryzub</strong> (Trident), the ancient princely crest of Volodymyr the Great from the 10th century.",
        "freedomStory": "Ukraine's path to modern sovereignty was forged through decades of cultural preservation and democratic revolutions.<br><br>Following the tragic artificial famine of the <strong>Holodomor (1932–1933)</strong> under totalitarian rule, Ukraine declared state sovereignty on July 16, 1990. On <strong>August 24, 1991</strong>, the Parliament passed the <strong>Act of Declaration of Independence of Ukraine</strong> (celebrated as Independence Day).<br><br>In the 21st century, Ukrainian citizens defended democratic self-determination in the 2004 Orange Revolution and the 2014 <strong>Revolution of Dignity (Euromaidan)</strong> on Kyiv's Independence Square (Maidan Nezalezhnosti), choosing a European democratic future.",
        "challenges": "Ukraine defends its sovereign territorial integrity and democratic freedom, supported by international democratic allies. Priorities include wartime defense resilience, rapid post-war reconstruction, rebuilding electrical infrastructure, and integrating into the European Union and NATO.",
        "images": {
            "landscape": {
                "url": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
                "alt": "Carpathian mountain pastures and forests in western Ukraine",
                "caption": "The forested peaks and emerald alpine pastures of the Ukrainian Carpathians in Ivano-Frankivsk Oblast, western Ukraine."
            },
            "landmark": {
                "url": "https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?q=80&w=1200&auto=format&fit=crop",
                "alt": "Saint Sophia Cathedral in Kyiv, Ukraine",
                "caption": "Saint Sophia's Cathedral in Kyiv, commissioned in 1037 by Prince Yaroslav the Wise, a UNESCO World Heritage architectural treasure."
            },
            "streetview": {
                "url": "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=1200&auto=format&fit=crop",
                "alt": "Ukrainian road with Cyrillic signs and red/white delineators",
                "caption": "Ukrainian street view indicators: Cyrillic highway signage with distinctive Ukrainian letters (і, ї, є, ґ), white license plates with yellow/blue flag, and wide plains."
            }
        },
        "streetViewMeta": {
            "drivingSide": "Right",
            "licensePlates": "White rectangular plates with blue-and-yellow national flag on left ('UA'); two letters denote region, four digits, and two suffix letters.",
            "utilityPoles": "Reinforced concrete poles with square or round profiles, often painted with whitewash on the bottom 1.5 meters.",
            "roadMarkings": "Continuous or dashed white centerlines; blue-and-green highway directional signs with Cyrillic and Latin transliteration.",
            "delineators": "White posts with red reflectors on right and white on left.",
            "cameraGen": "Coverage in major cities including Kyiv, Lviv, Odesa, and Kharkiv prior to 2022."
        },
        "aiSummary": {
            "geo": "Second-largest European country by land area; breadbasket of Europe; capital in ancient Kyiv.",
            "flag": "Blue and yellow horizontal bicolor representing blue skies over golden wheat fields.",
            "freedom": "1991 Independence Declaration and nationwide referendum; 2014 Revolution of Dignity.",
            "challenge": "Territorial defense, energy infrastructure rebuilding, and European Union accession."
        },
        "faqs": [
            {
                "question": "What is the Tryzub on Ukraine's coat of arms?",
                "answer": "The Tryzub (Trident) is the ancient coat of arms of Ukraine, originating as the 10th-century seal of Grand Prince Volodymyr the Great of Kievan Rus."
            },
            {
                "question": "When did Ukraine declare independence?",
                "answer": "Ukraine declared independence from the Soviet Union on August 24, 1991, ratified by 92.3% of voters in a nationwide referendum on December 1, 1991."
            }
        ],
        "timeline": [
            {"year": "988 CE", "event": "Prince Volodymyr the Great Christianizes Kievan Rus, establishing European integration."},
            {"year": "1648", "event": "Bohdan Khmelnytsky leads the Cossack uprising, founding the Cossack Hetmanate."},
            {"year": "1918", "event": "The Ukrainian People's Republic declares independence following WWI."},
            {"year": "1991", "event": "Ukraine declares independence on August 24, confirmed by 92% of voters in referendum."},
            {"year": "2014", "event": "The Revolution of Dignity (Euromaidan) in Kyiv reaffirms European democratic trajectory."}
        ]
    },
    "ke": {
        "code": "KE",
        "name": "Kenya",
        "capital": "Nairobi",
        "continent": "Africa",
        "population": "55.1 Million",
        "currency": "Kenyan Shilling (KES)",
        "languages": ["Swahili (Kiswahili)", "English"],
        "seoTitle": "History of Kenya: Cradle of Humankind, Maasai Shield Flag, and 1963 Independence",
        "metaDescription": "Discover the detailed history of Kenya. Explore the Great Rift Valley, Jomo Kenyatta, the Maasai shield flag, wildlife conservation, and left-hand driving.",
        "mapFormation": "Straddling the equator in East Africa across 580,367 square kilometers from Lake Victoria to the Indian Ocean, the Republic of Kenya is bisected by the dramatic <strong>Great Rift Valley</strong>, home to Mount Kenya (5,199 meters) and the world-famous wildlife savannas of the <strong>Maasai Mara and Amboseli</strong>.<br><br>Kenya is recognized as the <strong>'Cradle of Humankind'</strong>, where paleontologists Louis and Mary Leakey discovered early hominid fossils in the Turkana Basin dating back millions of years. Along the coast, Swahili maritime trading city-states (Mombasa, Lamu, Malindi) flourished from the 8th century, trading spices, silk, and porcelain across the Indian Ocean.<br><br>In 1895, the British Empire established the East Africa Protectorate, constructing the Uganda Railway ('Lunatic Express') from Mombasa to Lake Victoria, founding the capital city of <strong>Nairobi in 1899</strong> as a rail depot. Kenya achieved sovereign independence on <strong>December 12, 1963</strong>.",
        "flagHistory": "The national flag of Kenya—the <em>Bendera ya Kenya</em>—is a magnificent heraldic banner featuring three equal horizontal bands of black, red, and green, separated by two thin white fimbriations, with a traditional <strong>Maasai Warrior Shield and Two Crossed Spears</strong> at the center, officially hoisted at independence on <strong>December 12, 1963</strong>.<br><br>The design was based on the banner of the Kenya African National Union (KANU). In profound patriotic symbolism: <strong>Black</strong> represents the indigenous African people; <strong>Red</strong> honors the blood shed in the fight for freedom; <strong>Green</strong> represents Kenya's rich fertile land and agriculture; and <strong>White</strong> symbolizes peace, unity, and honesty. The central <strong>Maasai Shield and Spears</strong> represent the readiness of the Kenyan people to defend their sovereign liberty.",
        "freedomStory": "Kenya's struggle for independence was spearheaded by the anti-colonial <strong>Mau Mau Uprising (1952–1960)</strong>, led by the Kenya Land and Freedom Army.<br><br>Imprisoned nationalist leader <strong>Jomo Kenyatta</strong> became the political symbol of the liberation movement. Released in 1961, Kenyatta led constitutional negotiations in London. On <strong>December 12, 1963</strong>, Kenya attained sovereign independence, becoming a Republic exactly one year later with Kenyatta as founding President (celebrated annually as Jamhuri Day).<br><br>In August 2010, the Kenyan people ratified the landmark <strong>2010 Constitution of Kenya</strong>, establishing a decentralized devolved system with 47 county governments, judicial independence, and a progressive Bill of Rights. Kenya pioneered mobile money (M-Pesa) and established Nairobi as the 'Silicon Savannah' tech capital of Africa.",
        "challenges": "As the economic and logistical hub of East Africa generating over 90% of its electricity from renewable geothermal, hydro, and wind energy, Kenya balances industrial modernization with climate resilience. Foremost priorities include managing drought cycles in arid northern counties, expanding the Standard Gauge Railway (SGR), and youth tech employment.",
        "images": {
            "landscape": {
                "url": "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=1200&auto=format&fit=crop",
                "alt": "Maasai Mara wildlife savanna and acacia trees, Kenya",
                "caption": "The sweeping golden grasslands and flat-topped acacia trees of the Maasai Mara National Reserve in southwestern Kenya."
            },
            "landmark": {
                "url": "https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?q=80&w=1200&auto=format&fit=crop",
                "alt": "Kenyatta International Convention Centre (KICC) in Nairobi, Kenya",
                "caption": "The Kenyatta International Convention Centre (KICC) dominating the skyline of downtown Nairobi, the 'Silicon Savannah' of East Africa."
            },
            "streetview": {
                "url": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop",
                "alt": "Kenyan highway with yellow rear license plates and left-hand driving",
                "caption": "Kenyan street view clues: driving on the left, yellow rear plates (white front plates), Google camera snorkel meta, and red earth roadside banks."
            }
        },
        "streetViewMeta": {
            "drivingSide": "Left",
            "licensePlates": "White rectangular plates at the front, bright yellow reflective plates at the rear (similar to the UK format, formatted as KAA 123A).",
            "utilityPoles": "Wooden poles with metal crossbars; distinctive black camera snorkel pole visible on the front corner of the Google camera vehicle in Kenya.",
            "roadMarkings": "Continuous or dashed white centerlines; solid yellow lines on highway shoulders; yellow-and-black striped kerbstones in urban Nairobi.",
            "delineators": "White posts with red reflectors on left and white on right.",
            "cameraGen": "Extensive Gen 3 and Gen 4 coverage across Nairobi, Mombasa, Kisumu, Nakuru, and national parks."
        },
        "aiSummary": {
            "geo": "East African equatorial nation; Great Rift Valley and Mount Kenya; capital in Nairobi founded in 1899.",
            "flag": "Black, red, and green horizontal triband with white stripes and a central Maasai warrior shield and spears.",
            "freedom": "1952 Mau Mau rebellion; independence on Dec 12, 1963 led by Jomo Kenyatta; 2010 devolved Constitution.",
            "challenge": "Drought resilience in northern rangelands, Silicon Savannah tech scaling, and geothermal expansion."
        },
        "faqs": [
            {
                "question": "What is unique about the Google Street View car in Kenya?",
                "answer": "In Kenya, the Google Street View car has a visible black air snorkel mounted on the right front corner of the vehicle hood."
            },
            {
                "question": "When is Kenya's Independence Day (Jamhuri Day)?",
                "answer": "Jamhuri Day is celebrated on December 12, marking both the attainment of independence in 1963 and the establishment of the Republic in 1964."
            }
        ],
        "timeline": [
            {"year": "1895", "event": "The British Empire establishes the East Africa Protectorate."},
            {"year": "1899", "event": "Nairobi is founded as a rail depot during construction of the Uganda Railway."},
            {"year": "1952", "event": "The Mau Mau Uprising breaks out against colonial land policies."},
            {"year": "1963", "event": "Kenya attains sovereign independence on December 12 with Jomo Kenyatta as Prime Minister."},
            {"year": "2007", "event": "Safaricom launches M-Pesa in Kenya, revolutionizing global mobile financial services."},
            {"year": "2010", "event": "Promulgation of the democratic 2010 Constitution of Kenya creating 47 devolved counties."}
        ]
    }
}

for code, data in batch2_part5.items():
    file_path = os.path.join(output_dir, f"{code}.json")
    with open(file_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print(f"Updated {code.upper()} chronicle successfully.")
