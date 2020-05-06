
module.exports = function no_guardian(mod)
{
	let command = mod.command;
	let cleared;

	mod.hook('S_FIELD_EVENT_ON_ENTER', 'raw', () => {  
		return false;
	});

	mod.hook('S_FIELD_POINT_INFO', 2, (event) => {
		if (cleared != event.cleared) {
			cleared = event.cleared;
			command.message(event.cleared + " /  40");
		}
	});
}