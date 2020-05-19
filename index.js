module.exports = function simple_guardian(mod)
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

			if (event.cleared == "40") {
				mod.toClient('S_CHAT', 3, {
					channel: 21,
					gm: 1,
					name: 'SimpleGuardian',
					message: String("Guardians Chest Full !")
					});
			}
		}
	});

	mod.command.add(['sg', 'simpleguardian'], (y) =>{
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