import React from 'react';
import PropTypes from 'prop-types';
import WixComponent from '../BaseComponents/WixComponent';
import omit from 'omit';
import DropdownLayout from '../DropdownLayout/DropdownLayout';
import Button from '../Button';
import styles from './ButtonWithOptions.scss';

class ButtonWithOptions extends WixComponent {
  constructor(props) {
    super(props);
    this.state = {showOptions: false};

    this._onSelect = this._onSelect.bind(this);
    this._onKeyDown = this._onKeyDown.bind(this);
    this.hideOptions = this.hideOptions.bind(this);
    this.showOptions = this.showOptions.bind(this);
    this._onCloseKey = this._onCloseKey.bind(this);
    this._renderDropdownLayout = this._renderDropdownLayout.bind(this);
    this.closeOnSelect = this.closeOnSelect.bind(this);

    if (props.children) {
      this.sortChildren(props);
    }
  }

  componentWillReceiveProps(nextProps) {
    this.sortChildren(nextProps);
  }

  sortChildren(props) {
    [this.buttonElement, ...this.optionsElement] = React.Children.toArray(props.children);
  }

  onClickOutside() {
    this.hideOptions();
  }

  renderButton() {
    return React.cloneElement(this.buttonElement, {
      onClick: this.showOptions
    });
  }

  _renderDropdownLayout() {
    const dropdownProps = omit(['dataHook'], this.props);
    const customStyle = {marginLeft: this.props.dropdownOffsetLeft};
    if (this.props.dropdownWidth) {
      customStyle.width = this.props.dropdownWidth;
    }

    const dropdownLayoutOptions = React.Children.map(this.optionsElement, option => {
      const {children: value, ...rest} = option.props;
      return {value, ...rest};
    });

    return (
      <div style={customStyle}>
        <DropdownLayout
          ref={dropdownLayout => this.dropdownLayout = dropdownLayout}
          {...dropdownProps}
          options={dropdownLayoutOptions}
          theme={this.props.theme}
          visible={this.state.showOptions}
          onClose={this.hideOptions}
          onSelect={this._onSelect}
          onClickOutside={this.props.showTrigger === 'click' ? this.hideOptions : null}
          onMouseLeave={this.props.showTrigger === 'hover' ? this.hideOptions : null}
          onMouseEnter={this.props.showTrigger === 'hover' ? this.showOptions : null}
        />
      </div>
    );
  }

  render() {
    const {dropDirectionUp, style, showTrigger} = this.props;
    const sizeRestrictionStyles = this.props.restrainDropdownSize ? {display: 'inline-block'} : {};
    const customStyle = Object.assign({}, sizeRestrictionStyles, style);
    return (
      <div className={styles.wrapper} style={customStyle}>
        { showTrigger === 'hover' &&
          <div
            className={styles.mutualHoverBox}
            onMouseEnter={this.showOptions}
            onMouseLeave={this.hideOptions}
          />
        }
        {dropDirectionUp ? this._renderDropdownLayout() : null}
        <div onKeyDown={this._onKeyDown} onFocus={this._onFocus}>
          {this.renderButton()}
        </div>
        {!dropDirectionUp ? this._renderDropdownLayout() : null}
      </div>
    );
  }

  hideOptions() {
    this.setState({showOptions: false});
  }

  showOptions() {
    this.setState({showOptions: true});
  }

  closeOnSelect() {
    return this.props.closeOnSelect;
  }

  _onCloseKey() {
    if (this.closeOnSelect()) {
      this.hideOptions();
    }
  }

  _onSelect(option, isSelectedOption) {
    this.showOptions();
    const {onSelect} = this.props;

    if (this.closeOnSelect()) {
      this.hideOptions();
    }

    if (isSelectedOption) {
      this.setState({showOptions: false});
    } else if (onSelect) {
      onSelect(option);
    }
  }

  _onKeyDown(event) {
    if (!this.dropdownLayout._onKeyDown(event)) {
      switch (event.key) {
        case 'Enter':
        case 'Tab': {
          this._onCloseKey();
          break;
        }
        default:
          this.showOptions();
      }
    }
  }
}

ButtonWithOptions.defaultProps = {
  ...DropdownLayout.defaultProps,
  onSelect: () => {
  },
  options: [],
  closeOnSelect: true,
  valueParser: option => option.value,
  dropdownOffsetLeft: '0',
  restrainDropdownSize: true,
  showTrigger: 'click'
};

ButtonWithOptions.propTypes = {
  ...DropdownLayout.propTypes,
  closeOnSelect: PropTypes.bool,
  valueParser: PropTypes.func,
  showTrigger: PropTypes.oneOf(['click', 'hover']),
  dropdownWidth: PropTypes.string,
  dropdownOffsetLeft: PropTypes.string,
  restrainDropdownSize: PropTypes.bool,
  children: PropTypes.arrayOf((propValue, key) => {
    if (key === 0 && propValue[key].type !== ButtonWithOptions.Button && propValue[key].type !== ButtonWithOptions.Icon) {
      return new Error(`ButtonWithOptions: Invalid Prop children, first child must be ButtonWithOptions.Button or ButtonWithOptions.Icon`);
    }

    if (key !== 0) {
      React.Children.forEach(propValue[key], item => {
        if (item.type !== ButtonWithOptions.Option) {
          return new Error(`ButtonWithOptions: Invalid Prop children was given. Validation failed on child number ${key}`);
        }
      });
    }
  })
};

ButtonWithOptions.Option = function () {
  return null;
};
ButtonWithOptions.Option.displayName = 'ButtonWithOptions.Option';

ButtonWithOptions.Button = function (props) {
  return <div className={styles.buttonWrapper}><Button {...props}/></div>;
};
ButtonWithOptions.Button.displayName = 'ButtonWithOptions.Button';

ButtonWithOptions.Icon = function (props) {
  return <div className={styles.iconWrapper} {...props}/>;
};
ButtonWithOptions.Icon.displayName = 'ButtonWithOptions.Icon';


export default ButtonWithOptions;
