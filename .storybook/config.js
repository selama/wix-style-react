import {configure} from '@storybook/react';
import {setOptions} from '@storybook/addon-options';

function loadStories() {
  if (process.env.STORYBOOK_E2E) {
    require('./e2e-styles.scss');
  }

  require('../stories/stories.scss');

  // Introduction
  require('../stories/Introduction');

  // Core
  require('../stories/AutoComplete');
  require('../stories/Breadcrubms');
  require('../stories/Badge');
  require('../stories/ButtonLayout');
  require('../stories/ButtonSelection');
  require('../stories/Checkbox');
  require('../stories/ColorPicker');
  require('../stories/DataTable');
  require('../stories/DatePicker');
  require('../stories/Dropdown');
  require('../stories/DropdownLayout');
  require('../stories/EndorseContentLayout');
  require('../stories/FilePicker');
  require('../stories/GoogleAddressInput');
  require('../stories/ImageViewer');
  require('../stories/Input');
  require('../stories/InputArea');
  require('../stories/InputWithOptions');
  require('../stories/LanguagePicker');
  require('../stories/Label');
  require('../stories/Loader');
  require('../stories/PopoverMenu');
  require('../stories/SideBar');
  require('../stories/SideMenu');
  require('../stories/Slider');
  require('../stories/Tag');
  require('../stories/TimeInput');
  require('../stories/ToggleSwitch');
  // require('../stories/Tooltip/Core');
  require('../stories/Tooltip_New/Core');

  //BackOffice
  require('../stories/Backoffice/Button');
  require('../stories/Backoffice/TextLink');

  //TPA
  require('../stories/TPA/Button');
  require('../stories/TPA/FloatingTabs');
  require('../stories/TPA/TextLink');
  require('../stories/TPA/Input');
  require('../stories/TPA/Badge');
  require('../stories/TPA/Label');

  // Common
  require('../stories/Composite');
  require('../stories/GridWithCardLayout');
  require('../stories/Icons');
  require('../stories/Common');

  // Composites
  require('../stories/TextField');
  require('../stories/TextArea');
  require('../stories/Text');
  require('../stories/RichTextArea');
  require('../stories/FieldWithSelectionComposite');
  require('../stories/RichTextAreaComposite');
  require('../stories/Range');
  require('../stories/MultiSelect');
  require('../stories/AutoCompleteComposite');
  require('../stories/ButtonWithOptions');
  require('../stories/Checkbox/CheckboxStory');
  require('../stories/RadioGroup');
  require('../stories/GoogleAddressInputWithLabel');
  require('../stories/Backoffice/Button/CompositeStory');
  require('../stories/Breadcrubms/CompositeStory');
  require('../stories/Tabs');
  // require('../stories/Tooltip/Composite/CompositeStory');
  require('../stories/Tooltip_New/Composite/CompositeStory');
  require('../stories/Notification');

  require('../stories/MessageBox');
  require('../stories/Modal');
  require('../stories/EditableSelector');
  require('../stories/ModalSelector');
  require('../stories/Selector');
}

configure(loadStories, module);

setOptions({
  showDownPanel: false,
  name: 'wix-style-react',
  url: 'https://github.com/wix/wix-style-react',
  sidebarAnimations: true,
});
