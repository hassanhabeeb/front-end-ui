import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/login';
import Blogs from './components/blogs';
import CreateBlog from './components/blogs/create';
import Enquiries from './components/enquiry/enquiries';
import ViewEnquiry from './components/enquiry/viewEnquiry';
import Banner from './components/home/banner/index';
import CreateBanner from './components/home/banner/create';
import BannerVideo from './components/home/bannerVideo/index';
import CreateBannerVideo from './components/home/bannerVideo/create';
import ScrollingHighlights from './components/home/scrollingHighlights/index';
import CreateScrollingHighlights from './components/home/scrollingHighlights/create';
import About from './components/home/about/index';
import CreateAbout from './components/home/about/create';
import WhatWeDo from './components/home/whatWeDo/index';
import CreateWhatWeDo from './components/home/whatWeDo/create';
import HowWeWork from './components/home/howWeWork/index';
import CreateHowWeWork from './components/home/howWeWork/create';
import TheImpact from './components/home/theImpact/index';
import CreateTheImpact from './components/home/theImpact/create';
import HighlightsSlider from './components/home/highlightsSlider/index';
import CreateHighlightsSlider from './components/home/highlightsSlider/create';
import OurLibrary from './components/home/ourLibrary/index';
import CreateOurLibrary from './components/home/ourLibrary/create';
import ModularApproach from './components/home/modularApproach/index';
import CreateModularApproach from './components/home/modularApproach/create';
import Levels from './components/home/levels/index';
import CreateLevels from './components/home/levels/create';
import OurImpact from './components/ourImpact/impact/index';
import CreateOurImpact from './components/ourImpact/impact/create';
import Steps from './components/ourImpact/steps/index';
import CreateSteps from './components/ourImpact/steps/create';
import Stats from './components/ourImpact/stats/index';
import CreateStats from './components/ourImpact/stats/create';
import ImplementedBy from './components/ourImpact/implementedBy/index';
import CreateImplementedBy from './components/ourImpact/implementedBy/create';
import FundedBy from './components/ourImpact/fundedBy/index';
import CreateFundedBy from './components/ourImpact/fundedBy/create';
import SupportingPartners from './components/ourImpact/supportingPartners/index';
import CreateSupportingPartners from './components/ourImpact/supportingPartners/create';
import AboutUsBanner from './components/aboutUs/banner/index';
import CreateAboutUsBanner from './components/aboutUs/banner/create';
import FactsAndFigures from './components/aboutUs/factsAndFigures/index';
import CreateFactsAndFigures from './components/aboutUs/factsAndFigures/create';
import WhyAyaMatters from './components/aboutUs/whyAyaMatters/index';
import CreateWhyAyaMatters from './components/aboutUs/whyAyaMatters/create';
import OurAnswer from './components/aboutUs/ourAnswer/index';
import CreateOurAnswer from './components/aboutUs/ourAnswer/create';
import KeyHealthPriorities from './components/aboutUs/keyHealthPriorities/index';
import CreateKeyHealthPriorities from './components/aboutUs/keyHealthPriorities/create';
import OurApproach from './components/aboutUs/ourApproach/index';
import CreateOurApproach from './components/aboutUs/ourApproach/create';
import AimsToAchieve from './components/aboutUs/aimsToAchieve/index';
import CreateAimsToAchieve from './components/aboutUs/aimsToAchieve/create';
import Footer from './components/footer/index';
import CreateFooter from './components/footer/create';
import Contact from './components/contact/index';
import CreateContact from './components/contact/create';
import Brochure from './components/brochure/index';
import CreateBrochure from './components/brochure/create';
import Seo from './components/seo/seo';
import CreateSeo from './components/seo/create';

