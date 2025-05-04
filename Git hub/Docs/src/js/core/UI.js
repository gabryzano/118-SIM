class GameUI {
    constructor(game) {
        this.game = game;
        this._mezziInAlto = []; // Persistenza dei mezzi in alto
    }

    showNewCall(call) {
        const arriviBox = document.querySelector('#chiamateInArrivo .box-content');
        if (!arriviBox) return;
        // Controlla se già presente
        if (document.getElementById(`call-${call.id}`)) return;
        const div = document.createElement('div');
        div.className = 'evento chiamata-arrivo';
        div.id = `call-${call.id}`;
        div.innerHTML = `
            <div class="call-header" style="cursor:pointer;">
                <b>Nuova chiamata in arrivo</b>
            </div>
            <div class="call-details" style="display:none;">
                <div class="call-sim-voice">Simulazione chiamata 118: <br><span class="sim-patologia">${call.simText || 'Paziente con sintomi da valutare...'}</span></div>
                <div class="call-indirizzo"><b>Indirizzo:</b> ${call.location}</div>
                <div class="call-actions" style="margin-top:10px;">
                    <button class="btn-crea-missione">Crea missione</button>
                    <button class="btn-chiudi">Chiudi</button>
                </div>
            </div>
        `;
        // Espansione/collapse
        div.querySelector('.call-header').onclick = () => {
            const det = div.querySelector('.call-details');
            det.style.display = det.style.display === 'none' ? 'block' : 'none';
        };
        // Chiudi
        div.querySelector('.btn-chiudi').onclick = () => {
            div.remove();
            if (call._marker && window.game && window.game.map) window.game.map.removeLayer(call._marker);
            window.game.calls.delete(call.id);
        };
        // Crea missione
        div.querySelector('.btn-crea-missione').onclick = () => {
            window.game.openMissionPopup(call);
        };
        arriviBox.appendChild(div);
    }

    moveCallToEventiInCorso(call) {
        const eventiBox = document.querySelector('#eventiInCorso .box-content');
        if (!eventiBox) return;
        // Controlla se già presente
        if(document.getElementById(`evento-${call.missioneId}`)) return;
        const div = document.createElement('div');
        div.className = 'evento missione-corso';
        div.id = `evento-${call.missioneId}`;
        // Estrai via e comune senza CAP
        let indirizzo = call.indirizzo || call.location || '';
        let via = '', comune = '';
        const viaMatch = indirizzo.match(/((Via|Viale|Piazza|Corso|Largo|Vicolo|Contrada|Borgo|Strada) [^,]+)/i);
        if(viaMatch) via = viaMatch[1];
        // Regex: cerca la parte dopo la virgola, elimina CAP e prende solo il nome del comune
        // Esempio: "Via Decò e Canetta, 24068 Seriate BG" => comune = "Seriate"
        const comuneMatch = indirizzo.match(/,\s*(?:\d{5}\s*)?([\w' ]+?)\s+[A-Z]{2}/);
        if(comuneMatch) comune = comuneMatch[1].replace(/\d+/g, '').trim();
        let indirizzoSintetico = via;
        if(comune) indirizzoSintetico += ' - ' + comune;
        indirizzoSintetico = indirizzoSintetico.trim() || indirizzo;
        // Ospedale e codice trasporto SOLO se confermati
        let ospedaleHtml = '';
        if (call.mezziAssegnati && call.mezziAssegnati.length > 0 && window.game && window.game.mezzi) {
            const mezzi = window.game.mezzi.filter(m => (call.mezziAssegnati||[]).includes(m.nome_radio));
            const mezzoConOspedale = mezzi.find(m => m.ospedale && m.codice_trasporto && m._trasportoConfermato);
            if (mezzoConOspedale) {
                ospedaleHtml = ` <span style='margin-left:12px;'></span><span style='font-size:13px;'>Destinazione: <b>${mezzoConOspedale.ospedale.nome}</b></span> <span style='display:inline-block;width:16px;height:16px;border-radius:4px;margin-left:6px;vertical-align:middle;background:${getColoreCodice(mezzoConOspedale.codice_trasporto)};border:1px solid #888;'></span>`;
            }
        }
        div.innerHTML = `
            <div class="missione-header" style="cursor:pointer;">
                <span class="missione-codice-box" style="display:inline-block;width:18px;height:18px;border-radius:4px;margin-right:8px;vertical-align:middle;background:${getColoreCodice(call.codice)};"></span>
                ${call.missioneId} - ${indirizzoSintetico}${ospedaleHtml}
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

    // Aggiorna la visualizzazione di una missione già presente in Eventi in corso
    updateMissioneInCorso(call) {
        const div = document.getElementById(`evento-${call.missioneId}`);
        if (!div) return;
        // Estrai via e comune senza CAP
        let indirizzo = call.indirizzo || call.location || '';
        let via = '', comune = '';
        const viaMatch = indirizzo.match(/((Via|Viale|Piazza|Corso|Largo|Vicolo|Contrada|Borgo|Strada) [^,]+)/i);
        if(viaMatch) via = viaMatch[1];
        const comuneMatch = indirizzo.match(/,\s*(?:\d{5}\s*)?([\w' ]+?)\s+[A-Z]{2}/);
        if(comuneMatch) comune = comuneMatch[1].replace(/\d+/g, '').trim();
        let indirizzoSintetico = via;
        if(comune) indirizzoSintetico += ' - ' + comune;
        indirizzoSintetico = indirizzoSintetico.trim() || indirizzo;
        // Ospedale e codice trasporto SOLO se confermati
        let ospedaleHtml = '';
        if (call.mezziAssegnati && call.mezziAssegnati.length > 0 && this.game && this.game.mezzi) {
            const mezzi = this.game.mezzi.filter(m => (call.mezziAssegnati||[]).includes(m.nome_radio));
            const mezzoConOspedale = mezzi.find(m => m.ospedale && m.codice_trasporto && m._trasportoConfermato);
            if (mezzoConOspedale) {
                ospedaleHtml = ` <span style='margin-left:12px;'></span><span style='font-size:13px;'>Destinazione: <b>${mezzoConOspedale.ospedale.nome}</b></span> <span style='display:inline-block;width:16px;height:16px;border-radius:4px;margin-left:6px;vertical-align:middle;background:${getColoreCodice(mezzoConOspedale.codice_trasporto)};border:1px solid #888;'></span>`;
            }
        }
        // Aggiorna header e dettagli
        const header = div.querySelector('.missione-header');
        if(header) header.innerHTML = `
            <span class="missione-codice-box" style="display:inline-block;width:18px;height:18px;border-radius:4px;margin-right:8px;vertical-align:middle;background:${getColoreCodice(call.codice)};"></span>
            ${call.missioneId} - ${indirizzoSintetico}${ospedaleHtml}
            <button class='btn-edit-missione' style='float:right;'>Modifica</button>
        `;
        // Riaggancia il listener al pulsante Modifica
        const btnEdit = div.querySelector('.btn-edit-missione');
        if(btnEdit) {
            btnEdit.onclick = (e) => {
                e.stopPropagation();
                window.game.openMissionPopup(call);
            };
        }
        const dettagli = div.querySelector('.missione-details');
        if(dettagli) {
            let html = '';
            const mezziAssegnati = (call.mezziAssegnati||[]);
            const mezzi = (this.game.mezzi||[]).filter(m=>mezziAssegnati.includes(m.nome_radio));
            const ospedali = (this.game.hospitals||[]);
            const codici = ['Rosso','Giallo','Verde'];
            let showMenu = false;
            mezzi.forEach(m => {
                html += `<div style='margin-bottom:6px;'><b>${m.nome_radio}</b>`;
                const lastCom = (m.comunicazioni||[]).slice(-1)[0]||'';
                // Mostra il menu SOLO se l'ultima comunicazione contiene "report pronto" e non ha ospedale/codice
                if(
                    lastCom.toLowerCase().includes('report pronto') && (!m.ospedale || !m.codice_trasporto)
                ) {
                    showMenu = true;
                    // Ordina ospedali per distanza dalla chiamata
                    let ospedaliOrdinati = ospedali.slice();
                    if (call && call.lat && call.lon) {
                        ospedaliOrdinati.sort((a, b) => {
                            const da = distanzaKm(call.lat, call.lon, a.lat, a.lon);
                            const db = distanzaKm(call.lat, call.lon, b.lat, b.lon);
                            return da - db;
                        });
                    }
                    // Aggiungi opzione Rientro in sede come prima scelta
                    const selectOsp = `<select class='select-ospedale' data-nome='${m.nome_radio}'>`+
                        `<option value="__rientro__">Rientro in sede</option>`+
                        ospedaliOrdinati.map(o=>{
                            let dist = '';
                            if (call && call.lat && call.lon && o.lat && o.lon) {
                                dist = distanzaKm(call.lat, call.lon, o.lat, o.lon).toFixed(1) + ' km';
                            }
                            return `<option value="${o.nome.trim()}">${o.nome.trim()}${dist ? ' ('+dist+')' : ''}</option>`;
                        }).join('')+
                        `</select>`;
                    const selectCod = `<select class='select-codice-trasporto' data-nome='${m.nome_radio}'>${codici.map(c=>`<option value="${c}">${c}</option>`).join('')}</select>`;
                    html += `<br>Ospedale: ${selectOsp} Codice: ${selectCod} <button class='btn-conferma-trasporto' data-nome='${m.nome_radio}'>Conferma</button>`;
                } else if(m.ospedale && m.codice_trasporto) {
                    html += `<br><span style='color:#333;'>Destinazione: <b>${m.ospedale.nome}</b> (${m.codice_trasporto})</span>`;
                }
                html += '</div>';
            });
            dettagli.innerHTML = `<div><b>Mezzi assegnati:</b></div>${html}<div class='report-section'></div>`;
            // Rimuovi missione se tutti i mezzi assegnati sono in stato 6 o 7
            if (mezzi.length > 0 && mezzi.every(m => m.stato === 6 || m.stato === 7)) {
                // Rimuovi marker chiamata dalla mappa
                if (call._marker && window.game && window.game.map) {
                    window.game.map.removeLayer(call._marker);
                    call._marker = null;
                }
                // Rimuovi missione dalla UI
                if (div && div.parentElement) div.parentElement.removeChild(div);
                // Rimuovi missione dalla mappa delle chiamate
                if (window.game && window.game.calls) window.game.calls.delete(call.id);
                return;
            }
            if(showMenu) {
                setTimeout(()=>{
                    dettagli.querySelectorAll('.btn-conferma-trasporto').forEach(btn=>{
                        btn.onclick = async ()=>{
                            const nome = btn.getAttribute('data-nome');
                            const ospedaleSel = dettagli.querySelector(`.select-ospedale[data-nome='${nome}']`).value;
                            const codice = dettagli.querySelector(`.select-codice-trasporto[data-nome='${nome}']`).value;
                            const mezzo = mezzi.find(m=>m.nome_radio===nome);
                            if(mezzo) {
                                if(ospedaleSel === "__rientro__") {
                                    // Rientro in sede: libera il mezzo dalla missione
                                    mezzo.ospedale = null;
                                    mezzo.codice_trasporto = null;
                                    mezzo._trasportoConfermato = false;
                                    mezzo._trasportoAvviato = false;
                                    mezzo.comunicazioni = (mezzo.comunicazioni||[]).concat([`Rientro in sede richiesto`]);
                                    mezzo.stato = 7;
                                    aggiornaMissioniPerMezzo(mezzo);
                                    // Avvia movimento verso la postazione
                                    if(window.game && window.game.postazioniMap && mezzo.postazione) {
                                        const postazione = Object.values(window.game.postazioniMap).find(p=>p.nome===mezzo.postazione);
                                        if(postazione) {
                                            const distRientro = distanzaKm(mezzo.lat, mezzo.lon, postazione.lat, postazione.lon);
                                            const velRientro = await getVelocitaMezzo(mezzo.tipo_mezzo);
                                            const tempoRientro = Math.round((distRientro/velRientro)*60);
                                            window.game.moveMezzoGradualmente(mezzo, mezzo.lat, mezzo.lon, postazione.lat, postazione.lon, Math.max(tempoRientro,2), 1, () => {
                                                mezzo.ospedale = null;
                                                mezzo.codice_trasporto = null;
                                                mezzo._trasportoAvviato = false;
                                                mezzo._trasportoConfermato = false;
                                                mezzo.comunicazioni = [];
                                                window.game.ui.updateStatoMezzi(mezzo);
                                            });
                                        }
                                    }
                                    // Rimuovi il mezzo da call.mezziAssegnati
                                    if (Array.isArray(call.mezziAssegnati)) {
                                        call.mezziAssegnati = call.mezziAssegnati.filter(nr => nr !== mezzo.nome_radio);
                                    }
                                    // Se non ci sono più mezzi assegnati, chiudi la missione
                                    if (!call.mezziAssegnati || call.mezziAssegnati.length === 0) {
                                        if (call._marker && window.game && window.game.map) {
                                            window.game.map.removeLayer(call._marker);
                                            call._marker = null;
                                        }
                                        const div = document.getElementById(`evento-${call.missioneId}`);
                                        if (div && div.parentElement) div.parentElement.removeChild(div);
                                        if (window.game && window.game.calls) window.game.calls.delete(call.id);
                                    }
                                    return;
                                } else {
                                    mezzo.ospedale = ospedali.find(o=>o.nome.trim()===ospedaleSel);
                                    mezzo.codice_trasporto = codice;
                                    mezzo.comunicazioni = (mezzo.comunicazioni||[]).concat([`Destinazione: ${ospedaleSel}, Codice: ${codice}`]);
                                    mezzo._trasportoConfermato = true;
                                }
                            }
                            this.updateMissioneInCorso(call);
                        };
                    });
                },100);
            }
        }
    }

    // Aggiorna la tabella Stato Mezzi usando dati da stati_mezzi.json
    updateStatoMezzi(changedMezzo = null) {
        const box = document.querySelector('#statoMezzi .box-content');
        if (!box) return;
        box.innerHTML = '';
        let mezzi = (this.game.mezzi || []).slice();
        // Ordina i mezzi per stato: prima quelli in attività (stato 2-7), poi in postazione (1), poi non disponibili (8)
        mezzi.sort((a, b) => {
            // Stati di attività: 2-7
            const attivitaA = (a.stato >= 2 && a.stato <= 7) ? 0 : (a.stato === 1 ? 1 : 2);
            const attivitaB = (b.stato >= 2 && b.stato <= 7) ? 0 : (b.stato === 1 ? 1 : 2);
            if (attivitaA !== attivitaB) return attivitaA - attivitaB;
            // Se stesso gruppo, ordina per stato crescente
            return a.stato - b.stato;
        });
        const statiMezzi = this.game.statiMezzi || {};
        const table = document.createElement('table');
        table.className = 'stato-mezzi-table';
        table.style.width = '100%';
        table.innerHTML = `
            <thead><tr>
                <th>Mezzo</th>
                <th>Stato</th>
                <th>Comunicazioni</th>
            </tr></thead>
            <tbody></tbody>
        `;
        const tbody = table.querySelector('tbody');
        mezzi.forEach(m => {
            const stato = statiMezzi[m.stato] || {};
            const statoLabel = stato.Significato || '-';
            // Mostra solo "report pronto" se presente
            let comunicazioni = (m.comunicazioni||[]).filter(c => c.toLowerCase().includes('report pronto'));
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><b>${m.nome_radio}</b><br><span style='font-size:12px;'>${m.tipo_mezzo || ''}${m.convenzione ? ' - ' + m.convenzione : ''}</span></td>
                <td><b>${m.stato}</b> - ${statoLabel}</td>
                <td class='mezzo-comunicazioni'>${comunicazioni.map(c=>`<div>${c}</div>`).join('')}</td>
            `;
            tbody.appendChild(tr);
        });
        box.appendChild(table);
    }

    // Restituisce etichetta stato
    getStatoMezzoLabel(stato) {
        const labels = {
            1: 'In postazione',
            2: 'In movimento',
            3: 'Sul luogo',
            4: 'In trasporto',
            5: 'In ospedale',
            6: 'Libero in ospedale',
            7: 'Rientro',
            8: 'Non disponibile'
        };
        return labels[stato] || 'Sconosciuto';
    }
    // Restituisce descrizione stato
    getStatoMezzoDesc(stato) {
        const desc = {
            1: 'Pronto in postazione',
            2: 'Sta raggiungendo il luogo',
            3: 'Intervento in corso',
            4: 'Trasporto paziente',
            5: 'Arrivato in ospedale',
            6: 'Libero dopo trasporto',
            7: 'Rientro in postazione',
            8: 'Non operativo'
        };
        return desc[stato] || '';
    }
}

// Funzione helper per colore codice
function getColoreCodice(codice) {
    if (!codice) return '#bbb';
    if (codice === 'Rosso') return '#d32f2f';
    if (codice === 'Giallo') return '#ffd600';
    if (codice === 'Verde') return '#43a047';
    return '#bbb';
}

// Utility per distanza (km)
function distanzaKm(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2-lat1)*Math.PI/180;
    const dLon = (lon2-lon1)*Math.PI/180;
    const a = Math.sin(dLat/2)*Math.sin(dLat/2)+Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLon/2)*Math.sin(dLon/2);
    return R*2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));
}

