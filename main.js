$(() => {
    const nut0 = new NUT(false);
    const nut1 = new NUT(false);
    const save = DIALOG.loadDirectly($("#save"));
    $('.nut').on('keydown, input', () => {
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
	    default:
		return;
	    }
	    $("#commandlet").val("");
	}
    });
});