import { hot } from '@gondel/plugin-hot';

import 'core-js/features/promise/index';

import './shared/props/token/css/00-core.css';
import './shared/props/token/css/10-semantic.css';
import './shared/props/token/css/10-semantic-dimension.css';
import './shared/props/token/css/20-component.css';

import './shared/base/reset/css/reset.scss';
import './shared/base/grid/css/grid.scss';
import './shared/base/document/css/document.scss';
import './shared/base/webfonts/css/webfont-gaegu.scss';
import './shared/base/webfonts/css/webfont-playfair-display.scss';
import './shared/base/webfonts/css/webfont-unbounded.scss';
import './shared/base/webfonts/css/webfont-manrope.scss';
import './shared/base/print/css/print.scss';

import './patterns/atoms/back-to-top';
import './patterns/atoms/box';
import './patterns/atoms/button';
import './patterns/atoms/checkbox';
import './patterns/atoms/consent';
import './patterns/atoms/cta';
import './patterns/atoms/datepicker';
import './patterns/atoms/employer';
import './patterns/atoms/gondel';
import './patterns/atoms/heading';
import './patterns/atoms/icon';
import './patterns/atoms/image';
import './patterns/atoms/list';
import './patterns/atoms/loader';
import './patterns/atoms/lottie';
import './patterns/atoms/quote';
import './patterns/atoms/scroll-progress';
import './patterns/atoms/stage';
import './patterns/molecules/apple-sort';
import './patterns/molecules/city-chat';
import './patterns/molecules/club-floor';
import './patterns/molecules/code-review';
import './patterns/molecules/coin-board';
import './patterns/molecules/contact-form';
import './patterns/molecules/crew-call';
import './patterns/molecules/device-scene';
import './patterns/molecules/driver-club';
import './patterns/molecules/duet-studio';
import './patterns/molecules/example';
import './patterns/molecules/fantasy-pitch';
import './patterns/molecules/freezer-case';
import './patterns/molecules/kids-tv';
import './patterns/molecules/kmp-stack';
import './patterns/molecules/laptop-scroll';
import './patterns/molecules/lead-flow';
import './patterns/molecules/live-room';
import './patterns/molecules/mvi-loop';
import './patterns/molecules/on-air';
import './patterns/molecules/pageant-stage';
import './patterns/molecules/pass-card';
import './patterns/molecules/phone-scroll';
import './patterns/molecules/salon-scene';
import './patterns/molecules/scan-view';
import './patterns/molecules/sdui-live';
import './patterns/molecules/swipe-deck';
import './patterns/molecules/token-flow';
import './patterns/molecules/web-wrap';
import './patterns/molecules/wipe-clean';
import './patterns/organisms/about';
import './patterns/organisms/project-grid';
import './patterns/organisms/project-player';
import './patterns/organisms/site-footer';
import './patterns/organisms/site-header';

hot(module);

// custom code
console.log("I'm from the entry point ui"); // eslint-disable-line