// Utility: trova velocità media per tipo mezzo
async function getVelocitaMezzo(tipo) {
    if(!window.tabellaMezzi118){
        const res = await fetch('src/data/tabella_mezzi_118.json');
        window.tabellaMezzi118 = (await res.json()).Sheet1;
    }
    const entry = window.tabellaMezzi118.find(e=>e.Tipo===tipo);
    if(!entry) return 60;
    return parseInt(entry["Velocità media"].split(' ')[0])||60;
}

// Utility: random tra min e max (minuti simulati -> secondi reali)
function randomMinuti(min, max) {
    return (Math.floor(Math.random()*(max-min+1))+min);
}

// Utility: lampeggia cella mezzo
function lampeggiaMezzo(nome_radio) {
    const box = document.querySelector('#statoMezzi .box-content');
    if(!box) return;
    const td = Array.from(box.querySelectorAll('td')).find(td=>td.textContent.includes(nome_radio));
    if(!td) return;
    let count = 0;
    const interval = setInterval(()=>{
        td.parentElement.classList.toggle('mezzo-lampeggia');
        count++;
        if(count>=30){
            clearInterval(interval);
            td.parentElement.classList.remove('mezzo-lampeggia');
        }
    }, 1000);
}

// CSS lampeggio
if(!document.getElementById('mezzo-lampeggia-style')){
    const style = document.createElement('style');
    style.id = 'mezzo-lampeggia-style';
    style.innerHTML = `.mezzo-lampeggia { background: #ffd600 !important; animation: lampeggiaMezzo 1s steps(1) infinite; }
    @keyframes lampeggiaMezzo { 50% { background: #fff !important; } }`;
    document.head.appendChild(style);
}