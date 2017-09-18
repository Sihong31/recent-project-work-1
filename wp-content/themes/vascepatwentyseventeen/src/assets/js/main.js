'use strict';
require("bootstrap");
var $ = require('jquery');
window.jQuery = $;
window.$ = $;
import RepositionSubs from './reposition-subs';
import AddDynamicButton from './add-dynamic-button';
import IsiSlider from './isi-slider';
import IsiScroll from './isi-scroll';
import CtaExpander from './cta-expander';
import TopJump from './top-jump';
import ModalHome from './modal-home';
import MobileOverlaySwiper from './mobile-overlay-swiper';
import GraphJumper from './graph-jumper';
import ValidateEmailForm from './downloads-email-form';
import MainHero from './main-hero';
import ActiveHeaderTabs from './active-header-tabs';
import GraphModal from './graph-modal';
import CollectFormData from './collect-form-data';

let domLoaded = function() {
  const $megaMenuCss = $("#megamenu-css");
  const $homeBody = $("body#home");
  const modalHomepage = $homeBody.find("#modal-home");
  const $body = $("body");
  const megaMenuPrimary = $body.find("#mega-menu-primary");
  const navRow = $body.find(".navbar .nav-row");
  const isiContainer = $body.find("#isi-main-container");
  const ctaContainer = $body.find(".two-columns-v2");
  const topJumpContainer = $body.find(".top-indicator");
  const mobileOverlayAnchorContainer1 = $body.find("#anchor-overlay-1");
  const mobileOverlayDisclosure = $body.find("#disclosure-overlay-1");
  const mobileOverlayEpaVsDha1 = $body.find("#epa-vs-dha-overlay-1");
  const graphJumperContainer = $body.find(".graph-slider");
  const accessForm = $body.find("#access-form");
  const downloadsEmailForm = $body.find("#downloads-email-form");
  const mainHeroContainer = $body.find(".hero-container");
  const graphModalContainer = $body.find(".graph-modal-container");
  const locationPath = location.protocol + "//" + location.host;
  const webForm = $body.find(".webform");
  // $megaMenuCss.attr('href', `${locationPath}/wp-content/uploads/maxmegamenu/style.css?ver=fff97d`);

  //active header tabs on inner pages
  new ActiveHeaderTabs();

  //form validations and logic

  if (downloadsEmailForm.length > 0) {
    new ValidateEmailForm(downloadsEmailForm);
  }

  //collect form data
  if (webForm.length > 0) {
    new CollectFormData();
  }

  //launch homepage modal
  if (modalHomepage.length > 0) {
    new ModalHome(modalHomepage);
  }

  //main hero on home page
  if (mainHeroContainer.length > 0) {
    new MainHero(mainHeroContainer);
  }

  //container containing links for jumping to specific graph sections
  if (graphJumperContainer.length > 0) {
    new GraphJumper(graphJumperContainer);
  }

  //container for jumping to top of page
  if (topJumpContainer.length > 0) {
    new TopJump(topJumpContainer);
  }

  //blue cta container
  if (ctaContainer.length > 0) {
    new CtaExpander(ctaContainer);
  }

  //isi slider and scroll
  if (isiContainer.length > 0) {
    new IsiSlider(isiContainer);
    new IsiScroll(isiContainer);
  }

  //mobile overlay swipers
  if (mobileOverlayAnchorContainer1.length > 0) {
    new MobileOverlaySwiper(mobileOverlayAnchorContainer1);
  }

  if (mobileOverlayDisclosure.length > 0) {
    new MobileOverlaySwiper(mobileOverlayDisclosure);
  }

  if (mobileOverlayEpaVsDha1.length > 0) {
    new MobileOverlaySwiper(mobileOverlayEpaVsDha1);
  }

  //clone wordpress dynamic REGISTER link for mobile
  if (navRow.length > 0) {
    new AddDynamicButton(navRow);
  }

  //find left position of first <li> in primary navigation and adjust padding-left of each submenu to equal that <li>
  if (megaMenuPrimary.length > 0) {
    new RepositionSubs(megaMenuPrimary);
  }

  //clickable graph modals
  if (graphModalContainer.length > 0) {
    new GraphModal(graphModalContainer);
  }
}

document.addEventListener("DOMContentLoaded", domLoaded);
