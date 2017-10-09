# ButtonWithOptions component

> options component for Button. (Click to see in action)

## Properties

| propName | propType | defaultValue | isRequired | description |
|----------|----------|--------------|------------|-------------|
| onSelect | func | noop | - | Callback when the user selects one of the selections. Called with the selection. |
| selectedId | string/number | - | - | The id of the selected option in the list |
| closeOnSelect | bool | true | - | Should the options container close on selection |
| disabled | bool | false | - |  when set to true this component is disabled |
| valueParser | func | option => option.value | - | function that extracts the value from an option |
| dropdownWidth | string | - | - | An optional custom width for the dropdown |
| dropdownOffsetLeft | string | 0 | - | Am optional horizontal offset to the dropdown |
| restrainDropdownSize | bool | true | - | Restrain dropdown width to button's width |
| showTrigger | [click, hover] | click | - | The event that would trigger openning the dropdown layout |
| ***All of the Button's and DropdownLayout Props are also available for this component*** | | | | |

> ButtonWithOptions.Button - the Button component to be used

> ButtonWithOptions.Option - an option to be used for the dropdown - must contain an id