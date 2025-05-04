class EmergencyDispatchGame {
    constructor() {
        this.ui = new GameUI(this);
        this.calls = new Map();
        this.hospitals = [];
        // Qui aggiungerai mezzi, ospedali, ecc.
        this.indirizziReali = [
            { indirizzo: "Via Guglielmo d'Alzano, 7, 24122 Bergamo BG", lat: 45.695900, lon: 9.674900 },
            { indirizzo: "Via San Tomaso, 34, 24121 Bergamo BG", lat: 45.704200, lon: 9.672800 },
            { indirizzo: "Via Broseta, 65, 24128 Bergamo BG", lat: 45.693800, lon: 9.652900 },
            { indirizzo: "Via Pignolo, 107, 24121 Bergamo BG", lat: 45.704900, lon: 9.677700 },
            { indirizzo: "Via Sant'Alessandro, 30, 24122 Bergamo BG", lat: 45.695200, lon: 9.662900 },
            { indirizzo: "Via Fratelli Ugoni, 4, 25126 Brescia BS", lat: 45.541800, lon: 10.210900 },
            { indirizzo: "Via Solferino, 45, 25122 Brescia BS", lat: 45.541200, lon: 10.220200 },
            { indirizzo: "Via Trento, 62, 25128 Brescia BS", lat: 45.553000, lon: 10.222800 },
            { indirizzo: "Via Vittorio Veneto, 44, 25128 Brescia BS", lat: 45.547700, lon: 10.224900 },
            { indirizzo: "Via Milano, 59, 25126 Brescia BS", lat: 45.541000, lon: 10.196800 },
            // Nuovi indirizzi Bergamo
            { indirizzo: "Via XX Settembre, 100, 24122 Bergamo BG", lat: 45.695300, lon: 9.670800 },
            { indirizzo: "Via Palma il Vecchio, 12, 24128 Bergamo BG", lat: 45.692100, lon: 9.646900 },
            { indirizzo: "Via San Bernardino, 80, 24126 Bergamo BG", lat: 45.693000, lon: 9.629800 },
            { indirizzo: "Via Borgo Palazzo, 130, 24125 Bergamo BG", lat: 45.698800, lon: 9.698200 },
            { indirizzo: "Via Angelo Maj, 10, 24121 Bergamo BG", lat: 45.698200, lon: 9.678900 },
            // Nuovi indirizzi Brescia
            { indirizzo: "Via Cremona, 45, 25121 Brescia BS", lat: 45.525800, lon: 10.222100 },
            { indirizzo: "Via Lamarmora, 230, 25124 Brescia BS", lat: 45.521900, lon: 10.234200 },
            { indirizzo: "Via Veneto, 15, 25128 Brescia BS", lat: 45.547200, lon: 10.225500 },
            { indirizzo: "Via San Zeno, 119, 25124 Brescia BS", lat: 45.523400, lon: 10.234900 },
            { indirizzo: "Via Chiusure, 150, 25127 Brescia BS", lat: 45.541600, lon: 10.176800 },
            // Desenzano del Garda
            { indirizzo: "Via Dal Molin, 27, 25015 Desenzano del Garda BS", lat: 45.471000, lon: 10.535000 },
            { indirizzo: "Via G. Di Vittorio, 2, 25015 Desenzano del Garda BS", lat: 45.478200, lon: 10.541800 },
            { indirizzo: "Via A. Gramsci, 10, 25015 Desenzano del Garda BS", lat: 45.470800, lon: 10.541200 },
            { indirizzo: "Via G. Carducci, 5, 25015 Desenzano del Garda BS", lat: 45.468900, lon: 10.541900 },
            { indirizzo: "Via G. Marconi, 20, 25015 Desenzano del Garda BS", lat: 45.470500, lon: 10.541000 },
            // Lumezzane
            { indirizzo: "Via G. Matteotti, 100, 25065 Lumezzane BS", lat: 45.624800, lon: 10.266900 },
            { indirizzo: "Via G. Verdi, 8, 25065 Lumezzane BS", lat: 45.626200, lon: 10.264800 },
            { indirizzo: "Via G. Marconi, 15, 25065 Lumezzane BS", lat: 45.625900, lon: 10.265900 },
            { indirizzo: "Via G. Mazzini, 2, 25065 Lumezzane BS", lat: 45.626800, lon: 10.266200 },
            { indirizzo: "Via Roma, 1, 25065 Lumezzane BS", lat: 45.627200, lon: 10.265300 },
            // Montichiari
            { indirizzo: "Via Mantova, 100, 25018 Montichiari BS", lat: 45.409800, lon: 10.409200 },
            { indirizzo: "Via G. Marconi, 10, 25018 Montichiari BS", lat: 45.409900, lon: 10.410100 },
            { indirizzo: "Via G. Verdi, 5, 25018 Montichiari BS", lat: 45.410200, lon: 10.409800 },
            { indirizzo: "Via G. Mazzini, 2, 25018 Montichiari BS", lat: 45.410500, lon: 10.410300 },
            { indirizzo: "Via Roma, 1, 25018 Montichiari BS", lat: 45.410800, lon: 10.409500 },
            // Palazzolo sull’Oglio
            { indirizzo: "Via G. Marconi, 20, 25036 Palazzolo sull’Oglio BS", lat: 45.603800, lon: 9.883900 },
            { indirizzo: "Via G. Verdi, 3, 25036 Palazzolo sull’Oglio BS", lat: 45.604200, lon: 9.884200 },
            { indirizzo: "Via G. Mazzini, 7, 25036 Palazzolo sull’Oglio BS", lat: 45.604500, lon: 9.883800 },
            { indirizzo: "Via Roma, 2, 25036 Palazzolo sull’Oglio BS", lat: 45.604800, lon: 9.884100 },
            { indirizzo: "Via G. Carducci, 5, 25036 Palazzolo sull’Oglio BS", lat: 45.605100, lon: 9.883900 },
            // Ghedi
            { indirizzo: "Via G. Marconi, 10, 25016 Ghedi BS", lat: 45.403800, lon: 10.261900 },
            { indirizzo: "Via G. Verdi, 5, 25016 Ghedi BS", lat: 45.404200, lon: 10.262200 },
            { indirizzo: "Via G. Mazzini, 2, 25016 Ghedi BS", lat: 45.404500, lon: 10.261800 },
            { indirizzo: "Via Roma, 1, 25016 Ghedi BS", lat: 45.404800, lon: 10.262100 },
            { indirizzo: "Via G. Carducci, 8, 25016 Ghedi BS", lat: 45.405100, lon: 10.261900 },
            // Rovato
            { indirizzo: "Via G. Marconi, 20, 25038 Rovato BS", lat: 45.579800, lon: 9.987900 },
            { indirizzo: "Via G. Verdi, 3, 25038 Rovato BS", lat: 45.580200, lon: 9.988200 },
            { indirizzo: "Via G. Mazzini, 7, 25038 Rovato BS", lat: 45.580500, lon: 9.987800 },
            { indirizzo: "Via Roma, 2, 25038 Rovato BS", lat: 45.580800, lon: 9.988100 },
            { indirizzo: "Via G. Carducci, 5, 25038 Rovato BS", lat: 45.581100, lon: 9.987900 },
            // Chiari
            { indirizzo: "Via G. Marconi, 10, 25032 Chiari BS", lat: 45.537800, lon: 9.934900 },
            { indirizzo: "Via G. Verdi, 5, 25032 Chiari BS", lat: 45.538200, lon: 9.935200 },
            { indirizzo: "Via G. Mazzini, 2, 25032 Chiari BS", lat: 45.538500, lon: 9.934800 },
            { indirizzo: "Via Roma, 1, 25032 Chiari BS", lat: 45.538800, lon: 9.935100 },
            { indirizzo: "Via G. Carducci, 8, 25032 Chiari BS", lat: 45.539100, lon: 9.934900 },
            // Gussago
            { indirizzo: "Via G. Marconi, 20, 25064 Gussago BS", lat: 45.599800, lon: 10.158900 },
            { indirizzo: "Via G. Verdi, 3, 25064 Gussago BS", lat: 45.600200, lon: 10.159200 },
            { indirizzo: "Via G. Mazzini, 7, 25064 Gussago BS", lat: 45.600500, lon: 10.158800 },
            { indirizzo: "Via Roma, 2, 25064 Gussago BS", lat: 45.600800, lon: 10.159100 },
            { indirizzo: "Via G. Carducci, 5, 25064 Gussago BS", lat: 45.601100, lon: 10.158900 },
            // Sarezzo
            { indirizzo: "Via G. Marconi, 10, 25068 Sarezzo BS", lat: 45.650800, lon: 10.186900 },
            { indirizzo: "Via G. Verdi, 5, 25068 Sarezzo BS", lat: 45.651200, lon: 10.187200 },
            { indirizzo: "Via G. Mazzini, 2, 25068 Sarezzo BS", lat: 45.651500, lon: 10.186800 },
            { indirizzo: "Via Roma, 1, 25068 Sarezzo BS", lat: 45.651800, lon: 10.187100 },
            { indirizzo: "Via G. Carducci, 8, 25068 Sarezzo BS", lat: 45.652100, lon: 10.186900 },
            // Nuovi indirizzi Sondrio
            { indirizzo: "Via Trieste, 12, 23100 Sondrio SO", lat: 46.170500, lon: 9.872800 },
            { indirizzo: "Via Vanoni, 25, 23100 Sondrio SO", lat: 46.167900, lon: 9.877200 },
            { indirizzo: "Via Mazzini, 8, 23100 Sondrio SO", lat: 46.168700, lon: 9.876100 },
            { indirizzo: "Via Torelli, 30, 23100 Sondrio SO", lat: 46.171200, lon: 9.870900 },
            { indirizzo: "Via Lusardi, 5, 23100 Sondrio SO", lat: 46.169800, lon: 9.873400 },
            // Morbegno
            { indirizzo: "Via Ambrosetti, 10, 23017 Morbegno SO", lat: 46.140800, lon: 9.572900 },
            { indirizzo: "Via San Rocco, 5, 23017 Morbegno SO", lat: 46.139900, lon: 9.573800 },
            { indirizzo: "Via Stelvio, 50, 23017 Morbegno SO", lat: 46.141200, lon: 9.573200 },
            { indirizzo: "Via Donatori di Sangue, 2, 23017 Morbegno SO", lat: 46.142100, lon: 9.574100 },
            { indirizzo: "Via Faedo, 8, 23017 Morbegno SO", lat: 46.140500, lon: 9.570900 },
            // Tirano
            { indirizzo: "Via Monte Padrio, 3, 23037 Tirano SO", lat: 46.215800, lon: 10.163900 },
            { indirizzo: "Via Repubblica, 23, 23037 Tirano SO", lat: 46.215200, lon: 10.163200 },
            { indirizzo: "Via Vangioni, 10, 23037 Tirano SO", lat: 46.216500, lon: 10.164800 },
            { indirizzo: "Via Ragazzi del '99, 5, 23037 Tirano SO", lat: 46.217100, lon: 10.165200 },
            { indirizzo: "Via Elvezia, 7, 23037 Tirano SO", lat: 46.216800, lon: 10.162900 },
            // Chiavenna
            { indirizzo: "Via Dolzino, 50, 23022 Chiavenna SO", lat: 46.319800, lon: 9.398900 },
            { indirizzo: "Via Ezio Vanoni, 8, 23022 Chiavenna SO", lat: 46.320200, lon: 9.399200 },
            { indirizzo: "Via Volta, 12, 23022 Chiavenna SO", lat: 46.321500, lon: 9.400100 },
            { indirizzo: "Via Raschi, 3, 23022 Chiavenna SO", lat: 46.320900, lon: 9.398700 },
            { indirizzo: "Via Roma, 1, 23022 Chiavenna SO", lat: 46.321800, lon: 9.399500 },
            // Cosio Valtellino
            { indirizzo: "Via Statale, 100, 23013 Cosio Valtellino SO", lat: 46.137800, lon: 9.563900 },
            { indirizzo: "Via Europa, 5, 23013 Cosio Valtellino SO", lat: 46.138200, lon: 9.564200 },
            { indirizzo: "Via Donatori di Sangue, 2, 23013 Cosio Valtellino SO", lat: 46.139500, lon: 9.565800 },
            { indirizzo: "Via Roma, 1, 23013 Cosio Valtellino SO", lat: 46.138800, lon: 9.563100 },
            { indirizzo: "Via G. Marconi, 8, 23013 Cosio Valtellino SO", lat: 46.139100, lon: 9.564900 },
            // Bergamo
            { indirizzo: "Via San Bernardino, 139, 24126 Bergamo BG", lat: 45.693900, lon: 9.626900 },
            { indirizzo: "Via Borgo Palazzo, 80, 24125 Bergamo BG", lat: 45.698000, lon: 9.691000 },
            { indirizzo: "Via G. Camozzi, 124, 24121 Bergamo BG", lat: 45.698800, lon: 9.687900 },
            { indirizzo: "Via Broseta, 100, 24128 Bergamo BG", lat: 45.693200, lon: 9.649800 },
            { indirizzo: "Via G. Paglia, 31, 24122 Bergamo BG", lat: 45.692700, lon: 9.677200 },
            // Treviglio
            { indirizzo: "Via Pontirolo, 20, 24047 Treviglio BG", lat: 45.521200, lon: 9.601800 },
            { indirizzo: "Via Abate Crippa, 5, 24047 Treviglio BG", lat: 45.520800, lon: 9.601000 },
            { indirizzo: "Via Milano, 10, 24047 Treviglio BG", lat: 45.523000, lon: 9.604200 },
            { indirizzo: "Via T. Grossi, 8, 24047 Treviglio BG", lat: 45.521900, lon: 9.604900 },
            { indirizzo: "Via G. Verdi, 2, 24047 Treviglio BG", lat: 45.523800, lon: 9.601500 },
            // Seriate
            { indirizzo: "Via Dante Alighieri, 15, 24068 Seriate BG", lat: 45.684800, lon: 9.740200 },
            { indirizzo: "Via Brusaporto, 30, 24068 Seriate BG", lat: 45.684200, lon: 9.749800 },
            { indirizzo: "Via Nazionale, 93, 24068 Seriate BG", lat: 45.684900, lon: 9.726900 },
            { indirizzo: "Via Italia, 50, 24068 Seriate BG", lat: 45.684100, lon: 9.726000 },
            { indirizzo: "Via Decò e Canetta, 2, 24068 Seriate BG", lat: 45.682900, lon: 9.729800 },
            // Dalmine
            { indirizzo: "Via G. Verdi, 1, 24044 Dalmine BG", lat: 45.639800, lon: 9.613900 },
            { indirizzo: "Via Bastone, 10, 24044 Dalmine BG", lat: 45.639200, lon: 9.613200 },
            { indirizzo: "Via G. Mazzini, 8, 24044 Dalmine BG", lat: 45.639500, lon: 9.615800 },
            { indirizzo: "Via Betelli, 5, 24044 Dalmine BG", lat: 45.641200, lon: 9.613700 },
            { indirizzo: "Via G. Marconi, 2, 24044 Dalmine BG", lat: 45.640800, lon: 9.614900 },
            // Romano di Lombardia
            { indirizzo: "Via G. Matteotti, 20, 24058 Romano di Lombardia BG", lat: 45.521800, lon: 9.751900 },
            { indirizzo: "Via Balilla, 8, 24058 Romano di Lombardia BG", lat: 45.520900, lon: 9.753200 },
            { indirizzo: "Via G. Pascoli, 3, 24058 Romano di Lombardia BG", lat: 45.522100, lon: 9.753800 },
            { indirizzo: "Via G. Leopardi, 6, 24058 Romano di Lombardia BG", lat: 45.522500, lon: 9.752100 },
            { indirizzo: "Via G. Carducci, 1, 24058 Romano di Lombardia BG", lat: 45.521400, lon: 9.752800 },
            // Albino
            { indirizzo: "Via G. Mazzini, 10, 24021 Albino BG", lat: 45.767800, lon: 9.793900 },
            { indirizzo: "Via Provinciale, 25, 24021 Albino BG", lat: 45.768200, lon: 9.792100 },
            { indirizzo: "Via G. Verdi, 7, 24021 Albino BG", lat: 45.769100, lon: 9.792800 },
            { indirizzo: "Via G. Marconi, 2, 24021 Albino BG", lat: 45.768800, lon: 9.794200 },
            { indirizzo: "Via Roma, 1, 24021 Albino BG", lat: 45.769500, lon: 9.793100 },
            // Caravaggio
            { indirizzo: "Via G. Verdi, 3, 24043 Caravaggio BG", lat: 45.498800, lon: 9.638900 },
            { indirizzo: "Via G. Marconi, 8, 24043 Caravaggio BG", lat: 45.499200, lon: 9.639200 },
            { indirizzo: "Via Europa, 10, 24043 Caravaggio BG", lat: 45.498500, lon: 9.640100 },
            { indirizzo: "Via G. Mazzini, 5, 24043 Caravaggio BG", lat: 45.499000, lon: 9.638200 },
            { indirizzo: "Via G. Leopardi, 2, 24043 Caravaggio BG", lat: 45.498600, lon: 9.639800 },
            // Ponte San Pietro
            { indirizzo: "Via Roma, 20, 24036 Ponte San Pietro BG", lat: 45.698800, lon: 9.574900 },
            { indirizzo: "Via G. Marconi, 15, 24036 Ponte San Pietro BG", lat: 45.698200, lon: 9.575200 },
            { indirizzo: "Via G. Verdi, 8, 24036 Ponte San Pietro BG", lat: 45.699100, lon: 9.574300 },
            { indirizzo: "Via G. Mazzini, 3, 24036 Ponte San Pietro BG", lat: 45.698500, lon: 9.573800 },
            { indirizzo: "Via G. Carducci, 1, 24036 Ponte San Pietro BG", lat: 45.699300, lon: 9.574100 },
            // Stezzano
            { indirizzo: "Via G. Marconi, 10, 24040 Stezzano BG", lat: 45.650800, lon: 9.654900 },
            { indirizzo: "Via G. Verdi, 5, 24040 Stezzano BG", lat: 45.651200, lon: 9.655200 },
            { indirizzo: "Via G. Mazzini, 2, 24040 Stezzano BG", lat: 45.650500, lon: 9.655100 },
            { indirizzo: "Via G. Carducci, 8, 24040 Stezzano BG", lat: 45.651000, lon: 9.654800 },
            { indirizzo: "Via Roma, 1, 24040 Stezzano BG", lat: 45.650900, lon: 9.655300 },
            // Zogno
            { indirizzo: "Via G. Marconi, 20, 24019 Zogno BG", lat: 45.800800, lon: 9.661900 },
            { indirizzo: "Via G. Verdi, 3, 24019 Zogno BG", lat: 45.801200, lon: 9.662200 },
            { indirizzo: "Via G. Mazzini, 7, 24019 Zogno BG", lat: 45.800500, lon: 9.662100 },
            { indirizzo: "Via Roma, 2, 24019 Zogno BG", lat: 45.801000, lon: 9.661800 },
            { indirizzo: "Via G. Carducci, 5, 24019 Zogno BG", lat: 45.800900, lon: 9.662300 },
            // Incidenti su strade principali provincia di Bergamo
            { indirizzo: "A4 - Casello Bergamo", lat: 45.677900, lon: 9.668800 },
            { indirizzo: "A4 - Casello Dalmine", lat: 45.639300, lon: 9.601800 },
            { indirizzo: "A4 - Casello Seriate", lat: 45.677100, lon: 9.740900 },
            { indirizzo: "SS42 - Albano Sant'Alessandro", lat: 45.695950, lon: 9.799250 },
            { indirizzo: "SS42 - Entratico", lat: 45.701850, lon: 9.872950 },
            { indirizzo: "SS470 - San Pellegrino Terme", lat: 45.838950, lon: 9.664850 },
            { indirizzo: "SS470 - Zogno", lat: 45.800850, lon: 9.661950 },
            { indirizzo: "SS671 - Nembro", lat: 45.742850, lon: 9.783950 },
            { indirizzo: "SS671 - Alzano Lombardo", lat: 45.731350, lon: 9.725750 },
            { indirizzo: "SS525 - Treviglio Sud", lat: 45.509850, lon: 9.601850 },
            { indirizzo: "SS525 - Verdello", lat: 45.601850, lon: 9.629950 },
            { indirizzo: "SP342 - Ponte San Pietro", lat: 45.698850, lon: 9.574950 },
            { indirizzo: "SP342 - Mapello", lat: 45.721850, lon: 9.545950 },
            { indirizzo: "SP91 - Calcinate", lat: 45.613850, lon: 9.819950 },
            { indirizzo: "SP91 - Palosco", lat: 45.591850, lon: 9.860950 },
            // Incidenti su strade principali provincia di Brescia
            { indirizzo: "A4 - Casello Brescia Ovest", lat: 45.526050, lon: 10.144050 },
            { indirizzo: "A4 - Casello Brescia Centro", lat: 45.541050, lon: 10.186050 },
            { indirizzo: "A4 - Casello Desenzano", lat: 45.470050, lon: 10.535050 },
            { indirizzo: "SS45bis - Gavardo", lat: 45.588050, lon: 10.440050 },
            { indirizzo: "SS45bis - Salò", lat: 45.604050, lon: 10.523050 },
            { indirizzo: "SS11 - Rovato", lat: 45.579050, lon: 9.987050 },
            { indirizzo: "SS11 - Ospitaletto", lat: 45.543050, lon: 10.099050 },
            { indirizzo: "SS237 - Vestone", lat: 45.704050, lon: 10.392050 },
            { indirizzo: "SS237 - Idro", lat: 45.777050, lon: 10.478050 },
            { indirizzo: "SS42 - Darfo Boario Terme", lat: 45.889050, lon: 10.176050 },
            { indirizzo: "SS42 - Edolo", lat: 46.179050, lon: 10.332050 },
            { indirizzo: "SP510 - Iseo", lat: 45.660050, lon: 10.050050 },
            { indirizzo: "SP510 - Pisogne", lat: 45.803050, lon: 10.100050 },
            { indirizzo: "SP11 - Montichiari", lat: 45.409050, lon: 10.409050 },
            { indirizzo: "SP11 - Lonato del Garda", lat: 45.460050, lon: 10.470050 },
            // Incidenti su strade principali provincia di Sondrio
            { indirizzo: "SS38 - Sondrio (zona stazione)", lat: 46.170950, lon: 9.872750 },
            { indirizzo: "SS38 - Morbegno (zona ponte)", lat: 46.140950, lon: 9.573150 },
            { indirizzo: "SS38 - Tirano (zona centro)", lat: 46.216250, lon: 10.163850 },
            { indirizzo: "SS36 - Chiavenna (zona sud)", lat: 46.316850, lon: 9.399050 },
            { indirizzo: "SS36 - Colico (confine provincia)", lat: 46.143850, lon: 9.373950 },
            { indirizzo: "SP21 - Cosio Valtellino (zona industriale)", lat: 46.137950, lon: 9.563850 },
            { indirizzo: "SP21 - Traona", lat: 46.155850, lon: 9.563250 },
            { indirizzo: "SP15 - Bormio (zona terme)", lat: 46.492850, lon: 10.374950 },
            { indirizzo: "SP29 - Livigno (galleria Munt la Schera)", lat: 46.611850, lon: 10.104950 },
            { indirizzo: "SS301 - Valdidentro (zona Isolaccia)", lat: 46.484850, lon: 10.254950 },
            // Principali aziende provincia di Bergamo
            { indirizzo: "ABB S.p.A., Via Friuli, 4, 24044 Dalmine BG", lat: 45.639930, lon: 9.601670 },
            { indirizzo: "Tenaris Dalmine S.p.A., Via Vittorio Veneto, 106, 24044 Dalmine BG", lat: 45.639180, lon: 9.601210 },
            { indirizzo: "Brembo S.p.A., Via Brembo, 25, 24040 Stezzano BG", lat: 45.650820, lon: 9.654910 },
            { indirizzo: "Italcementi S.p.A., Via G. Camozzi, 124, 24121 Bergamo BG", lat: 45.698820, lon: 9.687900 },
            { indirizzo: "Same Deutz-Fahr, Viale F. Cassani, 15, 24047 Treviglio BG", lat: 45.521210, lon: 9.601800 },
            { indirizzo: "Gewiss S.p.A., Via A. Volta, 1, 24069 Cenate Sotto BG", lat: 45.728820, lon: 9.860900 },
            { indirizzo: "RadiciGroup, Via Ugo Foscolo, 152, 24024 Gandino BG", lat: 45.813800, lon: 9.889900 },
            { indirizzo: "Persico Group, Via G. Marconi, 7, 24027 Nembro BG", lat: 45.735800, lon: 9.763900 },
            { indirizzo: "Fassi Gru S.p.A., Via Roma, 110, 24021 Albino BG", lat: 45.767800, lon: 9.793900 },
            { indirizzo: "Italtrans S.p.A., Via Soncino, 3, 24050 Calcinate BG", lat: 45.6012, lon: 9.8197 },
            // Principali aziende provincia di Brescia
            { indirizzo: "A2A S.p.A., Via Lamarmora, 230, 25124 Brescia BS", lat: 45.521930, lon: 10.234200 },
            { indirizzo: "Feralpi Siderurgica S.p.A., Via Carlo Fabbri, 1, 25026 Ponte S. Marco BS", lat: 45.489800, lon: 10.420900 },
            { indirizzo: "Cembre S.p.A., Via Serenissima, 9, 25135 Brescia BS", lat: 45.541700, lon: 10.261800 },
            { indirizzo: "Camozzi Group, Via Eritrea, 20, 25126 Brescia BS", lat: 45.541200, lon: 10.196800 },
            { indirizzo: "Omb Saleri S.p.A., Via Rose di Sotto, 38, 25126 Brescia BS", lat: 45.541000, lon: 10.196800 },
            { indirizzo: "Gefran S.p.A., Via Sebina, 74, 25050 Provaglio d'Iseo BS", lat: 45.642800, lon: 10.048900 },
            { indirizzo: "Beretta Fabbrica d'Armi, Via Pietro Beretta, 18, 25063 Gardone Val Trompia BS", lat: 45.676600, lon: 10.183900 },
            { indirizzo: "Lonati S.p.A., Via Francesco Lonati, 3, 25124 Brescia BS", lat: 45.523400, lon: 10.234900 },
            { indirizzo: "Aib Associazione Industriale Bresciana, Via Cefalonia, 60, 25124 Brescia BS", lat: 45.523900, lon: 10.234700 },
            { indirizzo: "Lucchini RS S.p.A., Via G. Paglia, 45, 25036 Lovere BS", lat: 45.818800, lon: 10.075000 },
            // Principali aziende provincia di Sondrio
            { indirizzo: "A2A S.p.A. - Centrale Idroelettrica, Via Stelvio, 23100 Sondrio SO", lat: 46.170900, lon: 9.872700 },
            { indirizzo: "Levissima (Sanpellegrino S.p.A.), Via Stelvio, 234, 23030 Cepina SO", lat: 46.462800, lon: 10.383900 },
            { indirizzo: "Iperal S.p.A. (sede), Via Stelvio, 23, 23017 Morbegno SO", lat: 46.140800, lon: 9.572900 },
            { indirizzo: "Poli S.p.A., Via Nazionale, 23037 Tirano SO", lat: 46.216200, lon: 10.163800 },
            { indirizzo: "Metallurgica Valtellinese S.p.A., Via Don Guanella, 23022 Chiavenna SO", lat: 46.321800, lon: 9.399500 },
            // Centri sportivi provincia di Bergamo (coordinate precise)
            { indirizzo: "Gewiss Stadium, Viale Giulio Cesare, 18, 24124 Bergamo BG", lat: 45.712222, lon: 9.677222 },
            { indirizzo: "Centro Sportivo Italcementi, Via Statuto, 43, 24128 Bergamo BG", lat: 45.692444, lon: 9.646111 },
            { indirizzo: "Centro Sportivo Comunale, Via ai Campi Sportivi, 24047 Treviglio BG", lat: 45.521667, lon: 9.601389 },
            { indirizzo: "Centro Sportivo Comunale, Via G. Verdi, 2, 24044 Dalmine BG", lat: 45.639722, lon: 9.613889 },
            { indirizzo: "Centro Sportivo Comunale, Via A. Moro, 24036 Ponte San Pietro BG", lat: 45.698611, lon: 9.573611 },
            { indirizzo: "Centro Sportivo Comunale, Via Stezzano, 24040 Stezzano BG", lat: 45.650278, lon: 9.654722 },
            { indirizzo: "Centro Sportivo Comunale, Via Martiri della Libertà, 24019 Zogno BG", lat: 45.800556, lon: 9.661667 },
            { indirizzo: "Centro Sportivo Comunale, Via Europa, 24043 Caravaggio BG", lat: 45.497917, lon: 9.638750 },
            { indirizzo: "Centro Sportivo Comunale, Via Decò e Canetta, 24068 Seriate BG", lat: 45.682917, lon: 9.729806 },
            { indirizzo: "Centro Sportivo Rio Re, Via Rio Re, 24021 Albino BG", lat: 45.767222, lon: 9.793194 },
            // Centri sportivi provincia di Brescia (coordinate precise)
            { indirizzo: "Stadio Mario Rigamonti, Via Stadio, 15, 25125 Brescia BS", lat: 45.563333, lon: 10.234167 },
            { indirizzo: "Centro Sportivo San Filippo, Via Bazoli, 6, 25127 Brescia BS", lat: 45.541667, lon: 10.176806 },
            { indirizzo: "Centro Sportivo Tre Stelle, Via G. Di Vittorio, 1, 25015 Desenzano del Garda BS", lat: 45.470833, lon: 10.541250 },
            { indirizzo: "Centro Sportivo Comunale, Via Guglielmo Marconi, 25065 Lumezzane BS", lat: 45.624861, lon: 10.266944 },
            { indirizzo: "Centro Sportivo Montichiari, Via Boschetti di Sopra, 25018 Montichiari BS", lat: 45.410833, lon: 10.409528 },
            { indirizzo: "Centro Sportivo Comunale, Via Levadello, 25036 Palazzolo sull’Oglio BS", lat: 45.603528, lon: 9.883722 },
            { indirizzo: "Centro Sportivo Comunale, Via Olimpia, 25016 Ghedi BS", lat: 45.404139, lon: 10.262222 },
            { indirizzo: "Centro Sportivo Comunale, Via Primo Maggio, 25038 Rovato BS", lat: 45.579611, lon: 9.987722 },
            { indirizzo: "Centro Sportivo Comunale, Via Roccafranca, 25032 Chiari BS", lat: 45.537528, lon: 9.934722 },
            { indirizzo: "Centro Sportivo Corcione, Via Staffoli, 25064 Gussago BS", lat: 45.599528, lon: 10.158722 },
            // Centri sportivi provincia di Sondrio (coordinate precise)
            { indirizzo: "Stadio Comunale Castellina, Via Gorizia, 23100 Sondrio SO", lat: 46.170722, lon: 9.872528 },
            { indirizzo: "Centro Sportivo Comunale, Via Faedo, 23017 Morbegno SO", lat: 46.140528, lon: 9.570917 },
            { indirizzo: "Centro Sportivo Comunale, Via Monte Padrio, 23037 Tirano SO", lat: 46.215833, lon: 10.163917 },
            { indirizzo: "Centro Sportivo Comunale, Via Don Guanella, 23022 Chiavenna SO", lat: 46.321722, lon: 9.399444 },
            { indirizzo: "Centro Sportivo Comunale, Via Statale, 23013 Cosio Valtellino SO", lat: 46.137806, lon: 9.563889 },
            // Scuole principali provincia di Bergamo (indirizzi e coordinate reali)
            { indirizzo: "Liceo Scientifico Lussana, Viale Europa, 27, 24123 Bergamo BG", lat: 45.713350, lon: 9.677900 },
            { indirizzo: "Istituto Tecnico Vittorio Emanuele II, Via L. Camozzi, 55, 24121 Bergamo BG", lat: 45.698900, lon: 9.678800 },
            { indirizzo: "Liceo Classico Paolo Sarpi, Piazza Rosate, 4, 24129 Bergamo BG", lat: 45.704800, lon: 9.663900 },
            { indirizzo: "Istituto Natta, Via Europa, 15, 24125 Bergamo BG", lat: 45.698200, lon: 9.698700 },
            { indirizzo: "Istituto Superiore Quarenghi, Via Europa, 27, 24123 Bergamo BG", lat: 45.713200, lon: 9.677800 },
            { indirizzo: "Liceo Linguistico Falcone, Via G. Carnovali, 88, 24126 Bergamo BG", lat: 45.690900, lon: 9.668800 },
            { indirizzo: "Istituto Tecnico Paleocapa, Via Gavazzeni, 29, 24125 Bergamo BG", lat: 45.693800, lon: 9.691200 },
            { indirizzo: "Istituto Superiore Turoldo, Via G. Verdi, 10, 24047 Treviglio BG", lat: 45.523900, lon: 9.601600 },
            { indirizzo: "Istituto Superiore Einaudi, Via G. Marconi, 2, 24044 Dalmine BG", lat: 45.640900, lon: 9.614800 },
            { indirizzo: "Istituto Superiore Archimede, Via G. Marconi, 2, 24036 Ponte San Pietro BG", lat: 45.698300, lon: 9.574800 },
            // Scuole principali provincia di Brescia (indirizzi e coordinate reali)
            { indirizzo: "Liceo Scientifico Calini, Via Montesuello, 2, 25121 Brescia BS", lat: 45.541900, lon: 10.222800 },
            { indirizzo: "Liceo Classico Arnaldo, Via G. Carducci, 17, 25121 Brescia BS", lat: 45.541200, lon: 10.220900 },
            { indirizzo: "Istituto Tecnico Abba-Ballini, Via Tirandi, 3, 25128 Brescia BS", lat: 45.553200, lon: 10.222900 },
            { indirizzo: "Istituto Superiore Castelli, Via Cantore, 9, 25128 Brescia BS", lat: 45.547800, lon: 10.224700 },
            { indirizzo: "Istituto Tecnico Tartaglia, Via Oberdan, 12, 25128 Brescia BS", lat: 45.547100, lon: 10.224200 },
            { indirizzo: "Liceo Leonardo, Via Balestrieri, 6, 25124 Brescia BS", lat: 45.535800, lon: 10.220100 },
            { indirizzo: "Istituto Superiore Lunardi, Via Riccobelli, 47, 25124 Brescia BS", lat: 45.523700, lon: 10.234800 },
            { indirizzo: "Istituto Superiore Capirola, Via G. Marconi, 2, 25018 Montichiari BS", lat: 45.410900, lon: 10.409600 },
            { indirizzo: "Istituto Superiore Pascal, Via G. Marconi, 2, 25032 Chiari BS", lat: 45.538900, lon: 9.935100 },
            { indirizzo: "Istituto Superiore Olivelli-Putelli, Via G. Marconi, 2, 25036 Palazzolo sull’Oglio BS", lat: 45.604900, lon: 9.884200 },
            // Scuole principali provincia di Sondrio (indirizzi e coordinate reali)
            { indirizzo: "Liceo Piazzi-Perpenti, Via Donegani, 5, 23100 Sondrio SO", lat: 46.170900, lon: 9.872800 },
            { indirizzo: "Istituto Tecnico Quadrio-De Simoni, Via Tirano, 8, 23100 Sondrio SO", lat: 46.170200, lon: 9.873900 },
            { indirizzo: "Istituto Superiore Saraceno-Romegialli, Via Faedo, 8, 23017 Morbegno SO", lat: 46.140500, lon: 9.570900 },
            { indirizzo: "Istituto Superiore Pinchetti, Via Monte Padrio, 3, 23037 Tirano SO", lat: 46.215800, lon: 10.163900 },
            { indirizzo: "Istituto Superiore Leonardo da Vinci, Via Don Guanella, 23022 Chiavenna SO", lat: 46.321800, lon: 9.399500 },
            // Luoghi pubblici principali provincia di Bergamo (indirizzi e coordinate reali)
            { indirizzo: "Oriocenter, Via Portico, 71, 24050 Orio al Serio BG", lat: 45.668889, lon: 9.704167 },
            { indirizzo: "Centro Commerciale Le Due Torri, Via Guzzanica, 62/64, 24040 Stezzano BG", lat: 45.650833, lon: 9.654722 },
            { indirizzo: "Centro Commerciale Curno, Via Europa, 49, 24035 Curno BG", lat: 45.687778, lon: 9.613611 },
            { indirizzo: "Hotel Excelsior San Marco, Piazza della Repubblica, 6, 24122 Bergamo BG", lat: 45.698611, lon: 9.668333 },
            { indirizzo: "Ristorante Da Mimmo, Via Bartolomeo Colleoni, 17, 24129 Bergamo BG", lat: 45.704444, lon: 9.663611 },
            { indirizzo: "Ristorante Il Gourmet, Via San Vigilio, 1, 24129 Bergamo BG", lat: 45.698056, lon: 9.654167 },
            { indirizzo: "Starhotels Cristallo Palace, Via Betty Ambiveri, 35, 24126 Bergamo BG", lat: 45.683333, lon: 9.691111 },
            { indirizzo: "NH Bergamo, Via Paleocapa, 1/G, 24122 Bergamo BG", lat: 45.690833, lon: 9.677222 },
            { indirizzo: "Hotel Piazza Vecchia, Via Bartolomeo Colleoni, 3, 24129 Bergamo BG", lat: 45.704722, lon: 9.663333 },
            { indirizzo: "Centro Commerciale Continente Mapello, Via Donizetti, 24030 Mapello BG", lat: 45.721944, lon: 9.545833 },
            // Luoghi pubblici principali provincia di Brescia (indirizzi e coordinate reali)
            { indirizzo: "Elnòs Shopping, Via Luigi Einaudi, 25030 Roncadelle BS", lat: 45.523611, lon: 10.161944 },
            { indirizzo: "Centro Commerciale Le Rondinelle, Via G. Rossa, 25030 Roncadelle BS", lat: 45.523333, lon: 10.162222 },
            { indirizzo: "Centro Commerciale Freccia Rossa, Viale Italia, 31, 25126 Brescia BS", lat: 45.541389, lon: 10.211111 },
            { indirizzo: "Centro Commerciale Leone, Via Mantova, 36, 25015 Lonato del Garda BS", lat: 45.460278, lon: 10.470278 },
            { indirizzo: "Hotel Vittoria, Via X Giornate, 20, 25121 Brescia BS", lat: 45.539444, lon: 10.220278 },
            { indirizzo: "Hotel Igea, Viale della Stazione, 15, 25122 Brescia BS", lat: 45.535833, lon: 10.214722 },
            { indirizzo: "Ristorante Castello Malvezzi, Via Colle S. Giuseppe, 1, 25127 Brescia BS", lat: 45.555278, lon: 10.217222 },
            { indirizzo: "Ristorante La Sosta, Via San Martino della Battaglia, 20, 25121 Brescia BS", lat: 45.539167, lon: 10.220833 },
            { indirizzo: "Hotel Acquaviva del Garda, Viale Francesco Agello, 84, 25015 Desenzano del Garda BS", lat: 45.470833, lon: 10.541250 },
            { indirizzo: "Centro Commerciale Italmark, Via Mantova, 67, 25018 Montichiari BS", lat: 45.410833, lon: 10.409528 },
            // Luoghi pubblici principali provincia di Sondrio (indirizzi e coordinate reali)
            { indirizzo: "Centro Commerciale Iperal, Via Stelvio, 23100 Sondrio SO", lat: 46.170833, lon: 9.872778 },
            { indirizzo: "Hotel Europa, Via Lungo Mallero Cadorna, 27, 23100 Sondrio SO", lat: 46.170556, lon: 9.872222 },
            { indirizzo: "Ristorante Trippi, Via Don Guanella, 8, 23100 Sondrio SO", lat: 46.171111, lon: 9.872500 },
            { indirizzo: "Hotel Rezia, Via Milano, 9, 23032 Bormio SO", lat: 46.467222, lon: 10.373611 },
            { indirizzo: "Centro Commerciale La Spina, Via Nazionale, 23037 Tirano SO", lat: 46.215833, lon: 10.163889 },
            // RSA principali provincia di Bergamo (indirizzi e coordinate reali)
            { indirizzo: "RSA Fondazione Casa di Ricovero Santa Maria Ausiliatrice, Via Gleno, 61, 24125 Bergamo BG", lat: 45.6986, lon: 9.6912 },
            { indirizzo: "RSA Fondazione Casa Serena, Via Borgo Palazzo, 130, 24125 Bergamo BG", lat: 45.6988, lon: 9.6982 },
            { indirizzo: "RSA Fondazione Casa di Ricovero Martino Zanchi, Via Martino Zanchi, 86, 24022 Alzano Lombardo BG", lat: 45.7312, lon: 9.7261 },
            { indirizzo: "RSA Fondazione Casa di Ricovero Ospedale Magri, Via G. Marconi, 1, 24019 Zogno BG", lat: 45.8008, lon: 9.6619 },
            { indirizzo: "RSA Fondazione Casa di Ricovero Don Palla, Via Don Luigi Palla, 1, 24047 Treviglio BG", lat: 45.5237, lon: 9.6015 },
            { indirizzo: "RSA Fondazione Casa di Ricovero Sant'Andrea, Via Sant'Andrea, 1, 24044 Dalmine BG", lat: 45.6407, lon: 9.6147 },
            { indirizzo: "RSA Fondazione Casa di Ricovero Ospedale Moroni, Via G. Moroni, 10, 24068 Seriate BG", lat: 45.6842, lon: 9.7498 },
            { indirizzo: "RSA Fondazione Casa di Ricovero Don Stefano Palla, Via Don Stefano Palla, 1, 24043 Caravaggio BG", lat: 45.4987, lon: 9.6389 },
            { indirizzo: "RSA Fondazione Casa di Ricovero Sant'Antonio, Via Sant'Antonio, 1, 24021 Albino BG", lat: 45.7671, lon: 9.7932 },
            { indirizzo: "RSA Fondazione Casa di Ricovero Ospedale Bolognini, Via G. Mazzini, 11, 24036 Ponte San Pietro BG", lat: 45.6983, lon: 9.5748 },
            // RSA principali provincia di Brescia (indirizzi e coordinate reali)
            { indirizzo: "RSA Fondazione Casa di Dio, Via Vittorio Emanuele II, 26, 25122 Brescia BS", lat: 45.5412, lon: 10.2209 },
            { indirizzo: "RSA Fondazione Casa di Ricovero di Lumezzane, Via G. Matteotti, 1, 25065 Lumezzane BS", lat: 45.6248, lon: 10.2669 },
            { indirizzo: "RSA Fondazione Casa di Ricovero di Desenzano, Via G. Carducci, 2, 25015 Desenzano del Garda BS", lat: 45.4707, lon: 10.5412 },
            { indirizzo: "RSA Fondazione Casa di Ricovero di Montichiari, Via G. Marconi, 2, 25018 Montichiari BS", lat: 45.4109, lon: 10.4096 },
            { indirizzo: "RSA Fondazione Casa di Ricovero di Palazzolo sull’Oglio, Via Levadello, 1, 25036 Palazzolo sull’Oglio BS", lat: 45.6035, lon: 9.8837 },
            { indirizzo: "RSA Fondazione Casa di Ricovero di Ghedi, Via Olimpia, 1, 25016 Ghedi BS", lat: 45.4041, lon: 10.2622 },
            { indirizzo: "RSA Fondazione Casa di Ricovero di Rovato, Via Primo Maggio, 1, 25038 Rovato BS", lat: 45.5796, lon: 9.9877 },
            { indirizzo: "RSA Fondazione Casa di Ricovero di Chiari, Via Roccafranca, 1, 25032 Chiari BS", lat: 45.5375, lon: 9.9347 },
            { indirizzo: "RSA Fondazione Casa di Ricovero di Gussago, Via Staffoli, 1, 25064 Gussago BS", lat: 45.5995, lon: 10.1587 },
            { indirizzo: "RSA Fondazione Casa di Ricovero di Sarezzo, Via G. Marconi, 10, 25068 Sarezzo BS", lat: 45.6508, lon: 10.1869 },
            // RSA principali provincia di Sondrio (indirizzi e coordinate reali)
            { indirizzo: "RSA Fondazione Casa di Riposo Città di Sondrio, Via Don Bosco, 1, 23100 Sondrio SO", lat: 46.1709, lon: 9.8728 },
            { indirizzo: "RSA Fondazione Casa di Riposo Ambrosetti Paravicini, Via Ambrosetti, 10, 23017 Morbegno SO", lat: 46.1408, lon: 9.5729 },
            { indirizzo: "RSA Fondazione Casa di Riposo di Tirano, Via Monte Padrio, 3, 23037 Tirano SO", lat: 46.2158, lon: 10.1639 },
            { indirizzo: "RSA Fondazione Casa di Riposo di Chiavenna, Via Don Guanella, 1, 23022 Chiavenna SO", lat: 46.3218, lon: 9.3995 },
            { indirizzo: "RSA Fondazione Casa di Riposo di Cosio Valtellino, Via Statale, 100, 23013 Cosio Valtellino SO", lat: 46.1378, lon: 9.5639 }
        ];

        // Suddividi gli indirizzi per categoria
        this.categorieIndirizzi = {
            abitazione: [],
            strada: [],
            azienda: [],
            scuola: [],
            luogo_pubblico: [],
            rsa: []
        };
        this.indirizziReali.forEach(i => {
            // Categorizzazione automatica tramite pattern sull'indirizzo
            if (i.indirizzo.match(/(Via|Piazza|Viale|Vicolo|Corso|Largo|Contrada|Borgo|Frazione|Strada)/i) && !i.indirizzo.match(/(RSA|Casa di Riposo|Ospedale|Centro Commerciale|Hotel|Ristorante|Stadium|Stadio|Scuola|Istituto|Liceo|Azienda|S.p.A.|Srl|S.R.L.|SPA|SDA|SDF|Gruppo|Group|Industriale|Fabbrica|Associazione|Centrale|Levissima|Iperal|Poli|Metallurgica|Italtrans|ABB|Tenaris|Brembo|Italcementi|Gewiss|RadiciGroup|Persico|Fassi|A2A|Feralpi|Cembre|Camozzi|Omb|Gefran|Beretta|Lonati|Lucchini|Sanpellegrino|Pinchetti|Quadrio|De Simoni|Saraceno|Romegialli|Leonardo|Calini|Arnaldo|Abba|Ballini|Castelli|Tartaglia|Lunardi|Capirola|Pascal|Olivelli|Putelli|Piazzi|Perpenti|Donegani|Falcone|Quarenghi|Natta|Lussana|Sarpi|Archimede|Turoldo|Einaudi|Marconi|Verdi|Mazzini|Carducci|Europa|Gavazzeni|Carnovali|Camozzi|Guzzanica|Portico|Le Due Torri|Curno|Excelsior|San Marco|Da Mimmo|Il Gourmet|Cristallo Palace|NH|Piazza Vecchia|Continente Mapello|Elnòs|Le Rondinelle|Freccia Rossa|Leone|Vittoria|Igea|Castello Malvezzi|La Sosta|Acquaviva|Italmark|Iperal|Europa|Trippi|Rezia|La Spina|Santa Maria Ausiliatrice|Casa Serena|Martino Zanchi|Magri|Don Palla|Sant'Andrea|Moroni|Don Stefano Palla|Sant'Antonio|Bolognini|Casa di Dio|Lumezzane|Desenzano|Montichiari|Palazzolo|Ghedi|Rovato|Chiari|Gussago|Sarezzo|Ambrosetti Paravicini|Tirano|Chiavenna|Cosio Valtellino)/i)) {
                this.categorieIndirizzi.abitazione.push(i);
            } else if (i.indirizzo.match(/(A4|SS|SP|strada|casello|ponte|galleria|zona|confine|bretella|tangenziale|rotonda|autostrada|statale|provinciale)/i)) {
                this.categorieIndirizzi.strada.push(i);
            } else if (i.indirizzo.match(/(S.p.A.|Srl|S.R.L.|SPA|SDA|SDF|Gruppo|Group|Industriale|Fabbrica|Associazione|Centrale|Levissima|Iperal|Poli|Metallurgica|Italtrans|ABB|Tenaris|Brembo|Italcementi|Gewiss|RadiciGroup|Persico|Fassi|A2A|Feralpi|Cembre|Camozzi|Omb|Gefran|Beretta|Lonati|Lucchini|Sanpellegrino)/i)) {
                this.categorieIndirizzi.azienda.push(i);
            } else if (i.indirizzo.match(/(Scuola|Istituto|Liceo|Pinchetti|Quadrio|De Simoni|Saraceno|Romegialli|Leonardo|Calini|Arnaldo|Abba|Ballini|Castelli|Tartaglia|Lunardi|Capirola|Pascal|Olivelli|Putelli|Piazzi|Perpenti|Donegani|Falcone|Quarenghi|Natta|Lussana|Sarpi|Archimede|Turoldo|Einaudi)/i)) {
                this.categorieIndirizzi.scuola.push(i);
            } else if (i.indirizzo.match(/(Centro Commerciale|Hotel|Ristorante|Stadium|Stadio|Excelsior|San Marco|Da Mimmo|Il Gourmet|Cristallo Palace|NH|Piazza Vecchia|Continente Mapello|Elnòs|Le Rondinelle|Freccia Rossa|Leone|Vittoria|Igea|Castello Malvezzi|La Sosta|Acquaviva|Italmark|Iperal|Europa|Trippi|Rezia|La Spina)/i)) {
                this.categorieIndirizzi.luogo_pubblico.push(i);
            } else if (i.indirizzo.match(/(RSA|Casa di Riposo|Santa Maria Ausiliatrice|Casa Serena|Martino Zanchi|Magri|Don Palla|Sant'Andrea|Moroni|Don Stefano Palla|Sant'Antonio|Bolognini|Casa di Dio|Lumezzane|Desenzano|Montichiari|Palazzolo|Ghedi|Rovato|Chiari|Gussago|Sarezzo|Ambrosetti Paravicini|Tirano|Chiavenna|Cosio Valtellino)/i)) {
                this.categorieIndirizzi.rsa.push(i);
            } else {
                // fallback: abitazione
                this.categorieIndirizzi.abitazione.push(i);
            }
        });

        // Gestione avanzamento stati dopo conferma trasporto
        setInterval(()=>{
            (this.mezzi||[]).forEach(async m=>{
                if(m.stato===3 && m._trasportoConfermato && m.ospedale && m.codice_trasporto && !m._trasportoAvviato){
                    m._trasportoAvviato = true;
                    // Dopo 5 min simulati passa a stato 4
                    setTimeout(async()=>{
                        m.stato = 4;
                        aggiornaMissioniPerMezzo(m);
                        m.comunicazioni = (m.comunicazioni||[]).concat([`In trasporto verso ospedale: ${m.ospedale.nome}`]);
                        this.ui.updateStatoMezzi(m);
                        // Calcola tempo arrivo ospedale
                        const dist = distanzaKm(m.lat, m.lon, m.ospedale.lat, m.ospedale.lon);
                        const vel = await getVelocitaMezzo(m.tipo_mezzo);
                        const tempoArrivo = Math.round((dist/vel)*60);
                        // Movimento graduale verso ospedale
                        this.moveMezzoGradualmente(m, m.lat, m.lon, m.ospedale.lat, m.ospedale.lon, Math.max(tempoArrivo,2), 5, () => {
                            m.comunicazioni = (m.comunicazioni||[]).concat([`Arrivato in ospedale`]);
                            this.ui.updateStatoMezzi(m);
                            // Dopo 10-20 min simulati passa a 6
                            setTimeout(()=>{
                                m.stato = 6;
                                aggiornaMissioniPerMezzo(m);
                                m.comunicazioni = (m.comunicazioni||[]).concat([`Libero in ospedale`]);
                                this.ui.updateStatoMezzi(m);
                                // Dopo altri 10 min simulati passa a 7 (rientro)
                                setTimeout(async ()=>{
                                    m.stato = 7;
                                    aggiornaMissioniPerMezzo(m);
                                    m.comunicazioni = (m.comunicazioni||[]).concat([`Rientro in postazione`]);
                                    this.ui.updateStatoMezzi(m);
                                    // Dopo il rientro, torna in postazione e stato 1
                                    setTimeout(async ()=>{
                                        if(m.postazione && m.lat && m.lon) {
                                            // Trova la postazione di partenza
                                            const postazione = Object.values(this.postazioniMap||{}).find(p=>p.nome===m.postazione);
                                            if(postazione) {
                                                // Movimento graduale di rientro
                                                const distRientro = distanzaKm(m.lat, m.lon, postazione.lat, postazione.lon);
                                                const velRientro = await getVelocitaMezzo(m.tipo_mezzo);
                                                const tempoRientro = Math.round((distRientro/velRientro)*60);
                                                this.moveMezzoGradualmente(m, m.lat, m.lon, postazione.lat, postazione.lon, Math.max(tempoRientro,2), 1, () => {
                                                    m.ospedale = null;
                                                    m.codice_trasporto = null;
                                                    m._trasportoAvviato = false;
                                                    m._trasportoConfermato = false;
                                                    m.comunicazioni = [];
                                                    this.ui.updateStatoMezzi(m);
                                                });
                                                return;
                                            }
                                        }
                                        // fallback diretto se non trova postazione
                                        m.stato = 1;
                                        aggiornaMissioniPerMezzo(m);
                                        m.ospedale = null;
                                        m.codice_trasporto = null;
                                        m._trasportoAvviato = false;
                                        m._trasportoConfermato = false;
                                        m.comunicazioni = [];
                                        this.ui.updateStatoMezzi(m);
                                    }, 5*1000);
                                }, 10*1000);
                            }, randomMinuti(10,20)*1000);
                        });
                    }, 5*1000);
                }
            });
        }, 2000);
    }

    async loadStatiMezzi() {
        if (this.statiMezzi) return;
        const res = await fetch('src/data/stati_mezzi.json');
        const json = await res.json();
        this.statiMezzi = {};
        (json.Sheet1 || []).forEach(s => {
            this.statiMezzi[s.Stato] = s;
        });
    }

    async initialize() {
        await this.loadStatiMezzi();
        this.initializeMap();
        await this.loadHospitals();
        await this.loadMezzi(); // Carica postazioni e mezzi
    }

    initializeMap() {
        if (this.map) {
            this.map.remove(); // Rimuove la mappa precedente se esiste
        }
        // Centra la mappa su H Papa Giovanni (45.685783, 9.636633)
        this.map = L.map('game-map').setView([45.685783, 9.636633], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
    }

    async loadHospitals() {
        try {
            const response = await fetch('src/data/ospedali.json');
            const hospitals = await response.json();
            this.hospitals = hospitals;
            hospitals.forEach(hosp => {
                const marker = L.marker([hosp.lat, hosp.lon], { icon: this.getHospitalIcon() }).addTo(this.map)
                    .bindPopup(`<b>${hosp.nome}</b><br>${hosp.indirizzo || ""}`);
                hosp._marker = marker;
            });
        } catch (e) {
            console.error("Errore nel caricamento degli ospedali:", e);
        }
    }

    async loadMezzi() {
        try {
            const response = await fetch('src/data/mezzi_fixed.json');
            const mezzi = await response.json();
            this.mezzi = mezzi.map(m => ({ ...m, stato: 1, _marker: null, _callMarker: null, _ospedaleMarker: null }));
            this.postazioniMap = {};
            mezzi.forEach(m => {
                const key = m.postazione + '_' + m.lat + '_' + m.lon;
                if (!this.postazioniMap[key]) {
                    this.postazioniMap[key] = {
                        nome: m.postazione,
                        lat: m.lat,
                        lon: m.lon,
                        mezzi: []
                    };
                }
                this.postazioniMap[key].mezzi.push(m);
            });
            // Marker postazioni (sempre visibili)
            Object.values(this.postazioniMap).forEach(p => {
                L.marker([p.lat, p.lon], { icon: this.getPostazioneIcon() })
                    .addTo(this.map)
                    .bindPopup(`<b>${p.nome}</b><br>Mezzi: ${p.mezzi.map(m => m.nome_radio).join(', ')}`);
            });
            // Aggiorna solo i mezzi con missione assegnata
            this.updateActiveMissionMezzi();
            // Mostra tutti i mezzi nella tabella Stato Mezzi all'avvio
            this.ui.updateStatoMezzi();
        } catch (e) {
            console.error("Errore nel caricamento dei mezzi:", e);
        }
    }

    // Aggiorna solo i mezzi con missione assegnata (chiamata o ospedale)
    updateActiveMissionMezzi() {
        if (!this.mezzi) return;
        this.mezzi.forEach(m => {
            if (m.chiamata || m.ospedale) {
                this.ui.updateStatoMezzi(m);
            }
        });
    }

    getHospitalIcon() {
        return L.divIcon({
            className: 'hospital-marker',
            html: `<div class="hospital-icon">H</div>`,
            iconSize: [28, 28],
            iconAnchor: [14, 28],
            popupAnchor: [0, -28]
        });
    }

    getPostazioneIcon() {
        return L.divIcon({
            className: 'postazione-marker',
            html: `<div style="background:#00b300;color:#fff;width:22px;height:22px;display:flex;align-items:center;justify-content:center;border-radius:6px;font-size:16px;">🏠</div>`,
            iconSize: [22, 22],
            iconAnchor: [11, 22],
            popupAnchor: [0, -22]
        });
    }

    getMezzoIcon(tipo) {
        let emoji = '❓';
        if (["MSB", "MSA1_A", "MSA2_A"].includes(tipo)) emoji = '🚑';
        else if (["MSA1", "MSA2"].includes(tipo)) emoji = '🚗';
        else if (tipo === "ELI") emoji = '🚁';
        return L.divIcon({
            className: 'mezzo-marker',
            html: `<div style="background:#005baa;color:#fff;width:22px;height:22px;display:flex;align-items:center;justify-content:center;border-radius:6px;font-size:16px;">${emoji}</div>`,
            iconSize: [22, 22],
            iconAnchor: [11, 22],
            popupAnchor: [0, -22]
        });
    }

    getChiamataIcon() {
        return L.divIcon({
            className: 'chiamata-marker',
            html: `<div style="background:#d32f2f;width:38px;height:38px;border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;box-shadow:0 2px 6px rgba(0,0,0,0.15);border:2px solid #fff;">
                <span style='font-size:20px;line-height:1'>📞</span>
                <span style='font-size:13px;font-weight:bold;color:#fff;margin-top:2px;'>SOS</span>
            </div>`,
            iconSize: [38, 38],
            iconAnchor: [19, 38],
            popupAnchor: [0, -38]
        });
    }

    generateNewCall() {
        // Percentuali: 50% abitazioni, 15% strade, 5% aziende, 5% scuole, 5% luoghi pubblici, 10% RSA, 10% casuale
        const r = Math.random();
        let categoria;
        if (r < 0.5) categoria = 'abitazione';
        else if (r < 0.65) categoria = 'strada';
        else if (r < 0.70) categoria = 'azienda';
        else if (r < 0.75) categoria = 'scuola';
        else if (r < 0.80) categoria = 'luogo_pubblico';
        else if (r < 0.90) categoria = 'rsa';
        else {
            // 10% casuale
            const keys = Object.keys(this.categorieIndirizzi);
            categoria = keys[Math.floor(Math.random() * keys.length)];
        }
        const arr = this.categorieIndirizzi[categoria];
        // fallback se la categoria è vuota
        const scelta = arr && arr.length > 0 ? arr[Math.floor(Math.random() * arr.length)] : this.indirizziReali[Math.floor(Math.random() * this.indirizziReali.length)];
        const call = {
            id: Date.now(),
            location: scelta.indirizzo,
            lat: scelta.lat,
            lon: scelta.lon,
            type: "Emergenza medica"
        };
        this.calls.set(call.id, call);
        this.ui.showNewCall(call);

        // Marker sulla mappa
        if (this.map) {
            const marker = L.marker([call.lat, call.lon], { icon: this.getChiamataIcon() }).addTo(this.map);
            marker.bindPopup("Chiamata in arrivo: " + call.location);
            call._marker = marker;
            this.map.flyTo([call.lat, call.lon], 16, { animate: true });
        }
    }

    // Pop-up creazione missione
    openMissionPopup(call) {
        // Rimuovi qualsiasi popup missione esistente
        let popup = document.getElementById('mission-popup');
        if (popup) popup.remove();
        // Crea overlay
        popup = document.createElement('div');
        popup.id = 'mission-popup';
        popup.style = 'position:fixed;top:8vh;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.4);z-index:1000;display:flex;align-items:flex-start;justify-content:center;overflow:auto;';
        // Luoghi
        const luoghi = ['Casa','Strada','Esercizi pubblici','Impianto lavorativo','Impianto sportivo','Scuola','Altro'];
        // Patologie
        const patologie = ['Traumatica','Cardiocircolatoria','Respiratoria','Neurologica','Psichiatrica','Tossicologica','Metabolica','Gastroenterologica','Urologica','Oculistica','Otorinolaringoiatrica','Dermatologica','Ostetrico-ginecologica','Infettiva','Neoplastica','Altra patologia','Non identificata'];
        // Codici
        const codici = ['Rosso','Giallo','Verde'];
        // Mezzi ordinati per distanza e filtrati per disponibilità (ora includo anche stato 3 per aggiunta)
        const mezzi = (this.mezzi||[])
            .filter(m => [1,2,3,6,7].includes(m.stato))
            .map(m => ({...m, _distanza: (call.lat && call.lon && m.lat && m.lon) ? distanzaKm(m.lat, m.lon, call.lat, call.lon) : null }))
            .sort((a,b)=>{
                if(a._distanza!==null && b._distanza!==null) return a._distanza-b._distanza;
                return 0;
            });
        // Mezzi già assegnati
        const mezziAssegnati = new Set(call.mezziAssegnati || []);
        // Numero missione
        if(!call.missioneId){
            const now = new Date();
            const year = now.getFullYear();
            const decina = Math.floor(year%100/10);
            const unita = year%10;
            const progressivo = (window.missioneProgressivo = (window.missioneProgressivo||0)+1).toString().padStart(6,'0');
            call.missioneId = `${decina}${unita}1${progressivo}`;
        }
        popup.innerHTML = `
        <div style='background:#fff;padding:36px 36px 28px 36px;border-radius:18px;min-width:480px;max-width:99vw;box-shadow:0 8px 32px #005baa33;display:flex;flex-direction:column;gap:18px;font-family:sans-serif;'>
            <h2 style='margin:0 0 10px 0;font-size:1.5em;color:#005baa;font-weight:700;letter-spacing:0.5px;'>Nuova Missione</h2>
            <div style='display:grid;grid-template-columns:1fr 1fr;gap:18px 24px;align-items:center;'>
                <div style='font-weight:600;'>N° Missione:</div>
                <div>${call.missioneId}</div>
                <div style='font-weight:600;'>Indirizzo:</div>
                <div><input type='text' id='missione-indirizzo' value="${call.indirizzo ? call.indirizzo.replace(/"/g,'&quot;') : call.location.replace(/"/g,'&quot;')}" style='width:100%;padding:7px 10px;border-radius:7px;border:1.5px solid #bcd;outline:none;font-size:1em;background:#f7fafd;'></div>
                <div style='font-weight:600;'>Luogo:</div>
                <div><select id='missione-luogo' style='width:100%;padding:7px 10px;border-radius:7px;border:1.5px solid #bcd;font-size:1em;background:#f7fafd;'>${luoghi.map(l=>`<option${call.luogo===l?' selected':''}>${l}</option>`)}</select></div>
                <div style='font-weight:600;'>Patologia:</div>
                <div><select id='missione-patologia' style='width:100%;padding:7px 10px;border-radius:7px;border:1.5px solid #bcd;font-size:1em;background:#f7fafd;'>${patologie.map(p=>`<option${call.patologia===p?' selected':''}>${p}</option>`)}</select></div>
                <div style='font-weight:600;'>Codice:</div>
                <div><select id='missione-codice' style='width:100%;padding:7px 10px;border-radius:7px;border:1.5px solid #bcd;font-size:1em;background:#f7fafd;'>${codici.map(c=>`<option${call.codice===c?' selected':''}>${c}</option>`)}</select></div>
                <div style='font-weight:600;grid-column:1/3;margin-top:8px;display:flex;align-items:center;gap:12px;'>
                    Mezzi assegnati:
                    <button type='button' class='btn-sel-mezzo' data-tipo='MSB' style='padding:3px 10px;font-size:0.95em;border-radius:6px;background:#e3eafc;color:#005baa;border:1px solid #bcd;font-weight:600;cursor:pointer;'>MSB</button>
                    <button type='button' class='btn-sel-mezzo' data-tipo='MSA1' style='padding:3px 10px;font-size:0.95em;border-radius:6px;background:#e3eafc;color:#005baa;border:1px solid #bcd;font-weight:600;cursor:pointer;'>MSA1</button>
                    <button type='button' class='btn-sel-mezzo' data-tipo='MSA2' style='padding:3px 10px;font-size:0.95em;border-radius:6px;background:#e3eafc;color:#005baa;border:1px solid #bcd;font-weight:600;cursor:pointer;'>MSA2</button>
                    <button type='button' class='btn-sel-mezzo' data-tipo='ELI' style='padding:3px 10px;font-size:0.95em;border-radius:6px;background:#e3eafc;color:#005baa;border:1px solid #bcd;font-weight:600;cursor:pointer;'>ELI</button>
                </div>
                <div style='grid-column:1/3;'>
                    <div style='max-height:140px;overflow:auto;border:1px solid #eee;padding:6px 8px;border-radius:7px;background:#f7fafd;'>
                        ${mezzi.map(m=>{
                            // Mezzi in stato >=4 non selezionabili
                            const dis = m.stato>=4 ? 'disabled' : '';
                            // Mezzi già assegnati e in stato >=3: checkbox sempre checked e disabilitata
                            const isLocked = mezziAssegnati.has(m.nome_radio) && m.stato>=3;
                            const checked = mezziAssegnati.has(m.nome_radio) ? 'checked' : '';
                            const lockAttr = isLocked ? 'checked disabled' : `${checked} ${dis}`;
                            return `<label style='display:block;margin-bottom:4px;font-size:1em;'>
                                <input type='checkbox' class='mezzo-checkbox' value='${m.nome_radio}' ${lockAttr} style="margin-right:7px;">
                                <span style="font-weight:500;">${m.nome_radio}</span>
                                <span style="color:#888;font-size:0.97em;">(${m.tipo_mezzo}${m.convenzione ? ' - ' + m.convenzione : ''}${m._distanza!==null ? ` - ${m._distanza.toFixed(1)} km` : ''})</span>
                                ${m.stato>=4 ? '<span style="color:#d32f2f;font-size:0.95em;margin-left:6px;">(non modificabile)</span>' : (isLocked ? '<span style="color:#d32f2f;font-size:0.95em;margin-left:6px;">(rimuovi solo con rientro/ospedale)</span>' : '')}
                            </label>`;
                        }).join('')}
                    </div>
                </div>
            </div>
            <div style='margin-top:18px;text-align:right;display:flex;gap:12px;justify-content:flex-end;'>
                <button id='missione-annulla' style='padding:8px 22px;font-size:1em;border-radius:7px;background:#eee;color:#005baa;border:none;font-weight:600;transition:background 0.2s;'>Annulla</button>
                <button id='missione-conferma' style='padding:8px 22px;font-size:1em;border-radius:7px;background:#005baa;color:#fff;border:none;font-weight:600;box-shadow:0 2px 8px #005baa22;transition:background 0.2s;'>Conferma</button>
            </div>
        </div>`;
        document.body.appendChild(popup);
        // Gestione pulsanti selezione rapida mezzi
        popup.querySelectorAll('.btn-sel-mezzo').forEach(btn => {
            btn.onclick = () => {
                const tipo = btn.getAttribute('data-tipo');
                const checkboxes = Array.from(popup.querySelectorAll('input.mezzo-checkbox'));
                let found = null;
                if(tipo==='MSB') found = checkboxes.find(cb => mezzi.find(m=>m.nome_radio===cb.value && m.tipo_mezzo==='MSB'));
                if(tipo==='MSA1') found = checkboxes.find(cb => mezzi.find(m=>m.nome_radio===cb.value && (m.tipo_mezzo==='MSA1'||m.tipo_mezzo==='MSA1_A')));
                if(tipo==='MSA2') found = checkboxes.find(cb => mezzi.find(m=>m.nome_radio===cb.value && (m.tipo_mezzo==='MSA2'||m.tipo_mezzo==='MSA2_A')));
                if(tipo==='ELI') found = checkboxes.find(cb => mezzi.find(m=>m.nome_radio===cb.value && m.tipo_mezzo==='ELI'));
                if(found) { found.checked = true; found.scrollIntoView({block:'center'}); }
            };
        });
        // Annulla
        popup.querySelector('#missione-annulla').onclick = ()=>popup.remove();
        // Conferma
        popup.querySelector('#missione-conferma').onclick = ()=>{
            // Mezzi già assegnati e in stato >=3 restano sempre assegnati
            const mezziAttuali = call.mezziAssegnati || [];
            const mezziStatoLock = (this.mezzi||[]).filter(m => mezziAttuali.includes(m.nome_radio) && m.stato>=3).map(m=>m.nome_radio);
            // Mezzi selezionati nel popup
            const selezionati = Array.from(popup.querySelectorAll('.mezzo-checkbox:checked')).map(x=>x.value);
            // Unione: mezzi selezionati + mezzi già assegnati e lockati
            call.mezziAssegnati = Array.from(new Set([...selezionati, ...mezziStatoLock]));
            call.indirizzo = popup.querySelector('#missione-indirizzo').value;
            call.luogo = popup.querySelector('#missione-luogo').value;
            call.patologia = popup.querySelector('#missione-patologia').value;
            call.codice = popup.querySelector('#missione-codice').value;
            // Sposta in eventi in corso solo se non esiste già, altrimenti aggiorna
            if(document.getElementById(`evento-${call.missioneId}`)) {
                this.ui.updateMissioneInCorso(call);
            } else {
                this.ui.moveCallToEventiInCorso(call);
            }
            // Rimuovi da chiamate in arrivo
            const el = document.getElementById(`call-${call.id}`);
            if(el) el.remove();
            // Dopo conferma missione, avvia movimento mezzi assegnati
            const mezziSelezionati = (call.mezziAssegnati||[]).map(nome=>this.mezzi.find(m=>m.nome_radio===nome)).filter(Boolean);
            mezziSelezionati.forEach(async m => {
                if(m.stato!==1) return; // Solo se in postazione
                m.stato = 2; // In movimento
                aggiornaMissioniPerMezzo(m);
                m.comunicazioni = (m.comunicazioni||[]).concat([`In movimento verso missione ${call.missioneId}`]);
                m.chiamata = { id: call.id, lat: call.lat, lon: call.lon };
                this.ui.updateStatoMezzi(m);
                // Calcola distanza e velocità
                const dist = distanzaKm(m.lat, m.lon, call.lat, call.lon);
                const vel = await getVelocitaMezzo(m.tipo_mezzo); // km/h
                const tempoArrivo = Math.round((dist/vel)*60); // minuti -> secondi simulati
                // Movimento graduale verso la chiamata
                this.moveMezzoGradualmente(m, m.lat, m.lon, call.lat, call.lon, Math.max(tempoArrivo,2), 3, () => {
                    m.comunicazioni = (m.comunicazioni||[]).concat([`Arrivato sul luogo`]);
                    this.ui.updateStatoMezzi(m);
                    // Dopo 20-40 min (simulati) invia report pronto e lampeggia
                    setTimeout(()=>{
                        m.comunicazioni = (m.comunicazioni||[]).concat([`Report pronto`]);
                        this.ui.updateStatoMezzi(m);
                        const call = Array.from(this.calls.values()).find(c => (c.mezziAssegnati||[]).includes(m.nome_radio));
                        if(call) this.ui.updateMissioneInCorso(call);
                        lampeggiaMezzo(m.nome_radio);
                    }, randomMinuti(20,40)*1000);
                });
            });
            popup.remove();
        };
    }

    // Sposta chiamata in "Eventi in corso"
    moveCallToEventiInCorso(call) {
        const eventiBox = document.querySelector('#eventiInCorso .box-content');
        if (!eventiBox) return;
        // Controlla se già presente
        if(document.getElementById(`evento-${call.missioneId}`)) return;
        const div = document.createElement('div');
        div.className = 'evento missione-corso';
        div.id = `evento-${call.missioneId}`;
        div.innerHTML = `
            <div class="missione-header" style="cursor:pointer;">
                <b>Missione ${call.missioneId}</b> - ${call.indirizzo || call.location}
                <button class='btn-edit-missione' style='float:right;'>Modifica</button>
            </div>
            <div class="missione-details" style="display:none;">
                <div><b>Mezzi assegnati:</b> ${(call.mezziAssegnati||[]).join(', ')||'Nessuno'}</div>
                <div class='report-section'></div>
            </div>
        `;
        // Espansione/collapse
        div.querySelector('.missione-header').onclick = (e) => {
            if(e.target.classList.contains('btn-edit-missione')) return;
            const det = div.querySelector('.missione-details');
            det.style.display = det.style.display === 'none' ? 'block' : 'none';
        };
        // Modifica missione
        div.querySelector('.btn-edit-missione').onclick = (e) => {
            e.stopPropagation();
            window.game.openMissionPopup(call);
        };
        eventiBox.appendChild(div);
    }

    // Simula il movimento graduale di un mezzo tra due coordinate
    async moveMezzoGradualmente(mezzo, latStart, lonStart, latEnd, lonEnd, durataSecondi, statoArrivo, callback) {
        const steps = Math.max(Math.floor(durataSecondi * 5), 2); // 5 step al secondo
        let step = 0;
        const latDelta = (latEnd - latStart) / steps;
        const lonDelta = (lonEnd - lonStart) / steps;
        mezzo.lat = latStart;
        mezzo.lon = lonStart;
        mezzo._inMovimento = true;
        // Rimuovi marker precedente se esiste
        if (mezzo._marker && this.map) {
            this.map.removeLayer(mezzo._marker);
            mezzo._marker = null;
        }
        const updateMarker = () => {
            if (mezzo._marker && this.map) {
                this.map.removeLayer(mezzo._marker);
                mezzo._marker = null;
            }
            mezzo._marker = L.marker([mezzo.lat, mezzo.lon], { icon: this.getMezzoIcon(mezzo.tipo_mezzo) })
                .addTo(this.map)
                .bindPopup(`<b>${mezzo.nome_radio}</b><br>${mezzo.tipo_mezzo}`);
        };
        updateMarker();
        const interval = setInterval(() => {
            step++;
            mezzo.lat = latStart + latDelta * step;
            mezzo.lon = lonStart + lonDelta * step;
            updateMarker();
            this.ui.updateStatoMezzi(mezzo);
            if (step >= steps) {
                clearInterval(interval);
                mezzo.lat = latEnd;
                mezzo.lon = lonEnd;
                updateMarker();
                mezzo.stato = statoArrivo;
                aggiornaMissioniPerMezzo(mezzo);
                mezzo._inMovimento = false;
                this.ui.updateStatoMezzi(mezzo);
                if (callback) callback();
            }
        }, 200);
    }

    // Altri metodi da aggiungere step by step
}

// Dopo ogni cambio di stato di un mezzo, aggiorna la missione in corso
function aggiornaMissioniPerMezzo(mezzo) {
    if (!window.game || !window.game.calls) return;
    window.game.calls.forEach(call => {
        if ((call.mezziAssegnati||[]).includes(mezzo.nome_radio)) {
            if (window.game.ui && typeof window.game.ui.updateMissioneInCorso === 'function') {
                window.game.ui.updateMissioneInCorso(call);
            }
        }
    });
}