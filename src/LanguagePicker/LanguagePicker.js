import React from 'react';
import PropTypes from 'prop-types';
import WixComponent from '../BaseComponents/WixComponent';
import Languages from '../Icons/dist/components/Languages';
import ButtonWithOptions from '../ButtonWithOptions/ButtonWithOptions';

export default class LanguagePicker extends WixComponent {
  createDividedChildren() {
    const dividerChild = React.cloneElement(
      this.props.children[0], {
        children: '-',
        languageKey: '-',
        linkTo: ''
      });

    const dividedChildren = [...this.props.children];
    dividedChildren.forEach((_, index) => dividedChildren.splice((index * 2) + 1, 0, dividerChild));
    dividedChildren.pop();

    return dividedChildren;
  }

  createButtonWithOptionsOptions() {
    const dividedChildren = this.createDividedChildren();

    return dividedChildren.map(languagePickerOption => {
      const {languageKey, linkTo} = languagePickerOption.props;
      const languageName = languagePickerOption.props.children;

      return (
        <ButtonWithOptions.Option key={languageKey} id={languageKey} linkTo={linkTo}>
          {languageName}
        </ButtonWithOptions.Option>
      );
    });
  }

  render() {
    const {dataHook, theme, onSelect, dropdownWidth, dropdownOffsetLeft} = this.props;
    return (
      <ButtonWithOptions
        dataHook={dataHook}
        onSelect={option => onSelect(option.id)}
        dropdownWidth={dropdownWidth}
        dropdownOffsetLeft={dropdownOffsetLeft}
        withArrow
        itemHeight="big"
        showTrigger="hover"
        >
        <ButtonWithOptions.Icon><Languages size="18px"/></ButtonWithOptions.Icon>
        {this.createButtonWithOptionsOptions()}
      </ButtonWithOptions>
    );
  }
}

LanguagePicker.displayName = 'LanguagePicker';

LanguagePicker.defaultProps = {
  theme: 'icon-greybackground',
  onSelect: () => {},
  dropdownWidth: '130px'
};

LanguagePicker.propTypes = {
  /** Specifies a data-hook for tests */
  dataHook: PropTypes.string,

  /** Callback to call on language selection */
  onSelect: PropTypes.func,

  /** Theme of the icon's background */
  theme: PropTypes.string,

  /**
    * Specify the languages list to render
    *
    * children __must__ be `<LanguagePicker.Option/>` component with:
    *   * `languageKey` - string, required
    *   * `children` - string
    */
  children: PropTypes.arrayOf((propValue, key) => {
    if (propValue[key].type !== LanguagePicker.Option) {
      return new Error(`LanguagePicker: Invalid Prop children was given. Validation failed on child number ${key}`);
    }
  }),

  /** An optional custom width for the dropdown */
  dropdownWidth: PropTypes.string,
};

LanguagePicker.Option = () => null;

LanguagePicker.Option.propTypes = {
  languageKey: PropTypes.string.isRequired,
  children: PropTypes.string
};

