module.exports = function SimpleGuardian(mod)
{
	let command = mod.command;
	let cleared;
	mod.hook('S_FIELD_EVENT_ON_ENTER', 'raw', () => {
		if (mod.settings.disableOptimisation) return false;
	});
	mod.hook('S_FIELD_POINT_INFO', 2, (event) => {
		if (cleared != event.cleared) {
			cleared = event.cleared;
			
			if (event.cleared != "0")
				command.message("Chest : " + event.cleared + " /  40");

			if (event.cleared == "40") {
				if (mod.settings.notifyChestFull) {
					mod.toClient('S_CHAT', 3, {
						channel: 21,
						name: 'SimpleGuardian',
						message: String("Guardians Chest Full !")
					});
				}
				else {
					command.message("Guardians Chest Full !");
				}
			}
		}
	});

	mod.command.add(['sg', 'simpleguardian'], (y) =>{
		switch (y) {
			case "optimisation":
				mod.settings.disableOptimisation = !mod.settings.disableOptimisation;
				command.message("Disable Guardians Optimisation : " + mod.settings.disableOptimisation);
				break;
			case "status":
				command.message("Chest : " + cleared + " /  40");
				break;
			default:
				command.message("Simple Guardian Help :");
				command.message("sg optimisation | Toggle Guardians Optimisation");
				command.message("sg status | Get player number of cleared chests");
				break;
		}
	});
}