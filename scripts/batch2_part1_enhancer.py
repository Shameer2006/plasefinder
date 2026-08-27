import json
import os

output_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "../src/data/chronicles"))
os.makedirs(output_dir, exist_ok=True)

batch2_part1 = {
    "pl": {
        "code": "PL",
        "name": "Poland",
        "capital": "Warsaw",
        "continent": "Europe",
        "population": "37.7 Million",
        "currency": "Polish Złoty (PLN)",
        "languages": ["Polish"],
        "seoTitle": "History of Poland: Crown of the Kingdom, White Eagle Flag, and Solidarity Movement",
        "metaDescription": "Explore the detailed history of Poland. Discover the Piast Dynasty, Polish-Lithuanian Commonwealth, 1791 Constitution, and the Solidarity movement.",
        "mapFormation": "Spanning 312,696 square kilometers across the North European Plain from the Baltic Sea coast to the peaks of the Carpathian and Tatra Mountains, the Republic of Poland (<em>Rzeczpospolita Polska</em>) occupies a pivotal crossroads in Central Europe.<br><br>The historic Polish state was founded in <strong>966 CE</strong> when Duke Mieszko I of the Piast Dynasty embraced Christianity (the 'Baptism of Poland'), unifying the Slavic tribes of the Vistula and Oder basins. In 1386, the Union of Krewo united Poland with the Grand Duchy of Lithuania, culminating in the <strong>Polish-Lithuanian Commonwealth (1569)</strong> via the Union of Lublin—the largest and most tolerant multicultural federation in early modern Europe, spanning from the Baltic to the Black Sea.<br><br>In the late 18th century, aggressive neighboring imperial autocracies subjected Poland to three successive Partitions (1772, 1793, 1795) by Russia, Prussia, and Austria, erasing Poland from European maps for 123 years. The sovereign Polish state was resurrected in 1918 (the Second Polish Republic) following World War I. Modern borders were established along the Oder-Neisse Line in 1945 following the Potsdam Conference.",
        "flagHistory": "The national flag of Poland—the <em>Biało-Czerwona</em> (White and Red horizontal bicolor)—is an ancient heraldic banner derived directly from the medieval <strong>Coat of Arms of Poland</strong>: the crowned White Eagle on a crimson-red shield.<br><br>The national colors were officially standardized by the Sejm on <strong>February 7, 1831</strong>, during the November Uprising against imperial Russian rule. In accordance with heraldic rules, <strong>White</strong> (derived from the White Eagle and the Grand Duchy of Lithuania's Pahonia knight) sits in the upper band representing purity, honesty, and spiritual integrity, while <strong>Red</strong> (derived from the field of the shield) occupies the lower band, symbolizing courage, valor, and the blood shed by Polish patriots defending sovereign liberty.",
        "freedomStory": "Poland's path to freedom represents an extraordinary saga of civic resilience and moral triumph against foreign partitions and totalitarian tyranny.<br><br>On <strong>May 3, 1791</strong>, the Great Sejm passed the <strong>Constitution of May 3, 1791</strong>—the first modern codified constitution in Europe and the second in world history (after the United States). Despite subsequent partition, Polish national consciousness was preserved through culture, music (Frédéric Chopin), and armed uprisings.<br><br>After surviving the catastrophic devastation of World War II and decades of Soviet domination, Polish workers at the Lenin Shipyard in Gdańsk led by <strong>Lech Wałęsa</strong> founded the <strong>Solidarity (Solidarność)</strong> trade union in August 1980. Supported morally by Polish-born Pope John Paul II, Solidarity mobilized 10 million citizens in peaceful resistance. In June 1989, Poland held semi-free parliamentary elections, triggering the historic fall of communism across Central and Eastern Europe.",
        "challenges": "As the sixth-largest economy in the European Union and NATO's eastern pillar, Poland balances rapid technological industrialization with continental security commitments. Foremost priorities include accelerating its green energy transition—constructing its first commercial nuclear power stations to phase out coal generation—modernizing high-speed rail via the Central Communication Port (CPK), and sustaining strategic logistical corridors supporting Ukraine.",
        "images": {
            "landscape": {
                "url": "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=1200&auto=format&fit=crop",
                "alt": "Tatra Mountains and alpine lake in southern Poland",
                "caption": "Morskie Oko lake in the High Tatra Mountains, southern Poland, along the alpine frontier with Slovakia."
            },
            "landmark": {
                "url": "https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?q=80&w=1200&auto=format&fit=crop",
                "alt": "Wawel Royal Castle in Krakow, Poland",
                "caption": "Wawel Royal Castle and Cathedral in Kraków, the historic coronation sanctuary and seat of Polish kings for over 500 years."
            },
            "streetview": {
                "url": "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=1200&auto=format&fit=crop",
                "alt": "Polish highway with red and white delineator posts",
                "caption": "Polish road clues: red-and-white striped delineator posts with round red reflectors, and green national highway signboards."
            }
        },
        "streetViewMeta": {
            "drivingSide": "Right",
            "licensePlates": "White standard Euro plates with blue EU strip on left ('PL'); plates feature 2-3 letters denoting the county/city (e.g., WI for Warsaw).",
            "utilityPoles": "Reinforced concrete poles with multiple small circular holes (A-frame concrete lattice) or wooden poles in rural Podlasie.",
            "roadMarkings": "White dashed centerlines; solid white edge lines; red-and-white pedestrian crossing warning posts.",
            "delineators": "Iconic Polish delineators: white posts with a bold red diagonal band and a rectangular red reflector on the right (white on left).",
            "cameraGen": "Dense Gen 3 and Gen 4 coverage across all 16 voivodeships."
        },
        "aiSummary": {
            "geo": "Central European nation on the Baltic Sea; borders re-established along the Oder-Neisse line in 1945.",
            "flag": "Biało-Czerwona: white and red horizontal bicolor derived from the medieval White Eagle crest.",
            "freedom": "Enacted the 1791 Constitution of May 3; peaceful 1989 Solidarity movement ended communism in Eastern Europe.",
            "challenge": "Nuclear clean energy transition away from coal, CPK transport mega-hub, and NATO eastern flank defense."
        },
        "faqs": [
            {
                "question": "What was the significance of the Polish Constitution of May 3, 1791?",
                "answer": "The Constitution of May 3, 1791 was the first modern written constitution in Europe and the second in the world, establishing constitutional monarchy and separation of powers."
            },
            {
                "question": "What role did the Solidarity movement play in ending the Cold War?",
                "answer": "Founded in 1980 by Lech Wałęsa, Solidarity was the first independent trade union in the Soviet bloc. Its peaceful resistance led to the 1989 elections, sparking the collapse of communism across Europe."
            }
        ],
        "timeline": [
            {"year": "966 CE", "event": "Duke Mieszko I adopts Christianity, marking the Baptism and foundation of the Polish state."},
            {"year": "1569", "event": "The Union of Lublin creates the Polish-Lithuanian Commonwealth."},
            {"year": "1791", "event": "The Great Sejm passes the landmark Constitution of May 3."},
            {"year": "1795", "event": "The Third Partition erases Poland from European maps for 123 years."},
            {"year": "1918", "event": "Poland regains sovereign independence on November 11 following World War I."},
            {"year": "1939", "event": "Invasion of Poland by Nazi Germany and the Soviet Union sparks World War II."},
            {"year": "1989", "event": "Solidarity wins historic democratic elections, initiating the fall of communism in Europe."},
            {"year": "2004", "event": "Poland accedes to the European Union, accelerating rapid economic modernization."}
        ]
    },
    "nl": {
        "code": "NL",
        "name": "Netherlands",
        "capital": "Amsterdam (Seat of Government: The Hague)",
        "continent": "Europe",
        "population": "17.9 Million",
        "currency": "Euro (EUR)",
        "languages": ["Dutch"],
        "seoTitle": "History of the Netherlands: Land Reclaimed from the Sea, Prince's Flag, and Republic",
        "metaDescription": "Explore the detailed history of the Netherlands. Discover the Dutch Golden Age, William the Silent, the Union of Utrecht (1579), and modern waterworks.",
        "mapFormation": "Occupying the fertile deltas of the Rhine, Meuse, and Scheldt rivers in Western Europe across 41,850 square kilometers, the Kingdom of the Netherlands (<em>Nederland</em>) is famous for its low-lying topography, with over 26% of its land area situated below sea level and 50% less than one meter above sea level.<br><br>The territory was shaped over centuries through the Dutch saying: <em>'God created the Earth, but the Dutch created the Netherlands.'</em> Through advanced hydraulic engineering, windmills, dikes, and drainage canals, generations of Dutch engineers reclaimed hundreds of thousands of hectares of arable land (polders) from the Zuiderzee and the North Sea.<br><br>Following the <strong>Eighty Years' War (1568–1648)</strong> against the Spanish Habsburg Crown led by William of Orange (William the Silent), the <strong>Peace of Münster (1648)</strong>—part of the Peace of Westphalia—formally recognized the sovereign independence of the <strong>Dutch Republic</strong> (Republic of the Seven United Netherlands), establishing the modern European territorial core alongside constituent Caribbean islands (Aruba, Curaçao, Sint Maarten).",
        "flagHistory": "The national flag of the Netherlands—the <em>Rood-Wit-Blauw</em> horizontal tricolor—is the oldest tricolor flag in continuous sovereign use in world history, originating during the Dutch revolt in the 16th century.<br><br>The original banner, known as the <strong>Prince's Flag</strong> (<em>Prinsenvlag</em>), featured orange, white, and blue in honor of Prince William I of Orange-Nassau. Because orange dye was unstable at sea and tended to fade into yellowish-red, the orange stripe was gradually replaced by bright crimson-red around 1630. The modern red, white, and blue tricolor was officially confirmed by Royal Decree by Queen Wilhelmina on <strong>February 19, 1937</strong>.<br><br>In Dutch heraldry: <strong>Red</strong> symbolizes valor and strength; <strong>White</strong> represents peace and freedom; and <strong>Blue</strong> represents vigilance and loyalty. The royal color <strong>Orange</strong> remains the national color of Dutch unity, celebrated worldwide on King's Day (<em>Koningsdag</em>).",
        "freedomStory": "The Netherlands was one of the earliest pioneers of constitutional republicanism, freedom of conscience, and international law.<br><br>In <strong>1579</strong>, the northern provinces signed the <strong>Union of Utrecht</strong>, pledging mutual defense and guaranteeing freedom of religious conscience—a revolutionary principle that transformed Amsterdam into the intellectual and publishing capital of the 17th-century European Enlightenment, welcoming philosophers such as Baruch Spinoza and René Descartes.<br><br>In 1581, the States-General promulgated the <strong>Act of Abjuration</strong> (<em>Plakkaat van Verlatinghe</em>), declaring that a ruler who oppresses his subjects may be lawfully deposed—a document that directly influenced the American Declaration of Independence two centuries later. During the <strong>Dutch Golden Age</strong>, Dutch merchants, navigators, and artists (Rembrandt, Vermeer) led global trade through the Dutch East India Company (VOC). In 1848, statesman Johan Rudolf Thorbecke drafted the liberal Dutch Constitution, transforming the nation into a modern parliamentary constitutional monarchy.",
        "challenges": "As a global trading titan with the Port of Rotterdam (Europe's largest port) and home to semiconductor lithography leader ASML, the Netherlands manages complex environmental and agricultural transitions. Foremost priorities include executing the <strong>Delta Programme</strong> to fortify storm surge barriers against rising North Sea levels, reducing agricultural nitrogen emissions while sustaining high-yield agri-tech food exports, and expanding offshore wind farms across the North Sea.",
        "images": {
            "landscape": {
                "url": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
                "alt": "Windmills of Kinderdijk along Dutch polder canals",
                "caption": "The historic 18th-century windmills of Kinderdijk in South Holland, a UNESCO World Heritage site showcasing Dutch hydraulic drainage engineering."
            },
            "landmark": {
                "url": "https://images.unsplash.com/photo-1512813195386-6cf811ad3542?q=80&w=1200&auto=format&fit=crop",
                "alt": "Rijksmuseum and canals in Amsterdam, Netherlands",
                "caption": "The Rijksmuseum overlooking the iconic 17th-century canal ring of Amsterdam, the constitutional capital of the Netherlands."
            },
            "streetview": {
                "url": "https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=1200&auto=format&fit=crop",
                "alt": "Dutch street view with bright yellow license plates and red cycle paths",
                "caption": "Iconic Dutch street view indicators: bright yellow front and rear license plates, reddish-brown dedicated cycle paths (Fietspad), and flat canal landscapes."
            }
        },
        "streetViewMeta": {
            "drivingSide": "Right",
            "licensePlates": "Distinctive bright yellow front and rear plates with black lettering and blue EU strip on the left (unique in Western Europe alongside Luxembourg).",
            "utilityPoles": "Underground utilities; poles are virtually non-existent on roads; reddish-brown asphalt dedicated bike paths (Fietspad).",
            "roadMarkings": "White dashed centerlines; distinctive green-painted center divider strips on 100 km/h regional highways (Autoweg).",
            "delineators": "Black plastic posts with red reflectors on the right and white on the left, often with small green directional caps.",
            "cameraGen": "Complete Gen 3 and Gen 4 coverage across all 12 provinces."
        },
        "aiSummary": {
            "geo": "Low-lying delta nation in Western Europe; half of land below sea level reclaimed via dikes and polders.",
            "flag": "Rood-Wit-Blauw: oldest tricolor flag in continuous sovereign use, originating from the 16th-century Prince's Flag.",
            "freedom": "1581 Act of Abjuration pioneered deposing tyrants; 1848 Thorbecke Constitution established parliamentary democracy.",
            "challenge": "Delta Programme sea-level rise resilience, agricultural nitrogen transition, and ASML high-tech supply chains."
        },
        "faqs": [
            {
                "question": "Why is the color orange associated with the Netherlands?",
                "answer": "Orange is the national color of the Netherlands honoring the royal House of Orange-Nassau and founding father Prince William I of Orange."
            },
            {
                "question": "What is the difference between Holland and the Netherlands?",
                "answer": "The Netherlands is the sovereign country of 12 provinces. Holland refers specifically to two western provinces: North Holland (Noord-Holland) and South Holland (Zuid-Holland)."
            }
        ],
        "timeline": [
            {"year": "1568", "event": "William the Silent leads the Dutch Revolt against Spanish Habsburg rule, starting the Eighty Years' War."},
            {"year": "1581", "event": "The States-General signs the Act of Abjuration, declaring independence from King Philip II."},
            {"year": "1648", "event": "The Peace of Münster permanently recognizes the sovereign Dutch Republic."},
            {"year": "1848", "event": "Johan Rudolf Thorbecke drafts the liberal Constitution, creating parliamentary democracy."},
            {"year": "1953", "event": "The North Sea Flood kills 1,836 people, prompting the construction of the monumental Delta Works."},
            {"year": "1992", "event": "The Maastricht Treaty is signed in the Netherlands, founding the European Union."}
        ]
    },
    "se": {
        "code": "SE",
        "name": "Sweden",
        "capital": "Stockholm",
        "continent": "Europe",
        "population": "10.5 Million",
        "currency": "Swedish Krona (SEK)",
        "languages": ["Swedish"],
        "seoTitle": "History of Sweden: Scandinavian Kingdom, Yellow Cross Flag, and Social Democracy",
        "metaDescription": "Discover the detailed history of Sweden. Explore the Kalmar Union, Gustav Vasa's 1523 independence, the Nordic Cross flag, and modern neutrality.",
        "mapFormation": "Stretching 1,572 kilometers along the eastern spine of the Scandinavian Peninsula across 450,295 square kilometers, the Kingdom of Sweden (<em>Sverige</em>) is the largest country in Northern Europe, characterized by over 95,700 lakes, vast boreal pine forests, and thousands of coastal islands in the Stockholm and Bohuslän archipelagos.<br><br>In antiquity, Norse tribes—the Svear and Geats—navigated Baltic and Russian riverways during the Viking Age. In 1397, Queen Margaret I unified Denmark, Norway, and Sweden under the <strong>Kalmar Union</strong>.<br><br>Swedish sovereign independence was permanently established on <strong>June 6, 1523</strong>, when nobleman <strong>Gustav Vasa</strong> was elected King of Sweden following his successful rebellion against Danish monarch Christian II. During the 17th-century reigns of King Gustavus Adolphus and Charles X, the Swedish Empire (<em>Stormaktstiden</em>) controlled the entire Baltic rim as a <em>dominium maris baltici</em>, before borders stabilized following the 1721 Treaty of Nystad and the peaceful 1905 dissolution of the union with Norway.",
        "flagHistory": "The national flag of Sweden—the <em>Sveriges flagga</em>—is an iconic Nordic Cross design featuring a vibrant golden-yellow cross on a field of azure blue, formally codified on <strong>June 22, 1906</strong>.<br><br>The design was inspired by the older Danish Dannebrog and traces its royal roots to King Gustav Vasa's 1523 banner and the historic Swedish Coat of Arms, which features three golden crowns (<em>Tre Kronor</em>) on a blue field. In heraldic lore, King Eric the Holy saw a golden cross appear in the blue sky upon landing in Finland during the First Swedish Crusade in 1157. The cross represents Sweden's Christian heritage, with the vertical cross bar shifted toward the hoist in traditional Nordic maritime style.",
        "freedomStory": "Sweden's path to freedom represents one of the world's most stable democratic progressions, transitioning from an imperial military powerhouse to over two centuries of peace and progressive welfare democracy.<br><br>Sweden commemorates <strong>June 6</strong> as its National Day, celebrating both the election of King Gustav Vasa in 1523 and the adoption of the progressive <strong>Instrument of Government in 1809</strong>, which introduced constitutional separation of powers and the world's first formal institution of the <strong>Ombudsman</strong> to protect citizen rights against state bureaucracy.<br><br>In the 20th century, Sweden developed the <em>'Folkhemmet'</em> ('The People's Home') social democratic welfare model, pioneered by Prime Minister Per Albin Hansson, guaranteeing universal healthcare, free higher education, and gender equality while fostering world-leading engineering companies like Volvo, Ericsson, and Spotify.",
        "challenges": "In the modern era, Sweden has adapted its historic 200-year policy of military non-alignment by officially joining <strong>NATO in 2024</strong> to reinforce Baltic regional defense. Domestically, the nation leads European green industrialization through 'fossil-free steel' projects in northern Norrland, expands battery gigafactories, and strengthens social integration across metropolitan communities.",
        "images": {
            "landscape": {
                "url": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
                "alt": "Swedish Lapland landscape with northern lakes and pine forests",
                "caption": "The pristine boreal forests and glacial lakes of Swedish Lapland in northern Sweden, home to the indigenous Sámi people."
            },
            "landmark": {
                "url": "https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?q=80&w=1200&auto=format&fit=crop",
                "alt": "Stockholm Old Town (Gamla Stan) and Royal Palace, Sweden",
                "caption": "The colorful medieval merchant houses of Gamla Stan (Old Town) on the waterfront of Stockholm, the capital of Sweden."
            },
            "streetview": {
                "url": "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=1200&auto=format&fit=crop",
                "alt": "Swedish road with yellow dashed side lines and pine trees",
                "caption": "Swedish street view signatures: dashed white side lines on road shoulders, yellow warning signs, and birch/pine forests."
            }
        },
        "streetViewMeta": {
            "drivingSide": "Right (switched from left on Dagen H, Sept 3, 1967)",
            "licensePlates": "White standard Euro plates with blue EU strip on left ('S'); format of three letters, two numbers, and one alphanumeric character.",
            "utilityPoles": "Wooden creosote poles with metal triangular top mounts; distinctive blue snow-depth marker poles along northern highways.",
            "roadMarkings": "Dashed white outer side lines along road edges (unique to Sweden and Norway; Sweden uses shorter, more frequent dashes).",
            "delineators": "White posts with rectangular white reflectors on the right and two round white reflectors on the left.",
            "cameraGen": "Complete Gen 3 and Gen 4 coverage across all 21 counties from Skåne to Norrbotten."
        },
        "aiSummary": {
            "geo": "Largest Scandinavian country spanning 450k sq km; borders unified under King Gustav Vasa in 1523.",
            "flag": "Nordic Cross flag: golden-yellow cross on an azure blue field derived from the Tre Kronor emblem.",
            "freedom": "1523 Gustav Vasa independence; created the Ombudsman in 1809; built the Folkhemmet social welfare model.",
            "challenge": "NATO accession integration, northern fossil-free green steel manufacturing, and social cohesion."
        },
        "faqs": [
            {
                "question": "What happened on 'Dagen H' in Sweden?",
                "answer": "On September 3, 1967 (Dagen H / 'H Högertrafik'), Sweden successfully switched traffic from driving on the left to driving on the right side of the road."
            },
            {
                "question": "Why is June 6 celebrated as Sweden's National Day?",
                "answer": "June 6 marks both the election of King Gustav Vasa in 1523 (founding of modern Sweden) and the adoption of the democratic Instrument of Government in 1809."
            }
        ],
        "timeline": [
            {"year": "1397", "event": "Queen Margaret I unifies Denmark, Norway, and Sweden in the Kalmar Union."},
            {"year": "1523", "event": "Gustav Vasa is elected King of Sweden on June 6, establishing sovereign independence."},
            {"year": "1632", "event": "King Gustavus Adolphus falls at the Battle of Lützen during the Thirty Years' War."},
            {"year": "1809", "event": "Adoption of the Instrument of Government establishes constitutional separation of powers and the Ombudsman."},
            {"year": "1905", "event": "Peaceful dissolution of the personal union between Sweden and Norway."},
            {"year": "1967", "event": "Sweden switches to right-hand traffic on Dagen H (September 3)."},
            {"year": "2024", "event": "Sweden officially joins NATO, ending two centuries of formal military non-alignment."}
        ]
    },
    "no": {
        "code": "NO",
        "name": "Norway",
        "capital": "Oslo",
        "continent": "Europe",
        "population": "5.5 Million",
        "currency": "Norwegian Krone (NOK)",
        "languages": ["Norwegian (Bokmål & Nynorsk)"],
        "seoTitle": "History of Norway: Glacial Fjords, Tricolor Nordic Cross, and Sovereign Wealth",
        "metaDescription": "Explore the detailed history of Norway. Discover the Viking Age, the 1814 Eidsvoll Constitution, 1905 independence, and sovereign wealth energy.",
        "mapFormation": "Carving a dramatic 25,000-kilometer coastline of jagged glacial fjords, towering mountains, and Arctic archipelagos across 385,207 square kilometers, the Kingdom of Norway (<em>Norge / Noreg</em>) forms the western and northern edge of the Scandinavian Peninsula.<br><br>The realm was first unified under King Harald Fairhair around <strong>872 CE</strong> following the naval Battle of Hafrsfjord. Norwegian Viking seafarers navigated the Atlantic to settle Iceland, Greenland, and reach North America (Vinland) under Leif Erikson around 1000 CE.<br><br>Following the devastation of the Black Death, Norway entered the Kalmar Union in 1397, remaining under Danish rule for over four centuries. Following the Napoleonic Wars in 1814, the <strong>Treaty of Kiel</strong> ceded Norway to the King of Sweden, sparking Norwegian resistance and the drafting of the <strong>Constitution of 1814</strong>. Full sovereign independence was peacefully achieved on <strong>June 7, 1905</strong>, when the Norwegian Storting dissolved the union with Sweden.",
        "flagHistory": "The national flag of Norway—the <em>Norges flagg</em>—was designed in 1821 by parliamentarian <strong>Fredrik Meltzer</strong> in Bergen and officially adopted by the Storting on <strong>July 13, 1821</strong>.<br><br>Meltzer created a brilliant tricolor Nordic Cross flag by inserting an indigo blue cross inside the white cross of the Danish Dannebrog flag. In heraldic and political symbolism: <strong>Red and White</strong> honored historical ties to Denmark; <strong>Blue</strong> honored the union with Sweden and the North Atlantic maritime horizon; while the combination of <strong>Red, White, and Blue</strong> consciously echoed the colors of the French Tricolore and American Stars and Stripes, celebrating sovereign democratic liberty.",
        "freedomStory": "Norway's sovereign freedom is rooted in one of Europe's most revered constitutional documents: the <strong>Constitution of Norway (Grunnloven)</strong>, adopted at Eidsvoll on <strong>May 17, 1814</strong> (celebrated nationwide with children's parades as <em>Syttende Mai</em>).<br><br>Inspired by the French and American Revolutions, the Eidsvoll Constitution established popular sovereignty, freedom of speech, and a unicameral parliament (Storting). When Norway achieved full separation from Sweden in 1905, citizens voted overwhelmingly in a referendum to establish a constitutional monarchy, inviting Danish Prince Carl to become King Haakon VII.<br><br>Following heroic national resistance during World War II, the discovery of massive petroleum reserves in the North Sea at the <strong>Ekofisk field in 1969</strong> transformed the economy. Norway established the <strong>Government Pension Fund Global (Sovereign Wealth Fund)</strong>, investing oil revenues for future generations to build the world's highest standard of living and top human development index rating.",
        "challenges": "As a global pioneer in green electrification with over 80% of new car sales being fully electric and 98% of domestic power generated by hydropower, Norway navigates the transition away from fossil fuel extraction. Foremost priorities include managing Arctic security and research in Svalbard, expanding offshore floating wind farms, and stewarding its $1.7 trillion Sovereign Wealth Fund sustainably.",
        "images": {
            "landscape": {
                "url": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
                "alt": "Geirangerfjord and cascading waterfalls in Norway",
                "caption": "The UNESCO-listed Geirangerfjord in western Norway, showcasing dramatic sheer cliffs and glacial waterfalls."
            },
            "landmark": {
                "url": "https://images.unsplash.com/photo-1512813195386-6cf811ad3542?q=80&w=1200&auto=format&fit=crop",
                "alt": "Royal Palace in Oslo, Norway",
                "caption": "The Royal Palace at the end of Karl Johans gate in Oslo, the official residence of the Norwegian monarch built in the 1840s."
            },
            "streetview": {
                "url": "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=1200&auto=format&fit=crop",
                "alt": "Norwegian fjord road with yellow centerlines and dashed edge lines",
                "caption": "Norwegian street view indicators: continuous yellow centerlines (unique in the Nordics), dashed white outer shoulder lines, and green license plates on commercial vans."
            }
        },
        "streetViewMeta": {
            "drivingSide": "Right",
            "licensePlates": "White standard plates with blue strip on left ('N'); green plates with black lettering indicate 2-seater commercial transport vehicles.",
            "utilityPoles": "Wooden utility poles with round metal cross-arms; distinctive wooden barriers and rock fences along fjord slopes.",
            "roadMarkings": "Continuous or dashed yellow centerlines (Norway is the ONLY Nordic country that uses yellow centerlines); dashed white outer edge lines with long intervals.",
            "delineators": "White posts with rectangular white reflectors on both sides; wooden snow poles along mountain passes.",
            "cameraGen": "Dense Gen 3 and Gen 4 coverage across all 15 counties from Kristiansand to Nordkapp."
        },
        "aiSummary": {
            "geo": "Fjord-lined Scandinavian kingdom; unified in 872 CE by Harald Fairhair; borders finalized in 1905.",
            "flag": "Tricolor Nordic Cross: indigo blue cross bordered with white on a red field, created in 1821.",
            "freedom": "Enacted the Eidsvoll Constitution on May 17, 1814; peaceful dissolution of Swedish union in 1905.",
            "challenge": "North Sea energy decarbonization, Arctic security around Svalbard, and sovereign wealth stewardship."
        },
        "faqs": [
            {
                "question": "Why does Norway celebrate May 17 as its National Day (Syttende Mai)?",
                "answer": "May 17 commemorates the signing of the Constitution of Norway at Eidsvoll in 1814, celebrated with joyful children's parades and traditional bunad costumes."
            },
            {
                "question": "How do you identify Norway on Google Street View instantly?",
                "answer": "Norway is the only Nordic country with yellow centerlines on its roads, combined with dashed white edge lines and dramatic mountainous fjord landscapes."
            }
        ],
        "timeline": [
            {"year": "872 CE", "event": "Harald Fairhair wins the Battle of Hafrsfjord, unifying Norway into a single kingdom."},
            {"year": "1030", "event": "King Olav Haraldsson falls at the Battle of Stiklestad, cementing Christianity in Norway."},
            {"year": "1814", "event": "The Norwegian Constitution is signed at Eidsvoll on May 17."},
            {"year": "1905", "event": "The Storting dissolves the union with Sweden; Prince Carl of Denmark becomes King Haakon VII."},
            {"year": "1969", "event": "Discovery of oil at the Ekofisk field initiates Norway's modern energy era."},
            {"year": "1990", "event": "Establishment of the Government Pension Fund Global to manage petroleum wealth."}
        ]
    }
}

for code, data in batch2_part1.items():
    file_path = os.path.join(output_dir, f"{code}.json")
    with open(file_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print(f"Updated {code.upper()} chronicle successfully.")
