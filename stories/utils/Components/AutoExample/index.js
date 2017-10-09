import React, {Component} from 'react';
import PropTypes from 'prop-types';
import reactElementToJSXString from 'react-element-to-jsx-string';

import componentParser from '../AutoDocs/parser';

import {
  Wrapper,
  Options,
  Option,
  Preview,
  Code,
  Toggle,
  Input
} from './FormComponents';

export default class extends Component {
  static propTypes = {
    source: PropTypes.string.isRequired,
    component: PropTypes.func.isRequired,
    componentProps: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
  }

  static defaultProps = {
    source: '',
    component: () => null,
    componentProps: {}
  }

  constructor(props) {
    super(props);

    this.parsedComponent = componentParser(this.props.source);

    this.state = {
      propsState: {
        ...(this.props.component.defaultProps || {}),
        ...(this.prepareComponentProps(this.props.componentProps))
      }
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      propsState: {...this.state.propsState, ...this.prepareComponentProps(nextProps.componentProps)}
    });
  }

  prepareComponentProps = props =>
    typeof props === 'function' ?
      props(
        // setProps
        componentProps =>
          this.setState({
            propsState: {...this.state.propsState, ...componentProps}
          }),

        // getProps
        () => this.state.propsState || {}
      ) :
      props;


  mapControllableProps = fn =>
    Object
      .keys(this.parsedComponent.props)
      .filter(key => ['string', 'bool'].includes(this.parsedComponent.props[key].type.name))
      .map(key => fn(this.parsedComponent.props[key], key));

  setProp = (key, value) =>
    this.setState({propsState: {...this.state.propsState, [key]: value}});

  getPropControlComponent = (propKey, type) => {
    const dataHookNameOfType = {
      string: 'input',
      bool: 'toggle'
    };

    const dataHook = `storybook-${this.parsedComponent.displayName}-${propKey}-${dataHookNameOfType[type] || 'input'}`;

    const types = {
      string: () => <Input dataHook={dataHook}/>,
      bool: () => <Toggle dataHook={dataHook}/>
    };

    return (types[type] || (() => null))();
  }

  componentToString = component =>
    reactElementToJSXString(component, {showDefaultProps: false, showFunctions: true})

  render() {
    const component = this.props.component;
    const componentPropsState = this.state.propsState;

    return (
      <Wrapper dataHook="auto-example">
        <Options>
          { this.mapControllableProps((prop, key) =>
            <Option
              {...{
                key,
                label: key,
                value: componentPropsState[key],
                onChange: value => this.setProp(key, value),
                children: this.getPropControlComponent(key, prop.type.name)
              }}
              />
          ) }
        </Options>

        <Preview>
          {React.createElement(component, componentPropsState)}
        </Preview>

        <Code source={this.componentToString(React.createElement(component, componentPropsState))}/>
      </Wrapper>
    );
  }
}
