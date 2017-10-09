import React from 'react';
import {storiesOf} from '@storybook/react';
import Markdown from '../utils/Components/Markdown';
import AutoDocs from '../utils/Components/AutoDocs';
import AutoExample from '../utils/Components/AutoExample';
import TabbedView from '../utils/Components/TabbedView';
import CodeExample from '../utils/Components/CodeExample';
import ToggleSwitch from 'wix-style-react/ToggleSwitch';
import ToggleSwitchSource from '!raw-loader!wix-style-react/ToggleSwitch/ToggleSwitch';
import ReadmeTestKit from '../../src/ToggleSwitch/README.TESTKIT.md';

import ExampleStandard from './ExampleStandard';
import ExampleStandardRaw from '!raw-loader!./ExampleStandard';

import ExampleSizes from './ExampleSizes';
import ExampleSizesRaw from '!raw-loader!./ExampleSizes';

import ExampleControlled from './ExampleControlled';
import ExampleControlledRaw from '!raw-loader!./ExampleControlled';

storiesOf('Core', module)
  .add('ToggleSwitch', () => (
    <TabbedView tabs={['Usage', 'API', 'TestKit']}>
      <div>
        <AutoExample
          source={ToggleSwitchSource}
          component={ToggleSwitch}
          componentProps={(setProps, getProps) => ({
            onChange: () => setProps({checked: !getProps().checked})
          })}
          />

        <CodeExample title="Standard" code={ExampleStandardRaw}>
          <ExampleStandard/>
        </CodeExample>

        <CodeExample title="Sizes" code={ExampleSizesRaw}>
          <ExampleSizes/>
        </CodeExample>

        <CodeExample title="Controlled input" code={ExampleControlledRaw}>
          <ExampleControlled/>
        </CodeExample>
      </div>

      <AutoDocs source={ToggleSwitchSource}/>

      <Markdown source={ReadmeTestKit}/>
    </TabbedView>
  ));
