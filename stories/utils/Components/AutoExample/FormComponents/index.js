import React from 'react';
import PropTypes from 'prop-types';

import Markdown from '../../Markdown';
import CodeBlock from '../../CodeBlock';

import {Container, Row, Col} from 'wix-style-react/Grid';
import {default as WixInput} from 'wix-style-react/Input';
import ToggleSwitch from 'wix-style-react/ToggleSwitch';
import Text from 'wix-style-react/Text';

import styles from './styles.scss';

const Wrapper = ({children, dataHook}) =>
  <Container>
    <Row className={styles.wrapper} dataHook={dataHook}>
      {children}
    </Row>
  </Container>;

Wrapper.propTypes = {
  children: PropTypes.node,
  dataHook: PropTypes.string
};


const Options = ({children}) =>
  <Col span={6}>
    <div className={styles.title}>
      <Text appearance="H2">Props</Text>
    </div>

    {children}
  </Col>;

Options.propTypes = {
  children: PropTypes.node
};


const Option = ({label, value, children, onChange}) =>
  <Row className={styles.option}>
    <Col span={6}>
      <Markdown source={`\`${label}\``}/>
    </Col>

    <Col span={6}>
      { React.cloneElement(children, {value, onChange}) }
    </Col>
  </Row>;

Option.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any,
  children: PropTypes.node,
  onChange: PropTypes.func
};


const Preview = ({children}) =>
  <Col span={6}>
    <div className={styles.title}>
      <Text appearance="H2">Preview</Text>
    </div>

    <div className={styles.preview}>
      {children}
    </div>
  </Col>;

Preview.propTypes = {
  children: PropTypes.node
};


const Toggle = ({value, onChange, ...props}) =>
  <ToggleSwitch
    {...props}
    size="small"
    checked={value}
    onChange={({target: {checked}}) => onChange(checked)}
    />;

Toggle.propTypes = {
  value: PropTypes.bool,
  onChange: PropTypes.func
};


const Input = ({value, onChange, ...props}) =>
  <WixInput
    {...props}
    value={value}
    onChange={({target: {value}}) => onChange(value)}
    />;

Input.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func
};

const Code = ({source}) =>
  <Col span={12}>
    <div className={styles.title}>
      <Text appearance="H2">Code</Text>
    </div>

    <CodeBlock source={source}/>
  </Col>;

Code.propTypes = {
  source: PropTypes.string
};

export {
  Wrapper,
  Options,
  Option,
  Preview,
  Toggle,
  Input,
  Code
};
