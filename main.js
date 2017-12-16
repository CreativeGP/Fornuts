const config = new CONFIG('');

$(() => {
    const nut0 = new NUT(false);
    const nut1 = new NUT(false);
    $("#nut-"+nut1.nut_id).focus();

    const save = DIALOG.loadDirectly($("#save"));
    save.bind('#dSave_bSave', 'click', () => {
	download(save.getJquery().text(),
		 save.getJquery().find("#dSave_iFilename").val(),
		 "text/plain");
    });
    save.bind("#dSave_bCancel", "click", () => {
	save.hide();
    });

    const open = DIALOG.loadDirectly($("#open"));
    open.bind("#dOpen_bOpen", "click", () => {
	if (open.getJquery().find("#dOpen_iLocalPath")[0].files.length > 0) {
	    let files = open.getJquery().find("#dOpen_iLocalPath")[0].files;
	    for (let i = 0, f; f = files[i]; i++) {
		let reader = new FileReader();
		reader.onload = (function (theFile) {
		    return function (e) {
			console.log(e.target.result);
			$("#nut-"+NUT.getActiveNut().nut_id).html(e.target.result);
		    };
		})(f);
		reader.readAsText(f);
	    }
	    open.getJquery().find("#dOpen_iLocalPathWrapper").html(`
		    Browse...
		    <input type="file" name="local_path" id="dOpen_iLocalPath" style="width: 100%; display: none;"><br>
`);
	    open.hide();
	} else {
    	    $.get(open.getJquery().find("#dOpen_iURL").val(), (data) => {
		$("#nut-"+NUT.getActiveNut().nut_id).html(data);
		open.hide();
	    });
	}
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
