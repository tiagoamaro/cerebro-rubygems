'use strict';

const ICON_FILE      = require('./icon.png');
const RUBYGEMS_REGEX = /rubygems\s+(.*)/i;

const plugin = ({term, display, actions}) => {
  if (RUBYGEMS_REGEX.test(term)) {
    const openBrowser = (url) => {
      actions.open(url);
      actions.hideWindow()
    };

    const searchRubygems = (query) => {
      let q   = encodeURIComponent(query);
      let url = `https://rubygems.org/search?query=${q}`;
      openBrowser(url);
    };

    let [, RubygemsQuery] = RUBYGEMS_REGEX.exec(term);

    display({
      icon:     ICON_FILE,
      title:    `Search Rubygems for ${RubygemsQuery}`,
      onSelect: () => searchRubygems(RubygemsQuery),
//      getPreview: () => <Preview query={RubygemsQuery} key={RubygemsQuery} openBrowser={openBrowser}/>
    })
  }
};

module.exports = {
  fn: plugin
};
