const config = new CONFIG('');

$(() => {
    const nut0 = new NUT(false);
    const nut1 = new NUT(false);
    const save = DIALOG.loadDirectly($("#save"));
    const open = DIALOG.loadDirectly($("#open"));
    open.bind("#dOpen_bOpen", "click", () => {
    	$.get(open.getJquery().find("#dOpen_iURL").val(), (data) => {
	    $("#nut-"+NUT.getActiveNut().nut_id).html(data);
	});
    });
    open.bind("#dOpen_bCancel", "click", () => {
	open.hide();
    });
    $(document).on('keydown, input, keypress', () => {
	// key pressed
	console.log(NUT.getActiveNut().cursor.get_choordinate());
    });
    $("#commandlet").on('keydown', (e) => {
	if (e.keyCode == 13) {
	    let commands = $("#commandlet").val().split(" ");
	    switch (commands[0]) {
	    case "chgnut":
		NUT.activate(Number(commands[1]));
		break;
	    case "moveto":
		NUT.getActiveNut().
		    cursor.chmoveto(Number(commands[1]), Number(commands[2]));
		break;
	    case "move":
		NUT.activate(Number(commands[1]));
		break;
	    case "set":
		config.data[commands[1]] = commands[2];
		break;
	    case "open":
		$.get(commands[1], (data) => {
		    $("#nut-"+NUT.getActiveNut().nut_id).html(data);
		});
		break;
	    case "save":
		download($("#nut-"+NUT.getActiveNut().nut_id).text(), commands[1], "text/plain");
		break;
	    default:
		return;
	    }
	    $("#commandlet").val("");
	}
    });

});
