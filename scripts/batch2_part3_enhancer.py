import json
import os

output_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "../src/data/chronicles"))
os.makedirs(output_dir, exist_ok=True)

batch2_part3 = {
    "ch": {
        "code": "CH",
        "name": "Switzerland",
        "capital": "Bern",
        "continent": "Europe",
        "population": "8.9 Million",
        "currency": "Swiss Franc (CHF)",
        "languages": ["German", "French", "Italian", "Romansh"],
        "seoTitle": "History of Switzerland: Alpine Confederation, Square White Cross Flag, and Direct Democracy",
        "metaDescription": "Explore the detailed history of Switzerland. Discover the 1291 Federal Charter of the Rütli, permanent neutrality, the square flag, and direct democracy.",
        "mapFormation": "Occupying 41,285 square kilometers in the alpine heart of Central Europe, the Swiss Confederation (<em>Confoederatio Helvetica</em> - CH) is characterized by the formidable glaciated barrier of the <strong>Alps</strong> (covering 60% of territory), the Jura Mountains, and the fertile Swiss Plateau where major cities are concentrated.<br><br>The confederation was born in early <strong>August 1291</strong> on the meadow of Rütli above Lake Lucerne, when the three founding forest cantons—<strong>Uri, Schwyz, and Unterwalden</strong>—signed the <strong>Federal Charter of 1291</strong> (<em>Bundesbrief</em>), pledging mutual defense against the Habsburg dynasty. Over the centuries, additional cantons joined the Old Swiss Confederacy, expanding to 13 cantons by 1513.<br><br>Swiss sovereign independence from the Holy Roman Empire was formally recognized in the <strong>Peace of Westphalia (1648)</strong>. Following the Napoleonic era, the <strong>Congress of Vienna (1815)</strong> permanently established Switzerland's modern borders and internationally guaranteed its <strong>perpetual armed neutrality</strong>, finalizing the 26 sovereign cantons.",
        "flagHistory": "The national flag of Switzerland—the <em>Schweizerfahne</em>—is one of only two square sovereign national flags in the world (alongside Vatican City), featuring an equilateral bold white Greek cross at the center of a vivid crimson-red square field.<br><br>The design originates from the white cross emblem worn by confederate soldiers of the canton of Bern at the Battle of Laupen in 1339. The design was formally adopted by the Federal Diet in 1815 and codified in the Swiss Constitution. In 1863, Swiss humanitarian Henry Dunant founded the International Committee of the <strong>Red Cross</strong> in Geneva, deliberately adopting the inverse of the Swiss flag (a red cross on white) to honor Switzerland's permanent humanitarian neutrality.",
        "freedomStory": "Switzerland's political system is celebrated as the world's foremost model of <strong>direct democracy, federalism, and subsidiarity</strong>.<br><br>Following the brief Sonderbund War of 1847, Switzerland promulgated the <strong>Federal Constitution of 1848</strong>, transforming the loose confederation into a cohesive federal state with a unique collective executive: the 7-member <strong>Federal Council</strong> (<em>Bundesrat</em>).<br><br>Under the Swiss system of direct democracy, citizens possess the constitutional power to launch an <strong>Optional Referendum</strong> to challenge any federal law passed by parliament (requiring 50,000 signatures) or a <strong>Popular Initiative</strong> to propose an amendment to the Federal Constitution (requiring 100,000 signatures). Major national decisions are voted on by citizens across four nationwide referendum ballots every year.",
        "challenges": "As a premier global financial center, pharmaceutical innovation hub (Roche, Novartis), and host to international organizations (UN, WHO, CERN), Switzerland balances economic openness with alpine environmental preservation. Foremost priorities include mitigating rapid alpine glacier melting through climate adaptation, negotiating bilateral institutional agreements with the European Union, and safeguarding energy self-sufficiency via alpine hydropower and pumped storage.",
        "images": {
            "landscape": {
                "url": "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=1200&auto=format&fit=crop",
                "alt": "Matterhorn peak in the Swiss Alps near Zermatt",
                "caption": "The iconic pyramid peak of the Matterhorn (4,478 meters) towering over the Swiss Alps near Zermatt."
            },
            "landmark": {
                "url": "https://images.unsplash.com/photo-1512813195386-6cf811ad3542?q=80&w=1200&auto=format&fit=crop",
                "alt": "Federal Palace (Bundeshaus) in Bern, Switzerland",
                "caption": "The Federal Palace (Bundeshaus) in Bern, the seat of the Swiss Federal Assembly and the Federal Council."
            },
            "streetview": {
                "url": "https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=1200&auto=format&fit=crop",
                "alt": "Swiss road with small front license plates and canton crests",
                "caption": "Swiss street view tells: compact front plates with no blue strip, rear plates with Swiss cross and canton crests, and yellow hiking trail signposts."
            }
        },
        "streetViewMeta": {
            "drivingSide": "Right",
            "licensePlates": "Very short, compact front plates (no blue EU strip); rear plates feature the Swiss cross on the left and the canton coat of arms on the right with a 2-letter canton code (e.g., ZH, BE, GE).",
            "utilityPoles": "Underground utilities in towns; dark wooden poles in remote alpine pastures; distinctive yellow metal directional hiking signposts (Wanderweg).",
            "roadMarkings": "Continuous or dashed white centerlines; solid yellow road markings exclusively indicate pedestrian crossings (Zebrastreifen) and bus stops.",
            "delineators": "White posts with red rectangular reflectors on the right and two round white reflectors on the left.",
            "cameraGen": "Dense Gen 3 and Gen 4 coverage across all 26 cantons, including mountain passes and train trekker routes."
        },
        "aiSummary": {
            "geo": "Alpine nation in Central Europe; confederation founded in 1291; borders finalized in 1815.",
            "flag": "Schweizerfahne: one of two square national flags in the world; bold white cross on crimson red.",
            "freedom": "1848 Federal Constitution; direct democracy with citizen referendums and 7-member Federal Council.",
            "challenge": "Alpine glacier loss mitigation, bilateral EU trade relations, and financial confidentiality reforms."
        },
        "faqs": [
            {
                "question": "Why is Switzerland's flag square?",
                "answer": "Switzerland's flag is square because it evolved from medieval military battle standards used by the cantons, which were traditionally 1:1 square proportions."
            },
            {
                "question": "What is Swiss direct democracy?",
                "answer": "Swiss direct democracy allows citizens to directly propose constitutional amendments (initiatives) or challenge parliamentary laws (referendums) through regular nationwide public votes."
            }
        ],
        "timeline": [
            {"year": "1291", "event": "The forest cantons of Uri, Schwyz, and Unterwalden sign the Federal Charter on the Rütli meadow."},
            {"year": "1515", "event": "Following the Battle of Marignano, Switzerland adopts a stance of military neutrality."},
            {"year": "1648", "event": "The Peace of Westphalia formally recognizes Swiss independence from the Holy Roman Empire."},
            {"year": "1815", "event": "The Congress of Vienna guarantees Switzerland's perpetual international armed neutrality."},
            {"year": "1848", "event": "Promulgation of the Federal Constitution transforms Switzerland into a modern federal state."},
            {"year": "1863", "event": "Henry Dunant founds the International Red Cross in Geneva, adopting the inverted Swiss flag."}
        ]
    },
    "ie": {
        "code": "IE",
        "name": "Ireland",
        "capital": "Dublin",
        "continent": "Europe",
        "population": "5.2 Million",
        "currency": "Euro (EUR)",
        "languages": ["Irish (Gaeilge)", "English"],
        "seoTitle": "History of Ireland: The Emerald Isle, Green-White-Orange Tricolor, and 1916 Easter Rising",
        "metaDescription": "Discover the detailed history of Ireland. Explore Celtic heritage, the 1916 Easter Rising, Michael Collins, the 1921 Anglo-Irish Treaty, and the Tricolor flag.",
        "mapFormation": "Occupying roughly five-sixths of the island of Ireland in the North Atlantic across 70,273 square kilometers, the Republic of Ireland (<em>Éire</em>) is celebrated as the 'Emerald Isle' due to its lush rolling green pastures nourished by mild Atlantic Gulf Stream rains.<br><br>Gaelic Celtic culture, law (Brehon Law), and Ogham script flourished for over a millennium prior to the arrival of Saint Patrick in the 5th century CE, who established Christian monastic centers that preserved classical European literature through the Dark Ages ('Isle of Saints and Scholars').<br><br>Following the Anglo-Norman invasion of 1169 and centuries of English and British rule, the partition of the island was codified under the <strong>Government of Ireland Act 1920</strong> and the <strong>Anglo-Irish Treaty of 1921</strong>, creating the self-governing Irish Free State (26 southern counties) while Northern Ireland (6 counties) remained in the UK. Full sovereign republican status was formally enacted with the <strong>Republic of Ireland Act 1948</strong>.",
        "flagHistory": "The national flag of Ireland—the <em>Bratach na hÉireann</em> (The Irish Tricolor)—features three equal vertical bands of green, white, and orange, first flown on <strong>March 7, 1848</strong>, by revolutionary nationalist Thomas Francis Meagher in Waterford.<br><br>The tricolor is a sublime vexillological symbol of peace and reconciliation between traditions: <strong>Green</strong> represents the Roman Catholic and Gaelic majority; <strong>Orange</strong> represents the Protestant minority (honoring King William III of Orange); and the central <strong>White</strong> band symbolizes a lasting truce and fraternal unity between the two traditions.",
        "freedomStory": "Ireland's struggle for independence culminated in the heroic events of the early 20th century.<br><br>On Easter Monday, <strong>April 24, 1916</strong>, Patrick Pearse, James Connolly, and the Irish Volunteers seized the General Post Office (GPO) in Dublin, reading the <strong>Proclamation of the Irish Republic</strong> (the Easter Rising). Although military victory was suppressed, the execution of the leaders ignited mass national support.<br><br>In the 1918 election, Sinn Féin MPs convened the first revolutionary parliament (<strong>Dáil Éireann</strong>) at the Mansion House in Dublin on January 21, 1919. Following the Irish War of Independence led by <strong>Michael Collins</strong>, the 1921 Anglo-Irish Treaty established the Irish Free State. In 1937, the people ratified <strong>Bunreacht na hÉireann</strong> (the Constitution of Ireland). Today, Ireland is a prosperous European tech and pharmaceutical hub (the 'Celtic Tiger').",
        "challenges": "As a member of the European Union, Ireland navigates post-Brexit arrangements preserving the 1998 Good Friday Peace Agreement and an open, frictionless border with Northern Ireland. Domestically, major priorities include resolving urban housing supply shortages across Dublin and Cork, expanding offshore Atlantic wind energy, and preserving the Irish language (Gaeilge).",
        "images": {
            "landscape": {
                "url": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
                "alt": "Cliffs of Moher along the Atlantic coast, Ireland",
                "caption": "The dramatic Cliffs of Moher soaring 214 meters above the Atlantic Ocean in County Clare, Ireland."
            },
            "landmark": {
                "url": "https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?q=80&w=1200&auto=format&fit=crop",
                "alt": "General Post Office (GPO) on O'Connell Street in Dublin, Ireland",
                "caption": "The General Post Office (GPO) in Dublin, the headquarters of the 1916 Easter Rising and monumental cradle of modern Irish independence."
            },
            "streetview": {
                "url": "https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?q=80&w=1200&auto=format&fit=crop",
                "alt": "Irish road with left-hand driving and bilingual signs",
                "caption": "Irish street view tells: driving on the left, white front and rear plates with county names in Irish, yellow dashed shoulder lines, and bilingual signs."
            }
        },
        "streetViewMeta": {
            "drivingSide": "Left",
            "licensePlates": "White rectangular plates at front and rear with blue EU strip on left ('IRL'); format includes year (e.g., 231 for 2023 first half), county code, and county name in Irish in italic script across the top.",
            "utilityPoles": "Wooden utility poles with round metal cross-arms; distinctive yellow diamond warning signs with metric speed limits.",
            "roadMarkings": "Dashed white centerlines; continuous dashed yellow shoulder lines (unique in Europe alongside left-hand driving); bilingual English/Irish italic road signage.",
            "delineators": "White posts with red reflectors on left and white on right.",
            "cameraGen": "Dense Gen 3 and Gen 4 coverage across all 26 counties."
        },
        "aiSummary": {
            "geo": "Atlantic island nation of 26 counties; borders defined by the 1921 Anglo-Irish Treaty.",
            "flag": "Green, white, and orange tricolor created in 1848, symbolizing peace between Catholic and Protestant traditions.",
            "freedom": "1916 Easter Rising and 1919-1921 War of Independence led by Michael Collins; 1937 Constitution.",
            "challenge": "Urban housing supply, post-Brexit Good Friday Agreement stability, and offshore wind power scaling."
        },
        "faqs": [
            {
                "question": "What is the meaning of the colors on the Irish flag?",
                "answer": "Green represents the Catholic and Gaelic tradition, Orange represents the Protestant tradition (King William of Orange), and White represents lasting peace between them."
            },
            {
                "question": "How do you distinguish Ireland from the UK in Google Street View?",
                "answer": "In Ireland, both front and rear plates are white (in the UK, rear plates are yellow), speed limits are in km/h on yellow diamond signs, road edges have dashed yellow lines, and all directional signs are bilingual in Irish (Gaeilge) and English."
            }
        ],
        "timeline": [
            {"year": "432 CE", "event": "Saint Patrick arrives in Ireland, spreading Christianity and monastic learning."},
            {"year": "1169", "event": "The Anglo-Norman invasion initiates centuries of English administration."},
            {"year": "1845–1852", "event": "The Great Famine (An Gorta Mór) devastates the population, prompting mass global emigration."},
            {"year": "1916", "event": "The Easter Rising in Dublin proclaims the Irish Republic on April 24."},
            {"year": "1921", "event": "The Anglo-Irish Treaty establishes the self-governing Irish Free State."},
            {"year": "1998", "event": "The Good Friday Agreement establishes a historic peace settlement for Northern Ireland."}
        ]
    },
    "eg": {
        "code": "EG",
        "name": "Egypt",
        "capital": "Cairo",
        "continent": "Africa",
        "population": "112.7 Million",
        "currency": "Egyptian Pound (EGP)",
        "languages": ["Arabic"],
        "seoTitle": "History of Egypt: Gift of the Nile, Eagle of Saladin Flag, and 1952 Republic",
        "metaDescription": "Explore the detailed history of Egypt. Discover the Pharaohs and Pyramids, Alexandria, the 1952 Free Officers Revolution, the Suez Canal, and the Saladin Eagle flag.",
        "mapFormation": "Spanning 1.01 million square kilometers at the transcontinental crossroads of Northeast Africa and Southwest Asia (the Sinai Peninsula), the Arab Republic of Egypt (<em>Miṣr</em>) controls the vital <strong>Suez Canal</strong>, which links the Mediterranean Sea directly to the Red Sea and Indian Ocean.<br><br>As the Greek historian Herodotus famously observed: <em>'Egypt is the gift of the Nile.'</em> Over 95% of the population resides within the fertile strip and delta of the Nile River, surrounded by the Sahara and Eastern Deserts.<br><br>Egypt is home to one of humanity's earliest monumental civilizations, unified around <strong>3100 BCE</strong> under King Menes (Narmer), which constructed the Great Pyramids of Giza, the Sphinx, and the temples of Luxor and Karnak. Following Hellenistic rule under the Ptolemaic Dynasty founded by Alexander the Great and integration into the Roman, Byzantine, and Islamic Caliphates, Egypt was modernized under <strong>Muhammad Ali Pasha</strong> in the 19th century, with sovereign borders recognized upon independence from Great Britain in 1922 and the 1979 Egypt-Israel Peace Treaty returning the Sinai Peninsula.",
        "flagHistory": "The national flag of Egypt—the <strong>Arab Liberation Flag</strong>—is a horizontal tricolor of Red, White, and Black, bearing at the center the golden <strong>Eagle of Saladin</strong>, officially adopted on <strong>October 4, 1984</strong>.<br><br>The design was created during the Egyptian Revolution of 1952. In revolutionary symbolism: <strong>Red</strong> symbolizes the sacrifices and blood shed by Egyptian patriots in the struggle for independence; <strong>White</strong> represents the purity of the nation's conscience and a bright future; and <strong>Black</strong> represents the dark era of colonial oppression and foreign occupation that was overcome.<br><br>At the center sits the national coat of arms: a golden eagle looking to the right, bearing on its breast a shield with the vertical colors of the flag, and clutching in its talons a scroll inscribed in Arabic: <em>'Jumhūriyyat Miṣr al-ʿArabiyyah'</em> ('Arab Republic of Egypt'). The eagle commemorates Sultan Saladin (Salah ad-Din), who defended Egypt and founded the Ayyubid dynasty in the 12th century.",
        "freedomStory": "Egypt's modern sovereignty was established through the decisive <strong>Egyptian Revolution of 1952</strong>.<br><br>On <strong>July 23, 1952</strong>, the Free Officers Movement led by <strong>Gamal Abdel Nasser</strong> and Mohamed Naguib overthrew King Farouk I, abolishing the constitutional monarchy and proclaiming the Arab Republic of Egypt on June 18, 1953 (celebrated annually as Revolution Day).<br><br>In 1956, President Nasser famously <strong>nationalized the Suez Canal Company</strong>, asserting full sovereign Egyptian control over the international waterway and withstanding the tripartite aggression during the Suez Crisis. Egypt completed the monumental <strong>Aswan High Dam in 1970</strong>, ending destructive seasonal flooding and generating electricity for industrial modernization.",
        "challenges": "As the most populous nation in the Arab world, Egypt is executing transformative national infrastructure megaprojects. Foremost among them is constructing the <strong>New Administrative Capital (NAC)</strong> east of Cairo to alleviate metropolitan congestion, expanding renewable solar parks at Benban, and managing water security quotas along the Nile Basin in coordination with upstream African states.",
        "images": {
            "landscape": {
                "url": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
                "alt": "Nile River felucca sailing at sunset in Egypt",
                "caption": "A traditional felucca sailboat gliding along the Nile River near Aswan, the lifeblood of Egyptian civilization for over 5,000 years."
            },
            "landmark": {
                "url": "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?q=80&w=1200&auto=format&fit=crop",
                "alt": "Great Pyramids of Giza and Sphinx, Egypt",
                "caption": "The Great Pyramid of Giza (Khufu) and the Sphinx, the oldest and only surviving Wonder of the Ancient World."
            },
            "streetview": {
                "url": "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=1200&auto=format&fit=crop",
                "alt": "Egyptian desert highway with Arabic signage and blue/white plates",
                "caption": "Egyptian road view: bilingual Arabic/English blue highway markers, Cairo ring road overpasses, and desert palm landscapes."
            }
        },
        "streetViewMeta": {
            "drivingSide": "Right",
            "licensePlates": "White rectangular plates with a colored top band (blue for private vehicles, orange for taxis) containing 'Egypt' in Arabic and English, and Arabic digits and letters below.",
            "utilityPoles": "Tall concrete or metal lattice light posts along highways; wooden poles in agricultural Nile delta villages.",
            "roadMarkings": "Continuous white lane dividers; blue-and-green highway directional signs with Arabic and Latin script.",
            "delineators": "Black-and-white painted concrete curb barriers along highway dividers.",
            "cameraGen": "Comprehensive museum, pyramid, and heritage site trekker coverage alongside urban Cairo coverage."
        },
        "aiSummary": {
            "geo": "Transcontinental nation connecting Africa and Asia; controls the Suez Canal; 95% of people live along the Nile.",
            "flag": "Red, white, and black horizontal tricolor with the golden Eagle of Saladin in the center.",
            "freedom": "1952 Free Officers Revolution abolished the monarchy; 1956 nationalization of the Suez Canal.",
            "challenge": "New Administrative Capital construction, Nile water basin security, and solar energy scaling."
        },
        "faqs": [
            {
                "question": "What is the strategic importance of the Suez Canal?",
                "answer": "Opened in 1869, the Suez Canal is a 193-km artificial waterway connecting the Mediterranean to the Red Sea, enabling direct maritime trade between Europe and Asia without circumnavigating Africa."
            },
            {
                "question": "What does the Eagle of Saladin on the Egyptian flag represent?",
                "answer": "The Eagle of Saladin honors the 12th-century Sultan Saladin, symbolizing strength, courage, and Arab unity."
            }
        ],
        "timeline": [
            {"year": "3100 BCE", "event": "King Menes unifies Upper and Lower Egypt, founding the First Dynasty."},
            {"year": "2560 BCE", "event": "Construction of the Great Pyramid of Giza under Pharaoh Khufu."},
            {"year": "1869", "event": "Inauguration of the Suez Canal, transforming international maritime trade."},
            {"year": "1922", "event": "Great Britain formally recognizes Egyptian independence; King Fuad I ascends the throne."},
            {"year": "1952", "event": "The July 23 Revolution by the Free Officers abolishes the monarchy, establishing the Republic."},
            {"year": "1979", "event": "The Egypt-Israel Peace Treaty is signed, returning the Sinai Peninsula to Egypt."}
        ]
    }
}

for code, data in batch2_part3.items():
    file_path = os.path.join(output_dir, f"{code}.json")
    with open(file_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print(f"Updated {code.upper()} chronicle successfully.")
