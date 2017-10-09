import React from 'react';
import {LanguagePicker} from 'wix-style-react';

const mockDictionary = {
  en: 'Hello',
  fr: 'Bonjour',
  tr: 'Merhaba'
};

export default class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {languageKey: 'en'};
  }
  render() {
    return (
      <div className="ltr">
        <div style={{display: 'flex', alignItems: 'center', marginLeft: '30px'}}>
          <LanguagePicker dataHook="story-languagePicker" onSelect={languageKey => this.setState({languageKey})}>
            <LanguagePicker.Option languageKey="en" linkTo="http://en.wix.com">English</LanguagePicker.Option>
            <LanguagePicker.Option languageKey="fr" linkTo="http://fr.wix.com">French</LanguagePicker.Option>
            <LanguagePicker.Option languageKey="tr" linkTo="http://tr.wix.com">Turkish</LanguagePicker.Option>
          </LanguagePicker>
          <h1>{mockDictionary[this.state.languageKey]}</h1>
        </div>
      </div>
    );
  }
}