function App() {

  return (
    <BrowserRouter basename="/front-end-ui/">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/brochures" element={<Brochure />} />
        <Route path="/create-brochure" element={<CreateBrochure />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/create-blog" element={<CreateBlog />} />
        <Route path="/enquiries" element={<Enquiries />} />
        <Route path="/enquiry/view/:id" element={<ViewEnquiry />} />
        <Route path="/home/banner" element={<Banner />} />
        <Route path="/home/create-banner" element={<CreateBanner />} />
        <Route path="/home/banner-video" element={<BannerVideo />} />
        <Route path="/home/create-banner-video" element={<CreateBannerVideo />} />
        <Route path="/home/scrolling-highlights" element={<ScrollingHighlights />} />
        <Route path="/home/create-scrolling-highlights" element={<CreateScrollingHighlights />} />
        <Route path="/home/about" element={<About />} />
        <Route path="/home/create-about" element={<CreateAbout />} />
        <Route path="/home/what-we-do" element={<WhatWeDo />} />
        <Route path="/home/create-what-we-do" element={<CreateWhatWeDo />} />
        <Route path="/home/how-we-work" element={<HowWeWork />} />
        <Route path="/home/create-how-we-work" element={<CreateHowWeWork />} />
        <Route path="/home/the-impact" element={<TheImpact />} />
        <Route path="/home/create-the-impact" element={<CreateTheImpact />} />
        <Route path="/home/highlights-slider" element={<HighlightsSlider />} />
        <Route path="/home/create-highlights-slider" element={<CreateHighlightsSlider />} />
        <Route path="/home/our-library" element={<OurLibrary />} />
        <Route path="/home/create-our-library" element={<CreateOurLibrary />} />
        <Route path="/home/modular-approach" element={<ModularApproach />} />
        <Route path="/home/create-modular-approach" element={<CreateModularApproach />} />
        
        {/* Levels */}
        <Route path="/home/levels" element={<Levels />} />
        <Route path="/home/create-levels" element={<CreateLevels />} />
        <Route path="/our-impact/impact" element={<OurImpact />} />
        <Route path="/our-impact/create-impact" element={<CreateOurImpact />} />
        <Route path="/our-impact/steps" element={<Steps />} />
        <Route path="/our-impact/create-steps" element={<CreateSteps />} />
        <Route path="/our-impact/stats" element={<Stats />} />
        <Route path="/our-impact/create-stats" element={<CreateStats />} />
        <Route path="/our-impact/implemented-by" element={<ImplementedBy />} />
        <Route path="/our-impact/create-implemented-by" element={<CreateImplementedBy />} />
        <Route path="/our-impact/funded-by" element={<FundedBy />} />
        <Route path="/our-impact/create-funded-by" element={<CreateFundedBy />} />
        <Route path="/our-impact/supporting-partners" element={<SupportingPartners />} />
        <Route path="/our-impact/create-supporting-partners" element={<CreateSupportingPartners />} />
        <Route path="/about-us/banner" element={<AboutUsBanner />} />
        <Route path="/about-us/create-banner" element={<CreateAboutUsBanner />} />
        <Route path="/about-us/facts-and-figures" element={<FactsAndFigures />} />
        <Route path="/about-us/create-facts-and-figures" element={<CreateFactsAndFigures />} />
        <Route path="/about-us/why-aya-matters" element={<WhyAyaMatters />} />
        <Route path="/about-us/create-why-aya-matters" element={<CreateWhyAyaMatters />} />
        <Route path="/about-us/our-answer" element={<OurAnswer />} />
        <Route path="/about-us/create-our-answer" element={<CreateOurAnswer />} />
        <Route path="/about-us/key-health-priorities" element={<KeyHealthPriorities />} />
        <Route path="/about-us/create-key-health-priorities" element={<CreateKeyHealthPriorities />} />
        <Route path="/about-us/our-approach" element={<OurApproach />} />
        <Route path="/about-us/create-our-approach" element={<CreateOurApproach />} />
        <Route path="/about-us/aims-to-achieve" element={<AimsToAchieve />} />
        <Route path="/about-us/create-aims-to-achieve" element={<CreateAimsToAchieve />} />
        <Route path="/seo" element={<Seo />} />
        <Route path="/create-seo" element={<CreateSeo />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/create-footer" element={<CreateFooter />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/create-contact" element={<CreateContact />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

