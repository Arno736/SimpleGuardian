module.exports = function no_guardian(mod)
{
	let active = true;
	let command = mod.command;
	let cleared;

	mod.hook('S_FIELD_EVENT_ON_ENTER', 'raw', () => {  
		if (active)
			return false;
	});

	mod.hook('S_FIELD_POINT_INFO', 2, (event) => {
		if (cleared != event.cleared) {
			cleared = event.cleared;

			if (event.cleared != "0")
				command.message("Chest : " + event.cleared + " /  40");

			if (event.cleared == "40")
				command.message("Guardians Chest Full !");
		}
	});

	mod.command.add('sg', (y) =>{
		if (!y) {
			active = !active;
			command.message("Disable Guardians Optimisation : " + active.toString());
		}
		else {
			switch (y) {
				case "status":
					command.message("Chest : " + cleared + " /  40");
					break;
				default:
					break;
			}
		}
    });
}