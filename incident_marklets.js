//various service now bookmarklets for incident handling

/**
 * Fonction commune a tous les bookmarklets
 * Retourne l'objet document si la page active est celle d'un inciden
 */
function get_document() {
    var d = document; 
    var m = d.getElementById('gsft_main'); 
    if (m) { d = m.contentWindow.document }; 
    if (document.getElementsByTagName('title')[0].text.startsWith('INC')) {
        return d;
    } 
}
/**
 * retourne le bouton de sauvegarde
 *
 * @param {*} d document
 */
function get_button(d, value = 'Save') {
    buttons = d.getElementsByTagName('button')
    console.log(buttons.length);
    for (let i = 0; i < buttons.length; i++) {
        const btn = buttons[i];
        console.log(btn.value);
        if (btn.value == value) {
            return btn;
        }
    }
}

function click_button(d, label='Save') {
    save_bt = get_button(d, label);
    if (save_bt) {
        save_bt.click(); 
    }
}

function setSelectBoxByText(eid, etxt) {
    var eid = document.getElementById(eid);
    for (var i = 0; i < eid.options.length; ++i) {
        if (eid.options[i].text === etxt)
            eid.options[i].selected = true;
    }
}

function setSelectBoxByValue(eid, value) {
    var eid = document.getElementById(eid);
    for (var i = 0; i < eid.options.length; ++i) {
        if (eid.options[i].value === value)
            eid.options[i].selected = true;
    }
}

/**
 * actualise un incident pour lequel le timer est expiré
 */
function bmk_timer_expired() {
    d = get_document();
    if (d){
        status_combo = d.getElementById('incident.incident_state');
        onhold_reason_combo = d.getElementById('incident.u_on_hold_reasoning');

        //vérifie que l'incident est bien on hold avec un timer exprired
        if (status_combo.value == 4 && onhold_reason_combo.value == 9) {
            setSelectBoxByValue(status_combo, -1) //set state to update required

            comment = d.getElementById('activity-stream-comments-textarea');
            comment.value =  `
            SENDER : FR.IncidentMgmt.SNA.Proc.Inc.Manage
            Pending timer expired: merci de mettre à jour cet incident
            please update this incident
            `;

            click_button(d, 'Save');
        }

    }
}
/**
 * Ferme les incidents de monitoring SAP
 *
 */
function bmk_sapmon_autoclose() {
    d = get_document();
    if (d) {
        caller_input = d.getElementById('');
        if (caller_input.value == 'ESB_ Atos_Internal_User') {
            alert('monitoring');
            //set resolved
            d.getElementById('incident.incident_state').value = 6;
            //complete the form
            d.getElementById('incident.u_sub_close_code').value="Monitoring";
            d.getElementById('incident.u_sub_close_code_2').value= "FalseUnwanted";
            d.getElementById('incident.u_resolution_code').value = 4;
            d.getElementById('incident.close_code').value = 7;
            //fill resolution informations
            d.getElementById('incident.close_notes').value = `
            SENDER : FR.IncidentMgmt.SNA.Proc.Inc.Manage
            Vu avec l'équipe SAP SNA. Cet incident peut être fermé.
            `;

            //save it
            click_button(d, 'Save');
        } else {
            alert("cet incident n'a pas été ouvert par le monitoring");
        }
    }
}
