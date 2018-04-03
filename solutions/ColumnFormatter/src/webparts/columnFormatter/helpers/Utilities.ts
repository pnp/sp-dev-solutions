import { IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';

export const DropdownSort = (a:IDropdownOption,b:IDropdownOption) => {
	return a.text.localeCompare(b.text);
};