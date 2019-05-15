import ContentGeneralFilm from '../ContentGeneralFilm/ContentGeneralFilm';
import ContentGeneralTalent from '../ContentGeneralTalent/ContentGeneralTalent';
import ContentGeneralFest from '../ContentGeneralFest/ContentGeneralFest';
import ContentCredits from '../ContentCredits/ContentCredits';
import ContentFilmography from '../ContentFilmography/ContentFilmography';
import ContentMedia from '../ContentMedia/ContentMedia';
import ContentSocials from '../ContentSocials/ContentSocials';
import ContentSubmitting from '../ContentSubmitting/ContentSubmitting';
import ContentAwards from '../ContentAwards/ContentAwards';
import { SEARCH_RESULTS } from '../../constants';

const filmTabs = [
  {
    title: 'General Information',
    path: '/general',
    component: ContentGeneralFilm
  },
  {
    title: 'Credits',
    path: '/credits',
    component: ContentCredits
  },
  {
    title: 'Media',
    path: '/media',
    component: ContentMedia
  },
  {
    title: 'Social',
    path: '/social',
    component: ContentSocials
  },
  {
    title: 'Submitting',
    path: '/submitting',
    component: ContentSubmitting
  },
];

const talentTabs = [
  {
    title: 'General Information',
    path: '/general',
    component: ContentGeneralTalent
  },
  {
    title: 'Filmography',
    path: '/filmography',
    component: ContentFilmography
  },
  {
    title: 'Media',
    path: '/media',
    component: ContentMedia
  },

  {
    title: 'Social',
    path: '/social',
    component: ContentSocials
  },
  {
    title: 'Submitting',
    path: '/submitting',
    component: ContentSubmitting
  },
];

const festTabs = [
  {
    title: 'General Information',
    path: '/general',
    component: ContentGeneralFest
  },
  {
    title: 'Awards',
    path: '/awards',
    component: ContentAwards
  },
  {
    title: 'Media',
    path: '/media',
    component: ContentMedia
  },
  {
    title: 'Social',
    path: '/social',
    component: ContentSocials
  },
  {
    title: 'Submitting',
    path: '/submitting',
    component: ContentSubmitting
  },
];

export default {
  [SEARCH_RESULTS.FILMS]: filmTabs,
  [SEARCH_RESULTS.TALENT]: talentTabs,
  [SEARCH_RESULTS.FESTS]: festTabs
}