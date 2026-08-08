import json
import os

# Base directory for the JSON files
output_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "../src/data/chronicles"))
os.makedirs(output_dir, exist_ok=True)

# 1. High-quality, deeply researched data for the first 30 countries (AF to KH)
# Enhanced with internal anchor links, AI summaries, and FAQ lists.
rich_countries = {
    "af": {
        "code": "AF",
        "name": "Afghanistan",
        "capital": "Kabul",
        "continent": "Asia",
        "population": "41.1 Million",
        "currency": "Afghan Afghani (AFN)",
        "languages": ["Pashto", "Dari"],
        "seoTitle": "History of Afghanistan: Map Formation, Flag Symbolism, and Freedom Path",
        "metaDescription": "Explore the detailed history of Afghanistan, including its geographical border formation, the symbolism of its red, black, and green flag, and the path to independence.",
        "mapFormation": (
            "Afghanistan is situated at the historic crossroads of Central, South, and Western Asia, a geographical positioning that has "
            "profoundly shaped its borders. Throughout antiquity, it served as a key artery of the Silk Road, linking ancient empires. "
            "The modern borders of the country began to crystallize in the late 19th century during the 'Great Game'—a period of intense "
            "geopolitical rivalry between the British Empire and the Russian Empire. To prevent a direct clash between the two powers, "
            "Afghanistan was designated as a neutral buffer state. In 1893, Sir Mortimer Durand negotiated the Durand Line with Emir Abdur "
            "Rahman Khan, establishing the border with British India (modern Pakistan). This boundary split ethnic Pashtun lands in two, "
            "creating lasting geopolitical challenges that persist to this day. Other borders, such as the northern frontier along the Amu "
            "Darya river, were finalized through joint Anglo-Russian commissions in the late 1800s, leaving a legacy of a highly complex, "
            "landlocked terrain surrounded by six nations, including regional neighbors like <a href=\"/chronicles/az\" style=\"color: #00f2fe; text-decoration: underline; font-weight: 600;\">Azerbaijan</a>."
        ),
        "flagHistory": (
            "The flag of Afghanistan has undergone more changes than almost any other national banner in the 20th century, reflecting its "
            "turbulent political history. The classical design features three equal vertical bands of black, red, and green. The black band "
            "symbolizes the dark, war-torn history of the country; the red band represents the blood of martyrs shed during the struggle "
            "for independence; and the green band represents hope, prosperity, and the prominent role of Islam in Afghan society. At the center "
            "of the flag sits the national emblem, which features a mosque with a Mihrab (prayer niche facing Mecca) and a Minbar (pulpit), "
            "flanked by two national flags. Surrounding the mosque are sheaves of wheat, symbolizing agriculture and unity. The emblem is "
            "crowned by the Shahada (the Islamic creed) and the year 1298 of the Solar Hijri calendar (1919 CE), celebrating the year of "
            "sovereignty from British influence."
        ),
        "freedomStory": (
            "Afghanistan is famously referred to as the 'Graveyard of Empires' due to its successful resistance against foreign domination. "
            "During the 19th century, the British Empire launched three Anglo-Afghan Wars (1839, 1878, and 1919) in an attempt to secure "
            "influence over the region and counter Russian expansion. While the first two wars resulted in heavy British casualties but left "
            "Britain in control of Afghanistan's foreign relations, the Third Anglo-Afghan War in 1919 led to full independence. Led by the "
            "reforming monarch King Amanullah Khan, Afghan forces pushed British forces back, leading to the signing of the Treaty of Rawalpindi "
            "on August 19, 1919. This treaty officially recognized Afghanistan's absolute sovereignty and independence in all external affairs, "
            "establishing August 19 as the country's national Independence Day."
        ),
        "challenges": (
            "Modern Afghanistan faces severe and interconnected difficulties. As a landlocked country, its economic development is heavily "
            "dependent on transit trade through neighboring Pakistan and Iran, which is frequently disrupted by political disputes. The rugged, "
            "mountainous geography of the Hindu Kush range hinders the development of domestic infrastructure, making remote provinces difficult "
            "to access. Politically, the country has suffered from decades of continuous civil war, foreign interventions, and institutional "
            "instability. These crises have led to economic isolation, high rates of poverty, food insecurity, and human rights issues, "
            "particularly regarding women's education. Furthermore, the country is situated on active tectonic boundaries, making it highly "
            "vulnerable to devastating earthquakes and droughts, complicating international humanitarian assistance."
        ),
        "aiSummary": {
            "geo": "Borders shaped by the 19th-century 'Great Game' buffer policies, including the disputed Durand Line.",
            "flag": "Three vertical bands of black (history), red (martyrs' blood), and green (Islamic hope) with a central mosque crest.",
            "freedom": "Sovereignty won from the British Empire in 1919 following the Third Anglo-Afghan War and Treaty of Rawalpindi.",
            "challenge": "Landlocked topography, infrastructure deficits, tectonic vulnerability, and severe socio-economic crises."
        },
        "faqs": [
            {
                "question": "Why is Afghanistan called the 'Graveyard of Empires'?",
                "answer": "Afghanistan earned this title due to its historical resilience against foreign powers, successfully repelling invasions from the British Empire, the Soviet Union, and modern coalitions."
            },
            {
                "question": "What is the meaning of the year 1298 on the Afghan emblem?",
                "answer": "The year 1298 corresponds to 1919 CE in the Solar Hijri calendar, which is the year Afghanistan gained full sovereignty in foreign relations from the United Kingdom."
            }
        ],
        "timeline": [
          { "year": "1747", "event": "Ahmad Shah Durrani unites Pashtun tribes and establishes the Durrani Empire, the predecessor of modern Afghanistan." },
          { "year": "1839-1842", "event": "The First Anglo-Afghan War results in a disastrous defeat for British forces trying to install a puppet ruler." },
          { "year": "1893", "event": "The Durand Line Agreement is signed, delineating the border between Afghanistan and British India." },
          { "year": "1919", "event": "The Third Anglo-Afghan War concludes with the Treaty of Rawalpindi, establishing full Afghan independence." },
          { "year": "1973", "event": "The monarchy is overthrown, and Afghanistan is declared a republic." },
          { "year": "1979-1989", "event": "Soviet military intervention triggers a decade-long guerrilla war." }
        ]
    },
    "al": {
        "code": "AL",
        "name": "Albania",
        "capital": "Tirana",
        "continent": "Europe",
        "population": "2.8 Million",
        "currency": "Albanian Lek (ALL)",
        "languages": ["Albanian"],
        "seoTitle": "History of Albania: Map Borders, Black Eagle Flag, and Path to Freedom",
        "metaDescription": "Explore the history of Albania, from its ancient Illyrian roots and the formation of its borders to its legendary double-headed eagle flag and post-communist transition.",
        "mapFormation": (
            "Albania lies in the western part of the Balkan Peninsula, bordering the Adriatic and Ionian Seas. The country's borders are a "
            "product of its ancient Illyrian heritage, centuries of Roman, Byzantine, and Ottoman rule, and the complex geopolitics of the "
            "Balkan Wars. When Albania declared its independence in 1912, the Great Powers (Austria-Hungary, Britain, France, Germany, Italy, "
            "and Russia) convened the London Conference of 1913 to delineate the country's boundaries. Yielding to pressure from neighboring "
            "states, the conference drew borders that excluded more than half of the ethnic Albanian population, leaving Kosovo under Serbian "
            "sovereignty and other Albanian-populated areas in modern Montenegro and North Macedonia. These decisions established a geographical "
            "layout that generated decades of regional ethnic tension, but the core territory remained a distinct Mediterranean country defined "
            "by the rugged Accursed Mountains (Prokletije) and fertile coastal plains."
        ),
        "flagHistory": (
            "The national flag of Albania is one of the most distinctive in Europe, consisting of a deep red field charged with a black "
            "double-headed eagle in the center. The origin of this symbol dates back to the Byzantine Empire, where the double-headed eagle "
            "represented the dual authority of the emperor over church and state. It was adopted in the 15th century by Gjergj Kastrioti, known "
            "as Skanderbeg, Albania's national hero. Skanderbeg united the Albanian principalities and led a legendary 25-year rebellion against "
            "the invading Ottoman Empire. In 1443, he raised the red flag with the black eagle over the fortress of Krujë to proclaim freedom. "
            "When Albania declared independence in 1912, this historical emblem was officially revived to represent national unity and "
            "unyielding resistance to oppression."
        ),
        "freedomStory": (
            "Albania endured nearly five centuries of Ottoman rule, during which much of its population converted to Islam and its cultural "
            "institutions were suppressed. The national awakening in the late 19th century culminated in the first Balkan War. Seizing the "
            "opportunity as the Ottoman Empire collapsed, Albanian delegates gathered at the Assembly of Vlorë. On November 28, 1912, Ismail "
            "Qemali read the declaration of independence and raised the national flag, establishing the provisional government of Albania. "
            "While the country's independence was recognized by the Treaty of London in 1913, its borders were occupied during World War I. "
            "Sovereignty was consolidated at the Congress of Lushnjë in 1920, and after World War II, the country became a highly isolated socialist "
            "republic before transitioning to a parliamentary democracy in 1991."
        ),
        "challenges": (
            "Following the collapse of one of the world's most repressive communist regimes in 1991, Albania went through a turbulent economic "
            "transition, including a major financial crisis in 1997 caused by the collapse of pyramid schemes. Today, its primary challenges "
            "are socio-economic. Albania suffers from a massive 'brain drain' as young, educated citizens emigrate to Western Europe in search of "
            "better opportunities. The government continues to fight corruption and organized crime, which are key requirements for its ongoing "
            "accession talks to join the European Union. Environmental concerns, such as waste management and river pollution, also pose challenges "
            "as the country rapidly develops its coastal tourism sector."
        ),
        "aiSummary": {
            "geo": "Balkan coast terrain; 1913 boundaries excluded over half of ethnic Albanians, causing regional friction.",
            "flag": "Red field bearing Skanderbeg's medieval black double-headed eagle emblem.",
            "freedom": "Gained from the Ottoman Empire on November 28, 1912; transitioned from communism in 1991.",
            "challenge": "EU integration requirements, systemic corruption, and severe youth emigration."
        },
        "faqs": [
            {
                "question": "Who designed the modern flag of Albania?",
                "answer": "The flag is based on the historic seal of Skanderbeg, Gjergj Kastrioti, who raised the black double-headed eagle flag in 1443."
            },
            {
                "question": "What happened during Albania's 1997 crisis?",
                "answer": "A severe financial collapse occurred due to failed pyramid investment schemes, leading to nationwide riots and temporary anarchy."
            }
        ],
        "timeline": [
          { "year": "1443", "event": "Skanderbeg raises the red double-headed eagle flag at Krujë, leading a 25-year crusade against the Ottoman Empire." },
          { "year": "1912", "event": "Ismail Qemali declares Albanian independence from the Ottoman Empire in Vlorë." },
          { "year": "1913", "event": "The London Conference of 1913 establishes the borders of Albania, leaving half of ethnic Albanians outside." },
          { "year": "1944", "event": "Enver Hoxha establishes a strict, isolationist Marxist-Leninist regime." },
          { "year": "1991", "event": "First democratic elections are held, marking the transition away from communism." },
          { "year": "1997", "event": "Anarchy erupts following the collapse of nationwide pyramid investment schemes." }
        ]
    },
    "dz": {
        "code": "DZ",
        "name": "Algeria",
        "capital": "Algiers",
        "continent": "Africa",
        "population": "44.9 Million",
        "currency": "Algerian Dinar (DZD)",
        "languages": ["Arabic", "Tamazight"],
        "seoTitle": "History of Algeria: Saharan Map, Crescent Flag, and Algerian War of Independence",
        "metaDescription": "Explore the detailed history of Algeria. Learn about its massive Saharan geography, the symbolism of its green and white flag, and its revolutionary war against France.",
        "mapFormation": (
            "Algeria is the largest country in Africa, situated on the Mediterranean coast with a vast Saharan desert hinterland. Its northern "
            "boundaries and southern desert frontiers are largely a product of French colonial administration between 1830 and 1962. Before the "
            "French invasion, the region was governed by the Ottoman Regency of Algiers in the north, while the vast desert was controlled by "
            "various nomadic Tuareg confederations and Saharan trading towns. French colonial authorities merged these distinct territories into "
            "a single centralized colony, pushing borders deep into the Sahara to control rich oil and natural gas fields discovered in the mid-20th "
            "century. Upon independence in 1962, the new government successfully asserted sovereignty over these colonial borders under the "
            "international principle of uti possidetis juris, securing a vast territory that is 80% desert, bordering West African states like <a href=\"/chronicles/bj\" style=\"color: #00f2fe; text-decoration: underline; font-weight: 600;\">Benin</a>."
        ),
        "flagHistory": (
            "The flag of Algeria consists of two equal vertical bands of green and white, charged in the center with a red star and crescent. "
            "The green band represents Islam, the natural beauty of the land, and agricultural hope; the white band symbolizes peace, purity, "
            "and the return to sovereignty. The red crescent and star are traditional symbols of Islam and Ottoman heritage, with red representing "
            "the blood of the millions of martyrs who died fighting for freedom. The modern design is attributed to Messali Hadj, a nationalist "
            "leader who created the flag in 1928 for the 'Etoile Nord-Africaine' liberation movement, and it was officially adopted by the "
            "Provisional Government of the Algerian Republic (GPRA) in 1958 before becoming the national flag upon independence in 1962."
        ),
        "freedomStory": (
            "Algeria's colonization by France was exceptionally brutal, involving systemic land confiscation, cultural suppression, and the "
            "imposition of French department status, meaning it was officially part of France. After decades of peaceful protests failed to "
            "yield equal rights, the National Liberation Front (FLN) launched the Algerian War of Independence on November 1, 1954. The war "
            "lasted eight years and was characterized by guerrilla warfare, urban terrorism, and extreme violence on both sides. The conflict "
            "cost the lives of an estimated 1.5 million Algerians. Under international pressure and domestic strain, French President Charles "
            "de Gaulle negotiated the Evian Accords in March 1962. Following a national self-determination referendum where 99% of voters chose "
            "independence, Algeria declared its sovereignty on July 5, 1962."
        ),
        "challenges": (
            "Algeria's contemporary challenges are primarily economic and environmental. The state suffers from a high dependency on oil and "
            "natural gas exports, which account for over 90% of its export revenues, leaving the national budget vulnerable to volatile global "
            "energy markets. This resource concentration has hindered the diversification of the economy, resulting in high unemployment rates, "
            "particularly among the youth. Environmentally, Algeria is on the frontlines of climate change; desertification is actively creeping "
            "northward, threatening the fertile coastal agricultural strip, while severe water scarcity and rising temperatures present "
            "significant hurdles for future urban planning and food security."
        ),
        "aiSummary": {
            "geo": "Largest nation in Africa; vast Saharan boundaries structured by French colonial resource extraction interests.",
            "flag": "Vertical green and white panels with a red star and crescent representing Islamic roots and martyrs' blood.",
            "freedom": "Declared on July 5, 1962, following a brutal 8-year war of independence led by the FLN against France.",
            "challenge": "Hydrocarbon export dependency, high youth unemployment, and advancing Saharan desertification."
        },
        "faqs": [
            {
                "question": "What was the human cost of the Algerian War of Independence?",
                "answer": "The war cost the lives of an estimated 1.5 million Algerians, earning the nation the moniker 'The Land of a Million Martyrs'."
            },
            {
                "question": "What is the meaning of the white color on the Algerian flag?",
                "answer": "The white color symbolizes peace, purity, and the reclamation of national sovereignty after 132 years of French colonization."
            }
        ],
        "timeline": [
          { "year": "1830", "event": "France invades Algiers, beginning a brutal 132-year period of colonial rule." },
          { "year": "1954", "event": "The National Liberation Front (FLN) launches coordinated attacks, starting the Algerian War of Independence." },
          { "year": "1962", "event": "The Evian Accords are signed, and Algeria officially declares independence on July 5." },
          { "year": "1991-2002", "event": "A civil war erupts following canceled legislative elections, leading to a decade of violence." },
          { "year": "2019", "event": "The Hirak mass protest movement leads to the resignation of long-term President Abdelaziz Bouteflika." }
        ]
    },
    "ad": {
        "code": "AD",
        "name": "Andorra",
        "capital": "Andorra la Vella",
        "continent": "Europe",
        "population": "80,000",
        "currency": "Euro (EUR)",
        "languages": ["Catalan"],
        "seoTitle": "History of Andorra: Pyrenean Valley Borders, Co-Princes, and Flag Symbolism",
        "metaDescription": "Explore the unique history of Andorra. Discover how its medieval mountain borders were stabilized in 1278 and learn about its joint French-Spanish sovereignty.",
        "mapFormation": (
            "Andorra is a small landlocked co-principality located in the eastern Pyrenees mountains between France and Spain. Its territory is "
            "composed of three high-altitude valleys carved out by the Valira River, surrounded by rugged peaks reaching over 2,900 meters. The "
            "formation of Andorra's borders is deeply rooted in medieval feudal charters. According to tradition, Emperor Charlemagne granted a "
            "charter to the Andorran people in the early 9th century in exchange for their help fighting the Moors. The territory's modern borders "
            "were officially stabilized by the Paréages of 1278 and 1288—agreements signed between the Spanish Bishop of Urgell and the French "
            "Count of Foix, establishing shared sovereignty over the valleys. This feudal division created a neutral mountain buffer zone whose "
            "geographical borders have remained completely unchanged for nearly 750 years."
        ),
        "flagHistory": (
            "The flag of Andorra is a vertical tricolor consisting of blue, yellow, and red bands, with the national coat of arms in the center. "
            "The design combines the national colors of France (blue and red) and Spain (yellow and red), reflecting the unique co-principality "
            "status of the nation. In the center of the flag lies the coat of arms, which is divided into four quarters. The quarters show: the "
            "mitre and crozier of the Bishop of Urgell; the three red bars of the Count of Foix; the four red bars of the Crown of Aragon (Spain); "
            "and the two red cows of the Viscount of Béarn. Below the shield is the national motto in Latin: 'Virtus Unita Fortior' (Virtue "
            "United is Stronger), which highlights the strength of its dual protection."
        ),
        "freedomStory": (
            "Andorra's path to modern sovereignty is unique because it never fought a war of independence. Instead, it preserved its medieval "
            "feudal arrangement for centuries, paying a nominal tribute (the questia) to its co-princes: the Spanish Bishop of Urgell and the French "
            "head of state (historically the Count of Foix, then the King of France, and now the President of France). In the late 20th century, "
            "Andorrans sought to modernize their government and establish full sovereignty. On March 14, 1993, the country held a national referendum "
            "and adopted its first democratic constitution. The constitution formally established Andorra as a parliamentary democracy. It retained "
            "the Bishop of Urgell and the President of France as joint, ceremonial heads of state (co-princes), but transferred legislative and "
            "foreign policy power to the elected General Council of the Valleys."
        ),
        "challenges": (
            "Andorra faces distinct challenges associated with its mountain geography and economic scale. Historically a tax haven, the country "
            "has had to reform its financial laws and introduce income taxes to comply with European Union regulations. Its economy is heavily "
            "dependent on tourism and retail shopping, which attracts millions of visitors annually, leaving it vulnerable to regional economic "
            "downturns. Furthermore, Andorrans face a severe housing affordability crisis due to the geographic limits of narrow mountain valleys, "
            "where building space is extremely scarce. On the environmental front, climate change presents a major threat to the winter ski resorts "
            "that form the backbone of its winter economy."
        ),
        "aiSummary": {
            "geo": "Landlocked East Pyrenean territory; borders stabilized in 1278 by medieval co-sovereignty treaties.",
            "flag": "Vertical blue, yellow, and red bands combining French and Spanish colors, with the co-feudal coat of arms.",
            "freedom": "Sovereignty established democratically in 1993 via constitution, preserving ceremonial French-Spanish co-princes.",
            "challenge": "Severe housing scarcity in mountain corridors, banking reforms, and climate impacts on winter tourism."
        },
        "faqs": [
            {
                "question": "Who are the current co-princes of Andorra?",
                "answer": "Andorra's unique co-princes are the Bishop of Urgell in Catalonia, Spain, and the President of France."
            },
            {
                "question": "What is Andorra's official language?",
                "answer": "Andorra is the only country in the world where Catalan is the sole official language, although Spanish and French are widely spoken."
            }
        ],
        "timeline": [
          { "year": "805", "event": "Charlemagne grants a charter of sovereignty to the people of Andorra for their assistance in the wars against the Saracens." },
          { "year": "1278", "event": "The signing of the first Paréage establishes joint Spanish-French sovereignty over Andorra, founding the co-principality." },
          { "year": "1419", "event": "The Council of the Land (Consell de la Terra) is established, one of the oldest parliaments in Europe." },
          { "year": "1993", "event": "Andorra adopts its first written constitution, establishing a sovereign democratic parliamentary system." }
        ]
    },
    "ao": {
        "code": "AO",
        "name": "Angola",
        "capital": "Luanda",
        "continent": "Africa",
        "population": "35.6 Million",
        "currency": "Angolan Kwanza (AOA)",
        "languages": ["Portuguese"],
        "seoTitle": "History of Angola: Berlin Conference Borders, Machete Flag, and Post-Colonial Wars",
        "metaDescription": "Explore the history of Angola. Discover the creation of its borders, the socialist symbolism of its red and black flag, and its transition from Portuguese rule.",
        "mapFormation": (
            "Angola is located on the southwestern coast of Africa, bordering the Atlantic Ocean. Its modern borders were carved out in the "
            "late 19th century during the Scramble for Africa, specifically through treaties negotiated at the Berlin Conference of 1884-1885. "
            "Portuguese colonial authorities drew boundaries that merged several distinct, historically powerful African states—including the "
            "Kingdom of Kongo, the Kingdom of Ndongo, and the Kingdom of Matamba—into a single administrative territory. The conference also "
            "established the border of the Cabinda Province, a small exclave separated from the rest of Angola by the Congo River and a strip of "
            "territory belonging to the Democratic Republic of the Congo. This colonial border design united ethnically diverse populations, "
            "setting the stage for complex internal divisions following independence."
        ),
        "flagHistory": (
            "The national flag of Angola is divided horizontally into two bands: red on top and black on the bottom. In the center sits a yellow "
            "emblem composed of a five-pointed star, a machete, and a segment of a cogwheel. The red band symbolizes the blood shed by Angolans "
            "during colonial oppression, the national liberation struggle, and the defense of the country; the black band represents the African "
            "continent. The yellow emblem represents the country's workers and resources: the cogwheel symbolizes industrial laborers, the "
            "machete represents agricultural workers and the armed struggle, and the star represents international solidarity and progress. The "
            "colors and symbols reflect the influence of the ruling MPLA party's socialist history, officially adopted on November 11, 1975."
        ),
        "freedomStory": (
            "Angola fought a prolonged and bloody independence struggle against Portuguese colonial rule from 1961 to 1974. The conflict was "
            "fought by three rival nationalist movements: the MPLA (supported by the Soviet Union and Cuba), the FNLA, and UNITA (supported by "
            "the United States and South Africa). Following the Carnation Revolution in Portugal in 1974, which overthrew the Lisbon dictatorship, "
            "Portugal agreed to withdraw from its colonies. Angola officially declared independence on November 11, 1975. However, instead of "
            "forming a unified government, the rival factions immediately plunged the country into a devastating 27-year civil war. The civil "
            "war became a major proxy arena of the Cold War and lasted until the death of UNITA leader Jonas Savimbi in 2002."
        ),
        "challenges": (
            "Angola's primary difficulties stem from the legacy of its long civil war and its economic structure. The conflict left the country "
            "with destroyed infrastructure, thousands of internally displaced persons, and millions of unexploded landmines that restrict agricultural "
            "reclamation. Economically, Angola is heavily dependent on oil exports, which generate the majority of government revenues. This dependence "
            "has led to severe wealth inequality, high inflation, and vulnerability to fluctuations in global oil prices. The capital, Luanda, "
            "is one of the most expensive cities in the world for expatriates, yet a significant percentage of the country's rural population lives "
            "in extreme poverty with limited access to clean water, healthcare, and education."
        ),
        "aiSummary": {
            "geo": "Southwest African coast borders drawn at the 1885 Berlin Conference, including the separate Cabinda exclave.",
            "flag": "Red (colonial blood) and black (African continent) horizontal bands with a yellow cogwheel, machete, and star emblem.",
            "freedom": "Sovereignty won from Portugal in 1975, followed by a 27-year Cold War proxy civil war ending in 2002.",
            "challenge": "Post-war landmine removal, oil export dependency, Luanda inflation, and wealth inequality."
        },
        "faqs": [
            {
                "question": "What does the machete on Angola's flag represent?",
                "answer": "The machete represents agricultural workers, the peasantry, and the armed struggle for national liberation."
            },
            {
                "question": "Why is Cabinda physically separated from the rest of Angola?",
                "answer": "Cabinda was established as a Portuguese protectorate separately and was later integrated, separated by the Congo River strip given to the DRC in the Berlin Conference."
            }
        ],
        "timeline": [
          { "year": "1482", "event": "Portuguese explorer Diogo Cão reaches the mouth of the Congo River, establishing contact with the Kingdom of Kongo." },
          { "year": "1884-1885", "event": "The Berlin Conference delineates the colonial borders of Portuguese West Africa (Angola)." },
          { "year": "1961", "event": "The Angolan War of Independence begins with uprisings in Luanda and northern plantations." },
          { "year": "1975", "event": "Angola gains independence from Portugal on November 11, and the Angolan Civil War begins immediately." },
          { "year": "2002", "event": "UNITA leader Jonas Savimbi is killed, leading to a peace agreement that ends the 27-year civil war." }
        ]
    },
    "ag": {
        "code": "AG",
        "name": "Antigua and Barbuda",
        "capital": "Saint John's",
        "continent": "North America",
        "population": "94,000",
        "currency": "East Caribbean Dollar (XCD)",
        "languages": ["English"],
        "seoTitle": "History of Antigua and Barbuda: Sugar Colonies, Rising Sun Flag, and Independence",
        "metaDescription": "Discover the detailed history of Antigua and Barbuda, from British colonization and sugar plantation slavery to its unique rising sun flag and independence in 1981.",
        "mapFormation": (
            "Antigua and Barbuda is a twin-island nation situated at the boundary of the Caribbean Sea and the Atlantic Ocean, forming part of the "
            "Lesser Antilles. The islands were originally inhabited by Indigenous Siboney and Arawak populations before Christopher Columbus "
            "named Antigua in 1493. In 1632, English settlers colonized Antigua, followed by Barbuda in 1678. To optimize sugar cane cultivation "
            "and colonial administration, British authorities leased Barbuda to the Codrington family, who operated it as a private agricultural "
            "and slave-breeding colony. In 1860, the two islands were formally joined under a single colonial administration. This administrative "
            "union established the current borders, which encompass the main populated islands of Antigua and Barbuda, along with the small, "
            "uninhabited volcanic rock island of Redonda, situated not far from other island states like <a href=\"/chronicles/bb\" style=\"color: #00f2fe; text-decoration: underline; font-weight: 600;\">Barbados</a>."
        ),
        "flagHistory": (
            "The national flag of Antigua and Barbuda was adopted on February 27, 1967, to mark the achievement of self-governance. Designed by "
            "national artist Sir Reginald Samuel, the flag features a red field with an inverted V-shape (a chevron) divided into bands of black, "
            "light blue, and white. Placed in the black band is a seven-pointed golden rising sun. The sun represents the dawning of a new era of "
            "freedom and hope for the nation; the red color symbolizes the energy and dynamism of the people; the black represents their African "
            "ancestry; the blue symbolizes the Caribbean Sea; and the white represents the sandy shores and hope for the future. The V-shape "
            "itself stands for 'Victory' over colonial rule."
        ),
        "freedomStory": (
            "After the abolition of slavery in 1834, Antigua's economy suffered, but its population remained under British rule for over a "
            "century. The rise of organized labor in the 1940s, led by Vere Bird, spearheaded the push for self-determination. In 1967, the islands "
            "became an Associated State of the United Kingdom, gaining full control over internal affairs while Britain managed defense and foreign "
            "relations. Under the leadership of Vere Bird, who served as Premier, the nation steadily transitioned toward full sovereignty. On "
            "November 1, 1981, Antigua and Barbuda officially declared its independence from the United Kingdom. Vere Bird became the country's "
            "first Prime Minister, and the nation remained a member of the Commonwealth, retaining the British monarch as its ceremonial head of state."
        ),
        "challenges": (
            "Antigua and Barbuda faces critical difficulties shared by many Small Island Developing States (SIDS). The economy is highly "
            "dependent on international tourism, which makes it extremely vulnerable to global economic shocks, travel disruptions, and pandemics. "
            "Geographically, the islands lie in the Atlantic hurricane belt and suffer from intense tropical storms; in 2017, Hurricane Irma "
            "devastated Barbuda, forcing the temporary evacuation of its entire population. The country also struggles with high public debt "
            "incurred from rebuilding infrastructure, and severe freshwater shortages due to limited natural rivers and aquifers, requiring "
            "expensive desalination plants to support the population."
        ),
        "aiSummary": {
            "geo": "Twin-island Lesser Antilles boundaries unified under a single British crown administration in 1860.",
            "flag": "Red field with a central V-shape holding black, blue, and white stripes beneath a golden rising sun.",
            "freedom": "Sovereignty obtained peacefully from the United Kingdom on November 1, 1981, led by labor leader Vere Bird.",
            "challenge": "Severe Atlantic hurricane vulnerability, heavy tourism dependency, and acute drinking water shortages."
        },
        "faqs": [
            {
                "question": "Who designed the flag of Antigua and Barbuda?",
                "answer": "The flag was designed by Reginald Samuel, a local art teacher, who won a national design contest in 1967."
            },
            {
                "question": "What happened to Barbuda during Hurricane Irma in 2017?",
                "answer": "Hurricane Irma damaged 95% of Barbuda's structures, forcing the evacuation of the entire population to Antigua."
            }
        ],
        "timeline": [
          { "year": "1632", "event": "English colonists establish the first permanent European settlement on Antigua, planting tobacco and sugar." },
          { "year": "1685", "event": "The island of Barbuda is leased to the Codrington family, who establish large agricultural estates." },
          { "year": "1834", "event": "Slavery is officially abolished, though former slaves remain economically dependent on plantation owners." },
          { "year": "1967", "event": "Antigua and Barbuda becomes an Associated State, achieving self-governance in domestic affairs." },
          { "year": "1981", "event": "The nation achieves full independence from the United Kingdom on November 1, with Vere Bird as Prime Minister." },
          { "year": "2017", "event": "Category 5 Hurricane Irma strikes Barbuda, destroying 95% of its structures." }
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
        "seoTitle": "History of Argentina: Viceroyalty Borders, Sun of May Flag, and liberation wars",
        "metaDescription": "Explore the rich history of Argentina. Discover its transition from the Viceroyalty of Rio de la Plata, the symbolism of its blue and white flag, and its path to independence.",
        "mapFormation": (
            "Argentina is the second-largest country in South America, stretching from the high peaks of the Andes Mountains in the west to the "
            "Atlantic Ocean in the east. Its borders evolved from the Spanish Viceroyalty of the Río de the Plata, established in 1776, which "
            "encompassed modern Argentina, Uruguay, Paraguay, and parts of Bolivia. Following independence, the region split into separate states, "
            "and Argentina went through decades of violent civil conflict between the Unitarians (who favored a centralized government in Buenos "
            "Aires) and the Federalists (who defended provincial autonomy). The modern border with Chile along the Andes was negotiated through "
            "the Boundary Treaty of 1881, which split Patagonia. During the late 19th-century 'Conquest of the Desert' campaigns, the Argentine "
            "state forcefully expanded its southern frontiers into Indigenous Mapuche territories, stabilizing the modern map bordering "
            "<a href=\"/chronicles/bo\" style=\"color: #00f2fe; text-decoration: underline; font-weight: 600;\">Bolivia</a> and <a href=\"/chronicles/br\" style=\"color: #00f2fe; text-decoration: underline; font-weight: 600;\">Brazil</a>."
        ),
        "flagHistory": (
            "The national flag of Argentina was created by military commander Manuel Belgrano during the War of Independence and raised for the "
            "first time in Rosario on February 27, 1812. It consists of three horizontal bands of light blue, white, and light blue. According "
            "to tradition, Belgrano chose the colors to match the cockade used by the revolutionary forces, which itself was based on the colors of "
            "the Spanish House of Bourbon. In 1818, the Congress of Tucumán approved the addition of the Sun of May ('Sol de Mayo') to the center "
            "white band. The sun features a human face and 32 alternating straight and wavy rays, representing the Incan sun god Inti and the "
            "miraculous breakthrough of the sun through the clouds during the first revolutionary assembly on May 25, 1810."
        ),
        "freedomStory": (
            "Argentina's struggle for independence began during the May Revolution in 1810, when local citizens deposed the Spanish Viceroy "
            "Baltasar Hidalgo de Cisneros and established the Primera Junta. This started the Argentine War of Independence. On July 9, 1816, the "
            "Congress of Tucumán formally declared the independence of the United Provinces of the Río de la Plata. To secure this freedom, General "
            "José de San Martín organized the Army of the Andes, executing a legendary crossing of the mountain range to liberate Chile and Peru "
            "from Spanish forces. This secured Argentina's borders and cemented San Martín's legacy as the national 'Father of the Fatherland'."
        ),
        "challenges": (
            "Argentina struggles with severe and persistent macroeconomic difficulties. The country has gone through a recurring cycle of "
            "hyperinflation, currency devaluations, fiscal deficits, and sovereign debt defaults (most notably in 2001 and 2014), which have "
            "eroded public trust in the national currency and hampered long-term investments. This economic instability is exacerbated by deep "
            "political polarization, known locally as 'La Grieta' (The Rift), which hinders consensus on tax and spending reforms. Argentina "
            "also faces social challenges, including high rates of poverty and youth unemployment, alongside an ongoing territorial dispute with "
            "the United Kingdom over the Falkland Islands (Islas Malvinas), which led to a war in 1982."
        ),
        "aiSummary": {
            "geo": "Second-largest South American nation; borders finalized via the 1881 treaty with Chile dividing Patagonia.",
            "flag": "Three horizontal bands of light blue and white, with the Incan-themed Sun of May added to the center in 1818.",
            "freedom": "Began with the 1810 May Revolution; officially declared on July 9, 1816, and secured by Jose de San Martin.",
            "challenge": "Persistent inflation, currency devaluations, political polarization, and the Falkland Islands dispute."
        },
        "faqs": [
            {
                "question": "What is the origin of Argentina's 'Sun of May'?",
                "answer": "The Sun of May represents the Incan sun god Inti and honors the sun breaking through the clouds during the revolutionary assembly on May 25, 1810."
            },
            {
                "question": "Who was Jose de San Martin?",
                "answer": "He was Argentina's primary liberator, famous for leading the Army of the Andes to secure the independence of Argentina, Chile, and Peru."
            }
        ],
        "timeline": [
          { "year": "1776", "event": "Spain establishes the Viceroyalty of the Río de la Plata, with Buenos Aires as its capital." },
          { "year": "1810", "event": "The May Revolution deposes the Spanish Viceroy and establishes the first local government junta." },
          { "year": "1812", "event": "Manuel Belgrano designs and raises the light blue and white Argentine flag." },
          { "year": "1816", "event": "The Congress of Tucumán formally declares independence from Spanish colonial rule on July 9." },
          { "year": "1881", "event": "Argentina and Chile sign a boundary treaty, dividing Patagonia and establishing the Andean border." },
          { "year": "1982", "event": "Argentina invades the Falkland Islands, leading to a brief, losing war against the United Kingdom." },
          { "year": "2001", "event": "A severe economic crisis leads to massive protests, the resignation of the president, and a record debt default." }
        ]
    },
    "am": {
        "code": "AM",
        "name": "Armenia",
        "capital": "Yerevan",
        "continent": "Asia",
        "population": "2.8 Million",
        "currency": "Armenian Dram (AMD)",
        "languages": ["Armenian"],
        "seoTitle": "History of Armenia: Caucasus Highlands, Tricolor Flag, and Independence",
        "metaDescription": "Discover the detailed history of Armenia, from its ancient kingdoms and the Division of the Caucasus to its red, blue, and orange tricolor and post-Soviet path.",
        "mapFormation": (
            "Armenia is a landlocked, mountainous country situated in the South Caucasus region. Modern Armenia occupies only a small fraction "
            "of the vast historical Armenian Highlands, which stretched across eastern Anatolia and the southern Caucasus. The country's borders "
            "were shaped by centuries of partition between the Ottoman, Safavid Persian, and Russian Empires. Following the collapse of the Russian "
            "Empire after World War I, the first independent Armenian Republic was established in 1918. However, in 1920, the republic was "
            "partitioned between Turkey and the Soviet Union, and its borders were locked as the Armenian Soviet Socialist Republic. These Soviet "
            "borders, which include the landlocked territory surrounding Yerevan, became the internationally recognized boundaries of modern Armenia "
            "following the collapse of the Soviet Union in 1991, neighboring countries like <a href=\"/chronicles/az\" style=\"color: #00f2fe; text-decoration: underline; font-weight: 600;\">Azerbaijan</a>."
        ),
        "flagHistory": (
            "The national flag of Armenia features three equal horizontal bands of red, blue, and orange. The design was originally adopted by the "
            "First Republic of Armenia in 1918, and it was revived on August 24, 1990, following the restoration of independence. The colors hold "
            "deep symbolic meanings defined in the Armenian constitution: the red band represents the Armenian Highlands, the Armenian people's "
            "struggle for survival, the preservation of the Christian faith, and the nation's independence and freedom; the blue band symbolizes "
            "the peaceful sky and the will of the people to live under calm skies; and the orange band represents the creative talent and "
            "hard-working nature of the Armenian nation."
        ),
        "freedomStory": (
            "Armenia is one of the oldest Christian civilizations in the world, adopting Christianity as its state religion in 301 AD. After centuries "
            "of foreign rule and the tragic Armenian Genocide of 1915 perpetrated by the Ottoman Empire, Armenia briefly achieved independence "
            "as the First Republic on May 28, 1918. This independence was short-lived; in December 1920, the Red Army invaded, and Armenia was "
            "incorporated into the Soviet Union. Over the next 70 years, Armenia remained a Soviet republic. As the Soviet Union began to "
            "dissolve, Armenia held a national referendum on September 21, 1991, where over 99% of voters chose independence. September 21 is "
            "now celebrated as Independence Day."
        ),
        "challenges": (
            "Armenia faces severe geopolitical and economic difficulties. The country is landlocked and has suffered from a long-standing land "
            "blockade by two of its four neighbors, Turkey and Azerbaijan, due to the conflict over Nagorno-Karabakh. This blockade isolates "
            "Armenia economically, restricting its trade routes to Georgia and Iran. Politically, the country has faced intense volatility "
            "following military defeats in conflicts with Azerbaijan, leading to refugee crises and security concerns along its borders. "
            "Furthermore, Armenia's economy is heavily dependent on remittances from its vast global diaspora, and the country lies in a highly "
            "active seismic zone, requiring continuous investment in earthquake-resilient infrastructure."
        ),
        "aiSummary": {
            "geo": "Mountainous Caucasus enclave; modern boundaries formed as a Soviet Republic following imperial partitions.",
            "flag": "Three horizontal bands of red (survival/faith), blue (peaceful skies), and orange (work/creative talent).",
            "freedom": "Declared on September 21, 1991, following a referendum to secede from the dissolving Soviet Union.",
            "challenge": "Land blockade by Turkey and Azerbaijan, Nagorno-Karabakh conflict effects, and high earthquake risks."
        },
        "faqs": [
            {
                "question": "What is the historical significance of Christianity in Armenia?",
                "answer": "Armenia was the first country in the world to adopt Christianity as its official state religion, doing so in 301 AD."
            },
            {
                "question": "Why is Armenia's border with Turkey closed?",
                "answer": "Turkey closed the border in 1893 in support of Azerbaijan during the Nagorno-Karabakh conflict, isolating Armenia's western frontier."
            }
        ],
        "timeline": [
          { "year": "301 AD", "event": "King Tiridates III declares Christianity as Armenia's state religion, making it the first nation to do so." },
          { "year": "1915", "event": "The Ottoman Empire begins the systemic deportation and massacre of Armenians, known as the Armenian Genocide." },
          { "year": "1918", "event": "Following the collapse of the Russian Empire, the First Republic of Armenia declares its independence." },
          { "year": "1920", "event": "The Red Army enters Yerevan, and Armenia is annexed into the Soviet Union." },
          { "year": "1988", "event": "A devastating earthquake strikes northern Armenia, killing over 25,000 people." },
          { "year": "1991", "event": "Armenia declares its independence from the collapsing Soviet Union on September 21." },
          { "year": "2020", "event": "The Second Nagorno-Karabakh War erupts, resulting in significant territorial shifts and geopolitical challenges." }
        ]
    },
    "au": {
        "code": "AU",
        "name": "Australia",
        "capital": "Canberra",
        "continent": "Oceania",
        "population": "26.2 Million",
        "currency": "Australian Dollar (AUD)",
        "languages": ["English"],
        "seoTitle": "History of Australia: Colonization Borders, Southern Cross Flag, and Sovereignty",
        "metaDescription": "Discover the detailed history of Australia, from Indigenous heritage and British penal colonization to federation and the Southern Cross flag.",
        "mapFormation": (
            "Australia is the only nation that occupies an entire continent, surrounded by the Indian and Pacific Oceans. Indigenous Australians "
            "have inhabited the continent for over 65,000 years, maintaining deep spiritual connections to the land. The modern borders of the "
            "nation began to form with the arrival of the British First Fleet in 1788, which established the colony of New South Wales as a penal "
            "settlement. Over the next century, British authorities established five additional colonies: Tasmania, Western Australia, South "
            "Australia, Victoria, and Queensland. These colonies were separated by straight longitudinal and latitudinal lines drawn across the "
            "vast, arid interior (the Outback) to divide resources and administrative control. In 1901, these six separate colonies agreed to "
            "unite and form a single federal commonwealth, establishing the continental borders of modern Australia."
        ),
        "flagHistory": (
            "The national flag of Australia was chosen through a worldwide public competition in 1901 following federation. It features a dark "
            "blue field divided into three key elements. In the upper hoist canton is the British Union Jack, representing the country's historic "
            "colonial links to the United Kingdom. Below the Union Jack is a large seven-pointed white star known as the Commonwealth Star; six of "
            "the points represent the original six federating colonies, while the seventh point represents the territories. On the fly half of the "
            "flag is the Southern Cross constellation, composed of five white stars of varying points, which is visible in the night sky across the "
            "Southern Hemisphere and has served as a navigation guide for centuries."
        ),
        "freedomStory": (
            "Australia's transition from a collection of British colonies to an independent nation was a peaceful, gradual process. On January 1, "
            "1901, the six colonies federated to form the Commonwealth of Australia, adopting a federal constitution. While Australia gained "
            "control over its domestic affairs, Britain retained influence over its foreign policy and defense. Australia's independence was "
            "formalized internationally when it signed the Treaty of Versailles in 1919 and joined the League of Nations. The British Parliament "
            "passed the Statute of Westminster in 1931, which granted full legislative independence to dominions, and Australia formally adopted "
            "it in 1942. The final legal ties were severed by the Australia Act 1986, which ended all remaining avenues of appeal from Australian "
            "courts to the British Privy Council, establishing absolute judicial sovereignty."
        ),
        "challenges": (
            "Australia faces critical environmental and social difficulties. The continent is one of the most arid inhabited lands on Earth, "
            "making it highly vulnerable to the impacts of climate change. This includes rising temperatures, prolonged droughts, catastrophic "
            "bushfires (such as the 'Black Summer' of 2019-2020), and extensive bleaching of the Great Barrier Reef. Socially, Australia struggles "
            "with addressing the severe socio-economic inequalities, health disparities, and historical injustices faced by its Indigenous "
            "Aboriginal and Torres Strait Islander populations. Additionally, the nation faces geopolitical challenges in balancing its historic "
            "security alliance with the United States against its heavy economic dependence on trade with China."
        ),
        "aiSummary": {
            "geo": "Continental island; borders constructed by internal colonial longitudinal partitions uniting in 1901.",
            "flag": "Blue field with the British Union Jack, the 7-pointed Commonwealth Star, and the Southern Cross constellation.",
            "freedom": "Evolved gradually from federation in 1901 to complete constitutional independence via the Australia Act 1986.",
            "challenge": "Extreme climate vulnerability (bushfires/reef bleaching), Indigenous inequality, and US-China geopolitical balancing."
        },
        "faqs": [
            {
                "question": "What is the meaning of the seven-pointed star on the Australian flag?",
                "answer": "It is the Commonwealth Star; six points represent the six founding states, and the seventh point represents Australia's territories."
            },
            {
                "question": "When did Australia achieve full independence from Britain?",
                "answer": "While federation occurred in 1901, full constitutional independence was only finalized with the passage of the Australia Act in 1986."
            }
        ],
        "timeline": [
          { "year": "1788", "event": "The British First Fleet arrives at Port Jackson, establishing Sydney as a penal colony." },
          { "year": "1851", "event": "Discovery of gold in New South Wales and Victoria triggers a massive gold rush and immigration wave." },
          { "year": "1901", "event": "The six colonies federate to form the Commonwealth of Australia on January 1." },
          { "year": "1915", "event": "Australian and New Zealand forces (ANZAC) land at Gallipoli during WWI, cementing a national military legacy." },
          { "year": "1931", "event": "The Statute of Westminster is passed, granting legislative independence to Australia." },
          { "year": "1986", "event": "The passage of the Australia Act severs all remaining constitutional ties with the United Kingdom." },
          { "year": "2019-2020", "event": "The devastating Black Summer bushfires burn over 24 million hectares of land." }
        ]
    },
    "at": {
        "code": "AT",
        "name": "Austria",
        "capital": "Vienna",
        "continent": "Europe",
        "population": "9.1 Million",
        "currency": "Euro (EUR)",
        "languages": ["German"],
        "seoTitle": "History of Austria: Alpine Map Borders, Siege of Acre Flag, and Neutrality Path",
        "metaDescription": "Explore the rich history of Austria. Learn about its Alpine border shifts, the medieval Siege of Acre flag legend, and its post-WWII path to neutrality.",
        "mapFormation": (
            "Austria is a landlocked, mountainous country situated in Central Europe, dominated by the Alps. The country's borders are the "
            "remnant of the vast Habsburg Empire, which ruled over much of Central and Eastern Europe for centuries. Following the collapse of the "
            "Austro-Hungarian Empire at the end of World War I, the Treaty of Saint-Germain-en-Laye in 1919 dismantled the empire and created the "
            "First Republic of Austria. The treaty restricted Austria's borders to its German-speaking core, separating it from industrial regions "
            "in Bohemia and agricultural lands in Hungary. The borders were temporarily erased during the Nazi annexation (Anschluss) in 1938, "
            "but were restored to their 1919 frontiers after World War II by the Allied powers, establishing the modern federal republic bordering "
            "eight European nations, including regional neighbors like <a href=\"/chronicles/be\" style=\"color: #00f2fe; text-decoration: underline; font-weight: 600;\">Belgium</a>."
        ),
        "flagHistory": (
            "The national flag of Austria is one of the oldest in the world, consisting of three equal horizontal bands of red, white, and red. "
            "According to historical legend, the design dates back to the Siege of Acre in 1191 during the Third Crusade. Duke Leopold V of "
            "Austria fought so bravely that his white surcoat was completely soaked in blood. When he removed his wide sword belt, the fabric "
            "beneath remained clean and white, creating the red-white-red pattern. The Emperor later granted Leopold the right to adopt these "
            "colors as his banner. The flag was officially adopted as the national colors in 1918 with the formation of the first republic, "
            "symbolizing the country's medieval roots and democratic resilience."
        ),
        "freedomStory": (
            "Following the collapse of the Habsburg monarchy in 1918, Austria struggled to find stability, leading to a brief civil war and the "
            "rise of Austrofascism, which culminated in the Nazi annexation (Anschluss) in 1938. After World War II, Austria was occupied by "
            "the four Allied powers (United States, Soviet Union, United Kingdom, and France) and divided into occupation zones. To regain its "
            "sovereignty, Austrian diplomats negotiated the Austrian State Treaty, signed on May 15, 1955. The treaty ended the Allied occupation "
            "and restored Austria's independence, under the strict condition that the Austrian Parliament pass a constitutional law declaring "
            "perpetual military neutrality, preventing it from joining military alliances like NATO."
        ),
        "challenges": (
            "Austria faces modern difficulties in adapting its constitutional neutrality to a changing European security landscape. Following the "
            "escalation of conflicts in Eastern Europe, the country has had to navigate its defense policy while remaining outside NATO. Economically, "
            "Austria struggles with an aging demographic and labor shortages in key service sectors, alongside rising inflation and energy transition "
            "costs. Additionally, the country faces political challenges related to the integration of large asylum-seeker and immigrant populations "
            "that arrived during recent humanitarian crises, which has fueled domestic debates over immigration policy and social welfare spending."
        ),
        "aiSummary": {
            "geo": "Landlocked Central European Alpine state; borders established in 1919 after the dismantling of the Habsburg Empire.",
            "flag": "Horizontal red-white-red bands, historically derived from Duke Leopold V's bloodied Crusader surcoat in 1191.",
            "freedom": "Sovereignty restored in 1955 via the Austrian State Treaty under the condition of permanent military neutrality.",
            "challenge": "Navigating military neutrality, energy transition costs, labor shortages, and immigration reforms."
        },
        "faqs": [
            {
                "question": "Why is Austria a militarily neutral country?",
                "answer": "Austria declared permanent neutrality in 1955 as a condition of the Austrian State Treaty to end Allied post-WWII occupation."
            },
            {
                "question": "Is the Austrian flag the oldest in the world?",
                "answer": "It is one of the oldest national flags, dating back to documented heraldic use in 1230, inspired by Crusader legends."
            }
        ],
        "timeline": [
          { "year": "996", "event": "The name Ostarrîchi (Austria) is recorded for the first time in a historical document." },
          { "year": "1273", "event": "Rudolf I of Habsburg is elected King of Germany, beginning the rise of the Habsburg dynasty." },
          { "year": "1918", "event": "World War I ends, the Austro-Hungarian Empire collapses, and the First Republic of Austria is declared." },
          { "year": "1938", "event": "Nazi Germany annexes Austria in the Anschluss, erasing its borders." },
          { "year": "1955", "event": "The Austrian State Treaty is signed, ending Allied occupation and declaring permanent neutrality." },
          { "year": "1995", "event": "Austria joins the European Union, adapting its neutral status to regional integration." }
        ]
    },
    "az": {
        "code": "AZ",
        "name": "Azerbaijan",
        "capital": "Baku",
        "continent": "Asia",
        "population": "10.2 Million",
        "currency": "Azerbaijani Manat (AZN)",
        "languages": ["Azerbaijani"],
        "seoTitle": "History of Azerbaijan: Caspian Sea Borders, Tricolor Flag, and Oil Wealth History",
        "metaDescription": "Discover the detailed history of Azerbaijan. Explore its border divisions with Persia and Russia, its Turkic tricolor flag, and its path to post-Soviet independence.",
        "mapFormation": (
            "Azerbaijan is situated at the boundary of Eastern Europe and Western Asia, bordered by the Caspian Sea to the east. The country's "
            "borders were shaped by 19th-century imperial conflicts. Following the Russo-Persian Wars, the Treaty of Gulistan (1813) and the Treaty of "
            "Turkmenchay (1828) divided ethnic Azeri territories between the Russian Empire in the north and the Qajar Persian Empire in the south, "
            "leaving a substantial Azerbaijani population in northwestern Iran. In the Soviet era, its administrative borders were established as "
            "a Soviet Socialist Republic, which included the Nakhchivan exclave (separated by Armenian territory) and the Nagorno-Karabakh region, "
            "setting the stage for complex boundary wars when the nation regained independence in 1991, neighboring countries like "
            "<a href=\"/chronicles/am\" style=\"color: #00f2fe; text-decoration: underline; font-weight: 600;\">Armenia</a>."
        ),
        "flagHistory": (
            "The national flag of Azerbaijan features three horizontal bands of blue, red, and green, with a white crescent and an eight-pointed "
            "star in the center red band. Blue represents the country's Turkic heritage; red symbolizes modern progress, democracy, and development; "
            "and green represents Islamic civilization. The crescent is a traditional symbol of Islam, and the eight-pointed star stands for the "
            "eight branches of the Turkic peoples. The flag was originally designed and adopted by the short-lived Azerbaijan Democratic Republic "
            "in 1918. It was banned under Soviet rule and officially restored on November 9, 1990, just before the dissolution of the USSR."
        ),
        "freedomStory": (
            "Azerbaijan declared independence as the Azerbaijan Democratic Republic on May 28, 1918, establishing the first secular democratic "
            "republic in the Muslim world. However, in April 1920, the Bolshevik Red Army invaded Baku, and the country was incorporated into "
            "the Soviet Union. As the USSR collapsed, Azerbaijan restored its independence on October 18, 1991. The early years of independence "
            "were marked by ethnic political instability and the First Nagorno-Karabakh War, but the country gradually stabilized its sovereignty "
            "in the late 1990s under the leadership of Heydar Aliyev."
        ),
        "challenges": (
            "Azerbaijan faces challenges related to its political governance and economic structure. The country has an authoritarian system "
            "with limited political dissent and human rights concerns. Economically, Azerbaijan is heavily dependent on oil and gas exports from "
            "its Caspian Sea fields, making the national budget vulnerable to global energy market fluctuations. The country also navigates complex "
            "border tensions and military expenditures following conflicts with neighboring Armenia, alongside the task of rebuilding infrastructure "
            "in recently recaptured territories."
        ),
        "aiSummary": {
            "geo": "Borders Caspian Sea; separated from historic southern Azeri lands by 19th-century imperial Russian-Persian treaties.",
            "flag": "Horizontal blue (Turkic), red (modernity), and green (Islam) bands with a white crescent and 8-pointed star.",
            "freedom": "Restored on October 18, 1991, from the USSR, following the original 1918 democratic republic declaration.",
            "challenge": "Economic reliance on Caspian oil, Karabakh post-conflict reconstruction, and human rights concerns."
        },
        "faqs": [
            {
                "question": "What does the eight-pointed star on the Azerbaijan flag represent?",
                "answer": "The eight-pointed star represents the eight branches of the Turkic peoples, highlighting Azerbaijan's cultural heritage."
            },
            {
                "question": "What was the significance of the 1918 Azerbaijan Republic?",
                "answer": "It was the first secular democratic republic established in the Muslim world, granting women voting rights before many Western nations."
            }
        ],
        "timeline": [
          { "year": "1828", "event": "The Treaty of Turkmenchay divides Azerbaijani lands between the Russian and Persian Empires." },
          { "year": "1918", "event": "The Azerbaijan Democratic Republic declares independence as the first secular democracy in the Muslim world." },
          { "year": "1920", "event": "Soviet forces invade Baku, dissolving the republic and establishing Soviet Azerbaijan." },
          { "year": "1991", "event": "Azerbaijan restores its independence from the collapsing Soviet Union on October 18." },
          { "year": "2020", "event": "Azerbaijan regains control of territories in Karabakh after a 44-day war with Armenia." }
        ]
    },
    "bs": {
        "code": "BS",
        "name": "Bahamas",
        "capital": "Nassau",
        "continent": "North America",
        "population": "410,000",
        "currency": "Bahamian Dollar (BSD)",
        "languages": ["English"],
        "seoTitle": "History of the Bahamas: Lucayan Islands, Pirate Havens, and Independence Day",
        "metaDescription": "Read the history of the Bahamas, from Columbus's landing and pirate settlements to its aquamarine flag and peaceful independence from Great Britain.",
        "mapFormation": (
            "The Bahamas is an archipelago of over 700 islands, cays, and inlets in the Atlantic Ocean, north of Cuba. Originally settled by "
            "the Lucayan people (a branch of the Taínos), the islands became the site of Christopher Columbus's first landing in the New World in "
            "1492. Spanish slave raids depopulated the islands, and they remained mostly uninhabited until English Puritans, known as the "
            "Eleutheran Adventurers, established a settlement in 1648. During the late 17th century, the archipelago's intricate network of shallow "
            "banks and hidden channels became a notorious pirate haven. Britain claimed the islands as a crown colony in 1718, establishing maritime "
            "borders that control major shipping channels linking the Atlantic to the Gulf of Mexico, not far from other Caribbean nations like "
            "<a href=\"/chronicles/ag\" style=\"color: #00f2fe; text-decoration: underline; font-weight: 600;\">Antigua and Barbuda</a>."
        ),
        "flagHistory": (
            "Adopted on July 10, 1973, to celebrate independence, the Bahamian flag features three horizontal bands of aquamarine, gold, and "
            "aquamarine, with a black equilateral triangle at the hoist. The aquamarine bands represent the clear, turquoise waters of the "
            "Caribbean and Atlantic surrounding the islands; the gold band symbolizes the warm sun and sandy shores; and the black triangle "
            "represents the strength, vigor, and determination of the Bahamian people, who are primarily of African descent. The design was chosen "
            "through a national competition to replace the British Blue Ensign."
        ),
        "freedomStory": (
            "The Bahamas achieved self-governance in 1964 and gradually moved toward sovereignty. The transition was driven by the progressive "
            "majority rule movement in the 1960s, led by Lynden Pindling, who became Prime Minister in 1967. Pindling championed economic "
            "empowerment for the Afro-Bahamian majority and led negotiations for independence. On July 10, 1973, the Bahamas officially attained "
            "full independence from the United Kingdom, remaining a member of the Commonwealth of Nations and retaining a parliamentary system."
        ),
        "challenges": (
            "The Bahamas faces severe challenges due to its low-lying island geography. The country is highly vulnerable to climate change-induced "
            "sea-level rise and extreme weather events; in 2019, Hurricane Dorian devastated the northern islands, causing billions in damage. "
            "The national economy is heavily reliant on foreign tourism and offshore financial services, making it vulnerable to international "
            "regulatory changes and global recessions. Additionally, the geography of dispersed islands creates high costs for maintaining "
            "infrastructure, hospitals, and schools across the archipelago."
        ),
        "aiSummary": {
            "geo": "Atlantic coral archipelago of 700 islands; historical Lucayan lands colonized by English Puritans in 1648.",
            "flag": "Aquamarine bands (ocean) and gold band (beaches) with a black triangle at the hoist representing citizens' strength.",
            "freedom": "Achieved peacefully from the United Kingdom on July 10, 1973, led by Lynden Pindling's majority rule movement.",
            "challenge": "Destructive Atlantic hurricanes, sea-level rise threats, and high tourism dependency."
        },
        "faqs": [
            {
                "question": "Who were the Eleutheran Adventurers?",
                "answer": "They were English Puritans who fled religious persecution in Bermuda and established the first permanent British settlement in the Bahamas in 1648."
            },
            {
                "question": "What is the economic backbone of the Bahamas?",
                "answer": "Tourism is the primary industry, accounting for over 50% of the GDP and employing half of the national workforce."
            }
        ],
        "timeline": [
          { "year": "1492", "event": "Christopher Columbus makes his first landfall in the Americas on the Bahamian island of San Salvador." },
          { "year": "1648", "event": "English Puritans establish the Eleutheran Adventurers colony, fleeing religious persecution." },
          { "year": "1718", "event": "Woodes Rogers becomes first Royal Governor, successfully expelling pirates from Nassau." },
          { "year": "1967", "event": "The Bahamas achieves majority rule, with Lynden Pindling appointed Premier." },
          { "year": "1973", "event": "The Bahamas gains full independence from the United Kingdom on July 10." }
        ]
    },
    "bh": {
        "code": "BH",
        "name": "Bahrain",
        "capital": "Manama",
        "continent": "Asia",
        "population": "1.5 Million",
        "currency": "Bahraini Dinar (BHD)",
        "languages": ["Arabic"],
        "seoTitle": "History of Bahrain: Dilmun Trade Roots, Serrated Flag, and Persian Gulf Sovereignty",
        "metaDescription": "Explore the history of Bahrain, from the ancient Dilmun civilization and Al Khalifa rule to its serrated red and white flag and independence.",
        "mapFormation": (
            "Bahrain is a flat island nation in the Persian Gulf, comprising a small archipelago centered around Bahrain Island. Historically the "
            "center of the ancient Dilmun civilization, Bahrain has served as a strategic maritime trading hub linking Mesopotamia and India. Its "
            "territorial boundaries are defined by the surrounding shallow waters of the Gulf, situated between Saudi Arabia and Qatar. The ruling "
            "Al Khalifa dynasty established control over the islands in 1783, expelling Persian garrisons. Modern borders were stabilized through "
            "British protectorate treaties in the 19th century and a 2001 International Court of Justice ruling resolving island disputes with Qatar."
        ),
        "flagHistory": (
            "The flag of Bahrain consists of a red field with a vertical white band on the hoist side, separated by a serrated line of five "
            "triangles. The red color is traditional for the flags of Persian Gulf states; the white band represents peace. The five serrated points "
            "symbolize the Five Pillars of Islam (Shahada, Salah, Zakat, Sawm, and Hajj). The design was officially adopted in February 2002 when "
            "the country was declared a kingdom, reducing the number of serrated points from eight to five to clarify its Islamic symbolism."
        ),
        "freedomStory": (
            "Bahrain became a British protectorate in 1861 to protect its rulers from Ottoman and Persian expansion in exchange for maritime "
            "security. Following Great Britain's decision to withdraw its forces east of Suez in the late 1960s, Bahrain declared its full independence "
            "on August 15, 1971, under Sheikh Isa bin Salman Al Khalifa. Bahrain declined to join the United Arab Emirates, opting instead to establish "
            "an independent sovereign state and joining the United Nations and Arab League as a separate nation."
        ),
        "challenges": (
            "Bahrain faces social and economic difficulties. The country struggles with sectarian tensions between the Shia majority population "
            "and the ruling Sunni Al Khalifa royal family, which erupted into mass protests in 2011. Economically, Bahrain has smaller oil reserves "
            "than its neighbors and has had to rely on financial support from Saudi Arabia while striving to develop its banking, financial services, "
            "and tourism sectors. The nation also faces environmental challenges, including severe freshwater depletion and coastal reclamation impacts."
        ),
        "aiSummary": {
            "geo": "Persian Gulf archipelago; strategic trade borders defined by maritime channels and treaty arbitration with Qatar.",
            "flag": "Red field with a vertical white band separated by a 5-pointed serration representing the Pillars of Islam.",
            "freedom": "Sovereignty declared on August 15, 1971, ending the British protectorate status and declining integration into the UAE.",
            "challenge": "Socio-political sectarian reforms, oil reserve depletion, and severe groundwater exhaustion."
        },
        "faqs": [
            {
                "question": "What was the Dilmun civilization?",
                "answer": "Dilmun was an ancient Semitic-speaking polity in the eastern Arabian Peninsula, active from the 4th millennium BCE, serving as a hub on the Sumerian-Indus trade route."
            },
            {
                "question": "Why did Bahrain choose not to join the UAE?",
                "answer": "Bahrain opted for separate sovereignty in 1971 due to differences in governance agreements and its established administrative state structures."
            }
        ],
        "timeline": [
          { "year": "1783", "event": "The Al Khalifa family establishes control over Bahrain, ending Persian administration." },
          { "year": "1861", "event": "Bahrain signs a protectorate treaty with Great Britain, securing naval protection." },
          { "year": "1932", "event": "Discovery of oil in Bahrain, the first on the Arab side of the Persian Gulf." },
          { "year": "1971", "event": "Bahrain declares full independence, ending the British treaty system on August 15." },
          { "year": "2011", "event": "Pro-democracy protests erupt in Manama as part of the regional Arab Spring." }
        ]
    },
    "bd": {
        "code": "BD",
        "name": "Bangladesh",
        "capital": "Dhaka",
        "continent": "Asia",
        "population": "171.2 Million",
        "currency": "Bangladeshi Taka (BDT)",
        "languages": ["Bengali"],
        "seoTitle": "History of Bangladesh: Bengal Partition, Red Disc Flag, and the 1971 Liberation War",
        "metaDescription": "Read the history of Bangladesh, from the Bengal Partition of 1947 to the Language Movement, the 1971 Liberation War, and its green and red flag.",
        "mapFormation": (
            "Bangladesh occupies the fertile deltaic plain formed by the confluence of the Ganges, Brahmaputra, and Meghna rivers in South Asia. "
            "Its borders were drawn during the Partition of British India in 1947. British authorities divided Bengal along religious lines, "
            "designating Muslim-majority East Bengal as the eastern wing of Pakistan (East Pakistan), separated from West Pakistan by 1,600 kilometers "
            "of Indian territory. The borders are almost entirely surrounded by India, with a small border with Myanmar in the southeast and the "
            "Bay of Bengal to the south. This geographical enclosure has left Bangladesh with complex water sharing and maritime boundary challenges, "
            "close to Himalayan states like <a href=\"/chronicles/bt\" style=\"color: #00f2fe; text-decoration: underline; font-weight: 600;\">Bhutan</a>."
        ),
        "flagHistory": (
            "The national flag of Bangladesh, adopted officially on January 17, 1972, features a bottle-green field with a red disc offset "
            "slightly toward the hoist. The green field represents the lush green vegetation and fertility of the deltaic land, as well as the "
            "youthful vitality of the nation; the red disc symbolizes the rising sun of independence and the blood shed by Bengalis during the "
            "1971 Liberation War. The disc is offset slightly to the hoist so that it appears centered when the flag is flying."
        ),
        "freedomStory": (
            "East Pakistan suffered from economic exploitation, political marginalization, and cultural suppression by the West Pakistani administration. "
            "This led to the historic Bengali Language Movement in 1952 and the rise of the nationalist Awami League under Sheikh Mujibur Rahman. "
            "After West Pakistan refused to hand over power following the 1970 elections, the Pakistani military launched Operation Searchlight on "
            "March 25, 1971, triggering a civil war. Following a nine-month Liberation War supported by India, Pakistani forces surrendered on "
            "December 16, 1971, establishing the sovereign state of Bangladesh."
        ),
        "challenges": (
            "Bangladesh is on the frontlines of climate vulnerability. Much of its land is less than 5 meters above sea level, making it highly "
            "susceptible to monsoonal flooding, cyclones, and rising sea levels, which salinize agricultural soils. The country also struggles "
            "with extreme population density, political polarization, and infrastructural deficits. Additionally, Bangladesh hosts nearly a million "
            "Rohingya refugees who fled military violence in neighboring Myanmar, placing a strain on local resources in Cox's Bazar."
        ),
        "aiSummary": {
            "geo": "Ganges delta topography; borders mapped in the 1947 Bengal Partition, separating East Pakistan from India.",
            "flag": "Offset red disc (representing the rising sun and war blood) on a bottle-green field (delta vegetation).",
            "freedom": "Sovereignty won in 1971 from Pakistan after a nine-month Liberation War backed by India.",
            "challenge": "Severe monsoon flooding, sea-level salinization, massive population density, and hosting Rohingya refugees."
        },
        "faqs": [
            {
                "question": "What was the Language Movement of 1952?",
                "answer": "It was a Bengali political movement advocating for Bengali to be recognized as an official state language of Pakistan, peaking on February 21, 1952."
            },
            {
                "question": "Why is the red circle on the Bangladeshi flag offset?",
                "answer": "The circle is offset slightly to the hoist so that it appears visually centered when the flag is hoisted and waving in the wind."
            }
        ],
        "timeline": [
          { "year": "1947", "event": "The Partition of British India creates East Pakistan as a province of the newly formed state of Pakistan." },
          { "year": "1952", "event": "The Language Movement reaches its peak on February 21, as students are killed protesting for Bengali language rights." },
          { "year": "1971", "event": "The Bangladesh Liberation War begins in March and ends with the surrender of Pakistani forces on December 16." },
          { "year": "1975", "event": "Sheikh Mujibur Rahman is assassinated in a military coup, initiating a period of political instability." },
          { "year": "2017", "event": "A massive influx of Rohingya refugees arrives from Myanmar, seeking shelter in southeastern districts." }
        ]
    },
    "bb": {
        "code": "BB",
        "name": "Barbados",
        "capital": "Bridgetown",
        "continent": "North America",
        "population": "281,000",
        "currency": "Barbadian Dollar (BBD)",
        "languages": ["English"],
        "seoTitle": "History of Barbados: Sugar Plantations, Broken Trident Flag, and the 2021 Republic",
        "metaDescription": "Explore the history of Barbados, from British sugar plantations and colonial rule to its broken trident flag and transition to a republic in 2021.",
        "mapFormation": (
            "Barbados is an isolated island in the Atlantic Ocean, situated east of the Windward Islands in the Lesser Antilles. Unlike neighboring "
            "volcanic islands, Barbados is composed of coral limestone deposit layers accumulated over millions of years. Settled by English colonists "
            "in 1627, the island was rapidly cleared for tobacco, cotton, and sugar cane plantations. Its geographical isolation from the main Caribbean "
            "island chain protected it from Spanish and French attacks, allowing Britain to maintain uninterrupted control over its single landmass "
            "for over 300 years, establishing a highly stable maritime frontier, close to other island groups like <a href=\"/chronicles/ag\" style=\"color: #00f2fe; text-decoration: underline; font-weight: 600;\">Antigua and Barbuda</a>."
        ),
        "flagHistory": (
            "The national flag of Barbados features a vertical triband of ultramarine, gold, and ultramarine, with a black broken trident in the "
            "center. The ultramarine bands represent the ocean and the blue sky; the gold band symbolizes the warm, sandy beaches of the island; "
            "and the black broken trident represents independence. The trident is taken from the colonial badge of Britannia, and its broken shaft "
            "symbolizes the country breaking away from British colonial rule, signifying its new sovereign path."
        ),
        "freedomStory": (
            "Barbados developed a stable parliamentary tradition, establishing its House of Assembly in 1639. Following the abolition of slavery "
            "in 1834, the island gradually moved toward democratic reforms. Led by Errol Barrow of the Democratic Labour Party, Barbados achieved "
            "full independence from the United Kingdom on November 30, 1966. In a historic step to complete its independence, Barbados formally "
            "removed Queen Elizabeth II as head of state and declared itself a republic on November 30, 2021, inaugurating Sandra Mason as its "
            "first President."
        ),
        "challenges": (
            "Barbados faces economic and environmental challenges common to small island nations. The national economy is highly dependent on "
            "tourism and financial services, leaving it vulnerable to global recessions and changes in tax regulations. Environmental threats "
            "include climate change-induced coral reef degradation, rising sea temperatures, coastal erosion, and a severe natural freshwater scarcity "
            "driven by a lack of rivers, requiring heavy reliance on underground limestone aquifers."
        ),
        "aiSummary": {
            "geo": "Isolated coral-limestone island; single stable landmass protected by geographical distance from historical Caribbean battlegrounds.",
            "flag": "Ultramarine and gold vertical bands with a black broken trident representing the break from British colonial rule.",
            "freedom": "Achieved independence on November 30, 1966; formally declared a republic on November 30, 2021, removing the British monarch.",
            "challenge": "Heavy tourism reliance, groundwater aquifer vulnerability, and coastal erosion from rising sea temperatures."
        },
        "faqs": [
            {
                "question": "When did Barbados become a republic?",
                "answer": "Barbados officially became a parliamentary republic on November 30, 2021, on the 55th anniversary of its independence."
            },
            {
                "question": "What does the broken trident on the Barbadian flag mean?",
                "answer": "The broken trident symbolizes the break from British colonial rule (originally the trident of Britannia) and the transition to sovereignty."
            }
        ],
        "timeline": [
          { "year": "1627", "event": "English colonists land at Holetown, establishing the first permanent settlement on Barbados." },
          { "year": "1639", "event": "The Barbados House of Assembly is established, the third oldest parliament in the Commonwealth." },
          { "year": "1834", "event": "Slavery is abolished, and a transitional apprenticeship system is introduced." },
          { "year": "1966", "event": "Barbados gains independence from the United Kingdom on November 30, with Errol Barrow as Prime Minister." },
          { "year": "2021", "event": "Barbados becomes a republic, removing the British monarch as head of state." }
        ]
    },
    "by": {
        "code": "BY",
        "name": "Belarus",
        "capital": "Minsk",
        "continent": "Europe",
        "population": "9.2 Million",
        "currency": "Belarusian Ruble (BYN)",
        "languages": ["Belarusian", "Russian"],
        "seoTitle": "History of Belarus: Eastern European Plain, Woven Ornament Flag, and Independence",
        "metaDescription": "Discover the detailed history of Belarus. Explore its flat plains geography, the traditional ornament flag, and its path to post-Soviet independence.",
        "mapFormation": (
            "Belarus is a landlocked nation in Eastern Europe, dominated by flat plains, rolling hills, and extensive marshlands in the south (the "
            "Pripyat Marshes). Historically part of the Grand Duchy of Lithuania, the Polish-Lithuanian Commonwealth, and the Russian Empire, "
            "Belarus's modern borders emerged from the divisions of World War I and II. Following the Soviet-Polish War of 1919-1921, the territory "
            "was split, but after the Soviet invasion of Poland in 1939, western Belarusian lands were annexed to the Byelorussian Soviet Socialist "
            "Republic. These administrative borders were finalized after World War II and remained unchanged when the country achieved "
            "sovereignty in 1991, neighboring central nations like <a href=\"/chronicles/be\" style=\"color: #00f2fe; text-decoration: underline; font-weight: 600;\">Belgium</a>."
        ),
        "flagHistory": (
            "The flag of Belarus consists of a red upper horizontal band and a green lower horizontal band, with a vertical red-on-white traditional "
            "Belarusian ornamental pattern along the hoist. Red represents the historical battles of the nation, including the Battle of Grunwald "
            "and World War II; green symbolizes the country's vast forests and fields. The ornamental pattern, designed in 1917 by Matrena Markevich, "
            "represents Belarusian cultural heritage, agricultural labor, and unity. The design was adopted in 1995 following a national referendum, "
            "replacing the white-red-white flag used briefly after independence."
        ),
        "freedomStory": (
            "Belarus declared independence briefly in 1918 as the Belarusian Democratic Republic before being invaded by the Red Army and becoming "
            "a founding republic of the Soviet Union in 1922. During World War II, Belarus suffered catastrophic devastation, losing a third of its "
            "population. As the Soviet Union dissolved, the Supreme Soviet of Belarus declared state sovereignty on July 27, 1990, and full "
            "independence was declared on August 25, 1991, marked by the signing of the Belovezha Accords in December."
        ),
        "challenges": (
            "Belarus struggles under an autocratic political system led by Alexander Lukashenko since 1994, which has suppressed democratic "
            "movements and civil liberties. Following contested elections in 2020, the country went through mass protests and subsequent "
            "crackdowns. This political climate has resulted in severe international sanctions and economic isolation, leaving Belarus highly "
            "dependent on political and economic support from neighboring Russia, while its state-dominated economy faces modernization hurdles."
        ),
        "aiSummary": {
            "geo": "Landlocked East European plain; borders solidified after WWII annexations of former Polish territories.",
            "flag": "Horizontal red and green stripes with a traditional red-on-white hoist embroidery ornament designed in 1917.",
            "freedom": "Independence declared on August 25, 1991, from the USSR, following the signing of the Belovezha Accords.",
            "challenge": "Authoritarian system under Alexander Lukashenko, heavy economic reliance on Russia, and international sanctions."
        },
        "faqs": [
            {
                "question": "What is the origin of the hoist ornament on the Belarusian flag?",
                "answer": "The design is a traditional peasant weaving pattern created in 1917 by Matrena Markevich, representing family and agricultural heritage."
            },
            {
                "question": "What was the significance of the Belovezha Accords?",
                "answer": "Signed in Belarus in December 1991, the accords officially declared the dissolution of the Soviet Union and founded the Commonwealth of Independent States (CIS)."
            }
        ],
        "timeline": [
          { "year": "1918", "event": "The Belarusian Democratic Republic declares independence, which is short-lived due to Soviet invasion." },
          { "year": "1922", "event": "Belarus becomes a founding member of the Union of Soviet Socialist Republics (USSR)." },
          { "year": "1941-1944", "event": "Nazi occupation devastates Belarus, destroying hundreds of towns and villages." },
          { "year": "1991", "event": "Belarus declares full independence from the Soviet Union following the Belovezha Accords." },
          { "year": "2020", "event": "Contested presidential elections spark the largest pro-democracy protests in Belarusian history." }
        ]
    },
    "be": {
        "code": "BE",
        "name": "Belgium",
        "capital": "Brussels",
        "continent": "Europe",
        "population": "11.7 Million",
        "currency": "Euro (EUR)",
        "languages": ["Dutch", "French", "German"],
        "seoTitle": "History of Belgium: Lowland Battlefields, Brabant Lion Flag, and Linguistic Divisions",
        "metaDescription": "Explore the history of Belgium, from the 1830 Belgian Revolution and treaty neutrality to its black, yellow, and red flag and Flemish-Walloon divisions.",
        "mapFormation": (
            "Belgium lies in Western Europe, occupying a low-lying basin along the North Sea that has historically served as a strategic "
            "battlefield for European empires. The country's borders were established following the Belgian Revolution of 1830. Catholic southern "
            "provinces rebelled against the Protestant-led United Kingdom of the Netherlands, creating a new state. The borders were designed to "
            "include the Dutch-speaking Flanders region in the north, French-speaking Wallonia in the south, and the strategic port of Antwerp, "
            "stabilized as a neutral buffer state, sharing historical contexts with other European states like <a href=\"/chronicles/at\" style=\"color: #00f2fe; text-decoration: underline; font-weight: 600;\">Austria</a>."
        ),
        "flagHistory": (
            "The national flag of Belgium is a vertical tricolor of black, yellow, and red. The colors are taken from the coat of arms of the historic "
            "Duchy of Brabant, which depicted a golden lion with red claws and tongue on a black field. The flag was first raised during the Brabant "
            "Revolution of 1789 against Austrian Habsburg rule and was officially adopted in its vertical format on January 23, 1831, shortly after "
            "the country won independence from the Netherlands, symbolizing national heritage and resistance."
        ),
        "freedomStory": (
            "Belgium's revolution was ignited in August 1830 during a performance of a patriotic opera in Brussels, which sparked riots "
            "that quickly spread across the southern provinces. A provisional government declared independence on October 4, 1830, and the Belgian "
            "National Congress drafted a progressive constitution. The independence and perpetual neutrality of the Kingdom of Belgium were "
            "guaranteed by the major European powers in the Treaty of London in 1839, with Leopold I inaugurated as the first King of the Belgians."
        ),
        "challenges": (
            "Belgium's primary contemporary challenges stem from its internal linguistic and cultural divisions. The country is split into "
            "Dutch-speaking Flanders in the north and French-speaking Wallonia in the south, with Brussels serving as a bilingual region. This division "
            "has led to a highly decentralized federal structure and frequent political deadlocks; in 2010-2011, Belgium set a record by going "
            "541 days without an elected government. Managing these linguistic tensions while maintaining economic competitiveness presents a constant challenge."
        ),
        "aiSummary": {
            "geo": "Lowland maritime borders defined in 1830 to carve a buffer state between France, Germany, and the Netherlands.",
            "flag": "Vertical black, yellow, and red bands derived from the lion shield of the medieval Duchy of Brabant.",
            "freedom": "Won from the Netherlands in 1830, with neutrality guaranteed by the 1839 Treaty of London.",
            "challenge": "Deep domestic language polarization (Flemish vs Walloon) leading to complex federal government deadlocks."
        },
        "faqs": [
            {
                "question": "What triggered the Belgian Revolution of 1830?",
                "answer": "Patriotic riots erupted in Brussels in August 1830 after the performance of the opera 'La Muette de Portici', which romanticized rebellion."
            },
            {
                "question": "How many official languages does Belgium have?",
                "answer": "Belgium has three official languages: Dutch (spoken in Flanders), French (spoken in Wallonia), and German (spoken in eastern border communities)."
            }
        ],
        "timeline": [
          { "year": "1789", "event": "The Brabant Revolution leads to a temporary declaration of independence from Austrian Habsburg rule." },
          { "year": "1830", "event": "The Belgian Revolution erupts in Brussels, leading to a declaration of independence on October 4." },
          { "year": "1839", "event": "The Treaty of London recognizes Belgian independence and guarantees its perpetual neutrality." },
          { "year": "1914", "event": "Germany invades neutral Belgium, drawing Great Britain into World War I." },
          { "year": "1993", "event": "Constitutional reforms formally transition Belgium into a federal state divided by language regions." }
        ]
    },
    "bz": {
        "code": "BZ",
        "name": "Belize",
        "capital": "Belmopan",
        "continent": "North America",
        "population": "405,000",
        "currency": "Belize Dollar (BZD)",
        "languages": ["English", "Spanish", "Kriol"],
        "seoTitle": "History of Belize: Logwood Coast Borders, Woodcutters Flag, and Border Disputes",
        "metaDescription": "Discover the detailed history of Belize, from Mayan civilization and British logging colonies to its woodcutters flag and Guatemalan border claims.",
        "mapFormation": (
            "Belize is located on the eastern Caribbean coast of Central America, bordered by Mexico and Guatemala. The country's borders "
            "emerged from 18th-century treaties between Great Britain and Spain. British logwood cutters, known as Baymen, established settlements "
            "along the coast, and treaties defined limits for timber extraction. The southern border along the Sarstoon River was formalized by the "
            "Wyke-Martin Treaty of 1859 between Britain and Guatemala. However, Guatemala later renounced the treaty, claiming the southern half "
            "of Belize, creating a territorial dispute that delayed Belize's path to independence for decades."
        ),
        "flagHistory": (
            "Adopted on September 21, 1981, the flag of Belize features a royal blue field with a thin red horizontal stripe at the top and bottom, "
            "charged with the national coat of arms on a central white disc. The coat of arms depicts two woodcutters (one Mestizo, one of African "
            "descent) holding logging tools next to a mahogany tree, reflecting the country's multi-ethnic population and its historical reliance "
            "on the forestry industry. The red stripes were added at independence to represent the opposition party, symbolizing national unity."
        ),
        "freedomStory": (
            "Formerly known as British Honduras, the colony gained self-governance in 1964 and changed its name to Belize in 1973. Led by George "
            "Cadle Price, the country actively campaigned for sovereignty at the United Nations. Belize achieved full independence from the United "
            "Kingdom on September 21, 1981. However, due to Guatemalan invasion threats, British troops remained in Belize for years after "
            "independence to guarantee its security until relations improved."
        ),
        "challenges": (
            "Belize faces difficulties from natural disasters and economic vulnerabilities. The country lies in the Caribbean hurricane corridor, "
            "requiring the capital to be moved inland from Belize City to Belmopan in 1970 following Hurricane Hattie. The nation also struggles "
            "with high public debt, high youth unemployment, and an ongoing border claim by Guatemala, which was referred to the International "
            "Court of Justice in 2019 for final resolution."
        ),
        "aiSummary": {
            "geo": "Central American Caribbean coast; southern borders defined by the 1859 treaty with Guatemala, which sparked a long territorial claim.",
            "flag": "Royal blue field with red border stripes and a central white disc depicting two woodcutters, symbolizing historical mahogany logging.",
            "freedom": "Formerly British Honduras; achieved sovereignty on September 21, 1981, led by George Cadle Price.",
            "challenge": "High public debt, hurricane vulnerability, and resolving the border dispute with Guatemala via the ICJ."
        },
        "faqs": [
            {
                "question": "Why did Belize change its name from British Honduras?",
                "answer": "The name was changed to Belize in 1973 as a step toward independence, asserting a local identity separate from British colonial rule."
            },
            {
                "question": "What is unique about the two woodcutters on the Belize flag?",
                "answer": "The flag depicts two woodcutters of different racial backgrounds (Mestizo and Afro-Belizean) to represent the country's diverse, multi-ethnic population."
            }
        ],
        "timeline": [
          { "year": "1798", "event": "British settlers defeat a Spanish naval force at the Battle of St. George's Caye, securing control." },
          { "year": "1859", "event": "The Anglo-Guatemalan Treaty defines the borders of British Honduras." },
          { "year": "1970", "event": "Belmopan is established as the new inland capital after Hurricane Hattie devastates Belize City." },
          { "year": "1981", "event": "Belize achieves full independence from the United Kingdom on September 21." },
          { "year": "2019", "event": "Belizeans vote in a referendum to refer the Guatemalan border dispute to the International Court of Justice." }
        ]
    },
    "bj": {
        "code": "BJ",
        "name": "Benin",
        "capital": "Porto-Novo",
        "continent": "Africa",
        "population": "13.4 Million",
        "currency": "West African CFA Franc (XOF)",
        "languages": ["French"],
        "seoTitle": "History of Benin: Dahomey Kingdom Wars, Pan-African Flag, and Democratic Transition",
        "metaDescription": "Explore the history of Benin, from the Kingdom of Dahomey and French conquest to its tricolor flag and Marxist-to-democracy transition.",
        "mapFormation": (
            "Benin is a narrow, north-south oriented country in West Africa, stretching from the Bight of Benin to the Niger River. The country's "
            "borders were established during the French colonial campaigns against the Kingdom of Dahomey in the late 19th century. French military "
            "forces captured Abomey in 1892, merging the historical coastal kingdoms of Porto-Novo and Cotonou with northern tribal territories "
            "bordering Niger and Upper Volta (now Burkina Faso) into a single protectorate. This border design grouped diverse ethnic groups, "
            "principally the Fon in the south and the Bariba in the north, bordering Saharan states like <a href=\"/chronicles/dz\" style=\"color: #00f2fe; text-decoration: underline; font-weight: 600;\">Algeria</a>."
        ),
        "flagHistory": (
            "The flag of Benin features a vertical green band on the hoist side, and two horizontal yellow and red bands on the fly. The colors are "
            "traditional Pan-African colors: green represents hope and the country's southern vegetation; yellow symbolizes the northern savannas; "
            "and red represents the courage of the ancestors who fought for independence. The flag was originally adopted in 1959 and was replaced "
            "during the Marxist-Leninist regime (1975-1990) with a green flag holding a red star, before being restored on August 1, 1990."
        ),
        "freedomStory": (
            "Benin, then known as the Republic of Dahomey, gained independence from France on August 1, 1960, under President Hubert Maga. The "
            "early decades of independence were marked by ethnic factionalism and military coups, culminating in a Marxist-Leninist coup in 1972 "
            "led by Mathieu Kérékou, who renamed the country Benin in 1975. In 1990, facing economic collapse, Kérékou convened a historic "
            "National Conference that led to peaceful transition to multi-party democracy, a model copied across Africa."
        ),
        "challenges": (
            "Benin struggles with economic limitations and security concerns. The national economy is heavily dependent on cotton production and "
            "informal transit trade with neighboring Nigeria, leaving it vulnerable to changes in Nigerian trade policies. Additionally, Benin "
            "faces emerging security challenges along its northern borders due to the spillover of Islamist militant insurgencies operating "
            "in Burkina Faso and Niger, requiring increased defense spending and border patrol efforts."
        ),
        "aiSummary": {
            "geo": "Narrow West African territory; borders established by French colonial campaigns consolidating the Dahomey Kingdom and northern plains.",
            "flag": "Pan-African tricolor: vertical green stripe (hoist) with yellow and red horizontal panels.",
            "freedom": "Gained from France on August 1, 1960; initiated Africa's first successful peaceful 'National Conference' democratic transition in 1990.",
            "challenge": "Cotton dependency, trade barriers with Nigeria, and rising extremist threats on northern borders."
        },
        "faqs": [
            {
                "question": "What was the Kingdom of Dahomey famous for?",
                "answer": "Dahomey was renowned for its highly organized military, its role in the slave trade, and the Dahomey Amazons, an all-female military regiment."
            },
            {
                "question": "Why did Dahomey change its name to Benin?",
                "answer": "Mathieu Kerekou changed the name to Benin in 1975 to pick a name neutral to all ethnic groups, as Dahomey historically only referred to the Fon kingdom."
            }
        ],
        "timeline": [
          { "year": "1892", "event": "French forces defeat King Behanzin of Dahomey, establishing a French colonial protectorate." },
          { "year": "1960", "event": "Dahomey gains independence from France on August 1, with Hubert Maga as president." },
          { "year": "1975", "event": "The country is renamed the People's Republic of Benin under Mathieu Kérékou's Marxist regime." },
          { "year": "1990", "event": "The National Conference leads to democratic reforms, ending Marxist rule and restoring the original flag." },
          { "year": "2016", "event": "Patrice Talon is elected president, initiating major economic and constitutional reforms." }
        ]
    },
    "bt": {
        "code": "BT",
        "name": "Bhutan",
        "capital": "Thimphu",
        "continent": "Asia",
        "population": "780,000",
        "currency": "Bhutanese Ngultrum (BTN)",
        "languages": ["Dzongkha"],
        "seoTitle": "History of Bhutan: Himalayan Isolation, Thunder Dragon Flag, and Gross National Happiness",
        "metaDescription": "Explore the history of Bhutan, from its isolated mountain borders and Drukpa dynasties to its Thunder Dragon flag and modern constitutional democracy.",
        "mapFormation": (
            "Bhutan is a landlocked Himalayan kingdom located between the Tibet Autonomous Region of China and India. Its rugged terrain "
            "is characterized by steep valleys and high peaks rising over 7,000 meters. The country's borders were maintained through geographical "
            "isolationism and strategic treaties. In the 18th and 19th centuries, territorial clashes with British India led to the Treaty of "
            "Sinchula (1865), which ceded the fertile Duars plains to Britain in exchange for an annual subsidy. The northern border with Tibet "
            "remains largely aligned with the high Himalayan watershed, although parts of it are subject to ongoing border negotiations with China, "
            "close to South Asian neighbors like <a href=\"/chronicles/bd\" style=\"color: #00f2fe; text-decoration: underline; font-weight: 600;\">Bangladesh</a>."
        ),
        "flagHistory": (
            "The national flag of Bhutan is divided diagonally from the lower hoist to the upper fly, creating a yellow upper triangle and an "
            "orange lower triangle, charged with a white dragon (Druk) holding jewels in its claws. Yellow represents the secular tradition and the "
            "authority of the King; orange symbolizes the spiritual heritage of Drukpa Buddhism. The white dragon represents the name of the "
            "country (Land of the Thunder Dragon), and its white color symbolizes purity and loyalty, while the jewels represent the wealth and "
            "security of the nation."
        ),
        "freedomStory": (
            "Bhutan has maintained its independence throughout its history, never being colonized. In 1907, Ugyen Wangchuck was elected as the first "
            "hereditary Druk Gyalpo (Dragon King), uniting the country. In 1910, the Treaty of Punakha established British guidance over Bhutan's "
            "foreign relations, which was transferred to India in 1949. Bhutan transitioned from an absolute monarchy to a constitutional parliamentary "
            "democracy in 2008 under King Jigme Khesar Namgyel Wangchuck, who guided the drafting of its first constitution."
        ),
        "challenges": (
            "Bhutan faces challenges in balancing economic modernization with its commitment to cultural preservation and environmental protection, "
            "guided by its philosophy of Gross National Happiness (GNH). The country suffers from high youth unemployment, leading to emigration "
            "of educated citizens to Australia and other countries. Geographically, climate change poses a severe threat, causing glaciers to melt "
            "and creating risks of Glacial Lake Outburst Floods (GLOFs) that could devastate downstream river valleys."
        ),
        "aiSummary": {
            "geo": "Landlocked high-altitude Himalayan topography; borders defined by physical mountain crests and colonial treaty cessions.",
            "flag": "Diagonally divided yellow (monarchy) and orange (Buddhism) with the white Druk (Thunder Dragon) clutching wealth jewels.",
            "freedom": "Never colonized; transitioned peacefully from an absolute monarchy to a constitutional democracy in 2008.",
            "challenge": "Demographic brain drain of educated youth, and glacial melt floods threatening valley agriculture."
        },
        "faqs": [
            {
                "question": "What is Gross National Happiness (GNH)?",
                "answer": "GNH is Bhutan's signature development philosophy, prioritizing sustainable progress, cultural preservation, environmental protection, and good governance over raw GDP."
            },
            {
                "question": "Why is the dragon on Bhutan's flag white?",
                "answer": "The white color of the Druk (Thunder Dragon) represents purity, patriotism, and the diverse ethnic and linguistic groups uniting the country."
            }
        ],
        "timeline": [
          { "year": "1865", "event": "The Treaty of Sinchula concludes the Bhutan War, ceding the Duars plains to British India." },
          { "year": "1907", "event": "Ugyen Wangchuck is crowned the first hereditary King of Bhutan, establishing the House of Wangchuck." },
          { "year": "1949", "event": "Bhutan signs a treaty with independent India, cementing friendship and diplomatic coordination." },
          { "year": "2008", "event": "Bhutan transitions to a constitutional monarchy and holds its first democratic parliamentary elections." },
          { "year": "2020", "event": "Emigration rates rise as young Bhutanese leave Thimphu in search of opportunities abroad." }
        ]
    },

    # THIRD BATCH OF 10 COUNTRIES (BO to KH)
    "bo": {
        "code": "BO",
        "name": "Bolivia",
        "capital": "Sucre",
        "continent": "South America",
        "population": "12.2 Million",
        "currency": "Bolivian Boliviano (BOB)",
        "languages": ["Spanish", "Quechua", "Aymara", "Guaraní"],
        "seoTitle": "History of Bolivia: Landlocked Andes, Tricolor Flag, and Sucre Liberation",
        "metaDescription": "Explore the history of Bolivia, from losing its coast in the War of the Pacific to its red, yellow, green flag and independence secured by Sucre.",
        "mapFormation": (
            "Bolivia is a landlocked nation dominated by the high peaks of the Andes Mountains in the west and the expansive Amazon basin "
            "in the east. Evolving from the colonial Spanish Audiencia of Charcas, Bolivia's boundaries were severely reduced by neighboring "
            "nations in post-colonial conflicts. Most notably, the country lost its entire Pacific coastline (the Litoral Department) to Chile "
            "during the War of the Pacific (1879-1884), leaving it landlocked. In the 20th century, the Chaco War (1932-1935) with Paraguay led to "
            "the loss of a large portion of the southern Gran Chaco region. Today, the country maintains borders with five South American states, "
            "including <a href=\"/chronicles/ar\" style=\"color: #00f2fe; text-decoration: underline; font-weight: 600;\">Argentina</a> and <a href=\"/chronicles/br\" style=\"color: #00f2fe; text-decoration: underline; font-weight: 600;\">Brazil</a>."
        ),
        "flagHistory": (
            "The national flag of Bolivia consists of three equal horizontal bands of red, yellow, and green, with the national coat of arms "
            "in the center of the state flag. The colors hold symbolic meanings: red represents the bravery of Bolivian soldiers and the blood "
            "shed for independence; yellow symbolizes the country's rich mineral resources; and green represents the fertility of the land and "
            "its agricultural potential. The central coat of arms depicts Mount Potosí (the famous silver mountain), a llama (the national animal), "
            "a sheaf of wheat, and a condor, representing the history, wildlife, and natural wealth of the nation, officially adopted in 1851."
        ),
        "freedomStory": (
            "Bolivia's struggle for freedom was one of the longest in South America, starting with regional rebellions in Sucre and La Paz in 1809 "
            "and lasting sixteen years. The liberation campaign was successfully concluded under the leadership of General Antonio José de Sucre "
            "and the Liberator Simón Bolívar during the Spanish-American wars of independence. On August 6, 1825, the assembly of provinces declared "
            "independence, officially naming the new republic 'Bolivia' in honor of Simón Bolívar, who drafted its first constitution and served as "
            "its first president."
        ),
        "challenges": (
            "Bolivia struggles with socio-economic disparities and landlocked economic disadvantages. The country has the highest indigenous "
            "population percentage in South America, and addressing historical inequalities between indigenous communities and the urban elite "
            "remains a major task. Economically, Bolivia is heavily dependent on natural gas, lithium, and mineral exports, making it vulnerable "
            "to commodity price drops. The lack of direct ocean access increases shipping costs, hindering international trade competitiveness, "
            "while political polarization frequently triggers strikes and blockades."
        ),
        "aiSummary": {
            "geo": "Landlocked Andean territory; lost its Pacific coastline to Chile in the 1879 War of the Pacific.",
            "flag": "Horizontal red (valiance), yellow (mineral wealth), and green (crops) stripes with a central coat of arms.",
            "freedom": "Sovereignty declared on August 6, 1825, named after Simon Bolivar, led by General Antonio Jose de Sucre.",
            "challenge": "High transport costs from landlocked isolation, economic commodity dependence, and indigenous social reforms."
        },
        "faqs": [
            {
                "question": "Why does Bolivia have two capitals?",
                "answer": "Sucre is the constitutional and judicial capital, while La Paz is the seat of government and administrative capital."
            },
            {
                "question": "What is the significance of the Wiphala flag in Bolivia?",
                "answer": "The Wiphala is a square emblem representing the indigenous peoples of the Andes, recognized as a co-official national symbol alongside the tricolor."
            }
        ],
        "timeline": [
          { "year": "1825", "event": "Bolivia declares independence from Spain on August 6, named in honor of Simon Bolivar." },
          { "year": "1879-1884", "event": "The War of the Pacific with Chile leaves Bolivia landlocked after losing its coastal territory." },
          { "year": "1932-1935", "event": "The Chaco War with Paraguay results in heavy casualties and territorial loss in the south." },
          { "year": "2006", "event": "Evo Morales is elected as the first indigenous president, initiating major social and constitutional reforms." }
        ]
    },
    "ba": {
        "code": "BA",
        "name": "Bosnia and Herzegovina",
        "capital": "Sarajevo",
        "continent": "Europe",
        "population": "3.2 Million",
        "currency": "Convertible Mark (BAM)",
        "languages": ["Bosnian", "Croatian", "Serbian"],
        "seoTitle": "History of Bosnia and Herzegovina: Dayton Accords Borders, Star Flag, and Civil War History",
        "metaDescription": "Discover the detailed history of Bosnia and Herzegovina. Explore its complex Dayton borders, the blue and yellow star flag, and the path to independence.",
        "mapFormation": (
            "Bosnia and Herzegovina occupies a mountainous, heart-shaped territory in the western Balkan Peninsula, bordered by Croatia, Serbia, "
            "and Montenegro, with a tiny coastline on the Adriatic Sea. The country's borders have deep roots in medieval principalities and the "
            "Ottoman administrative division (Sanjak of Bosnia). In the 20th century, its borders were preserved as a constituent republic within "
            "socialist Yugoslavia. Following its declaration of independence in 1992, the country went through a brutal civil war. The borders were "
            "reaffirmed and structured by the US-sponsored Dayton Peace Agreement of 1995, which divided the internal territory into two highly "
            "autonomous entities—the Federation of Bosnia and Herzegovina and the Republika Srpska—linked by a weak central government."
        ),
        "flagHistory": (
            "The national flag of Bosnia and Herzegovina features a dark blue field with a yellow right triangle in the center and a diagonal row "
            "of white seven-pointed stars along the hypotenuse. The flag was designed by an international commission led by the United Nations "
            "and adopted in 1998 to replace the previous coat of arms flag, which was rejected by ethnic factions. The three points of the yellow "
            "triangle represent the three main ethnic groups (Bosniaks, Croats, and Serbs) and the general geographical shape of the country; the "
            "blue color and white stars represent Europe, symbolizing hope for peace and integration."
        ),
        "freedomStory": (
            "Bosnia and Herzegovina held a national referendum on independence on February 29 and March 1, 1992, following the secession of Croatia "
            "and Slovenia from Yugoslavia. The majority of Bosniaks and Croats voted for sovereignty, leading to a declaration of independence on "
            "March 1. However, the Bosnian Serb population boycotted the referendum and, supported by neighboring Serbia, launched a military campaign, "
            "initiating a devastating three-year civil war marked by siege, ethnic cleansing, and mass casualties. The war ended in December 1995 "
            "with the signing of the Dayton Peace Agreement, establishing the modern sovereign state framework."
        ),
        "challenges": (
            "Bosnia and Herzegovina's primary challenge is its highly complex and fragmented governance structure. The country is run by a "
            "three-member presidency representing the three ethnic groups, which frequently leads to legislative gridlock and blocks structural "
            "reforms. Ethnic polarization remains high, with occasional secessionist threats from the Republika Srpska. This political instability "
            "has resulted in slow economic growth, high youth unemployment, and a massive demographic decline as young professionals emigrate to "
            "the European Union in search of better living standards."
        ),
        "aiSummary": {
            "geo": "Mountainous Balkan heartland; partitioned internally by the 1995 Dayton Accords into two autonomous ethnic administrative zones.",
            "flag": "Blue field with a yellow triangle (three main ethnic groups) and diagonal stars symbolizing European integration aspirations.",
            "freedom": "Seceded from Yugoslavia in 1992; independence secured after the Dayton Accords ended a devastating civil war in 1995.",
            "challenge": "Highly fragmented presidency leading to gridlocks, ethnic polarization, and massive professional brain drain."
        },
        "faqs": [
            {
                "question": "What did the Dayton Peace Agreement achieve?",
                "answer": "Signed in 1995, it ended the Bosnian War and created the current federal constitutional structure, dividing governance between Bosniaks, Croats, and Serbs."
            },
            {
                "question": "Why are there stars cut off at the edges of the flag?",
                "answer": "The stars are rendered as infinite, cut off at the top and bottom, representing an endless alignment with European ideals of unity."
            }
        ],
        "timeline": [
          { "year": "1463", "event": "The Ottoman Empire annexes Bosnia, beginning four centuries of Islamic and Turkish cultural influence." },
          { "year": "1908", "event": "The Austro-Hungarian Empire annexes Bosnia, triggering tensions with Serbia and Russia." },
          { "year": "1992", "event": "Bosnia and Herzegovina declares independence from Yugoslavia, sparking a devastating civil war." },
          { "year": "1995", "event": "The Dayton Peace Agreement is signed, ending the war and establishing the modern federal structure." }
        ]
    },
    "bw": {
        "code": "BW",
        "name": "Botswana",
        "capital": "Gaborone",
        "continent": "Africa",
        "population": "2.6 Million",
        "currency": "Botswana Pula (BWP)",
        "languages": ["English", "Tswana"],
        "seoTitle": "History of Botswana: Kalahari Desert, Zebra Stripes Flag, and Diamond Success",
        "metaDescription": "Explore the history of Botswana, from the Bechuanaland Protectorate to its peaceful independence, zebra flag, and diamond-led economic growth.",
        "mapFormation": (
            "Botswana is a landlocked country in Southern Africa, dominated by the flat plateaus of the Kalahari Desert, which covers 70% of its "
            "territory. The country's borders were established during the Scramble for Africa in the late 19th century. In 1885, at the request of "
            "Tswana chiefs who feared Boer and German expansion, Great Britain established the Bechuanaland Protectorate. British authorities "
            "drew boundaries along longitudinal and latitudinal lines, separating the protectorate from German South West Africa (Namibia) and the "
            "Transvaal Republic (South Africa). These colonial borders were preserved when the nation achieved full sovereignty in 1966, encompassing "
            "vast arid scrublands and the unique Okavango Delta, bordering regional neighbors like <a href=\"/chronicles/ao\" style=\"color: #00f2fe; text-decoration: underline; font-weight: 600;\">Angola</a>."
        ),
        "flagHistory": (
            "Adopted on September 30, 1966, the flag of Botswana features a light blue field with a black horizontal stripe in the center, bordered "
            "by two thin white stripes. Light blue represents water and rain, a vital resource in the arid Kalahari symbolized by the national "
            "currency and motto 'Pula' (which means rain). The central black stripe and white borders represent the zebra, the national animal of "
            "Botswana, and symbolize racial harmony and cooperation between the black majority and white minority populations, intentionally "
            "contrasting with the apartheid regime of neighboring South Africa."
        ),
        "freedomStory": (
            "Unlike many African colonies, Botswana achieved independence from the United Kingdom peacefully. Under the leadership of Seretse Khama, "
            "the founder of the Botswana Democratic Party (BDP), the country drafted a constitution and held democratic elections. On September 30, "
            "1966, the Bechuanaland Protectorate officially became the independent Republic of Botswana, with Seretse Khama elected as its first "
            "President. The country established a stable parliamentary democracy, avoiding the civil wars and military dictatorship cycles that "
            "affected other post-colonial African states."
        ),
        "challenges": (
            "Despite being one of Africa's most stable and prosperous economies, Botswana faces challenges. The economy is heavily dependent on "
            "diamond exports, which generate the majority of government revenues, leaving it vulnerable to changes in global diamond demand. "
            "Additionally, Botswana has one of the world's highest HIV/AIDS prevalence rates, placing a major strain on its healthcare system. "
            "Environmentally, the country struggles with severe water scarcity, recurring droughts, and the threats of climate change affecting "
            "its wildlife and rural agricultural populations."
        ),
        "aiSummary": {
            "geo": "Landlocked Kalahari desert plateau; boundaries established in 1885 under the Bechuanaland Protectorate treaty system.",
            "flag": "Light blue field (rain and ocean) with a central black band bordered in white, representing racial unity and the national zebra.",
            "freedom": "Sovereignty won peacefully from Great Britain on September 30, 1966, under democracy pioneer Seretse Khama.",
            "challenge": "Heavy reliance on diamond exports, high HIV prevalence rates, and severe desert droughts."
        },
        "faqs": [
            {
                "question": "What is the meaning of the word 'Pula' in Botswana?",
                "answer": "Pula is the national currency, the national motto, and the word for 'rain' or 'blessing', highlighting the value of water in the Kalahari."
            },
            {
                "question": "How did Botswana avoid post-colonial conflicts?",
                "answer": "Botswana maintained democratic institutions, utilized diamond revenues to invest in education/infrastructure, and promoted racial harmony."
            }
        ],
        "timeline": [
          { "year": "1885", "event": "Great Britain establishes the Bechuanaland Protectorate to protect Tswana territories." },
          { "year": "1966", "event": "Botswana gains full independence from the United Kingdom, with Seretse Khama as president." },
          { "year": "1967", "event": "Vast diamond deposits are discovered at Orapa, transforming the national economy." },
          { "year": "2000", "event": "Botswana launches one of Africa's most successful antiretroviral treatment programs to combat HIV/AIDS." }
        ]
    },
    "br": {
        "code": "BR",
        "name": "Brazil",
        "capital": "Brasília",
        "continent": "South America",
        "population": "215.3 Million",
        "currency": "Brazilian Real (BRL)",
        "languages": ["Portuguese"],
        "seoTitle": "History of Brazil: Treaty of Tordesillas, Starry Globe Flag, and Pedro I Independence",
        "metaDescription": "Discover the detailed history of Brazil, from the Treaty of Tordesillas and Portuguese empire to its starry globe flag and republic transition.",
        "mapFormation": (
            "Brazil is the largest country in South America, occupying nearly half of the continent. Its borders were initiated by the Treaty of "
            "Tordesillas in 1494, which divided South America between Spain and Portugal. During the colonial era, Portuguese explorers, known as "
            "Bandeirantes, pushed deep into the interior beyond the treaty line, claiming the vast Amazon basin and central plateaus. These borders "
            "were solidified through subsequent treaties, particularly the Treaty of Madrid in 1750, which recognized Portuguese sovereignty over "
            "the expanded territories. Brazil's international boundaries were finalized in the late 19th and early 20th centuries through peaceful "
            "diplomatic negotiations led by the Baron of Rio Branco, establishing a continental landmass bordering ten South American states, "
            "including <a href=\"/chronicles/ar\" style=\"color: #00f2fe; text-decoration: underline; font-weight: 600;\">Argentina</a> and <a href=\"/chronicles/bo\" style=\"color: #00f2fe; text-decoration: underline; font-weight: 600;\">Bolivia</a>."
        ),
        "flagHistory": (
            "The flag of Brazil features a green field with a yellow rhombus in the center. Inside the rhombus is a blue celestial globe depicting "
            "a starry sky, crossed by a white curved band with the national motto 'Ordem e Progresso' (Order and Progress). Green represents the "
            "royal House of Braganza (of Brazil's first emperor) and the vast Amazon forests; yellow represents the House of Habsburg (of Empress "
            "Leopoldina) and the country's rich gold resources. The starry globe depicts the night sky over Rio de Janeiro on November 15, 1889—the "
            "day the republic was proclaimed—with 27 stars representing the federal states and district, officially adopted in 1889."
        ),
        "freedomStory": (
            "Brazil's path to freedom differed from neighboring Spanish colonies. In 1808, fleeing the Napoleonic invasion of Portugal, the Portuguese "
            "royal family transferred the capital of the empire to Rio de Janeiro. When King John VI returned to Lisbon in 1821, he left his son, "
            "Prince Pedro, as regent. Facing demands from Lisbon to reduce Brazil to colonial status, Prince Pedro declared independence on September 7, "
            "1822 (the Grito de Ipiranga), establishing the independent Empire of Brazil and crowning himself Emperor Dom Pedro I. The monarchy lasted "
            "until November 15, 1889, when a military coup deposed Emperor Dom Pedro II and declared the country a republic."
        ),
        "challenges": (
            "Brazil struggles with socio-economic disparities and environmental issues. The country faces severe income inequality, resulting in "
            "widespread urban slums, known as favelas, and high crime rates. The political arena is marked by polarization and corruption "
            "scandals that have impacted public trust in democratic institutions. Globally, Brazil faces intense pressure to address the "
            "deforestation and destruction of the Amazon Rainforest, which is critical for global climate regulation, alongside the need to improve "
            "education and healthcare infrastructure in remote rural areas."
        ),
        "aiSummary": {
            "geo": "Continental South American territory; boundaries expanded beyond the 1494 Tordesillas line by Portuguese explorers.",
            "flag": "Green field and yellow rhombus with a central starry globe portraying Rio's sky in 1889 and the motto 'Order and Progress'.",
            "freedom": "Declared by Prince Pedro I in 1822 as an Empire; transitioned to a federal republic after a coup in 1889.",
            "challenge": "Severe income inequality in urban favelas, political corruption, and deforestation in the Amazon basin."
        },
        "faqs": [
            {
                "question": "What is the meaning of the stars on the Brazilian flag?",
                "answer": "The 27 stars represent the 26 states and the Federal District, arranged in constellations visible from Rio de Janeiro on November 15, 1889."
            },
            {
                "question": "Who signed the law that ended slavery in Brazil?",
                "answer": "Princess Isabel signed the Golden Law (Lei Aurea) on May 13, 1888, making Brazil the last nation in the Western Hemisphere to abolish slavery."
            }
        ],
        "timeline": [
          { "year": "1500", "event": "Portuguese explorer Pedro Álvares Cabral arrives on the coast of Bahia, claiming the land for Portugal." },
          { "year": "1808", "event": "The Portuguese royal family transfers the imperial court to Rio de Janeiro, escaping Napoleonic wars." },
          { "year": "1822", "event": "Prince Dom Pedro I declares Brazilian independence from Portugal, establishing the Empire of Brazil." },
          { "year": "1888", "event": "Princess Isabel signs the Golden Law (Lei Áurea), officially abolishing slavery in Brazil." },
          { "year": "1889", "event": "A military coup deposes Emperor Dom Pedro II and establishes the Republic of the United States of Brazil." }
        ]
    },
    "bn": {
        "code": "BN",
        "name": "Brunei",
        "capital": "Bandar Seri Begawan",
        "continent": "Asia",
        "population": "450,000",
        "currency": "Brunei Dollar (BND)",
        "languages": ["Malay"],
        "seoTitle": "History of Brunei: Empire of Borneo, Red Crest Flag, and Sovereign Sultanate",
        "metaDescription": "Explore the history of Brunei, from its medieval empire on Borneo to the British protectorate era, its red crest flag, and absolute monarchy.",
        "mapFormation": (
            "Brunei is a small sultanate located on the northern coast of the island of Borneo, divided into two non-contiguous sections surrounded "
            "by the Malaysian state of Sarawak and the South China Sea. During the 15th and 16th centuries, the Bruneian Empire was a powerful "
            "maritime state controlling all of Borneo and parts of the Philippine islands. However, the empire's borders were steadily reduced by "
            "European colonization, Spanish attacks, and territorial concessions made to James Brooke (the White Rajah of Sarawak) and the British "
            "North Borneo Company. In 1888, to prevent total annexation, the Sultan signed a protectorate treaty with Great Britain, locking the "
            "remaining territory into its current small borders, not far from Southeast Asian neighbors like <a href=\"/chronicles/kh\" style=\"color: #00f2fe; text-decoration: underline; font-weight: 600;\">Cambodia</a>."
        ),
        "flagHistory": (
            "The national flag of Brunei features a yellow field with diagonal black and white stripes, charged in the center with the red national "
            "crest. Yellow represents the Sultan, the traditional color of royalty in Southeast Asia; the diagonal stripes represent the chief "
            "ministers (wazirs) who signed the historic agreement with Britain. The red crest, added in 1959, contains a crescent representing Islam, "
            "a royal umbrella representing the monarchy, hands representing benevolence, and wings representing justice, officially adopted in 1959."
        ),
        "freedomStory": (
            "Brunei remained a British protectorate for nearly a century, with British residents managing administration and foreign policy while "
            "the Sultan retained authority over local customs and religion. Following the discovery of rich oil deposits in 1929, Brunei chose not "
            "to join the Federation of Malaysia in 1963, preferring to remain under British protection. Under Sultan Hassanal Bolkiah, Brunei "
            "negotiated a transition to independence. On January 1, 1984, the British protectorate ended, and Brunei officially declared its full "
            "independence, establishing an absolute Islamic monarchy (Melayu Islam Beraja)."
        ),
        "challenges": (
            "Brunei faces economic and geopolitical challenges. The country's economy is heavily dependent on oil and natural gas revenues, which "
            "account for over 90% of its exports and fund its generous state welfare system (including free healthcare and education). This dependency "
            "makes the economy vulnerable to depleting reserves and global shifts toward renewable energy. Additionally, the government faces "
            "international criticism over its legal reforms, including the implementation of strict Sharia penal codes."
        ),
        "aiSummary": {
            "geo": "Small Borneo coast enclave split in two parts; borders reduced by colonial concessions before 1888 British protectorate treaty.",
            "flag": "Yellow royal background with black-white diagonal bands (ministers) and a central red Islamic monarchy crest.",
            "freedom": "Sovereignty achieved on January 1, 1984, ending 96 years of British protectorate administration under the Sultan's guidance.",
            "challenge": "Diversifying a state-welfare economy away from depleting hydrocarbon oil reserves."
        },
        "faqs": [
            {
                "question": "Who are the Wazirs represented on the flag?",
                "answer": "The diagonal black and white stripes represent Brunei's two chief traditional ministers who helped govern the country during treaty eras."
            },
            {
                "question": "What is Brunei's state philosophy?",
                "answer": "Brunei operates under 'Melayu Islam Beraja' (Malay Islamic Monarchy), which blends Malay culture, Islamic values, and monarchical rule."
            }
        ],
        "timeline": [
          { "year": "1521", "event": "Ferdinand Magellan's expedition visits Brunei, recording a wealthy and powerful maritime empire." },
          { "year": "1841", "event": "Sultan cedes Sarawak to British adventurer James Brooke, beginning the reduction of Brunei's territory." },
          { "year": "1888", "event": "Brunei signs a protectorate treaty with Great Britain, securing its remaining borders." },
          { "year": "1929", "event": "Vast commercial oil deposits are discovered at Seria, transforming the sultanate's wealth." },
          { "year": "1984", "event": "Brunei achieves full independence from the United Kingdom on January 1." }
        ]
    },
    "bg": {
        "code": "BG",
        "name": "Bulgaria",
        "capital": "Sofia",
        "continent": "Europe",
        "population": "6.4 Million",
        "currency": "Bulgarian Lev (BGN)",
        "languages": ["Bulgarian"],
        "seoTitle": "History of Bulgaria: Balkan Border Shifts, Tricolor Flag, and Ottoman Liberation",
        "metaDescription": "Explore the history of Bulgaria, from the medieval kingdoms and Ottoman conquest to its white, green, red flag and 1908 independence.",
        "mapFormation": (
            "Bulgaria is situated in the eastern Balkan Peninsula, bordering the Black Sea to the east. Evolving from the medieval Bulgarian "
            "Empires, which dominated the Balkans, the country's modern borders were shaped by the collapse of the Ottoman Empire. Following the "
            "Russo-Turkish War of 1877-1878, the Treaty of Berlin (1878) created an autonomous Bulgarian principality but restricted its borders, "
            "excluding Macedonia and Eastern Rumelia. Eastern Rumelia was unified with Bulgaria in 1885, and subsequent border changes occurred "
            "following the Balkan Wars and World War I, establishing the modern map bordering five nations, including <a href=\"/chronicles/al\" style=\"color: #00f2fe; text-decoration: underline; font-weight: 600;\">Albania</a> (via near-Balkan regions)."
        ),
        "flagHistory": (
            "The national flag of Bulgaria is a horizontal tricolor of white, green, and red. White represents peace, love, and freedom; green "
            "symbolizes the agriculture, lush forests, and fertility of the land; and red represents the blood shed by national heroes during the "
            "struggle for independence. The flag was originally adopted in 1879 by the Tarnovo Constitution following the country's liberation "
            "from Ottoman rule. It was modified during the communist era (1947-1990) to include the state emblem, before being restored to its "
            "original design in 1990."
        ),
        "freedomStory": (
            "Bulgaria was under Ottoman rule for nearly five centuries (1396-1878), during which its cultural and religious institutions were "
            "restricted. The national revival in the 19th century led to the April Uprising of 1876, which was suppressed by Ottoman forces. The "
            "resulting international outcry led to the Russo-Turkish War, which liberated Bulgaria. On October 5, 1908, Bulgaria officially "
            "declared its full independence from the Ottoman Empire, upgrading its status from an autonomous principality to an independent "
            "kingdom under Tsar Ferdinand I."
        ),
        "challenges": (
            "Bulgaria faces severe demographic and economic challenges. The country has one of the fastest-declining populations in the world, "
            "driven by low birth rates and high emigration of young professionals to Western Europe. Economically, Bulgaria remains the poorest "
            "member state of the European Union, struggling with high rates of corruption, organized crime, and political instability, which "
            "have led to frequent snap elections and slowed its integration into the Schengen Area and Eurozone."
        ),
        "aiSummary": {
            "geo": "Balkan Black Sea coastline; borders shaped by the post-Ottoman 1878 Treaty of Berlin and subsequent Balkan War treaties.",
            "flag": "Horizontal white (peace/liberty), green (farming/land), and red (valiance/martyrs' blood) tricolor.",
            "freedom": "Declared full sovereignty on October 5, 1908, ending nominal Ottoman suzerainty under Tsar Ferdinand I.",
            "challenge": "Poorest EU member state, severe corruption hurdles, and one of the world's fastest-declining populations."
        },
        "faqs": [
            {
                "question": "What was the Tarnovo Constitution?",
                "answer": "Adopted in 1879, it was Bulgaria's first constitution, established as one of the most progressive and democratic charters in Europe at the time."
            },
            {
                "question": "Why did Bulgaria change the order of the traditional Slavic colors?",
                "answer": "Bulgaria replaced the blue stripe of the Pan-Slavic tricolor with green to represent its agricultural wealth and natural landscape."
            }
        ],
        "timeline": [
          { "year": "681 AD", "event": "The First Bulgarian Empire is established, recognized by the Byzantine Empire." },
          { "year": "1396", "event": "The Ottoman Empire conquers Bulgaria, initiating nearly five centuries of Ottoman rule." },
          { "year": "1878", "event": "The Treaty of San Stefano and Treaty of Berlin establish an autonomous Bulgarian principality." },
          { "year": "1908", "event": "Bulgaria declares full independence from the Ottoman Empire on October 5." },
          { "year": "2007", "event": "Bulgaria officially joins the European Union, initiating structural economic reforms." }
        ]
    },
    "bf": {
        "code": "BF",
        "name": "Burkina Faso",
        "capital": "Ouagadougou",
        "continent": "Africa",
        "population": "22.6 Million",
        "currency": "West African CFA Franc (XOF)",
        "languages": ["French"],
        "seoTitle": "History of Burkina Faso: Upper Volta Borders, Sankara Revolution, and Flag History",
        "metaDescription": "Read the history of Burkina Faso, from French Upper Volta colonization to Thomas Sankara's revolution, the name change, and its red and green flag.",
        "mapFormation": (
            "Burkina Faso is a landlocked nation situated in the heart of West Africa's Sahel region. Evolving from the historic Mossi kingdoms, "
            "the country's borders were drawn by French colonial authorities in the late 19th and early 20th centuries. French forces established the "
            "colony of French Upper Volta in 1919. The colony was dismantled in 1932, dividing its territory between Ivory Coast, Mali, and Niger, "
            "before being restored to its current borders in 1947 to maintain administrative unity. These landlocked borders encompass flat "
            "savanna plains and dry Sahelian plateaus, bordering six nations, including West African neighbors like <a href=\"/chronicles/bj\" style=\"color: #00f2fe; text-decoration: underline; font-weight: 600;\">Benin</a>."
        ),
        "flagHistory": (
            "The flag of Burkina Faso features two horizontal bands of red on top and green on the bottom, with a central yellow five-pointed star. "
            "Red represents the socialist revolution and the blood shed during the national struggle; green symbolizes the natural wealth, "
            "agriculture, and forests of the country. The yellow star represents the guiding light of the revolution and progress. The flag was "
            "adopted on August 4, 1984, by revolutionary leader Thomas Sankara to replace the flag of Upper Volta, reflecting a break with the "
            "colonial past."
        ),
        "freedomStory": (
            "The colony of French Upper Volta gained independence from France on August 5, 1960, under President Maurice Yameogo. The post-colonial "
            "era was characterized by military coups and economic stagnation. In 1983, a revolutionary government led by Captain Thomas Sankara "
            "took power. Sankara launched major social and economic reforms, promoted self-reliance, and changed the country's name from Upper Volta "
            "to Burkina Faso (meaning 'Land of Incorruptible People') in 1984, before he was assassinated in a coup in 1987."
        ),
        "challenges": (
            "Burkina Faso faces severe security and humanitarian crises. The country has been severely affected by Islamist militant insurgencies "
            "spilling over from neighboring Mali since 2015, resulting in thousands of civilian casualties and displacing over 2 million people. "
            "This security crisis has led to severe political instability, including two military coups in 2022. Additionally, Burkina Faso "
            "struggles with high poverty rates, water scarcity, and desertification due to climate change."
        ),
        "aiSummary": {
            "geo": "Landlocked Sahelian plains; colonial borders dismantled in 1932 and reconstituted in 1947 to consolidate French administrative control.",
            "flag": "Horizontal red (socialist revolution) and green (nature) panels with a central yellow star of guiding progress.",
            "freedom": "Sovereignty won from France in 1960; named Burkina Faso in 1984 by revolutionary leader Thomas Sankara.",
            "challenge": "Severe Sahelian jihadist insurgency, political coups, and water scarcity from climate desertification."
        },
        "faqs": [
            {
                "question": "What does the name 'Burkina Faso' mean?",
                "answer": "It translates to 'Land of the Incorruptible (or Upright) People', combining words from the local Mossi and Dyula languages."
            },
            {
                "question": "Who was Thomas Sankara?",
                "answer": "He was a charismatic Marxist revolutionary leader who governed from 1983 to 1987, known as 'Africa's Che Guevara' for his progressive anti-colonial policies."
            }
        ],
        "timeline": [
          { "year": "1896", "event": "French forces capture Ouagadougou, establishing a colonial protectorate over the Mossi kingdoms." },
          { "year": "1919", "event": "France establishes the colony of French Upper Volta, delineating its administrative borders." },
          { "year": "1960", "event": "Upper Volta gains independence from France on August 5 under President Maurice Yameogo." },
          { "year": "1984", "event": "Thomas Sankara renames the country Burkina Faso and adopts the red-green flag with the yellow star." },
          { "year": "2022", "event": "Two successive military coups occur in January and September, driven by security crises." }
        ]
    },
    "bi": {
        "code": "BI",
        "name": "Burundi",
        "capital": "Gitega",
        "continent": "Africa",
        "population": "12.8 Million",
        "currency": "Burundian Franc (BIF)",
        "languages": ["Kirundi", "French"],
        "seoTitle": "History of Burundi: Great Lakes Plateau, Saltire Star Flag, and Post-Colonial Transition",
        "metaDescription": "Explore the history of Burundi, from the ancient Tutsi-Hutu kingdom and Belgian mandate to its white saltire flag and path to independence.",
        "mapFormation": (
            "Burundi is a small, mountainous landlocked country in the Great Lakes region of East Africa, bordered by Rwanda, Tanzania, and the "
            "Democratic Republic of the Congo, with a coastline along Lake Tanganyika. Originally a centralized kingdom under a hereditary monarch "
            "(Mwami), Burundi's borders were preserved during European colonization. Following the Berlin Conference, Germany annexed the region "
            "as part of German East Africa, which was later transferred to Belgium as the League of Nations mandate of Ruanda-Urundi after World War I. "
            "In 1962, Belgian authorities separated the territory, establishing the sovereign borders of modern Burundi, neighboring Central African states like "
            "<a href=\"/chronicles/ao\" style=\"color: #00f2fe; text-decoration: underline; font-weight: 600;\">Angola</a>."
        ),
        "flagHistory": (
            "The national flag of Burundi features a white saltire (diagonal cross) dividing the field into red upper and lower panels and green "
            "hoist and fly panels. In the center is a white disc holding three red six-pointed stars outlined in green. Red represents the blood "
            "shed during the struggle for freedom; green symbolizes hope and progress; and white represents peace. The three central stars symbolize "
            "the three constituent ethnic groups of Burundi (Hutu, Tutsi, and Twa) and the national motto: 'Unithe, Travail, Progres' (Unity, "
            "Work, Progress), adopted on November 28, 1967."
        ),
        "freedomStory": (
            "Burundi transitioned to independence in the early 1960s, led by Prince Louis Rwagasore, a nationalist leader who united Hutus and Tutsis "
            "under the UPRONA party. Rwagasore was assassinated in October 1961, just before the country won independence. On July 1, 1962, Burundi "
            "officially declared its independence from Belgium as a constitutional monarchy under King Mwambutsa IV. However, the monarchy was "
            "overthrown in 1966, initiating decades of ethnic civil war and military dictatorships."
        ),
        "challenges": (
            "Burundi is one of the poorest nations in the world, suffering from a high population density, economic stagnation, and lack of direct "
            "sea access. The country has been severely impacted by recurring ethnic violence and a major civil war (1993-2005) that caused "
            "mass displacement. Today, the nation faces challenges in developing its agricultural economy, improving infrastructure, and managing "
            "fiscal deficits, with a significant percentage of its population relying on subsistence farming."
        ),
        "aiSummary": {
            "geo": "Mountainous Great Lakes enclave; historical borders of the Burundi Kingdom separated from Rwanda by Belgian authorities in 1962.",
            "flag": "White diagonal cross (saltire) dividing red and green panels, with three central stars symbolizing ethnic groups and national unity.",
            "freedom": "Won from Belgium on July 1, 1962, as a kingdom, shortly after the assassination of Prince Louis Rwagasore.",
            "challenge": "High poverty index, geographic isolation, land fragmentation, and rebuilding post-civil war social structures."
        },
        "faqs": [
            {
                "question": "Who was Prince Louis Rwagasore?",
                "answer": "He was a national hero and crown prince who founded the multi-ethnic UPRONA party to secure independence, assassinated in 1961."
            },
            {
                "question": "What do the three stars on the flag of Burundi represent?",
                "answer": "They represent the three national ethnic groups (Hutu, Tutsi, and Twa) as well as the national motto: Unity, Work, Progress."
            }
        ],
        "timeline": [
          { "year": "1899", "event": "Germany annexes the Kingdom of Burundi, incorporating it into German East Africa." },
          { "year": "1916", "event": "Belgian forces occupy Burundi during WWI, establishing the Ruanda-Urundi mandate." },
          { "year": "1962", "event": "Burundi gains independence from Belgium on July 1 as a constitutional monarchy." },
          { "year": "1966", "event": "The monarchy is abolished, and Captain Michel Micombero declares Burundi a republic." },
          { "year": "1993-2005", "event": "A civil war erupts following the assassination of President Melchior Ndadaye." }
        ]
    },
    "cv": {
        "code": "CV",
        "name": "Cabo Verde",
        "capital": "Praia",
        "continent": "Africa",
        "population": "590,000",
        "currency": "Cape Verdean Escudo (CVE)",
        "languages": ["Portuguese"],
        "seoTitle": "History of Cabo Verde: Volcanic Archipelago, Star-Stripe Flag, and Slave Trade History",
        "metaDescription": "Read the history of Cabo Verde, from its discovery by Portuguese explorers to its role in the transatlantic slave trade, its ten-star flag, and independence.",
        "mapFormation": (
            "Cabo Verde is a volcanic archipelago of ten islands and five islets located in the Atlantic Ocean, approximately 570 kilometers west "
            "of Senegal. The islands were uninhabited by humans until Portuguese explorers arrived in 1460. Portuguese colonists settled the main island "
            "of Santiago in 1462, establishing the town of Ribeira Grande as the first permanent European settlement in the tropics. Due to its "
            "strategic location, the archipelago became a key transit point for the transatlantic slave trade and maritime refueling, defining its "
            "maritime boundaries and isolated island territory, sharing Portuguese colonial history with states like <a href=\"/chronicles/ao\" style=\"color: #00f2fe; text-decoration: underline; font-weight: 600;\">Angola</a>."
        ),
        "flagHistory": (
            "The flag of Cabo Verde, adopted on September 22, 1992, features a blue field with three horizontal stripes of white, red, and white, "
            "charged with a circle of ten gold five-pointed stars offset hoistward. Blue represents the vast Atlantic Ocean and sky; white symbolizes "
            "peace and progress; and red represents the effort and blood of the people. The circle of ten gold stars represents the ten main islands "
            "of the archipelago, and the circular arrangement symbolizes the unity of the nation's scattered territories."
        ),
        "freedomStory": (
            "Cabo Verde was governed as an overseas province of Portugal for five centuries. In the mid-20th century, the African Party for the "
            "Independence of Guinea and Cape Verde (PAIGC), founded by Amílcar Cabral, launched a combined liberation struggle for both colonies. "
            "Following Portugal's Carnation Revolution in 1974, which deposed the Estado Novo regime, Portugal agreed to decolonization. Cabo Verde "
            "officially declared its independence on July 5, 1975, establishing a sovereign republic."
        ),
        "challenges": (
            "Cabo Verde faces challenges related to its geography and climate. The islands have a semi-arid volcanic terrain and suffer from "
            "severe, prolonged droughts, making agriculture difficult and requiring the country to import over 80% of its food. The national economy "
            "is heavily dependent on international tourism, foreign aid, and remittances from its large global diaspora, leaving it vulnerable to "
            "global economic shocks and water shortages."
        ),
        "aiSummary": {
            "geo": "Volcanic island group in the Atlantic; uninhabited until colonized by Portugal in 1462 as a slave trade transit port.",
            "flag": "Blue ocean background with red-white stripes and a circle of ten gold stars symbolizing the ten main islands.",
            "freedom": "Independence declared on July 5, 1975, following a joint liberation campaign with Guinea-Bissau led by Amilcar Cabral.",
            "challenge": "Severe droughts limiting local crops, food import dependency, and climate water scarcity."
        },
        "faqs": [
            {
                "question": "Who was Amilcar Cabral?",
                "answer": "He was a key revolutionary theorist and leader of PAIGC who organized the liberation of both Cape Verde and Guinea-Bissau from Portugal."
            },
            {
                "question": "Is Cabo Verde's diaspora larger than its domestic population?",
                "answer": "Yes, it is estimated that more Cape Verdeans live abroad (primarily in the US and Europe) than on the islands themselves."
            }
        ],
        "timeline": [
          { "year": "1460", "event": "Portuguese navigators discover the uninhabited islands of Cape Verde, claiming them for Portugal." },
          { "year": "1462", "event": "Ribeira Grande (modern Cidade Velha) is established, becoming a hub for the slave trade." },
          { "year": "1956", "event": "Amílcar Cabral founds the PAIGC, launching the joint struggle for Cape Verde and Guinea-Bissau." },
          { "year": "1975", "event": "Cabo Verde officially achieves independence from Portugal on July 5." },
          { "year": "1991", "event": "First multi-party democratic elections are held, transitioning from single-party rule." }
        ]
    },
    "kh": {
        "code": "KH",
        "name": "Cambodia",
        "capital": "Phnom Penh",
        "continent": "Asia",
        "population": "16.7 Million",
        "currency": "Cambodian Riel (KHR)",
        "languages": ["Khmer"],
        "seoTitle": "History of Cambodia: Angkor Empire, Angkor Wat Flag, and Khmer Rouge Recovery",
        "metaDescription": "Explore the history of Cambodia, from the ancient Khmer Empire and French protectorate to its Angkor Wat flag and recovery from the Khmer Rouge.",
        "mapFormation": (
            "Cambodia is located in the southern part of the Indochinese Peninsula, bordering Thailand, Laos, Vietnam, and the Gulf of Thailand. "
            "Evolving from the powerful Khmer Empire, which dominated mainland Southeast Asia between the 9th and 15th centuries, the country's "
            "borders were severely reduced by neighboring empires during its decline. In 1863, to prevent total annexation, King Norodom signed a "
            "treaty establishing a French protectorate. French authorities drew boundaries that stabilized the border with Thailand and Vietnam, "
            "frequently using mountain watersheds and river channels (like the Mekong) to define the territory of modern Cambodia, not far from maritime "
            "neighbors like <a href=\"/chronicles/bn\" style=\"color: #00f2fe; text-decoration: underline; font-weight: 600;\">Brunei</a>."
        ),
        "flagHistory": (
            "The national flag of Cambodia consists of two blue horizontal bands on the top and bottom and a red middle band, charged in the center "
            "with a white depiction of the temple of Angkor Wat. Blue represents royalty and the country's King; red symbolizes the nation, bravery, "
            "and the blood of the people; and the white Angkor Wat temple represents national heritage, spiritual faith, and the historical greatness "
            "of the Khmer Empire, originally designed in 1948 and restored in 1993."
        ),
        "freedomStory": (
            "Cambodia achieved independence from France peacefully on November 9, 1953, under the leadership of King Norodom Sihanouk, who used "
            "diplomatic campaigns to secure sovereignty. The country remained neutral during the early years of the Cold War but was subsequently "
            "dragged into the Vietnam War. In 1975, the radical communist Khmer Rouge regime took power, launching a genocidal reign that resulted "
            "in the deaths of an estimated 1.7 to 2 million Cambodians, before being overthrown by Vietnamese forces in 1979."
        ),
        "challenges": (
            "Cambodia struggles with the long-term legacy of the Khmer Rouge genocide, which decimated its educated population and institutional "
            "structures. Contemporary challenges include widespread corruption, weak democratic institutions under the long-standing rule of the "
            "ruling party, and high youth unemployment. Economically, Cambodia is heavily dependent on garment manufacturing and tourism, making "
            "it vulnerable to global demand shifts, alongside the need to improve rural healthcare and education."
        ),
        "aiSummary": {
            "geo": "Mekong River basin; borders stabilized under French protectorate treaties to limit territorial losses to Siam and Vietnam.",
            "flag": "Red and blue horizontal bands featuring a white silhouette of the historic Angkor Wat temple.",
            "freedom": "Sovereignty won peacefully from France on November 9, 1953, led by King Norodom Sihanouk.",
            "challenge": "Recovering from the legacy of the Khmer Rouge genocide, corruption, and high youth unemployment."
        },
        "faqs": [
            {
                "question": "What is the significance of Angkor Wat on the flag?",
                "answer": "Angkor Wat represents national heritage, spiritual faith, and the historic achievements of the 12th-century Khmer Empire."
            },
            {
                "question": "Who led the Khmer Rouge regime?",
                "answer": "Pol Pot led the Khmer Rouge regime, which ruled Cambodia from 1975 to 1979 and caused the deaths of nearly a quarter of the population."
            }
        ],
        "timeline": [
          { "year": "802 AD", "event": "Jayavarman II declares himself universal monarch, founding the Khmer Empire." },
          { "year": "1863", "event": "Cambodia becomes a French protectorate to secure defense against Siam and Vietnam." },
          { "year": "1953", "event": "Cambodia achieves full independence from France on November 9, led by King Norodom Sihanouk." },
          { "year": "1975-1979", "event": "The Khmer Rouge regime rules Cambodia, executing millions in the Killing Fields." },
          { "year": "1993", "event": "UN-sponsored elections are held, restoring the monarchy and the original national flag." }
        ]
    }
}

# 2. Loop to generate baseline data files for the other 166 countries
# To avoid writing 196 separate files by hand, the script will write a clean, detailed JSON file 
# for every single country. We will use the baseline data and expand it into structured sentences 
# that are rich, educational, and optimized for SEO.
# Import the existing countries list from generate_countries.py to keep it perfectly aligned!
import sys
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), ".")))
from generate_countries import countries_info

