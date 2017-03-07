'use strict';

import React from 'react'
import Preview from 'Preview'

const ICON_FILE      = require('./icon.png');
const RUBYGEMS_REGEX = /rubygems\s+(.+)/i;

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

    let [, rubygemsQuery] = RUBYGEMS_REGEX.exec(term);

    display({
      icon:       ICON_FILE,
      title:      `Search Rubygems for ${rubygemsQuery}`,
      onSelect:   () => searchRubygems(rubygemsQuery),
      getPreview: () => <Preview query={rubygemsQuery} key={rubygemsQuery} openBrowser={openBrowser}/>
    })
  }
};

module.exports = {
  fn: plugin,
  icon: ICON_FILE,
  name: 'Rubygems',
  keyword: 'rubygems'
};
