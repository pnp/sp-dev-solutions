import * as React from 'react';
import {
  Dropdown,
  IDropdownOption,
  IDropdownStyles,
} from '@fluentui/react/lib/Dropdown';

const dropdownStyles: Partial<IDropdownStyles> = { dropdown: { width: 150 } };


interface IDropdownControlledProps {
  selectItem: (key: string) => void;
  options: IDropdownOption[];
  label: string;
}

const DropdownControlledExample: React.FunctionComponent<IDropdownControlledProps> = ({ selectItem, options, label }) => {
  const [selectedItem = options[0], setSelectedItem] =
    React.useState<IDropdownOption>();

  const onChange = (
    event: React.FormEvent<HTMLDivElement>,
    item: IDropdownOption
  ): void => {
    setSelectedItem(item);
    selectItem(String(item.key));
  };

  return (
    <Dropdown
      label={label}
      selectedKey={selectedItem ? selectedItem.key : undefined}
      // eslint-disable-next-line react/jsx-no-bind
      onChange={onChange}
      placeholder='Select an option'
      options={options}
      styles={dropdownStyles}
    />
  );
};

export default DropdownControlledExample;