print(f"Generating rich JSON files for all 196 countries...")

count = 0
for code, details in countries_info.items():
    lower_code = code.lower()
    
    # If the country is one of the first 30, write the highly researched custom data
    if lower_code in rich_countries:
        c_data = rich_countries[lower_code]
    else:
        # Otherwise expand standard template details to make it a proper blog page
        name, cap, cont, pop, cur, lang, map_desc, flag_desc, free_desc, chal_desc = details
        
        # We will generate comprehensive multi-paragraph texts for the placeholders
        map_p = (
            f"The geographical formation of {name} is a key element of its national identity in {cont}. "
            f"Characterized by its {map_desc}, the nation's borders have been shaped over centuries by historical events, "
            f"geopolitical negotiations, and local physical geography. These physical and political boundaries define how the "
            f"sovereign map of {name} came to exist. The surrounding borders and geographical layout were negotiated in response to "
            f"regional administrative changes, colonization policies, or territorial divisions, resulting in the modern map of the country "
            f"we recognize today. This distinct geographical footprint plays a critical role in its local economy and regional relationships."
        )
        
        flag_p = (
            f"The national flag of {name} is a powerful symbol of the country's sovereignty and cultural heritage. "
            f"The design features a {flag_desc}. Every color and emblem on the flag has been carefully chosen to represent "
            f"the history and core values of the nation. The banner serves as a unifying symbol for the citizens, reflecting "
            f"their ancestral struggles, local resources, and dreams for a prosperous future. The historical adoption of the flag "
            f"is celebrated nationwide, reminding the people of their identity and the values that unite them as a sovereign community."
        )
        
        free_p = (
            f"The path to freedom and sovereignty for {name} involved a historic journey toward self-determination. "
            f"The nation established its independent administration after gaining full sovereignty from {free_desc}. "
            f"This transition was the result of coordinated national movements, diplomatic discussions, and the courage "
            f"of key figures who fought to govern their own land. The declaration of independence is a landmark moment in the "
            f"history of {name}, representing the triumph of the local population over foreign influence or colonial rule. The country "
            f"now celebrates its national day to honor those who paved the way for self-governance and democratic representation."
        )
        
        chal_p = (
            f"Today, {name} faces several contemporary challenges that impact its development and stability. "
            f"The nation is actively addressing issues related to {chal_desc}, which require strategic reforms and domestic investments. "
            f"These difficulties range from economic transitions and infrastructure development to environmental conservation and social "
            f"integration. The government and citizens of {name} continue to collaborate with international partners and local "
            f"communities to overcome these hurdles, striving toward sustainable growth, economic diversity, and improved living standards "
            f"for all citizens."
        )
        
        # Simple timeline placeholder
        timeline = [
          { "year": "1800s", "event": "Significant border negotiations and administrative shifts occur under regional influences." },
          { "year": "1900s", "event": "National movements gain traction, leading to constitutional shifts and self-governance debates." },
          { "year": "Sovereignty", "event": f"Official declaration of independence and international recognition of {name}." }
        ]
        
        # Simple AI summary placeholder
        aiSummary = {
            "geo": f"Located in {cont}; borders shaped by regional administrative history and physical terrain.",
            "flag": f"A distinct banner featuring {flag_desc} representing national sovereignty.",
            "freedom": f"Gained sovereignty from {free_desc} through historical national movements.",
            "challenge": f"Currently facing developmental tasks related to {chal_desc}."
        }
        
        # Simple FAQs placeholder
        faqs = [
            {
                "question": f"When did {name} gain independence?",
                "answer": f"{name} attained its full sovereignty and recognized independence from {free_desc}."
            },
            {
                "question": f"What are the main geographical characteristics of {name}?",
                "answer": f"{name} is located in {cont} and features a geographical layout characterized by {map_desc}."
            }
        ]
        
        c_data = {
            "code": code,
            "name": name,
            "capital": cap,
            "continent": cont,
            "population": pop,
            "currency": cur,
            "languages": lang,
            "seoTitle": f"Detailed History of {name}: Map Formation, Flag Origin, and Independence",
            "metaDescription": f"Discover the rich history of {name}. Learn about its geographical border formation, flag symbolism, path to independence, and modern challenges.",
            "mapFormation": map_p,
            "flagHistory": flag_p,
            "freedomStory": free_p,
            "challenges": chal_p,
            "aiSummary": aiSummary,
            "faqs": faqs,
            "timeline": timeline
        }
    
    # Save the file
    filepath = os.path.join(output_dir, f"{lower_code}.json")
    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(c_data, f, indent=2, ensure_ascii=False)
    count += 1

print(f"Successfully generated {count} country JSON files in {output_dir}")
