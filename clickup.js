var fields = [
    {
        "id":"sys_readonly.incident.number",
        "name":"inct"
    },
    {
        "id":"incident.u_supplier_ticket_number",
        "name":"inc"
    },
    {
        "id":"incident.incident_state",
        "name":"state"
    },
    {
        "id":"sys_display.incident.caller_id",
        "name":"caller"
    },
    {
        "id":"sys_display.incident.u_business_service",
        "name":"service"
    },
    {
        "id":"incident.priority",
        "name":"priority"
    },
    {
        "id":"sys_display.incident.assignment_group",
        "name":"group"
    },
    {
        "id":"sys_readonly.incident.opened_at",
        "name":"opened"
    },
    {
        "id":"incident.short_description",
        "name":"desc"
    }
];

function marklet_main(params) {
    if (document.getElementsByTagName('title')[0].text.startsWith('INC')) {
        send_data(get_data());        
    } 
}

function send_data(data){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://hook.integromat.com/ouaifg5f8ahs9rq4iq7859biey36nfac", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(data));
}

function getval(d, id) {
    return d.getElementById(id).value;
}

function get_data() {
    data = {}
    var d = document; 
    var m = d.getElementById('gsft_main'); 
    if (m) { d = m.contentWindow.document }; 
        for (let i = 0; i < fields.length; i++) {
            const field = fields[i];
            data[field.name] = getval(d, field.id)
        }
    console.log(data)
    return data;
}
